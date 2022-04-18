# [AASS] Frontend service

![master pipeline](https://github.com/AASS-Team/aass-frontend-service/workflows/pipeline/badge.svg?branch=master)

## Prerequisites

- [Docker](https://www.docker.com/)

## Installation and configuration

The application is written in reactive framework [Vue](https://vuejs.org).


1. Set your environment variables by creating your own `.env` file in root similar to `.env.example`.

1. Build and run docker containers

	Run following command in base directory of this project:

	```
	docker-compose up --build -d
	```

## Development

1. Run `docker-compose up` in base directory of this project.

2. Visit the webpage in browser (by default the URL is [http://localhost:8080](http://localhost:8080))

3. To stop the server, use `docker-compose down`

