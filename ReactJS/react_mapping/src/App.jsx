import React from 'react';
import './App.css';
import data from './data.json';

function App() {
  return (
    <div className="App">
      <h1>Gadgets Overview</h1>
      {data.items.map(item => (
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
    </div>
  );
}

export default App;
