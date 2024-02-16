import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { authReducer } from './reducers/userReducers'
import { requestMedicineReducer, donateMedicineReducer, medicinesReducer, newMedicineReducer } from './reducers/medicineReducer'
import { cartReducer, newOrderReducer } from './reducers/cartReducer'

const reducer = combineReducers({
    auth: authReducer,
    requestMedicine: requestMedicineReducer,
    donateMedicine: donateMedicineReducer,
    medicines: medicinesReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    newMedicine: newMedicineReducer
})

let initialState = {

}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store