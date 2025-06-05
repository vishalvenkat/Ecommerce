import { Footer } from './Components/Footer.tsx'
import { Header } from './Components/Header.tsx'
import { Container } from 'react-bootstrap'
import { HomeScreen } from './Screens/HomeScreen.tsx'

export const App = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <HomeScreen />
        </Container>
      </main>
      <Footer />
    </>
  )
}