import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './HomeStory.css';

import Article from './Article/Article';
import ExpandingHowToUse from './ExpandingHowToUse/ExpandingHowToUse';

class HomeStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSet: [],
      extendDataSet: [],
    };
  }

  componentWillMount() {
    this.setState({ dataSet:
    [{
      header: 'Get help',
      paragraph: 'Post your wish in the wish list. You can get response and help quickly.',
      image: 'https://source.unsplash.com/user/erondu/590x300',
      order: 'image-right',
    },
    {
      header: 'Face To Face Friend',
      paragraph: 'Post your wish in the wish list. You can get response and help quickly.',
      image: 'https://source.unsplash.com/user/erondu/590x300',
      order: 'image-left',
    },
    {
      header: 'Make dream come true',
      paragraph: 'Post your wish in the wish list. You can get response and help quickly.',
      image: 'https://source.unsplash.com/user/erondu/590x300',
      order: 'image-right',
    }],
    },
    );

    this.setState({ extendDataSet:
    [[{
      CardTitle: 'Card title',
      image: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180',
      CardText: 'Some quick example text to build on the card title and make up the bulk of the card content.',
    }, {
      CardTitle: 'Card title',
      image: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180',
      CardText: 'Some quick example text to build on the card title and make up the bulk of the card content.',
    }, {
      CardTitle: 'Card title',
      image: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180',
      CardText: 'Some quick example text to build on the card title and make up the bulk of the card content.',
    }],
    [{
      CardTitle: 'Card title',
      image: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180',
      CardText: 'Some quick example text to build on the card title and make up the bulk of the card content.',
    }, {
      CardTitle: 'Card title',
      image: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180',
      CardText: 'Some quick example text to build on the card title and make up the bulk of the card content.',
    }],
    [{
      CardTitle: 'Card title',
      image: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180',
      CardText: 'Some quick example text to build on the card title and make up the bulk of the card content.',
    }]] });
  }

  render() {
    return (
      <section className={styles.storyWrapper}>
        {this.state.dataSet.map((data, index) =>
          <div key={index} className={styles.row}>
            <div className={styles.rowContent}>
              <Article dataSet={data} />
              <ExpandingHowToUse extendDataSet={this.state.extendDataSet[index]} />
            </div>
          </div>,
        )}
      </section>
    );
  }
}

export default withStyles(styles)(HomeStory);
