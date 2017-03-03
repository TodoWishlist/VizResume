import React from 'react';
import { Card, CardImg, CardText, CardBlock, CardLink, CardTitle, CardSubtitle } from 'reactstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Pricecard.css';

// create Price card as a component
const Pricecard = ({ dataSet }) => (
  <div>
    <Card className={styles.container}>
      <CardBlock>
        <CardTitle>{dataSet.CardTitle}</CardTitle>
        <CardSubtitle>{dataSet.CardSubtitle}</CardSubtitle>
      </CardBlock>
      <img width="100%" src={dataSet.image} alt="Card image cap" />
      <CardBlock>
        <CardText>{dataSet.CardText}</CardText>
        <CardLink href="#">Link</CardLink>
        <CardLink href="#">Another Link</CardLink>
      </CardBlock>
    </Card>
  </div>
  );
Pricecard.propTypes = {
  dataSet: React.PropTypes.object,
};

export default withStyles(styles)(Pricecard);
