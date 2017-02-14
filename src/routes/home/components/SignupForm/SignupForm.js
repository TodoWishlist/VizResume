import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './SignupForm.css';

const SignupForm = ({ dataSet }) => {
  const flex = dataSet.position === 'top' ? { display: 'flex', flexDirection: 'row' } : { display: 'flex', flexDirection: 'column' };
  const width = dataSet.position === 'top' ? { width: '48.5%' } : { width: '100%' };
  const legalColor = dataSet.position === 'top' ? { color: 'white' } : { color: '#3d464d' };
  return (
    <div className={styles.signupForm}>
      <form action="#">
        <div style={flex}>
          <div className={styles.formGroup} style={width}>
            <label className="sr-only" htmlFor="inputEmail">Email</label>
            <input type="email" className="form-control" id="inputEmail" placeholder="Email" />
          </div>
          <div className={styles.formGroup} style={width}>
            <label className="sr-only" htmlFor="inputPassword">Password</label>
            <input type="password" className="form-control" id="inputPassword" placeholder="Password" />
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <p className={styles.legal} style={legalColor} >By clicking Sign up, I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.</p>
          <button
            type="button" name="register" className={`btn btn-success click_tracking ${styles.buttonPricingPremium}`}
            data-label="home_CTA" data-action="Sign up now" lang="en"
          >
            Sign Up for Free
          </button>
        </div>
        <div className={styles.orDivider}>
          <span className={styles.line}></span>
          <span className={styles.text}>or</span>
          <span className={styles.line}></span>
        </div>
        <div className={styles.googleSSO}>
          <p>
            <a className={`btn btn-block ${styles.btnSocial} ${styles.btnGoogle}`}>
              <span className="fa fa-google"></span> Sign in with Google
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

SignupForm.propTypes = {
  dataSet: React.PropTypes.object,
};

export default withStyles(styles)(SignupForm);
