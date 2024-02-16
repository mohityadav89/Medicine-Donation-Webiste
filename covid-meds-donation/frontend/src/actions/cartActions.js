import {
    ADD_TO_CART,
    REMOVE_ITEM_CART,
    EMPTY_CART,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
} from '../constants/cartConstants'
import axios from 'axios'

export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/medicine/${id}`)

    dispatch({
        type: ADD_TO_CART,
        payload: {
            medicine: data.medicine._id,
            name: data.medicine.medicine,
            image: data.medicine.image,
            quantity
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}

export const removeItemFromCart = (id) => async (dispatch, getState) => {

    dispatch({
        type: REMOVE_ITEM_CART,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}

export const emptyCart = () => async (dispatch, getState) => {

    dispatch({
        type: EMPTY_CART
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}

export const createOrder = (order) => async (dispatch) => {
    try {

        dispatch({ type: CREATE_ORDER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/order/new', order, config)

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}