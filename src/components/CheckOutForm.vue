<template>
  <div>
    <div class="py-5 text-center">
      <h2>Thanh toán</h2>
    </div>
    <div class="container p-5 w3-animate-right">
      <div class="row">
        <div class="col-md-4 order-md-2 mb-4">
          <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span>Giỏ hàng của bạn</span>
            <span class="badge rounded-circle badge-pill">{{
              carts.totalBookInCart
            }}</span>
          </h4>
          <ul class="list-group mb-3 sticky-top">
            <li
              v-for="book in carts.listBookInCart"
              :key="book.id"
              class="list-group-item d-flex justify-content-between lh-condensed"
            >
              <div class="d-flex">
                <img width="50" :src="book.imgPath" alt="" />
                <h6 style="padding-left: 8px" class="my-0">{{ book.name }}</h6>
                <span>&nbsp({{ book.quantity }})</span>
              </div>
              <span> {{ formatPrice(book.total) }} đ</span>
            </li>

            <li class="list-group-item d-flex justify-content-between bg-light">
              <select v-model="voucher" class="form-select">
                <option value="0">Chọn voucher</option>
                <option
                  :value="si.code + ':' + si.percent"
                  v-for="si in vouchers"
                  :key="si.id"
                >
                  {{ si.code }} - giảm {{ si.percent }}% tổng hóa đơn
                </option>
              </select>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              <span>Phí Ship</span>
              <strong>50.000 đ</strong>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              <span>Tổng tiền</span>
              <strong>{{ formatPrice(totalAmount) }} đ</strong>
            </li>
          </ul>
        </div>
        <div class="col-md-8 order-md-1">
          <h4 class="mb-3">Thông tin giao hàng</h4>
          <form
            method="post"
            action=""
            class="needs-validation"
            @submit.prevent="checkForm"
            novalidate="true"
          >
            <select v-model="id_ShipInfo" class="form-select">
              <option :value="si.id" v-for="si in shipInfo" :key="si.id">
                {{ si.name }} - {{ si.phone }} - {{ si.address }} -
                {{ si.ward }} - {{ si.district }}
              </option>
              <option value="newShipInfo">Thêm địa chỉ mới</option>
            </select>
            <div id="information" style="display: none">
              <div class="mb-3">
                <label for="address">Họ tên</label>
                <div class="input-group">
                  <input
                    v-model="formCheckout.fullName"
                    type="text"
                    class="form-control"
                    id="username"
                    name="fullName"
                    placeholder="VD: Nguyễn Văn A"
                    v-on:blur="checkForm('fullName')"
                  />
                </div>
                <div class="text-danger">
                  {{ error.fullName }}
                </div>
              </div>
              <div class="mb-3">
                <label for="address">Số điện thoại</label>
                <input
                  v-model="formCheckout.phoneNum"
                  type="text"
                  class="form-control"
                  id="phoneNum"
                  placeholder="VD: 0987654321"
                  name="phoneNum"
                  v-on:blur="checkForm('phoneNum')"
                />
                <div class="text-danger">
                  {{ error.phoneNum }}
                </div>
              </div>
              <div class="mb-3">
                <label for="address">Địa chỉ</label>
                <input
                  v-model="formCheckout.address"
                  type="text"
                  class="form-control"
                  id="address"
                  placeholder="VD: Số 8 ngõ 29"
                  name="address"
                  v-on:blur="checkForm('address')"
                />
                <div class="text-danger">
                  {{ error.address }}
                </div>
              </div>
              <div class="row">
                <div class="col-md-4 mb-3">
                  <label for="state">Chọn Tỉnh/Thành phố</label>
                  <div class="addressClick">
                    <select
                      v-model="id_Province"
                      class="form-select"
                      id="province-search"
                    >
                      <option value="">Chọn Tỉnh/Thành phố</option>
                      <option
                        :value="city.id"
                        v-for="city in cities"
                        :key="city.id"
                      >
                        {{ city.name }}
                      </option>
                    </select>
                    <div class="text-danger">
                      {{ error.id_Province }}
                    </div>
                  </div>
                </div>
                <div class="col-md-4 mb-3">
                  <label for="state">Chọn Quận/Huyện</label>
                  <div class="addressClick">
                    <select
                      v-model="id_District"
                      class="form-select"
                      id="district-search"
                      disabled
                    >
                      <option value="">Chọn Quận/Huyện</option>
                      <option
                        :value="district.id"
                        v-for="district in districtes"
                        :key="district.id"
                      >
                        {{ district.name }}
                      </option>
                    </select>
                    <div class="text-danger">
                      {{ error.id_District }}
                    </div>
                  </div>
                </div>
                <div class="col-md-4 mb-3">
                  <label for="state">Xã/Phường</label>
                  <div class="addressClick">
                    <select
                      v-model="id_Ward"
                      class="form-select"
                      id="wards-search"
                      disabled
                    >
                      <option value="">Chọn Xã/Phường</option>
                      <option
                        :value="ward.id"
                        v-for="ward in wards"
                        :key="ward.id"
                      >
                        {{ ward.name }}
                      </option>
                    </select>
                    <div class="text-danger">
                      {{ error.id_Ward }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr class="mb-4" />
            <h4 class="mb-3">Phương thức thanh toán</h4>
            <div class="d-block my-3">
              <div class="custom-control">
                <input
                  name="paymentMethod"
                  type="radio"
                  class="custom-control-input"
                  value="Bank"
                />
                <label class="custom-control-label">&nbsp Chuyển khoản</label>
              </div>
              <div class="BoxBank"></div>
              <div class="custom-control">
                <input
                  name="paymentMethod"
                  type="radio"
                  class="custom-control-input"
                  value="COD"
                  checked
                />
                <label class="custom-control-label"
                  >&nbsp Thanh toán khi nhận hàng</label
                >
              </div>
              <div class="BoxCOD"></div>
            </div>
            <hr class="mb-4" />
            <div class="mb-3">
              <label for="description">Ghi chú</label>
              <textarea
                v-model="description"
                type=""
                class="form-control"
                id="description"
                placeholder="VD: Đóng gói làm quà tặng"
                name="description"
              ></textarea>
            </div>
            <hr class="mb-4" />
            <button class="btn btn-primary btn-lg btn-block" type="submit">
              Đặt hàng
            </button>
          </form>
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
      cities: [],
      districtes: [],
      wards: [],
      shipInfo: [],
      carts: [],
      vouchers: [],
      formCheckout: {
        fullName: "",
        address: "",
        phoneNum: "",
      },
      description: "",
      id_ShipInfo: null,
      id_Province: "",
      old_Id_Province: "",
      id_District: "",
      old_Id_District: "",
      id_Ward: "",
      voucher: "0",
      oldVoucher: "",
      voucherCode: null,
      totalAmount: null,
      error: {},
    };
  },
  methods: {
    formatPrice(value) {
      const val = (value / 1).toFixed(0).replace(".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    // ----> GEt district <----
    async getDistrict() {
      try {
        const res = await fetch(`${port}/district`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id_province: this.id_Province }),
        });
        this.districtes = await res.json();
        this.old_Id_Province = this.id_Province;
      } catch (error) {}
    },

    // ----> GET Xã Phường <----
    async getWards() {
      try {
        const res = await fetch(`${port}/wards`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id_district: this.id_District }),
        });
        this.wards = await res.json();
        this.old_Id_District = this.id_District;
      } catch (error) {}
    },

    // ----> CheckForm validate <----
    async checkForm(key) {
      switch (key) {
        case "fullName":
          delete this.error.fullName;
          if (!this.formCheckout.fullName) {
            this.error.fullName = "Yêu cầu bắt buộc";
          }
          if (this.formCheckout.fullName.length < 3 && !this.error.fullName) {
            this.error.fullName = "Tên phải trên 3 ký tự";
          }
          if (this.formCheckout.fullName.length > 30 && !this.error.fullName) {
            this.error.fullName = "Tên phải dưới 30 ký tự";
          }
          break;
        case "address":
          delete this.error.address;
          if (!this.formCheckout.address) {
            this.error.address = "Yêu cầu bắt buộc";
          }
          break;
        case "phoneNum":
          delete this.error.phoneNum;
          if (!this.formCheckout.phoneNum) {
            this.error.phoneNum = "Yêu cầu bắt buộc";
          }
          if (!this.error.phoneNum) {
            const regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
            console.log(this.formCheckout.phoneNum);
            const result = regex.test(this.formCheckout.phoneNum);
            console.log(result);
            if (result == false) {
              this.error.phoneNum = "Yêu cầu phải là số điện thoại";
            }
          }
          break;
        default:
          this.error = {};
          if (!this.formCheckout.fullName) {
            this.error.fullName = "Yêu cầu bắt buộc";
          }
          if (this.formCheckout.fullName.length < 3 && !this.error.fullName) {
            this.error.fullName = "Tên phải trên 3 ký tự";
          }
          if (this.formCheckout.fullName.length > 30 && !this.error.fullName) {
            this.error.fullName = "Tên phải dưới 30 ký tự";
          }
          if (!this.formCheckout.address) {
            this.error.address = "Yêu cầu bắt buộc";
          }
          if (!this.formCheckout.phoneNum) {
            this.error.phoneNum = "Yêu cầu bắt buộc";
          }
          if (!this.error.phoneNum) {
            const regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
            console.log(this.formCheckout.phoneNum);
            const result = regex.test(this.formCheckout.phoneNum);
            console.log(result);
            if (result == false) {
              this.error.phoneNum = "Yêu cầu phải là số điện thoại";
            }
          }
          if (!this.id_Province) {
            this.error.id_Province = "Yêu cầu bắt buộc";
          }
          if (!this.id_District && !this.error.id_Province) {
            this.error.id_District = "Yêu cầu bắt buộc";
          }
          if (
            !this.id_Ward &&
            !this.error.id_District &&
            !this.error.id_Province
          ) {
            this.error.id_Ward = "Yêu cầu bắt buộc";
          }
          const check = Object.keys(this.error);
          if (check.length === 0 || this.id_ShipInfo !== "newShipInfo") {
            await this.checkout();
          }
          break;
      }
    },

    // ----> POST form checkout <----
    async checkout() {
      let resData;
      const acCookie = await cookieStore.get("accessToken");
      const rfCookie = await cookieStore.get("refreshToken");

      if (this.id_ShipInfo === "newShipInfo") {
        try {
          const accessToken = acCookie.value;
          const refreshToken = rfCookie.value;
          const res = await fetch(`${port}/shipInfo`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "bookstore-access-token": accessToken,
              "bookstore-refresh-token": refreshToken,
            },
            body: JSON.stringify({
              name: this.formCheckout.fullName,
              phone: this.formCheckout.phoneNum,
              address: this.formCheckout.address,
              id_wards: this.id_Ward,
            }),
          });
          resData = await res.json();
          this.id_ShipInfo = resData.id_shipInfo;
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
            return await this.checkout();
          }
        } catch (error) {}
      }

      try {
        const accessToken = this.acCookie.value;
        const refreshToken = this.rfCookie.value;
        const res = await fetch(`${port}/checkout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "bookstore-access-token": accessToken,
            "bookstore-refresh-token": refreshToken,
          },
          body: JSON.stringify({
            totalAmount: this.carts.totalBill,
            id_shipInfo: this.id_ShipInfo,
            voucher_code: this.voucherCode,
            shipFee: 50000,
            description: this.description,
          }),
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
          return await this.getShipInfo();
        }
        this.$router.push(`/orderdetail/${resData.billCode}`);
      } catch (error) {
        console.log(error);
      }
    },

    // ----> GET shipInfo <----
    async getShipInfo() {
      let resData;
      const acCookie = await cookieStore.get("accessToken");
      const rfCookie = await cookieStore.get("refreshToken");
      try {
        const accessToken = acCookie.value;
        const refreshToken = rfCookie.value;
        const res = await fetch(`${port}/shipInfo`, {
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
          return await this.getShipInfo();
        }
        this.shipInfo = resData;
        this.id_ShipInfo = resData[resData.length - 1].id;
      } catch (error) {}
    },

    // ----> GET cart <----
    async getCart() {
      let resData;
      const acCookie = await cookieStore.get("accessToken");
      const rfCookie = await cookieStore.get("refreshToken");
      try {
        const accessToken = acCookie.value;
        const refreshToken = rfCookie.value;
        const res = await fetch(`${port}/cart`, {
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
        this.totalAmount = resData.totalBill + 50000;
        this.carts = resData;
      } catch (error) {}
    },

    // ----> GET voucher <----
    async getVoucher() {
      let resData;
      const acCookie = await cookieStore.get("accessToken");
      const rfCookie = await cookieStore.get("refreshToken");
      try {
        const accessToken = acCookie.value;
        const refreshToken = rfCookie.value;
        const res = await fetch(`${port}/voucher`, {
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
        this.vouchers = resData;
      } catch (error) {}
    },
  },

  async beforeMount() {
    try {
      const acCookie = await cookieStore.get("accessToken");
      const rfCookie = await cookieStore.get("refreshToken");

      if (acCookie === null && rfCookie === null) {
        this.$router.push("/signin");
      } else {
        this.$router.push("/checkout");
        await this.getShipInfo();
        await this.getCart();
        await this.getVoucher();

        // ----> GET province <----
        const resProvince = await fetch(`${port}/province`);
        this.cities = await resProvince.json();
      }
    } catch (error) {}
  },

  async updated() {
    // search
    dselect(document.querySelector("#province-search"), {
      search: true,
    });
    if (this.voucher !== "0" && this.voucher !== this.oldVoucher) {
      const arr = this.voucher.split(":");
      this.voucherCode = arr[0];
      this.totalAmount -= (this.totalAmount * parseInt(arr[1], 10)) / 100;
      this.oldVoucher = this.voucher;
    }
    if (this.voucher === "0" && this.voucher !== this.oldVoucher) {
      this.voucherCode = null;
      this.totalAmount = this.carts.totalBill + 50000;
      this.oldVoucher = this.voucher;
    }
    if (this.id_ShipInfo !== "newShipInfo") {
      delete this.error.fullName;
      delete this.error.address;
      delete this.error.phoneNum;
      delete this.error.id_Province;
      document.querySelector("#information").style.display = "none";
    } else {
      document.querySelector("#information").style.display = "block";
    }
    if (this.old_Id_Province != this.id_Province) {
      await this.getDistrict();
      $("#district-search").removeAttr("disabled");
      dselect(document.querySelector("#district-search"), {
        search: true,
      });
    }
    if (this.old_Id_District != this.id_District) {
      await this.getWards();
      $("#wards-search").removeAttr("disabled");
      dselect(document.querySelector("#wards-search"), {
        search: true,
      });
    }
    $(document).ready(function () {
      $(".addressClick").click(function () {
        $(".d-flex").children(".form-control").focus();
      });
      $('input[type="radio"]').click(function () {
        if ($(this).attr("value") == "COD") {
          $(".BoxBank").empty();
          $(".BoxCOD").html(
            `<div 
              style='width: 22rem; height: auto; background-color: rgba(255, 255, 255, 0.986); 
              padding: 8px; margin:  8px 0 8px 1rem; border-radius: 5px'>
              <p>Quý khách chỉ phải thanh toán khi nhận hàng</p>
            </div>`
          );
        }
        if ($(this).attr("value") == "Bank") {
          $(".BoxCOD").empty();
          $(".BoxBank")
            .html(`<div class='w3-animate-bottom' style='width: 20rem;
            height: auto;
            background-color: rgba(255, 255, 255, 0.986); padding: 8px; margin:  8px 0 8px 1rem; border-radius: 5px'>
            <p>STK: 0123890132</p>
            <p>CTK: VIETIS</p>
            <p>NGÂN HÀNG: VIETIS Bank</p></div>`);
        }
      });
      $('input[type="radio"]').trigger("click");
    });
  },
};
</script>

<style></style>
