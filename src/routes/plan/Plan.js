/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Plan.css';
import Pricecard from '../../components/Pricecard/Pricecard';

class Plan extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      dataSet: [],
    };
  }
  componentWillMount() {
    this.setState({ dataSet:
    [{
      CardTitle: 'Basic version',
      CardText: 'Post your wish in the wish list. You can get response and help quickly.',
      image: 'https://source.unsplash.com/user/erondu/590x300',
      CardSubtitle: '$50',
    },
    {
      CardTitle: 'Premium version',
      CardText: 'Post your wish in the wish list. You can get response and help quickly.',
      image: 'https://source.unsplash.com/user/erondu/590x300',
      CardSubtitle: '$100',
    },
    {
      CardTitle: 'Deluxe version',
      CardText: 'Post your wish in the wish list. You can get response and help quickly.',
      image: 'https://source.unsplash.com/user/erondu/590x300',
      CardSubtitle: '$500',
    }],
    },
    );
  }

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.container}>
          <h1>{this.props.title}</h1>
          <div className={styles.cardWrapper}>
            {this.state.dataSet.map((data) =>
              <Pricecard dataSet={data} />,
          )}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Plan);
