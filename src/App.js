import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Private from "./components/routes/Private";
import Forgotpassword from "./pages/Auth/Forgotpassword";
import Adminroute from "./components/routes/Adminroute";
import Admindashboard from "./pages/Admin/Admindashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import UserDashboard from "./user/UserDashboard";
import Order from "./user/Order";
import Profile from "./user/Profile";
import Products from "./pages/Admin/Products";
import Updateproduct from "./pages/Admin/Updateproduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/categories" element={<Categories />} />
        <Route exact path="/category/:slug" element={<CategoryProduct />} />
        <Route
          exact
          path="/product-details/:slug"
          element={<ProductDetails />}
        />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/policy" element={<Policy />} />
        <Route exact path="/register" element={<Register />} />

        <Route exact path="/dashboard" element={<Private />}>
          <Route path="user" element={<UserDashboard />} />
          <Route exact path="user/orders" element={<Order />} />
          <Route exact path="user/profile" element={<Profile />} />
        </Route>
        <Route exact path="/dashboard" element={<Adminroute />}>
          <Route exact path="admin" element={<Admindashboard />} />
          <Route
            exact
            path="admin/create-category"
            element={<CreateCategory />}
          />
          <Route
            exact
            path="admin/create-product"
            element={<CreateProduct />}
          />
          <Route exact path="admin/products" element={<Products />} />
          <Route exact path="admin/product/:slug" element={<Updateproduct />} />
          <Route exact path="admin/users" element={<Users />} />
        </Route>
        <Route exact path="/userlogin" element={<Login />} />
        <Route exact path="/forgot-password" element={<Forgotpassword />} />
        <Route exact path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
