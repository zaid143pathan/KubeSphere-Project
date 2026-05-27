# Project Overview

## Project Title

Production-Style Cloud-Native Kubernetes Infrastructure

---

# Introduction

The KubeSphere Project is a production-style cloud-native infrastructure project built using Kubernetes in a multi-node cluster environment.

The project demonstrates practical implementation of containerization, orchestration, networking, monitoring, and deployment of a complete full-stack application using modern DevOps technologies.

The infrastructure hosts a frontend application, backend API, and MySQL database inside Kubernetes with monitoring and public accessibility.

---

# Objective

The main objective of this project is to:

- Build a multi-node Kubernetes cluster
- Deploy containerized applications
- Implement frontend, backend, and database communication
- Configure Kubernetes networking and services
- Expose applications publicly using NAT and firewall rules
- Monitor the cluster using Prometheus and Grafana
- Simulate a production-style cloud-native infrastructure

---

# Key Features

- Multi-node Kubernetes Cluster
- Frontend Deployment using NGINX
- Backend Deployment using Node.js and Express
- MySQL Database Deployment
- Docker Containerization
- Docker Hub Integration
- Kubernetes Deployments and Services
- Public Access using NodePort
- NAT and Firewall Configuration
- Monitoring using Prometheus and Grafana
- Full Frontend → Backend → Database Integration

---

# Technology Stack

| Technology | Purpose |
|------------|---------|
| Kubernetes | Container Orchestration |
| Docker | Containerization |
| Node.js | Backend Runtime |
| Express.js | Backend Framework |
| MySQL | Database |
| NGINX | Frontend Web Server |
| Helm | Kubernetes Package Manager |
| Prometheus | Monitoring |
| Grafana | Visualization |

---

# Cluster Infrastructure

The infrastructure consists of:

- 1 Kubernetes Master Node
- 4 Kubernetes Worker Nodes
- Frontend Tier
- Backend Tier
- Database Tier
- Monitoring Stack

---

# Application Workflow

```text
User
 ↓
Frontend Application
 ↓
Backend API
 ↓
MySQL Database


# Monitoring Workflow
Kubernetes Cluster
        ↓
Prometheus collects metrics
        ↓
Grafana visualizes dashboards


# This project helped in understanding:
Kubernetes Administration
Docker Containerization
Cloud Networking
Kubernetes Deployments
Kubernetes Services
Monitoring and Observability
Public Infrastructure Exposure
DevOps Workflow
Full-Stack Cloud-Native Architecture

# Result

Successfully deployed a production-style cloud-native Kubernetes infrastructure with monitoring, networking, and complete full-stack application integration.
