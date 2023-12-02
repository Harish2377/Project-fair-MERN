import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap'
import userimg from '../Assets/user.png'
import { BASE_URL } from '../services/baseurl';
import { editUserAPI } from '../services/allAPI';





function Profile() {
  const [open, setOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({
    username:"",email:"",password:"",profile:"",github:"",linkedin:""
  })
  const [existingImage,setExistingImage]  = useState("")
  const [preview,setPreview] = useState("")

  useEffect(()=>{
      const user = JSON.parse(sessionStorage.getItem("existingUser"))
   
      setUserProfile({...userProfile,username:user.username,email:user.email,password:user.password,profile:"",github:user.github,linkedin:user.linkedin})
      setExistingImage(user.profile)
      
      // if (user.profile!=="") {
      
    // } else {

    //   setExistingImage(userimg)
      
    // }
    
  },[open])

  useEffect(()=>{
    if (userProfile.profile) {

      setPreview(URL.createObjectURL(userProfile.profile))
      
    } else {

      setPreview("")
      
    }
  },[userProfile.profile])

  const handleProfileUpdate = async ()=>{
    const {username,email,password,profile,github,linkedin} = userProfile
    if (!github || !linkedin) {

      alert("please fill the form completely")
      
    } else {

      const reqBody = new FormData()
      reqBody.append("username",username)
      reqBody.append("email",email)
      reqBody.append("password",password)
      reqBody.append("profile",profile)
      reqBody.append("github",github)
      reqBody.append("linkedin",linkedin)
      preview?reqBody.append("profileImage",profile):reqBody.append("profileImage",existingImage)
      const token = sessionStorage.getItem("token")
      
      if (preview) {

        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }

        const res = await editUserAPI(reqBody,reqHeader)
        if(res.status===200){
          setOpen(!open)
          sessionStorage.setItem("existingUser",JSON.stringify(res.data))
        }else{

          setOpen(!open)
          console.log(res);
          console.log(res.response.data);
        }
        
      } else {

        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
        
      }
    }
  }



  return (
    
    <div className='card shadow p-5 ' style={{marginTop:'63px'}} >
      
      <div className='d-flex justify-content-between' > 
        <h1> Profile</h1>
        <button className="btn btn-outline-primary" onClick={() => setOpen(!open)}>
        <i class="fa-solid fa-chevron-down fa-beat-fade"></i>
        </button>
        
        </div>
       <Collapse in={open}>
          <div className='row justify-content-center mt-3' >
  
            {/* upload picture */}
          <div className='text-center'>
              <label >
                <input style={{display:'none'}} type='file' onChange={e=>setUserProfile({...userProfile,profile:e.target.files[0]})} />
                {
                  existingImage!==""?
                <img width={'200px'} height={'200px'} className='rounded-circle' src={preview?preview:`${BASE_URL}/uploads/${existingImage}`} alt="upload picture" />: 
                <img width={'200px'} height={'200px'} className='rounded-circle' src={preview?preview:userimg} alt="upload picture" />
               }
              </label>
          </div>
            <div className="mt-3">
              <input type="text" className='form-control' value={userProfile.github} onChange={e=>setUserProfile({...userProfile,github:e.target.value})} placeholder='Github' />
            </div>
            <div className="mt-3">
              <input type="text" className='form-control' value={userProfile.linkedin} onChange={e=>setUserProfile({...userProfile,linkedin:e.target.value})} placeholder='LinkedIn' />
            </div>
            <div className="mt-3  ">
              <button className='btn btn-primary float-end ' onClick={handleProfileUpdate} >Update</button>
            </div>

  
          </div>
       </Collapse>
    </div>

  )
}

export default Profile