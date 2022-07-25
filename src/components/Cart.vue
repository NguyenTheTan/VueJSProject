<template>
  <section style="background-color: #d2c9ff">
    <div class="container py-5 h-100 w3-animate-left">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12">
          <div
            class="card card-registration card-registration-2"
            style="border-radius: 15px"
          >
            <div class="card-body p-0">
              <div class="row g-0">
                <div class="col-lg-8">
                  <div class="p-5">
                    <div
                      class="d-flex justify-content-between align-items-center mb-5"
                    >
                      <h1 class="fw-bold mb-0 text-black">Giỏ hàng</h1>
                      <h6 class="mb-0">
                        Tổng số lượng: {{ carts.totalBookInCart }}
                      </h6>
                    </div>
                    <hr class="my-4" />

                    <div
                      v-if="carts.totalBookInCart == 0"
                      class="text-danger justify-content-center d-flex"
                    >
                      <p>Không có sản phẩm trong giỏ hàng</p>
                    </div>

                    <div
                      class="row mb-4 d-flex justify-content-between align-items-center"
                      v-else
                      v-for="cart in carts.listBookInCart"
                      :key="cart.id"
                    >
                      <div class="col-md-2 col-lg-2 col-xl-2">
                        <img
                          :src="cart.imgPath"
                          class="img-fluid rounded-3"
                          :alt="cart.name"
                          style="height: auto"
                        />
                      </div>
                      <div class="col-md-3 col-lg-3 col-xl-3">
                        <h6 class="text-black mb-0">{{ cart.name }}</h6>
                      </div>
                      <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                        <button
                          class="btn btn-link px-2"
                          @click="decrease(cart.id)"
                        >
                          <i class="fas fa-minus"></i>
                        </button>

                        <input
                          id="form1"
                          min="0"
                          name="quantity"
                          :value="cart.quantity"
                          class="form-control form-control-sm p-0"
                          disabled
                        />

                        <button
                          class="btn btn-link px-2"
                          @click="increase(cart.id)"
                        >
                          <i class="fas fa-plus"></i>
                        </button>
                      </div>
                      <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                        <h6 class="mb-0">{{ formatPrice(cart.total) }} đ</h6>
                      </div>
                      <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                        <a
                          style="cursor: pointer"
                          class="text-muted"
                          @click="deleteCart(cart.id)"
                          ><i class="fas fa-trash-alt"></i
                        ></a>
                      </div>
                    </div>

                    <hr class="my-4" />

                    <div class="pt-5">
                      <h6 class="mb-0">
                        <router-link to="/" class="text-body next-shopCart"
                          ><i class="fas fa-long-arrow-alt-left me-2"></i>Tiếp
                          tục mua sắm</router-link
                        >
                      </h6>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 bg-grey">
                  <div class="p-5">
                    <h3 class="fw-bold mb-5 mt-2 pt-1">Thanh toán</h3>
                    <hr class="my-4" />

                    <div class="d-flex justify-content-between mb-4">
                      <h5 class="text-uppercase">Tổng</h5>
                      <h5>{{ formatPrice(carts.totalBill) }} đ</h5>
                    </div>

                    <div class="d-flex justify-content-between mb-4">
                      <h5 class="text-uppercase mb-3">Phí ship</h5>
                      <h5>{{ formatPrice(ship) }} đ</h5>
                    </div>

                    <hr class="my-4" />

                    <div class="d-flex justify-content-between mb-5">
                      <h5 class="text-uppercase">Tổng thanh toán</h5>
                      <h5>{{ formatPrice(carts.totalBill + ship) }} đ</h5>
                    </div>

                    <router-link
                      type="button"
                      class="btn btn-block btn-lg checkout"
                      to="/checkout"
                      >Tiến hành thanh toán</router-link
                    >
                  </div>
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
const port = import.meta.env.VITE_HOST;
export default {
  data() {
    return {
      carts: [],
      ship: 50000,
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
        this.carts = resData;
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
      } catch (error) {}
    },
  },
};
</script>

<style>
@media (min-width: 1025px) {
  .h-custom {
    height: 100vh !important;
  }
}

.card-registration .select-input.form-control[readonly]:not([disabled]) {
  font-size: 1rem;
  line-height: 2.15;
  padding-left: 0.75em;
  padding-right: 0.75em;
}

.card-registration .select-arrow {
  top: 13px;
}

.bg-grey {
  background-color: #eae8e8;
}

@media (min-width: 992px) {
  .card-registration-2 .bg-grey {
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
  }
}

@media (max-width: 991px) {
  .card-registration-2 .bg-grey {
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }
}
#form1 {
  padding-left: 4px !important;
}
.next-shopCart {
  color: blueviolet !important;
}
.next-shopCart:hover {
  color: darkblue !important;
}
.checkout:hover {
  color: white;
  background-color: darkblue;
}
.checkout {
  background-color: darkkhaki;
  color: black;
}
</style>
