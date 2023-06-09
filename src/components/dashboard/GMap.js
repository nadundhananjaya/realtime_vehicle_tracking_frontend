import {useEffect, useState} from "react";
import {GoogleMap, LoadScript, MarkerF} from "@react-google-maps/api";
import classes from "./GMap.module.css"
import RacingCarIcon from "../../assets/car/racing-car-icon.png"
import {doc, getFirestore, onSnapshot} from "firebase/firestore";
import { setDoc,query,collection,orderBy } from "firebase/firestore";
import {firebaseApp} from "../../Firebase";


const collectionName = "v_locations"

const GMap = () => {

    const firestore = getFirestore(firebaseApp)
    const GMAP_API_KEY = process.env.REACT_APP_GMAP_API_KEY
    const [markers, setMarkers] = useState([]);



    const getLocation = () => {
        const q = query(collection(firestore, collectionName));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const markers = [];
            querySnapshot.forEach((doc) => {
                const lat = parseFloat(doc.data().latitude);
                const lng = parseFloat(doc.data().longitude);
                markers.push({
                    lat,
                    lng
                })
            });
            setMarkers(markers)
        });

    }

    useEffect(()=>{
        getLocation()
    },[])


    return <div className={classes['map-holder']}>
        {/*<div className={classes['banner']}>*/}
        {/*    Hello Banner*/}
        {/*</div>*/}
        <div className={classes['map']}>
            <LoadScript googleMapsApiKey={GMAP_API_KEY}>
                <GoogleMap
                    center={markers[0]}
                    zoom={18}
                    // mapTypeControlOptions={}
                    mapContainerStyle={{width: '100%', height: '100%'}}
                    options={{
                        zoomControl: false,
                        streetViewControl: false,
                        mapTypeControl: true,
                        fullscreenControl: false,
                        styles: []
                    }}
                    // onLoad={map => setMap(map)},
                >
                    {markers.map((marker, index) => (
                        <MarkerF  position={marker} icon={RacingCarIcon} />
                    ))}

                </GoogleMap>
            </LoadScript>
        </div>

    </div>
}


export default GMap
