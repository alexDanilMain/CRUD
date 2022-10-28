const PORT = 8000
const express = require('express')
const {MongoClient, ObjectId} = require('mongodb')
const uri = 'mongodb+srv://AlexDanil:Vlad12365@cluster0.i4y1n.mongodb.net/Cluster0?retryWrites=true&w=majority'
const app = express()

const cors = require('cors')
app.use(cors())

app.use(express.json())

app.get('/', (req,res)  =>{
    res.json('Hello to my app')
})

// teachers post
app.post('/personal', async (req,res)  =>{

    const client = new MongoClient(uri)
    

    const {email,name,sirname,number} = req.body


    try{

        await client.connect()

        const database = client.db('data')

        const teachers = database.collection('teachers')
        
        const data = {
            name : name,
            sirname : sirname,
            email : email,
            number : number,
        }
        
      await teachers.insertOne(data)

    
    } catch (err){
        console.log(err)
    }finally {
        await client.close()
    }
})

// course post
app.post('/coursespost', async (req,res)  =>{

    const client = new MongoClient(uri)
    const {_id,name,length} = req.body

    try{
        await client.connect()
        const database = client.db('data')
        const teachers = database.collection('teachers')
        const courses = database.collection('courses')
        const kursansvarig = await teachers.findOne({"_id": ObjectId(_id)})
  
        const data = {
            name : name,
            kursanvarig : kursansvarig.name + ' ' +kursansvarig.sirname,
            number : length
        }
        
      await courses.insertOne(data)

    
    } catch (err){
        console.log(err)
    }finally {
        await client.close()
    }
})

// utbildning post
app.post('/utbpost', async (req,res)  =>{
    const client = new MongoClient(uri)
    const {_id,name,kurser,desc} = req.body

    try{
        await client.connect()
        const database = client.db('data')
        const teachers = database.collection('teachers')
        const courses = database.collection('courses')
        const utb = database.collection('programs')
        const kursansvarig = await teachers.findOne({"_id": ObjectId(_id)})

        var kurser_sanitzed = [];

        for (var i = 0; i < kurser.length; i++){
            const utbname = await courses.findOne({"_id": ObjectId(kurser[i])})
            console.log(utbname)
            kurser_sanitzed[i] = utbname.name
        }

        const data = {
            name : name,
            kurser : kurser_sanitzed,
            ansvarig : kursansvarig.name + ' ' +kursansvarig.sirname,
            desc : desc
        }
        
      await utb.insertOne(data)

    
    } catch (err){
        console.log(err)
    }finally {
        await client.close()
    }
})

// ansökningar post
app.post('/ansokpost', async (req,res)  =>{

    const client = new MongoClient(uri)
    

    const {name,sirname,email,utbansok} = req.body


    try{
        console.log(utbansok)
        await client.connect()

        const database = client.db('data')

        const applications = database.collection('applications')
        
        const data = {
            name : name,
            sirname : sirname,
            email : email,
            utb_name : utbansok,
        }
        
      await applications.insertOne(data)

    
    } catch (err){
        console.log(err)
    }finally {
        await client.close()
    }
})

app.get('/users', async (req,res)  =>{
    const client = new MongoClient(uri)

    try{
        await client.connect()
        const database = client.db('data')
        const teachers = database.collection('teachers')

        const returenedteachers = await teachers.find().toArray()
        res.send(returenedteachers)
    } finally{
        await client.close()
    }
})

// teacher read
app.get('/teachers', async (req,res) => {
    const client = new MongoClient(uri)
    const database = client.db('data')
  
    try{
        await client.connect()
        const teachers = database.collection('teachers')

        const data = await teachers.find().toArray()
        res.send(data);
        
    }catch (err){
        console.log(err)
    } finally{
        await client.close()
    }
   
})


// courses read
app.get('/courses', async (req,res) => {
    const client = new MongoClient(uri)
    const database = client.db('data')
  
    try{
        await client.connect()
        const courses = database.collection('courses')

        const data = await courses.find().toArray()
        res.send(data);
        
    }catch (err){
        console.log(err)
    } finally{
        await client.close()
    }
   
})

// utbildning read
app.get('/utb', async (req,res) => {
    const client = new MongoClient(uri)
    const database = client.db('data')
  
    try{
        await client.connect()
        const programs = database.collection('programs')

        const data = await programs.find().toArray()
        res.send(data);
        
    }catch (err){
        console.log(err)
    } finally{
        await client.close()
    }
   
})

// teacher read one
app.post('/getteachers', async (req,res) =>{
    const client = new MongoClient(uri)
    const database = client.db('data')
    const {_id} = req.body
    try{
        await client.connect()
        const teachers = database.collection('teachers')

        const data = await teachers.findOne({"_id": ObjectId(_id)})

        res.send(data);
        
    }catch (err){
        console.log(err)
    } finally{
        await client.close()
    }
   

})

app.get('/ansok', async (req,res) => {
    const client = new MongoClient(uri)
    const database = client.db('data')
  
    try{
        await client.connect()
        const ansok = database.collection('applications')

        const data = await ansok.find().toArray()
        res.send(data);
        
    }catch (err){
        console.log(err)
    } finally{
        await client.close()
    }
   
})

// teacher update one
app.post('/editteacher', async (req,res) =>{
    const client = new MongoClient(uri)
    const database = client.db('data')

  
    try{
        await client.connect()
        const teachers = database.collection('teachers')
        const updateTeacher ={
           $set: {
            name : req.body.name,
            sirname : req.body.sirname,
            email : req.body.email,
            number : req.body.number
           }
        }

        const updated = await teachers.updateOne({"_id": ObjectId(req.body.edit_id)},updateTeacher )
    } catch (err){
        console.log(err)
    } finally{
        await client.close()
    }
})

// teacher delete
app.post('/deleteteacher', async (req,res) =>{
    const client = new MongoClient(uri)
    const database = client.db('data')
    const {_id} = req.body
    try{
        await client.connect()
        const teachers = database.collection('teachers')

        await teachers.findOneAndDelete({"_id": ObjectId(_id)})
        
    }catch (err){
        console.log(err)
    } finally{
        await client.close()
    }
   

})

// utb delete
app.post('/deleteutb', async (req,res) =>{
    const client = new MongoClient(uri)
    const database = client.db('data')
    const {_id} = req.body
    try{
        await client.connect()
        const programs = database.collection('programs')

        await programs.findOneAndDelete({"_id": ObjectId(_id)})
        
    }catch (err){
        console.log(err)
    } finally{
        await client.close()
    }
   

})

// course delete
app.post('/deletecourse', async (req,res) =>{
    const client = new MongoClient(uri)
    const database = client.db('data')
    const {_id} = req.body
    try{
        await client.connect()
        const courses = database.collection('courses')

        await courses.findOneAndDelete({"_id": ObjectId(_id)})
        res.send('deleted' + id)
    }catch (err){
        console.log(err)
    } finally{
        await client.close()
    }
   

})

app.listen(PORT, () => console.log('server running on port '+ PORT))