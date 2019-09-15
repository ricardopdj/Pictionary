import { create } from 'apisauce'

// define the api
const API = create({
  baseURL: 'http://localhost:3000/search-json?random=true'
})

export default API
