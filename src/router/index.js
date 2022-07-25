import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/Home.vue";
import SignUp from "@/components/SignUp.vue";
import SignIn from "@/components/SignIn.vue";
import BookDetail from "@/components/BookDetail.vue";
import Cart from "@/components/Cart.vue";
import CheckOutForm from "@/components/CheckOutForm.vue";
import OrderDetail from "@/components/OrderDetail.vue";
import ProfileUser from "@/components/ProfileUser.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/category/:id",
      name: "category",
      component: Home,
    },
    {
      path: "/bookdetail/:id",
      component: BookDetail,
    },
    {
      path: "/cart",
      component: Cart,
    },
    {
      path: "/checkout",
      component: CheckOutForm,
    },
    {
      path: "/orderdetail/:code",
      component: OrderDetail,
    },
    {
      path: "/signup",
      component: SignUp,
    },
    {
      path: "/signin",
      component: SignIn,
    },
    {
      path: "/account",
      component: ProfileUser,
    },
  ],
});

export default router;
