<template>
    <v-card color="white" class="ma-auto pa-3" width="auto">
        <v-row no-gutters align="center" justify="space-between">

            <v-col cols="1" class="d-flex justify-center align-center">
                <v-btn icon variant="text" class="mx-0">
                    <v-icon icon="mdi-plus" dark />
                </v-btn>
            </v-col>

            <v-col cols="8" class="d-flex align-center">
                <input 
                    class="custom-text-field" 
                    type="text" 
                    placeholder="Digite uma mensagem" 
                    v-model="message" 
                    @keyup.enter="createMessage"
                />
            </v-col>

            <v-col cols="2" class="d-flex justify-center align-center">
                <v-btn icon variant="text" class="mx-0" @click="createMessage">
                    <v-icon icon="mdi-send" />
                </v-btn>
            </v-col>

        </v-row>
    </v-card>
</template>

<script lang="ts" setup>
import { useAuth } from "@/composables/useAuth";
import { ref } from "vue";

const { $socket } = useNuxtApp();
const { user, token } = useAuth();
const message = ref("");

const createMessage = async () => {

    $socket.emit("send-teste", token.value);

    if (!message.value.trim()) {
        console.error("Mensagem não pode ser vazia.");
        return; 
    }

    const newMessage = {
        message: message.value, 
        data: new Date().toISOString(), 
        usuario_id: user.value?.id,
    };

    try {


        const response = await fetch("http://192.168.100.207:8000/api/message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzI3NjMyMzg2LCJleHAiOjE3Mjc3MTg3ODZ9.GeQfeUD4xIXHvRywgwBWeu7vMdE5_hKw4CWb2KBIW9Q`,
            },
            body: JSON.stringify(newMessage),
        });


        if (!response.ok) {
            throw new Error("Erro ao enviar mensagem");
        }

        const savedMessage = await response.json();
        message.value = ""; 

        const teste = sessionStorage.getItem("user");

        $socket.emit("new-message", savedMessage, teste);

    } catch (error) {
        console.error(error);
    }
};
</script>

<style scoped>
.custom-text-field {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 20px;
    font-size: 14px;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
    outline: none;
    color: black;
}

.custom-text-field:focus {
    border-color: #6A0DAD;
    box-shadow: 0 0 5px rgba(25, 118, 210, 0.3);
}

.custom-text-field::placeholder {
    color: #888;
}

.v-btn {
    min-width: 30px;
}

.v-icon:hover {
    color: #6A0DAD;
}
</style>
