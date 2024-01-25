const express = require('express')
const app = express()
let cors = require("cors")
let mongoose = require("mongoose")
let { Schema } = require("mongoose")
let bodyParser = require("body-parser")
let port = 3001
app.use(cors())
app.use(bodyParser.json())

//collections & schemas
let CoursesSchema = new Schema({
    name:String,
    image:String,
    author:String,
    authorImg:String,
    desc:String,
    price:Number,
})
let Courses = new mongoose.model("courses",CoursesSchema)

////

app.get('/api', function (req, res) {
  res.send('Hello')
})
app.get('/api/courses', async function (req, res) {
  let courses = await Courses.find()
  if(courses.length){
    res.send(courses)
  }else{
    res.send("not data found")
  }
})
app.get('/api/courses/:id', async function (req, res) {
    let { id } = req.params
    let course = await Courses.findById(id)
  if(course){
    res.send(course)
  }else{
    res.send("not data found")
  }
})
app.delete('/api/courses/:id', async function (req, res) {
    let { id } = req.params
    let deletedCourse = await Courses.findByIdAndDelete(id)
  if(deletedCourse){
    res.send(deletedCourse)
  }else{
    res.send("not data found")
  }
})
app.post('/api/courses', async function (req, res) {
  let {name,image,author,authorImg,desc,price} = req.body
  let newData={}
  if(name){
    newData.name=name
  }
  if(image){
    newData.image=image
  }
  if(author){
    newData.author=author
  }
  if(authorImg){
    newData.authorImg=authorImg
  }
  if(desc){
    newData.desc=desc
  }
  if(price){
    newData.price=price
  }
  let newCuourse = new Courses(newData)
  if(name && image && author && authorImg && desc && price){
    let savedCourse = await newCuourse.save()
    res.send(savedCourse)
  }else{
    res.send("not data found")
  }

})

app.listen(port,()=>{console.log("Connected port "+port)})

mongoose.connect('mongodb+srv://Reshid505:90vo505@app.ledm4e3.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('Connected!'));