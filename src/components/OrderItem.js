import React from 'react'
import "./OrderItem.css"

const OrderItem = ({image,name,price,rating}) => {
    return (
        <div className="orderItem">
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
            </div>
        </div>
    )
}

export default OrderItem
