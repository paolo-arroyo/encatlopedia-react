import { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Card } from 'react-bootstrap'
import { Back } from '../../components/Button'
import { CatContext } from '../../contexts/CatContext'
import axios from 'axios'

const Breed = () => {
    const { id } = useParams()
    const {
        loading, setLoading,
        catData, setCatData
    } = useContext(CatContext)
    let catUrl = `https://api.thecatapi.com/v1/images/${id}`

    useEffect(() => {
        setLoading?.(true)
        try {
            axios.get(catUrl).then(response => {
                setCatData?.(response.data)
                setLoading?.(false)
            })
        } catch (error) {
            console.log(error)
            setLoading?.(false)
        }
    },[catUrl, setCatData, setLoading])

  return (
    <Container>
        {loading && <h3 style={{textAlign: "center"}}> Loading ... </h3>}
        {!loading && catData &&
            <Card style={{width: "50vw", margin: "20px auto"}}>
                <Card.Header> <Back href={`../?breed=${catData?.breeds[0]?.id}`}>← Back</Back></Card.Header>
                <Card.Img variant='top' src={catData?.url} />
                <Card.Body>
                    <Card.Title style={{fontSize: "2rem"}}> {catData?.breeds[0]?.name} </Card.Title>
                    <Card.Title> Origin: {catData?.breeds[0]?.origin}</Card.Title>
                    <Card.Title style={{fontSize: "1rem"}}> {catData?.breeds[0]?.temperament}</Card.Title>
                    <Card.Text> {catData?.breeds[0]?.description} </Card.Text>
                </Card.Body>
            </Card>
        }
    </Container>
  )
}

export default Breed
