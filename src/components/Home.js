import React, {useState,useEffect} from 'react'
import "./Home.css"
import Product from './Product'
import {db} from '../database/firebase'

const Home = () => {


    const [novelties,setNovelties] = useState([])

    useEffect(() => {
        db.collection("newProducts").onSnapshot((snapshot)=>(
            setNovelties(snapshot.docs.map((doc)=>({
                id:doc.id,
                title:doc.data().title,
                price:doc.data().price,
                image:doc.data().imageUrl
            })))
        ))
    }, [])


    return (
        <div className="home">
            <div className="home_container">
                <img src="https://images-eu.ssl-images-amazon.com/images/G/08/digital/video/gateway/placement/launch/GenerationBrutS1/GENBR_S1_GWBleedingHero_FT_COVIDUPDATE_XSite_1500X600_PV_fr-FR._CB659681118_.jpg"/>
                <div className="row row1">
                    <Product 
                        key={1}
                        title="Samsung Electronics Samsung Galaxy S21 5G | Factory Unlocked Android Cell Phone | US Version 5G Smartphone | Pro-Grade Camera, 8K Video, 64MP High Res | 128GB, Phantom Gray (SM-G991UZAAXAA)"
                        image="https://m.media-amazon.com/images/I/51dWGLdFwcL._AC_UY327_FMwebp_QL65_.jpg"
                        price={699.99}
                        rating={5}
                    />
                    <Product
                        key={2}
                        title="Fire TV Stick 4K streaming device with Alexa Voice Remote | Dolby Vision | 2018 release"
                        image="https://images-na.ssl-images-amazon.com/images/I/51CgKGfMelL._AC_UL200_SR200,200_.jpg"
                        price={87.98}
                        rating={4}
                    />
                </div>

                <div className="row row2">
                    <Product
                        key={3}
                        title="Wyze Cam 1080p HD Indoor WiFi Smart Home Camera with Night Vision, 2-Way Audio, Works with Alexa & the Google Assistant, White, 1-Pack"
                        image="https://images-na.ssl-images-amazon.com/images/I/61B04f0ALWL._AC_UL200_SR200,200_.jpg"
                        price={50.71}
                        rating={4}
                    />
                    <Product
                        key={4}
                        title="Kindle Paperwhite – Now Waterproof with more than 2x the Storage – Ad-Supported + Kindle Unlimited (with auto-renewal)"
                        image="https://images-na.ssl-images-amazon.com/images/I/61eAq6gg-XL._AC_UL200_SR200,200_.jpg"
                        price={159.00}
                        rating={5}
                    />
                    <Product
                        key={5}
                        title="Apple Watch Series 3 (GPS, 38mm) - Silver Aluminum Case with White Sport Band"
                        image="https://images-na.ssl-images-amazon.com/images/I/71vCuRn4CkL._AC_UL200_SR200,200_.jpg"
                        price={169.00}
                        rating={5}
                    />
                    {
                        novelties.map((novelty)=>{
                            console.log(novelty)
                            return(
                                <Product
                                    key={novelty.id}
                                    title={novelty.title}
                                    image={novelty.image}
                                    price={novelty.price}
                                    rating={0}
                                />
                            )
                        })
                    }
                </div>

                <div className="row row3">
                    <Product
                        key={6}
                        title="All-New Insignia NS-24DF310NA21 24-inch Smart HD 720p TV - Fire TV Edition"
                        image="https://images-na.ssl-images-amazon.com/images/I/51H3k8XVFCL._AC_UL200_SR200,200_.jpg"
                        price={169.99}
                        rating={4}
                    />
                </div>
            </div>

            
        </div>
    )
}

export default Home
