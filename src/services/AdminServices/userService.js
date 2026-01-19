import config from '../config'
import axios from 'axios'



export async function signIn(email,password){
    const url=config.BASE_URL+'/user/signin'
    const body={email,password}

    const result=await axios.post(url,body)
    return result.data
}

export async function getStudent(token){
const url=config.BASE_URL+'/student/all-stu'
const headers={token}

const result= await axios.get(url,{headers})
return result.data
}