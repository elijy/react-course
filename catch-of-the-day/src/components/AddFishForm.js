import React from 'react';

class AddFishForm extends React.Component {
  createFish(e) {
    e.preventDefault();
    const fish = {
      name: this.name.value,
      price: this.price.value,
      status: this.status.value,
      description: this.description.value,
      image: this.image.value,
    }
    console.log(fish);
    
    // This is how we pass something upwards to our state object 
    this.props.addFish(fish);
    this.form.reset();
  }
  
  render() {
    return (
      <form ref={ input => { this.form = input }} action="" className="fish-edit" onSubmit={(e) => this.createFish(e)}>
        <input  ref={ input => { this.name = input }} type="text" placeholder='Name' />
        <input  ref={ input => { this.price = input }} type="text" placeholder='Price' />
        <select ref={ input => { this.status = input }} >
          <option value="available">Its dere Mon</option>
          <option value="unavailable">Nah Mon</option>
        </select>
        <textarea  ref={ input => { this.description = input }} placeholder='descr'></textarea>
        <input  ref={ input => { this.image = input }} type="text" placeholder='image'/>
        <button type='submit'>Yea add de fish mon</button>
      </form>
    )
  }
}

export default AddFishForm;
