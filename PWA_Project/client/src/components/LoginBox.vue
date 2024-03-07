<script setup>
import { ref } from 'vue';
import { useTravelStore } from '../stores/travelStore.js';
import { notifySuccess, notifyWarning } from '../composable/notify.js';
import { showLoginForm, hasToLogin } from '../utils/dialogToggle.js';
import { useUserStore } from '../stores/userStore.js';

const travelStore = useTravelStore();
const customerStore = useUserStore();

const username = ref('');
const password = ref('');
const firstname = ref('');
const lastname = ref('');
const email = ref('');
const street = ref('');
const city = ref('');
const plz = ref(null);

const toggleActive = ref(false);

const errMessage = ref(null);
const loginSuccess = ref(null);

const tab = ref('login');

const onReset = () => {
  username.value = '';
  password.value = '';
  toggleActive.value = false;
  firstname.value = '';
  lastname.value = '';
  password.value = '';
  email.value = '';
  street.value = '';
  city.value = '';
  plz.value = null;
};

const onRegister = async () => {
  errMessage.value = await travelStore.addCustomer(
    firstname.value,
    lastname.value,
    username.value,
    password.value,
    email.value,
    plz.value,
    street.value,
    city.value,
  );
  if (errMessage.value) notifyWarning(errMessage.value);
  else {
    notifySuccess('You now have your own Account!');
    hasToLogin.value = false;
    showLoginForm.value = false;
    errMessage.value = null;
    onReset();
  }
};

const onSubmit = async () => {
  loginSuccess.value = await customerStore.login(username.value, password.value);
  if (loginSuccess.value.login === false) notifyWarning(loginSuccess.value.message);
  else {
    notifySuccess(`Hello ${username.value} welcome back!`);
    hasToLogin.value = false;
    showLoginForm.value = false;
    loginSuccess.value = null;
    onReset();
  }
};
</script>

<template>
  <q-dialog class="q-pa-xl">
    <div style="max-width: 900px">
      <div class="q-gutter-y-md" style="max-width: 900px">
        <q-card>
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab name="login" label="Login" />
            <q-tab name="register" label="Register" />
          </q-tabs>

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="login" class="q-pa-md">
              <div class="text-h6 text-center text-secondary"><span>Login</span></div>
              <q-form @submit="onSubmit" @reset="onReset" class="bg-white q-pa-md">
                <q-input
                  filled
                  v-model="username"
                  label="Your Username"
                  class="q-mt-md"
                  lazy-rules
                  :rules="[(val) => (val && val.length > 0) || 'Please type something']"
                />
                <q-input
                  filled
                  type="password"
                  v-model="password"
                  label="Your password"
                  class="q-mt-md"
                  lazy-rules
                  :rules="[(val) => (val && val.length > 0) || 'Please type something']"
                />

                <div class="q-mt-md row justify-between">
                  <q-btn label="Login" type="submit" color="primary" />
                  <q-btn label="Reset" type="reset" class="q-ml-sm" color="negative" />
                </div>
              </q-form>
            </q-tab-panel>

            <q-tab-panel name="register" class="q-pa-xl">
              <div class="text-h6 text-center text-secondary">
                <span>Create a new Account</span>
              </div>
              <q-form @submit="onRegister" @reset="onReset" class="bg-white q-pa-md">
                <div class="row">
                  <div class="col-5">
                    <q-input
                      filled
                      v-model="firstname"
                      label="Your Firstname"
                      class="q-mt-md"
                      lazy-rules
                      :rules="[(val) => (val && val.length > 0) || 'Please type something']"
                    />
                  </div>
                  <div class="col-5 offset-2">
                    <q-input
                      filled
                      v-model="lastname"
                      label="Your Lastname"
                      class="q-mt-md"
                      lazy-rules
                      :rules="[(val) => (val && val.length > 0) || 'Please type something']"
                    />
                  </div>
                </div>
                <q-input
                  filled
                  v-model="username"
                  label="Create a username"
                  hint="It must be unique"
                  class="q-mt-md"
                  lazy-rules
                  :rules="[(val) => (val && val.length > 0) || 'Please type something']"
                />
                <q-input
                  filled
                  v-model="email"
                  label="Your Email"
                  class="q-mt-md"
                  lazy-rules
                  :rules="[(val) => (val && val.length > 0) || 'Please type something']"
                />
                <q-input
                  filled
                  type="password"
                  v-model="password"
                  label="Your password"
                  hint="Choose a strong one"
                  class="q-mt-md"
                  lazy-rules
                  :rules="[(val) => (val && val.length > 0) || 'Please type something']"
                />
                <div class="row">
                  <div class="col-2">
                    <q-input
                      filled
                      v-model="city"
                      label="City"
                      class="q-mt-md"
                      lazy-rules
                      :rules="[(val) => (val && val.length > 0) || 'Please type something']"
                    />
                  </div>
                  <div class="col-4 offset-2">
                    <q-input
                      filled
                      v-model="street"
                      label="Street"
                      class="q-mt-md"
                      lazy-rules
                      :rules="[(val) => (val && val.length > 0) || 'Please type something']"
                    />
                  </div>
                  <div class="col-2 offset-2">
                    <q-input
                      filled
                      type="number"
                      v-model="plz"
                      label="PLZ"
                      class="q-mt-md"
                      lazy-rules
                      :rules="[(val) => (val && val.length > 0) || 'Please type something']"
                    />
                  </div>
                </div>

                <q-toggle
                  v-model="toggleActive"
                  label="I accept the license and terms"
                  class="q-mt-md"
                />

                <div class="q-mt-md row justify-between">
                  <q-btn label="Register" type="submit" color="primary" />
                  <q-btn label="Reset" type="reset" class="q-ml-sm" color="negative" />
                </div>
              </q-form>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </q-dialog>
</template>

<style lang="scss">
.errorBox {
  border-radius: 5px;
  height: 5rem;
}
</style>
