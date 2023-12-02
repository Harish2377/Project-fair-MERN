import React, { useState } from 'react'
import { Card, Col, Modal, Row } from 'react-bootstrap'
import projectimg from '../Assets/project-img.jpg'
import { BASE_URL } from '../services/baseurl';




function ProjectCard({project}) {

const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
{
  project&&
<Card className='shadow mb-5 btn' onClick={handleShow}>
      <Card.Img variant="top" src={project?`${BASE_URL}/uploads/${project?.projectimage}`:projectimg} className='p-1' />
      <Card.Body>
        <Card.Title>{project?.title}</Card.Title>
      
        
      </Card.Body>
    </Card>
    
  }


    
    <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>

                <Col md={6}>
                <img style={{height:'200px'}} className='img-fluid' src={project?`${BASE_URL}/uploads/${project?.projectimage}`:projectimg} alt="project image" />

                </Col>

                <Col md={6}>

                    <h2>{project?.title}</h2>
                    <p>Overview: <span className='fw-bolder'>{project?.overview}</span></p>
                    <p>Language Used: <span className='fw-bolder'>{project?.language}</span></p>
                                
                </Col>


            </Row>

                <div className="mt-3 ">
                    <a href={project?.github} target='_blank' className='btn me-3'><i class="fa-brands fa-github fa-beat-fade fa-2x text-primary"></i></a>
                    <a href={project?.website} target='_blank' className='btn me-5'><i class="fa-solid fa-link fa-beat-fade fa-2x text-primary"></i></a>
                </div>

        </Modal.Body>
        
      </Modal>

        
    </>
  )
}

export default ProjectCard