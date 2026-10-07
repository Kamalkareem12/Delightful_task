# Posts Backend System (DDD + Event-Driven with Kafka)

A clean backend system built with **Node.js + Express**, **MongoDB**, and **Apache Kafka**, structured using **Domain-Driven Design (DDD)** principles and containerized with **Docker & Docker Compose**.

---

## 🛠 Tech Stack

* **Runtime & Framework:** Node.js, Express.js (TypeScript)
* **Architecture:** Domain-Driven Design (DDD) & Clean Repository Pattern
* **Database:** MongoDB (via Mongoose)
* **Message Broker:** Apache Kafka (KRaft mode, KafkaJS)
* **Containerization:** Docker & Docker Compose
* **Cloud Deployment:** AWS / GCP

---

## 📂 Project Structure (DDD Style)

The project strictly follows the requested 4-tier DDD layout:

```text
src/
├── domain/                                  # 1. Domain Layer (Pure business logic, framework-agnostic)
│   ├── entities/
│   │   └── post.entity.ts                   # Core Post entity and business validation
│   ├── repositories/
│   │   └── post.repository.interface.ts     # Domain repository contract (IPostRepository)
│   └── events/
│       └── post-created.event.ts            # Domain event definition
│
├── application/                             # 2. Application Layer (Use Cases & orchestration)
│   ├── ports/
│   │   └── event-producer.interface.ts      # Port interface for messaging
│   └── use-cases/
│       ├── create-post.use-case.ts          # Creates post & triggers event publication
│       ├── get-post.use-case.ts             # Fetches single post by ID
│       └── list-posts.use-case.ts           # Fetches all posts
│
├── infrastructure/                          # 3. Infrastructure Layer (External tools, DB, Message broker)
│   ├── database/
│   │   ├── mongo.connection.ts              # MongoDB connection manager
│   │   ├── models/post.model.ts             # Mongoose schema and document definition
│   │   └── repositories/
│   │       └── mongo-post.repository.ts     # Implementation of IPostRepository
│   └── messaging/
│       ├── kafka.client.ts                  # Kafka client configuration
│       ├── kafka.producer.ts                # Kafka producer implementation (publishes events)
│       └── kafka.consumer.ts                # Kafka consumer implementation (processes events)
│
├── api/                                     # 4. API Layer (HTTP Presentation)
│   ├── controllers/
│   │   └── post.controller.ts               # HTTP Request handlers
│   ├── routes/
│   │   └── post.routes.ts                   # Express route definitions
│   ├── middlewares/
│   │   └── error.middleware.ts              # Global error handler
│   └── app.ts                               # Express application setup
│
└── index.ts                                 # System Bootstrap & graceful shutdown
```

---

## 🌐 Live Public Demo URL (Publicly Accessible)

* **Base URL:** `https://five-labeled-adding-lanes.trycloudflare.com`
* **Health Check:** [https://five-labeled-adding-lanes.trycloudflare.com/health](https://five-labeled-adding-lanes.trycloudflare.com/health)
* **List Posts:** [https://five-labeled-adding-lanes.trycloudflare.com/posts](https://five-labeled-adding-lanes.trycloudflare.com/posts)

---

## ⚡ Event-Driven Flow (Kafka)

1. Client sends `POST /posts` request with `{ "title": "...", "content": "..." }`.
2. `CreatePostUseCase` persists the new post into **MongoDB** using `MongoPostRepository`.
3. Once persisted, the use case publishes `post.created` event via `KafkaEventProducer` to the topic `posts-events`.
4. In the background, `KafkaEventConsumer` receives the event and logs/processes it asynchronously:
   ```text
   ----------------------------------------------------
   [Kafka Consumer] [EVENT RECEIVED] on topic: posts-events (partition: 0)
   [Kafka Consumer] Event Type : post.created
   [Kafka Consumer] Post ID    : 66f4b...
   [Kafka Consumer] Post Title : Domain-Driven Design with Kafka
   [Kafka Consumer] Action     : Successfully processed post creation event.
   ----------------------------------------------------
   ```

---

## 🚀 How to Run with Docker Compose

### Prerequisites
* Docker Engine (version 24+)
* Docker Compose (version 2+)

### One-Command Setup
Clone the repository and run:

```bash
docker compose up --build
```

This starts 3 containers:
1. **`kafka`**: Apache Kafka 3.8.0 in KRaft mode (no Zookeeper required, light on memory).
2. **`mongodb`**: MongoDB 7.0 database.
3. **`posts-api`**: Node.js/TypeScript REST API listening on port `3000`.

To run in the background (detached):
```bash
docker compose up -d --build
```

To view live Kafka and API logs:
```bash
docker compose logs -f api
```

To stop all services:
```bash
docker compose down
```

---

## 💻 Local Development (Without Docker)

If you prefer running services directly on your host machine:

1. Ensure MongoDB is running on `mongodb://localhost:27017` and Kafka broker on `localhost:9092`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy environment file:
   ```bash
   cp .env.example .env
   ```
4. Start development server with auto-reload:
   ```bash
   npm run dev
   ```

---

## 📡 REST API Documentation

### Base URL
`http://localhost:3000` (or your deployed Cloud public IP)

### 1. Health Check
* **Method:** `GET`
* **Path:** `/health`
* **Response (200 OK):**
  ```json
  {
    "status": "healthy",
    "timestamp": "2026-10-07T10:00:00.000Z"
  }
  ```

---

### 2. Create Post
* **Method:** `POST`
* **Path:** `/posts`
* **Headers:** `Content-Type: application/json`
* **Body:**
  ```json
  {
    "title": "First Post",
    "content": "This is content for the post."
  }
  ```
* **Response (201 Created):**
  ```json
  {
    "success": true,
    "data": {
      "id": "6703bc9...",
      "title": "First Post",
      "content": "This is content for the post.",
      "createdAt": "2026-10-07T10:00:00.000Z"
    }
  }
  ```

---

### 3. List Posts
* **Method:** `GET`
* **Path:** `/posts`
* **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "6703bc9...",
        "title": "First Post",
        "content": "This is content for the post.",
        "createdAt": "2026-10-07T10:00:00.000Z"
      }
    ]
  }
  ```

---

### 4. Get Post by ID
* **Method:** `GET`
* **Path:** `/posts/:id`
* **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "id": "6703bc9...",
      "title": "First Post",
      "content": "This is content for the post.",
      "createdAt": "2026-10-07T10:00:00.000Z"
    }
  }
  ```
* **Response (404 Not Found):**
  ```json
  {
    "success": false,
    "error": "Post with ID \"...\" was not found."
  }
  ```

---

## 📬 Postman Collection

The file `postman_collection.json` is included in the root directory.

1. Open Postman.
2. Click **Import** and select `postman_collection.json`.
3. The collection includes:
   * Automatic setting of `postId` variable when `Create Post` is executed.
   * Parameterized `{{baseUrl}}` (easily switch between `http://localhost:3000` and your Cloud Deployment IP).

---

## ☁️ Cloud Deployment Guide (AWS / GCP Free Tier)

### Step 1: Launch Virtual Machine
* **AWS:** Launch an EC2 `t2.micro` or `t3.micro` instance (Ubuntu 22.04 LTS or 24.04 LTS).
* **GCP:** Launch a Compute Engine `e2-micro` or `e2-small` instance.

### Step 2: Configure Firewall / Security Group
* Allow inbound traffic on port `22` (SSH).
* Allow inbound traffic on port `3000` (API) or port `80`.

### Step 3: Enable Swap Memory (Crucial for Kafka on Free Tier)
Because free tier VMs have 1GB RAM and Kafka runs on JVM, enable a 2GB Swap file to prevent Out-Of-Memory (OOM) errors:
```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### Step 4: Install Docker & Docker Compose
```bash
sudo apt-get update
sudo apt-get install -y docker.io docker-compose-v2
sudo systemctl enable --now docker
sudo usermod -aG docker $USER
```

### Step 5: Deploy the Project
```bash
git clone <YOUR_GITHUB_REPO_URL>
cd <REPO_FOLDER>
sudo docker compose up -d --build
```

Test access:
```bash
curl http://<YOUR_PUBLIC_IP>:3000/health
```

---

## 🎥 Video Presentation Guide (3-5 minutes)

When recording the submission video:
1. **Introduction & Structure (1 min):**
   * Briefly explain the DDD folders (`domain`, `application`, `infrastructure`, `api`).
   * Show that domain entities and use cases are decoupled from MongoDB and Kafka.
2. **Docker Compose & Services (30 sec):**
   * Show `docker-compose.yml` with the three services (`api`, `mongodb`, `kafka`).
3. **API Demo & Kafka Event Flow (1.5 min):**
   * Open terminal showing `docker compose logs -f api`.
   * Open Postman, send `POST /posts`.
   * Immediately show the terminal log where the Kafka Consumer received and logged the `post.created` event.
   * Send `GET /posts` and `GET /posts/:id` to show MongoDB retrieval.
4. **Deployed Public Endpoint (1 min):**
   * Show the deployed instance in AWS/GCP and execute a request against the public IP.
