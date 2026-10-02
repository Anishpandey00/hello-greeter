# Hello Greeter

A small Node.js app with an animated Nepali-inspired namaste greeting, a bowing character, a local clock, and an optional voice greeting.

## Open the website online

Visit https://anishpandey00.github.io/hello-greeter/ — no installation required.

GitHub Pages serves the greeting page, character animation, local clock, and optional browser voice greeting. It stays available when your computer is off. The Node.js API endpoints are available only when running the server locally or with Docker.

Changes to `public/` on `main` are published automatically by the Pages workflow.

## Run with Docker Desktop

Install Git and Docker Desktop on Windows, macOS, or Linux, and start Docker Desktop. On Linux, Docker Engine with the Compose plugin also works. Internet access is needed for the initial clone and image build. Node.js does not need to be installed separately.

For the first run, open Terminal or PowerShell:

```sh
git clone https://github.com/Anishpandey00/hello-greeter.git
cd hello-greeter
docker compose up --build -d
```

For later starts, open a terminal in the project folder and run:

```sh
docker compose up -d
```

Open http://localhost:3000.

```sh
docker compose logs -f   # View logs (Ctrl+C to exit)
docker compose ps        # Check container health
docker compose down      # Stop and remove the container
```

The girl bows automatically when the page opens. Use **Greet me again** to replay it. Enable **Voice greeting** before replaying to hear the greeting. Speech availability, pronunciation, and voice vary by browser and installed system voices; reduced-motion preferences disable the animation. The displayed greeting follows each visitor's own local time.

To get the latest version of an unmodified checkout:

```sh
git pull --ff-only
docker compose up --build -d
```

If port 3000 is already in use, create a file named `.env` beside `compose.yaml` containing `HOST_PORT=8080`, then run `docker compose up --build -d`. This works in Terminal and PowerShell.

Alternatively, on macOS/Linux:

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
git add public/index.html Dockerfile compose.yaml .dockerignore server.js README.md
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
