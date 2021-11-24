<template>
  <div class="chat">
    <MessageList v-bind:messages="messages" />
    <input type="text" class="inputtext" v-model="inputtext">
    <button @click="sendMessage" v-if="inputtext">GO</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MessageList from "./MessageList.vue";
import { API } from 'aws-amplify';
import { v4 as uuidv4 } from 'uuid';

export default defineComponent({
  name: 'Chat',
  components: {
    MessageList,
  },
  data: function () {
    return {
      sessionId: '',
      inputtext: '',
      messages: [{
        message: 'What is your question?',
        speaker: 'lex'
      }]
    }
  },
  created () {
    this.sessionId = new Date().getTime().toString() + uuidv4();
  },
  methods: {
    async sendMessage () {
      const inputtext = this.inputtext;
      this.inputtext = '';
      this.messages.push({
        message: inputtext,
        speaker: 'user'
      });
      const response = await API.post(process.env.VUE_APP_API_NAME, '/chat', {
        body: {
          message: inputtext,
          sessionId: this.sessionId
        }
      });
      this.messages.push({
        message: response.message,
        speaker: 'lex'
      });
    }
  }
});
</script>

<style>
.chat {
  width: 50%;
  margin: auto;
}
.inputtext {
  width: 90%;
}
</style>
