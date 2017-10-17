import { getAddress, getWeather } from 'project-services'
import { Table, Button, Popconfirm, Spin } from 'antd'
import NewCityModal from './NewCityModal.jsx'
import WeatherModal from './WeatherModal.jsx'
import React, { Component } from 'react'
import './Weather.styl'

class Weather extends Component {
  state = {
    isCurrentCityWeatherLoading: true,
    currentWeather: null,
    currentCity: null,
    citiesLength: 0,
    allCities: []
  }
  componentDidMount () {
    const allCities = JSON.parse(localStorage.getItem('allCities')) || []
    if (this.props.params.city) {
      const currentCity = allCities.find(i => i.city === this.props.params.city)
      this.setState({currentCity})
    }
    navigator.geolocation.getCurrentPosition(async position => {
      let rest = await getAddress(position.coords)
      if (rest.status === 'OK') {
        this.setState({currentAddress: rest && rest.results[0] && rest.results[0].formatted_address})
      }
      rest = await getWeather(position.coords)
      const stateObj = {
        isCurrentCityWeatherLoading: false,
        currentWeather: {
          temp: (rest.main.temp - 273.15).toFixed(0),
          humidity: rest.main.humidity,
          country: rest.sys.country,
          wind: rest.wind.speed,
          city: rest.name
        }
      }
      if (rest.weather && rest.weather[0]) {
        stateObj.currentWeather.weather = {
          description: rest.weather[0].description,
          main: rest.weather[0].main
        }
      }
      this.setState(stateObj)
    })
    this.setState({allCities, citiesLength: allCities.length})
  }
  saveLocally = allCities => {
    localStorage.setItem('allCities', JSON.stringify(allCities))
  }
  saveCity = newCity => {
    const { allCities } = this.state
    allCities.push({city: newCity})
    this.setState({allCities, citiesLength: allCities.length})
    this.saveLocally(allCities)
    this.closeSaveCityModal()
  }
  deleteCity = current => {
    const allCities = this.state.allCities.filter(i => i.city !== current.city)
    this.setState({allCities})
    this.saveLocally(allCities)
  }
  getTableData = () => {
    return {
      locale: {emptyText: 'There is no any cities!'},
      columns: [
        {
          dataIndex: 'city',
          title: 'City',
          render: (city, currentCity) => <a onClick={() => this.setState({currentCity})}>{city}</a>
        },
        {
          render: item => (
            <Popconfirm
              onConfirm={() => this.deleteCity(item)} okText='Yes' cancelText='No'
              title='Are you sure you want to delete city'>
              <a>Delete</a>
            </Popconfirm>
          )

        }
      ],
      dataSource: this.state.allCities,
      rowKey: 'city'
    }
  }
  closeSaveCityModal = () => {
    this.setState({isModalNewCityVisible: false})
  }
  render () {
    const { currentWeather } = this.state
    return (
      <div>
        <Spin spinning={this.state.isCurrentCityWeatherLoading}>
          {currentWeather && (
            <div className='weather'>
              <div className='city'>{currentWeather.city + ', ' + currentWeather.country}</div>
              <div className='main'>{currentWeather.weather.main + ', ' + currentWeather.temp}<sup>o</sup></div>
              <div className='description'>{currentWeather.weather.description + ', ' + currentWeather.humidity + '% humidity and ' + currentWeather.wind + ' km/h wind speed.'}</div>
            </div>
          )}
        </Spin>
        <div>Cities count: {this.state.citiesLength}</div>
        <Button
          onClick={() => { this.setState({isModalNewCityVisible: true}) }}
          type='primary'>Add city</Button>
        <Table {...this.getTableData()} />
        {this.state.currentCity && <WeatherModal
          handleCancel={() => this.setState({currentCity: null})}
          city={this.state.currentCity} />}
        {this.state.isModalNewCityVisible && <NewCityModal
          handleCancel={this.closeSaveCityModal}
          handleOk={this.saveCity} />}
      </div>
    )
  }
}
Weather.propTypes = {
  params: React.PropTypes.object
}
export default Weather
