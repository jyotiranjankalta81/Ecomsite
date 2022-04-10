import './App.css';
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer.js"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import WebFont from "webfontloader";
import React from 'react';
import Home from "./component/Home/Home.js"
import ProductDetails from "./component/Product/ProductDetails"
import Products from "./component/Product/Products.js"
import Search from "./component/Product/Search.js"
import LoginSignup from './component/User/LoginSignup';
import store from "./store"
import { loadUser } from './actions/userAction';
import UserOptions from "./component/layout/Header/UserOptions.js"
import Profile from "./component/User/Profile.js"
import { useSelector } from "react-redux"
// import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js"
import Cart from "./component/Cart/Cart";



function App() {

  const { isAuthenticated, user } = useSelector(state => state.user);
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Drold Sans", "chilanka"],
      },
    });
    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        {/* <Route exact path='/account' element={<ProtectedRoute />}> */}
        <Route exact path="/account" element={!isAuthenticated ? <Navigate to="/login" /> : <Profile />} />
        {/* </Route> */}
        {/* <Route exact path='/me/update' element={<ProtectedRoute />}> */}
        <Route exact path="/me/update" element={!isAuthenticated ? <Navigate to="/login" /> : <UpdateProfile />} />
        {/* </Route> */}
        {/* <Route exact path='/password/update' element={<ProtectedRoute />}> */}
        <Route exact path="/password/update" element={!isAuthenticated ? <Navigate to="/login" /> : <UpdatePassword />} />
        {/* </Route> */}
        {/* <ProtectedRoute exact path="/account" element={<Profile />} />
        <ProtectedRoute exact path="/me/update" element={<UpdateProfile />} />
        <ProtectedRoute exact path="/password/update" element={<UpdatePassword />} /> */}
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route exact path="/password/reset/:token" element={<ResetPassword />} />
        <Route exact path="/cart" component={Cart} />

        <Route exact path="/search" element={<Search />} />
        <Route exact path="/login" element={<LoginSignup />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;




{/* <PrivateRoute exact isLoggedIn={isLoggedIn} path="/settings" component={Settings} />
<PrivateRoute
  exact
  isLoggedIn={isLoggedIn}
  path="/settings"
  component={Settings}
/>
<Route path="settings" element={<CustomWrapper isLoggedIn={isLoggedIn} />} >
  <Route path="settings" element={<Settings />} />
</Route> */}