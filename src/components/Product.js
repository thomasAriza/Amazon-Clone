import React, {useEffect} from 'react'
import "./Product.css"
import {db} from "../database/firebase"
import { gsap } from "gsap";


const Product = ({title,image,price,rating}) => {

    const onClick = (event) => {
        db.collection('basket').add({
            name: title,
            image: image,
            price: price,
            rating: rating
        },
        console.log(price)
        
        )
    }

    const buttonOnMouseEnter = (event) => {
        event.target.style.backgroundColor="orange"
    }

    const buttonOnMouseLeave = (event) => {
        event.target.style.backgroundColor="rgb(202, 133, 4)"
    }
    
    // const animation = (e) => {
    //     let tl =gsap.to(e.target,
    //         {
    //             autoAlpha:0,
    //         })
    //     return(tl)
    // }
    // const imgOnMouseEnter = (e) => {
    //     gsap.from(e.target,{scale:1.3,duration:5})
    // }
    

    // const imgOnMouseLeave = (e) => {
    //     animation(e).reverse()
    // }
    // useEffect(() => {
    //     gsap.from("img",{splite:1.3,duration:5})
    // }, [])

    return (
        <div className="product">   
             <div className="product_header">
                <p>{title}</p>
                <p>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product_price">
                    {Array(rating).fill().map((_,i)=>(
                        <p>⭐</p>
                    ))}
                </div>
             </div>

             <div className="product_body">
                 <img src={image}/>
                 <button onClick={onClick} onMouseEnter={buttonOnMouseEnter} onMouseLeave={buttonOnMouseLeave}>Add to basket</button>
             </div>
        </div>
    )
}

export default Product
