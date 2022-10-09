import { createApp } from "vue";
import "./assets/style.css";
// import "./css/dselect.css";
// import "./lib/animate/animate.min.css";
// import "./lib/owlcarousel/assets/owl.carousel.min.css";
// import "./lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css";
import "./assets/handlecss.js";
// import "./js/dselect.js";
// import "./lib/wow/wow.min.js";
// import "./lib/easing/easing.min.js";
// import "./lib/waypoints/waypoints.min.js";
// import "./lib/counterup/counterup.min.js";
// import "./lib/owlcarousel/owl.carousel.min.js";
// import "./lib/tempusdominus/js/moment.min.js";
// import "./lib/tempusdominus/js/moment-timezone.min.js";
// import "./lib/tempusdominus/js/tempusdominus-bootstrap-4.min.js";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(router);

app.mount("#app");
