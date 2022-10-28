import React from 'react';
import {useEffect,useState} from 'react';
import axios from 'axios';
import './index.css';

function Ansok() {
    const [name,setName] = useState(null)
    const [sirname,setSirname] = useState(null)
    const [email, setEmail] = useState(null)

    const [utb, setUtb] = useState(null)
    const [ansok, setAnsok] = useState(null)

    useEffect(()=>{

        if(!utb){
            getUtb() 
        }
        if (!ansok){
            getAnsok()
        }
    })

    const getUtb = async () => {
        try{
          const response = await axios.get('http://localhost:8000/utb')
          setUtb(response.data)
        } catch(err){
          console.log(err)
        }
    }


    const getAnsok = async () => {
        try{
          const response = await axios.get('http://localhost:8000/ansok')
          setAnsok(response.data)
        } catch(err){
          console.log(err)
        }
    }

    function updateUtb(items){
        if(items){

     
        const utb = items.map(({_id,name})=>
        
            <option key={"idk"+_id} value={name}>{name}</option>
        )

        return(
        <select id={'utb-name'}>
            {utb}
        </select>
        )
    } else{
        return <p> Loading ...</p>
    }
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const utbansok = document.getElementById('utb-name').value
        window.location.reload()
        try{
          const response = await axios.post('http://localhost:8000/ansokpost', {name,sirname,email,utbansok})
        
          const success = response.status === 201
    
          if (success) console.log("Sucess")
        }
        
        catch (error){
          console.log(error)
        } 
    
        
      }
    

  return (
    <div className="ansok">
        <form onSubmit={handleSubmit} className="ansok-form">
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

        <p>Choose Program</p>
        {updateUtb(utb)}
        <input type='submit'></input>


        </form>
        <button onClick={()=>console.log(ansok)} style={{margin:'0 auto'}}>Console log Applications</button>
    </div>
  );
}

export default Ansok;
