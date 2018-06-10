import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import './../css/map.css'
import axios from 'axios'

const MapMarker = ({ text }) => <div>{text}</div>

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 49.285038,
      lng: -123.11458
    },
    zoom: 11
  }

  constructor(props) {
    super(props)
    this.map = null
    this.maps = null
  }

  componentDidUpdate() {
    if (!this.map || !this.maps) return
    const { newRoute } = this.props
    if (!newRoute) return
    this.renderRoute(newRoute.from.lat, newRoute.from.lng, newRoute.to.lat, newRoute.to.lng)
  }

  clickMap = e => {
    this.props.clickMap(e)
  }

  apiIsLoaded = (map, maps) => {
    this.map = map
    this.maps = maps
    if(!map) { console.log('no map found'); return }
    if (!(this.props.isShowRoutes)) return
    let routeList = null
    const url = `http://localhost:8080/routes`
    axios
      .get(url)
      .then((res) => {
        routeList = res.data
        let routeKeys = Object.keys(routeList)
        console.log('route kesy: ', routeKeys)
        routeKeys.forEach(key => {
          const route = routeList[key]
          this.renderRoute(route.from.lat, route.from.lng, route.to.lat, route.to.lng)
        })
      })
      .catch((error) => { console.log('WE GOT ERROR', error) })
  }

  renderRoute = (fromLat, fromLng, toLat, toLng) => {
    if (!(fromLat && fromLng && toLat && toLng)) return
    const maps = this.maps
    const map = this.map
    const directionsService = new maps.DirectionsService()
    const directionsDisplay = new maps.DirectionsRenderer()
    const fromLatLng = new maps.LatLng(fromLat, fromLng)
    const toLatLng = new maps.LatLng(toLat, toLng)

    directionsService.route({
      origin: fromLatLng, destination: toLatLng, travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        directionsDisplay.setMap(map)
        directionsDisplay.setDirections(response)
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  render() {
    return (
      <div className="Map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDoFWSUFMKT7bDBXNhzwyzZMWyI3g0s0IE' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onClick={e => { this.props.clickMap(e) }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.apiIsLoaded(map, maps)}
          >

          {/* <MapMarker lat={49.285038} lng={-123.11458} text= {'Marker'} /> */}
          </GoogleMapReact>


      </div>
    )
  }
}

export default Map
