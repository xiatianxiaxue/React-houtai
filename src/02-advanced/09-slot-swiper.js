// import React, { Component } from 'react'
// import Swiper from 'swiper' // new Swiper()
// import 'swiper/css/swiper.css'

// class KerwinSwiper extends Component{
//     render(){ 
//         return <div className="swiper-container">
//             <div className="swiper-wrapper">
//                 {this.props.children}
//             </div>
//         </div>
//     }

//     componentDidMount() {
//         new Swiper(".swiper-container",{
//             loop: true
//         })
//     }
    
// }



// export default class App extends Component {
//     state = {
//         list: ["aaaaa","bbbbb","cccc"]
//     }
//     render() {
//         return (
//             <div>
//                 <KerwinSwiper>
//                     {
//                         this.state.list.map(item=>
//                             <div className="swiper-slide" key={item}>
//                                 {item}
//                             </div>    
//                         )
//                     }
//                 </KerwinSwiper>
//             </div>
//         )
//     }
// }
import React, { Component } from 'react'

import Swiper from 'swiper'
import 'swiper/css/swiper.css'
export default class App extends Component {
    state = {
         list: [
             {"id":1,"url":"https://img14.360buyimg.com/babel/s590x470_jfs/t1/108757/25/16254/96585/5eb27a40E3f8a81a8/19b7d51746998251.jpg.webp"},
             {"id":2,"url":"https://img20.360buyimg.com/pop/s590x470_jfs/t1/121002/13/570/95176/5eb64372E82353258/a4e180a1a1b0a85a.jpg.webp"},
             {"id":3,"url":"https://img11.360buyimg.com/pop/s590x470_jfs/t1/113941/11/5634/79158/5eb50fceE2c06cd72/a1d343e82686ab06.jpg.webp"}
             ]
            }
    render() {
        let ingbox={
            height:"300px",
            width:"700px"
        }
        return (
            <div>
                <h2>腐竹件件</h2>
              <Xiayuwiper>
                  {
                      this.state.list.map(item=>
                     <div key={item.id}>
                         {/* {item.url} */}
                         <img alt="" style={ingbox} src={item.url}/>
                     </div> 
                      
                      )
                  }
              </Xiayuwiper>  
            </div>
        )
    }
}





class Xiayuwiper extends Component {
    render() {
        return (
            <div>
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                    <div className="swiper-slide">{this.props.children[0]}</div>
                    <div className="swiper-slide">{this.props.children[1]}</div>
                    <div className="swiper-slide">{this.props.children[2]}</div>
                
                    </div>
                    {/* <!-- 如果需要分页器 --> */}
                    <div className="swiper-pagination"></div>
                    
                    {/* <!-- 如果需要导航按钮 --> */}
                    <div className="swiper-button-prev"></div>
                    <div className="swiper-button-next"></div>
               </div>
            </div>
        )
    }
    componentDidMount(){
        new Swiper ('.swiper-container', {
            loop: true, // 循环模式选项
            autoplay:true,
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
            
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            
        
          }) 
    }
}
