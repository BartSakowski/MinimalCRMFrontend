import React, { Component } from 'react'
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps"


function Map() {
  return( 
    <GoogleMap 
      defaultZoom={12} 
      defaultCenter={{ lat: 41.883523, lng: -87.621898 }} 
    />
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));


export class ContactMap extends Component {

  

  render() {
    return (


      <div style= {{ width: '20vw', height: '40vh' }}>
         <strong>CONTACT Map</strong>
        <WrappedMap 
        // @ts-ignore
        googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places'} 
        // @ts-ignore
        loadingElement={<div style={{ height: "100%" }} />}
        // @ts-ignore
        containerElement={<div style={{ height: "100%" }} />}
        // @ts-ignore
        mapElement={<div style={{ height: "100%" }} />}
        />
      </div>

    );
  }
}
export default ContactMap;
