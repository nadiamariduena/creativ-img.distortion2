- Redux (and the underlying general idea of Flux) was invented to manage and debug application state in very large software systems. Think Facebook. If your team has hundreds of developers and millions lines of code, it is often difficult to write modular tests and find bugs. Redux makes state changes explicit, localizes them in one store and has strict rules about side effects. This makes your code easier to test and it makes application state easier to reason about.

<br>

- A goal of redux is also to be a convention, not a library. So redux is plain Javascript and you don’t need any dependencies to use it (although many will probably use the react-redux bindings). This makes using redux pain-free from a dependency management point of view; but it also makes you write a lot of boiler plate code.

### What I Hate About Redux

- If you use redux to develop your application, **even small changes in functionality require you to write excessive amounts of code**. This goes against the direct-mapping principle, which states that small functional changes should result in small code changes.

#### 🔺

- Just imagine, you want to add a new variable to your state just to try it out. You think this little change will satisfy your tests and in a pragmatic way, you go for it. Doing so in a non-redux application might need changes in one or two files and take you two minutes. Not so in a redux application. **With redux you will have to touch many files and you will have to repeat yourself a lot:**

Define an action constant in my-feature/constants.js
Import that constant and define an action in my-feature/actions.js
Import the constant and define a state change in my-feature/reducer.js
Import the action and dispatch it in your component my-feature/MyComponent.js
Oh wait, before you can do that, you need to connect your component to the redux store by wrapping it in a HOC
Oh, and before you can do that, you need to define two functions called mapStateToProps and mapDispatchToProps
If you’re about to add a variable filled from an API, you will need to do ALL the above x3: fetchMyValue, fetchMyValueSuccess and fetchMyValueError!

<br>

#### You do ALL the above (maybe minus the API part) for every little variable you add! This has so many disadvantages that I don’t even know where to begin:

- You will forget about the business value you want to deliver, because you’re distracted by writing code in all the right places.

- It will take you considerably longer to just “try things out”.
  Jumping between files hinders a productive coding flow.

- Many indirections make code hard to adapt and difficult to understand.

##### If you’ve ever needed to react to a client (or to your own wish) wanting to see how this or that would look like, you know how much of a pain and agility-killer redux can be!

#### You Don’t Need Redux 🍌

> Most teams I meet — whether in startups or international corporations — are concerned with finding a market to build or grow their business (lean startup, design thinking) or with adapting their software to ever changing market situations and customer demands (customer development, agility). In these cases the burden redux puts on you far outweighs its benefits!

> Chances are, you’re building a new application to test a business idea or you’re improving an application to grow your business by catering to new customer segments. You don’t need to hunt strange bugs in your state between millions of lines of code and with a team of hundreds of developers. So you won’t feel much of the benefits of redux, while being bogged down by the lack of direct-mapping and DRYness (=Don’t Repeat Yourself) of the approach.

https://orgler.medium.com/dont-use-redux-9e23b5381291
