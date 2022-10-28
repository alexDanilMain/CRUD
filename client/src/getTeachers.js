import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

function GetTeachers() {
  const [email, setEmail] = useState('');
  const [name , setName] = useState('');
  const [sirname, setSirname] = useState('');
  const [edit_id, setID] = useState(null)
  const [number , setNumber ] = useState(0);
  const [teacher, setTeacher] = useState(null);

  const getTeachers = async () => {
    try{
      const response = await axios.get('http://localhost:8000/teachers')
      setTeacher(response.data)
    } catch(err){
      console.log(err)
    }
  }

  const handleEdit = async (e) =>{
    e.preventDefault()
    window.location.reload()
    try{
      const response = await axios.post('http://localhost:8000/editteacher', {edit_id,name,sirname,email,number})
    
      const success = response.status === 201

      if (success) console.log("Sucess")
     

    }
    
    catch (error){
      console.log(error)
    } 

    
  }


  function updateTeachers(items){
    if (items){
    const displayTeachers = items.map(({_id,name,sirname,email,number})=>
    
    <tr key={_id} className='teachersform'>
    <td className='width-20'>
      
      <input value={name} readOnly/> 
    </td>

    <td className='width-20'>
      
      <input value={sirname} readOnly/> 

    </td>
    
    <td className='width-20'>
      
      <input value={email} readOnly/> 
 
    
    </td>
    
    <td className='width-20'>
      <input value={number} readOnly/> 
      </td>

    <td className='width-20'>
    <button onClick={()=>displayEdit(_id)}> Edit</button>  
    <button onClick={()=>deleteSelected(_id)}>Delete</button> 
    </td>
    </tr>
    )
    return(
      displayTeachers
    )
  }
    return(
      <p>Loading</p>
    )
  }

  useEffect (() => {
    getTeachers()
  }, [])

  
 

  async function displayEdit(_id) {
    setID(_id)
      try{
        const response =  await axios.post('http://localhost:8000/getteachers', {_id})
        setEmail(response.data.email)
        setName(response.data.name)
        setNumber(response.data.number)
        setSirname(response.data.sirname)
        displayedit2()
      } catch (err) {
        console.log(err)
      }
    }


  function displayedit2() {
      document.getElementById('editform').classList.remove('hidden')
  }

  function hideEdit() {
    document.getElementById('editform').classList.add('hidden')
  
  }

  async function deleteSelected(_id){
    window.location.reload()
    try{
      const response =  await axios.post('http://localhost:8000/deleteteacher', {_id})
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div>

      {/* ################## Update Form ############# */}
      <div className='maring-top'>
      <form onSubmit={handleEdit} className="editform hidden" id='editform'>
      <input
      type="text"
      id = "name"
      name = "name"
      value={name}
      required={true}
      onChange = {(e) => setName(e.target.value)}
      />

      <input
      type="text"
      id = "sirname"
      name = "sirname"
      value={sirname}
      required={true}
      onChange = {(e) => setSirname(e.target.value)}
      />

      <input
      type="email"
      id = "email"
      name = "email"
      value={email}
      required={true}
      onChange = {(e) => setEmail(e.target.value)}
      />

      <input
      type="number"
      id = "number"
      name = "number"
      value={number}
      required={true}
      onChange = {(e) => setNumber(e.target.value)}
      />
      
      <input type="submit" />
      <button onClick={()=> hideEdit()}>Close</button>
      </form>

      </div>

        {updateTeachers(teacher)}

    </div>
  );
}

export default GetTeachers;
