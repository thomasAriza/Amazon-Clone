import React, {useEffect} from "react"
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Checkout from './components/Checkout';
import Login from './components/Login';
import { auth } from "./database/firebase";
import { useStateValue } from "./dataLayer/StateProvider"
import Order from "./components/Order";
import Publish from "./components/Publish";

function App() {

  const[{user}, dispatch] = useStateValue();

    useEffect(()=>{

        auth.onAuthStateChanged(authUser=>{
            if(authUser){
                dispatch({
                    type: "SET_USER",
                    user: authUser
                })
            } else {
                dispatch({
                    type: "SET_USER",
                    user: null
                })
            }
        })
      // case "SET_USER":
      //   return{
      //     ...state,
      //     user: action.user
      //   }

    },[])

  return (
    <div className="App">
      <Router>
        
        <Switch>
          <Route path="/publish">
            <Header/>
            <Publish user={user?.email}/>
          </Route>
          <Route path='/order'>
            <Header/>
            <Order/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/checkout">
            <Header/>
            <Checkout/>
          </Route>
          <Route path="/">
            <Header/>
            <Home/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
