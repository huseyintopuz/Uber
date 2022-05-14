import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import tw from "tailwind-styled-components"
import Map from '../components/Map'
import Link from 'next/link'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useRouter } from 'next/router'

export default function Home() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  const [visible, setVisible] = useState(false);

  const Image = () => {
    return (
      <svg style={{ width: 25, height: 20, marginLeft: 40 }}>
        <path d="M9 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 7c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm6 5H3v-.99C3.2 16.29 6.3 15 9 15s5.8 1.29 6 2v1zm3-4v-3h-3V9h3V6h2v3h3v2h-3v3h-2z"></path>
      </svg>
    )
  }

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setUser({
          name: user.displayName,
          photoUrl: user.photoURL,
          email: user.email
        })
      } else {
        setUser(null)
        router.push('./login')
      }
    })
  }, [])

  return (
    <Wrapper>
      <Map />

      {visible && <SignOutDiv>
        <SignOutPhoto src={user && user.photoUrl} />
        <SignOutName>{user && user.name}</SignOutName>
        <Email>{user && user.email}</Email>
        <Manage><a href="https://myaccount.google.com/?utm_source=OGB&utm_medium=act" target="_blank">Manage your Google Account</a></Manage>
        <Add>
          <Image />
          <AddAccount><a href="https://accounts.google.com/signin/v2/identifier?service=ahsid&continue&ec=GAlAywI&flowName=GlifWebSignIn&flowEntry=AddSession" target="_blank" >Add another account</a></AddAccount>
        </Add>
        <SignOutButton onClick={() => signOut(auth)} >Sign out</SignOutButton>
        <Privacy>
          <Policy><a href="https://policies.google.com/privacy?hl=en" target="_blank">Privacy Policy</a></Policy>
          <Circle />
          <Terms><a href="https://policies.google.com/terms?hl=en" target="_blank">Terms of Service</a></Terms>
        </Privacy>
      </SignOutDiv>}

      <ActionItems>
        <Header>
          <UberLogo src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png" />
          <All>
            <Name>{user && user.name}</Name>
            <UserPhoto onClick={() => setVisible(!visible)} src={user && user.photoUrl} />
          </All>
        </Header>

        <ActionButtons>
          <Link href="./rideSearch">
            <ActionButton>
              <ActionButtonImage src="https://i.ibb.co/cyvcpfF/uberx.png" />
              Ride
            </ActionButton>
          </Link>
          <Link href="./bikeSearch">
            <ActionButton>
              <ActionButtonImage src="https://i.ibb.co/n776JLm/bike.png" />
              Bike
            </ActionButton>
          </Link>
          <Link href="./reserve">
            <ActionButton>
              <ActionButtonImage src="https://i.ibb.co/5RjchBg/uberschedule.png" />
              Reserve
            </ActionButton>
          </Link>
        </ActionButtons>
        <InputButton>Where to ?</InputButton>
      </ActionItems>
    </Wrapper>
  )
}
const Wrapper = tw.div`
flex flex-col h-screen relative z-0
`
const SignOutDiv = tw.div`
absolute top-44 right-16 z-10 bg-white w-1/3 text-center border-solid border-2 border-gray-300 rounded-xl
`
const SignOutPhoto = tw.img`
h-24 rounded-full m-auto my-4
`
const SignOutName = tw.div`

`
const Email = tw.div`
text-gray-600 text-sm 
`
const Manage = tw.div`
border-solid border border-gray-200 my-5 mx-20 p-2 rounded-full hover:bg-gray-100 cursor-pointer
`
const Add = tw.div`
flex h-min border-t border-b border-gray-200 p-4 hover:bg-gray-100 cursor-pointer
`
const AddAccount = tw.div`
ml-7 
`
const SignOutButton = tw.div`
border-solid border border-gray-300 my-4 mx-36 p-2 hover:bg-gray-100 cursor-pointer
`
const Privacy = tw.div`
border-t border-b border-gray-200 flex justify-center items-center text-gray-600 text-xs p-6
`
const Policy = tw.div`
mr-2 cursor-pointer
`
const Circle = tw.div`
bg-gray-500 w-1 h-1 rounded-full mr-2
`
const Terms = tw.div`
cursor-pointer
`
const ActionItems = tw.div`
flex-1 
`
const Header = tw.div`
flex items-center justify-between
`
const UberLogo = tw.img`
w-25 h-20
`
const All = tw.div`
flex items-center p-3
`
const Name = tw.div`
size-sm mr-5 width-20
`
const UserPhoto = tw.img`
w-10 h-10 rounded-full cursor-pointer
`
const ActionButtons = tw.div`
flex
`
const ActionButton = tw.div`
flex flex-col flex-1 mx-3 items-center bg-gray-200 h-32 justify-center
rounded-lg cursor-pointer transform hover:scale-105 transition text-xl
`
const ActionButtonImage = tw.img`
h-3/6
`
const InputButton = tw.div`
h-20 bg-gray-200 p-4 mt-8 mx-3 rounded-lg flex items-center
`
