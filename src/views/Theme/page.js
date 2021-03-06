import React, { Component, PropTypes } from 'react';
import "./page.less";

import Ring from "./ring.js";
import RingVi from "./ringVi.js";
import {getCookie} from 'libs/util';

const Level={"暂无":0,"C":25,"B":50,"A":75,"PRO":100,"暂无":0};

class Theme extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            chooseNum:this.getImgIndex()
        };
        this.handClick = this.handClick.bind(this);
        this.renderUls = this.renderUls.bind(this);
        this.saveClick = this.saveClick.bind(this);

        this.buildImage = this.buildImage.bind(this);
    }
    getImgIndex(){
        return window.localStorage.theme?Number(window.localStorage.theme):0;
    }
    saveImgIndex(index){
        //console.log("sdssdds",index)
        window.localStorage.theme = index;
        //保存图片 。this.urlImage 

    }
    handClick(e){
        var self = this;

       
        let target = e.target;
        if(target.tagName!=="LI"){
            target = target.parentNode;
        }
        var lis = e.currentTarget.querySelectorAll("li");
        for(var i = 0;i<lis.length;i++ ){
            if(lis[i]===target){
                break;
            }
        }
        
        //console.log("设置chooseNum",i)
        i<6&&self.setState({
            chooseNum:i
        });

    }
    //保存主题
    saveClick(){
        this.saveImgIndex(this.state.chooseNum);
        typeof QBaoJSBridge!= 'undefined' &&
        QBaoJSBridge.saveImg(this.urlImage)

    }
    renderUls(){
        let {data} = this.props,$lis=[],{chooseNum} = this.state;
        for(let i=0;i<data.length;i++){
            $lis.push(<li key={i}><span>{data[i].title}</span><span className={chooseNum===i?"layer":"layer hide"}></span></li>);
        }
        return (
            <ul className="" onClick={this.handClick} >{$lis}</ul>
        );
    }
     componentDidMount(){
         //console.error("父级加载")
     }

     buildImage(data){
         this.urlImage = data; 
         
     }
    render() {
        let levelName = getCookie("level","storage")||"无";
        //debugger;
        let level = Level[levelName];
        
        //level = 20;
        //debugger;
        return (
            <div className='theme'  style={this.props.style}>
                <div className="header">
                    <div className="header-layer"></div>
                    <Ring   showNum={this.state.chooseNum} levelName={levelName} level={level}/>
                    <RingVi buildImage={this.buildImage}  showNum={this.state.chooseNum} levelName={levelName} level={level}/>
                </div>
                <div className="content">
                    <div className="menu">
                        <h2>请选择您分享的主题</h2>
                        <div className="menu-box">
                            {this.renderUls()}
                        </div>
                    </div>
                </div>
                <div className="footer" onClick={this.saveClick} style={{display:'flex'}}>保存主题</div>
            </div>
        )
    }
}
Theme.defaultProps = {
    data:[{title:"守望者",url:"static/imgs/theme/sun-header0.jpg"},{title:"实力派",url:"static/imgs/theme/sun-header1.jpg"},{title:"潜行者",url:"static/imgs/theme/sun-header2.jpg"},{title:"勇敢者",url:"static/imgs/theme/sun-header3.jpg"},{title:"领路人",url:"static/imgs/theme/sun-header4.jpg"},{title:"梦想家",url:"static/imgs/theme/sun-header5.jpg"}]
}

export default Theme;
//<Ring buildImage={this.buildImage}  showNum={this.state.chooseNum} levelName={levelName} level={level}/>
//<div className="theme-img"></div>