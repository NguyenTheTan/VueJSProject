<template>
  <!-- Carousel Start -->
  <div class="container-fluid p-0 mb-1">
    <div id="header-carousel" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img class="w-100" src="../assets/img/carousel1.jpg" alt="Image" />
          <div class="carousel-caption d-flex align-items-center">
            <div class="container">
              <div
                class="row align-items-center justify-content-center justify-content-lg-start w3-animate-top"
              >
                <div class="col-10 col-lg-7 text-center text-lg-start">
                  <h6
                    class="text-white text-uppercase mb-3 animated slideInDown"
                  >
                    --> Sách hot
                  </h6>
                  <h1
                    class="display-3 text-white mb-4 pb-3 animated slideInDown"
                  >
                    Đọc sách có thể làm thay đổi cách suy nghĩ của bạn
                  </h1>
                  <a
                    href=""
                    class="btn btn-primary py-3 px-5 animated slideInDown"
                    >Tìm hiểu thêm<i class="fa fa-arrow-right ms-3"></i
                  ></a>
                </div>
                <div class="col-lg-5 d-none d-lg-flex animated zoomIn">
                  <img
                    class="img-fluid"
                    src="../assets/img/image-bookjpg-1.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <img class="w-100" src="../assets/img/carousel2.jpg" alt="Image" />
          <div
            class="carousel-caption d-flex align-items-center w3-animate-top"
          >
            <div class="container">
              <div
                class="row align-items-center justify-content-center justify-content-lg-start"
              >
                <div class="col-10 col-lg-7 text-center text-lg-start">
                  <h6
                    class="text-white text-uppercase mb-3 animated slideInDown"
                  >
                    --> sách tốt
                  </h6>
                  <h1
                    class="display-3 text-white mb-4 pb-3 animated slideInDown"
                  >
                    Đọc sách mỗi ngày tăng khả tư duy tốt
                  </h1>
                  <a
                    href=""
                    class="btn btn-primary py-3 px-5 animated slideInDown"
                    >Tìm hiểu thêm<i class="fa fa-arrow-right ms-3"></i
                  ></a>
                </div>
                <div class="col-lg-5 d-none d-lg-flex animated zoomIn">
                  <img class="img-fluid" src="../assets/img/book2.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#header-carousel"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#header-carousel"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
  <!-- Carousel End -->

  <!-- Category -->
  <nav class="navbar navbar-expand-sm navbar-dark bg-dark mb-3">
    <div class="container-fluid w3-animate-left">
      <router-link
        v-if="this.$route.params.id === undefined"
        class="nav-link cates"
        @click="getBooks"
        style="color: lime !important"
        to="/"
      >
        Tất cả
      </router-link>
      <router-link v-else class="nav-link cates" @click="getBooks" to="/">
        Tất cả
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mynavbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="mynavbar">
        <ul class="navbar-nav me-auto">
          <router-link
            class="nav-link cates"
            v-for="cate in cates"
            :data-id="cate.id"
            :key="cate.id"
            @click="getBooks(cate.id)"
            :to="{ name: 'category', params: { id: cate.id } }"
          >
            {{ cate.name }}
          </router-link>
        </ul>
        <form @submit.prevent="searchBook()" class="d-flex">
          <input
            class="form-control me-2"
            type="text"
            v-model="search"
            @keyup="searchBook()"
            placeholder="Nhập tên sách muốn tìm..."
          />
          <button class="btn btn-primary rounded-3" type="submit">
            Tìm kiếm
          </button>
        </form>
      </div>
    </div>
  </nav>
  <!-- Category End -->

  <!--List Book-->
  <div class="container-fluid mt-3 mb-3 w3-animate-top">
    <div class="row" v-if="books.length > 0">
      <div class="row" v-if="error.length === 0">
        <div class="col-lg-3 col-md-4 col-12 mb-3" v-for="book in newBooks">
          <div class="card">
            <div class="img-container">
              <div
                class="d-flex justify-content-between align-items-center p-2 first"
              >
                <span class="percent" v-if="book.price !== book.price2">
                  -{{ 100 - (book.price2 * 100) / book.price }}%</span
                >
                <!-- <span class="wishlist"><i class="fa fa-heart"></i></span> -->
              </div>
              <div style="cursor: pointer" @click="gotoBook(book.id)">
                <img :src="book.imgPath" class="img-fluid" />
              </div>
              <!-- <BookDetail class="d-none" :book-id="book.id" /> -->
            </div>
            <div class="product-detail-container">
              <div class="d-flex justify-content-between align-items-center">
                <h6 class="mb-0">{{ book.name }}</h6>
                <del
                  class="text-danger"
                  style="font-size: 13px"
                  v-if="book.price !== book.price2"
                  >{{ formatPrice(book.price) }} đ</del
                >
              </div>
              <div
                class="d-flex justify-content-between align-items-center mt-2"
              >
                <div v-if="book.rating === 0" class="ratings">
                  <i class="fa fa-star"></i>
                </div>
                <div v-else class="ratings">
                  <i class="fa fa-star"></i> <span>{{ book.rating }}</span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <span style="color: black"
                    >{{ formatPrice(book.price2) }} đ</span
                  >
                </div>
              </div>
            </div>
            <div class="mt-3 d-grid">
              <button
                @click="addToCart(book.id)"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                style="border-radius: 5px; margin: 8px 0"
                class="btn btn-danger btn-block"
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li v-if="page === 1" class="page-item d-none">
              <button @click="backPage" class="page-link">&lt;&lt</button>
            </li>
            <li v-else class="page-item">
              <button @click="backPage" class="page-link">&lt;&lt</button>
            </li>
            <li class="page-item d-flex">
              <button
                v-for="item in Math.ceil(books.length / perPage)"
                :key="item"
                :data-id="item"
                @click="goToPage(item)"
                class="page-link pages"
              >
                {{ item }}
              </button>
            </li>

            <li
              v-if="Math.ceil(books.length / perPage) === page"
              class="page-item d-none"
            >
              <button @click="nextPage" class="page-link">&gt;&gt</button>
            </li>
            <li v-else class="page-item">
              <button @click="nextPage" class="page-link">&gt;&gt</button>
            </li>
          </ul>
        </nav>
      </div>
      <div v-else class="d-flex justify-content-center text-danger">
        {{ error }}
      </div>
    </div>
    <div v-else class="d-flex justify-content-center text-danger">
      Không có sản phẩm trong danh mục này
    </div>
  </div>
  <!--List Book End-->

  <!-- Modal -->
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
      cates: [],
      books: [],
      carts: { name: "", imgPath: "", price: null },
      totalBookInCart: null,
      page: 1,
      perPage: 36,
      newBooks: [],
      search: "",
      error: "",
    };
  },
  async created() {
    await this.getCates();
    this.cateFocus();
    if (!this.$route.params.id) {
      await this.getBooks();
    } else {
      await this.getBooks(parseInt(this.$route.params.id));
    }
    this.pageFocus();
  },

  methods: {
    closeModal() {
      // Redirect back
      this.$router.push(`/cart`);
    },
    pageFocus() {
      if (this.page) {
        const page = document.createAttribute("id");
        page.value = "pageNum";
        const node = Array.from(document.querySelectorAll(".pages")).find(
          (el) => el.dataset.id == this.page
        );
        if (
          Array.from(document.querySelectorAll(".pages")).find(
            (el) => el.dataset.id == this.page
          )
        ) {
          node.setAttributeNode(page);
        } else {
          this.getCates();
        }
      }
    },
    cateFocus() {
      if (this.$route.params.id) {
        const attr = document.createAttribute("id");
        attr.value = "cateFocus";
        const element = Array.from(document.querySelectorAll(".cates")).find(
          (el) => el.dataset.id === `${this.$route.params.id}`
        );
        element.setAttributeNode(attr);
        this.pageFocus();
      }
    },
    async getCates() {
      const res = await fetch(`${port}/categories`);
      const cates = await res.json();
      this.cates = cates;

      this.pageFocus();
    },
    async getBooks(id) {
      let fetchUrl = `${port}/books`;
      const check = typeof id == "number";
      if (check) {
        fetchUrl = `${port}/books/category/${id}`;
      }
      const res = await fetch(fetchUrl);
      const books = await res.json();
      this.books = books;

      if (books.length > 0) {
        this.newBooks = books.slice(
          (this.page - 1) * this.perPage,
          this.page * this.perPage
        );
      } else {
        this.books = books;
      }
    },
    async searchBook() {
      try {
        const res = await fetch(`${port}/books/search/${this.search}`);
        const books = await res.json();
        if (res.status === 200) {
          this.error = "";
          this.newBooks = books;
          this.pageFocus();
        }
        if (res.status === 404 && books.message === "Không tìm thấy sách") {
          this.error = books.message;
        }
        if (this.search === "") {
          this.error = "";
          await this.getBooks();
          this.pageFocus();
        }
      } catch (error) {}
    },
    formatPrice(value) {
      const val = (value / 1).toFixed(0).replace(".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    gotoBook(id) {
      this.$router.push(`/bookdetail/${id}`);
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
    nextPage() {
      if (this.page !== Math.ceil(this.books.length / this.perPage)) {
        this.page += 1;
        if (typeof this.$route.params.id == "string") {
          this.getBooks(parseInt(this.$route.params.id));
        } else {
          this.getBooks();
        }
        if (
          Array.from(document.querySelectorAll(".pages")).find(
            (el) => el.dataset.id == this.page
          )
        ) {
          this.pageFocus();
          document.getElementById("pageNum").removeAttribute("id");
        }
      }
    },
    backPage() {
      if (this.page !== 1) {
        this.page -= 1;
        if (typeof this.$route.params.id == "string") {
          this.getBooks(parseInt(this.$route.params.id));
        } else {
          this.getBooks();
        }
        if (
          Array.from(document.querySelectorAll(".pages")).find(
            (el) => el.dataset.id == this.page
          )
        ) {
          document.getElementById("pageNum").removeAttribute("id");
          this.pageFocus();
        }
      }
    },
    goToPage(numPage) {
      this.page = numPage;
      if (typeof this.$route.params.id == "string") {
        this.getBooks(parseInt(this.$route.params.id));
      } else {
        this.getBooks();
      }
      if (
        Array.from(document.querySelectorAll(".pages")).find(
          (el) => el.dataset.id == this.page
        )
      ) {
        document.getElementById("pageNum").removeAttribute("id");
        this.pageFocus();
      }
    },
  },
  watch: {
    $route(to, from) {
      this.page = 1;
      if (
        Array.from(document.querySelectorAll(".cates")).find(
          (el) => el.dataset.id === `${this.$route.params.id}`
        )
      ) {
        this.cateFocus();
        document.getElementById("cateFocus").removeAttribute("id");
      }
    },
  },
};
</script>

<style>
.cates {
  color: white !important;
}
.cates:hover {
  color: lime !important;
}

.cates:focus {
  color: lime !important;
}

#cateFocus {
  color: lime !important;
}

#pageNum {
  background-color: cyan !important;
}

/* @media screen and (min-width: 1450px) {
  .img-fluid {
    height: 38rem !important;
  }
} */

/* CSS Book */
/* @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800&display=swap"); */
body {
  background-color: #d6d2d2;
  font-family: "Poppins", sans-serif;
  font-weight: 300;
}
.card {
  border: none;
  border-radius: 10px;
  height: 100%;
}
.percent {
  padding: 5px;
  background-color: red;
  border-radius: 5px;
  color: #fff;
  font-size: 14px;
  height: 35px;
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
}
/* .wishlist {
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #eee;
  padding: 10px;
  cursor: pointer;
} */
.img-container {
  position: relative;
}
.img-container .first {
  position: absolute;
  width: 100%;
}
.img-container img {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.img-fluid {
  object-fit: inherit;
  height: 28rem;
  width: 100%;
}
.product-detail-container {
  padding: 10px;
}
.ratings i {
  color: rgb(247, 247, 59) !important;
}
.ratings span {
  color: #333;
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
  height: 25px;
  width: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #dc3545;
  color: #dc3545;
  font-size: 10px;
  border-radius: 50%;
  text-transform: uppercase;
}
label.radio input:checked + span {
  border-color: #dc3545;
  background-color: #dc3545;
  color: #fff;
}
.cartfooter:hover {
  color: blue !important;
  text-decoration: underline;
}
</style>
