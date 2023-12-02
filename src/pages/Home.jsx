import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import titleimg from '../Assets/designer.png'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { homeProjectAPI } from '../services/allAPI'




function Home() {

  const [loggedin,setLoggedin] = useState(false)
  const [homeProjects,setHomeProjects]= useState([])

  const getHomeProjects = async ()=>{
    const result = await homeProjectAPI()
    if (result.status===200) {

      setHomeProjects(result.data)
      
    } else {
      console.log(result);
      console.log(result.response.data);
      
    }
  }

// console.log(homeProjects);


  useEffect(()=>{
    if (sessionStorage.getItem("token")) {

      setLoggedin(true)
      
    } else {
      setLoggedin(false)
    }

    //api call
    getHomeProjects()

  },[])





  return (
    <>
        {/* landing page */}
      <div style={{width:'100%',height:'100vh'}} className='container-fluid rounded bg-primary'>
        <Row className='align-items-center p-5'>

          <Col sm={12} md={6}  >

            <h1 style={{fontSize:'80px'}} className='fw-bolder text-light'><i class="fa-brands fa-stack-overflow fa-fade"></i>Project Fair</h1>
      <p>
        One Stop Destination for all software development projects.Where user can add and manage their projects.As well as access all projects available in our website... what are you waiting for!!!
      </p>

      { 
        loggedin?
        <Link to={'/dashboard'} className='btn btn-warning text-black d-flex justify-content-center align-items-center w-50 '>Manage Your Project<i class="fa-solid fa-right-long fa-fade ms-2"></i></Link>:

        <Link to={'/login'} className='btn btn-warning text-black d-flex justify-content-center align-items-center w-50 '>Start to Explore<i class="fa-solid fa-right-long fa-fade ms-2"></i></Link>
      }

          </Col>

          <Col sm={12} md={6}>
            <img src={titleimg} style={{height:'550px'}} className='w-100 mt-3' alt="" />
          </Col>

        </Row>

      </div>

      {/* all projects */}
      <div className="all-projects mt-5">
        <h1 className='text-center '>Explore Our Projects</h1>
       <marquee scrollAmount={25}>
          <Row className='my-5' >

           { 
                homeProjects?.length>0?homeProjects.map(project=>(

                <Col sm={12} md={6} lg={4} >
                  <ProjectCard project={project} />
                </Col>

           )) :null
            
           }
          </Row>
       </marquee>

       <div className='text-center '>
        <Link className='text-decoration-none' to={'/projects'}>View More Projects</Link>

       </div>

      </div>

      
    </>
  )
}

export default Home