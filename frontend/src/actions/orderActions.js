import axios from 'axios'
import { CART_CLEAR_ITEMS } from '../constants/cartConstants'
import {
	ORDER_CREATE_FAIL,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_DETAILS_FAIL,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_PAY_FAIL,
	ORDER_PAY_REQUEST,
	ORDER_PAY_SUCCESS,
} from '../constants/orderConstants'

export const createOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_CREATE_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await axios.post(`/api/orders/add`, order, config)

		dispatch({
			type: ORDER_CREATE_SUCCESS,
			payload: data,
		})

		dispatch({
			type: CART_CLEAR_ITEMS,
			payload: data,
		})

		localStorage.removeItem('cartItems')
	} catch (error) {
		const message =
			error.response && error.response.data.detail
				? error.response.data.detail
				: error.message
		dispatch({
			type: ORDER_CREATE_FAIL,
			payload: message,
		})
	}
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_DETAILS_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await axios.get(`/api/orders/${id}`, config) // api/orders/:id.. in which the id is which that is passed in the paramter above

		dispatch({
			type: ORDER_DETAILS_SUCCESS,
			payload: data,
		})
	} catch (error) {
		const message =
			error.response && error.response.data.detail
				? error.response.data.detail
				: error.message
		dispatch({
			type: ORDER_DETAILS_FAIL,
			payload: message,
		})
	}
}

export const payOrder = (orderID, paymentResult) => async (
	dispatch,
	getState
) => {
	// orderID comes from the database (order we created) and paymentResult from paypal api ..(we can name anything in the parameters we want)
	// order is whole object, where as objectID is only the id from the whole order object
	try {
		dispatch({
			type: ORDER_PAY_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await axios.put(
			`/api/orders/${orderID}/pay`,
			paymentResult,
			config
		)

		dispatch({
			type: ORDER_PAY_SUCCESS,
			payload: data,
		})
	} catch (error) {
		const message =
			error.response && error.response.data.detail
				? error.response.data.detail
				: error.message
		dispatch({
			type: ORDER_PAY_FAIL,
			payload: message,
		})
	}
}
