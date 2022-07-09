<h1 align="center">Pandora 🕋</h1>
<p align="center">Agnostic & Simple State Managing library for Javascript Applications</p>
<p align="center">
	<img src="https://img.shields.io/npm/l/pandora?style=flat-square" />
	<img src="https://img.shields.io/npm/v/Pandora?style=flat-square" />
</p>

## Installing

`yarn add pandora` or `npm install pandora`
<br />
<br />
<br />

## Creating a Store instance 

`/src/stores/my-store.js`

```js
import pandora from 'pandora'

const initialState = {
  user: { ... },
  counter: 0
}

export const store = pandora( initialState, {
  
  /**  @Actions **/
  COUNTER_ADD : ( state, count ) => {
    return {
      count : state.counter + count 
    }
  }

})
```


First parameter is the serializable object initialState, the second is a collection of `actions` that you can name using your own pattern and getting payload from a **dispatch** that will be explained further.

 
> 💡 You don't have to return all properities inside an action, only the ones you want to update.


<br />
<br />
<br />

## Using the store instance

```js
import store from './stores/my-store'

// Subscribe a function that will be called after every dispatch call
store.subscribe( ( (state, { action, payload }) => console.log( state, action, payload ) 

// Firing an action
store.dispatch('COUNTER_ADD', 2) // Second parameter can be any serializable object.

// Getting the current store state 
store.getState() 
store.unsubscribe( Function ) // Removes that subscriber function from update function list.
```

<br />
<br />
<br />

## React Adapter

You can use the React Hook adapter in order to use it on your React applications preserving the code design of the framework.

```jsx
import { useStore } from 'pandora/react'
import store from './my-store'

export default function MyComponent() {
  
  // All available options
  const { state, action, payload, dispatch, unsubscribe, subscribe } = useStore(store)

  const onButtonClick = (e) => {
      dispatch('COUNT_ADD', 5)
      // After dispatch:
      // action will be : COUNT_ADD
      // payload will be: 5
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

