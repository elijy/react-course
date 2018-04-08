import React from 'react';
import { formatPrice } from '../helpers.js';


class Order extends React.Component {
  constructor() {
    // WE need this to start using state
    super();
    // This is how we add a method to our component
    this.renderOrder = this.renderOrder.bind(this);
  }

  renderOrder(key) {
    const {fishes, order} = this.props;
    const fish = fishes[key]; // So we can get the price of the fish
    const count = order[key]; // So we can get how many fishes we bought ❌

    // For saftey
    if(!fish || fish.status === 'unavailable') {
      return (
        <li key={key}>
          NO FISH FOR YOU
          <button onClick={() => this.props.removeFishFromOrder(key)}>'❌'</button>
        </li>
      )
    }
    return (
      <li key={key}>
        <span>
          {fish.name} x {count}
          <button onClick={() => this.props.removeFishFromOrder(key)}>&times;</button>
        </span>
        <span className="price">{formatPrice(fish.price * count)}</span>
      </li>
    )
  }

  render() {
    const {fishes, order} = this.props;
    const orderIds = Object.keys(order); // All the ids of fish we've ordered (and count)

    const total = orderIds.reduce( (prevtotal, key) => {
      const fish = fishes[key]; // So we can get the price of the fish
      const count = order[key]; // So we can get how many fishes we bought
      const isAvailable = fish && fish.status === "available" // This is for saftey
      if (isAvailable) {
        return prevtotal + (count * fish.price || 0);
      }
      return prevtotal;
    }, 0);

    return (
      <div className="order-wrap">
        <h2>What Cha Want</h2>
        <ul className="order">
          {orderIds.map(this.renderOrder)}
          <li className="total">
            <strong>TOTAL:</strong>
            {formatPrice(total)}
          </li>
        </ul>
      </div>
    )
  }
}

export default Order;
