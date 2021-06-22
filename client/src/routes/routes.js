import Admin from "../pages/Admin"
import Auth from "../pages/Auth"
import Basket from "../pages/Basket"
import ClothPage from "../pages/ClothePage"
import Shop from "../pages/Shop"
import { ADMIN_ROUTE, BASKET_ROUTE, CLOTHE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/const"

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    component: Admin
  },
  {
    path: BASKET_ROUTE,
    component: Basket
  },
]

export const publicRoutes = [
  {
    path: SHOP_ROUTE,
    component: Shop
  },
  {
    path: LOGIN_ROUTE,
    component: Auth
  },
  {
    path: REGISTRATION_ROUTE,
    component: Auth
  },
  {
    path: CLOTHE_ROUTE + '/:id',
    component: ClothPage
  },
]