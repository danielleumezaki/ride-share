import React, { Component } from 'react'
import axios from 'axios'
import './../css/ReverseGeocode.css'

class ReverseGeocode extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: ''
    }
  }

  componentDidUpdate() {
    const { lat, lng } = this.props
    const url = `http://localhost:8080/reverseGeocode/${lat}/${lng}`

    axios
      .get(url)
      .then(res => {
        let address = this.state.address
        if (address !== res.data.address) {
          this.setState({ address: res.data.address })
        }
      })
      .catch(error => {
      })    
  }

  componentWillMount() {
    const { lat, lng } = this.props
    const url = `http://localhost:8080/reverseGeocode/${lat}/${lng}`

    axios
      .get(url)
      .then(res => {
        this.setState({ address: res.data.address })
      })
      .catch(error => {
      })
  }

  render() {
    return <span>{this.state.address}</span>
  }
}

export default ReverseGeocode
