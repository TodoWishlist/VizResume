import React from 'react';
import { CardBlock, Card, CardTitle, CardText, CardLink } from 'reactstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ToggleCard.css';

const ToggleCard = ({ extendDataSet }) => {
  return (
    <Card className={styles.container}>
      <CardBlock>
        <CardTitle>{extendDataSet.CardTitle}</CardTitle>
      </CardBlock>
      <img role="presentation" src={extendDataSet.image} />
      <CardBlock>
        <CardText>{extendDataSet.CardText}</CardText>
        <CardLink href="#">Card Link</CardLink>
      </CardBlock>
    </Card>
  );
};

ToggleCard.propTypes = {
  extendDataSet: React.PropTypes.object,
};


export default withStyles(styles)(ToggleCard);
