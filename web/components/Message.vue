<template>
  <div class="body-message">
    <v-row no-gutters align="center" :justify="props.creator ? 'end' : 'start'">
      <v-card class="message-bubble" :class="props.creator ? 'message-sent' : 'message-received'" width="auto">
        <v-col>
          <p class="message-content">{{ props.message.message }}</p>
          <p class="message-date">{{ formatTime(props.message.data) }}</p>
        </v-col>
      </v-card>
    </v-row>
  </div>
</template>

<script setup lang="ts">

import { defineProps } from 'vue';

interface Message {
  id: number;
  message: string;
  data: string;
  usuario_id: number;
}

const props = defineProps<{
  message: Message,
  creator: boolean
}>();

const formatTime = (date: string | Date) => {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: 'numeric',
    minute: 'numeric'
  }).format(new Date(date));
}

const formatDate = (date: string | Date) => {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
}

</script>

<style scoped>
.message-bubble {
  max-width: 60%;
  padding: 10px;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  word-wrap: break-word;
  margin-bottom: 10px;
}

.message-sent {
  background-color: #6A0DAD; 
  color: white;
  border-top-right-radius: 0; 
}

.message-received {
  background-color: #EDE7F6; 
  color: black;
  border-top-left-radius: 0; 
}

.message-content {
  margin: 0;
}

.message-date {
  margin: 0;
  font-size: 12px;
  color: #888;
}

</style>
