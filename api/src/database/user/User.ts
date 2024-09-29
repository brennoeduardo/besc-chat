import { Sequelize, DataTypes, Model } from 'sequelize'
import { Usuario } from '@/types/types'

class User extends Model implements Usuario {
    public id!: number;
    public nome!: string;
    public email!: string;
    public senha!: string;
    public codigo_verificacao!: string;

    static initialize(sequelize: Sequelize) {
        User.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            nome: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            senha: {
                type: DataTypes.STRING,
                allowNull: false
            },
            codigo_verificacao: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'users',
            modelName: 'user',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            indexes: [
                {
                    unique: true,
                    fields: ['email']
                }
            ]
        });
    }

}

export default User;