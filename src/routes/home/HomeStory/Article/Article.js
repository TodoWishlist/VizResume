import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Article.css';

const Article = ({ dataSet }) => {
  const flex = dataSet.order === 'image-right' ? { flexDirection: 'row-reverse' } : { flexDirection: 'row' };
  return (
    <article className={styles.articleWrapper} style={flex}>
      <div className={styles.storyImageWrapper}>
        <div className={styles.storyImage} style={{ backgroundImage: `url(${dataSet.image})` }}></div>
      </div>
      <div className={styles.storyContentWrapper}>
        <div className={styles.storyContent}>
          <h2 className={styles.header2}>{dataSet.header}</h2>
          <p>{dataSet.paragraph}</p>
        </div>
      </div>
    </article>
  );
};

Article.propTypes = {
  dataSet: React.PropTypes.object,
};

export default withStyles(styles)(Article);
