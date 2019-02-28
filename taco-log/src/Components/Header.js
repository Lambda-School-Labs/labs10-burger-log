
import React, { Component } from 'react';
import {
  Input,
  Form,
  FormGroup,
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';


class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  customlink = (url) => {
    this.props.locationChange()
    this.props.history.push(url)
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand onClick={(e) => this.customlink("/landing/")}>Taco Home</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <Form>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input type="search" name="search" id="search" placeholder="Search Taco" />
                </FormGroup>
              </Form>
              <NavItem>
                <NavLink onClick={(e) => this.customlink("/profile")}>Profile</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={(e) => this.customlink("/home")}>Taco Log</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <NavLink href="/accountsettings">Settings</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    About Us
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                  <Button onClick={this.props.logout}>Log Out</Button>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
