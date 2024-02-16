import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

import { requestMedicine, clearErrors } from "../actions/medicineActions";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Request() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [medicine, setMedicine] = useState('');
  const [email, setEmail] = useState('')
  const [dosage, setDosage] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(requestMedicine({ email, medicine, dosage }))
    navigate('/ThanksR');
  }

  const { error, success } = useSelector(state => state.requestMedicine);

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
      toast.success('Request received successfully', {
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
            <h1 className="mb-4">Request</h1>

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


            <button
              type="submit"
              className="btn btn-block btn-primary mt-3"
            >
              Request
            </button>

          </form>
        </div>
      </>
    </div>
  );
}

export default Request;
