## React

From this course: React - The Complete Guide (incl Hooks, React Router, Redux)

### Basics
**What is React?**
- A client side JS library
- Client side = browser base
- Maniuplates page after its loaded
  - Ex: Netflix, never requesting a new html page because JS is updating the DOM. This reduces latency. 
  - Mobile apps are another good example, things happen instantly.

**Can't you just use JS?**
  - Rendering dynamic content becomes complex
  - Has limits, you must write every step to be taken: create elem, set elem, add listener, add listener action, etc. 
  - Imperative approach (action-after-action)
    - React library would create these for us, so it is superior for building complex user interfaces. Helps create declarative components. 

**Single page apps**
- another approach is the widget approach: some pages are still rendered and served on backend. 
- SPA approach: server sends one HTML page and then React modifys the UI

**Alternatives?**
- Angular? Overkill for small projects, uses TS, component based UI
- Vue? Compnent based, less popular than React + Angular. 

**Setting up a project**
- Needs a build step. Behind the scenes the code is transformed before it reaches the browser.
- We also want a dev server to locally host the server to update the page in the browser automatically
- create-react-app 
- nodejs = js runtime to run js outside of browser
- scripts run in build test. Combines w 3rd party code and ensures that things build fine
- npm install -> node_modules -> hold 3rd party dependencies and their dependencies. 

**How React works**
- Index.js first rendered
- build step chews on JSX, which is converted to html later on. 

### Creating with React
**Components**
- All custom components start with capital letter to differentiate from builtin components.
- `{stuffinside}` are called dynamic expressions
- Handlers = function that is invoked to make something else happen
  - When declaring `onClick` functionality, do not add `()` when adding.
```js
<button className="btn" onClick={deleteHandler()}>
vs
<button className="btn" onClick={deleteHandler}>
```
  - If parenthesis added, called immediately upon being evaluated by JavaScript than when interacted with.

You can create custom attributes for your components
```js
// where used
<Backdrop onCancel={closeModalHandler} />

// then in the component, we are passing in the closeModalHandler function as a prop to be used.
function Backdrop(props) {
  return <div className="backdrop" onClick={props.onCancel} />;
}
//note: cannot impose custom attributes on already defined components, in this case, the div.
``` 

**State**
- Changes what we see on the screen dynamically (adding elems, changing text, etc.)
- `useState()` is a react hook which can only be callled w/in the component function and not nested in another function.
  - creates state react is aware of.
  - always returns an array of two elems which we can assign variables
    - `const [modalIsOpen, setModalIsOpen] = useState(false);`
    - second elem is a function to allow you to change that first value, `modalIsOpen`.
    - When state changing function called, react re-evals and updates whats rendered.
  - 

### Adding more complexity
Routing ( utilizing react-router-dom )
- Single Page Application = no new html loaded. Illusion of different pages by utilizing react, which means we never wait for new page to load. CSR = faster than sending request to server.
- Add routing = routing tool which watches for url changes, and we tell if which component should be loaded per url.
- You should create a `pages` folder, along with your `components` folder.
```js
// initialize usage in index.js
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
```
- BrowserRouter =component itself
- Use Route component which listens for url
```js
function App() {
  //domain is localhost:3000
  // path = whats after the domain, ex: localhost:3000/my-page
  // routes acts as a switch statement
  return (
    <div>
      <Routes>
        <Route path="/" element={<AllMeetUpsPage />} />
        <Route path="/new-meetups" element={<NewMeetUpsPage />} />
        <Route path="/favorites" element={<FavMeetUpsPage />} />
      </Routes>
    </div>
  );
}
```

**Adding a Navigation Bar**
- using an anchor tag,`<a></a>` will cause another request to be triggered, do not use.
- `<Link>` component does render an anchor tag, but reat-router-dom adds a click listener to surpress the browser default of sending a request, and just parse the desired url, and loads the appropriate component.

**CSS Modules**
- Used for keeingp styling scopes to components, ensures we can attach specific css to specific components
```js
// you can import the classes as anything, but we choose to name them classes
import classes from './MainNavigation.module.css';
// specific the class using dot annotation
function MainNavigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}> Meetups </div>
      <nav>
        <ul>
            <li>
                <Link to="/">All Meetups</Link>
            </li>
        </ul>
      </nav>
    </header>
  );
}
```

**Lists of Data**
- Arrays are rendered out of the box in react
```js
// we have page where we want to render a list of objects.
// we pass in the data as meetups
  return (
    <div>
      <h1>AllMeetUpsPage</h1>
      <MeetUpList meetups={DUMMY_DATA} />
    </div>
  );

// in the MeetUpList, we map the props of each meetup to an attribute of a MeetUpItem
function MeetUpList(props) {
  // render 1 meetup per obj the meetup array
  return (
    <ul className={classes.list}>
      {props.meetups.map((meetup) => (
        <MeetUpItem
          key={meetup.id}
          id={meetup.id}
          image={meetup.image}
          title={meetup.title}
          address={meetup.address}
          description={meetup.description}
        />
      ))}
    </ul>
  );
}

// in MeetUpItem we declare where to use the props. 
function MeetUpItem(props) {
  return (
    <li className={classes.item}>
      <div className={classes.img}>
        <img src={props.image} alt=""/>
      </div>
      <div className={classes.content}>
        <h3>{props.title}</h3>
        <address>{props.address}</address>
      </div>
      <div className={classes.actions}>
        <button>To favorites</button>
      </div>
    </li>
  );
}
```

**Wrapper Components**
Inject JSX content into component
```js
// .children is built into props functionality, children always holds content of props.
function Card(props) {
  return <div className={classes.Card}>
    {props.children}
  </div>;
}
```

**Making a Form**
```js
function NewMeetUpForm() {
  return (
    <Card>
      <form className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="title">Meetup Title</label>
          <input type="text" required id="title" />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Meetup Image</label>
          <input type="url" required id="image" />
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Address</label>
          <input type="text" required id="address" />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea required id="address" rows="5" />
        </div>
        <div className={classes.actions}>
          <button> Add Meetup</button>
        </div>
      </form>
    </Card>
  );
}
```
Note: Browser default sends request to server automatically on submit of form. We will want to override this.
**Getting Input**

All events will pass the event arg to the function that is executed for the events
```js
  function submitHandler(event) {
    event.preventDefault();
  }
```

**Using Refs / References**
Use for reasing values, allow us direct access to DOM elems.
```js
  // gives us access to input elem thru ref object
  const titleInputRef = useRef();

  // All events will pass the event arg to the function that is executed for the events
  function submitHandler(event) {
    // preventDefault is vanilla js
    event.preventDefault();
    // track input only once, js reference obj holds actual connected val
    const enteredTitle = titleInputRef.current.value;
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Meetup Title</label>
          <input type="text" required id="title" ref={titleInputRef} />
        </div>
        ...
```

**UseEffect()**
Hook that allows you to run some code under certain conditions, so that is does not always run.