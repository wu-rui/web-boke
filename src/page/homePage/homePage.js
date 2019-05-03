import React , {Component} from 'react';
import HomeHeader from '../../components/header/homeHeader';
import './homePage.css'

export default class HomePage extends Component {
  render() {
    return (
      <div className="page">
        <div className="content">
          <HomeHeader />
        </div>
      </div>
    )
  }
}