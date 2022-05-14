import React, { useState } from 'react'
import Calendar from 'react-calendar'
import Link from 'next/link'
import tw from "tailwind-styled-components"
import 'react-calendar/dist/Calendar.css'

const reserve = () => {
    const [value, onChange] = useState(new Date());
    
    return (
        <Main>
            <Choose>
                <Link href="/">
                    <ButtonContainer>
                        <BackButton src="https://img.icons8.com/ios-filled/50/000000/left.png" />
                    </ButtonContainer>
                </Link>
                <Where>
                    <Input placeholder="from" />
                    <ChangeDiv>
                        <Change src="https://img.icons8.com/pastel-glyph/344/sorting-arrows-horizontal--v1.png" />
                    </ChangeDiv>
                    <Input placeholder="to" />
                </Where>
            </Choose>

            <Reserve>
                <Calendar
                    onChange={onChange}
                    value={value}
                />
            </Reserve>

        </Main>
    )
}
const Main = tw.div`
flex m-6 
`
const Choose = tw.div`
flex
`
const Where = tw.div`
flex flex-col
`
const Input = tw.input`
bg-gray-200 h-14 w-96 m-2 outline-none border-none focus:ring-2 focus:ring-blue-400 
p-4 focus:bg-white rounded-lg
`
const ChangeDiv =  tw.div`
mx-auto
`
const Change = tw.img`
h-8 w-8 transform rotate-90
`
const ButtonContainer = tw.div`
cursor-pointer mr-5
`
const BackButton = tw.img`

`
const Reserve = tw.div`
ml-6 mt-2
`

export default reserve
