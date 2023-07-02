import React from 'react'
import { CatProps } from '../pages/home'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'

const CatDisplay = (props: CatProps) => {
    const { showCats } = props
    if (props.showCats.length === 0) {
        return <div> No Cats Available </div>
    } else {
        return (
            <Container>
                <Row>
                    {showCats.map(cat => {
                        return (
                            <Col key={cat.id} sm={12} md={6} lg={3}>
                                <Card style={{ width: "18rem" }}>
                                    <Card.Img variant="top" src={cat.url} />
                                    <Card.Body className="text-center">
                                        <Button href={cat.id}> View Details </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        )
    }
  
}

export default CatDisplay