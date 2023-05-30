import React, { useState, useEffect } from 'react';

const MyComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/photos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div>
      <h1 className='parent-h1'>Data from API: https://jsonplaceholder.typicode.com/photos</h1>
      
        {data.map((item) => (
            <div className='main-div'>
          <p key={item.id}></p>
          <h1>Album ID : {item.albumId}</h1>
          <h2>Title : {item.title}</h2>
          <img src= {item.thumbnailUrl} alt="" />
          </div>
        ))}
      
    </div>
  );
};

export default MyComponent;
