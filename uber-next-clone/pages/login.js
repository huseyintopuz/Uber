import React, { useEffect } from 'react'
import tw from "tailwind-styled-components"
import { useRouter } from 'next/router'
import { signInWithPopup ,onAuthStateChanged } from 'firebase/auth'
import { auth, provider } from '../firebase'

const Login = () => {
    const router = useRouter()

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if(user) {
                router.push('/')
            }
        }) 
    },[])
    return (
        <Wrapper>
            <UberLogo src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png" />
            <Title>Log in to access your account</Title>
            <LoginImage src='https://i.ibb.co/CsV9RYZ/login-image.png'></LoginImage>
            <SignInButton onClick={() => signInWithPopup(auth, provider)}>Sign in with Google</SignInButton>           
        </Wrapper>
    )
}

export default Login

const Wrapper = tw.div`
flex flex-col h-screen w-screen p-3
`
const UberLogo = tw.img`
h-20 self-start
`
const Title = tw.div`
text-gray-500 text-3xl px-3 pt-4 
`
const LoginImage = tw.img` 
object-contain w-full h-72
`
const SignInButton = tw.button`
bg-black text-white text-2xl p-4 mx-60 my-auto rounded-3xl hover:bg-blue-600 hover:text-black
` 