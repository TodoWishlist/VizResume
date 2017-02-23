import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import { Link } from 'react-router';
import { Collapse, Navbar, NavbarToggler, NavbarBrand,
  Nav, NavItem, NavLink, Button, Modal, ModalBody,
  Form, FormGroup, Label, Input } from 'reactstrap';
import styles from './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      modal: false,
    };
    this.toggle = this.toggle.bind(this);
    this.signinToggle = this.signinToggle.bind(this);
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  signinToggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  render() {
    return (
      <header>
        <Navbar color="faded" light toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand href="/" style={{ color: '#d85f5f' }}>&#9774; Viz u resume</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/example">example</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.signinToggle}>Log In</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Modal
          isOpen={this.state.modal} toggle={this.signinToggle}
          className={styles.signinModal}
        >
          <ModalBody>
            <Form action="#" className={styles.formCotainer}>
              <FormGroup className={styles.googleCotainer}>
                <p>
                  <a className={`btn btn-block ${styles.btnSocial} ${styles.btnGoogle}`}>
                    <span className="fa fa-google" />Sign in with Google
                  </a>
                </p>
              </FormGroup>
              <div className={styles.orDivider}>
                <span className={styles.line} />
                <span className={styles.text} >or</span>
                <span className={styles.line} />
              </div>
              <FormGroup className={styles.inputContainer}>
                <div className={styles.formGroup} >
                  <Label className="sr-only" htmlFor="inputEmail">Email</Label>
                  <Input type="email" className="form-control" id="inputEmail" placeholder="Email" />
                </div>
                <div className={styles.formGroup} >
                  <Label className="sr-only" htmlFor="inputPassword">Password</Label>
                  <Input type="password" className="form-control" id="inputPassword" placeholder="Password" />
                </div>
              </FormGroup>
              <div>
                <Button
                  type="button" name="register" className={`${styles.buttonPricingPremium} ${styles.buttonColor}`}
                  data-label="home_CTA" data-action="Sign in now" lang="en" onClick={this.signinToggle}
                >
                  Log in
                </Button>
              </div>
            </Form>
          </ModalBody>
        </Modal>
      </header>
    );
  }
}

// App.propTypes = {
//   children: PropTypes.object.isRequired,
//   dispatch: PropTypes.func.isRequired,
//   intl: PropTypes.object.isRequired,
// };

export default withStyles(styles)(Header);
