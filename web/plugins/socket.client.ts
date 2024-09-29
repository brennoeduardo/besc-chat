// plugins/socket.client.ts
import { io, Socket } from 'socket.io-client';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  const socket: Socket = io('http://192.168.100.207:8000'); 

  socket.on('connect', () => {
    console.log(`Conectado ao servidor de sockets: ${socket.id}`);
  });

  socket.on('disconnect', () => {
    console.log('Desconectado do servidor de sockets');
  });

  nuxtApp.provide('socket', socket);
});
