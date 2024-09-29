import express, { Application } from 'express'
import { Server as HTTPServer, createServer } from "http";
import { Server as SocketIOServer, Socket } from 'socket.io';
import cors from 'cors';

import User from './database/user/User';
import Message from './database/message/Message';

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

import { resolve, join } from 'path';
import router from './api/modules/routes';

dotenv.config({ path: join(resolve(), `.${process.env.NODE_ENV || 'development'}.env`) });

class Server {
    app: Application;
    server: HTTPServer;
    io: SocketIOServer;

    constructor() {
        this.app = express();
        this.server = createServer(this.app);
        this.app.use(cors({ origin: '*' }));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use('/api', router)
        
        this.io = new SocketIOServer(this.server, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST'],
            },
        });
    }

    private configureSockets() {
        this.io.on('connection', (socket: Socket) => {
            console.log(`Novo cliente conectado: ${socket.id}`);

            socket.on('send-teste', (data) => {
                console.log('Teste recebido:', data);
                socket.emit('send-teste', data);
            })

            socket.on('new-message', async (data, teste) => {
                console.log('Mensagem recebida:', data, teste);
                
                try {
                    const newMessage = await Message.create({
                        message: data.message,
                        data: data.data,
                        usuario_id: data.usuario_id ?? 3,
                    });
                    
                    this.io.emit('new-message', newMessage);
                } catch (error) {
                    console.error('Erro ao salvar a mensagem:', error);
                }
            });

            socket.on('disconnect', () => {
                console.log(`Cliente desconectado: ${socket.id}`);
            });
        });
    }

    public listen(port: number, callback: () => void) {
        this.server.listen(port, callback);
        this.configureSockets();
    }

    public async initDataBase() {
        try {
            const db = new Sequelize({
                host: process.env.DB_HOST,
                database: process.env.DB_NAME,
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                dialect: 'postgres',
                logging: false,
                port: parseInt(process.env.DB_PORT as string),
            });

            await db.authenticate();
            console.log('Connection has been established successfully.');

            User.initialize(db);
            Message.initialize(db);

            User.hasMany(Message, { foreignKey: 'usuario_id', as: 'messages' });
            Message.belongsTo(User, { foreignKey: 'usuario_id', as: 'usuario' });

            await db.sync();

        } catch (error) {
            console.error('Unable to connect to the database:', error);
            process.exit(1);
        }
    }

    async start() {
        this.initDataBase().then(() => {
            this.listen(8000, () => {
                console.log(`Server running on port 8000`);
            });
        });
    }
}

export default Server;
