import mainRequestService from './request.service'

export const getWeather = async ({latitude, longitude}) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=4193f95c110459bdb8e7f556626c50be`
  const options = {
    mode: 'cors',
    method: 'GET'
  }
  const response = await mainRequestService(url, options)
  return response.status === 200
    ? await response.json()
    : 'error'
}
