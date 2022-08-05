<br />
<br />
<br />
<img src="logo.svg" />

<h1 align="center" style="display:none">Oni.js</h1>
<p align="center">Agnostic & Simple State Managing library for Javascript Applications</p>
<p align="center">
  <img src="https://img.shields.io/npm/l/onijs?style=flat-square" />
  <img src="https://img.shields.io/npm/v/onijs?style=flat-square" />
</p>

<br />
<br />
<br />

## Motivation 🎖

1. **Simplicity** Helping us to create an easy and straightfowared state managment library without bloated boilerplates.
2. **Flexibility**, Giving us access to any level of properties of our state tree.
3. **Agnostic**, Compatible with any frameworks and vanilla javascript, aiming ubiquity.
4. **Testing ready** Easy to test and isomorphic by Design. Actions are pure functions and state a JSON object, you can test it with any testing libraries without any dependencies.

<br />
<br />


## Differences between Redux Philosophy 👓

### Redux's strategy
The main difference between Redux strategy and Oni is the fact that Redux works with composible functions called reducers. Each reducers responds to a one or several actions, so in order to track changes regarding where a certain change happen, you need to look to the property of the state and look for the reducer that has the responsibility to change it. By using Redux tools it shouldn't be a big problem, but there's a limitation... 

The reducer is restricted to only 1 property of your state. But there's a plenty situations where you want to change more then 1 property of your state given an action fired.


### Oni's strategy
Oni's strategy is about merging Redux principle with State Machine concepts creating another pattern. 
After a dispatch call, Oni will match the registered action function, executing it and providing the actual state, that action will be responsible to change any property of the state tree. 

So, in order to know what has changed a specific property of you app state, you need to look for the action fired.

---

## Installing ⚡️

`yarn add onijs` or `npm install onijs`
<br />
<br />
<br />


## Creating a Store instance 🕋

`./src/stores/my-store.js`

```js
import Oni from 'onijs'

const initialState = {
  user: { ... },
  counter: 0
}

export const store = Oni( initialState, {
  
  /**  @Actions **/

  COUNTER_ADD: ( state, { increment = 1 }) => {
    return {
      counter : state.counter + increment 
    }
  },

  COUNTER_SUBTRACT: ( state, { decrement = 1 }) => {
    return {
      counter: state.counter - decrement
    }
  }
})
```


First parameter is the serializable object `initialState`, the second is a collection of `actions` that you can name using your own pattern and getting payload from a **dispatch** call.

<br />
 
> 💡 You don't have to return all properities inside an action, only the ones you want to update.


<br />
<br />


## Using the store instance 👩🏻‍💻

```js
import store from './src/stores/my-store.js'

// Subscribe a function that will be called after every dispatch call
store.subscribe( ( (state, { action, payload }) => console.log( state, action, payload ) 

// Firing an action
store.dispatch('COUNTER_ADD', { increment: 2 }) // Second parameter can be any serializable object.

// Getting the current store state 
store.getState() 
store.unsubscribe( Function ) // Removes that subscriber function from update function list.
```

<br />
<br />

## React Adapter 🔌

You can use the React Hook adapter in order to use it on your React applications preserving the code design of the framework.

```jsx
import { useStore } from 'oni/react'
import store from './src/stores/my-store.js'

export default function MyComponent() {
  
  // All available options
  const { state, action, payload, dispatch, unsubscribe, subscribe } = useStore(store)

  const onButtonClick = (e) => {
		dispatch('COUNTER_ADD', { increment: 5 })
		// After dispatch:
		// action will be : COUNT_ADD
		// payload will be: { increment: 5 }
		// state will be current state
  }

  return (
    <div className="counter">
        <h1>Counter</h1>
        <p>{ state.counter }</p>
    </div>
  )
}
```

## Composing Actions Architecture 💡

We recomend you to always use 1 store for your application, but you can have several contexts and putting all the actions in the same store won't scale. 

So, one possible way to scale is to break down your actions in different contexts and **compose** them.
Here I'm gonna set all my actions under `use-cases` in my application folder structure:

```
.
├── home/
│   ├── ...
│   └── index.js
├── checkout/
│   ├── components
│   ├── services
│   ├── use-cases/
│   │   ├── cart.js
│   │   └── payment.js
│   └── index.js
└── shared/
    └── store.js
```

In order to create a store with a set of actions for a specific page or a group of pages like a checkout, we can create a factory function that will compose our **actions** and **initialStates**.

```js
import Oni from 'onijs'

export default function createStore( extInitialState, extActions ) {

	const initialState = {
		// If you wanna retrieve state from localStorage by default
		...JSON.parse( localStorage.getItem('my-store') || {}), 
		// Extending initialState with more properties depending on Page / Context you are
		...extInitialState
	}

	const actions = {
		...extActions
	}

	const store = Oni( initialState, actions )

	// If you wanna save your store whenever it updates
	store.subscribe((state) => {
		localstorage.setItem('my-store', JSON.stringify(state))
	})

	return store
}
```

All hardcoded parts from the code above can be parameterized, this is just an example on how you can use 1 store across your entire app by creating it dynamically with actions and initial states.

## Async Changes 

We belive that Javascript has a great set of tools and strategies to deal with concurrency but it can be very chalenging for those who are starting in the Front-end carrer or for those that are starting in a new team, so we wanna keep it as most simple as we can. So we highly recommend to break down in more actions to give a nice and clean flux of your application.

E.g
We wanna to dispatch an action that will fetch a list of products and in the same time update our UI loading state.

**Disclaimer: Feel free to create side-effect actions if you intend to simplify your architecture**

```js
const actions = {
	
	GET_PRODUCTS: (state, { url }, { dispatch }) => {
		
		fetch(url)
			.then( response => response.json())
			.then( products => dispatch('LOAD_PRODUCTS_FROM_API', { products }))
		
		return {
			appLoading :true
		}
	},

	LOAD_PRODUCTS_FROM_API: ( state, { products } ) => {
		return {
			products,
			appLoading: false
		}
	}
}

```

There are other ways to do the same thing we did in the code above, if you want to let your actions pure, you can make the service call from a component and delegate to the action only the state changes of your application:

```js
const actions = {
	
	GET_PRODUCTS: (state, { productsPromise }, { dispatch }) => {
		productsPromise.then( products => dispatch('LOAD_PRODUCTS_FROM_API', { products }))
		return {
			appLoading:true 
		}
	},

	LOAD_PRODUCTS_FROM_API: ( state, { products } ) => {
		return {
			products,
			appLoading: false
		}
	}
}

```

## What about Async functions? 🧐

You see that we used `.then` interface from Promises in the example above, you can use async functions in order to use `async` & `await` features, but be aware that by doing that, your action will return always a `Promise` so you won't be able to change application state right after the action be executed. 

## The end
> ...with great power comes great responsibility

Simplicity and flexibility always comes with a trade off, you can improve and scale your application flow or you can end making it worse, so it's important to discuss your architecture with others of your team in order to find a reasonable answer for your needs.


