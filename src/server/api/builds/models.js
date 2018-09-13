import mongoose from 'mongoose'
import { ServerError } from 'express-server-error'

const stepTypes = [
  'minerals',
  'gas',
  'supply',
  'time',
  'units'
]

const buildTypes = [
  'economy',
  'rush',
  'all-in',
  'max-out',
  'aggressive',
  'timing',
  'fast-expand',
  'general'
]

const races = [
  'zerg',
  'protoss',
  'terran'
]

const stepSchema = new mongoose.Schema({
  action: {
    type: String,
    require: true
  },
  value: {
    type: String,
    require: true
  },
  type: {
    type: String,
    enum: stepTypes,
    default: 'mineral'
  },
  comment: {
    type: String
  }
})

const buildSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 3
  },
  owner: {
    // Is this a build of the user's
    // creation or someone else's?
    type: Boolean,
    default: false
  },
  analysis: {
    type: String
  },
  type: {
    type: String,
    enum: buildTypes,
    default: 'general'
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
      enum: races
    },
    opponent: {
      type: String,
      enum: races
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
    likes: { type: Number, default: 0 },
    examples: [{
      name: String,
      comment: String,
      link: String
    }],
    comments: [{
      user: { type: String, require: true },
      comment: { require: true, type: String },
      createdAt: { type: Date, default: Date.now },
      deleted: { type: Boolean, default: false },
      flagged: { type: Boolean, default: false }
    }]
  }
}, {
  timestamps: true
})

const Build = mongoose.model('Build', buildSchema)

export default Build
