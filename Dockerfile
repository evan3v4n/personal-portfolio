FROM golang:1.22.2-bookworm AS builder

WORKDIR /usr/src/app

COPY go.mod ./
RUN go mod download && go mod verify

COPY . .
RUN go build -v -o /run-app ./cmd/server

FROM debian:bookworm

COPY --from=builder /run-app /usr/local/bin/
COPY --from=builder /usr/src/app/public /app/public

WORKDIR /app

CMD ["run-app"]
