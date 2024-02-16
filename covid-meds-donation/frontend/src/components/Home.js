import React, { useEffect } from "react";
import Card from "./Card.js";
import { getMedicines } from '../actions/medicineActions'
import Loader from './Loader'
import { useDispatch, useSelector } from 'react-redux'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {

  const dispatch = useDispatch()

  const { loading, medicines, error } = useSelector(state => state.medicines)

  useEffect(() => {

    if (error) {
      toast.error(error, {
        position: "top-center",
        theme: "colored"
      })
    }

    dispatch(getMedicines())

  }, [dispatch, error])

  return (
    <>
      {loading ? <Loader /> : (
        <>
          <div className="home">
            <div className="home__container">
              <img
                className="home__image"
                src="https://imgix.bustle.com/uploads/image/2019/5/2/ffa82ad4-937e-412c-9bfd-33cb9252e88e-instagram-donate.jpg"
                alt="home_image"
              />
              <div className="container mt-5">
                <h1 className="mb-4">Medicines</h1>
                <div className="row g-5">
                  {medicines && medicines.map(medicine => (
                    <Card key={medicine._id} medicine={medicine} />
                  ))}

                </div>
              </div>
            </div>
          </div>
        </>
      )
      }
    </>
  )
}

export default Home;
