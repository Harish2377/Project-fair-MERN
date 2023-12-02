import React, { useContext } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { tokenAuthorisationContext } from '../contexts/TokenAuth'



function Header({insideDashboard }) {

  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthorisationContext)

  const navigate = useNavigate()
  const handleLogout = ()=>{

    //remove all existing user detail from browser
    sessionStorage.removeItem("existingUser")
    sessionStorage.removeItem("token")
    setIsAuthorised(false)
    //navigate to landing page
    navigate('/')
    
  }



  return (



    <Navbar className="bg-primary position-fixed top-0 w-100 z-2">
        <Container>
          <Navbar.Brand >
            <Link to={'/'} className='text-decoration-none'>
                <h1 style={{fontSize:'30px'}} className='fw-bolder text-light'><i class="fa-brands fa-stack-overflow fa-fade me-2"></i>Project Fair</h1>
    
            </Link>            
            </Navbar.Brand>
            { insideDashboard &&
            <div className="btn ms-auto text-white fw-bolder fs-5 d-flex justify-content-center align-items-center" onClick={handleLogout} >Logout   
            <i className="fa-solid fa-right-from-bracket ms-1 "></i>
            </div>
            }
        </Container>
      </Navbar>

  )
    
}

export default Header