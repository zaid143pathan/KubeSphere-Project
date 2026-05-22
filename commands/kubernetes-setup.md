# Kubernetes Cluster Setup Guide

## Project: KubeSphere Project

This document contains the complete setup process for creating a multi-node Kubernetes cluster using kubeadm, containerd, and Calico CNI.

---

# Cluster Architecture

```text
                    Kubernetes Cluster
                            |
                    k8s-master Node
                     (Control Plane)
                            |
---------------------------------------------------------
|                       |                      |         |
k8s-worker1      k8s-worker2         k8s-worker3   k8s-worker4
```

---

# Infrastructure Configuration

| Node | IP Address | Role |
|---|---|---|
| k8s-master | 192.168.0.2 | Control Plane |
| k8s-worker1 | 192.168.0.3 | Worker Node |
| k8s-worker2 | 192.168.0.4 | Worker Node |
| k8s-worker3 | 192.168.0.5 | Worker Node |
| k8s-worker4 | 192.168.0.6 | Worker Node |

---

# System Requirements

| Component | Specification |
|---|---|
| OS | Ubuntu Server 22.04 |
| RAM | 2 GB |
| CPU | 2 Cores |
| Disk | 20 GB |
| Network | Private/Internal |

---

# STEP 1 — Configure Hostnames

## Master Node

```bash
sudo hostnamectl set-hostname k8s-master
```

## Worker Nodes

```bash
sudo hostnamectl set-hostname k8s-worker1
sudo hostnamectl set-hostname k8s-worker2
sudo hostnamectl set-hostname k8s-worker3
sudo hostnamectl set-hostname k8s-worker4
```

---

# STEP 2 — Configure Hosts File

Edit hosts file on all nodes:

```bash
sudo nano /etc/hosts
```

Add:

```text
192.168.0.2 k8s-master
192.168.0.3 k8s-worker1
192.168.0.4 k8s-worker2
192.168.0.5 k8s-worker3
192.168.0.6 k8s-worker4
```

---

# STEP 3 — Disable Swap

Disable swap temporarily:

```bash
sudo swapoff -a
```

Disable swap permanently:

```bash
sudo sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab
```

Verify:

```bash
free -h
```

---

# STEP 4 — Enable Kernel Modules

Create Kubernetes module configuration:

```bash
cat <<EOF | sudo tee /etc/modules-load.d/k8s.conf
overlay
br_netfilter
EOF
```

Load modules:

```bash
sudo modprobe overlay
sudo modprobe br_netfilter
```

---

# STEP 5 — Configure System Networking

Create sysctl configuration:

```bash
cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-iptables = 1
net.bridge.bridge-nf-call-ip6tables = 1
net.ipv4.ip_forward = 1
EOF
```

Apply configuration:

```bash
sudo sysctl --system
```

---

# STEP 6 — Install containerd

Update packages:

```bash
sudo apt update
```

Install containerd:

```bash
sudo apt install -y containerd
```

---

# STEP 7 — Configure containerd

Create configuration directory:

```bash
sudo mkdir -p /etc/containerd
```

Generate default configuration:

```bash
containerd config default | sudo tee /etc/containerd/config.toml
```

Edit configuration:

```bash
sudo nano /etc/containerd/config.toml
```

Find:

```toml
SystemdCgroup = false
```

Replace with:

```toml
SystemdCgroup = true
```

Restart containerd:

```bash
sudo systemctl restart containerd
sudo systemctl enable containerd
```

Verify:

```bash
sudo systemctl status containerd
```

---

# STEP 8 — Install Kubernetes Components

Install dependencies:

```bash
sudo apt update
sudo apt install -y apt-transport-https ca-certificates curl gpg
```

Add Kubernetes GPG key:

```bash
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.32/deb/Release.key | \
sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
```

Add Kubernetes repository:

```bash
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.32/deb/ /' | \
sudo tee /etc/apt/sources.list.d/kubernetes.list
```

Install Kubernetes tools:

```bash
sudo apt update
sudo apt install -y kubelet kubeadm kubectl
```

Hold package versions:

```bash
sudo apt-mark hold kubelet kubeadm kubectl
```

Verify installation:

```bash
kubeadm version
kubectl version --client
kubelet --version
```

---

# STEP 9 — Initialize Kubernetes Master Node

Run on master node only:

```bash
sudo kubeadm init --pod-network-cidr=192.168.0.0/16
```

---

# STEP 10 — Configure kubectl Access

Run on master node:

```bash
mkdir -p $HOME/.kube
```

```bash
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
```

```bash
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

---

# STEP 11 — Install Calico CNI

Run on master node:

```bash
kubectl apply -f https://raw.githubusercontent.com/projectcalico/calico/v3.29.3/manifests/calico.yaml
```

Verify:

```bash
kubectl get pods -A
```

---

# STEP 12 — Generate Join Command

Run on master node:

```bash
kubeadm token create --print-join-command
```

Example output:

```bash
kubeadm join 192.168.0.2:6443 --token <token> \
--discovery-token-ca-cert-hash sha256:<hash>
```

---

# STEP 13 — Join Worker Nodes

Run generated join command on all worker nodes:

```bash
sudo kubeadm join ...
```

---

# STEP 14 — Verify Cluster

Run on master node:

```bash
kubectl get nodes
```

Expected output:

```text
NAME           STATUS   ROLES           AGE   VERSION
k8s-master     Ready    control-plane   XXm   v1.32.x
k8s-worker1    Ready    <none>          XXm   v1.32.x
k8s-worker2    Ready    <none>          XXm   v1.32.x
k8s-worker3    Ready    <none>          XXm   v1.32.x
k8s-worker4    Ready    <none>          XXm   v1.32.x
```

---

# Kubernetes Commands Used

## Check Nodes

```bash
kubectl get nodes
```

## Check Pods

```bash
kubectl get pods -A
```

## Describe Node

```bash
kubectl describe node k8s-worker1
```

## Check Cluster Info

```bash
kubectl cluster-info
```

---

# Concepts Learned

- Kubernetes Architecture
- Control Plane
- Worker Nodes
- kubeadm
- kubelet
- kubectl
- Container Runtime
- Pod Networking
- Cluster Initialization
- Distributed Systems

---

# Current Status

| Component | Status |
|---|---|
| Infrastructure Setup | Completed |
| Kubernetes Cluster | Completed |
| Worker Node Integration | Completed |
| Calico Networking | Completed |
| Frontend Development | Completed |
| Docker Containerization | Completed |

---

# Author

## Zaid Pathan

Cloud-Native Kubernetes Major Project
