import { Col, Container, Row } from 'react-bootstrap';

export const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <footer>
        <Container>
            <Row>
                <Col className='text-center py-3'>
                <p>Potti Kada &copy; {currentYear}</p>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}
