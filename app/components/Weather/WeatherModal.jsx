import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Modal } from 'antd'

class WeatherModal extends Component {
  componentDidMount () {
    this.props.router.push(`/${this.props.city.city}`)
  }
  onOk = () => {
    this.props.handleCancel()
    this.props.router.push('/')
  }
  render () {
    return (
      <Modal
        onCancel={this.onOk}
        title={`${this.props.city.city}`}
        onOk={this.onOk}
        cancelText='CANCEL'
        okText='OK'
        visible
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    )
  }
}
WeatherModal.propTypes = {
  handleCancel: React.PropTypes.func,
  router: React.PropTypes.object,
  city: React.PropTypes.object
}
export default withRouter(WeatherModal)
