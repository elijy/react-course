import React from 'react';
import { formatPrice } from '../helpers.js';
import PropTypes from 'prop-types';


class Fish extends React.Component {
  static propTypes = {
    details: PropTypes.shape({
      status: PropTypes.string,
      image: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
      price: PropTypes.number,
    }),
    addToOrder: PropTypes.func
  }
  render() {
    // We can pull out the this.props shit to save time
    const {details} = this.props;

    // Remember to think of this component as a SINGLE fish item in the list so each element here is about that one single item
    const isAvailable = details.status === 'available';
    const buttonText = isAvailable ? 'ADD ME' : 'No Bueno';

    return (
      <li className='menu-fish'>
        { /* For data attributes that are values wrapped in strings dont put the string wrapper */}
        <img src={details.image} role='presentation'/>
        <h3 className="fish-name">
          {details.name}
          <span className="price">{formatPrice(details.price)}</span>
        </h3>
        <p>{details.description}</p>
        <button disabled={!isAvailable} onClick={() => this.props.addToOrder(this.props.keyForYouToUse)}>{buttonText}</button>
      </li>
    )
  }
}

export default Fish;
