import React, {useState, useEffect} from 'react';
import "./Header.css";
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from "react-router-dom";
import {auth, db} from "../database/firebase";
import { useStateValue } from '../dataLayer/StateProvider';
import {gsap} from "gsap";

const Header = () => {

    const [{user},dispatch]=useStateValue()
    const [inBasket, setInBasket] = useState([])

    useEffect(() => {
        db.collection("basket").onSnapshot((snapshot)=>
            setInBasket(snapshot.docs.map((doc)=>({
                id: doc.id,
            })))
        )
    }, [])

    const handleAuthentification = () => {
        if(user)
        {
            auth.signOut();
        }
    }

    const onMouseEnter = (event) => {
    }
    const onMouseLeave = (event) => {
        event.target.style.backgroundColor=""
    }

    return (
        <div className="header">
            <Link className="link_to_home" to="/">
                <img src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"/>
            </Link>
            
            <form>
                <input type="text"/>
                <SearchIcon className="search"/>
            </form>
            <Link className="sign_in" to={user? "/":"/login"}>
                <div onClick={handleAuthentification} >
                    <p>{user? user.email : "Hello"}</p>
                    <h1>{user? 'Sign out': 'Sign in'}</h1>
                </div>
            </Link>
            <Link className="link_to_order" to={user? '/order' : '/login'}>
                <div className="orders">
                    <p>Return</p>
                    <h1>& Orders</h1>
                </div>
            </Link>
            
            <Link className="link_to_publish" to="/publish">
                <div className="prime">
                    <p>Create</p>
                    <h1>Announce</h1>
                </div>
            </Link>
            <Link to="/checkout" className="link_to_checkout">
                <ShoppingBasketIcon className="basket"/>
                <p>{inBasket.length}</p>
            </Link>

        </div>
    )
}

export default Header
