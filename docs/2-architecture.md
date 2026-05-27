# System Architecture

## Overview

The KubeSphere Project follows a production-style cloud-native multi-tier architecture deployed on a Kubernetes cluster.

The infrastructure consists of frontend, backend, database, and monitoring components running inside containerized environments managed by Kubernetes.

---

# Architecture Components

| Component | Purpose |
|------------|---------|
| Frontend | User Interface |
| Backend API | Business Logic and API |
| MySQL Database | Data Storage |
| Kubernetes Cluster | Container Orchestration |
| Prometheus | Metrics Collection |
| Grafana | Monitoring Dashboards |
| Docker | Containerization |
| NAT & Firewall | Public Access |

---

# Kubernetes Cluster Architecture

The Kubernetes cluster consists of:

- 1 Master Node
- 4 Worker Nodes

---

# Master Node Responsibilities

The master node manages the entire Kubernetes cluster.

Functions include:

- Cluster Management
- Scheduling Pods
- API Server Management
- Controller Management
- Cluster State Management

---

# Worker Node Responsibilities

Worker nodes are responsible for:

- Running Application Pods
- Running Containers
- Executing Workloads
- Handling Application Traffic

---

# Application Architecture

```text
Internet User
        ↓
Public IP + NAT
        ↓
Firewall Rules
        ↓
Kubernetes NodePort Service
        ↓
Frontend Pods
        ↓
Backend Pods
        ↓
MySQL Database Pod
