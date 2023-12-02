import React, { useContext, useState } from 'react'
import { Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import loginimg from '../Assets/login-img.png'
import signupimg from '../Assets/Signup-img.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAPI, registerAPI } from '../services/allAPI'
import { tokenAuthorisationContext } from '../contexts/TokenAuth'






function Auth({register}) {

    const {isAuthorised,setIsAuthorised} = useContext(tokenAuthorisationContext)
    const isRegisterForm = register?true:false

    const navigate = useNavigate()

    const [userdata, setuserdata] = useState({
        username:"",email:"",password:""
    })

    const handleRegister = async (e)=>{

        e.preventDefault()
        const {username,email,password} = userdata
        if(!username || !email || !password){
            toast.info("Please fill the Form completelty")
        }else{
            const result = await registerAPI(userdata)
            if (result.status===200) {
                toast.success(`${result.data.username} has registered successfully `)
                
                setuserdata({
                    username:"",email:"",password:""
                })
                navigate('/login')
                
                
            }else{
                toast.warning(result.response.data)
                console.log(result);
            }
        }



    }


    const handleLogin = async (e)=>{

        e.preventDefault()
        const {email,password} = userdata
        if( !email || !password){
            toast.info("Please fill the Form completelty")
        }else{
            const result = await loginAPI(userdata)
            if (result.status===200) {
                // toast.success(`${result.data.username} has registered successfully `)
                sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
                sessionStorage.setItem("token",result.data.token)
                setIsAuthorised(true)
                setuserdata({
                   email:"",password:""
                })
                navigate('/')
                
                
            }else{
                toast.warning(result.response.data)
                console.log(result);
            }
        }



    }

 
 
return (
    <div style={{width:'100%',height:'100vh'} } className='d-flex justify-content-center align-items-center '  >

       <div className='w-75 container'> 
      
       <div className='d-flex'> <Link to={'/'} className='text-primary fw-bold d-flex justify-content-center align-items-center' style={{textDecoration:'none'}} ><i class="fa-solid fa-arrow-left me-1 "></i>Back To Home</Link></div>
    
       <div className="card shadow p-5 bg-primary">
        <div className="row align-items-center">
            
            <div className="col-lg-6">

            {
                            isRegisterForm ? <img src={signupimg} className='img-fluid' alt="" />:<img src={loginimg } className='img-fluid' alt="" />
            }

                
            
            </div>

            <div className="col-lg-6">
                <div className="d-flex align-items-center flex-column">
                    <h1 className="fw-bolder text-light mt-2"><i class="fa-brands fa-stack-overflow fa-fade me-2"></i>Project Fair</h1>
                    <h5 className="fw-bolder mt-2 pb-3 text-light">
                        {
                            isRegisterForm ? 'sign up to your Account':'Sign In to your Account'
                        }
                    </h5>

                    <Form className='text-light w-100' >
                    {    
                        isRegisterForm &&   
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter Username" value={userdata.username} onChange={e=>setuserdata({...userdata,username:e.target.value})} />
                        </Form.Group>
                    }
                    
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={userdata.email} onChange={e=>setuserdata({...userdata,email:e.target.value})}  />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="Password" placeholder="Enter Password" value={userdata.password} onChange={e=>setuserdata({...userdata,password:e.target.value})} />
                    </Form.Group>

                        {
                            isRegisterForm ? 
                            <div>
                                <button className="btn btn-secondary mb-3 text-black" onClick={handleRegister} >Register</button>
                                

                                <p >Already have Account? then <Link to={'/login'} className='text-black'  >Login</Link></p>
                            
                            </div>:
                            <div>
                            <button className="btn  btn-secondary mb-3 text-black" onClick={handleLogin} >Login</button>


                            <p>New User? then <Link to={'/register'} className='text-black'  >Register</Link></p>
                        
                            </div>
                        }

                    </Form>


                </div>
                
            </div>   

        </div>
       </div>
       </div>
       <ToastContainer position="top-right"
autoClose={5000} theme="colored" />
    </div>
  )
}

export default Auth