import { Sequelize, DataTypes, Model } from 'sequelize'
import { Messages } from '@/types/types'
import User from '../user/User';

class Message extends Model implements Messages {
    public message!: string;
    public data?: any;
    public usuario_id?: number;

    static initialize(sequelize: Sequelize) {
        Message.init({
            message: {
                type: DataTypes.STRING,
                allowNull: false
            },
            data: {
                type: DataTypes.JSON
            },
            usuario_id: {
                type: DataTypes.INTEGER
            }
        }, {
            sequelize,
            tableName: 'messages',
            modelName: 'message',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        });
    }

}

export default Message;