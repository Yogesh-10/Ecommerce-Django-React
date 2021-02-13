import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'

const SearchBox = () => {
	const [keyword, setKeyword] = useState('')
	let history = useHistory()

	const submitHandler = (e) => {
		e.preventDefault()
		if (keyword) {
			history.push(`/?keyword=${keyword}&page=1`)
		} else {
			history.push(history.push(history.location.pathname))
		}
	}

	return (
		<div>
			<Form onSubmit={submitHandler} inline>
				<Form.Control
					type='text'
					name='q'
					onChange={(e) => setKeyword(e.target.value)}
					placeholder='Search products...'
					className='mr sm-2 ml sm-5'
				></Form.Control>
				<Button type='submit' variant='outline-secondary' className='p-2 ml-2'>
					Search
				</Button>
			</Form>
		</div>
	)
}

export default SearchBox
