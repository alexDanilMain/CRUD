import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';
import GetTeachers from './getTeachers';


function Personal() {
  const [email, setEmail] = useState(null);
  const [name , setName] = useState(null);
  const [sirname, setSirname] = useState(null);
  const [number , setNumber ] = useState(null);


  const handleSubmit = async (e) =>{
    e.preventDefault()
    window.location.reload();
    try{
      const response = await axios.post('http://localhost:8000/personal', {email,name,sirname,number})
    
      const success = response.status === 201

      if (success) console.log("Sucess")
     

    }
    
    catch (error){
      console.log(error)
    } 

    
  }





  return (
      
    <div className="Personal">


      {/* ################## Create Form ############# */}
      <form onSubmit={handleSubmit} className="teachersform">
      <input
      type="text"
      id = "name"
      name = "name"
      placeholder='name'
      required={true}
      onChange = {(e) => setName(e.target.value)}
      />

      <input
      type="text"
      id = "sirname"
      name = "sirname"
      placeholder='sirname'
      required={true}
      onChange = {(e) => setSirname(e.target.value)}
      />

      <input
      type="email"
      id = "email"
      name = "email"
      placeholder='email'
      required={true}
      onChange = {(e) => setEmail(e.target.value)}
      />

      <input
      type="number"
      id = "number"
      name = "number"
      placeholder='personalnumber'
      required={true}
      onChange = {(e) => setNumber(e.target.value)}
      />
      
      <input type="submit" />
      </form>
      <div className='cover'>

    </div>
    <GetTeachers/>
    </div>

  );
}

export default Personal;