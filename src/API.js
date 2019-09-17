import { create } from 'apisauce'

// define the api
const API = create({
  baseURL: 'http://localhost:3004/words'
})

export default API
