import React, { createContext, useEffect, useState } from 'react'

export const tokenAuthorisationContext = createContext()

function TokenAuth({children}) {

    const [isAuthorised,setIsAuthorised] = useState(false)

    useEffect(()=>{
      if (sessionStorage.getItem("token")) {
        setIsAuthorised(true)
        
      }else{
        setIsAuthorised(false)
        
      }
    },[isAuthorised])

    
    
  return (
    <>

   <tokenAuthorisationContext.Provider value={{isAuthorised,setIsAuthorised}} > 
    {children}
   </tokenAuthorisationContext.Provider>
        
    </>
  )
}

export default TokenAuth