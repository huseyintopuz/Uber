import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router"
import Map from '../components/Map'
import RideSelector from '../components/RideSelector';
import tw from "tailwind-styled-components"
import Link from "next/link"
import axios from "axios"

const RideConfirm = () => {
    const router = useRouter();
    const { pickup, dropoff } = router.query

    const [coordinates, setCoordinates] = useState({
        pickupCoordinates: [0, 0],
        dropoffCoordinates: [0, 0]
    })

    const getPickupCoordinates = async (pickup) => {
        const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?` +
            new URLSearchParams({
                access_token: "pk.eyJ1IjoiaHVzZXlpbnRvcHV6IiwiYSI6ImNrd296bHZlNTA2M3QydnFoeTV2ZW5wNnYifQ.mnE9Qdq3NqIPmXPWHj87tQ",
                limit: 1
            }))
        const result = await response.data.features[0].center;
        console.log("heyyy",result)
        // return result
    }
    const getDropoffCoordinates = async (dropoff) => {
        const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?` +
            new URLSearchParams({
                access_token: "pk.eyJ1IjoiaHVzZXlpbnRvcHV6IiwiYSI6ImNrd296bHZlNTA2M3QydnFoeTV2ZW5wNnYifQ.mnE9Qdq3NqIPmXPWHj87tQ",
                limit: 1
            }))

        const result = await response.data.features[0].center;
        return result
    }

    const coordinatesFetcher = async (pickup, dropoff) => {
        let pick = [0, 0];
        let drop = [0, 0];
        pick = await getPickupCoordinates(pickup);
        drop = await getDropoffCoordinates(dropoff);
        setCoordinates({
            ...coordinates,
            pickupCoordinates: pick,
            dropoffCoordinates: drop
        })
    }

    useEffect(() => {
        coordinatesFetcher(pickup, dropoff)
    }, [pickup, dropoff])

    return (
        <Wrapper>
            <Map
                pickupCoordinates={coordinates.pickupCoordinates} // we pass these into for using by props in Map.js
                dropoffCoordinates={coordinates.dropoffCoordinates}
            />
            <Link href="./rideSearch">
                <BackButton src="https://img.icons8.com/ios-filled/50/000000/left.png" />
            </Link>
            <ConfirmContainer>
                <RideSelector
                    pickupCoordinates={coordinates.pickupCoordinates}
                    dropoffCoordinates={coordinates.dropoffCoordinates}
                />
                <ConfirmButtonContainer>
                    <ConfirmButton>
                        Confirm UberX
                    </ConfirmButton>
                </ConfirmButtonContainer>
            </ConfirmContainer>
        </Wrapper>
    )
}

export default RideConfirm

const Wrapper = tw.div`
flex flex-col h-screen relative
`
const BackButton = tw.img`
absolute top-3 left-3 bg-white rounded-full h-12 cursor-pointer
`
const ConfirmContainer = tw.div`
flex flex-1 flex-col h-1/2
`
const ConfirmButtonContainer = tw.div`
border-t-2
`
const ConfirmButton = tw.div`
bg-black text-white text-center p-3 mx-5 mb-2 rounded-full cursor-pointer
`