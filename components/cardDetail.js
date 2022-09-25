import React from 'react';
import {
    Button,
    Card,
    Col,
    Row,
    ProgressBar
} from 'react-bootstrap';
import { useRouter } from 'next/router';

export default function cardList ({item, color}) {
    const router = useRouter();
    
    return(
        <Card style={{ width: '25rem', padding: '5px', margin: '5px' }}>
            <Card.Header style={{backgroundColor : color.bottomColor, height:'4rem'}}/>
            <Card.Body style={{backgroundColor : color.bodyColor || 'red'}}>
                <Card.Img variant="top" src={item.image} />
                <Card.Title className="text-center mb-5 fs-1">{item.name.toUpperCase()}</Card.Title>
                <Row>
                    <Col className="text-center">
                        <p className="fw-bold">Habilidades</p>
                        {item.abilities.map((abilitie, index) => (
                            <p key={index} className="text-capitalize"> - {abilitie.ability.name}</p>
                        ))}

                        <p className="fw-bold mt-5">Estadisticas</p>
                        <div>
                            <ul>
                                {item.stats.map((stat, index) => (
                                    <div key={index} >
                                        <p className="mb-2 text-capitalize" >{stat.stat.name}</p>
                                        <ProgressBar 
                                            variant="secondary"
                                            striped 
                                            now={stat.base_stat}
                                            label={`${stat.base_stat}`}
                                        />
                                    </div>
                                    
                                ))}
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Card.Body>
            <Card.Footer style={{backgroundColor : color.bottomColor}} className="text-center">
                <Button 
                    variant="light" 
                    onClick={()=>{
                        router.push({
                            pathname: '/',
                        });
                    }}
                >
                    Regresar al inicio
                </Button>
            </Card.Footer>
        </Card>
    ) 
}
