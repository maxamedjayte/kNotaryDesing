import React from "react"
import { Redirect } from "react-router-dom"

// Profile

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

// Dashboard
import Dashboard from "../pages/Dashboard/index"
import XogtaBoosaska from "pages/Boosaska/XogtaBoosaska"
import XogtaDiiwaangalintaMacamiisha from "pages/Clients/XogtaDiiwaangalintaMacamiisha"
import DiiwaangalintaBoosaskaCopy from "pages/Boosaska/DiiwaangalintaBoosaska"
import XogtaMacaamiilka from "pages/Clients/XogtaMacaamiilka"
import DhaqdhaqaaqaBoosaska from "pages/Boosaska/DhaqdhaqaaqaBoosaska"

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },

  // //profile
  { path: "/diiwaangalinta-boosaska", component: DiiwaangalintaBoosaskaCopy },
  { path: "/xogta-boosaska", component: XogtaBoosaska },
  { path: "/dhaqdhaqaaqa-boosaska", component: DhaqdhaqaaqaBoosaska },
  { path: "/xogta-diiwaangalinta-macaamiisha", component: XogtaDiiwaangalintaMacamiisha },
  { path: "/xogta-macaamiilka/:id", component: XogtaMacaamiilka },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
]

export { publicRoutes, authProtectedRoutes }
