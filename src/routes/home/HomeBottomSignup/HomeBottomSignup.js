import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './HomeBottomSignup.css';
import SignupForm from '../components/SignupForm/SignupForm';

class HomeBottomSignup extends Component {
  constructor(props) {
    super(props);
    this.state = { position: 'bottom' };
  }

  render() {
    return (
      <section className={s.BottomSignupWrapper}>
        <h1 className={s.header} >Get start now</h1>
        <SignupForm dataSet={this.state} />
      </section>
    );
  }
}

export default withStyles(s)(HomeBottomSignup);
