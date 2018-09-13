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
    const build = new Build(req.body)
    console.log('BUILD:', build)
    return build.save()
      .then((saved) => {
        console.log('saved: ', saved)
        return res.status(201).json(saved)
      }).catch((err) => ServerError('Build not created.',
        {status: 500}
      ))
  }
}

export const id = {
  // get (req, res) {
  //   console.log('getting build', req.params)
  //   return Build.findOne({ _id: req.params.id })
  //     .then((build) => {
  //       console.log('build response: ', build)
  //       if (!build) throw new ServerError('Build does not exist', {
  //         status: 404
  //       })
  //       return res.status(200).json(build)
  //     }).catch(err => {
  //       console.log('error getting build', err)
  //       res.handleServerError(err)
  //     })
  // },

  async get (req, res) {
    try {
      let build = await Build.findOne({ _id: req.params.id })
      if (!build) throw new ServerError('Build does not exist', {status:404})
      return res.status(200).json(build)
    } catch (error) {
      res.handleServerError(error)
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
