# Kubernetes Monitoring Stack Setup

## Objective

The objective of this setup is to monitor the Kubernetes cluster, nodes, pods, and application resources using Prometheus and Grafana.

---

# Tools Used

Tool - Purpose 

Helm - Kubernetes Package Manager 
Prometheus - Metrics Collection 
Grafana - Dashboard Visualization 

---

# Step 1 — Install Helm

Install Helm on the Kubernetes master node.

```bash
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# Step 2 — Verify Helm Installation
helm version

Expected Output: version.BuildInfo

# Step 3 — Add Prometheus Community Repository
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts

# Step 4 — Update Helm Repositories
helm repo update

# Step 5 — Create Monitoring Namespace
kubectl create namespace monitoring

# Step 6 — Install kube-prometheus-stack

This stack installs:
Prometheus
Grafana
Alertmanager
Node Exporter
kube-state-metrics
helm install monitoring prometheus-community/kube-prometheus-stack -n monitoring

# Step 7 — Verify Monitoring Pods
kubectl get pods -n monitoring

Wait until all pods become:Running

# Step 8 — Check Monitoring Services
kubectl get svc -n monitoring

# Step 9 — Expose Grafana Using NodePort

Edit Grafana service: kubectl edit svc monitoring-grafana -n monitoring
Find: type: ClusterIP
Replace with: type: NodePort
Save and exit.

# Step 10 — Verify Grafana NodePort
kubectl get svc -n monitoring

Example Output: monitoring-grafana   NodePort   10.x.x.x   <none>   80:32323/TCP
NodePort used in this project: 32323

# Step 11 — Configure NAT Rule

Create DNAT rule in vCloud Director.

Field	Value
External IP	PUBLIC-IP
External Port	32323
Internal IP	192.168.0.2
Internal Port	32323

# Step 12 — Configure Firewall Rule

Allow inbound TCP traffic.

Field	Value
Protocol	TCP
Port	32323
Source	Any
Destination	192.168.0.2

# Step 13 — Access Grafana Dashboard

Open browser: http://PUBLIC-IP:32323

# Step 14 — Get Grafana Password

Username: admin
Password Command: kubectl get secret -n monitoring monitoring-grafana -o jsonpath="{.data.admin-password}" | base64 --decode

# Step 15 — Login to Grafana

Use:
Field	Value
Username	admin
Password	Generated Password
Monitoring Features Achieved
Kubernetes Cluster Monitoring
Pod Monitoring
Node Monitoring
CPU Monitoring
Memory Monitoring
Resource Visualization
Real-Time Metrics Collection

# Result

Successfully deployed a production-style Kubernetes monitoring stack using Prometheus and Grafana.
