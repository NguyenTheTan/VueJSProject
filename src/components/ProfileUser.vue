<template>
  <section>
    <div class="container py-5">
      <div class="row">
        <div
          class="card mb-4 w3-animate-bottom"
          style="width: 50%; margin: auto"
        >
          <form
            action=""
            @submit.prevent="checkForm"
            enctype="multipart/form-data"
            novalidate="true"
          >
            <div class="card-body text-center">
              <div>
                <img
                  v-if="getUser.image_path === null"
                  src="https://icon-library.com/images/person-png-icon/person-png-icon-29.jpg"
                  alt="avatar"
                  class="rounded-circle"
                  style="width: 120px; height: 120px; position: relative"
                />
                <img
                  v-else
                  :src="getUser.image_path"
                  alt="avatar"
                  class="rounded-circle"
                  style="width: 120px; height: 120px; position: relative"
                />

                <div
                  id="box"
                  style="
                    position: absolute;
                    top: 7.7rem;
                    right: 15rem;
                    cursor: pointer;
                  "
                >
                  <input
                    type="file"
                    id="file"
                    name="image"
                    @change="fileChange()"
                  />
                  <i class="fa-regular fa-pen-to-square"></i>
                </div>
              </div>

              <div class="card-body">
                <div class="row">
                  <div class="col-sm-4">
                    <p class="mb-0">Tên đăng nhập</p>
                  </div>
                  <div class="col-sm-8">
                    <p class="mb-0">{{ getUser.username }}</p>
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <p class="mb-0">Email</p>
                  </div>
                  <div class="col-sm-9" style="position: relative">
                    <div v-if="isInput === false">
                      <span>{{ getUser.email }}</span>
                    </div>
                    <div v-else>
                      <input type="email" v-model="getUser.email" />
                      <p class="text-danger">
                        {{ error.email }}
                      </p>
                    </div>
                    <div
                      @click="isEmail"
                      style="
                        position: absolute;
                        top: 0;
                        right: 0;
                        cursor: pointer;
                      "
                    >
                      <i class="fa-regular fa-pen-to-square"></i>
                    </div>
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <p class="mb-0">Mật khẩu</p>
                  </div>
                  <div class="col-sm-9" style="position: relative">
                    <div v-if="isPass === false">
                      <p class="mb-0">****************</p>
                    </div>
                    <div v-else>
                      <input
                        class="mb-2"
                        type="password"
                        v-model="passWord.oldPass"
                        placeholder="Nhập mật khẩu cũ"
                      />

                      <input
                        class="mb-2"
                        type="password"
                        v-model="passWord.newPass"
                        placeholder="Nhập mật khẩu mới"
                      />

                      <input
                        type="password"
                        v-model="passWord.confirmPass"
                        placeholder="Nhập lại mật khẩu"
                      />
                      <p class="text-danger">
                        {{ error.password }}
                      </p>
                    </div>
                    <div
                      @click="isPassWord"
                      style="
                        position: absolute;
                        top: 0;
                        right: 0;
                        cursor: pointer;
                      "
                    >
                      <i class="fa-regular fa-pen-to-square"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div class="d-flex justify-content-end mb-2">
              <router-link to="/" class="btn btn-primary"> Hủy </router-link>

              <button type="submit" class="btn btn-primary">Lưu</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
const port = import.meta.env.VITE_HOST;
export default {
  data() {
    return {
      error: {},
      isInput: false,
      isPass: false,
      getUser: {
        email: null,
        image_path: null,
      },
      formData: new FormData(),
      passWord: {
        oldPass: "",
        newPass: "",
        confirmPass: "",
      },
    };
  },

  async created() {
    await this.getOneUser();
  },

  mounted() {
    var box = document.getElementById("box");
    var file = document.getElementById("file");

    box.addEventListener("click", function () {
      file.click();
    });
  },

  methods: {
    isEmail() {
      this.isInput = !this.isInput;
    },
    isPassWord() {
      this.isPass = !this.isPass;
    },
    fileChange() {
      const file = document.querySelector("input[type=file]").files[0];
      const reader = new FileReader();

      let rawImg;
      reader.onloadend = () => {
        rawImg = reader.result;
        this.getUser.image_path = rawImg;
      };
      reader.readAsDataURL(file);
      this.formData.append("photo", file);
    },
    validEmail(email) {
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    checkForm() {
      this.error = {};

      if (!this.getUser.email) {
        this.error.email = "Yêu cầu nhập email";
      } else if (!this.validEmail(this.getUser.email)) {
        this.error.email = "Yêu cầu phải là email";
      }

      if (
        (!this.passWord.oldPass ||
          !this.passWord.confirmPass ||
          !this.passWord.newPass) &&
        this.isPass === true
      ) {
        this.error.password = "Yêu cầu nhập mật khẩu";
      } else if (
        (this.passWord.oldPass.length < 6 ||
          this.passWord.newPass.length < 6 ||
          this.passWord.confirmPass.length < 6) &&
        this.isPass === true
      ) {
        this.error.password = "Mật khẩu phải trên 5 ký tự";
      } else if (
        (this.passWord.oldPass.length > 25 ||
          this.passWord.newPass.length > 25 ||
          this.passWord.confirmPass.length > 25) &&
        this.isPass === true
      ) {
        this.error.password = "Mật khẩu phải dưới 25 ký tự";
      } else if (
        this.passWord.newPass !== this.passWord.confirmPass &&
        this.isPass === true
      ) {
        this.error.password = "Mật khẩu không trùng khớp";
      }

      const check = Object.keys(this.error);
      if (check.length === 0) {
        this.editUser();
      }
      if (check.length === 0 && this.isPass === true) {
        this.editPassWord();
      }
    },
    async getOneUser() {
      try {
        const acCookie = await cookieStore.get("accessToken");
        const rfCookie = await cookieStore.get("refreshToken");
        const accessToken = acCookie.value;
        const refreshToken = rfCookie.value;
        const res = await fetch(`${port}/user`, {
          headers: {
            "bookstore-access-token": accessToken,
            "bookstore-refresh-token": refreshToken,
          },
        });

        const resData = await res.json();
        this.getUser = resData;
        if (
          res.status === 401 &&
          resData.message === "Access token đã hết hạn"
        ) {
          let d = new Date();
          d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000);
          let expires = "expires=" + d.toUTCString();
          document.cookie =
            "accessToken=" +
            resData.newAccessToken +
            ";" +
            expires +
            ";path=/" +
            ";secure";
          return await this.getOneUser();
        }
      } catch (error) {}
    },
    async editUser() {
      try {
        const acCookie = await cookieStore.get("accessToken");
        const rfCookie = await cookieStore.get("refreshToken");
        const accessToken = acCookie.value;
        const refreshToken = rfCookie.value;

        this.formData.append("email", this.getUser.email);

        const res = await fetch(`${port}/user`, {
          method: "PUT",
          headers: {
            "bookstore-access-token": accessToken,
            "bookstore-refresh-token": refreshToken,
          },
          body: this.formData,
        });

        const resData = await res.json();
        this.formData = new FormData();
        if (res.status === 200) {
          alert("Cập nhật thành công");
        } else {
          alert("Bạn chưa có thay đổi");
        }

        if (
          res.status === 401 &&
          resData.message === "Access token đã hết hạn"
        ) {
          let d = new Date();
          d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000);
          let expires = "expires=" + d.toUTCString();
          document.cookie =
            "accessToken=" +
            resData.newAccessToken +
            ";" +
            expires +
            ";path=/" +
            ";secure";
          return await this.editUser();
        }
      } catch (error) {}
    },
    async editPassWord() {
      try {
        const acCookie = await cookieStore.get("accessToken");
        const rfCookie = await cookieStore.get("refreshToken");
        const accessToken = acCookie.value;
        const refreshToken = rfCookie.value;

        const res = await fetch(`${port}/password`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "bookstore-access-token": accessToken,
            "bookstore-refresh-token": refreshToken,
          },
          body: JSON.stringify({
            oldPassword: this.passWord.oldPass,
            newPassword: this.passWord.newPass,
            confirmPassword: this.passWord.confirmPass,
          }),
        });

        const resData = await res.json();
        this.passWord = {};

        alert(resData.message);

        if (
          res.status === 401 &&
          resData.message === "Access token đã hết hạn"
        ) {
          let d = new Date();
          d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000);
          let expires = "expires=" + d.toUTCString();
          document.cookie =
            "accessToken=" +
            resData.newAccessToken +
            ";" +
            expires +
            ";path=/" +
            ";secure";
          return await this.editPassWord();
        }
        if (res.status === 200 && resData.message === "Cập nhật thành công") {
          this.$router.push("/signin");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
/* #box {
  position: relative;
} */

/* p {
  position: absolute;
  top: 80px;
  color: white;
} */

#file {
  /* visibility: hidden; */
  display: none;
}
</style>
