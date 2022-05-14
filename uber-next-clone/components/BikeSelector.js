import React, { useState, useEffect } from 'react'
import tw from "tailwind-styled-components"
import { bikeList } from '../data/bikeList'
import axios from "axios"

const BikeSelector = ({ pickupBikeCoordinates, dropoffBikeCoordinates }) => {

    const [bikeDuration, setBikeDuration] = useState(0);

    async function getData() {
        const query = await fetch(
            `https://api.mapbox.com/directions/v5/mapbox/cycling/${pickupBikeCoordinates[0]},${pickupBikeCoordinates[1]};${dropoffBikeCoordinates[0]},${dropoffBikeCoordinates[1]}?geometries=geojson&access_token=pk.eyJ1IjoiaHVzZXlpbnRvcHV6IiwiYSI6ImNrd296bHZlNTA2M3QydnFoeTV2ZW5wNnYifQ.mnE9Qdq3NqIPmXPWHj87tQ`,
            { method: 'GET' }
        )
        const json = await query.json();
        const data = json.routes[0].distance / 1000
        setBikeDuration(data)
    }

    useEffect(() => {
        getData()
    }, [pickupBikeCoordinates, dropoffBikeCoordinates])

    return (
        <Wrapper>
            <Choose>
                Choose a ride, or swipe up for more
            </Choose>
            <Kind>
                {bikeList.map((bike, index) => (
                    <Bike key={index}>
                        <BikeImage src={bike.imgUrl} />
                        <Style>
                            <Size>{bike.service}</Size>
                        </Style>
                        <Fare>
                            {'$' + (bikeDuration * bike.multiplier).toFixed(2)}
                        </Fare>
                    </Bike>
                ))}
            </Kind>
        </Wrapper>
    )
}
const Wrapper = tw.div`
flex-1 overflow-y-scroll
`
const Choose = tw.div`
mx-auto text-sm border-solid border-black text-center text-gray-600 sticky top-0 bg-white
`
const Kind = tw.div`
p-5
`
const Bike = tw.div`
flex flex-1 items-center
`
const BikeImage = tw.img`
h-14 rounded-full
`
const Style = tw.div`
ml-5 flex flex-col flex-1
`
const Size = tw.div`
font-bold
`
const Fare = tw.div`
flex bg-gradient-to-r from-yellow-300 to-red-600 rounded-lg p-0.5
`
export default BikeSelector
