# 🌐 Serverless Web APIs with Microsoft Azure Functions

This project demonstrates the design, development, deployment, and monitoring of two robust serverless APIs using Microsoft Azure Functions:

- 🔄 **CRUD API** for user data operations
- 🧠 **Sentiment Analysis API** leveraging Azure AI Language Services

It showcases how serverless computing can scale applications automatically, minimize infrastructure costs, and integrate seamlessly with other Azure services such as Cosmos DB and Application Insights.

---

## 🧱 Architecture

Azure’s resource hierarchy is used effectively:

- **Management Group → Subscription → Resource Group → Resources**

APIs are built using **HTTP-triggered functions**, deployed via Visual Studio Code, and monitored with Azure's **Application Insights**.

![Azure Hierarchy](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-setup-guide/media/organize-resources/organize-resources.png)

---

## 🛠️ Tools & Technologies

| Tool / Tech              | Purpose                                 |
| ------------------------ | --------------------------------------- |
| **Azure Functions**      | Serverless backend for APIs             |
| **Azure Cosmos DB**      | NoSQL storage for CRUD operations       |
| **Azure AI Language**    | Sentiment analysis service              |
| **Visual Studio Code**   | Local development environment           |
| **Azure Functions Core** | Local testing and running of functions  |
| **Application Insights** | API performance monitoring              |
| **Postman**              | API testing                             |
| **Node.js**              | API development language                |

---

## 🔄 CRUD API Implementation

### 1. Setup Azure Function App
- Chose Node.js (latest) on Linux in the East US region.
- Deployed under a Consumption plan to automatically scale and control costs.
- Connected Application Insights for real-time monitoring.

### 2. HTTP-Triggered Function
- **Authorization Levels:** Anonymous, Function, or Admin.
- **RESTful Behavior:**
  - `GET`: Retrieve all users.
  - `POST`: Create a new user.
  - `PUT`: Update an existing user.
  - `DELETE`: Remove a user.
- Returns the appropriate status codes (e.g., 200, 201, 404, 405, 500).

### 3. Testing
- Tested using the Azure Portal’s **Code + Test** interface.
- Verified API functionality using **Postman** with JSON payloads.

---

## 🧠 Sentiment Analysis API Implementation

### 1. Azure Language Service Setup
- Created a Language Service resource in Azure.
- Retrieved the API Key and Endpoint, then stored them as environment variables.

### 2. Function Logic
- Utilizes `TextAnalyticsClient` and `AzureKeyCredential` to authenticate calls.
- Validates the incoming JSON payload (expects a key called `sentence`).
- Sends the sentence to Azure AI for sentiment analysis and returns:
  - Overall sentiment.
  - Confidence scores.
  - Sentence-level sentiment breakdown.

### 3. Testing
Example request:
```json
{
  "sentence": "I love Azure!"
}
```
Expected response:
```json
{
  "sentiment": "positive",
  "confidenceScores": {
    "positive": 0.98,
    "neutral": 0.01,
    "negative": 0.01
  }
}
```

---

## 🚀 Deployment Workflow

### From VS Code to Azure:
- **Develop Locally:** Use the Azure Tools extension for development.
- **Run & Test:** Execute functions using Azure Functions Core Tools (press `F5` or use Run & Debug).
- **Deploy:** Right-click → **Deploy to Function App** in VS Code to push your changes to Azure.

### From VS Code to GitHub:
- **Initialize:** Create the Git repository.
- **Commit & Push:** Commit all changes and push to GitHub.
- **CI/CD (Optional):** Set up GitHub Actions for automatic deployments.

---

## 📈 Monitoring with Application Insights

### A. System-level Monitoring (Function App Metrics)
- **Tracks:** CPU usage, memory consumption, and function invocation counts.
- **Monitors:** Average execution times and failure rates.

### B. Application-level Monitoring (Application Insights)
- **Captures:** API latency, request throughput, and error diagnostics.
- **Provides:** Real-time live metrics and dependency tracking.
- **Logs:** Custom telemetry using `context.log`.

---

## 📊 Performance Metrics

### CRUD API:
- **Average Response Time:** ~520 ms.
- **Cold Start Spikes:** Occasional spikes up to 8.35 seconds.

### Sentiment Analysis API:
- **Average Response Time:** ~1.53 seconds.
- **Variability:** Response times range from 90 ms to 3 seconds based on the load.
