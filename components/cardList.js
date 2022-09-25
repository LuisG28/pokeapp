import React from 'react';
import {
    Button,
    Card
} from 'react-bootstrap';
import { useRouter } from 'next/router';

export default function cardList ({item, color}) {
    const router = useRouter();

    return(
        <Card style={{ width: '18rem', padding: '5px', margin: '5px' }} className="text-center">
            <Card.Header style={{backgroundColor : color.bottomColor}}>
                <p/>
            </Card.Header>
            <Card.Body style={{backgroundColor : color.bodyColor || 'red'}}>
                <Card.Img variant="top" src={item.image} />
                <Card.Title>{item.name.toUpperCase()}</Card.Title>
            </Card.Body>
            <Card.Footer style={{backgroundColor : color.bottomColor}}>
                <Button 
                    variant="light" 
                    onClick={()=>{
                        router.push({
                            pathname: '/pokemon',
                            query: { id: item.id}
                        });
                    }}
                >
                Ver detalles
                </Button>
            </Card.Footer>
        </Card>
    ) 
}
