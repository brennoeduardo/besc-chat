import { Router } from 'express';
import MessageController from '../controller/index';
import { authToken as Auth } from '../../middlewares/auth';

const router = Router();

router.route('/')
    .get(Auth, MessageController.findAll)
    .post(Auth, MessageController.create);

router.route('/:id')
    .put(Auth, MessageController.update)
    .delete(Auth, MessageController.delete)
    .get(Auth, MessageController.getById);

export default router;
