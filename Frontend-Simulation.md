## Frontend Simulation
Your frontend will be in such a way that it only exposes the interaction with backend endpoints in the app flow. While documenting the explanation of what's happening in the backend.

On the page:
- The current page name.
- Left Sidebar consisting a list of possible server requests on that page as side-tabs.
  - Each list consist of request type, name, description and endpoint.
- Right Sidebar consisting of explanation of what's happening on the backend
- Center consisting of either a response JSON for a GET server request or a form UI for a POST server request. And contents as applicable to other requests.
  - If an endpoint of a tab is a dynamic endpoint(/:productId), before the request is sent, on the center is a select input that allows to select the desired param. After we provide one, we then send the request.

After executing a request on an endpoint, redirect to the next page like a real UI. This page will also have the above structure.

Let's take a **social media app** for example. 
- It starts with the **authentication** page:
  - So the direct tabs will include: Sign in, Sign up, forgot password.
  - After sending a POST to sign in endpoint, it redirects to an email verification endpoint, 