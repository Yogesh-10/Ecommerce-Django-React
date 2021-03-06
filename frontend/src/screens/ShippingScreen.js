import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingScreen = ({ history }) => {
	const dispatch = useDispatch()

	const cart = useSelector((state) => state.cart)
	const { shippingAddress } = cart

	//   the values in the usestate comes from the form filled in (from the parameter of saveShippingAddress.. which is passed in as data)
	// to store value in the form fields
	const [address, setAddress] = useState(shippingAddress.address)
	const [city, setCity] = useState(shippingAddress.city)
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
	const [country, setCountry] = useState(shippingAddress.country)

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(saveShippingAddress({ address, city, postalCode, country }))
		history.push('/payment')
	}

	return (
		<FormContainer>
			<CheckoutSteps step2 step1 />
			<h1>Shipping Address</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='address'>
					<Form.Label>Address</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter Address'
						value={address ? address : ''}
						required
						onChange={(e) => setAddress(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='city'>
					<Form.Label>City</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter City'
						value={city ? city : ''}
						required
						onChange={(e) => setCity(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='postalcode'>
					<Form.Label>Postal Code</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter Postal Code'
						value={postalCode ? postalCode : ''}
						required
						onChange={(e) => setPostalCode(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='country'>
					<Form.Label>Country</Form.Label>
					<Form.Control
						type='text'
						placeholder='country'
						value={country ? country : ''}
						required
						onChange={(e) => setCountry(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Button type='submit' variant='primary'>
					Continue
				</Button>
			</Form>
		</FormContainer>
	)
}

export default ShippingScreen
