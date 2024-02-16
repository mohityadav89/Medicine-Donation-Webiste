import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

import { newMedicine, clearErrors } from "../actions/medicineActions";
import { NEW_MEDICINE_RESET } from '../constants/medicineConstants'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateMedicine() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [medicine, setMedicine] = useState('');
    const [image, setImage] = useState('');
    const [expiry, setExpiry] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(newMedicine({ medicine, expiry, image }))
        navigate('/');
    }

    const { error, success } = useSelector(state => state.newMedicine);

    useEffect(() => {

        if (error) {
            toast.error(error, {
                position: "top-center",
                theme: "colored"
            })
            dispatch(clearErrors())
        }

        if (success) {
            navigate('/');
            toast.success('Medicine created successfully', {
                position: "top-center",
                theme: "colored"
            })
            dispatch({ type: NEW_MEDICINE_RESET })
        }

    }, [dispatch, error, success, navigate])

    return (
        <div className="col-12 col-md-4 mx-auto">
            <>
                <div className="wrapper my-5">
                    <form className="shadow-lg p-4" onSubmit={submitHandler}>
                        <h1 className="mb-4">Create</h1>

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
                            <label htmlFor="price_field">Image Url</label>
                            <input
                                type="text"
                                id="price_field"
                                className="form-control mb-3"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-block btn-primary mt-3"
                        >
                            Create
                        </button>

                    </form>
                </div>
            </>
        </div>
    );
}

export default CreateMedicine
