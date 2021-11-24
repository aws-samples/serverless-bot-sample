<template>
  <div>
    <Chat />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Chat from './components/Chat.vue';

export default defineComponent({
  name: 'App',
  components: {
    Chat
  },
  data: function () {
    return {
      mode: 'CHAT',
      inputtext: '',
      messages: [{
        message: 'What is your question?',
        speaker: 'lex'
      }],
    }
  }
});
</script>
