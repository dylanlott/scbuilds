import { Router } from 'express'
import authenticate from '~/middleware/authenticate'
import { index, id } from './controllers'

const router = Router()

router.route('/')
  .get(index.get) // public route
  .post(authenticate(), index.post)

router.route('/search')
  .get(index.search)

router.route('/:id')
  .get(id.get) // public route
  .put(authenticate(), id.update)
  .delete(authenticate(), id.delete)

export default router
