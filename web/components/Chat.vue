<template>
    <v-card color="white" width="auto" height="auto">
        <Contact />
        <v-divider></v-divider>

        <div class="messages-box">
            <Message 
                v-for="message in messages" 
                :key="message.id" 
                :message="message"
                :creator="message.usuario_id === user_id" 
            />
        </div>

        <v-divider></v-divider>

        <ChatBox />

    </v-card>
</template>

<script lang="ts" setup>
import { useAuth } from '@/composables/useAuth';
import { computed, ref, onMounted, nextTick } from 'vue';

const { user, token } = useAuth();
const { $socket, $toast } = useNuxtApp() as { $socket: any, $toast: { error: (msg: string) => void } };

const user_id = computed(() => user ? user.value?.id : null);

interface Message {
    id: number;
    message: string;
    data: string;
    usuario_id: number;
}

const messages = ref<Message[]>([]);

const getMessages = async () => {
    try {
        const response = await fetch("http://192.168.100.207:8000/api/message", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzI3NjMyMzg2LCJleHAiOjE3Mjc3MTg3ODZ9.GeQfeUD4xIXHvRywgwBWeu7vMdE5_hKw4CWb2KBIW9Q`,
            },
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        const data = await response.json()
        messages.value = data as Message[];

        nextTick(() => {
            const messagesBox = document.querySelector('.messages-box');
            if (messagesBox) {
                messagesBox.scrollTop = messagesBox.scrollHeight;
            }
        });

    } catch (error) {
        $toast.error(`Erro ao buscar mensagens: ${error}`)
        console.error(error);
    }
};

onMounted(() => {
    getMessages();

    $socket.on("new-message", (newMessage: Message) => {
        console.log("Nova mensagem recebida:", newMessage);
        messages.value.push(newMessage);
        
        nextTick(() => {
            const messagesBox = document.querySelector('.messages-box');
            if (messagesBox) {
                messagesBox.scrollTop = messagesBox.scrollHeight;
            }
        });
    });

});
</script>

<style scoped>
.messages-box {
    height: calc(100vh - 140px);
    background-color: #f5f5f5;
    overflow-y: auto;
    padding: 10px;
}
</style>
