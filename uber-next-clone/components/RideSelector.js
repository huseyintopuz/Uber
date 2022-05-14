import React, { useState, useEffect } from 'react'
import tw from "tailwind-styled-components"
import { carList } from '../data/carList'
import axios from "axios"

const RideSelector = ({ pickupCoordinates, dropoffCoordinates }) => {

    const [rideDuration, setRideDuration] = useState(0);

    async function getData() {
        const query = await fetch(
            `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoordinates[0]},${pickupCoordinates[1]};${dropoffCoordinates[0]},${dropoffCoordinates[1]}?geometries=geojson&access_token=pk.eyJ1IjoiaHVzZXlpbnRvcHV6IiwiYSI6ImNrd296bHZlNTA2M3QydnFoeTV2ZW5wNnYifQ.mnE9Qdq3NqIPmXPWHj87tQ`,
            { method: 'GET' }
        )
        const json = await query.json();
        const data = json.routes[0].distance / 1000
        setRideDuration(data)
    }
    useEffect(() => {
        getData()
    }, [pickupCoordinates, dropoffCoordinates])
    console.log(getData);
    return (
        <Wrapper>
            <Choose>
                Choose a ride, or swipe up for more
            </Choose>
            <Kind>
                {carList.map((car, index) => (
                    <Car key={index}>
                        <CarImage src={car.imgUrl} />
                        <Style>
                            <Size>{car.service}</Size>
                            <Time>5 min away</Time>
                        </Style>
                        <Fare>
                            {'$' + (rideDuration * car.multiplier).toFixed(2)}
                        </Fare>
                    </Car>
                ))}
            </Kind>
        </Wrapper>
    )
}

export default RideSelector

const Wrapper = tw.div`
flex-1 overflow-y-scroll
`
const Choose = tw.div`
mx-auto text-sm border-solid border-black text-center text-gray-600 sticky top-0 bg-white
`
const Kind = tw.div`
p-5
`
const Car = tw.div`
flex flex-1 items-center
`
const CarImage = tw.img`
h-14
`
const Style = tw.div`
ml-5 flex flex-col flex-1
`
const Size = tw.div`
font-bold
`
const Time = tw.div`
text-blue-400
`
const Fare = tw.div`
flex bg-gradient-to-r from-yellow-300 to-red-600 rounded-lg p-0.5
`
