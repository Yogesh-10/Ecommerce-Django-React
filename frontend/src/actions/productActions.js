import axios from 'axios'
import {
	PRODUCT_CREATE_FAIL,
	PRODUCT_CREATE_REQUEST,
	PRODUCT_CREATE_SUCCESS,
	PRODUCT_DELETE_FAIL,
	PRODUCT_DELETE_REQUEST,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
} from '../constants/productConstants'

export const listProducts = () => async (dispatch) => {
	try {
		dispatch({
			type: PRODUCT_LIST_REQUEST,
		})

		const { data } = await axios.get('/api/products')

		dispatch({
			type: PRODUCT_LIST_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: PRODUCT_LIST_FAIL,
			payload:
				error.response && error.response.data.detail
					? error.response.data.detail
					: error.message,
		})
	}
}

export const listProductDetails = (id) => async (dispatch) => {
	try {
		dispatch({
			type: PRODUCT_DETAILS_REQUEST,
		})

		const { data } = await axios.get(`/api/products/${id}`)

		dispatch({
			type: PRODUCT_DETAILS_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: PRODUCT_DETAILS_FAIL,
			payload:
				error.response && error.response.data.detail
					? error.response.data.detail
					: error.message,
		})
	}
}

export const deleteProduct = (id) => async (dispatch, getState) => {
	// no need to pass anything in paramter bcoz it knows who we are by tokens
	try {
		dispatch({
			type: PRODUCT_DELETE_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		await axios.delete(`/api/products/delete/${id}`, config)

		dispatch({
			type: PRODUCT_DELETE_SUCCESS,
		})
	} catch (error) {
		const message =
			error.response && error.response.data.detail
				? error.response.data.detail
				: error.message
		dispatch({
			type: PRODUCT_DELETE_FAIL,
			payload: message,
		})
	}
}

export const createProduct = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: PRODUCT_CREATE_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await axios.post(`/api/products/create`, {}, config) // second argument is empty object because we are making post request and no sending data here

		dispatch({
			type: PRODUCT_CREATE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		const message =
			error.response && error.response.data.detail
				? error.response.data.detail
				: error.message
		dispatch({
			type: PRODUCT_CREATE_FAIL,
			payload: message,
		})
	}
}
