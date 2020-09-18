import { Router } from 'express'
import charge from './controllers/charge'

const router = Router()

router.post('/charge', charge)

export default router
