import React, { Component } from 'react'
import './../css/RouteEdit.css'
import Map from './Map'
import ReverseGeocode from './ReverseGeocode'
import axios from 'axios'

class RouteEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isShowMapFrom: false,
      isShowMapTo: false,
      fromLat: 0,
      fromLng: 0,
      toLat: 0,
      toLng: 0
    }
  }

  handleForm = () => {
    let dateString = this.inputDate.value
    let date = this.toDate(dateString)

    let route = {
      user: this.props.loggedInUser,
      from: { lat: this.state.fromLat, lng: this.state.fromLng },
      to: { lat: this.state.toLat, lng: this.state.toLng },
      date: date.getTime(),
      totalSeats: Number(this.inputSeat.value),
      ridingWith: []
    }
    this.props.editMapHandler()
    axios
      .post('http://localhost:8080/route', route)
      .then(response => {
        this.props.newRoute(route)
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  toDate(dateStr) {
    const [day, month, year] = dateStr.split('/')
    return new Date(year, month - 1, day)
  }

  handleFrom = () => {
    let isShowMapFrom = !this.state.isShowMapFrom
    this.setState({
      isShowMapFrom
    })
  }

  handleFromClickMap = coordinates => {
    console.log(coordinates.lat, coordinates.lng)
    this.setState({
      isShowMapFrom: false,
      fromLat: coordinates.lat,
      fromLng: coordinates.lng
    })
  }

  handleTo = () => {
    let isShowMapTo = !this.state.isShowMapTo
    this.setState({
      isShowMapTo
    })
  }

  handleToClickMap = coordinates => {
    console.log(coordinates.lat, coordinates.lng)
    this.setState({
      isShowMapTo: false,
      toLat: coordinates.lat,
      toLng: coordinates.lng
    })
  }

  renderisShowMapFromOrNot = () => {
    if (this.state.isShowMapFrom) {
      return <Map clickMap={this.handleFromClickMap} />
    } else {
      return null
    }
  }

  renderisShowMapToOrNot = () => {
    if (this.state.isShowMapTo) {
      return <Map clickMap={this.handleToClickMap} />
    } else {
      return null
    }
  }

  handleSeats = e => {
    console.log(e.target.value)
  }

  render() {
    console.log(this.props.loggedInUser.name)
    return (
      <div className="RouteEdit">
        <h3>{this.props.loggedInUser.name}</h3>
        <form className="col s12" name="formNewName">
          <input placeholder="Date" type="text" className="validate" ref={el => this.inputDate = el} />
          <label>Month/Day/Year</label>
        </form>
        <div className="editMap">
          {this.renderisShowMapFromOrNot()}
          {this.renderisShowMapToOrNot()}
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">Seat Available</label>
          <select className="form-control" id="exampleFormControlSelect1" ref={el => this.inputSeat = el}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <div className="row">
          <a className="waves-effect waves-light btn blue lighten-2 white-text from" onClick={this.handleFrom}>from</a>
          <ReverseGeocode lat={this.state.fromLat} lng={this.state.fromLng} />
        </div>
        <div className="row">
          <a className="waves-effect waves-light btn blue lighten-2 white-text to" onClick={this.handleTo}>to</a>
          <ReverseGeocode lat={this.state.toLat} lng={this.state.toLng} /><br />
        </div>
        <div className="row">
          <div className="col-6">
            <a className="right waves-effect waves-light btn light-green white-text submit" onClick={this.handleForm}>submit</a>
          </div>
          <div className="col-6">
            <a className="right waves-effect waves-light btn red darken-3 cancel white-text">cancel</a>
          </div>
        </div>

      </div>
    )
  }
}

export default RouteEdit
