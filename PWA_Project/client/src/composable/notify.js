import { Notify } from 'quasar';
const notifyWarning = (message) =>
  Notify.create({
    position: 'top',
    color: 'red-5',
    textColor: 'white',
    icon: 'warning',
    message,
  });
const notifySuccess = (message) =>
  Notify.create({
    position: 'top',
    color: 'green-4',
    textColor: 'white',
    icon: 'cloud_done',
    message,
  });
export { notifyWarning, notifySuccess };
