import Build from './models'
import { ServerError } from 'express-server-error'

export const index = {
  async get (req, res) {
    try {
      let builds = await Build.find({})
      if (!builds) throw new ServerError('No builds at this time')
      res.json(builds)
    } catch (error) {
      res.hanldeServerError(error)
    }
  },

  async post (req, res) {
    try {
      let _build = new Build(req.body)
      let build = await _build.save()
      res.json(build)
    } catch (error) {
      res.hanldeServerError(error)
    }
  }
}

export const id = {
  async get (req, res) {
    try {
      let build = await Build.findOne({ _id: req.params.id })
      if (!build) throw new ServerError('Build does not exist with that id')
      res.json(build)
    } catch (error) {
      res.hanldeServerError(error)
    }
  },

  async update (req, res) {
    try {
      res.send('not implemented')
    } catch (error) {
      res.hanldeServerError(error)
    }
  },

  async delete (req, res) {
    try {
      res.send('not implemented')
    } catch (error) {
      res.hanldeServerError(error)
    }
  }
}
