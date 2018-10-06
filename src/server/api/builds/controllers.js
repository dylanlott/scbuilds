import Build from './models'
import { ServerError } from 'express-server-error'

export const index = {
  async get (req, res) {
    try {
      let builds = await Build.find(req.query)
        .limit(req.query.limit || 50)
        .skip(req.query.skip || 0)

      if (!builds) throw new ServerError('No builds at this time')
      res.json(builds)
    } catch (error) {
      res.handleServerError(error)
    }
  },

  async post (req, res) {
    const build = new Build(req.body)
    build.user = req.user.email
    return build.save()
      .then((saved) => res.status(201).send({
        data: 'build created'
      }))
      .catch((err) => {
        console.log('Error saving build: ', err)
        throw new ServerError('Build not created.',{status: 500})
      })
  },

  search (req, res) {
    Build.search({
      query_string: {
        query: req.query.search
      }
    }, {
      hydrate: true
    }, function (err, results) {
      if (err) {
        console.log('error searching builds: ', err)
        return new ServerError('Error searching builds', {status: 500})
      }
      console.log('build search results: ', results)
      return res.json(results)
    })
  }

}

export const id = {
  async get (req, res) {
    try {
      let build = await Build.findOne({ _id: req.params.id })
      if (!build) throw new ServerError('Build does not exist', {status:404})
      return res.status(200).json(build)
    } catch (error) {
      console.log('error getting build by id: ', error)
      res.handleServerError(error)
    }
  },

  async update (req, res) {
    try {
      Build.findByIdAndUpdate(req.body._id, req.body, {new: true}, function(err, updated) {
        if (err) {
          return res.handleServerError(err)
        }
        return res.json(updated)
      })
    } catch (error) {
      console.log('error updating build: ', error)
      res.handleServerError(error)
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
