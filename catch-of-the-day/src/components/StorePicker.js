import React from 'react';
import { getFunName } from '../helpers.js';

class StorePicker extends React.Component {
  goToStore(e) {
    e.preventDefault();
    const storeId = this.storeInput.value;
    this.context.router.transitionTo(`/store/${storeId}`)
  }
  
  render() {
    return (
      <form className='store-selector' onSubmit={(e) => this.goToStore(e)} >
        <h2>Selectidado a Store</h2>
        <input type="text" required placeholder='type something here....' defaultValue={getFunName()} 
          ref={ input => { this.storeInput = input }}/>
        <button type='submit'>Visit de store dem</button>
      </form>
    )
  }
}

StorePicker.contextTypes = {
  router: React.PropTypes.object
}
export default StorePicker;
