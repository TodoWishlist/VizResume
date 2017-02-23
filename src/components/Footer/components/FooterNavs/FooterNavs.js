import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './FooterNavs.css';

class FooterNavs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSet: [{}, {}, {}],
    };
  }

  componentWillMount() {
    this.setState({ dataSet:
    [
        { name: 'Company', list: [{ name: 'About us', url: '/aboutus' }, { name: 'Jobs', url: '/jobs' }, { name: 'Blog', url: '/blog' }] },
        { name: 'Support', list: [{ name: 'Help Center', url: '/helpcenter' }, { name: 'Contact us', url: '/cotactus' }] },
        { name: 'Connect', list: [{ name: 'Twitter', url: 'www.twitter.com' }, { name: 'Facebook', url: 'www.facebook.com' }, { name: 'Linkedin', url: 'www.linkedin.com' }, { name: 'Google+', url: 'www.google.com' }] },
    ],
    },
  );
  }

  render() {
    return (
      <div className={styles.FooterNavWrapper}>
        {
          this.state.dataSet.map((data, index) =>
            <FooterNav key={index} dataSet={data} />,
          )
        }
      </div>
    );
  }
}

const FooterNav = ({ dataSet }) => (
  <div className={styles.FooterNavSection}>
    <p>{dataSet.name}</p>
    <ul className={styles.Links}>
      {
        dataSet.list.map((data, index) =>
          <li key={index}>
            <a className={styles.href} href={data.url}>{data.name}</a>
          </li>,
        )
      }
    </ul>
  </div>
);

FooterNav.propTypes = {
  dataSet: React.PropTypes.object.isRequired,
};

export default withStyles(styles)(FooterNavs);
