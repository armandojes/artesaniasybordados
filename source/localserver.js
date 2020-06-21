import express from 'express'
import api from './api/router'
import rendered from './server/rendered'
import ip from 'ip'

const localServer = express()
localServer.use('/api', api)
localServer.get('*', rendered)

localServer.listen(3000, () => console.log(`server stared on port 300 and front stared on ${ip.address()}`))
