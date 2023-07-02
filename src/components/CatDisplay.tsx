import React from 'react'
import { CatImage } from '../contexts/CatContext'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'

export type CatProps = {
    showCats: CatImage[],
    breed: string,
    getMoreCats: (e:any) => void,
    showMore: boolean
}

const CatDisplay = (props: CatProps) => {
    const { showCats, getMoreCats, showMore } = props
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
                { showMore && <Button onClick={getMoreCats}> Load More </Button> }
            </Container>
        )
    }
  
}

export default CatDisplay