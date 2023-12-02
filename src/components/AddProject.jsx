import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectAPI } from '../services/allAPI';
import { addProjectResponseContext } from '../contexts/ContextShare';



function AddProject() {
    const { addProjectResponse,setaddProjectResponse }  =  useContext(addProjectResponseContext)
    const [show, setShow] = useState(false);
    const [token,setToken] = useState("")
    const [projectDetails,setprojectDetails] = useState(
      {  title:"", language:"", overview:"", github:"", website:"", projectimage:""  }
    );

    const [preview,setPreview] = useState("")


    const handleClose = () => {
      
      setShow(false);
      setprojectDetails({ title:"", language:"", overview:"", github:"", website:"", projectimage:"" });
      setPreview("")
    
    }
    const handleShow = () => setShow(true);

    

    useEffect(()=>{
      if (projectDetails.projectimage) {
        setPreview(URL.createObjectURL(projectDetails.projectimage))
        
      }
    },[projectDetails.projectimage])

    
    useEffect(()=>{
      if (sessionStorage.getItem("token")) {
        setToken(sessionStorage.getItem("token"))
        
      } else {
        setToken("")
        
      }
    },[])


    const handleAdd = async (e)=>{
      
      e.preventDefault()

      const { title, language, overview, github, website, projectimage } = projectDetails;

      if (!title || !language ||  !overview || !github || !website || !projectimage) {

        toast.info("Plaease Fill the from completely")


        
      } else {
        const reqBody = new FormData()
        reqBody.append("title",title)
        reqBody.append("language",language)
        reqBody.append("overview",overview)
        reqBody.append("github",github)
        reqBody.append("website",website)
        reqBody.append("projectimage",projectimage)
        
        if (token) {

          const reqHeader = {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
          }
          const result = await addProjectAPI(reqBody,reqHeader)
        if (result.status === 200) {

          console.log(result.data);
          handleClose()
          setaddProjectResponse(result.data)

          
        } else {

          console.log(result);
          toast.warning(result.response.data);
          
        }

          
        }


       
        
       

        
      }

    }

    // console.log(projectDetails);
 

  return (
    <>



<Button variant="primary" onClick={handleShow}>
        Add Project
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row  ">

            <div className="col-lg-6 align-self-center">
              <label >  <input type='file' style={{display:'none'}} onChange={e=>setprojectDetails({...projectDetails,projectimage: e.target.files[0]})}  /> <img width={'325px'} height={'325px'} src={preview?preview:"https://static.thenounproject.com/png/1269202-200.png"} alt="project picture"  /> </label>
            </div>
            <div className="col-lg-6 align-self-center ">

              <div className='mb-3'>  <input type="text" className='form-control' placeholder='Project Title' onChange={e=>setprojectDetails({...projectDetails,title: e.target.value})} value={projectDetails.title} /></div>
              <div className='mb-3'> <input type="text" className='form-control' placeholder='Language Used' onChange={e=>setprojectDetails({...projectDetails,language: e.target.value})} value={projectDetails.language}   /></div>
              <div className='mb-3'> <input type="text" className='form-control' placeholder='Git-hub Link' onChange={e=>setprojectDetails({...projectDetails,github: e.target.value})} value={projectDetails.github}  /></div>
              <div className='mb-3'> <input type="text" className='form-control' placeholder='Website Link' onChange={e=>setprojectDetails({...projectDetails,website: e.target.value})} value={projectDetails.website}  /></div>
              <div className='mb-3'> <input type="text" className='form-control' placeholder='Project Overview' onChange={e=>setprojectDetails({...projectDetails,overview: e.target.value})} value={projectDetails.overview}  /></div>

            </div>

               <ToastContainer position="top-right"
                autoClose={5000} theme="colored" />

          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={ handleAdd } >Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddProject