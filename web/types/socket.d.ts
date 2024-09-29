// types/socket.d.ts
import { Socket } from 'socket.io-client';

declare module '#app' {
  interface NuxtApp {
    $socket: Socket;
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $socket: Socket;
  }
}
