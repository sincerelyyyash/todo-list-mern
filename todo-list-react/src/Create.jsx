import React, { useState } from 'react'
import axios from "axios"

function Create() {
  const [task, setTask] = useState() 
  const handleAdd = ()=> {
    axios.post('http://localhost:3001/add', {task: task})
    .then(result => {
      location.reload()
    })
    .catch(err=> console.log(err))
  }
  const handleInput = (e) => {
    setTask(e.target.value);
  };

  return (
    <div className='create-form'>
         <input type="text" placeholder='Enter Task' color='white' onChange={handleInput}/>
         <button type="button" onClick={handleAdd}>Add</button>
    </div>
  )
}

export default Create