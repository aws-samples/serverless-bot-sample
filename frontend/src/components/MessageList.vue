<template>
  <div class="messagelist">
    <div v-for="message of messages" :key="message.message" class="message">
      <div :class="{ 'message-user': message.speaker === 'user', 'message-lex': message.speaker === 'lex' }">
        <span :class="{ 'bubble-user': message.speaker === 'user', 'bubble-lex': message.speaker === 'lex' }">
          {{ message.message }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MessageList",
  props: {
    messages: Array,
  },
});
</script>

<style scoped>
.messagelist {
  background-color: rgb(88, 97, 110);
  padding: 10px;
}
.message-user {
  text-align: right;
  margin-top: 10px;
}
.message-lex {
  text-align: left;
  margin-top: 10px;
}
.bubble-user {
  display: inline-block;
  background-color: rgb(157, 209, 157);
  padding: 5px;
  white-space: pre-line;
  border-radius: 12px;
}
.bubble-lex {
  display: inline-block;
  background-color: #EFF;
  padding: 5px;
  white-space: pre-line;
  border-radius: 12px;
}

</style>
