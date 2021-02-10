import { Container } from 'react-bootstrap'
import Footer from './components/Footer'
import Header from './components/Header'

const App = () => {
	return (
		<div className='App'>
			<Header />
			<main>
				<Container>My App</Container>
			</main>
			<Footer />
		</div>
	)
}

export default App
