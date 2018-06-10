import React, { Component } from 'react'
import axios from 'axios'
import Route from './Route'
import './../css/RouteList.css'

class RouteList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      routeList: null
    }
  }

  componentDidMount() {
    let routeList = null

    const url = `http://localhost:8080/routes`
    axios
      .get(url)
      .then((res) => {
        routeList = res.data
        this.setState({ routeList })
      })
      .catch((error) => { console.log('WE GOT ERROR', error) })
  }

  renderRouteList = () => {
    const routeList = this.state.routeList
    if (!routeList) return <p>Not found</p>

    let keys = Object.keys(routeList)
    let routeListJSX = []

    keys.forEach(key => {
      let route = routeList[key]
      routeListJSX.push(<Route key={key} route={route} />)
    })

    return routeListJSX
  }

  render() {
    return (
      <div className="RouteList">
      <button className="right light-green darken-2">Ask for a ride </button>
        {this.renderRouteList()}
      </div>
    )
  }
}

export default RouteList
