<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {

  name: "SigninFormForEmployee",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      phone: yup.string().required("Phone is required!"),
      password: yup.string().required("Password is required!"),
    });

    return {
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.userE.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$emit('notification', {
        message: "Signed in",
        type: "info"
      })
      this.$emit('updateAuthentication');
      this.$router.push(this.$route.query.redirect || { name: 'AdminHome' })
    }
  },
  methods: {
    handleLogin(user) {
      this.loading = true;

      this.$store.dispatch("userE/login", user).then(
        () => {
          this.$emit('updateAuthentication');
          this.$router.push(this.$route.query.redirect || { name: 'AdminHome' });
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.$emit("notification", { message: error.response?.data.message || error.message, type: "error" });
        }
      );
    },
  },
};
</script>

<template>
  <div id="form-wrapper">
    <div class="title">Signin</div>
    <Form @submit="handleLogin" :validation-schema="schema">
      <div class="form-group">
        <label for="email">Phone</label>
        <Field name="phone" type="tel" class="form-control" placeholder="phone" />
        <ErrorMessage name="phone" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <Field name="password" type="password" class="form-control" placeholder="password" />
        <ErrorMessage name="password" class="error-feedback" />
      </div>

      <div class="form-group">
        <button :disabled="loading">
          <span v-show="loading">
            <div class="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </span>
          <span>Login</span>
        </button>
      </div>
    </Form>
  </div>
</template>

<style scoped>
#form-wrapper {
  background-color: transparent;
  width: 100%;
  height: 100%;
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 720px) {
    & {
      flex-direction: column;
    }
  }
}

form {
  padding: 16px;
  background-color: #ededed;
  border-radius: 16px;
  box-shadow: inset 0px -10px 15px #fff;
  margin-bottom: 24px;
}

button {
  border: 1px solid #cfcfcf;
  box-shadow: inset 0px 5px 5px #dfdfdf;
}

button:hover {
  box-shadow: inset 0px 2px 1px #dfdfdf;
  transform: unset;
}

.title {
  width: 100px;
  margin-block: 30px;
  font-size: 32px;
  font-weight: bolder;
}

.form-group {
  width: 300px;
  margin: 6px 0;
  padding: 8px;
  background-color: var(--color-background-1);
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  -ms-border-radius: 8px;
  -o-border-radius: 8px;

  &>label {
    font-weight: bold;
  }

  &>span[role=alert] {
    color: red;
  }

  &.form-message:empty {
    margin: 0;
    padding: 0;
  }
}

.form-group>input {
  width: 100%;
  transition: (transform, padding) .5s ease-in-out;
  font-size: 16px;
  line-height: 8px;
  color: #575756;
  background-color: transparent;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  -webkit-transition: (transform, padding) .5s ease-in-out;
  -moz-transition: (transform, padding) .5s ease-in-out;
  -ms-transition: (transform, padding) .5s ease-in-out;
  -o-transition: (transform, padding) .5s ease-in-out;
  padding: 12px 0;
  outline: 0;
  border: 1px solid transparent;
  border-bottom: 1px solid #575756;
  border-radius: 0;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  -ms-border-radius: 0;
  -o-border-radius: 0;
}

.form-group>input::placeholder {
  content: "...";
  color: rgba(87, 87, 86, 0.8);
}
</style>