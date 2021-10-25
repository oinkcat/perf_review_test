import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

import { UserContext } from './UserContext';

import './NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">
                            &#9734; PerfReviewsTest
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />

                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                <UserContext.Consumer>{this.renderNavBarItems}</UserContext.Consumer>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }

    renderNavBarItems(context) {
        return context.data.userName ? (
            <ul className="navbar-nav flex-grow">
                {
                    context.data.isAdmin ? (
                        <React.Fragment>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/users">Employees</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/reviews">Reviews</NavLink>
                            </NavItem>
                        </React.Fragment>

                    ) : (
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/ratings">Feedbacks</NavLink>
                        </NavItem>
                    )
                }
                <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/">
                        Logout ({context.data.userName})
                    </NavLink>
                </NavItem>
            </ul>
        ) : null;
    }
}
