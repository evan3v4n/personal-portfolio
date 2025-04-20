package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
	"strings"
	"time"
)

type PageData struct {
	CurrentPage string
	Title       string
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

		// Create page data
		data := PageData{
			CurrentPage: currentPage,
			Title:       strings.Title(currentPage) + " - Portfolio",
			RequestInfo: requestInfo,
		}

		// Define the content template for the current page
		contentTemplate := fmt.Sprintf(`{{define "content"}}{{template "%s-content" .}}{{end}}`, currentPage)
		tmpl := template.Must(template.Must(templates.Clone()).Parse(contentTemplate))

		// Execute template
		err := tmpl.ExecuteTemplate(w, "base.html", data)
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
