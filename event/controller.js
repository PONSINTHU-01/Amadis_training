
import sendemail from './emailsender.js';

const events=[
    {id:1 ,name :"Tech Talk-AI",seats:3},
    { id: 2, name: "Web Development Workshop", seats: 2 },
    { id: 3, name: "Robotics", seats: 1 },
    {id:4,name:"concert",seats:5}
]

export const getEvents=(req,res)=>{
    res.json(events);
}

export const registerEvents=(req,res)=>{
    const eventId=parseInt(req.params.id);

    const useremail=req.body.email;

    const event=events.find(e=>e.id===eventId)
    if(!event)
        return res.json({error:'Event not found'});
    
    if(event.seats<=0)
        return res.json({error:'no seats are available'})
   
    event.seats--;
    sendemail(useremail,event)

    res.json({message:`Registered for ${event.name}.confirmation sent to ${useremail}`})
   

}