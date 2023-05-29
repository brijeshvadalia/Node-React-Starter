import React from 'react';
import './App.css'

const ChildComponent = (props) => {
  return (
    <div>
      <h2>Child Component</h2>
      <ul>
      {props.data.map(item => (
        <div key={item.id} className='main-div'>
          <div className='first-div'>          
            <img src={item.thumbnail} alt={item.text} />
            </div>
           <div className='second-div'>
          <h2>Title: {item.title}</h2>
          <h3>Description: {item.description}</h3>
          <h2>Price: {item.price}</h2>
          <h2>Brand: {item.brand}</h2>
          <h2>Category: {item.category}</h2>
          </div>
        </div>
      ))}
      </ul>
    </div>
  );
};

export default ChildComponent;
