import axios from 'axios'
import config from '../config'

export async function getVideosByCourse(course_id,token) {
    const URL = `${config.BASE_URL}/video/my-videos/${course_id}`;

console.log(URL)
    const headers={token}
    const response = await axios.get(URL,{headers})
console.log(response.data)
    return response.data
}