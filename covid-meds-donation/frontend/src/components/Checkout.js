import React, { Fragment, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';

import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart, removeItemFromCart, createOrder, emptyCart } from '../actions/cartActions'

const Checkout = () => {

  const [email, setEmail] = useState()
  const [address, setAddress] = useState()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { cartItems } = useSelector(state => state.cart)

  const removeCartItemHandler = (id) => {
    dispatch(removeItemFromCart(id))
  }

  const increaseQty = (id, quantity) => {
    const newQty = quantity + 1;

    dispatch(addItemToCart(id, newQty))
  }

  const decreaseQty = (id, quantity) => {

    const newQty = quantity - 1;

    if (newQty <= 0) return;

    dispatch(addItemToCart(id, newQty))

  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createOrder({ cartItems, email, address }))
    dispatch(emptyCart())
    navigate('/ThanksO')
  }

  return (
    <Fragment>
      {cartItems.length === 0 ? <h2 className="ms-5 mt-5">Your Cart is Empty</h2> : (
        <Fragment>
          <div className="container">
            <h2 className="my-5">Your Cart: <b>{cartItems.length} items</b></h2>

            <div className="row d-flex justify-content-between">
              <div className="col-12 col-lg-8">

                {cartItems.map(item => (
                  <Fragment>

                    <div className="cart-item" key={item.medicine}>
                      <div className="row">
                        <div className="col-4 col-lg-3">
                          <img src={item.image} alt="" height={90} width={115} />
                        </div>

                        <div className="col-5 col-lg-3">
                          <p>{item.name}</p>
                        </div>

                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                          <div className='d-flex justify-content-center'>
                            <Link to="#" className="btn btn-danger px-2 py-0 rounded-0" onClick={() => decreaseQty(item.medicine, item.quantity)}>-</Link>
                            <input type="text" className='w-25 py-0 text-center border-0' value={item.quantity} readOnly />
                            <Link to="#" className="btn btn-success px-2 py-0 rounded-0" onClick={() => increaseQty(item.medicine, item.quantity)}>+</Link>
                          </div>
                        </div>

                        <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                          <button className='text-danger border-0' onClick={() => removeCartItemHandler(item.medicine)}>
                            <DeleteIcon />
                          </button>
                        </div>

                      </div>
                    </div>
                    <hr />
                  </Fragment>
                ))}

              </div>

              <div className="col-12 col-lg-3 my-4">
                <form className="shadow-lg p-4" onSubmit={submitHandler}>
                  <h1 className="mb-4">Delivery Address</h1>

                  <div className="form-group">
                    <label htmlFor="name_field">Email</label>
                    <input
                      type="email"
                      id="name_field"
                      className="form-control mb-3"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="price_field">Address</label>
                    <input
                      type="text"
                      id="price_field"
                      className="form-control mb-3"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-block btn-primary mt-3"
                  >
                    Place order
                  </button>

                </form>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Checkout