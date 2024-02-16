import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

import { donateMedicine, clearErrors } from "../actions/medicineActions";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Donate() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [medicine, setMedicine] = useState('');
  const [email, setEmail] = useState('')
  const [dosage, setDosage] = useState('');
  const [expiry, setExpiry] = useState('');
  const [address, setAddress] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(donateMedicine({ email, medicine, expiry, dosage, address }))
    navigate('/ThanksD');
  }

  const { error, success } = useSelector(state => state.donateMedicine);

  useEffect(() => {

    if (error) {
      toast.error(error, {
        position: "top-center",
        theme: "colored"
      })
      dispatch(clearErrors())
    }

    if (success) {
      navigate('/ThanksR');
      toast.success('Donated successfully', {
        position: "top-center",
        theme: "colored"
      })
    }

  }, [dispatch, error, success, navigate])

  return (
    <div className="col-12 col-md-4 mx-auto">
      <>
        <div className="wrapper my-5">
          <form className="shadow-lg p-4" onSubmit={submitHandler}>
            <h1 className="mb-4">Donate</h1>

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
              <label htmlFor="price_field">Medicine</label>
              <input
                type="text"
                id="price_field"
                className="form-control mb-3"
                value={medicine}
                onChange={(e) => setMedicine(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="price_field">Date of Expiry <br /> (DD/MM/YYYY)</label>
              <input
                type="text"
                id="price_field"
                className="form-control mb-3"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="price_field">Dosage</label>
              <input
                type="number"
                id="price_field"
                className="form-control mb-3"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="price_field">Pickup Address</label>
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
              Donate
            </button>

          </form>
        </div>
      </>
    </div>
  );
}

export default Donate;
