import { Router } from 'express'

const mainRouter = Router()

mainRouter.use('/api', (request, response) => {
  response.send('api responded')
})

export default mainRouter
