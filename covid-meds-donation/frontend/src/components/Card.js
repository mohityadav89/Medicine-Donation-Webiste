import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { addItemToCart } from '../actions/cartActions'
import { useDispatch } from 'react-redux'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Card = ({ medicine }) => {

  const [quantity, setQuantity] = useState(0)

  const dispatch = useDispatch()

  const increaseQty = () => {
    setQuantity(quantity + 1)
  }

  const decreaseQty = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1)
    }
  }

  const addToCart = () => {
    toast.success("Added to cart", {
      position: "top-center",
      theme: "colored"
    })
    dispatch(addItemToCart(medicine._id, quantity))
  }

  return (
    <div className="col-12 col-md-4">
      <div className="card shadow-lg border-3 p-3">
        <h5 className="card-title">{medicine.medicine}</h5>
        <p className="card-text">{medicine.expiry}</p>
        <img src={medicine.image} className="card-img-top" alt="" height={150} width={50} />
        <div className="card-body mx-auto">
          <div className='d-flex justify-content-center'>
            <Link to="#" className="btn btn-danger px-2 py-0 rounded-0" onClick={decreaseQty}>-</Link>
            <input type="text" className='w-25 py-0 text-center border-0' value={quantity} readOnly />
            <Link to="#" className="btn btn-success px-2 py-0 rounded-0" onClick={increaseQty}>+</Link>
          </div>
          <button type="button" id="cart_btn" className="mt-3 btn btn-primary w-100" onClick={addToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

export default Card