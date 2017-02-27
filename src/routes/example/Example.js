import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';import classnames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Vizresume from '../../components/VizResume';
import Resumeviz from '../../components/Resumeviz';
import styles from './Example.css';

class Example extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }
  render() {
    return (
      <div>
        <h1 className={styles.h1}>Jiazhen's Resume</h1>
        <Nav tabs className={classnames(styles.header, 'justify-content-center')} >
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              VizResume
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              ResumeViz
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab} className={styles.vizresumeWrapper}>
          <TabPane tabId="1">
            <Vizresume />
          </TabPane>
          <TabPane tabId="2">
            <Resumeviz />
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default withStyles(styles)(Example);


// App.propTypes = {
//   children: PropTypes.object.isRequired,
//   dispatch: PropTypes.func.isRequired,
//   intl: PropTypes.object.isRequired,
// };
