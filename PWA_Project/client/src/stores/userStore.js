import { defineStore } from 'pinia';

import { ref } from 'vue';

import axios from 'axios';

export const useUserStore = defineStore('userStore', () => {
  const username = ref();
  const cid = ref();
  const login = async (user, pass) => {
    const { data: res } = await axios.post('http://localhost:3000/customer/login', {
      username: user,
      password: pass,
    });
    if (res.login) {
      username.value = res.user;
      cid.value = res.cid;
    }
    return res;
  };

  const changeUsername = async (newU, oldU) => {
    try {
      await axios.patch('http://localhost:3000/customer', {
        newUser: newU,
        oldUser: oldU,
      });
    } catch (err) {
      return err.response.data;
    }
  };

  return { username, cid, login, changeUsername };
});
