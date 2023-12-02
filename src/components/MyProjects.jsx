import React, { useContext, useEffect, useState } from 'react'
import AddProject from './AddProject'
import { deleteProjectAPI, userProjectAPI } from '../services/allAPI'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectResponseContext, editProjectResponseContext } from '../contexts/ContextShare';
import EditProject from './EditProject';



function MyProjects() {

const {editProjectResponse,setEditProjectResponse} = useContext(editProjectResponseContext)
const { addProjectResponse,setaddProjectResponse } = useContext(addProjectResponseContext)
const [userProject,setUserProject] = useState([])




const getUserProjects = async () => {

  if (sessionStorage.getItem("token")) {

    const token = sessionStorage.getItem("token")

    
    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
    const result = await userProjectAPI(reqHeader)

    if (result.status===200) {

      setUserProject(result.data)

      
    } else {

      console.log(result);
      toast.warning(result.response.data);
      
    }


    
  }

}


const handleDelete = async (id)=>{

  const token = sessionStorage.getItem("token")
  const reqHeader = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  }
  //api call
  const result = await deleteProjectAPI(id,reqHeader)

  if (result.status===200) {

    //page reload
    getUserProjects()
    
  } else {

    console.log(result);
    toast.warning(result.response.data);
    
  }

}


useEffect(()=>{

  getUserProjects()

},[addProjectResponse,editProjectResponse])



  return (
    <div className='card shadow p-3 mt-3 '>
      
      <div className='d-flex '>
        <h2>MyProjects</h2>
        <div className="ms-auto"><AddProject/></div>
      </div>
        
        
    <div className="mt-4">

         
    {userProject?.length>0? userProject.map(project=>(
                <div className='border d-flex align-items-center rounded p-2 mb-2 text-primary'>
                <h5>{project.title}</h5>
                <div className='d-flex icon ms-auto'>

                    <EditProject project = {project} /> 

                    <a href={`${project.github}`} target="_blank" className='btn'><i className="fa-brands fa-github fa-2x"></i></a>

                    <button className='btn' onClick={()=>handleDelete(project._id)} ><i className="fa-solid fa-trash fa-2x"></i></button>

                </div>
            </div>

            )):<p>No Project Upload Yet...</p>}



        </div>

        <ToastContainer position="top-right"
                autoClose={5000} theme="colored" />
      
    </div>
  )
}

export default MyProjects