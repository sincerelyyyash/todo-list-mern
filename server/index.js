const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const config = require('./config');
const TodoModel = require('./models/todo-model')
 
const dbPassword = config.dbPassword;
const dbUsername = config.dbUsername;

const dbUrl = 'mongodb+srv://' + dbUsername + ':' + dbPassword + '@cluster0.hxxhbof.mongodb.net/?retryWrites=true&w=majority';
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  
mongoose.connect(dbUrl, connectionParams)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
  
const app = express()
app.use(cors())
app.use(express.json())

app.listen(3001, ()=> {
    console.log("Server is running")
})


app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
    .catch(err => res.json(err))
})

app.get('/get', (req, res) =>{
     TodoModel.find()
     .then(result => res.json(result))
     .catch(err => res.json(err))
})

app.put('/update/:id', (req, res)=>{
    const {id} = req.params;
    TodoModel.findByIdAndUpdate({_id: id}, {taskStatus: true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.delete('/delete/:id', (req, res)=>{
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

