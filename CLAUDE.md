# Personal portfolio (evancs.ca)

Go server (`cmd/server/main.go`) rendering `html/template` pages from `public/templates/`, with plain CSS/JS in `public/`. Paths are relative to the repo root, so run from there.

## Run locally
`go run ./cmd/server` then open http://localhost:8080 (`PORT` overrides the port).

## Pages
Routes are the `pages` map in `main.go` (`/`, `/photography`); any other path renders `404.html` with a 404 status. To add a page: add `templates/<name>.html` defining `content`, register it in `pages`, link it in `nav.html`.

## Photos
Drop images in `public/images/photography/` named `YYYY-MM-DD Caption.JPG`. The date prefix orders the gallery (newest first) and is stripped from the caption. Resize before adding (about 1800px long edge, JPEG quality 75-78): `sips -s format jpeg -s formatOptions 75 -Z 1800 file.JPG`. The home page shows the 3 newest.

## Deploy
Hosted on Fly.io, app `personal-portfolio-wandering-hill-7773`, under the Fly account evan.scott@torontomu.ca (not evan.scott2050@gmail.com). Deploy with `fly deploy --remote-only` from the repo root. The GitHub Action in `.github/workflows/fly-deploy.yml` needs a `FLY_API_TOKEN` repo secret to work; without it, deploy manually. `render.yaml` is unused. DNS for evancs.ca is at GoDaddy and points at Fly.
