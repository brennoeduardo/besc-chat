import UserService from '../service/index'

import { Request, Response, NextFunction } from 'express'

class UserController {

    public async findAll(req: Request, res: Response, next: NextFunction) {
        const users = await UserService.findAll();
        res.status(200).send(users);
    }

    public async create(req: Request, res: Response, next: NextFunction) {


        console.log(req.body)
        const user = await UserService.create(req.body);
        res.status(201).send(user);
    }

    public async update(req: Request, res: Response, next: NextFunction) {

        const { id } = req.params;

        const user = await UserService.update(Number(id), req.body);
        res.status(200).send(user);
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        await UserService.delete(Number(id));
        res.status(204).send();
    }

    public async getById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const user = await UserService.getById(Number(id));
        res.status(200).send(user);
    }

    public async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, senha } = req.body;

            const { token, user } = await UserService.login(email, senha);
            res.status(200).json({token, user});

        } catch (error: Error | any) {
            res.status(400).send({ message: error.message });
        }
    }


}

export default new UserController();