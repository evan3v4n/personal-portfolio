package main

import (
	"bytes"
	"html/template"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"regexp"
	"sort"
	"strconv"
	"strings"
	"time"
)

const (
	photoDir    = "public/images/photography"
	templateDir = "public/templates"
)

// Photo filenames look like "2026-01-10 Some caption.JPG": the date prefix
// orders the gallery and is stripped from the displayed caption.
var datePrefix = regexp.MustCompile(`^(\d{4}-\d{2}-\d{2})\s+`)

type RequestInfo struct {
	Method        string
	URL           string
	Protocol      string
	Host          string
	Status        string
	ContentType   string
	LastModified  string
	ContentLength int
	Date          string
}

type PageData struct {
	CurrentPage string
	Title       string
	Photos      []Photo
	RequestInfo RequestInfo
}

type Photo struct {
	URL         string
	Description string
	Date        time.Time
}

type page struct {
	name  string
	title string
	tmpl  *template.Template
	mtime time.Time
}

func loadPage(name, title, file string) *page {
	paths := []string{
		filepath.Join(templateDir, "base.html"),
		filepath.Join(templateDir, "nav.html"),
		filepath.Join(templateDir, file),
	}
	newest := time.Time{}
	for _, p := range paths {
		if info, err := os.Stat(p); err == nil && info.ModTime().After(newest) {
			newest = info.ModTime()
		}
	}
	return &page{name: name, title: title, tmpl: template.Must(template.ParseFiles(paths...)), mtime: newest}
}

func getPhotographyImages(limit int) ([]Photo, error) {
	files, err := os.ReadDir(photoDir)
	if err != nil {
		return nil, err
	}

	photos := []Photo{}
	for _, file := range files {
		ext := strings.ToLower(filepath.Ext(file.Name()))
		if file.IsDir() || (ext != ".jpg" && ext != ".jpeg" && ext != ".png") {
			continue
		}

		caption := strings.TrimSuffix(file.Name(), filepath.Ext(file.Name()))
		var date time.Time
		if m := datePrefix.FindStringSubmatch(caption); m != nil {
			date, _ = time.Parse("2006-01-02", m[1])
			caption = strings.TrimPrefix(caption, m[0])
		}

		photos = append(photos, Photo{
			URL:         "/images/photography/" + file.Name(),
			Description: caption,
			Date:        date,
		})
	}

	// Newest first; undated photos sink to the bottom, ties break by caption.
	sort.Slice(photos, func(i, j int) bool {
		if !photos[i].Date.Equal(photos[j].Date) {
			return photos[i].Date.After(photos[j].Date)
		}
		return photos[i].Description < photos[j].Description
	})

	if limit > 0 && len(photos) > limit {
		photos = photos[:limit]
	}
	return photos, nil
}

func main() {
	pages := map[string]*page{
		"/":            loadPage("home", "Home", "home.html"),
		"/photography": loadPage("photography", "Photography", "photography.html"),
	}
	notFound := loadPage("404", "Not Found", "404.html")

	fs := http.FileServer(http.Dir("public"))
	mux := http.NewServeMux()
	mux.Handle("/css/", fs)
	mux.Handle("/js/", fs)
	mux.Handle("/images/", fs)
	mux.Handle("/favicon.ico", fs)
	mux.Handle("/robots.txt", fs)

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet && r.Method != http.MethodHead {
			w.Header().Set("Allow", "GET, HEAD")
			http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
			return
		}

		path := strings.TrimSuffix(r.URL.Path, "/")
		if path == "" {
			path = "/"
		}
		pg, ok := pages[path]
		status := http.StatusOK
		if !ok {
			pg, status = notFound, http.StatusNotFound
		}

		var photos []Photo
		switch pg.name {
		case "home":
			photos, _ = getPhotographyImages(3)
		case "photography":
			var err error
			if photos, err = getPhotographyImages(0); err != nil {
				log.Printf("reading photos: %v", err)
			}
		}

		info := RequestInfo{
			Method:       r.Method,
			URL:          r.URL.Path,
			Protocol:     r.Proto,
			Host:         r.Host,
			Status:       strconv.Itoa(status) + " " + http.StatusText(status),
			ContentType:  "text/html; charset=utf-8",
			LastModified: pg.mtime.UTC().Format(http.TimeFormat),
			Date:         time.Now().UTC().Format(http.TimeFormat),
		}
		data := PageData{CurrentPage: pg.name, Title: pg.title + " - Evan Scott", Photos: photos, RequestInfo: info}

		// The header bar shows the page's own Content-Length, so render until
		// the number it displays matches the size of the result.
		var buf bytes.Buffer
		for i := 0; i < 3; i++ {
			buf.Reset()
			if err := pg.tmpl.ExecuteTemplate(&buf, "base.html", data); err != nil {
				log.Printf("rendering %s: %v", pg.name, err)
				http.Error(w, "Internal Server Error", http.StatusInternalServerError)
				return
			}
			if buf.Len() == data.RequestInfo.ContentLength {
				break
			}
			data.RequestInfo.ContentLength = buf.Len()
		}

		h := w.Header()
		h.Set("Content-Type", info.ContentType)
		h.Set("Content-Length", strconv.Itoa(buf.Len()))
		h.Set("Last-Modified", info.LastModified)
		h.Set("X-Content-Type-Options", "nosniff")
		h.Set("X-Frame-Options", "DENY")
		w.WriteHeader(status)
		if r.Method == http.MethodGet {
			w.Write(buf.Bytes())
		}
	})

	server := &http.Server{
		Addr:         ":" + getPort(),
		Handler:      mux,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	log.Printf("Server starting on http://localhost:%s", getPort())
	log.Fatal(server.ListenAndServe())
}

func getPort() string {
	if port := os.Getenv("PORT"); port != "" {
		return port
	}
	return "8080" // fallback for local dev
}
