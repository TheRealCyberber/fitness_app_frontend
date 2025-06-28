import Client from './api'

export const GetWorkouts = async () => {
  try {
    const res = await Client.get('/workout')
    return res.data
  } catch (error) {
    throw error
  }
}

export const AddWorkout = async (data) => {
  try {
    const res = await Client.post('/workout', data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const UpdateWorkout = async (id, data) => {
  try {
    const res = await Client.put(`/workout/${id}`, data)
    return res.data
  } catch (error) {
    throw error
  }
}


export const DeleteWorkout = async (id) => {
  try {
    const res = await Client.delete(`/workout/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}