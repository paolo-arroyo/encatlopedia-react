import { CatImage } from '../contexts/CatContext'
import { Col, Card } from 'react-bootstrap'
import { Button } from './Button'
import { Wrapper } from './Container'
import { Row } from './Row'

export type CatProps = {
    showCats: CatImage[],
    breed: string,
    getMoreCats: (e:any) => void,
    showMore: boolean,
    loading: boolean
}

const CatDisplay = (props: CatProps) => {
    const { showCats, getMoreCats, showMore, loading } = props
    if (props.showCats.length === 0) {
        return <Wrapper style={{ marginTop: "20px" }}> No Cats Available </Wrapper>
    } else if (loading) {
        return <Wrapper style={{ marginTop: "20px"}}> Loading images ... </Wrapper>
    } else {
        return (
            <Wrapper>
                <Row>
                    {showCats.map(cat => {
                        return (
                            <Col key={cat.id} sm={12} md={6} lg={3}>
                                <Card style={{ width: "18rem", marginTop: "20px"}}>
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
            </Wrapper>
        )
    }
  
}

export default CatDisplay