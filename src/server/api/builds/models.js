import mongoose from 'mongoose'
import mongoosastic from 'mongoosastic'
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
  'terran',
  'any'
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
    minlength: 3,
    es_indexed: true
  },
  analysis: {
    type: String,
    es_indexed: true
  },
  type: {
    type: String,
    enum: buildTypes,
    default: 'general',
    es_indexed: true
  },
  user: {
    type: String,
    require: true,
    es_indexed: true
  },
  tags: [{
    type: String,
    es_indexed: true
  }],
  steps: [stepSchema],
  races: {
    player: {
      type: String,
      enum: races,
      es_indexed: true
    },
    opponent: {
      type: String,
      enum: races,
      es_indexed: true
    }
  },
  game: {
    type: String,
    require: true,
    es_indexed: true
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

buildSchema.plugin(mongoosastic, {
  host: process.env.ELASTIC_HOST,
  port: process.env.ELASTIC_PORT,
  auth: process.env.ELASTIC_AUTH
})

const Build = mongoose.model('Build', buildSchema)

Build.createMapping(function (err, mapping) {
  if (err) {
    console.log('error creating mapping (you can safely ignore this)');
    console.log(err);
  } else {
    console.log('mapping created!');
    console.log(mapping);
  }
});

export default Build
