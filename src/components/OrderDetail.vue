<template>
  <div
    class="d-flex flex-column justify-content-center align-items-center"
    id="order-heading"
  >
    <div class="text-uppercase">
      <p>Chi tiết đơn hàng</p>
    </div>
    <div class="h4">
      {{ dateFormat(orderDetail.date_pay) }}
    </div>
  </div>
  <div class="wrapper bg-white">
    <div
      v-for="book in cartsInfo"
      :key="book.id"
      class="d-flex justify-content-start align-items-center list py-2"
    >
      <div>
        <b>({{ book.quantity }})</b>
      </div>
      <div class="mx-3">
        <img :src="book.imgPath" :alt="book.name" width="50" />
      </div>
      <div class="order-item">{{ book.name }}</div>
    </div>
    <div class="pt-2 border-bottom mb-3"></div>

    <div class="row border rounded p-1 my-3">
      <div class="col-md-8 py-3">
        <div class="d-flex flex-column align-items start">
          <b>Địa chỉ: </b>
          <span class="text-justify pt-2"
            >{{ orderDetail.address }},
            <span class="text-justify"> {{ orderDetail.ward }}, </span
            ><span class="text-justify"> {{ orderDetail.district }}, </span
            ><span class="text-justify"> {{ orderDetail.province }}</span></span
          >
        </div>
      </div>
      <div class="col-md-4 py-3">
        <div class="d-flex flex-column align-items start">
          <b>Họ tên: {{ orderDetail.name }}</b>
          <b>Số điện thoại: {{ orderDetail.phone }}</b>
        </div>
      </div>
    </div>

    <div class="d-sm-flex justify-content-between rounded my-3 subscriptions">
      <div>Trạng thái: {{ status }}</div>
      <div>
        Tổng tiền: <b> {{ formatPrice(orderDetail.total_amount) }} đ</b>
      </div>
    </div>
  </div>
</template>

<script>
const port = import.meta.env.VITE_HOST;
export default {
  data() {
    return {
      orderCode: null,
      orderDetail: {},
      cartsInfo: [],
      status: "",
    };
  },
  methods: {
    formatPrice(value) {
      const val = (value / 1).toFixed(0).replace(".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    dateFormat(value) {
      const date = new Date(value);
      return date.toLocaleDateString(["vi-VI"], {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    async orderDetailBook() {
      this.orderCode = this.$route.params.code;
      const acCookie = await cookieStore.get("accessToken");
      const rfCookie = await cookieStore.get("refreshToken");
      const accessToken = acCookie.value;
      const refreshToken = rfCookie.value;
      try {
        const res = await fetch(`${port}/bill/${this.orderCode}`, {
          headers: {
            "Content-Type": "application/json",
            "bookstore-access-token": accessToken,
            "bookstore-refresh-token": refreshToken,
          },
        });
        const resData = await res.json();
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
          return await this.orderDetailBook();
        }
        this.orderDetail = resData.bill;
        this.cartsInfo = resData.bookInBill;
        if (this.orderDetail.status !== 0) {
          this.status = "Đơn hàng đã được duyệt";
        } else {
          this.status = "Chờ duyệt đơn hàng";
        }
        console.log(this.orderDetail);
      } catch (error) {}
    },
  },
  beforeMount() {
    this.orderDetailBook();
  },
};
</script>

<style>
#order-heading {
  background-color: #edf4f7;
  position: relative;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  max-width: 800px;
  padding-top: 20px;
  margin: 30px auto 0px;
}

#order-heading .text-uppercase {
  font-size: 0.9rem;
  color: #777;
  font-weight: 600;
}

#order-heading .h4 {
  font-weight: 600;
}

#order-heading .h4 + div p {
  font-size: 0.8rem;
  color: #777;
}

.wrapper {
  padding: 10px 50px 50px;
  max-width: 800px;
  margin: 0px auto 40px;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
}

.price {
  color: #5cb99a;
  font-weight: 700;
}

p.text-justify {
  font-size: 0.9rem;
  margin: 0;
}

.row {
  margin: 0px;
}

.subscriptions {
  border: 1px solid #ddd;
  border-left: 5px solid #ffa500;
  padding: 10px;
}

.subscriptions div {
  font-size: 0.9rem;
}

@media (max-width: 425px) {
  .wrapper {
    padding: 20px;
  }

  body {
    font-size: 0.85rem;
  }

  .subscriptions div {
    padding-left: 5px;
  }

  img + label {
    font-size: 0.75rem;
  }
}
</style>
