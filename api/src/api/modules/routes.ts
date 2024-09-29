import { Router } from 'express'
import UserRouter from './user/route/index'
import MessageRouter from './message/route/index'

const router = Router({ mergeParams: true });

router.use('/message', MessageRouter)
router.use('/user', UserRouter)

export default router;