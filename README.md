# 🌐 Serverless Web APIs with Microsoft Azure Functions

![Azure Architecture](https://learn.microsoft.com/en-us/azure/architecture/example-scenario/apps/media/serverless-web-app/architecture-diagram.png)

## 🚀 Overview

This project demonstrates the design, development, and deployment of **two robust serverless APIs** using **Microsoft Azure Functions**:

- 🔄 **CRUD API** for user data operations.
- 🧠 **Sentiment Analysis API** using **Azure AI Language Services**.

It harnesses the power of **serverless computing** to enable automatic scaling, efficient cost management, and seamless integration with other Azure services like **Cosmos DB**, **Application Insights**, and **Text Analytics**.

---

## 📦 Tech Stack

| Tech                  | Purpose                          |
|----------------------|----------------------------------|
| Azure Functions       | Serverless HTTP-triggered APIs   |
| Azure Cosmos DB       | NoSQL database for CRUD app      |
| Azure AI Language     | Sentiment analysis API           |
| Visual Studio Code    | Local development & deployment   |
| Postman               | API Testing                      |
| Application Insights  | Monitoring & performance metrics |
| Node.js               | Backend development              |

---

## 📁 Features

### 🔄 CRUD API
- Create, read, update, and delete users.
- Built using **HTTP-triggered Azure Functions**.
- Data stored in **Cosmos DB**.
- Includes full support for:
  - `GET` – retrieve all users
  - `POST` – create a new user
  - `PUT` – update existing user by ID
  - `DELETE` – delete user by ID

### 🧠 Sentiment Analysis API
- Accepts text via `POST` request and returns:
  - Overall sentiment
  - Confidence scores
  - Sentence-level analysis
- Powered by Azure's **Text Analytics API**.

---

## 🧪 How to Use

### 🌐 API URLs
After deployment, each function is accessible via public URL.

### 🔧 Test with Postman

**Sample `POST` for Sentiment Analysis**
```json
{
  "sentence": "I love Azure!"
}
