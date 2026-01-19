import config from '../config'
import axios from 'axios'
   

export async function getVideosByCourse(course_id,token) {
    const URL = `${config.BASE_URL}/video/my-videos/${course_id}`;


    const headers={token}
    const response = await axios.get(URL,{headers})

    return response.data
}

export async function getAllVideos(token) {
   const URL = config.BASE_URL + "/video/all-videos";

    const headers={token}
    const response = await axios.get(URL,{headers})

    return response.data
}

export async function deleteVideo(id, token) {
  const URL = `${config.BASE_URL}/video/delete/${id}`;

  const response = await axios.delete(URL, {
    headers: { token }
  });

  return response.data;
}

export async function newvideo(token,videodata) {
    const URL=config.BASE_URL +'/video/add'
    const headers={token}
    const body=videodata
    const response = await axios.post(URL,body,{headers})
    return response.data
}

export async function updateVideo(id, token, data) {
  const URL = `${config.BASE_URL}/video/update/${id}`
  const headers ={token}
  const response = await axios.put(URL, data, {headers})
  console.log(response)
  return response.data
}