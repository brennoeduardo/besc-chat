import Message from '@database/message/Message'

class MessageService {

    public async findAll() {
        return await Message.findAll();
    }

    public async create(message: any) {
        console.log(message);
        
        return await Message.create({ ...message });
    }

    public async update(id: number, message: any) {
        return await Message.update(message, { where: { id } });
    }

    public async delete(id: number) {
        return await Message.destroy({ where: { id } });
    }

    public async getById(id: number){
        return await Message.findByPk(id);
    }

}

export default new MessageService();