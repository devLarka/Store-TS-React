import { Card } from "react-bootstrap"

interface IStoreItemProps
{
    id:number
    name:string
    price:number
    imgUrl:string
}
export function StoreItem({id,name,price,imgUrl}:IStoreItemProps){
    return(<Card>
        <Card.Img variant="top" src={imgUrl} height="200ox" style={{objectFit:"cover"}}></Card.Img>
    </Card>)
}