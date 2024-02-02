# AWS Serverless Application - Full Stack Developer Application Task

## Introduction

Thank you for considering my application for the Full Stack Developer position at WASLA. This README provides an overview of the serverless application developed using AWS Lambda, API Gateway, and Cognito, as part of the interview process.

## Task Overview

The objective of this task is to create a serverless application that includes a Lambda function, an API Gateway, and user authentication through AWS Cognito. The application should perform a simple operation through the Lambda function, trigger it via API Gateway, and ensure that only authenticated users can access specific endpoints.

## Implementation

### Serverless Function (AWS Lambda)

- **Function Name:** `ListEvents`
- **Language:** Node.js
- **Operation:** The Lambda function performs a basic arithmetic operation.

### API Configuration (AWS API Gateway)

- **Invoke URL:** `https://3ctxbvozlb.execute-api.eu-north-1.amazonaws.com/dev`
- **Methods:**
  - `GET /api/listEvents`: Invokes the Lambda function.
- **Authorization:**
  - Include an Authorization header with a valid token for authentication.
- **Request Type:**
  - No request parameters for simplicity.
- **Response Type:**
  - JSON response with the result of the operation.

### User Authentication (AWS Cognito)

- **User Pool Name:** `testPool`
- **Authentication Flow:**
  - I used amazon-cognito-identity-js and aws-jwt-verify packages

## Contact

For any questions or further clarification, please contact me at [rofa.alfons7@gmail.com].

Thank you for the opportunity.
