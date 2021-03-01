import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import "./Login.css"
import {auth} from "../database/firebase"

const Login = () => {

    
    
    const history = useHistory()
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")

    const signIn = (event) => {
        event.preventDefault()
        console.log(pass)
        console.log(email)
        auth.signInWithEmailAndPassword(email,pass)
        .then(auth=>{
            history.goBack()
        })
        .catch(error=>alert(error.message))
    }

    const register = (event) => {
        event.preventDefault()
        auth.createUserWithEmailAndPassword(email,pass).
        then((auth)=>{
            alert("Account Created")
            if(auth){
                history.goBack()
            }
        }).
        catch((error)=>alert(error.message))

    }


    return (
        <div className="login">
            <Link to="/">
                <img src="https://www.sujet24.com/wp-content/uploads/2019/06/amazon.jpg" className="amazon_logo"/>
            </Link>
            
            <div className="login_container">
                <h1>Sign in</h1>
                <h>Email or mobile phone number</h>
                <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                
                <form>
                <h>Password</h>
                <input type="password" value={pass} onChange={(e)=>setPass(e.target.value)}/>
                <button 
                className="signIn_button" 
                onClick={signIn} 
                onMouseEnter={(e)=>e.target.style.backgroundColor="orange"}
                onMouseLeave={(e=>e.target.style.backgroundColor=" #f0c14b")}
                >Sign in</button>
                </form>
                <p>By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.</p>
                <button className="createAccount_button" onClick={register}>Create your amazon account</button>
            </div>
        </div>
    )
}

export default Login
