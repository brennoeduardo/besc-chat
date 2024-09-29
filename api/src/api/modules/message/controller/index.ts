import MessageService from '../service/index'

import { Request, Response, NextFunction } from 'express'

class MessageController {

    public async findAll(req: Request, res: Response, next: NextFunction) {
        const users = await MessageService.findAll();
        res.status(200).send(users);
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        console.log(req.body);
        
        const user = await MessageService.create(req.body);
        res.status(201).send(user);
    }

    public async update(req: Request, res: Response, next: NextFunction) {

        const { id } = req.params;

        const user = await MessageService.update(Number(id), req.body);
        res.status(200).send(user);
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        await MessageService.delete(Number(id));
        res.status(204).send();
    }

    public async getById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const user = await MessageService.getById(Number(id));
        res.status(200).send(user);
    }


}

export default new MessageController();