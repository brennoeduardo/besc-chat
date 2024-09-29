import { Router } from 'express'
import UserController from '../controller/index'
import { authToken as Auth } from '../../middlewares/auth';

const router = Router();

router.route('/')
    .get(UserController.findAll)
    .post(UserController.create);

router.route('/login')
    .post(UserController.login);

router.route('/:id')
    .put(Auth, UserController.update)
    .delete(Auth, UserController.delete)
    .get(Auth, UserController.getById);

export default router;