import { defineStore } from 'pinia';

import { ref } from 'vue';

import axios from 'axios';

export const useUserStore = defineStore('userStore', () => {
  const username = ref();
  const login = async (user, password) => {
    const { data: res } = await axios.post('http://localhost:3000/customer/login', {
      username: user,
      password: password,
    });
    if (res.login) {
      username.value = res.user;
    }
    return res;
  };

  return { username, login };
});
