import React, {useState,useEffect} from 'react'
import "./Order.css"
import { db } from "../database/firebase"
import OrderItem from './OrderItem'
import ReactDOM from "react-dom";
import {getBasketTotal} from '../dataLayer/reducer';

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

const Order = () => {


    const createOrder = (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value:getBasketTotal(inBasket),
                
              },
            },
          ],
        });
      }

    const onApprove = (data, actions) => {
        return actions.order.capture();
      }
    const [inBasket, setInBasket] = useState([])

    useEffect(() => {
        db.collection("basket").onSnapshot((snapshot)=>
            (
            setInBasket(snapshot.docs.map((doc)=>({
                id: doc.id,
                name: doc.data().name,
                price: doc.data().price,
                image: doc.data().image,
                rating: doc.data().rating
            }))))
        )
    }, [])

    return (
        <div className="order">
            <div className="order_left">
                <h2>Your Order</h2>
                {
                    inBasket.map((item)=>{
                        return(
                            <OrderItem
                                key={item.id}
                                name={item.name}
                                price={item.price}
                                image={item.image}
                                rating={item.rating}
                            />
                        )
                    })
                }
                <h1 className="total">Total : ${getBasketTotal(inBasket)}</h1>
            </div>
            <div className="order_right">
                <PayPalButton
                    createOrder={(data, actions) => createOrder(data, actions)}
                    onApprove={(data, actions) => onApprove(data, actions)}
                />
            </div>
        </div>
    )
}

export default Order
