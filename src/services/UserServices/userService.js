import axios from 'axios'
import config from '../config'


export async function loginUser(email, password) {
    const URL = config.BASE_URL + "/user/signin"
    const body = { email, password }
    const response = await axios.post(URL, body) 
    return response.data
}

export async function SignupUser( email, password) {
    const URL = config.BASE_URL + '/user/signup'
    const body = {  email, password }
    const response = await axios.post(URL, body)
    return response.data
}

export async function getAllCourses(token){
    const url=config.BASE_URL+'/courses'
    const headers={token}
    const result= await axios.get(url,{headers})
    return result.data

}
export async function getUserProfile(email, token) {
    
   const url=config.BASE_URL+'/student/show'
    const headers={token, email}
    const result= await axios.get(url,{headers})
    return result.data
   
}

export async function registe_to_course(courseId,email,name,mobileNo,token) {
    const URL = config.BASE_URL+"/student/register-to-course"
    const headers={token}
    const body = { courseId ,email,name,mobileNo}
    const response = await axios.post(URL, body,{headers}) 
    return response.data
}

export async function changePassword(token,email, new_pass, conferm_pass) {
  const url=config.BASE_URL+'/student/change_pass'
    const headers={token}
    console.log("token",token)
    const body= { email, new_pass, conferm_pass }
    const result= await axios.put(url,body,{headers})
    return result.data
  }