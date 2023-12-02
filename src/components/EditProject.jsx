import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { BASE_URL } from '../services/baseurl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editProjectAPI } from '../services/allAPI';
import { editProjectResponseContext } from '../contexts/ContextShare';


function EditProject({project}) {

  const {editProjectResponse,setEditProjectResponse} = useContext(editProjectResponseContext)
    const [show, setShow] = useState(false);
    const [projectDetails,setprojectDetails] = useState(
        { id:project._id, title:project.title, language:project.language, overview:project.overview, github:project.github, website:project.website, projectimage:""  }
      );
    const [preview,setPreview] = useState("")




    const handleClose = () => {

        setShow(false);
        setprojectDetails( { id:project._id, title:project.title, language:project.language, overview:project.overview, github:project.github, website:project.website, projectimage:""})
        setPreview("")

    
    
    }
     
    const handleShow = () => setShow(true);

    useEffect(()=>{
      if(projectDetails.projectimage){
        setPreview(URL.createObjectURL(projectDetails.projectimage))
      }
    },[projectDetails.projectimage])


    const handleUpdate = async () =>{

      const {id,title,language,github,website,overview,projectimage} = projectDetails

      if (!title || !language ||  !overview || !github || !website ) {
        
        toast.info("Plaease Fill the from completely")

      }else{
        const reqBody =  new FormData()
        reqBody.append("title",title)
        reqBody.append("language",language)
        reqBody.append("overview",overview)
        reqBody.append("github",github)
        reqBody.append("website",website)
        preview?reqBody.append("projectimage",projectimage):reqBody.append("projectimage",project.projectimage)

        const token = sessionStorage.getItem("token")
        if (preview) {

          const reqHeader = {

            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`


          }
          // api call
          const result = await editProjectAPI(id,reqBody,reqHeader)
          if (result.status===200) {
            handleClose()
            //pass response to my projects
            setEditProjectResponse(result.data)
            
          } else {

            console.log(result);
            toast.error(result.response.data)
            
          }


          
        } else {

          const reqHeader = { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
          }

          // api call
          const result = await editProjectAPI(id,reqBody,reqHeader)
          if (result.status===200) {
            handleClose()
            //pass response to my projects
            setEditProjectResponse(result.data)
            
          } else {

            console.log(result);
            toast.error(result.response.data)
            
          }
          
        }

      }




    }




  return (
    <>

        <button onClick={handleShow} className='btn'><i className="fa-solid fa-pen-to-square fa-2x"></i></button>

        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row  ">

            <div className="col-lg-6 align-self-center">
              <label >  <input type='file' style={{display:'none'}} onChange={e=>setprojectDetails({...projectDetails,projectimage:e.target.files[0]})}   /> <img width={'325px'} height={'325px'}  src={preview?preview:`${BASE_URL}/uploads/${project.projectimage}`} alt="project picture"  /> </label>
            </div>
            <div className="col-lg-6 align-self-center ">

              <div className='mb-3'>  <input type="text" className='form-control' placeholder='Project Title' onChange={e=>setprojectDetails({...projectDetails,title:e.target.value})} value={projectDetails.title} /></div>

              <div className='mb-3'> <input type="text" className='form-control' placeholder='Language Used' onChange={e=>setprojectDetails({...projectDetails,language:e.target.value})} value={projectDetails.language}   /></div>

              <div className='mb-3'> <input type="text" className='form-control' placeholder='Git-hub Link' onChange={e=>setprojectDetails({...projectDetails,github:e.target.value})}  value={projectDetails.github}  /></div>

              <div className='mb-3'> <input type="text" className='form-control' placeholder='Website Link' onChange={e=>setprojectDetails({...projectDetails,website:e.target.value})} value={projectDetails.website}  /></div>

              <div className='mb-3'> <input type="text" className='form-control' placeholder='Project Overview' onChange={e=>setprojectDetails({...projectDetails,overview:e.target.value})}  value={projectDetails.overview}  /></div>

            </div>

            

          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleUpdate} >Update</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position="top-right"
                autoClose={5000} theme="colored" />

    </>
  )
}

export default EditProject