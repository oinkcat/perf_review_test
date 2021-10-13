import React, { Component } from 'react';
import { Link } from "react-router-dom";

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
        <div>
            <h1>Employees Performance Review Test!</h1>
            <p className="lead">A small React app</p>

            <ul className="items-list">
                <li>
                    <Link to="/users">Manage Employees</Link>
                </li>
                <li>
                    <Link to="/reviews">Manage Performance Reviews</Link>
                </li>
                <li>
                    <Link to="/ratings">Rate employees</Link>
                </li>
            </ul>
        </div>
    );
  }
}
