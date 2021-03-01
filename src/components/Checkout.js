import React, {useState,useEffect} from 'react'
import BasketItem from './BasketItem'
import "./Checkout.css"
import {db} from "../database/firebase"
import { useHistory } from 'react-router-dom'
import { useStateValue } from '../dataLayer/StateProvider';
import {getBasketTotal} from '../dataLayer/reducer';

const Checkout = () => {
    const[{user},dispath] = useStateValue()

    const [inBasket, setInBasket] = useState([])
    
    // useEffect(() => {
    //     inBasket.map((item)=>(
            
    //         // setTotal(total + parseFloat(item.price),
    //         console.log(total),
    //         console.log(total+parseFloat(item.price)),
    //         setTotal(parseFloat(item.price)),
    //         console.log(total)
    //         ))
    // }, [inBasket])

    useEffect(() => {
        db.collection("basket").onSnapshot((snapshot)=>
            (
            // setTotal(snapshot.docs.map)((doc)=>
            //     doc.data().price
            // )
                setInBasket(snapshot.docs.map((doc)=>({
                id: doc.id,
                name: doc.data().name,
                price: doc.data().price,
                image: doc.data().image,
                rating: doc.data().rating
                }
            ))))
        )
    }, [])

    const history = useHistory();
    const onCheckout = () => {
        if(!user){
            history.push("/login")
        }
        else
        {
            history.push("/order")
        }
    }

    return (
        <div className="checkout">
            <div className="checkout_left">
                <h2>Your Shopping Basket</h2>
                {
                    inBasket.map((item)=>{
                        return(
                            <BasketItem
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                price={item.price}
                                image={item.image}
                                rating={item.rating}
                            />
                        )
                    })
                }
            </div>

            <div className="checkout_right">
                
                <p>
                    The subtotal will go here ({inBasket.length} items): $<strong>{getBasketTotal(inBasket).toFixed(2)}</strong>
                </p>
                <p>
                    <input type="checkbox"/> This order contains gift
                </p>
                <button onClick={onCheckout}>
                    Proceed to Checkout
                </button>
            </div>
        </div>
    )
}

export default Checkout
