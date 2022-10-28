import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css'
function Kurser() {
    const [name, setName] = useState(null)
    const [length, setLength] = useState(0)
    const [teachers, setTeacher] = useState(null)
    const [courses, setCourses] = useState(null)

    const getTeachers = async () => {
        try{
          const response = await axios.get('http://localhost:8000/teachers')
          setTeacher(response.data)
        } catch(err){
          console.log(err)
        }
      }

    const getCourses = async () => {
        try{
          const response = await axios.get('http://localhost:8000/courses')
          setCourses(response.data)
        } catch(err){
          console.log(err)
        }
      }
    
    useEffect(()=>{
        if(!teachers){
            getTeachers()
        }
        if(!courses){
            getCourses()
        }
    })

   async function deleteCourse(_id){

        window.location.reload()
        try{
          const response =  await axios.post('http://localhost:8000/deletecourse', {_id})
        }
        catch(err){
          console.log(err)
        }

    }
    
    function updateKurser(items){
        if(items){

        const kurser = items.map(({_id,name,kursanvarig,number})=>
        
        <tr key={"whatever"+_id} style={{textAlign:'center'}}>
            <td id={'kurs'+_id}>{name}</td>
            <td >{kursanvarig}</td>
            <td>{"Course Length: " +number}</td>
            <button className="btn" onClick={()=>deleteCourse(_id)}> Delete</button>
        </tr>
        )
    
        return(
          kurser
        )
        }
        else{
            return (<p>Loading ...</p>)
        }
      }
    

    function updateTeachers(items){
        if(items){
            const teachers = items.map(({_id,name,sirname})=>
        
            <option key={"idk"+_id} value={_id}>{name + " "+sirname}</option>
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

      const handleSubmit = async (e) =>{
        e.preventDefault()
        const _id = document.getElementById('teacher-name').value
        window.location.reload()
        try{
          const response = await axios.post('http://localhost:8000/coursespost', {_id,name,length})
        
          const success = response.status === 201
    
          if (success) console.log("Sucess")
         
    
        }
        
        catch (error){
          console.log(error)
        } 
    
        
      }
    
  return (
    <div className="kurser">
    <form className='kurser-form' onSubmit={handleSubmit}>
      <input
      type="text"
      id = "name"
      name = "name"
      placeholder='course name'
      required={true}
      onChange = {(e) => setName(e.target.value)}
      />
      <input
      type="number"
      id = "length"
      name = "length"
      placeholder='length'
      required={true}
      onChange = {(e) => setLength(e.target.value)}
      />
      <p>Kursansvarig:</p>
      {updateTeachers(teachers)}
    <input type="submit"/>
      </form>
      <table className='teacher-table'>
        <tr>
        <th>Course Name</th>
        <th>Course ansvarig</th>
        <th>Length</th>
        <th>Delete</th>
        </tr>
        {updateKurser(courses)}
    </table>
    </div>
  );
}

export default Kurser;
