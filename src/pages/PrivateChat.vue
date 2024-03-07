<script setup>
import BaseButton from '../components/BaseButton.vue';
import BaseLabel from '../components/BaseLabel.vue';
import BaseLoader from '../components/BaseLoader.vue';
import { sendPrivateChatMessage, subscribeToPrivateChat } from '../service/private-chat';
import { formatDate } from '../helpers/date.js';
import { useAuth } from '../composition/useAuth';
import { useRoute } from 'vue-router';
import { useUserProfile } from '../composition/useUserProfile';
import { watch, ref, onUnmounted } from 'vue';
import LoadingContext from '../components/LoadingContext.vue';

const route = useRoute();
const { user: userAuth } = useAuth();
const { userProfile, loadingProfile } = useUserProfile(route.params.id);
const { loadingMessages, messages } = usePrivateChatMessages(userAuth, userProfile);
const { newMessage, handleMessage } = usePrivateChatForm(userAuth, userProfile);

function usePrivateChatMessages(senderUser, receiverUser) {
    const loadingMessages = ref(true);
    const messages = ref([]);

    let chatUnsubscribe = () => {};
    watch(receiverUser, async newReceiverUser => {
        if(newReceiverUser.id !== null) {
            loadingMessages.value = true;
            chatUnsubscribe.value = await subscribeToPrivateChat(
                {user1: newReceiverUser.id, user2: senderUser.value.id},
                newMessages => messages.value = newMessages
            );
            loadingMessages.value = false;
        }
    });

    onUnmounted(() => chatUnsubscribe());

    return {
        loadingMessages,
        messages,
    }
}

function usePrivateChatForm(senderUser, receiverUser) {
    const newMessage = ref({
        message: '',
    });

    const handleMessage = async () => {
        sendPrivateChatMessage({
            sender: senderUser.value.id,
            receiver: receiverUser.value.id,
            message: newMessage.value.message,
        });
        newMessage.value.message = '';
    }

    return {
        newMessage,
        handleMessage,
    }
}
</script>

<template>
    <div class="container d-flex justify-content-center align-items-center vh-100">
      <LoadingContext :loading="loadingProfile">
        <div class="w-75">
          <h1 class="mb-4 text-3xl">Chat Privado con {{ userProfile.email }}</h1>
  
          <section class="border rounded p-4 mb-4">
            <h2 class="sr-only">Mensajes</h2>
            <LoadingContext :loading="loadingMessages">
              <div v-for="message in messages" :key="message.id" class="message-container">
                <div
                  class="message p-2 rounded mb-2"
                  :class="{
                    'align-self-start': message.userId !== userAuth.id,
                    'align-self-end': message.userId === userAuth.id,
                    'bg-secondary': message.userId !== userAuth.id,
                    'bg-success': message.userId === userAuth.id,
                    'text-white': true,
                  }"
                >
                  <div>{{ message.message }}</div>
                  <div class="text-right text-muted">{{ formatDate(message.created_at) || 'Enviando...' }}</div>
                </div>
              </div>
            </LoadingContext>
          </section>
  
          <section>
            <h2 class="sr-only">Enviar un mensaje</h2>
            <form action="#" class="d-flex gap-2" @submit.prevent="handleMessage">
              <label for="message" class="sr-only">Mensaje</label>
              <textarea
                class="form-control w-75 py-1.5 px-2"
                id="message"
                v-model="newMessage.message"
                placeholder="Escribe tu mensaje aquí..."
              ></textarea>
              <button type="submit" class="btn btn-primary">Enviar</button>
            </form>
          </section>
        </div>
      </LoadingContext>
    </div>
  </template>
  
  <style scoped>
    .message-container {
      display: flex;
      justify-content: flex-start;
      margin-bottom: 8px;
    }
  
    .message {
      max-width: 66%;
      word-wrap: break-word;
    }
  
    .align-self-start {
      align-self: flex-start;
    }
  
    .align-self-end {
      align-self: flex-end;
    }
  
    .bg-secondary {
      background-color: #6c757d;
    }
  
    .bg-success {
      background-color: #28a745;
    }
  
    .text-muted {
      color: #6c757d;
    }
  </style>
  