# Web_API_Design

This repository contains the source code and documentation for testing a serverless Web API application on Postman developed as part of a Web API Design course project. Built using **Azure Functions** and **JavaScript**, the API is designed to manage Create and Read functionality.

## Features
- **Serverless Architecture**: Deployed on Microsoft Azure using HTTP-triggered Azure Functions.
- **User Data Management**: Supports creating and reading user records.
- **Monitoring & Diagnostics**: Utilizes Azure Application Insights for monitoring API performance and tracking key metrics, including response times and error rates.

## Tools & Technologies
- **Azure Functions**
- **JavaScript/Node.js**
- **Application Insights** for monitoring
- **Visual Studio Code** for development
- **GitHub** for version control

## Testing the API

The following sections provide details on testing API functionality using **Postman**.

### 1. GET `/users`
Retrieve all users with optional pagination, sorting, and search.


#### Testing GET in Postman
1. Navigate to Sam-0073/Web_API_Design/blob/main/MyAnonymousFunction/Application.txt
2. Copy the Application link and paste it in Postman URL field
3. Set the request type to `GET`.
5. Add optional query parameters as needed.
6. Hit Send button

### 2. POST `/users`
Add a new user.

#### Request Body example in JSON
{
  "name": "Sam",
  "email": "sam@unb.ca"
}

#### Testing POST in Postman
1. Navigate to Sam-0073/Web_API_Design/blob/main/MyAnonymousFunction/Application.txt
2. Copy the Application link and paste it in Postman URL field
3. Set the request type to POST.
4. Go to the Body tab, select raw, and set the format to JSON.
5. Paste the JSON body.
6. Hit Send button
