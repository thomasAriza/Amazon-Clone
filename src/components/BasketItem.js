import React from 'react'
import "./BasketItem.css"
import {db} from "../database/firebase"
import { useStateValue } from '../dataLayer/StateProvider';

const BasketItem = ({id,name, price, image, rating}) => {
    
    const[{user},dispath] = useStateValue()
    const onRemove = () => {
        db.collection("users").doc(user.email).collection("basket").doc(id).delete()
    }

    return (
        <div className="basketItem">
            <img src={image}/>
            <div className="basketItem_infos">
                <h1>{name}</h1>
                <h1>
                    <small>$</small>
                    <strong>{price}</strong>
                </h1>
                <div className="product_price">
                    {Array(rating).fill().map((_,i)=>(
                        <p>⭐</p>
                    ))}
                </div>
                <button 
                onClick={onRemove}
                onMouseEnter={(e)=>e.target.style.backgroundColor="orange"}
                onMouseLeave={(e=>e.target.style.backgroundColor=" rgb(202, 133, 4)")}
                >Remove from basket</button>
            </div>
        </div>
    )
}

export default BasketItem
