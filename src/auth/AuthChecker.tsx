import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import { auth, Providers } from '../firebase'
import React from 'react'

interface Props {
    children: React.ReactNode;
}

const AuthChecker = ({children}: Props) => {
    const navigate = useNavigate()

    onAuthStateChanged(auth, (user) => {
      if (!user) {
            navigate("../")
            signInWithPopup(auth, Providers.google)}})

  return (
    <>{children}</>
  )
}

export default AuthChecker
