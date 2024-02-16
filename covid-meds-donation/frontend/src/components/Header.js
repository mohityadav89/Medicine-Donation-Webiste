import React from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../actions/userActions'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Link } from "react-router-dom";

function Header() {

  const dispatch = useDispatch()

  const { user, loading } = useSelector(state => state.auth)
  const { cartItems } = useSelector(state => state.cart)

  const logoutHandler = () => {
    dispatch(logout())
    toast.success("Logged out successfully", {
      position: "top-center",
      theme: "colored"
    })
  }

  return (
    <div className="navbar navbar-color p-3">
      <Link className="link ms-3 text-white" to="/">
        Home
      </Link>

      <div>
        <Link className="link text-white mx-3" to="/request">
          Request
        </Link>
        <Link className="link text-white mx-3" to="/donate">
          Donate
        </Link>
        {user ? (
          <Link className="link text-white mx-3" to="/" onClick={logoutHandler}>
            Logout
          </Link>
        ) : !loading && <Link to="/login" className="link text-white mx-3">Login</Link>}
        <Link className="link text-white mx-3" to="/checkout">
          <ShoppingCartIcon />
          <span>
            {cartItems ? cartItems.length : 0}
          </span>
        </Link>
      </div>
    </div>
  );
}

export default Header;
