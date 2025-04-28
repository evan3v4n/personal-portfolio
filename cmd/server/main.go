package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"time"
)

type PageData struct {
	CurrentPage string
	Title       string
	Photos      []Photo
	RequestInfo struct {
		Method        string
		URL           string
		Protocol      string
		Host          string
		ContentType   string
		LastModified  string
		ContentLength int64
		Date          string
		UserAgent     string
	}
}

type Photo struct {
	URL         string
	Description string
	ModTime     time.Time
}

type Album struct {
	Title       string
	Description string
	Date        string
	CoverImage  string
	Photos      []Photo
}

type AlbumPageData struct {
	PageData
	Album Album
}

func getPhotographyImages(limit int) ([]Photo, error) {
	photos := []Photo{}

	// Read the photography directory
	files, err := os.ReadDir("public/images/photography")
	if err != nil {
		log.Printf("Error reading photography directory: %v", err)
		return nil, err
	}

	log.Printf("Found %d files in photography directory", len(files))

	// Add each image to the photos slice
	for _, file := range files {
		// Convert filename to lowercase for extension check
		lowerName := strings.ToLower(file.Name())
		if !file.IsDir() && (strings.HasSuffix(lowerName, ".jpg") || strings.HasSuffix(lowerName, ".jpeg") || strings.HasSuffix(lowerName, ".png")) {
			// Get file info to get modification time
			fileInfo, err := file.Info()
			if err != nil {
				log.Printf("Error getting file info for %s: %v", file.Name(), err)
				continue
			}

			photo := Photo{
				URL:         "/images/photography/" + file.Name(),
				Description: strings.TrimSuffix(file.Name(), filepath.Ext(file.Name())),
				ModTime:     fileInfo.ModTime(),
			}
			photos = append(photos, photo)
			log.Printf("Added photo: %+v", photo)
		}
	}

	// Sort photos by modification time, most recent first
	sort.Slice(photos, func(i, j int) bool {
		return photos[i].ModTime.After(photos[j].ModTime)
	})

	// Limit the number of photos if requested
	if limit > 0 && len(photos) > limit {
		photos = photos[:limit]
	}

	log.Printf("Total photos returned: %d", len(photos))
	return photos, nil
}

func main() {
	// Parse templates
	templates := template.Must(template.ParseGlob("public/templates/*.html"))

	// Create a new file server handler
	fs := http.FileServer(http.Dir("public"))

	// Create a new ServeMux for routing
	mux := http.NewServeMux()

	// Handle static files
	mux.Handle("/css/", fs)
	mux.Handle("/js/", fs)
	mux.Handle("/images/", fs)
	mux.Handle("/favicon.ico", fs)

	// Handle all other requests
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// Set custom headers for all responses
		w.Header().Set("Server", "Personal Portfolio")
		w.Header().Set("X-Content-Type-Options", "nosniff")
		w.Header().Set("X-Frame-Options", "DENY")
		w.Header().Set("X-XSS-Protection", "1; mode=block")
		w.Header().Set("Content-Type", "text/html; charset=utf-8")

		// Get the response body size (approximate)
		var contentLength int64 = 0
		if r.Method == "GET" {
			// For GET requests, we can estimate the content length
			contentLength = 4263 // Approximate size of the HTML response
		}

		// Get current time in UTC
		now := time.Now().UTC()

		// Create request info
		requestInfo := struct {
			Method        string
			URL           string
			Protocol      string
			Host          string
			ContentType   string
			LastModified  string
			ContentLength int64
			Date          string
			UserAgent     string
		}{
			Method:        r.Method,
			URL:           r.URL.Path,
			Protocol:      r.Proto,
			Host:          r.Host,
			ContentType:   w.Header().Get("Content-Type"),
			LastModified:  now.Format(time.RFC3339),
			ContentLength: contentLength,
			Date:          now.Format(time.RFC3339),
			UserAgent:     r.UserAgent(),
		}

		// Log the request
		log.Printf("%s %s %s", r.Method, r.URL.Path, r.Proto)

		// Determine current page
		currentPage := "home"
		if r.URL.Path != "/" {
			// Remove leading slash and split by remaining slashes
			parts := strings.Split(strings.TrimPrefix(r.URL.Path, "/"), "/")
			if len(parts[0]) > 0 {
				currentPage = parts[0]
			}

			// Handle album routes
			if currentPage == "albums" && len(parts) > 1 {
				// This is a specific album page
				albumID := parts[1]
				album := Album{
					Title:       "Album Title",
					Description: "Album Description",
					Photos: []Photo{
						{URL: "/images/albums/" + albumID + "/1.jpg", Description: "Photo 1"},
						{URL: "/images/albums/" + albumID + "/2.jpg", Description: "Photo 2"},
						{URL: "/images/albums/" + albumID + "/3.jpg", Description: "Photo 3"},
					},
				}

				data := AlbumPageData{
					PageData: PageData{
						CurrentPage: "albums",
						Title:       album.Title + " - Portfolio",
						RequestInfo: requestInfo,
					},
					Album: album,
				}

				err := templates.ExecuteTemplate(w, "base.html", data)
				if err != nil {
					log.Printf("Error executing template: %v", err)
					http.Error(w, "Internal Server Error", http.StatusInternalServerError)
				}
				return
			}
		}

		// Get photography images
		var photos []Photo
		var err error
		if currentPage == "home" {
			photos, err = getPhotographyImages(3) // Only 3 most recent for home page
		} else {
			photos, err = getPhotographyImages(0) // All photos for photography page
		}
		if err != nil {
			log.Printf("Error reading photography images: %v", err)
		} else {
			log.Printf("Successfully loaded %d photos for page: %s", len(photos), currentPage)
		}

		// Create page data
		data := PageData{
			CurrentPage: currentPage,
			Title:       strings.Title(currentPage) + " - Portfolio",
			Photos:      photos,
			RequestInfo: requestInfo,
		}

		// Parse the specific page template
		pageTemplate := fmt.Sprintf("%s.html", currentPage)
		tmpl, err := template.ParseFiles(
			"public/templates/base.html",
			"public/templates/nav.html",
			fmt.Sprintf("public/templates/%s", pageTemplate),
		)
		if err != nil {
			log.Printf("Error parsing templates: %v", err)
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		// Execute template
		err = tmpl.ExecuteTemplate(w, "base.html", data)
		if err != nil {
			log.Printf("Error executing template: %v", err)
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}
	})

	// Create server with timeouts
	server := &http.Server{
		Addr:         ":8080",
		Handler:      mux,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	log.Printf("Server starting on http://localhost:8080")
	if err := server.ListenAndServe(); err != nil {
		log.Fatal(err)
	}
}
