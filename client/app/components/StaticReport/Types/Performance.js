import React, { Component } from 'react'
import Tile from './../../SEO/block/Tile'
import Slider from "react-slick"

class Performance extends Component {
    constructor(props) {
      super(props);

      this.next = this.next.bind(this);
      this.previous = this.previous.bind(this);
    }
    next() {
      this.slider.slickNext();
    }
    previous() {
      this.slider.slickPrev();
    }
    bytesToSize(bytes) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
     }
    render(){
       
        let {data,headers} = this.props;
        const {settings} = this.props;
        console.log(this.props);
         let mb = (data[5]) ? this.bytesToSize(data[5]) : " No network requests encontradas";
        return (
            <>
            <Slider  ref={c => (this.slider = c)} {...settings}>
                <div>
                    <div className={"report-performance"} >
                        <div className={"metaInfo-item"}><h5>Cache Control</h5><p> {(headers[0].cachecontrol) ? headers[0].cachecontrol : "No cache control header encontrado"} </p></div> 
                        <div className={"metaInfo-item"}><h5>Content-Encoding</h5><p> {(headers[0].contentencoding) ? headers[0].contentencoding: "No Content Encoding header encontrado"} </p></div> 
                        <div className={"metaInfo-item"}><h5>Total tamaño peticiones de red</h5><p> {mb} </p></div>
                        <div className={"metaInfo-item"}><h5>Codigo de estado HTTP</h5><p> {(headers[0].status) ? headers[0].status : "No HTTP status encontrado"} </p> </div>
                        <div className={"metaInfo-item"}><h5>Url</h5><p> {(headers[0].url) ? headers[0].url : "No url encontrada"} </p> </div>

                         
                    </div>
                    <div className={"explanation m-t"}>
                        <h6>Descripción</h6>
                        <p>
                        <code className="highlighter-rouge">Cache Control</code>Este header especifica las directivas para el cachado, puede ser asignado a public, private, no-cache y only-if-cached, este header es seguido por un valor maximo de expiración<br></br>
                        <code className="highlighter-rouge">Content-Encoding</code> Este header es usado para detemrinar si el contenido esta comprimido o no, cuando está presenta este valor define que tipo de compresion se ha aplicado<br></br>
                        <code className="highlighter-rouge">Total tamaño peticiones de red</code> Es el total del tamaño de peticiones de red<br></br>
                        <code className="highlighter-rouge">Codigo de estado HTTP</code> Se refiere a la respuesta obtenida al realizar la peticion HTTP. 
                        </p>
                        </div> 
                </div> 
                <div>
                    <div className={"report-performance"} >
                        <div className='tile-container'>
                            {
                                data.map((item,i)=>{
                                    if(i < 5){
                                         return <Tile key={i} data={item} />
                                    }
                                })
                            }
                      
                        </div>
                    </div>
                    <div className={"explanation m-t-s"}>
                        <h6>Descripción</h6>
                        <p>
                            <code className="highlighter-rouge">First Contentful Paint</code> este tiempo muestra el tiempo en el que el primer texto o imagen se ha plasmado.<br></br>
                            <code className="highlighter-rouge"> Speed Index </code> muestra como de rapido el contenido de la pagina es visiblemente populado.<br></br>
                            <code className="highlighter-rouge"> Time to interactive</code>Es el tiempo total que tarda la pagina en ser interactiva<br></br>
                            <code className="highlighter-rouge">First Meaningful Paint</code> es el tiempo en el que el contenido principal es visible<br></br>
                            <code className="highlighter-rouge">First CPU Idle</code> es el tiempo en el que el hilo de la pagina puede manejar inputs.<br></br>
                            <code className="highlighter-rouge">Maximum potential First Input Delay</code>  es el tiempo que el la tarea maxima es llevada a cabo.<br></br>
                        </p>
                    </div>
                </div>
            </Slider>
            <div className={"status-arrow"}>
            <i onClick={this.next} className="fas  fa-chevron-right top-arrow status-arrow__right"/>
            </div> 
            </>
        )
    }
}

export default Performance;
//                         <div className={"metaInfo-item"}><h5>Content Length</h5><p> {(headers[0].contentlength) ? headers[0].contentlength : "no expiration header found"} </p></div>

//                        <div className={"metaInfo-item"}><h5>Expires</h5><p> {(headers[0].expires) ? headers[0].expires : "No content length header found"} </p> </div>
//                        <code className="highlighter-rouge">Expires</code> marks the time at which the first text or image is painted.<br></br>
