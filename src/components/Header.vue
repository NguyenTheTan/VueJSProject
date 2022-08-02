<template>
  <!-- Spinner Start -->
  <div
    id="spinner"
    class="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
  >
    <div
      class="spinner-border text-primary"
      style="width: 3rem; height: 3rem"
      role="status"
    >
      <span class="sr-only">Loading...</span>
    </div>
  </div>
  <!-- Spinner End -->

  <!-- Topbar Start -->
  <div class="container-fluid bg-light p-0">
    <div class="row d-none d-lg-flex">
      <div class="col-lg-7 px-5 text-start">
        <div class="h-100 d-inline-flex align-items-center py-3 me-4">
          <small class="fa fa-map-marker-alt text-primary me-2"></small>
          <small>82 Duy Tân, Cầu Giấy, Hà Nội</small>
        </div>
        <div class="h-100 d-inline-flex align-items-center py-3">
          <small class="far fa-clock text-primary me-2"></small>
          <small>Thứ 2 - Thứ 6 : 08.00 AM - 10.00 PM</small>
        </div>
      </div>
      <div class="col-lg-5 px-5 text-end">
        <div class="h-100 d-inline-flex align-items-center py-3 me-4">
          <small class="fa fa-phone-alt text-primary me-2"></small>
          <small>08.6868.2268</small>
        </div>
        <div class="h-100 d-inline-flex align-items-center">
          <a class="btn btn-sm-square bg-white text-primary me-1" href="#"
            ><i class="fab fa-facebook-f"></i
          ></a>
          <a class="btn btn-sm-square bg-white text-primary me-1" href="#"
            ><i class="fab fa-twitter"></i
          ></a>
          <a class="btn btn-sm-square bg-white text-primary me-1" href="#"
            ><i class="fab fa-linkedin-in"></i
          ></a>
          <a class="btn btn-sm-square bg-white text-primary me-0" href="#"
            ><i class="fab fa-instagram"></i
          ></a>
        </div>
      </div>
    </div>
  </div>
  <!-- Topbar End -->

  <!-- Navbar Start -->
  <nav
    class="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0"
  >
    <router-link
      to="/"
      tag="button"
      class="navbar-brand d-flex align-items-center px-4"
    >
      <h2 class="m-0 text-primary">
        <img width="70" src="../assets/logo.png" alt="book" /> Book Store
      </h2>
    </router-link>
    <button
      type="button"
      class="navbar-toggler me-4"
      data-bs-toggle="collapse"
      data-bs-target="#navbarCollapse"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarCollapse">
      <div class="navbar-nav ms-auto p-4 p-lg-0">
        <router-link to="/" class="nav-item nav-link active fw-bold"
          >Trang chủ</router-link
        >
        <a href="#" class="nav-item nav-link fw-bold">About</a>
        <a href="#" class="nav-item nav-link fw-bold">Services</a>
        <div class="nav-item dropdown">
          <a
            href="#"
            class="nav-link dropdown-toggle fw-bold"
            data-bs-toggle="dropdown"
            >Pages</a
          >
          <div class="dropdown-menu fade-up m-0">
            <a href="#" class="dropdown-item fw-bold">Booking</a>
            <a href="#" class="dropdown-item fw-bold">Technicians</a>
            <a href="#" class="dropdown-item fw-bold">Testimonial</a>
            <a href="#" class="dropdown-item fw-bold">404 Page</a>
          </div>
        </div>
        <!-- <a href="#" class="nav-item nav-link">
          <i class="fa fa-shopping-cart"></i
        ></a> -->
      </div>
      <div class="nav-item dropdown">
        <a href="#" class="dropdown-toggle fw-bold" data-bs-toggle="dropdown"
          ><i class="fa-solid fa-user fs-5"></i
        ></a>
        <div
          class="dropdown-menu fade-up m-0"
          v-if="acCookie === undefined && rfCookie === undefined"
        >
          <router-link
            to="/signup"
            class="dropdown-item fw-bold"
            style="width: 10rem"
            >Đăng ký</router-link
          >
          <router-link
            to="/signin"
            class="dropdown-item fw-bold"
            style="width: 10rem"
            >Đăng nhập</router-link
          >
        </div>
        <div class="dropdown-menu fade-up m-0" v-else>
          <router-link
            to="/account"
            class="dropdown-item fw-bold"
            style="width: 10rem"
            >Tài khoản</router-link
          >
          <router-link
            @click="deleteCookie"
            to=""
            class="dropdown-item fw-bold"
            style="width: 10rem"
            >Đăng xuất</router-link
          >
        </div>
      </div>

      <li
        class="nav-item dropdown"
        style="list-style: none; margin-right: 4rem"
      >
        <a
          href="#"
          class="dropdown-toggle nav-link waves-effect"
          data-toggle="dropdown"
          role="button"
          aria-expanded="false"
        >
          <span
            id="cartCount"
            style="
              display: flex;
              position: absolute;
              top: -7px;
              right: 24px;
              height: 16px;
              width: 10px;
              justify-content: center;
            "
            class="badge rounded-circle"
            >{{ totalBook.totalBookInCart }}</span
          >
          <i
            data-toggle="tooltip"
            title="Giỏ hàng"
            style="position: relative"
            class="fas fa-shopping-cart fs-5"
          ></i>
        </a>
        <div
          v-if="!carts.length"
          class="dropdown-menu"
          style="margin-left: -17rem"
        >
          <p class="dropdown-item fw-bold">
            Không có sản phẩm nào trong giỏ hàng
          </p>
        </div>
        <div class="dropdown-menu" style="margin-left: -17rem" v-else>
          <div style="overflow-y: scroll; width: 20rem; height: 12rem">
            <div class="row mb-3" v-for="cart in carts">
              <div class="col-md-4">
                <img width="80" :src="cart.imgPath" :alt="cart.name" />
              </div>
              <div class="col-md-8">
                <p>
                  {{ cart.name }} <span>({{ cart.quantity }})</span>
                </p>
                <p>{{ formatPrice(cart.price) }} đ</p>
                <div class="d-flex">
                  <button class="btn btn-link px-2" @click="decrease(cart.id)">
                    <i class="fas fa-minus"></i>
                  </button>

                  <input
                    id="form1"
                    min="0"
                    name="quantity"
                    :value="cart.quantity"
                    class="form-control form-control-sm p-0"
                    style="width: 3rem"
                    disabled
                  />

                  <button class="btn btn-link px-2" @click="increase(cart.id)">
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="p-2">
            <hr />
            <div class="d-flex" style="justify-content: space-between">
              <p style="color: blueviolet; font-weight: bold">Tổng cộng:</p>
              <p style="color: darkblue; font-weight: bold">
                {{ formatPrice(totalBook.totalBill) }} đ
              </p>
            </div>
            <div class="d-flex" style="justify-content: space-between">
              <router-link to="/checkout" class="btn btn-primary"
                >Thanh toán</router-link
              >
              <router-link to="/cart" class="btn btn-primary"
                >Giỏ hàng</router-link
              >
            </div>
          </div>
        </div>
      </li>
    </div>
  </nav>
  <!-- Navbar End -->
</template>

<script>
const port = import.meta.env.VITE_HOST;
export default {
  data() {
    return {
      acCookie: undefined,
      rfCookie: undefined,
      param: this.$route.params,
      object: {},
      carts: [],
      totalBook: [],
    };
  },

  async beforeMount() {
    await this.getCart();
  },

  methods: {
    formatPrice(value) {
      const val = (value / 1).toFixed(0).replace(".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    async deleteCookie() {
      this.acCookie = await window.cookieStore.delete("accessToken");
      this.rfCookie = await window.cookieStore.delete("refreshToken");
      this.carts = [];
      this.$router.push("/signin");
    },
    async getToken() {
      const acCookie = await cookieStore.get("accessToken");
      const rfCookie = await cookieStore.get("refreshToken");
      this.acCookie = acCookie.value;
      this.rfCookie = rfCookie.value;
    },
    async getCart() {
      let resData;
      const acCookie = await cookieStore.get("accessToken");
      const rfCookie = await cookieStore.get("refreshToken");
      try {
        let res;
        if (!acCookie || !rfCookie) {
          res = await fetch(`${port}/unAuthCart/`);
        } else {
          const accessToken = acCookie.value;
          const refreshToken = rfCookie.value;
          res = await fetch(`${port}/cart`, {
            headers: {
              "Content-Type": "application/json",
              "bookstore-access-token": accessToken,
              "bookstore-refresh-token": refreshToken,
            },
          });

          resData = await res.json();
          if (
            res.status == 401 &&
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
            return await this.getCart();
          }
        }
        this.carts = resData.listBookInCart;
        this.totalBook = resData;
        await this.getToken();
      } catch (error) {}
    },
    async increase(id) {
      let resData;
      const acCookie = await cookieStore.get("accessToken");
      const rfCookie = await cookieStore.get("refreshToken");
      try {
        let res;
        if (!acCookie || !rfCookie) {
          res = await fetch(`${port}/unAuthCart/`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id_book: id, type: "plus" }),
          });
        } else {
          const accessToken = acCookie.value;
          const refreshToken = rfCookie.value;
          res = await fetch(`${port}/cart`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "bookstore-access-token": accessToken,
              "bookstore-refresh-token": refreshToken,
            },
            body: JSON.stringify({ id_book: id, type: "plus" }),
          });

          resData = await res.json();
          if (
            res.status == 401 &&
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
            return await this.getCart();
          }
        }
        this.carts = resData;
        await this.getCart();
      } catch (error) {}
    },
    async decrease(id) {
      let resData;
      const acCookie = await cookieStore.get("accessToken");
      const rfCookie = await cookieStore.get("refreshToken");
      try {
        let res;
        if (!acCookie || !rfCookie) {
          res = await fetch(`${port}/unAuthCart/`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id_book: id, type: "less" }),
          });
        } else {
          const accessToken = acCookie.value;
          const refreshToken = rfCookie.value;
          res = await fetch(`${port}/cart`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "bookstore-access-token": accessToken,
              "bookstore-refresh-token": refreshToken,
            },
            body: JSON.stringify({ id_book: id, type: "less" }),
          });

          resData = await res.json();
          if (
            res.status == 401 &&
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
            return await this.getCart();
          }
        }
        this.carts = resData;
        await this.getCart();
      } catch (error) {}
    },
    async deleteCart(id) {
      let resData;
      const acCookie = await cookieStore.get("accessToken");
      const rfCookie = await cookieStore.get("refreshToken");
      try {
        let res;
        if (!acCookie || !rfCookie) {
          res = await fetch(`${port}/unAuthCart/`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id_book: id }),
          });
        } else {
          const accessToken = acCookie.value;
          const refreshToken = rfCookie.value;
          res = await fetch(`${port}/cart`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "bookstore-access-token": accessToken,
              "bookstore-refresh-token": refreshToken,
            },
            body: JSON.stringify({ id_book: id }),
          });

          resData = await res.json();
          if (
            res.status == 401 &&
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
            return await this.getCart();
          }
        }
        this.carts = resData;
        await this.getCart();
      } catch (error) {}
    },
  },
};
</script>

<style>
.badge {
  background-color: red;
}
</style>
