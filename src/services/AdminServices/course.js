import config from "../config"
import axios from "axios"

export async function getAllCourses(token){
    const url=config.BASE_URL+'/courses'

    const headers={token}
    const result= await axios.get(url,{headers})
    return result.data

}

export async function getActiveCourses(token){
       const url=config.BASE_URL+'/courses/active_course'

    const headers={token}
    const result= await axios.get(url,{headers})
    return result.data

}

export async function addCourses(token,data){
    const url= config.BASE_URL+'/courses/add'
    const body=data
    const headers={token}

    const response = await axios.post(url, body, { headers })
    return response.data
}

export async function deleteCourse(token,id){
    const url=config.BASE_URL+`/courses/delete/${id}`
    const headers={token}
    const result= await axios.delete(url,{headers})
    return result.data
}

export async function updateCourseDetails(id,data,token){
    const url=config.BASE_URL+`/courses/update/${id}`
    const body=data
    const headers={token}
    const result= await axios.put(url,body,{headers})
    return result.data
}