# My general workflow for upcoming projects
> **❗❗❗ Remember:** The goal of the API is to demonstrate your skills in the different aspects of backend development.

> These steps are in no way straightforward. In practical, you go back and forth as you refine your decisions.

### Step 1: Describe the API
Write a brief description of your API.

### Step 2: List all the API's affordances
- Research on the Apps Information Architecture
- What your app allows users to do
- All app features

### Step 3: Determine your API Architecture; Backend services/integrations
- Research on Architectural patterns, Architectural styles and Design patterns. Cient-Server? Event-driven? Microservices? MVC? etc.

- What backend services are you gonna integrate?: Database? Load balancers? Caches? CDNs? Compressors? Data manipulators? Converters? etc.

### Step 4a: User story outline
- Outline the flow involved in the architecture of each user story/action
- This is basically the folw of a dynamic diagram involving components and code diagrams

### Step 4b: Draw Architectural diagrams
- Create architectural diagrams based on the previous step
  - System context diagrams
  - Container diagrams
  - Dynamic diagrams (component + code diagrams) for each user story/action.
- Diagrams are based on the C4 model

### Step 5: Create API blueprint and specification
Open API specification, API blueprint

> **Note!!!** Don't do the whole of steps 4 & 5 in one go, your goal is "learning", rather, contribute a section of it everyday; this way you utilize spaced repetition, thereby solidifying your understanding.

### Step 6: Verify the design; Mock and Prototype; Review
This helps you interact with your API visually

> You can skip this step, if you'll do step 7

### Step 7: Create the Frontend simulation (alongside step 8)
- Only implement the features enough for sending and receiving data on the frontend, don't do any styling for the mean time, until you're done with the API.
- If `console.log()` is enough to prove that things are working, stay at that level for now.
- In the case of WebSockets or Media related stuff, you may need a little UI to prove things are working.

- In each action view, a response should be accompanied by its corresponding user story architecture diagram.


### Step 8: API Development (alongside step 7)
- Develop API using a language/framework of choice.
while taking [Step 3](#step-3-determine-your-api-architecture-backend-servicesintegrations) into account. ((NodeJS/Express | Go/Fiber))
- Test-Driven-Development (TDD)
-  Learn or Revise a concept as you get to its point of application.

- Periodically, revise Design Principles & Patterns and improve your designs.

> Don't defer this step for diagramming and specification. Just continue to build it up. Although, you may have to outline user story first.

### Step 9: Test your endpoints in Postman
Undergo this step if you don't have a frontend for the API

### Step 10: Deployment
- CI/CD, Hosting, Cloud services

### Step 11: Monitoring and Growth
