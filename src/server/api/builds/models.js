import mongoose from 'mongoose'
import { ServerError } from 'express-server-error'

const stepSchema = new mongoose.Schema({
  action: { type: String },
  comment: { type: String },
  time: { type: String },
  supply: { type: String },
  minerals: { type: String  },
  gas: { type: String }
})

// step example: {
//  action: 'build hatch' or 'attack enemy' or 'scout for gateway'
//  comment: 'this should be timed out with your spawn pool finishing'
//  time: '3:00'
//  supply: 20/28
//  minerals: as soon as you have 200
//  gas: as soon as possible or at @300
// }

const buildSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 3
  },
  description: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  tags: [{
    type: String
  }],
  steps: [stepSchema],
  races: {
    player: {
      type: String,
      require: true
    },
    opponent: {
      type: String,
      require: true
    }
  },
  game: {
    type: String,
    require: true
  },
  meta: {
    votes: {
      up: { type: Number, default: 0 },
      down: { type: Number, default: 0 }
    },
    likes: { type: Number, default: 0 }
  }
}, {
  timestamps: true
})

const Build = mongoose.model('Build', buildSchema)

export default Build
