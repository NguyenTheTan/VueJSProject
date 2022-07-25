<template>
  <div class="container mt-5 mb-5">
    <div class="row d-flex justify-content-center">
      <div class="col-md-10">
        <div class="card detail">
          <div class="row">
            <!-- <div> -->
            <div class="col-md-6">
              <div class="images p-3">
                <div class="text-center p-4">
                  <img
                    id="main-image"
                    :src="bookDetail.imgPath"
                    :alt="bookDetail.name"
                    width="250"
                  />
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="product p-4">
                <div class="d-flex justify-content-between align-items-center">
                  <div class="d-flex align-items-center">
                    <i class="fa fa-long-arrow-left"></i>
                    <router-link
                      to="/"
                      class="ml-1"
                      style="color: darkblue; margin-left: 4px"
                    >
                      Quay lại</router-link
                    >
                  </div>
                </div>
                <div class="mt-4 mb-3">
                  <span
                    class="text-uppercase fw-bold brand"
                    style="color: blueviolet"
                    >Chi tiết sản phẩm</span
                  >
                  <div class="d-flex mt-3">
                    <h5 class="text-uppercase">
                      {{ bookDetail.name }}
                    </h5>
                    <h5 style="margin: 0 0 0 18px; font-weight: bold">
                      {{ bookDetail.author }}
                    </h5>
                  </div>

                  <div
                    v-if="bookDetail.rating === 0"
                    class="ratings mb-2 d-none"
                  >
                    <i class="fa fa-star"></i>
                    <span class="mx-2">{{ bookDetail.rating }}</span>
                  </div>

                  <div v-else class="ratings mb-2">
                    <i class="fa fa-star"></i>
                    <span class="mx-2">{{ bookDetail.rating }}</span>
                  </div>

                  <div class="price d-flex flex-row align-items-center">
                    <span class="act-price">
                      {{ formatPrice(bookDetail.price2) }} đ</span
                    >
                    <div style="margin-left: 8px">
                      <small
                        class="dis-price"
                        v-if="bookDetail.price !== bookDetail.price2"
                        >{{ formatPrice(bookDetail.price) }} đ</small
                      >
                      <span
                        style="color: red"
                        v-if="bookDetail.price !== bookDetail.price2"
                      >
                        -{{
                          100 - (bookDetail.price2 * 100) / bookDetail.price
                        }}%</span
                      >
                      <span v-else class="d-none"></span>
                    </div>
                  </div>
                </div>
                <p class="about">
                  Nhà xuất bản:
                  <span style="color: red; font-weight: bold">{{
                    bookDetail.publisher
                  }}</span>
                </p>
                <div class="cart mt-4 align-items-center mb-4">
                  <button
                    @click="addToCart(bookDetail.id)"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    class="btn btn-danger text-uppercase mr-2 px-4"
                  >
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
              <!-- </div> -->
            </div>
            <div class="my-3" style="width: 100%; background-color: cadetblue">
              <div class="d-flex justify-content-center">
                <div class="cart mt-4 align-items-center mx-2 mb-4">
                  <button
                    @click="dess()"
                    id="dess"
                    style="
                      background-color: #fff;
                      color: black;
                      border: none;
                      font-weight: 600;
                    "
                    class="btn btn-danger text-uppercase mr-2 px-4"
                  >
                    Mô tả
                  </button>
                </div>
                <div class="cart mt-4 align-items-center mb-4">
                  <button
                    @click="rating()"
                    style="
                      background-color: #fff;
                      color: black;

                      font-weight: 600;
                    "
                    id="rating"
                    class="btn btn-danger text-uppercase mr-2 px-4"
                  >
                    Đánh giá
                  </button>
                </div>
              </div>
              <div class="row" v-if="rate === true && descript === false">
                <div
                  style="
                    padding: 1rem 0;
                    background-color: white;
                    margin-bottom: 2rem;
                    display: flex;
                    flex-direction: column;
                    border: 1px solid darkblue;
                  "
                >
                  <p v-if="bookDetail.feedback.length === 0" class="m-auto">
                    Hiện tại sản phẩm chưa có đánh giá nào, bạn hãy trở thành
                    người đầu tiên đánh giá cho sản phẩm này
                  </p>

                  <div v-else>
                    <div
                      style="background-color: gainsboro"
                      v-for="rate in listFeedback"
                      :key="rate.id"
                    >
                      <div>
                        <div>
                          <img
                            v-if="rate.image_path !== null"
                            width="30"
                            class="rounded-circle mx-2 mt-2"
                            :src="rate.image_path"
                          />
                          <img
                            v-else
                            width="30"
                            class="rounded-circle mx-2 mt-2"
                            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                          />
                          <span
                            style="color: blueviolet; font-weight: 600"
                            class="mx-2"
                            >{{ rate.username }}</span
                          >

                          <p v-if="rate.feedback === null" class="mx-2">
                            Đánh giá:
                            <span style="color: darkblue">Hay</span>
                          </p>
                          <p v-else class="mx-2">
                            Đánh giá:
                            <span style="color: darkblue">{{
                              rate.feedback
                            }}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    v-if="
                      bookDetail.feedback.length > 7 &&
                      listFeedback.length < bookDetail.feedback.length
                    "
                  >
                    <button
                      style="
                        color: darkblue;
                        background-color: white;
                        padding-left: 10px;
                        border: none;
                      "
                      @click="seeMore"
                    >
                      Xem thêm <i class="fa-solid fa-caret-down"></i>
                    </button>
                  </div>
                  <div
                    v-if="
                      bookDetail.feedback.length === listFeedback.length &&
                      listRate > 5
                    "
                  >
                    <button
                      style="
                        color: darkblue;
                        background-color: white;
                        padding-left: 10px;
                        border: none;
                      "
                      @click="dismiss"
                    >
                      Ẩn bớt <i class="fa-solid fa-caret-up"></i>
                    </button>
                  </div>

                  <div class="mt-4 m-auto">
                    <button
                      @click="rating()"
                      class="btn btn-danger text-uppercase mr-2 px-4"
                      data-bs-toggle="modal"
                      href="#exampleModalToggle"
                      role="button"
                    >
                      Gửi đánh giá của bạn
                    </button>
                  </div>
                </div>
              </div>
              <div class="row" v-else>
                <div style="padding: 0 24px">
                  <p class="d-flex p-1 mr-4">
                    {{ bookDetail.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Rating -->

  <div
    class="modal fade"
    id="exampleModalToggle"
    aria-hidden="true"
    aria-labelledby="exampleModalToggleLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-4">
        <div class="d-flex" style="flex-direction: column">
          <div class="d-flex justify-content-end">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <h6 class="modal-title m-auto" id="exampleModalToggleLabel">
            Đánh giá sản phẩm
          </h6>

          <h3 class="m-auto">{{ bookDetail.name }}</h3>
        </div>

        <form action="" @submit.prevent="validateRating()">
          <div class="d-flex">
            <p class="mt-3">Đánh giá của bạn về sản phẩm:</p>
            <div id="rating" class="mt-1">
              <input type="radio" id="star5" v-model="stars" value="5" />
              <label class="full" for="star5"></label>

              <input type="radio" id="star4" v-model="stars" value="4" />
              <label class="full" for="star4"></label>

              <input type="radio" id="star3" v-model="stars" value="3" />
              <label class="full" for="star3"></label>

              <input type="radio" id="star2" v-model="stars" value="2" />
              <label class="full" for="star2"></label>

              <input type="radio" id="star1" v-model="stars" value="1" />
              <label class="full" for="star1"></label>
            </div>
          </div>
          <p class="text-danger">{{ error }}</p>

          <div>
            <textarea
              style="width: 100%"
              placeholder="Nhập nội dung đánh giá của bạn về sản phẩm này"
              v-model="feedback"
            ></textarea>
          </div>
          <div class="mt-3 d-flex">
            <button
              v-if="stars === null"
              class="btn btn-primary m-auto"
              type="submit"
            >
              Gửi đánh giá
            </button>
            <button
              v-else
              class="btn btn-primary m-auto"
              data-bs-dismiss="modal"
              type="submit"
            >
              Gửi đánh giá
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- Modal Cart -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            <i class="fa-solid fa-circle-check"></i>
            Sản phẩm vừa thêm vào giỏ hàng
          </h5>

          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <img class="col-md-2" :src="carts.imgPath" :alt="carts.name" />
            <div class="col-md-10" style="color: black; font-weight: bold">
              <p>{{ carts.name }}</p>
              <p>{{ formatPrice(carts.price) }} đ</p>
            </div>
          </div>
        </div>

        <div class="modal-footer justify-content-center">
          <a
            data-bs-dismiss="modal"
            href=""
            @click="closeModal"
            class="cartfooter"
            style="color: black; font-weight: bold"
          >
            <i class="fa-solid fa-caret-right"></i>
            Giỏ hàng của bạn hiện có ({{ totalBookInCart }}) sản phẩm</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const port = import.meta.env.VITE_HOST;
export default {
  data() {
    return {
      bookDetail: {},
      bookId: null,
      carts: { name: "", imgPath: "", price: null },
      totalBookInCart: null,
      descript: false,
      rate: false,
      stars: null,
      feedback: null,
      error: "",
      listRate: 5,
      seemore: 1,
      listFeedback: [],
    };
  },
  async created() {
    await this.getOneBook();
    if (this.$route.params.id) {
      this.dess();
    }
  },
  methods: {
    closeModal() {
      // Redirect back
      this.$router.push(`/cart`);
    },
    dess() {
      this.descript = true;

      const el = document.getElementById("dess");
      el.classList.add("descript");

      const ele = document.getElementById("rating");
      ele.classList.remove("descript");

      this.rate = false;
    },
    rating() {
      this.rate = true;

      const el = document.getElementById("rating");
      el.classList.add("descript");

      const ele = document.getElementById("dess");
      ele.classList.remove("descript");

      this.descript = false;
    },
    formatPrice(value) {
      const val = (value / 1).toFixed(0).replace(".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    async getOneBook() {
      this.bookId = this.$route.params.id;

      try {
        const res = await fetch(`${port}/books/${this.bookId}`);

        this.bookDetail = await res.json();

        this.listFeedback = this.bookDetail.feedback.slice(
          (this.seemore - 1) * this.listRate,
          this.seemore * this.listRate
        );
      } catch (error) {}
    },
    async addToCart(id) {
      let resData;
      const acCookie = await cookieStore.get("accessToken");
      const rfCookie = await cookieStore.get("refreshToken");
      try {
        let res;
        if (!acCookie || !rfCookie) {
          res = await fetch(`${port}/unAuthCart/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ id_book: id }),
          });
        } else {
          const accessToken = acCookie.value;
          const refreshToken = rfCookie.value;
          res = await fetch(`${port}/cart`, {
            method: "POST",
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
            return await this.addToCart(id);
          }
        }

        const recentBook = resData.listBookInCart.find(
          (book) => book.id === id
        );
        const { totalBookInCart } = resData;
        this.carts = recentBook;
        this.totalBookInCart = totalBookInCart;
      } catch (error) {}
    },
    async addRating() {
      try {
        const acCookie = await cookieStore.get("accessToken");
        const rfCookie = await cookieStore.get("refreshToken");
        const accessToken = acCookie.value;
        const refreshToken = rfCookie.value;

        const id_book = this.bookId;

        const res = await fetch(`${port}/rating`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "bookstore-access-token": accessToken,
            "bookstore-refresh-token": refreshToken,
          },
          body: JSON.stringify({
            rating: this.stars,
            id_book,
            feedback: this.feedback,
          }),
        });
        const resData = await res.json();

        if (res.status === 201) {
          setTimeout(myTimeout, 1000);
          function myTimeout() {
            alert("Cảm ơn bạn đã đánh giá và đóng góp ý kiến");
          }
          await this.getOneBook();
          this.feedback = null;
        }

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
          return await this.addRating();
        }
      } catch (error) {}
    },
    validateRating() {
      this.error = "";
      if (!this.stars) {
        this.error = "Bạn vẫn chưa đánh giá";
      }

      if (this.stars !== null) {
        this.addRating();
      }
    },

    // seemore rating

    seeMore() {
      if (
        this.seemore !==
        Math.ceil(this.bookDetail.feedback.length / this.listRate)
      ) {
        this.listRate += 10;

        this.getOneBook();
      }
    },
    dismiss() {
      this.listRate = 5;
      this.getOneBook();
    },
  },
};
</script>

<style>
.detail {
  border: none;
}
.product {
  background-color: #eee;
  height: 100%;
}
.brand {
  font-size: 13px;
}
.act-price {
  color: red;
  font-weight: 700;
}
.dis-price {
  text-decoration: line-through;
}

.descript {
  color: red !important;
}
#dess:hover {
  color: red !important;
}

#rating:hover {
  color: red !important;
}

.color {
  margin-bottom: 10px;
}
label.radio {
  cursor: pointer;
}
label.radio input {
  position: absolute;
  top: 0;
  left: 0;
  visibility: hidden;
  pointer-events: none;
}
label.radio span {
  padding: 2px 9px;
  border: 2px solid #ff0000;
  display: inline-block;
  color: #ff0000;
  border-radius: 3px;
  text-transform: uppercase;
}
label.radio input:checked + span {
  border-color: #ff0000;
  background-color: #ff0000;
  color: #fff;
}

.cart i {
  margin-right: 10px;
}

.ratings {
  margin-right: 10px;
}

.ratings i {
  color: #cecece;
  font-size: 32px;
}

.rating-color {
  color: #ffd700;
}

.review-count {
  font-weight: 400;
  margin-bottom: 2px;
  font-size: 24px !important;
}

.small-ratings i {
  color: #cecece;
}

.review-stat {
  font-weight: 300;
  font-size: 18px;
  margin-bottom: 2px;
}

/****** Style Star Rating Widget *****/
#rating {
  border: none;
  float: left;
}
#rating > input {
  display: none;
} /*ẩn input radio - vì chúng ta đã có label là GUI*/
#rating > label:before {
  margin: 5px;
  font-size: 1.25em;
  font-family: FontAwesome;
  display: inline-block;
  content: "\f005";
} /*1 ngôi sao*/
#rating > .half:before {
  content: "\f089";
  position: absolute;
} /*0.5 ngôi sao*/
#rating > label {
  color: #ddd;
  float: right;
} /*float:right để lật ngược các ngôi sao lại đúng theo thứ tự trong thực tế*/
/*thêm màu cho sao đã chọn và các ngôi sao phía trước*/
#rating > input:checked ~ label,
#rating:not(:checked) > label:hover,
#rating:not(:checked) > label:hover ~ label {
  color: #ffd700;
}
/* Hover vào các sao phía trước ngôi sao đã chọn*/
#rating > input:checked + label:hover,
#rating > input:checked ~ label:hover,
#rating > label:hover ~ input:checked ~ label,
#rating > input:checked ~ label:hover ~ label {
  color: #ffed85;
}
</style>
