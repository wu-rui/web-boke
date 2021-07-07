import React, { Component } from 'react';
import SnakeGame from './components/snakeGame';
// import Swiper from '../../common/Carousels/carousels';

import './snake.less';
export default class Snake extends Component {
  render() {
    return (
      <div id="snake-page">
        <SnakeGame />
        {/* <Swiper /> */}
      </div>
    )
  }
}