import axios from "axios";
import config from "../config";

export async function getmycourses(token) {
    const URL =config.BASE_URL+"/student/my-courses"
    const headers={token}
    const response = await axios.get(URL,{headers})
    return response.data
}

export async function getmycourseswithvideo(token) {
    const URL =config.BASE_URL+"/student/my-courses_with_video"
    const headers={token}
    console.log(token)
    const email=sessionStorage.getItem("email")
    const body={email}
    const response = await axios.get(URL,body,{headers})
    return response.data
}