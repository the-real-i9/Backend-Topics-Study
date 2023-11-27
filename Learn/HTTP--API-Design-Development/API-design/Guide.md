# API Design Workflow
- **Step 1:** Create a state machine (architectural) diagram
- **Step 2:** Describe all the actions the API affords
- **Step 3:** Formalize the design in the OpenAPI Specification (API blueprint)
- **Step 4:** Verify the design/blueprint. Create a prototype or mock for your API.
- **Step 5:** Review the API Design
- **Step 6:** Develop the API
  - Test the API alongside.

# A 7-Step Guide to Create an API with Frameworks
## Step 1: Figure Out the Purpose of Your API
This involves understanding your target audience and their requirements.

This step doesn't apply to a private API for an application or organization. **For public APIs**, focus on the following tasks:
- Identify your Audience
- Integrate the Needs and Requirements
- Cost-Benefit Analysis
- Developer Support and Experience

## Step 2: Choose the API Architecture
REST, GraphQL, gRPC etc.

Currently, the REST architecture is the most popular for web APIs. You can **use the OpenAPI Specification to design RESTful APIs**.

Create your API's blueprint/specification and Architectural diagram.

Secure your API from malicious attacks through authentication services like OpenID and OAuth2, and by encrypting client-server interactions (TLS).

## Step 3: Choose your Language and Framework
- Nodejs: Express, NextJS, NestJS etc.
- Go: GIN, Fibre etc.


## Step 4: Develop your API
Use the language/framework of your choice to code your API
### 1. Design your Endpoionts
Follow these guidelines to create a clean and efficient design for your endpoints
- Follow proper naming conventions
- Allocate a unique endpoint to each resource
- Ensure easy navigation by organizing your endpoints in an orderly hierarchy.

### 2. Implement your Endpoints with Server Responses
Use standard HTTP functions methods that define the server response.

Define proper parameters for each endpoint, along with the appropriate data it should return.

Send valid response codes with relevant messages. However, make sure you don't expose your system by displaying critical information.

Finally, build effective mechanisms to handle errors and exceptions.

## Step 5: Test your API
Test your API for functionality and security before deploying it for professional use.
- Set up mock servers to test your API.
- Test API functions in isolation
- Test for realistic situations and scenarios using realistic data
- Test for edge cases, errors, and exceptions.
- Test for all network conditions users are likely to encounter
- Test for web security

You must fix all major issues before deploying the API. However, these fixes may end up creating newer problems in a never-ending cycle.

Only a good API design can prevent this catastrophe, which is something you must accomplish before the coding stage.

## Step 6: API Documentation
Clear and comprehensive documentation is requierd for third-party developers to properly utilize your API.

There are tools for generating documentation, using your OpenAPI designs and API blueprints.

This documentation must explain:
- how to use each endpoint
- what kind of data is retured
- the functional details of the API
- the authentication scheme
- supported HTTP requests and responses
- error and exception handling

You'll also need to include supporting materials such as tutorials, SDKs, and other educational and development tools.


## Step 7: Deploy, Monitor, and Iterate
> Learn deeper on each of these topics.

This process can be divided into three cyclical states:

### 1. Deploy your API
Heroku, AWS, Google Cloud, Microsoft Azure.

### 2. Monitor your API
Once deployed, you'll need to monitor your API's perfomance and usage to ensure that it's meeting the needs of your users.
- **Perfomance Analysis:** Collect data on technical perfomance such as load time, downtime, server responses, number of client requests, errors and exceptions, etc. <u>This is mandatory for private APIs</u>.
- **Business Analysis:** Track the number of developers that use your API, the financial performance of third-party apps and your own API (if it's a commercial product), etc.
- **Collect User Feedback:** Create easy avenues for developers to share their feedback.

### 3. Iterate Over your API
Maintain your API by fixing bugs and adding new features. Take into account all the insights you've gained from your analysis.

With time, you can also iterate new versions of your API. But make sure it supports backward compatibility.

# A Web API Design Methodology


---
---

# 10 steps to design and build the perfect API
### Step 1: Choose an API type
Whether REST, GraphQL, gRPC etc.

### Step 2: Plan out your API's capabilities
You need to consider 
- who the API will be used by, 
- to what actions do they need access, and then you must
- list out those actions.

You need to explain 
- how the API will interact with existing services,
- how it will be documented,
- how developers will interact with it,
- and how you are planning to manage support.

### Step 3: Create a blueprint or specification for your API.
Learn and use these:
- API blueprint language specification.
- OpenAPI Specification

### Step 4: Prototype your API
Prototype or Mock your API and have your potential users interact with it as if its was the actual API you are building.

Tools like **Postman** would help.

### Step 5: Implement User Accounts & Authentication
Build the authentication system that allows only authorized users to access your public API. This means implementing user accounts.

This is where the `API_TOKEN` thing comes in.

### Step 6: Build your API methods, endpoints, and resources
This is where you write your API backend code.

Adhere to best practices:
- Headers
- Status codes
- Error messages etc.

### Step 7: Provide API documentation


> Most of these steps are only needed for a public API. Make sure to skip them irrelevant steps.