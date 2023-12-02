import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import ProjectCard from '../components/ProjectCard'
import { Col, Row } from 'react-bootstrap'
import { allProjectAPI } from '../services/allAPI'



function Projects() {


  const [allProjects,setAllProjects] = useState()
  const [searchKey,setSearchKey] = useState("")

  const getAllProjects = async ()=>{
    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
      const result = await allProjectAPI(searchKey,reqHeader)
      if (result.status === 200) {
        setAllProjects(result.data)
        
      } else {

        console.log(result);
        
      }
    }
  }

  useEffect(()=>{

    getAllProjects()

  },[searchKey])




  return (
    <>
    <Header/>

    <div  className="project " style={{marginTop:'100px'}} >

      <h1 className="text-center mb-5">All Projects</h1>
      <div className="d-flex justify-content-center align-items-center w-100">
        <div className="d-flex border w-50 rounded-pill  ">
          <input type="text" className='form-control rounded-pill' placeholder='Search project by its Technologies' onChange={e=>setSearchKey(e.target.value)}  />
          <i style={{marginLeft:'-40px'}} class="fa-solid fa-magnifying-glass fa-rotate-90  "></i> 

        </div>
      </div>
      <Row className='mt-5 container-fluid'>

        

            { 
                allProjects?.length>0?allProjects?.map(project=>(
                  <Col sm={12} md={6} lg={4}>
                    <ProjectCard project={project} />
                  </Col>

                )): <p style={{fontSize:'60px'}} className=' fw-bolder text-primary text-center '>Please Login...</p>

             
            }
      

      </Row>

    </div>


    
    
    
    </>
  )
}

export default Projects