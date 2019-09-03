import React, { Component } from 'react'
import Slider from "react-slick"
import {Link} from 'react-router-dom'
import axios from 'axios';

class Indexation extends Component {
    constructor(props) {
      super(props);

      this.next = this.next.bind(this);
      this.previous = this.previous.bind(this);
    }

    componentWillMount(){
  
    }
    next() {
      this.slider.slickNext();
    }
    previous() {
      this.slider.slickPrev();
    }
    render(){
        let {data} = this.props;
        let {total,url,robots} = data;
        
        console.log(data);
        let id  = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
        const {settings} = this.props;
        const pStyle = {
            color: '#77c29f',
            textDecoration : 'none'
          };
          
        return (
            <>
            <Slider  ref={c => (this.slider = c)} {...settings}>
                <div>
                    <div className={"minify-performance"} >
                       <div className="normal-size">
                            <h3>{total}</h3>
                            <h5>Total Url's en Sitemap</h5>
                       </div>
                       <div className="normal-size">
                            <h3>  <Link to={"/library/sitemap/"+id}  style={pStyle} className='site-down' target="_blank" >Descargar</Link></h3>
                            <h5>Descargar el sitemap</h5>
                       </div>
                    </div>
                    <div className={"explanation ptop"}>
                        <h6>Descripción</h6>
                        <p>El <code className="highlighter-rouge">Sitemap</code> esta muy relacionado con como Google indexa las paginas, el sitemap XML ayuda a google haciendo su vida mas facil debido a que algunas paginas no tienen otras paginas que las referencien
                        Es una buena practica usar <a href='https://search.google.com/search-console/'><code className="highlighter-rouge">Google Search Console</code></a>  Para ver si tu pagina ha sido indexada por google.
                        <br></br>El Sitemap tambien tiene información sobre la cantidad de paginas que el sitio web tiene, haciendolo mas facil para visitar el sitio.
                        </p>
                    </div> 
                </div> 
                <div>
                    <div className={"metaInfo-title"}>
                    <h6>Robots</h6>
                    {(!robots || (robots.length <= 1)) ?
                        (<p>Robots.txt no encontrados</p>
                    ) : null
                }

                      
                      {(robots && (robots.length > 1) && (
                        <div className={"robot-div"}>
                            <div className="robot-scroll">
                                {   robots.map((rule,i) => {
                                    var css = (rule.includes("Allow:")) ? "robot-green" : (rule.includes("User-agent:")) ? "robot-agent" : "robot-red";
                                    if(rule === "") return null
                                return (<div  key= {i}  className={`${css} robot-item`}>             {rule}                 </div> )
                                    })
                                }
                            </div>
                        </div>
                     )) }
                    </div>
                    <div className={"explanation "}>
                        <h6>Descripcion</h6>
                        <p><code className="highlighter-rouge">Robots.txt </code>
                        Es un archivo que dice a los buscadores que visitan la pagina que pages o que archivos no deben ser indexados de una determinada web. Este tipo de archivos es usado para evitar sobrecargar el sitio con peticiones. Generalmente es usado para adminstrar el trafico y excluir las partes del sitio. Este Archivo debe de ser colocado en la raiz del archivo.
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

export default Indexation;
