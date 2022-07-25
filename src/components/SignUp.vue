<template>
  <section style="background-color: #eee">
    <div class="container-fluid h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-11" style="margin: 1rem 0">
          <div class="card text-black" style="border-radius: 25px">
            <div class="card-body">
              <div class="row justify-content-center">
                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                    Đăng ký
                  </p>

                  <Form
                    v-on:submit="register"
                    class="mx-1 mx-md-4"
                    :validation-schema="schema"
                    v-slot="{ errors }"
                  >
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <Field
                          v-model="formdata.username"
                          style="border-radius: 20px"
                          type="text"
                          id="form3Example1c"
                          class="form-control"
                          placeholder="Tên đăng nhập"
                          name="username"
                          :class="{ 'is-invalid': errors.username }"
                        />
                        <div class="invalid-feedback">
                          {{ errors.username }}
                        </div>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div
                        style="position: relative"
                        class="form-outline flex-fill mb-0"
                      >
                        <Field
                          v-model="formdata.password"
                          v-if="showPassword"
                          style="border-radius: 20px"
                          type="text"
                          id="form3Example4c"
                          class="form-control"
                          placeholder="Mật khẩu"
                          name="password"
                          :class="{ 'is-invalid': errors.password }"
                        />
                        <Field
                          v-model="formdata.password"
                          v-else="showPassword"
                          style="border-radius: 20px"
                          type="password"
                          id="form3Example4cah"
                          class="form-control"
                          placeholder="Mật khẩu"
                          name="password"
                          :class="{ 'is-invalid': errors.password }"
                        />
                        <span
                          @click="pass"
                          style="
                            position: absolute;
                            top: 8px;
                            right: 10px;
                            cursor: pointer;
                          "
                          id="pass"
                          ><i
                            class="fa-solid"
                            :class="{
                              'fa-eye-slash': showPassword,
                              'fa-eye': !showPassword,
                            }"
                          ></i
                        ></span>
                        <div class="invalid-feedback">
                          {{ errors.password }}
                        </div>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                      <div
                        style="position: relative"
                        class="form-outline flex-fill mb-0"
                      >
                        <Field
                          v-model="formdata.rePassword"
                          v-if="showRePassword"
                          style="border-radius: 20px"
                          type="text"
                          class="form-control"
                          placeholder="Nhập lại mật khẩu"
                          name="repeatPassWord"
                          :class="{ 'is-invalid': errors.repeatPassWord }"
                        />
                        <Field
                          v-model="formdata.rePassword"
                          v-else="showRePassword"
                          style="border-radius: 20px"
                          type="password"
                          class="form-control"
                          placeholder="Nhập lại mật khẩu"
                          name="repeatPassWord"
                          :class="{ 'is-invalid': errors.repeatPassWord }"
                        />
                        <span
                          @click="rePass"
                          style="
                            position: absolute;
                            top: 8px;
                            right: 10px;
                            cursor: pointer;
                          "
                          id="repass"
                          ><i
                            class="fa-solid"
                            :class="{
                              'fa-eye-slash': showRePassword,
                              'fa-eye': !showRePassword,
                            }"
                          ></i
                        ></span>
                        <div class="invalid-feedback">
                          {{ errors.repeatPassWord }}
                        </div>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-2">
                      <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <Field
                          v-model="formdata.email"
                          style="border-radius: 20px"
                          type="email"
                          id="form3Example3c"
                          class="form-control"
                          placeholder="Email"
                          name="email"
                          :class="{ 'is-invalid': errors.email }"
                        />
                        <div class="invalid-feedback">{{ errors.email }}</div>
                      </div>
                    </div>

                    <div class="d-flex justify-content-center text-danger mb-2">
                      {{ error }}
                    </div>

                    <!-- set checked for checkbox -->
                    <div class="form-check d-flex justify-content-center mb-5">
                      <input
                        class="form-check-input me-2"
                        type="checkbox"
                        id="checkbox"
                        v-model="checked"
                      />
                      <label class="form-check-label text-black" for="checkbox">
                        Tôi đồng ý tất cả điều khoản và dịch vụ
                      </label>
                    </div>

                    <div
                      class="d-flex justify-content-center mx-4 mb-3 mb-lg-4"
                      v-if="checked"
                    >
                      <button type="submit" class="btn btn-primary btn-lg">
                        Đăng ký
                      </button>
                    </div>

                    <div
                      class="d-flex justify-content-center mx-4 mb-3 mb-lg-4"
                      v-else
                    >
                      <button
                        type="submit"
                        class="btn btn-primary btn-lg"
                        disabled
                      >
                        Đăng ký
                      </button>
                    </div>
                  </Form>
                </div>
                <div
                  class="col-md-10 col-lg-6 col-xl-7 d-flex justify-content-center align-items-center order-1 order-lg-2"
                >
                  <img
                    src="../assets/img/books-signup.png"
                    class="img-fluid"
                    alt="Sample image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
const port = import.meta.env.VITE_HOST;

export default {
  components: {
    Form,
    Field,
  },
  data() {
    const schema = Yup.object().shape({
      username: Yup.string()
        .required("Yêu cầu bắt buộc")
        .min(3, "Yêu cầu tên đăng nhập phải nhiều hơn 3 ký tự")
        .max(20, "Yêu cầu tên đăng nhập phải ít hơn 20 ký tự"),
      email: Yup.string()
        .required("Yêu cầu bắt buộc")
        .email("Yêu cầu phải là Email"),
      password: Yup.string()
        .required("Yêu cầu bắt buộc")
        .min(6, "Mật khẩu phải nhiều hơn 6 ký tự"),
      repeatPassWord: Yup.string()
        .required("Yêu cầu bắt buộc")
        .oneOf([Yup.ref("password"), ""], "Mật khẩu không trùng khớp"),
    });
    return {
      schema,
      showPassword: false,
      showRePassword: false,
      formdata: {},
      error: "",
      checked: false,
    };
  },
  computed: {
    buttonLabel() {
      return (
        this.showPassword ? "Hide" : "Show",
        this.showRePassword ? "Hide" : "Show"
      );
    },
  },
  methods: {
    pass() {
      this.showPassword = !this.showPassword;
    },
    rePass() {
      this.showRePassword = !this.showRePassword;
    },
    async register() {
      try {
        // replace by async/await
        const data = this.formdata;
        const res = await fetch(`${port}/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (res.status == 201) {
          alert("Bạn đã đăng ký thành công");
          this.$router.push("/");
        } else {
          const data = await res.json();
          this.error = data.message;
        }
      } catch (error) {}
    },
  },
};
</script>
