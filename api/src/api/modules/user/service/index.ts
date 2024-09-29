import User from '@/database/user/User'
import { Usuario } from '@/types/types'

import jwt from 'jsonwebtoken'

import dotenv from 'dotenv'

dotenv.config()

class UserService {

    public async findAll() {
        return await User.findAll();
    }

    public async create(user: Usuario) {
        user.codigo_verificacao = Math.floor(Math.random() * 1000000).toString()
        return await User.create({ ...user });
    }

    public async update(id: number, user: Usuario) {
        return await User.update(user, { where: { id } });
    }

    public async delete(id: number) {
        return await User.destroy({ where: { id } });
    }

    public async getById(id: number){
        return await User.findByPk(id);
    }

    public async login(email: string, senha: string) {

        const user = await User.findOne({ where: { email, senha } });
        
        if (!user) {
            throw new Error('Usuário ou senha inválidos');
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
            expiresIn: '1d'
        });

        return { user, token };

    }

}

export default new UserService();
