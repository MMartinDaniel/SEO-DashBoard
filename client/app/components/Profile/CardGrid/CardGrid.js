import React from 'react';
import '../style.scss';

class CardGrid extends React.Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {
    }

    render() {
        const {cards} = this.props;
        let {basename} = this.props;
        basename = `${basename}__CardGrid__`;
        return (
            <>
            <div className={`${basename}wrapper` } >
                <h2 className={`${basename}heading`}>Your Reports</h2>
                {   (cards.length > 0) ?
                    cards.map(function(item, i){
                       return <Card key={i} data={item} basename={basename}/>   
                    }) : null
                }
             
            </div>
            </>
        );
    }
}
const Card = (props) => {
    const {basename,data} = props;
    let date = new Date(data.date);
    let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
    let pattern = /^((http|https|ftp):\/\/)/;
    let fav;
     data.metadata.favicon.map((item)=>{
         if(!pattern.test(item.href)) {
             if(item.href.slice(0, -4).includes(".")){
                 fav = item.href;
             }else if(!pattern.test(data.website)){
                fav =  `http://${data.website}${item.href}`;
            }else{
              fav =  `${data.website}${item.href}`;
  
            }
          
        }
    });

    return (
        <>
        <div className={`${basename}card-wrap`}>
            <i className="fas fa-times left"></i>
            <i className="fas fa-arrow-right right"></i>
            <div className={`${basename}name`}>
                <strong>{data.website.replace(/(^\w+:|^)\/\//, '')}</strong>
                <p>{formatted_date}</p>
            </div>
            <div className={`${basename}favicon`}>
                 {(data.metadata.favicon.length > 0 ) ? <img src={(fav) ? fav : data.metadata.favicon[0].href}/> : null }
            </div>
        </div>
        </>
    );
};

CardGrid.propTypes = {
    
};

export default CardGrid;