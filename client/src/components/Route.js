import React, { Component } from 'react'
import ReverseGeocode from './ReverseGeocode'
import './../css/Route.css'

class Route extends Component {
  render() {
    const { route } = this.props

    return (
      <div className="Route">

      <table>
        <tbody>
        <tr>
          <td>Driver / Score</td>
          <td>{route.user.name} [ {route.user.score} ]</td>
        </tr>
        <tr>
          <td>From</td>
          <td><ReverseGeocode lat={route.from.lat} lng={route.from.lng} /></td>
        </tr>
        <tr>
          <td>To</td>
          <td><ReverseGeocode lat={route.to.lat} lng={route.to.lng} /></td>
        </tr>
        <tr>
          <td>Remaining Seats</td>
          <td>{route.remainingSeats}</td>
        </tr>
        </tbody>
      </table>


        {/* Driver: {route.user.name}, Score: {route.user.score}<br />
        From: <ReverseGeocode lat={route.from.lat} lng={route.from.lng} /><br />
        To: <ReverseGeocode lat={route.to.lat} lng={route.to.lng} /><br />
        Total Seats: {route.totalSeats}, Remaining Seats: {route.remainingSeats} */}
      </div>
    )
  }
}

export default Route
