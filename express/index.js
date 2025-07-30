const express=require('express');
const app=express();
const port=3000;

app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Hii,Express");
})

app.get('/about',(req,res)=>{
    res.send("This is the about page");
})

app.get('/user/:username',(req,res)=>{
    const name=req.params.username;
    console.log(req.params);
    res.send(`wlecome ${name}`)
 
})

app.post('/users',(req,res)=>{
    const {name,email}=req.body
    res.json({
        message:`User ${name} with Email ${email} created sucessfully`
    })
})

app.put('/users/:userId',(req,res)=>{
    const userId=req.params.userId
    const {name,email}=req.body
    res.json({
        message:`userId ${userId} updated username to ${name} and email to ${email}`
    })

})
app.delete('/users/:id',(req,res)=>{
    const userId=req.params.id
    res.json({
        message:`user with userId ${userId} has been deleted`
    })
})
app.listen(port,()=>{
    console.log(`server is running on:http://localhost:${port}`)
})
