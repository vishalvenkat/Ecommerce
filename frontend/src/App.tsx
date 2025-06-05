import { Header } from './Components/Header.tsx'
import { Container } from 'react-bootstrap'

export const App = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          Ecommerce Webpage
        </Container>
      </main>
    </>
  )
}