import { Router } from 'express'
import security from './modules/security/router'
import payment from './modules/payments/router'
import bodyParser from 'body-parser'

const router = Router()

router.use(bodyParser.json())

router.use('/security', security)
router.use('/payment', payment)

router.all('*', (request, response) => {
  response.json({ error: true })
})

export default router
