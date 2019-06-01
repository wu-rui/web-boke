
// import React, { Component } from 'react';
// // import { Carousel } from 'react-bootstrap';
// import './carousel.less'

// const imgSrc = [
//   {
//     src: '/image/sea.jpg',
//     value: 0,
//   },
//   {
//     src: '/image/info.jpg',
//     value: 1,
//   },
//   {
//     src: '/image/sea.jpg',
//     value: 2,
//   },
//   {
//     src: '/image/sunny.jpg',
//     value: 3,
//   }
// ];
// export default class ControlledCarousel extends Component {
//   constructor(props, context) {
//     super(props, context);
//     // this.handleSelect = this.handleSelect.bind(this);
//     this.state = {
//       timer: this.setTimer,
//       // isgo: false,
//       // count: 0,
//       currentCount: 0,
//       afterCount: 1,
//     };
//   }

//   componentWillReceiveProps() {
//     this.setTimer()
//   }

//   setTimer() {
//     let currentCount = this.state.currentCount;
//     const ul_img = document.getElementsByClassName("ul_img")[0];
//     setInterval(() => {
//       ul_img.style.transform = "translate(-680px)";
//       // if (currentCount === imgSrc.length - 1) {
//       //   currentCount = 0;
//       // } else {
//       //   currentCount = currentCount + 2;
//       // }
//       this.setState({
//         afterCount: currentCount + 1,
//       }, () => {
//         
//         if (currentCount === imgSrc.length - 1) {
//           currentCount = 0;
//         } else {
//           currentCount = currentCount + 2;
//         }
//         this.setState({
//           afterCount: this.state.currentCount + 1,
//         })
//       })
//     }, 1000);
//   }

//   stopShowImg = (id) => {
//     clearInterval(this.state.timer);
//   }
//   goOnShowImg = () => {
//     // this.showtime();
//   }
//   imgButton(id) {
//     // const isgo = this.state.isgo;
//     // const count = this.state.count;
//     // const ul_img = document.getElementsByClassName("ul_img")[id];
//     // const li_img = document.getElementsByClassName("li_img");
//     // if (id > count) {
//     //   this.setSate({
//     //     isgo: false,
//     //   })

//     // } else if (id < count) {
//     //   this.setSate({
//     //     isgo: true,
//     //   })

//     // } else {
//     //   return null;
//     // }
//   }
//   imgLogo(type) {

//   }
//   showFirstImg = (currentCount) => {
//     return (
//       <li className="li_img"><img className="list-img-banner" src={imgSrc[currentCount].src} value={imgSrc[currentCount].value} alt="img" /></li>
//     )
//   }
//   showSecondImg = (afterCount) => {
//     
//     return (
//       <li className="li_img"><img className="list-img-banner" src={imgSrc[afterCount].src} value={imgSrc[afterCount].value} alt="img" /></li>
//     )
//   }
//   render() {
//     return (
//       <div className="list-img">
//         <div className="arrows">
//           {/* <span title="1" className="arrow" style={{ float: 'left' }} onMouseOver={this.stop} onClick={this.imgLogo(true)} onMouseOut={this.goOnShowImg} >{'<'}</span> */}
//           <span title="0" className="arrow" style={{ float: 'right' }} onMouseOver={this.stop} onClick={this.imgLogo(false)} onMouseOut={this.goOnShowImg} >{'>'}</span>
//         </div>

//         {/* this.showImg(this.state.currentCount, this.state.currentCount + 1) */}
//         <ul className="ul_img">
//           {
//             this.showFirstImg(this.state.currentCount)
//           }
//           {
//             this.showSecondImg(this.state.afterCount)
//           }
//         </ul>
//         <div className="img-button">
//           <div className="div_btn" onClick={this.imgButton(0)} onMouseOver={this.stopShowImg} onMouseOut={this.goOnShowImg} />
//           <div className="div_btn" onClick={this.imgButton(1)} onMouseOver={this.stopShowImg} onMouseOut={this.goOnShowImg} />
//           <div className="div_btn" onClick={this.imgButton(2)} onMouseOver={this.stopShowImg} onMouseOut={this.goOnShowImg} />
//           <div className="div_btn" onClick={this.imgButton(3)} onMouseOver={this.stopShowImg} onMouseOut={this.goOnShowImg} />
//         </div>
//       </div>
//     );
//   }
// }