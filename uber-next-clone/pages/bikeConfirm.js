import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router"
import Map from '../components/Map'
import BikeSelector from '../components/BikeSelector';
import tw from "tailwind-styled-components"
import Link from "next/link"
import axios from "axios"

const BikeConfirm = () => {
    const router = useRouter()
    const { pickupBike, dropoffBike } = router.query

    const [coordinates, setCoordinates] = useState({
        pickupBikeCoordinates: [0, 0],
        dropoffBikeCoordinates: [0, 0]
    })

    const getPickupBikeCoordinates = async (pickupBike) => {
        const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${pickupBike}.json?` +
            new URLSearchParams({
                access_token: "pk.eyJ1IjoiaHVzZXlpbnRvcHV6IiwiYSI6ImNrd296bHZlNTA2M3QydnFoeTV2ZW5wNnYifQ.mnE9Qdq3NqIPmXPWHj87tQ",
                limit: 1
            }))
        const result = await response.data.features[0].center
        return result
    }

    const getDropoffBikeCoordinates = async (dropoffBike) => {
        const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoffBike}.json?` +
            new URLSearchParams({
                access_token: "pk.eyJ1IjoiaHVzZXlpbnRvcHV6IiwiYSI6ImNrd296bHZlNTA2M3QydnFoeTV2ZW5wNnYifQ.mnE9Qdq3NqIPmXPWHj87tQ",
                limit: 1
            }))
        const result = await response.data.features[0].center
        return result
    }

    const coordinatesFetcher = async (pickupBike, dropoffBike) => {
        let pick = [0, 0]
        let drop = [0, 0]
        pick = await getPickupBikeCoordinates(pickupBike)
        drop = await getDropoffBikeCoordinates(dropoffBike)
        setCoordinates({
            ...coordinates,
            pickupBikeCoordinates: pick,
            dropoffBikeCoordinates: drop
        })
    }

    useEffect(() => {
        coordinatesFetcher(pickupBike, dropoffBike)
    }, [pickupBike, dropoffBike])

    return (
        <Wrapper>
            <Map
                pickupBikeCoordinates={coordinates.pickupBikeCoordinates}
                dropoffBikeCoordinates={coordinates.dropoffBikeCoordinates} 
            />
            <Link href="./bikeSearch">
                <BackButton src="https://img.icons8.com/ios-filled/50/000000/left.png" />
            </Link>
            <ConfirmContainer>
                <BikeSelector
                    pickupBikeCoordinates={coordinates.pickupBikeCoordinates}
                    dropoffBikeCoordinates={coordinates.dropoffBikeCoordinates}
                />
                <ConfirmButtonContainer>
                    <ConfirmButton>
                        Confirm Bike
                    </ConfirmButton>
                </ConfirmButtonContainer>
            </ConfirmContainer>
        </Wrapper>
    )
}

export default BikeConfirm

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
bg-black text-white text-center p-3 mx-7 mb-2 rounded-full cursor-pointer
`
