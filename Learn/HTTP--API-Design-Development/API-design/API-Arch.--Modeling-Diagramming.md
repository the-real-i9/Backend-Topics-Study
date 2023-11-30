# API Architectural Diagrams
Ways you can visually communicate the architecture and flow in your API at different levels.

# Sequence Diagrams
Sequence diagram are used to depict the flow that occurs between the components of an API, when a user performs an action and receives a response.

The different components of an API are represented as boxes or objects. Each interaction, represented as arrows or lines, is labeled with the action that is being sent or received.

For example, the flow of a user <u>creating an account</u>, <u>creating a post</u>, <u>purchasing an item</u> etc. Visualizing this flow between the components of your API is what we're talking.

Diagram should show any, 
- action command
- request construction
- dynamic data changes
- decision making
- caching logic
- storage logic
- proxy logic
- validation
- response construction etc., 
that may be occuring for a user action/request.

Basically, *every* thing, effect or changes that occur as a user request/action is being processed, at every point in the flow of information. Whatever is occuring.

# End-to-End Diagrams
End-to-end diagrams provide a high-level view on an API, showing how it interacts with external systems and services.

The API is placed in the center, with the different external systems and services that it interacts with around it. 

They are useful for undestanding the overall architecture of an API and the diffent systems and services that it interacts with. This is often seen in System design books.

External system and services depicted can include, caches, storages, databases, CDNs, Message Brokers, Load balancers etc.


# Component Diagrams
Component diagrams are used to show the different components of an API and how they interact with each other.

They a particularly useful for understanding the overall structure of an API and how its different components are organized.

The different components of an API are the independent implementations that serve specific purposes. For example the components that:
- Sign-in, Sign-up, Reset password, Validates user inputs, Authenticates user
- Creates posts, Add an item to cart etc.

Generally, these are handlers that API endpoints lead to, whether explicitly or implicitly.