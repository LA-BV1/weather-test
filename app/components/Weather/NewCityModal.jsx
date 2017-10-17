import React, { Component } from 'react'
import { Modal, Input } from 'antd'

class NewCityModal extends Component {
  state = {
    newCity: null
  }
  handleCity = e => {
    this.setState({newCity: e.target.value})
  }
  render () {
    return (
      <Modal
        onOk={() => { this.props.handleOk(this.state.newCity) }}
        onCancel={this.props.handleCancel}
        cancelText='CANCEL'
        title='Add city'
        okText='ADD'
        visible
      >
        <Input value={this.state.newCity} onChange={this.handleCity} />
      </Modal>
    )
  }
}
NewCityModal.propTypes = {
  handleCancel: React.PropTypes.func,
  handleOk: React.PropTypes.func
}
export default NewCityModal
