<template>
  <section>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6 text-black">
          <div class="px-5 mt-5 ms-xl-4">
            <img width="60" src="../assets/logo.png" class="me-3 mb-3" />
            <span class="h1 fw-bold">Book Store</span>
          </div>

          <div
            class="d-flex justify-content-center align-items-center h-custom-2 ms-xl-4 pt-xl-0 mt-xl-n5"
          >
            <form
              action=""
              style="width: 23rem"
              @submit.prevent="checkForm"
              method="post"
            >
              <div class="d-flex">
                <h3 class="fw-bold m-auto pb-3">Đăng nhập</h3>
              </div>

              <div class="form-outline mb-4">
                <input
                  v-model="formSignIn.username"
                  style="border-radius: 20px"
                  type="text"
                  id="form2Example18"
                  name="username"
                  class="form-control form-control-lg mb-2"
                  placeholder="Tên đăng nhập"
                />
                <div class="text-danger">
                  {{ errors.username }}
                </div>
              </div>

              <div
                class="form-outline mb-2 flex-fill"
                style="position: relative"
              >
                <input
                  v-model="formSignIn.password"
                  v-if="showPassword"
                  style="border-radius: 20px"
                  type="text"
                  id="form3Example4c"
                  class="form-control form-control-lg mb-2"
                  placeholder="Mật khẩu"
                  name="password"
                />
                <input
                  v-else="showPassword"
                  v-model="formSignIn.password"
                  style="border-radius: 20px"
                  type="password"
                  id="form2Example28"
                  name="password"
                  class="form-control form-control-lg mb-2"
                  placeholder="Mật khẩu"
                />

                <span
                  @click="pass"
                  style="
                    position: absolute;
                    top: 13px;
                    right: 14px;
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
                <div class="text-danger">
                  {{ errors.password }}
                </div>
              </div>

              <div class="text-danger mb-2">
                {{ error }}
              </div>

              <div class="pt-1 mb-4 d-flex">
                <button
                  class="btn btn-info btn-lg btn-block m-auto"
                  type="submit"
                  style="border-radius: 20px"
                >
                  Đăng nhập
                </button>
              </div>

              <div class="d-flex">
                <p class="pass pb-lg-2 m-auto">
                  <a style="color: blue" href="#!">Quên mật khẩu?</a>
                </p>
              </div>
              <div class="d-flex">
                <p class="m-auto">
                  Chưa có tài khoản?
                  <router-link to="/signup">Đăng ký</router-link>
                </p>
              </div>
            </form>
          </div>
        </div>
        <div class="col-sm-6 px-0 d-none d-sm-block">
          <img
            src="../assets/img/Books-Signin.png"
            alt="Login image"
            class="w-100 vh-100 img-login"
            style="object-fit: cover; object-position: left"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
const port = import.meta.env.VITE_HOST;

export default {
  data() {
    // const schema = Yup.object().shape({
    //   username: Yup.string()
    //     .required("Yêu cầu bắt buộc")
    //     .min(3, "Yêu cầu tên đăng nhập phải nhiều hơn 3 ký tự")
    //     .max(20, "Yêu cầu tên đăng nhập phải ít hơn 20 ký tự"),
    //   password: Yup.string()
    //     .required("Yêu cầu bắt buộc")
    //     .min(6, "Mật khẩu phải nhiều hơn 6 ký tự"),
    // });
    return {
      showPassword: false,
      formSignIn: {},
      error: "",
      errors: {},
    };
  },
  computed: {
    buttonLabel() {
      return this.showPassword ? "Hide" : "Show";
    },
  },
  methods: {
    pass() {
      this.showPassword = !this.showPassword;
    },
    checkForm() {
      this.errors = {};
      if (!this.formSignIn.username) {
        this.errors.username = "Yêu cầu bắt buộc";
      } else if (this.formSignIn.username.length < 3) {
        this.errors.username = "Yêu cầu tên đăng nhập phải nhiều hơn 3 ký tự";
      } else if (this.formSignIn.username.length > 20) {
        this.errors.username = "Yêu cầu tên đăng nhập phải ít hơn 20 ký tự";
      }
      if (!this.formSignIn.password) {
        this.errors.password = "Yêu cầu bắt buộc";
      } else if (this.formSignIn.password.length < 6) {
        this.errors.password = "Mật khẩu phải từ 6 ký tự trở lên";
      } else if (this.formSignIn.password.length > 20) {
        this.errors.password = "Mật khẩu ít hơn 20 ký tự";
      }
      const check = Object.keys(this.errors);
      if (check.length === 0) {
        this.signIn();
      }
    },
    async signIn() {
      // this.validateInput();
      // if (this.errors.username.length > 0 || this.errors.password.length > 0) {
      //   return false;
      // }
      // const postData = {
      //   username: this.username,
      //   password: this.password,
      //   loginType: 1,
      // };
      // const acCookie = await cookieStore.get("accessToken");
      // const rfCookie = await cookieStore.get("refreshToken");
      // const accessToken = acCookie.value;
      // const refreshToken = rfCookie.value;

      const data = this.formSignIn;
      data.loginType = 1;
      const res = await fetch(`${port}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      // if (res.status == 401 && resData.message === "Access token đã hết hạn") {
      //   let d = new Date();
      //   d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000);
      //   let expires = "expires=" + d.toUTCString();
      //   document.cookie =
      //     "accessToken=" +
      //     resData.newToken.accessToken +
      //     ";" +
      //     expires +
      //     ";path=/" +
      //     ";secure";
      //   await this.signIn();
      // }
      if (res.status == 200) {
        let d = new Date();
        d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000);
        let expires = "expires=" + d.toUTCString();
        document.cookie =
          "accessToken=" +
          resData.accessToken +
          ";" +
          expires +
          ";path=/" +
          ";secure";
        document.cookie =
          "refreshToken=" +
          resData.refreshToken +
          ";" +
          expires +
          ";path=/" +
          ";secure";

        this.$router.push("/");
        // console.log(accessToken);
        // console.log(refreshToken);
      } else {
        this.error = resData.message;
      }
    },
    // validateInput() {
    //   this.errors = {
    //     username: [],
    //     password: [],
    //   };
    //   if (!this.username) {
    //     this.errors.username.push("Yêu cầu bắt buộc");
    //   }
    //   if (!this.password) {
    //     this.errors.password.push("Yêu cầu bắt buộc");
    //   }
    //   if (!this.password.length < 6) {
    //     this.errors.password.push("Mật khẩu phải từ 6 ký tự trở lên");
    //   }
    // },
  },
};
</script>

<style>
.bg-image-vertical {
  position: relative;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: right center;
  background-size: auto 100%;
}

@media (min-width: 1025px) {
  .h-custom-2 {
    height: 100%;
  }
}
.pass:hover {
  text-decoration: underline;
}
</style>
