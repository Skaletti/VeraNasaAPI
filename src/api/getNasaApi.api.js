import axios from "axios";


const TOKEN_API = import.meta.env.VITE_TOKEN_API

const instance = axios.create({
  baseURL: 'https://api.nasa.gov/mars-photos/api/v1',
  params: {
    api_key: TOKEN_API
  },
});

export async function getRoverPhotos(roverName, params) {
  try {
    const { data } = await instance({
      method: 'GET',
      url: `/rovers/${roverName}/photos`,
      params
    })

    // console.log(data)
    return [null, data]
  } catch (error) {
    return [error]
  }
}


