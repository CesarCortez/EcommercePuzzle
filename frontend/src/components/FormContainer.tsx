import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
interface ProductProps {
  children: React.ReactNode;
}
const FormContainer:React.FC<ProductProps> = ({children}) => {
  return (
    <Container>
        <Row className="justify-content-md-center">
            <Col xs={12} md={6}>
                {children}
            </Col>
        </Row>
    </Container>
  )
}

export default FormContainer