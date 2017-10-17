import mainRequestService from './request.service'

export const getAddress = async ({latitude, longitude}) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAi2Gwg648hJPQqGXOZCC376TaMfP2nSAo`
  const options = {
    mode: 'cors',
    method: 'GET'
  }
  const response = await mainRequestService(url, options)
  return response.status === 200
    ? await response.json()
    : 'error'
}
