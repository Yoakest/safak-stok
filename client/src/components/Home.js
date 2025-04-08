import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function Home() {
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Hoşgeldiniz!</Card.Title>
              <Card.Text>
                React ve Bootstrap ile geliştirilmiş bir örnek uygulamaya hoş geldiniz. Burada farklı özellikleri keşfedebilirsiniz.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
