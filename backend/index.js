const mongoose=require('mongoose')
const express=require('express')
const cors=require('cors')
const { sendMailtoMentor,  getFacultyByDomain, facultyList, getsortedFaculty } = require('./controllers/authcontroller')
require('dotenv').config()

const app=express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

  app.get('/faculty',facultyList)
  app.get('/sorted-faculty',getsortedFaculty)
  app.post('/send-mail',sendMailtoMentor)
  app.get('/faculty-domain',getFacultyByDomain)

app.listen(3000,()=>{
    console.log("Server running on 3000")
})