import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './index.css';

function Utbildningar() {

    const [name,setName] = useState(null)
    const [desc,setDesc] = useState(null)
    const [teachers, setTeacher] = useState(null)
    const [courses, setCourses] = useState(null)
    const [utb, setUtb] = useState(null)
    const [counter, setCounter] = useState(0);

    useEffect(()=>{
        if(!teachers){
            getTeachers()
        }
        if(!courses){
            getCourses()
        }
        if(!utb){
            getUtb() 
        }


    })

    const getCourses = async () => {
        try{
          const response = await axios.get('http://localhost:8000/courses')
          setCourses(response.data)
        } catch(err){
          console.log(err)
        }
      }

    const getTeachers = async () => {
        try{
          const response = await axios.get('http://localhost:8000/teachers')
          setTeacher(response.data)
        } catch(err){
          console.log(err)
        }
      }

    const getUtb = async () => {
        try{
          const response = await axios.get('http://localhost:8000/utb')
          setUtb(response.data)
        } catch(err){
          console.log(err)
        }
    }

    function updateTeachers(items){
        if(items){
            const teachers = items.map(({_id,name,sirname})=>
        
            <option key={"id4124k"+_id} value={_id}>{name + " "+sirname}</option>
        )
    
        return(
        <select id={'teacher-name'}>
            {teachers}
          </select>
        )
        }
        else{
            return(<p>Loading ....</p>)
        }

      }

    function updateUtb(items){
        if(items){
        const utb = items.map(({_id,name,kurser,ansvarig,desc})=>
    
        <tr key={"dawd"+_id} className='entire-row text-align-center border'>
            <td id={'utb'+_id}>{name}</td>
            <td >{ansvarig}</td>
            <td> 
                    {kurser.map((kurs)=><div>{kurs +" "}</div>)}
            </td>
            <td>{desc}</td>
            <td><button className="btn" onClick={()=>deleteUtb(_id)}> Delete</button></td>
        </tr>
    
        )
    
        return(
    
          utb
      
        )
     }else{
         return <p>Loading ...</p>
     }
    }
    

    function updateCourses(items){
        if(items){
            const teachers = items.map(({_id,name})=>
        
            <option key={"id412k"+_id} value={_id}>{name}</option>
        )
    
        return(
        <select id={'teacher-name'}>
            {teachers}
          </select>
        )
        }
        else{
            return(<p>Loading ....</p>)
        }

      }

    function counterPlus(){

        setCounter(counter +1);
    }
    function counterMinus(){
    
        if (counter > 0){
        setCounter(counter -1)
        }
    }


    const handleSubmit = async (e) =>{
        e.preventDefault()
        const _id = document.getElementById('teacher-name').value
        const kurser = course_list()
        window.location.reload()
        try{
          const response = await axios.post('http://localhost:8000/utbpost', {_id,name,kurser,desc})
        
          const success = response.status === 201
    
          if (success) console.log("Sucess")
         
    
        }
        
        catch (error){
          console.log(error)
        } 
    
        
      }

    function course_list(){
        var kurs_list =[];
        for (var i = 0; i <counter;i++){
            kurs_list.push(document.getElementById('course-count'+i).children[0].value)
        } 
        return(kurs_list)
      
    }

    async function deleteUtb(_id){

        window.location.reload()
        try{
          const response =  await axios.post('http://localhost:8000/deleteutb', {_id})
        }
        catch(err){
          console.log(err)
        }

    }
  return (
    <div className="utbildningar">
        <form className='utb-form' >
          
            <input
            type="text"
            id = "name"
            name = "name"
            placeholder='Program name'
            required={true}
            onChange = {(e) => setName(e.target.value)}
            />
            
            <input
            className='hidden'
            required={true}
            name= "norefresh"
            />


            <textarea
            type="text"
            id = "desc"
            name = "desc"
            placeholder='Description'
            required={true}
            onChange = {(e) => setDesc(e.target.value)}
            />
            <p>Utbildingsledare: </p>
            {updateTeachers(teachers)}
            
            <p> Välj Kurser</p>    
            {Array.from(Array(counter)).map((c,index) => {
            return <div id={"course-count"+index}>{updateCourses(courses)}</div>;
             })}    
            <button onClick={ ()=> counterPlus()}>Lägg till kurs</button>
            <button onClick={ ()=> counterMinus()}>Ta bort kurs</button>



            <button onClick={handleSubmit}>Submit</button>
        
        </form>

        <table className='utb-table'>
        <tr>
        <th>Utbildnings Namn</th>
        <th>UtbildningsLedare </th>
        <th>Kurser</th>
        <th>Discription</th>
        <th>Delete</th>
        </tr>
        {updateUtb(utb)}
       </table>
    </div>
  );
}

export default Utbildningar;
