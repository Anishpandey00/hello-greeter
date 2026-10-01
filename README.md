# Hello Greeter

A tiny Node.js app that says Good morning / afternoon / evening / night based on the time.

## Run locally
    node server.js
    # open http://localhost:3000

## Run with Docker
    docker build -t hello-greeter .
    docker run -p 3000:3000 hello-greeter
    # open http://localhost:3000

## Push to GitHub
    git init
    git add .
    git commit -m "Initial commit: hello greeter app with Docker"
    git branch -M main
    git remote add origin https://github.com/<your-username>/hello-greeter.git
    git push -u origin main

## Push the image to Docker Hub (manual)
    docker login
    docker build -t <dockerhub-username>/hello-greeter:latest .
    docker push <dockerhub-username>/hello-greeter:latest

Anyone can then run it with:

    docker run -p 3000:3000 <dockerhub-username>/hello-greeter:latest

## Automatic push with GitHub Actions
`.github/workflows/docker-publish.yml` builds and pushes the image on every push to `main`.
Add two repo secrets (GitHub repo > Settings > Secrets and variables > Actions):
- `DOCKERHUB_USERNAME` - your Docker Hub username
- `DOCKERHUB_TOKEN` - an access token from Docker Hub > Account settings > Personal access tokens
