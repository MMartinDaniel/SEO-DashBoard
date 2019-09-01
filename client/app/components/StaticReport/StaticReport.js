import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import Performance from './Types/Performance'
import MetaInfo from './Types/MetaInfo';
import Ssl from './Types/Ssl'
import Webshot from './Types/Webshot'
import Resources from './Types/Resources';
import Tag from './Types/Tag'
import Minify from './Types/Minify'
import Alternative from './Types/Alternative'
import Indexation from './Types/Indexation'
import BrokenLinks from './Types/BrokenLinks'
class StaticReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: '0',
            title: TABS[0].title,
            subtitle: TABS[0].subtitle,
            setting: {
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1
    
            },
            data : null,
        }
    }

    componentWillMount() {
       const id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);

        fetch('/library/user/Report/increaseCounter/'+id);
        fetch('/library/user/Report/'+id).then(response => response.json())
        .then(json => {
            console.log(json);
            console.log(json.length);
            this.setState({
                data:json.data,
            })
        }).then( data => {
            for(let x = 0; x < this.state.data.options.length; x++){
                if(this.state.data.options[x]){this.selectItem(x,TABS[x]);break;}
            }
            }
        );    
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }
    selectItem(i,item){
        this.setState({selected:i, title:item.title,subtitle:item.subtitle });
    }

    componentWillUnmount() {

    }

    renderSwitch(param) {
        const {data} = this.state;
        switch(param) {
            case 5:     return <Performance     data={data.performance} headers={data.headers} setting />;
            case 2:     return <MetaInfo        data={data.metadata} url={data.website} setting />;
            case 7:     return <Resources       data={data.resources} setting />;
            case 1:     return <Ssl             data={data.ssl} settings />;
            case 3:     return <BrokenLinks     data={data.brokenLinks[0].result[0] } total={data.brokenLinks[0].total} settings />;
            case 8:     return <Alternative     data={data.imgAlt[0].imgAlt} url={data.website} settings />;
            case 6:     return <Indexation      data={data.sitemap[0]} url={data.website} settings />;
            case 4:     return <Minify          data={data.minify} settings />;
            case 0:     return <Tag             data={data.htag[0]} settings />;
            case 9:     return <Webshot         data={data.webshot} settings />;
            default:    return <MetaInfo        data={data.metadata} url={data.website} setting />;
        }
    }

    render() {
        const basename = 'sreport';
        const {selected,title,subtitle,data} = this.state;
       
        console.log(data);
        console.log(selected);
        return (<>
            <div className={`${basename}__wrapper`} >
                <div className={`${basename}__grid`}>
                     <div className={`${basename}__selector`}>
                        <i className="fas fa-sort-up top-arrow"/>
                        { (data) ?
                            TABS.map((item,i)=>{
                                if(data.options[i]){
                                return  <div onClick={()=> this.selectItem(i,item) } 
                                 key={i} className={`${basename}__selector__item ${(selected == i) ? 'i-selected': ''}`}>
                                     <img src={item.src}/>
                                     </div>
                                }
                            })
                            : null
                        
                        }
                          
                    <i className="fas fa-sort-down"/>
                    </div>
                    <div className={`${basename}__left`}>
                        <div className={`${basename}__title`}>
                            <h5>{title}</h5>
                            <p>{subtitle}</p>
                        </div>
                        <div className={`${basename}__content`}>
                        { (data) ? this.renderSwitch(selected) : null
                        }
                        </div>
                    </div>
                     <div className={`${basename}__right`}>
                    </div>
                </div>
            </div>
            </>
        );
    }
}

StaticReport.propTypes = {

};

const TABS =[
    {src:"../assets/img/icon/32x32.png", title: "Tags Information", subtitle: "Information about tags" },
    {src:"../assets/img/icon/ssl.png", title: "SSL Information", subtitle: "Information about SSL Certificate" },
    {src:"../assets/img/icon/meta.png", title: "Meta Information Results", subtitle: "Information about meta tags and Preview" },
    {src:"../assets/img/icon/broken.png", title: "BrokenLinks Information", subtitle: "Information about brokenlinks" },
    {src:"../assets/img/icon/minify2.png", title: "Minify Information", subtitle: "Information Minification savings" },
    {src:"../assets/img/icon/performance.png", title: "Performance Results", subtitle: "Headers & PageSpeed Insights" },
    {src:"../assets/img/icon/sitemap.png", title: "Indexation Information", subtitle: "Information Sitemap and robots files" },
    {src:"../assets/img/icon/resources.png", title: "Resources Information", subtitle: "Information about webpage sizing"  },
    {src:"../assets/img/icon/alternative.png", title: "Alternative Information", subtitle: "Information about Alternative metadata" },

   {src:"../assets/img/icon/screenshot.png", title: "Mobile Friendly", subtitle: "Information about responsiveness" },
    
  ];




export default StaticReport;