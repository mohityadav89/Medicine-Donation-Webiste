import {
    REQUEST_MEDICINE_REQUEST,
    REQUEST_MEDICINE_SUCCESS,
    REQUEST_MEDICINE_FAIL,
    DONATE_MEDICINE_REQUEST,
    DONATE_MEDICINE_SUCCESS,
    DONATE_MEDICINE_FAIL,
    ALL_MEDICINES_REQUEST,
    ALL_MEDICINES_SUCCESS,
    ALL_MEDICINES_FAIL,
    NEW_MEDICINE_REQUEST,
    NEW_MEDICINE_SUCCESS,
    NEW_MEDICINE_FAIL,
    CLEAR_ERRORS
} from '../constants/medicineConstants'

import axios from 'axios'

export const getMedicines = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_MEDICINES_REQUEST })

        const { data } = await axios.get('/medicines')

        dispatch({
            type: ALL_MEDICINES_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_MEDICINES_FAIL,
            payload: error.response.data.message
        })
    }
}

export const requestMedicine = (productData) => async (dispatch) => {
    try {
        dispatch({ type: REQUEST_MEDICINE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/request`, productData, config)

        dispatch({
            type: REQUEST_MEDICINE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: REQUEST_MEDICINE_FAIL,
            payload: error.response.data.message
        })
    }
}

export const donateMedicine = (productData) => async (dispatch) => {
    try {
        dispatch({ type: DONATE_MEDICINE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/donate`, productData, config)

        dispatch({
            type: DONATE_MEDICINE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: DONATE_MEDICINE_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newMedicine = (productData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_MEDICINE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/medicine/new`, productData, config)

        dispatch({
            type: NEW_MEDICINE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_MEDICINE_FAIL,
            payload: error.response.data.message
        })
    }
}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}