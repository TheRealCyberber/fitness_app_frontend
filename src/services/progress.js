import Client from './api'

export const GetProgress = async () => {
  try {
    const res = await Client.get('/progress')
    return res.data
  } catch (error) {
    throw error
  }
}

export const AddProgress = async (data) => {
  try {
    const res = await Client.post('/progress', data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const UpdateProgress = async (id, data) => {
  try {
    const res = await Client.put(`/progress/${id}`, data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const DeleteProgress = async (id) => {
  try {
    const res = await Client.delete(`/progress/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}