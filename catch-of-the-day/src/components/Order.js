import React from 'react';
import { formatPrice } from '../helpers.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


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
    const transitionProps = {
      classNames:'order',
      key,
      timeout: {enter: 250, exit: 250}
    };

    // For saftey
    if(!fish || fish.status === 'unavailable') {
      return (
        <CSSTransition {...transitionProps}>
          <li key={key}>
            NO FISH FOR YOU
            <button onClick={() => this.props.removeFishFromOrder(key)}>'❌'</button>
          </li>
        </CSSTransition>
      )
    }
    return (
      <CSSTransition {...transitionProps}>
        <li key={key}>
          <span>
            {fish.name} x
            <TransitionGroup component="span" className="count">
              <CSSTransition classNames="count" key={count} timeout={{enter:500,exit:500}}>
                <span>
                  {count}
                </span>
              </CSSTransition>
            </TransitionGroup>

            <button onClick={() => this.props.removeFishFromOrder(key)}>&times;</button>
          </span>
          <span className="price">{formatPrice(fish.price * count)}</span>
        </li>
      </CSSTransition>
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
        <TransitionGroup component='ul' className="order">
          {orderIds.map(this.renderOrder)}
          <li className="total">
            <strong>TOTAL:</strong>
            {formatPrice(total)}
          </li>
        </TransitionGroup>
      </div>
    )
  }
}

export default Order;
