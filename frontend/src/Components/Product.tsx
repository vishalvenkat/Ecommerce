import { FC } from "react"
import { Card } from "react-bootstrap"

type Product = {
    id: number;
    name: string;
    image: string;
    price: number
}

export const Product: FC<Product> = ({id, name, image, price}) => {
  return (
    <Card className="my-3 p-3 rounded">
        <a href={`/product/${id}`} >
            <Card.Img src={image} variant="top" />
        </a>

        <Card.Body>
            <a href={`/product/${id}`}>
                <Card.Title>
                    <strong>{name}</strong>
                </Card.Title>
            </a>

            <Card.Text>
                ${price}
            </Card.Text>
        </Card.Body>
    </Card>
)
}
