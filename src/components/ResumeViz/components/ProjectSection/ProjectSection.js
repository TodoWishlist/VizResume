import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ProjectSection.css';

const ProjectSection = ({ dataSet }) => (
  <div>
    {dataSet.map((data, index) =>
      <div key={index} id={`project${data.projectName}`} className={styles.projectContainer}>
        <div>{data.projectDetail}</div>
      </div>,
    )}
  </div>
);

ProjectSection.propTypes = {
  dataSet: React.PropTypes.array,
};

export default withStyles(styles)(ProjectSection);
