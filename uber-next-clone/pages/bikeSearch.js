import React, { useState } from 'react'
import tw from "tailwind-styled-components"
import Link from "next/link"

const bikeSearch = () => {
    const [pickupBike, setPickupBike] = useState("")
    const [dropoffBike, setDropoffBike] = useState("")
    return (
        <Wrapper>
            <ButtonContainer>
                <Link href="/">
                    <BackButton src="https://img.icons8.com/ios-filled/50/000000/left.png" />
                </Link>
                <Bike src="https://i.ibb.co/n776JLm/bike.png" />
            </ButtonContainer>

            <InputContainer>
                <FromToIcons>
                    <Circle src="https://img.icons8.com/ios-filled/50/9CA3AF/filled-circle.png" />
                    <Line src="https://img.icons8.com/ios-filled/50/9CA3AF/vertical-line.png" />
                    <Square src="https://img.icons8.com/windows/2x/square-full.png" />
                </FromToIcons>
                <InputBoxes>
                    <Input
                        placeholder="Enter pickup location"
                        value={pickupBike}
                        onChange={e => setPickupBike(e.target.value)} />
                    <Input
                        placeholder="Where to go?"
                        value={dropoffBike}
                        onChange={e => setDropoffBike(e.target.value)} />
                </InputBoxes>
                <PlusIcon src="https://img.icons8.com/ios/50/000000/plus-math.png" />
            </InputContainer>

            <SavedPlaces>
                <StarIcon src="https://img.icons8.com/ios-filled/50/ffffff/star--v1.png" />
                Saved Places
            </SavedPlaces>
            <Link
                href={{
                    pathname: "./bikeConfirm",
                    query: {
                        pickupBike: pickupBike,
                        dropoffBike: dropoffBike
                    }
                }}>
                <ConfirmLocations>
                    Confirm Locations
                </ConfirmLocations>
            </Link>

        </Wrapper>
    )
}
const Wrapper = tw.div`
h-screen
`
const ButtonContainer = tw.div`
p-4 bg-white flex items-center justify-between
`
const BackButton = tw.img`
h-12 cursor-pointer
`
const Bike = tw.img`
h-12
`
const InputContainer = tw.div`
flex items-center px-4
`
const FromToIcons = tw.div`
flex flex-col items-center mr-2 
`
const Circle = tw.img`
h-2.5
`
const Line = tw.img`
h-10
`
const Square = tw.img`
h-3
`
const InputBoxes = tw.div`
flex flex-col flex-1
`
const Input = tw.input`
outline-none border-none bg-gray-200 my-2 p-2 focus:ring-2 focus:ring-blue-400
focus:bg-white rounded-lg
`
const PlusIcon = tw.img`
bg-gray-200 rounded-full ml-4 h-12 cursor-pointer hover:bg-gray-300
`
const SavedPlaces = tw.div`
flex items-center px-4 py-2
`
const StarIcon = tw.img`
bg-gray-400 w-10 h-10 p-2 rounded-full mr-2
`
const ConfirmLocations = tw.div`
bg-black text-white mx-16 py-4 text-center rounded-full text-xl cursor-pointer hover:bg-blue-500 hover:text-black
`
export default bikeSearch
