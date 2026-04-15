"use client";
import React from 'react'
import WrapperForSessionProvider from '../WrapperForSessionProvider/WrapperForSessionProvider'

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
     <WrapperForSessionProvider>
      {children}
     </WrapperForSessionProvider>
    </>
  )
}

export default Providers
