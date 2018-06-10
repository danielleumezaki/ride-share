import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './../css/Nav.css'


class Navbar extends Component {
    render() {
        return (
            <div>
                <nav className="nav-extended teal darken-4">
                    <div className="nav-wrapper">
                    <a href="#" class="brand-logo left">RouteShare</a>
                        <a data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/shop">Rides</Link></li>
                            <li><Link to="/cart">Profile</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}
export default Navbar