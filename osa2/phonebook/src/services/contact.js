import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(response => response.data)
}

const create = newObj => {
  const req = axios.post(baseUrl, newObj)
  return req.then(response => response.data)
}

const update = (id, newObj) => {
  const req = axios.put(`${baseUrl}/${id}`, newObj)
  return req.then(response => {
  	console.log(response)
  	return response.data
  })
}

const remove = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`)
  return req.then(response => response)
}

export default { getAll, create, update, remove }