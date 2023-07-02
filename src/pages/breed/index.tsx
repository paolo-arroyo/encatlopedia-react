import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CatData } from '../home'
import { Container, Card, Button } from 'react-bootstrap'
import axios from 'axios'

const Breed = () => {
    const { id } = useParams()
    const [ loading, setLoading ] = useState(false)
    const [ data, setData ] = useState<CatData>()

    let catUrl = `https://api.thecatapi.com/v1/images/${id}`

    const CatHook = () => {
        setLoading(true)
        try {
            axios.get(catUrl).then(response => {
                setData(response.data)
                setLoading(false)
            })
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    useEffect(CatHook,[catUrl])
    console.log(data)
  return (
    <Container>
        {loading && <h3 style={{textAlign: "center"}}> Loading ... </h3>}
        {!loading &&
            <Card style={{width: "50vw", margin: "auto"}}>
                <Card.Header> <Button href={`../?breed=${data?.breeds[0].id}`}>Back</Button></Card.Header>
                <Card.Img variant='top' src={data?.url} />
                <Card.Body>
                    <Card.Title style={{fontSize: "2rem"}}> {data?.breeds[0].name} </Card.Title>
                    <Card.Title> Origin: {data?.breeds[0].origin}</Card.Title>
                    <Card.Text> {data?.breeds[0].description} </Card.Text>
                </Card.Body>
            </Card>
        }
    </Container>
  )
}

export default Breed