# Docker Commands Guide

## Project: KubeSphere Project

This document contains important Docker commands used during the containerization phase of the Kubernetes major project.

---

# What is Docker?

Docker is a containerization platform used to package applications and their dependencies into lightweight portable containers.

Docker helps in:

- Application portability
- Consistent environments
- Faster deployments
- Microservices architecture
- Kubernetes orchestration

---

# Docker Architecture

```text
Dockerfile
     ↓
Docker Image
     ↓
Docker Container
```

---

# STEP 1 — Install Docker

## Update Packages

```bash
sudo apt update
```

## Install Docker

```bash
sudo apt install -y docker.io
```

---

# STEP 2 — Start Docker Service

## Start Docker

```bash
sudo systemctl start docker
```

## Enable Docker at Boot

```bash
sudo systemctl enable docker
```

## Verify Docker Status

```bash
sudo systemctl status docker
```

Expected output:

```text
active (running)
```

---

# STEP 3 — Verify Docker Installation

## Check Docker Version

```bash
docker --version
```

## Check Docker Information

```bash
sudo docker info
```

---

# STEP 4 — Create Dockerfile

## Navigate to Frontend Directory

```bash
cd ~/KubeSphere-Project/frontend
```

## Create Dockerfile

```bash
nano Dockerfile
```

---

# Dockerfile Used

```dockerfile
FROM nginx:latest

COPY . /usr/share/nginx/html

EXPOSE 80
```

---

# Dockerfile Explanation

| Instruction | Purpose |
|---|---|
| FROM nginx:latest | Use NGINX base image |
| COPY . | Copy frontend files into container |
| EXPOSE 80 | Expose container web port |

---

# STEP 5 — Build Docker Image

## Build Frontend Image

```bash
sudo docker build -t kubesphere-frontend:v1 .
```

---

# Command Explanation

| Parameter | Purpose |
|---|---|
| docker build | Build Docker image |
| -t | Assign image tag |
| kubesphere-frontend:v1 | Image name and version |
| . | Current directory |

---

# STEP 6 — Verify Docker Images

## List Docker Images

```bash
sudo docker images
```

Expected output:

```text
REPOSITORY               TAG       IMAGE ID       CREATED
kubesphere-frontend      v1        xxxxxxxxx      x minutes ago
```

---

# STEP 7 — Run Docker Container

## Run Frontend Container

```bash
sudo docker run -d -p 8080:80 kubesphere-frontend:v1
```

---

# Command Explanation

| Parameter | Purpose |
|---|---|
| docker run | Start container |
| -d | Run in detached mode |
| -p 8080:80 | Map host port to container port |
| kubesphere-frontend:v1 | Docker image name |

---

# STEP 8 — Verify Running Containers

## List Running Containers

```bash
sudo docker ps
```

Expected output:

```text
CONTAINER ID   IMAGE                        STATUS
xxxxxxxxxxxx   kubesphere-frontend:v1      Up
```

---

# STEP 9 — Stop Running Container

## Stop Container

```bash
sudo docker stop <container_id>
```

---

# STEP 10 — Remove Container

## Remove Container

```bash
sudo docker rm <container_id>
```

---

# STEP 11 — Remove Docker Image

## Remove Image

```bash
sudo docker rmi kubesphere-frontend:v1
```

---

# STEP 12 — Docker Login

## Login to Docker Hub

```bash
sudo docker login
```

Purpose:

- Authenticate Docker Hub account
- Push images to Docker registry

---

# STEP 13 — Tag Docker Image

## Tag Image for Docker Hub

```bash
sudo docker tag kubesphere-frontend:v1 username/kubesphere-frontend:v1
```

---

# STEP 14 — Push Image to Docker Hub

## Push Docker Image

```bash
sudo docker push username/kubesphere-frontend:v1
```

Purpose:

- Upload image to Docker Hub
- Allow Kubernetes worker nodes to pull image

---

# Common Docker Commands

| Command | Purpose |
|---|---|
| docker images | List images |
| docker ps | List running containers |
| docker ps -a | List all containers |
| docker stop | Stop container |
| docker rm | Remove container |
| docker rmi | Remove image |
| docker logs | View container logs |
| docker exec -it | Access container shell |

---

# Docker Concepts Learned

- Containerization
- Docker Images
- Docker Containers
- Dockerfile
- Port Mapping
- Image Building
- Image Tagging
- Docker Hub Integration

---

# Benefits of Docker

- Lightweight virtualization
- Fast deployment
- Application portability
- Dependency isolation
- Easy scaling
- Kubernetes compatibility

---

# Current Status

| Task | Status |
|---|---|
| Docker Installation | Completed |
| Frontend Containerization | Completed |
| Docker Image Build | Completed |
| Docker Container Execution | Completed |
| Docker Hub Integration | In Progress |

---

# Author

## Zaid Pathan

Cloud-Native Kubernetes Major Project
