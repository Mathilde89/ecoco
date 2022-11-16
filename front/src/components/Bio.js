import React, {useState, useEffect, useReducer} from 'react'
import MapBio from './MapBio';
import './bio.css'


function Bio() {

    const [data, setData] = useState({});
    const [fin, setFin] = useState([]);
    const [lng, setLng] = useState(5.385010);
const [lat, setLat] = useState(43.267833);
const [zoom, setZoom] = useState(13);




    useEffect(() => {

        const requestOptions = {
            method: 'GET',
        };
        fetch('https://opendata.agencebio.org/api/gouv/operateurs/?activite=Restauration&lat=43.296482&lng=5.36978&nb=50&filtrerRestaurants=1', requestOptions)
            .then(response => response.json())
            .then((response) => {
              console.log(response);
              setData(response)
                let final = []
                response.items.map((data) => {
                    final.push({
                      "type" : "Restaurant",
                      "nom"  : data.denominationcourante,
                      "latitude" : data.adressesOperateurs[0].lat,
                      "longitude":data.adressesOperateurs[0].long,
                      "adresse": data.adressesOperateurs[0].ville + " , " + data.adressesOperateurs[0].codePostal
                    }
                    )
                })
                setFin(final)
                console.log(final)
            
            }).catch(function(error) {
              console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
            });

    }, [])

const findLoc = (lon, lat, zoom, event) => {
  event.preventDefault()
setLng(lon)
setLat(lat)
setZoom(zoom)
console.log(lon, lat, zoom)
}

  return (

    <div> <h1 style={{fontFamily: "'Poppins', sans-serif"}}>Restaurants BIO :</h1>

    <div className='row'>

    <div className='col-6 border'> <div className='listbox'>
{fin.map((data) => {
return (<div> <div className="card" >
<div className="card-body">
  <h5 className="card-title">{data.nom}</h5>
  <h6 className="card-title">{data.adresse}</h6>
  <button className="btn btn-dark" onClick={(e) => findLoc(data.longitude,data.latitude, 14,e)} >Find Location</button>
</div>
</div></div>)
})}</div>
</div>
    <div className='col-6' id='staticMap'><MapBio lon={lng} lat ={lat} zoom ={zoom}/></div>

    </div>



    </div>
  )
}

export default Bio