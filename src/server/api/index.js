import { Router } from 'express'
import usersRoutes from './users/routes'
import adminRoutes from './admin/routes'
import buildRoutes from './builds/routes'
import listEndpoints from 'express-list-endpoints'
import authenticate from '~/middleware/authenticate'
import { handleServerErrors } from 'express-server-error'

const router = Router()

router.use('/', handleServerErrors())
router.use('/users', usersRoutes)
router.use('/admin', authenticate(), adminRoutes)
router.use('/builds', buildRoutes)
router.get('/health', (req, res) => res.status(200).send('OK'))

router.get('/', (req, res) => {
  res.json(listEndpoints(router))
})

export default router
