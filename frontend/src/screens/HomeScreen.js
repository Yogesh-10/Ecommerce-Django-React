import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import { listProducts } from '../actions/productActions'
import Product from '../components/Product'

const HomeScreen = () => {
	const dispatch = useDispatch()

	const productList = useSelector((state) => state.productList)

	const { products, loading, error } = productList

	useEffect(() => {
		dispatch(listProducts())
	}, [])

	return (
		<div>
			<h1>Latest Products</h1>
			{loading ? (
				<h1>loading...</h1>
			) : error ? (
				<h2>{error}</h2>
			) : (
				<Row>
					{products.map((product) => (
						<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
							<Product product={product} />
						</Col>
					))}
				</Row>
			)}
		</div>
	)
}

export default HomeScreen
