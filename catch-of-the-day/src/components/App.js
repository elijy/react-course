import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';



class App extends React.Component {
  constructor() {
    // WE need this to start using state
    super();
    // This is how we add a method to our component
    this.addFish = this.addFish.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    this.sampleLoad = this.sampleLoad.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.removeFishFromOrder = this.removeFishFromOrder.bind(this);

    // State is just a huge object
    // This is setting our initial state (theres nothing to start in this case)
    this.state = {
      fishes: {},
      order: {}
    }
  }

  /* This is a defined name function from react for lifecycle
   * It fires right before the function is loaded onto the page
   */

  componentWillMount() {
    // Firebase stuff
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });
    // Check localStorage before loading component
    const doesExist = localStorage.getItem(`order-${this.props.params.storeId}`);

    if(doesExist) {
      this.setState({
        order: JSON.parse(doesExist)
      })
    }
  }

  componentWillUnMount() {
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeId}`,
    JSON.stringify(nextState.order));
  }

  /* Add fish */
  addFish(fish) {
    // WE gonna use this function to update state
    // Step 1. is get a copy of the current State
    const fishes = {...this.state.fishes}; // Using a spread operator to easily copy objects
    // Step 2. Is create the new fish (object) that we want to add to the State
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish; // This just means create a new fish in the object with the timestamp as the key and the the value being the fish we just passed in.
    // Step 3. Is adding the new state we've updated back to the state of the application
    this.setState({fishes}); // setState is a react function, fishses is the key on the state object we've just updated
  }

  /* Update fish */
  updateFish(key, fish) {
    // WE gonna use this function to update state
    // Step 1. is get a copy of the current State
    const fishes = {...this.state.fishes}; // Using a spread operator to easily copy objects
    // Step 2. Is create the new fish (object) that we want to add to the State
    fishes[key] = fish; // This just means create a new fish in the object with the timestamp as the key and the the value being the fish we just passed in.
    // Step 3. Is adding the new state we've updated back to the state of the application
    this.setState({fishes}); // setState is a react function, fishses is the key on the state object we've just updated
  }

  /*  Remove fish */
  removeFish(key) {
    // WE gonna use this function to update state
    // Step 1. is get a copy of the current State
    const fishes = {...this.state.fishes}; // Using a spread operator to easily copy objects
    // Step 2. Is create the new fish (object) that we want to add to the State
    fishes[key] = null; // This is how you delete an item from firebase 😄
    // Step 3. Is adding the new state we've updated back to the state of the application
    this.setState({fishes}); // setState is a react function, fishses is the key on the state object we've just updated
  }

  removeFishFromOrder(key) {
    // Now remove the fish from our order as well
    const order = {...this.state.order}; // Step 1.
    delete order[key]; // Step 2.
    this.setState({order}); // Step 3.
  }

  sampleLoad() {
    //Load some sample fishys
    this.setState({
      fishes: sampleFishes
    })
  }

  addToOrder(key) {
    // This is to add a fish to our order State
    const order = {...this.state.order}; // Step 1.
    order[key] = order[key] ? order[key] + 1 : 1; // Step 2.
    this.setState({order}); // Step 3.

  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline='Funky fresh beats'/>
          <ul className="list-of-fishes">
            { // THIS IS HOW WE ADD COMMENTS & ANY JS
              Object.keys(this.state.fishes).map( key => {
                return <Fish key={key} keyForYouToUse={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>
              })
            }

          </ul>
        </div>
          <Order
            fishes={this.state.fishes}
            order={this.state.order}
            removeFishFromOrder={this.removeFishFromOrder}
            params={this.props.params}
            />
          <Inventory
            addFish={this.addFish}
            updateFish={this.updateFish}
            removeFish={this.removeFish}
            sampleLoad={this.sampleLoad}
            fishes={this.state.fishes}
          />
      </div>
    )
  }
}

export default App;
