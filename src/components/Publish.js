import React, {useState} from 'react'
import {storage,db} from "../database/firebase"
import firebase from 'firebase'
import "./Publish.css"

const Publish = ({user}) => {

    

    const [caption, setCaption] = useState("")
    const [image, setImage] = useState(null)
    const [progress, setProgress] = useState(0)
    const [captionPrice, setCaptionPrice] = useState(0)

    const handleChange = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0])
            console.log(e.target.files[0])
        }
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot)=>{
                const progress = Math.round(
                    (snapshot.bytesTransferred/snapshot.totalBytes)*100
                );
                setProgress(progress);
            },
            (error)=>{
                alert(error.message)
            },
            ()=>{
                storage.ref("images").child(image.name).getDownloadURL()
                .then((url)=>{
                    db.collection('newProducts').add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        user:user,
                        title:caption,
                        price:captionPrice,
                        imageUrl:url
                    });
                    setCaption("");
                    setProgress(0);
                    setImage(null)
                    setCaptionPrice(0)
                })
            }
            
        );
        
    }

    return (

        
        <div className="publish">
            <div className="publish_container">
                
                <div className="title">
                    <h1>Title</h1>
                    <input type="textarea" onChange={(e)=>setCaption(e.target.value)} value={caption}/>         
                </div>
                <div className="price">
                    <h1>Price</h1>
                    <input type="number" onChange={(e)=>setCaptionPrice(parseFloat(e.target.value))} value={captionPrice}/>
                </div>
                <div className="imageUpload">
                    <h1>Image</h1>
                    <input type="file" onChange={handleChange}/>
                     
                </div>
                <div className="upload">
                    
                    <progress value={progress} max="100"/> 
                    <button onClick={handleUpload}>
                        Upload
                    </button>
                </div>
                
            </div>
        </div>
    )
}

export default Publish
