const mongoose = require('mongoose')
const Project = require('./project')
const cdnUrl = 'https://cdn.adminapp.com'

const orgSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  subscription: {
    status: [{
      type: String,
      enum: ['active', 'inactive'] // or other valid statuses
    }]
  }
})


orgSchema.post('remove', async (doc, next) => {
  await Project.remove({org: doc._id}).exec()
  next()
})

orgSchema.virtual('avatar').get(function() {
  return `${cdnUrl}/${this._id.toString()}`
})

module.exports = mongoose.model('org', orgSchema)
