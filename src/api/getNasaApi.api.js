import axios from "axios";


const TOKEN_API = import.meta.env.VITE_TOKEN_API

const instance = axios.create({
  baseURL: `https://api.nasa.gov/mars-photos/api/v1/rovers`,
  timeout: 5000,
  params: {
    api_key: TOKEN_API
  },
  headers: { "X-Requested-With": "XMLHttpRequest" },
});
export async function getRoverPhotos(params) {
  try {
    const { data } = await instance({
      method: 'GET',
      url: `/${params.rover_name}/photos`,
      params
    })

    // console.log(data)
    return data
  } catch (error) {
    console.error(error);
  }
}


