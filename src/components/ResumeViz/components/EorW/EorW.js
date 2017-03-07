import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './EorW.css';

const EorW = ({ dataSet }) => (
  <div>
    {dataSet.map((data, index) =>
      <div key={index} id={`EorW${data.name}`} className={styles.EorWContainer}>
        <div>{data.title} | {data.start} ~ {data.end}</div>
        <div className={styles.tooltipRule} />
        <div>{data.fullName}</div>
      </div>,
    )}
  </div>
  );

EorW.propTypes = {
  dataSet: React.PropTypes.array,
};

export default withStyles(styles)(EorW);
