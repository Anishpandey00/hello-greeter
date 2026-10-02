# Hello Greeter

A small Node.js app that greets you using your browser's local time.

## Run with Docker Desktop

Start Docker Desktop, then run from this folder:

```sh
docker compose up --build -d
```

Open http://localhost:3000.

```sh
docker compose logs -f   # View logs (Ctrl+C to exit)
docker compose ps        # Check container health
docker compose down      # Stop and remove the container
```

If port 3000 is already in use:

```sh
HOST_PORT=8080 docker compose up --build -d
```

Then open http://localhost:8080. Use the same HOST_PORT value with subsequent Compose commands.

The image uses Node.js 24, runs as a non-root user, and checks `/api/greeting` every 30 seconds. No npm packages are needed.

## Run without Docker

```sh
npm start
```

## Build and run without Compose

```sh
docker build -t hello-greeter:local .
docker run --rm --init -p 127.0.0.1:3000:3000 hello-greeter:local
```

## GitHub and automatic Docker Hub publishing

This checkout is already connected to https://github.com/Anishpandey00/hello-greeter.

Review and push your changes:

```sh
git diff
git add Dockerfile compose.yaml .dockerignore server.js README.md
git commit -m "Improve Docker setup and add Compose"
git push origin main
```

GitHub Actions builds and tests the container on pushes to `main` and pull requests. Publishing to Docker Hub is optional: configure these repository secrets under **Settings > Secrets and variables > Actions** to enable it on pushes to `main`:

- `DOCKERHUB_USERNAME`: your Docker Hub username.
- `DOCKERHUB_TOKEN`: a Docker Hub access token with permission to push images.

Without both secrets, build and test checks still run, and publishing is skipped with a notice in the workflow summary. Never put tokens in project files or chat.

After publishing, others can run:

```sh
docker run --rm --init -p 127.0.0.1:3000:3000 <dockerhub-username>/hello-greeter:latest
```
