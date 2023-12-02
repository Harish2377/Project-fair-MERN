import React, { createContext, useState } from 'react'

export const addProjectResponseContext = createContext()
export const editProjectResponseContext = createContext()

function ContextShare({children}) {

    const [addProjectResponse,setaddProjectResponse] = useState({})
    const [editProjectResponse,setEditProjectResponse] = useState({})

  return (
    <>


<addProjectResponseContext.Provider value={{addProjectResponse,setaddProjectResponse}}>

  <editProjectResponseContext.Provider value={{editProjectResponse,setEditProjectResponse}} >

    {children}
    
  </editProjectResponseContext.Provider>

</addProjectResponseContext.Provider>






    </>
  )
}

export default ContextShare