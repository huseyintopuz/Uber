import { useEffect } from "react";
import tw from "tailwind-styled-components"
import mapboxgl from "!mapbox-gl"

mapboxgl.accessToken =
  'pk.eyJ1IjoiaHVzZXlpbnRvcHV6IiwiYSI6ImNrd296bHZlNTA2M3QydnFoeTV2ZW5wNnYifQ.mnE9Qdq3NqIPmXPWHj87tQ';

const Map = (props) => { // We use the props for getting the data defined from confirm.js
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/huseyintopuz/ckwp1glwl0ib015mplvupi43f', // style URL
      center: [26, 42], // starting position [lng, lat]
      zoom: 3 // starting zoom
    });

    if (map, props.pickupCoordinates) { // we get the data using props.pickupCoordinates from confirm.js
      addPointToMap(map, props.pickupCoordinates)
    }

    if (map, props.dropoffCoordinates) {
      addPointToMap(map, props.dropoffCoordinates)
    }

    if (map, props.pickupBikeCoordinates) { // we get the data using props.pickupCoordinates from confirm.js
      addPointToMap(map, props.pickupBikeCoordinates)
    }

    if (map, props.dropoffBikeCoordinates) {
      addPointToMap(map, props.dropoffBikeCoordinates)
    }

    if (props.pickupCoordinates && props.dropoffCoordinates) { // Add an auto zoom to be able to zoom into the markers
      map.fitBounds([
        props.pickupCoordinates,
        props.dropoffCoordinates
      ], { padding: 80 }
      )
    }
    if (props.pickupBikeCoordinates && props.dropoffBikeCoordinates) { // Add an auto zoom to be able to zoom into the markers
      map.fitBounds([
        props.pickupBikeCoordinates,
        props.dropoffBikeCoordinates
      ], { padding: 80 }
      )
    }

  }, [props.pickupCoordinates, props.dropoffCoordinates, props.pickupBikeCoordinates, props.dropoffBikeCoordinates]) // not for trying to get the data again and again, we code them

  const addPointToMap = (map, coordinates) => {
    const marker1 = new mapboxgl.Marker()
      .setLngLat(coordinates)
      .addTo(map);
  }

  return <Wrapper id="map"></Wrapper>
}
const Wrapper = tw.div`
  flex-1 flex-col 
`
export default Map


