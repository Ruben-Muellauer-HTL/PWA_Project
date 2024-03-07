import { ref } from 'vue';

let isOnline = ref(true);
let toggleDialog = ref(false);

const onlineTest = async () => {
  try {
    await fetch(window.location.origin, { method: 'HEAD' });
    return true;
  } catch (error) {
    return false;
  }
};

export { onlineTest, isOnline, toggleDialog };
