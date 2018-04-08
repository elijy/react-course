import React from 'react';
import AddFishForm from './AddFishForm';

class Inventory extends React.Component {
  constructor() {
    // WE need this to start using state
    super();
    // This is how we add a method to our component
    this.renderInventory = this.renderInventory.bind(this);
    this.handleEvent = this.handleEvent.bind(this);
  }

  // Handle the changes and stuff
  handleEvent(e, key) {
    // The fish we guan update
    const fish = this.props.fishes[key];
    const updatedFish = {
      ...fish,
      [e.target.name]: e.target.value
    }
    // Call our function to update the state
    this.props.updateFish(key, updatedFish);
  }

  renderInventory(key) {
    const fish = this.props.fishes[key];
    return (
      <div className="fish-edit" key={key}>
        <input value={fish.name} onChange={(e) => this.handleEvent(e, key)} type="text" name='name' />
        <input  value={fish.price} onChange={(e) => this.handleEvent(e, key)} type="text" name='price' />
        <select value={fish.status} onChange={(e) => this.handleEvent(e, key)} name="status">
          <option value="available">Its dere Mon</option>
          <option value="unavailable">Nah Mon</option>
        </select>
        <textarea value={fish.description} onChange={(e) => this.handleEvent(e, key)} name='description'></textarea>
        <input value={fish.image} onChange={(e) => this.handleEvent(e, key)} type="text" name='image'/>
        <button onClick={() => this.props.removeFish(key)}>Remove De Fish</button>
      </div>
    )
  }

  render() {
    return (
      <div>
        <h2>Inventory</h2>
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.sampleLoad}>SAMPLE A FISH</button>
        {Object.keys(this.props.fishes).map(this.renderInventory)}
      </div>
    )
  }
}

export default Inventory;
