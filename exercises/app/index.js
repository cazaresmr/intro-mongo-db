const mongoose = require('mongoose')
const express = require('express')
const morgan = require('morgan')
const connect = require('../connect')
const { json, urlencoded } = require('body-parser')
const app = express()
const Todo = require('./todo')

app.use(morgan('dev'))
app.use(urlencoded({ extended: true }))
app.use(json())

// Existing route
app.get('/todo/:id', async (req, res) => {
  const todoId = req.params.id;

  // Check if the provided ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(todoId)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  try {
    const todo = await Todo.findById(todoId).exec();

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find({}).lean().exec()
    res.status(200).json(todos)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

app.post('/todo', async (req, res) => {
  try {
    const todoToCreate = req.body.todo
    const todo = await Todo.create(todoToCreate)
    res.status(201).json(todo.toJSON())
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

connect('mongodb://localhost:27017/intro-to-mongodb')
  .then(() => app.listen(4000, () => {
    console.log('server on http://localhost:4000')
  }))
  .catch(e => console.error(e))
