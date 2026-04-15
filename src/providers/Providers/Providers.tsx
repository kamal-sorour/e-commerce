"use client";
import React from 'react'
import WrapperForSessionProvider from '../WrapperForSessionProvider/WrapperForSessionProvider'
import CartWishlistProvider from '../CartWishlistProvider/CartWishlistProvider'

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
     <WrapperForSessionProvider>
      <CartWishlistProvider>
       {children}
      </CartWishlistProvider>
     </WrapperForSessionProvider>
    </>
  )
}

export default Providers
