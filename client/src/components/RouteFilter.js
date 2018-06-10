import React, { Component } from 'react'
import './../css/RouteFilter.css'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

class RouteFilter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDriving: true,
      value: 30
    }
  }

  drivingClicked = () => {
    this.setState({ isDriving: true })
  }

  ridingClicked = () => {
    this.setState({ isDriving: false })
  }

  checkboxHandler = () => {
    this.props.checkboxHandler(this.checkbox.checked)
  }

  handleChange = (value) => {
    this.setState({
      value: value
    })
  }

  addNewRouteHandler = () => {
    this.props.addNewRouteHandler()
  }

  render() {
    const { value } = this.state
    const { isDriving } = this.state
    const isDrivingSelectedClassName = isDriving ? "filter-selection selected" : "filter-selection"
    const isRidingSelectedClassName = isDriving ? "filter-selection" : "filter-selection selected"


    return (
      <div className="RouteFilter">
      <div className="row">
        <div className="rider-driver">
          <p className={isDrivingSelectedClassName} onClick={this.drivingClicked}>I am Driving</p>
          <p className={isRidingSelectedClassName} onClick={this.ridingClicked}>I am Riding</p>
        </div>
        </div>
        <a className="waves-effect waves-light btn light-green darken-2 add white-text addNew" onClick={this.addNewRouteHandler}>Add New Route</a>
        <div>
          <label>
            <input type="checkbox" id="showList" onClick={this.checkboxHandler} ref={el => this.checkbox = el} />
            <span>Show list?</span>
          </label>

        </div>
        {/* <div className="filter-days">
          <p>Time to ride:</p>
          <input className="filter-days-range" type="range" step="10" />
        </div> */}
        <div className='slider'>
          <Slider
            min={10}
            max={60}
            step={10}
            value={value}
            onChange={this.handleChange}
          />
          <div className='value'>Leaving in {value} min</div>
        </div>
        <br/>
        
      </div>
    )
  }
}

export default RouteFilter
