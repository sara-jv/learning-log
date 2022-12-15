# React Hydration

## What is it?
Using client-side JS to add state and interactivity to server-side rendered HTML. React attaches event listeners to the exisitng markup and takes over rendering.
- You hydrate only 1 "root" @ startup
- Hydration should not be called again, instead state should be updated.
- Client-side rendering uses JavaScript to create the DOM. A minimal HTML document serves as the application container, and only contains links to the JS and CSS necessary to render the application.

**Client-side rendering**
- All logic, data fetching, templating, and routing are handled on the client-side / in browser.
- How it works:
  - The browser receives a request for a page, it sends HTML, CSS and, JS code to be run in the browser. The script tag contains all the instructions in the React code. It is loaded in the browser, and the app becomes interactive.
- Actions trigger DOM updates isntead of network requests. 
  - Clicking a navigation link builds the requested page on the client instead of requesting it from the server
- Pros:
  - Fewer network requests = fast after initial download
  - Bad for webcrawlers = bad SEO
  - User can experience blank page when there are network issues.
- Drawbacks:
  - none of your site’s content is visible or interactive until the client downloads js and builds the DOM.

**Server-side rendering**
- server prepares an HTML page by fetching user-specific data and sends it to the user’s machine. The browser then constructs the content and displays the page. This entire process of fetching data from the database, creating an HTML page and sending it to the client happens in a few milliseconds.
- Makes HTML available to client before JS loads
-  site visitors can see and read your content even if it is not fully interactive. 
-  Pros: 
   -  No blank page!
   -  search engines / crawlers can consume site.
- Drawback:
  -  every URL request requires another round trip to the server.

**Hydration**
- Hybrid approach! 
- Instead of having an empty DOM to render all of our react components into, we have a DOM that has already been built, with all our components rendered as HTML.
  - When a visitor requests their first URL from your site, the response contains static HTML along with linked JS, CSS, and images. 
- React then takes over and *hydrates* that HTML: adds event listeners to the DOM created during HTML parsing, and turns your site into a full React application. 
- If you call `ReactDOM.hydrate()` on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.


**hydrate() vs render()**
- render may change your node if there is a difference between the initial DOM and the current DOM. hydrate will only attach event handlers.
- Example: Serve two pages, one which uses ReactDOM.hydrate and one which uses ReactDOM.render.
  - On the "hydrate" page:
    - all the markup is immediately rendered, because all the necessary html is served with the page. The button is unresponsive because there are no callbacks connected yet. Once components.js finishes loading, the load event fires from the window and the callbacks are connected with hydrate.
  - On the "render" page: 
    - the button markup isn't served with the page, but only injected by ReactDOM.render, so it isn't immediately visible. Note how the appearance of the page is jarringly changed by the script finally loading.

Another answer for hydrate vs render
```
Hydrate is basically used in case of SSR(Server side Rendering). SSR gives you the skeleton or HTML markup which is being shipped from a server so that for the first time when your page loads it is not blank and search engine bots can index it for SEO(A use case of SSR). So hydrate adds the JS to your page or a node to which SSR is applied. So that your page responds to the events performed by the user.

Render is used for rendering the component on client side browser Plus if you try to replace the hydrate with render you will get a warning that render is deprecated and can't be used in case of SSR. it was removed because of it being slow as compared to hydrate.
```

References:
* https://beta.reactjs.org/apis/react-dom/hydrate
* https://www.gatsbyjs.com/docs/conceptual/react-hydration/
* https://stackoverflow.com/questions/46516395/whats-the-difference-between-hydrate-and-render-in-react-16