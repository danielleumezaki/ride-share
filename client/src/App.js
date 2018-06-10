import React, { Component } from 'react'
import RouteFilter from './components/RouteFilter'
import Map from './components/Map'
import Navbar from './components/Navbar'
import RouteList from './components/RouteList'
import RouteEdit from './components/RouteEdit'
import './App.css'

const loggedInUser = { _id: '2', name: 'Angelic Hazzard', score: 7.8 }

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isShowList: false,
      isShowAddNewRoute: false,
      isShowMap: true
    }
  }

  checkboxHandler = (value) => {
    this.setState({
      isShowList: !!value
    })
  }

  renderMapOrList = () => {
    if (this.state.isShowList) {
      return <RouteList />
    } else {
      if (this.state.isShowMap) {
        return <Map isShowRoutes={true} clickMap={this.clickMap}/>
      } else {
        return null
      }
    }
  }

  clickMap = (coordinates) => {
    console.log(coordinates.lat, coordinates.lng)
  }

  addNewRouteHandler = () => {
    let isShowAddNewRoute = !this.state.isShowAddNewRoute
    let isShowMap = !this.state.isShowMap
    this.setState({
      isShowAddNewRoute,
      isShowMap
    })
  }

  newRoute = (route) => {
    console.log('NEW ROUTE: ' + route)
  }

  renderAddNewRouteOrNot = () => {
    if (this.state.isShowAddNewRoute) {
      return <RouteEdit addDate={this.addDate} loggedInUser={loggedInUser} isShowAddNewRoute={this.isShowAddNewRoute} editMapHandler={this.editMapHandler} newRoute={this.newRoute}/>
    } else {
      return null
    }
  }

  editMapHandler = () => {
    this.setState({
      isShowAddNewRoute: !this.state.isShowAddNewRoute,
      isShowMap: !this.state.isShowMap
    })
  }

  render() {
    return (
      <div className="container-fluid">
        <Navbar/>
        <RouteFilter checkboxHandler={this.checkboxHandler} addNewRouteHandler={this.addNewRouteHandler}/>
        {this.renderMapOrList()}
        {this.renderAddNewRouteOrNot()}
      </div>
    )
  }
}

export default App
