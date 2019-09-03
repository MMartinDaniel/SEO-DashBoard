import React, { Component } from 'react'
import RatingWidget from './../../SEO/block/RatingWidget'
import Slider from "react-slick"

class Tag extends Component {
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
    render(){
       
        let {data} = this.props;
        const {settings} = this.props;
        (data.canonical === ""  || !data.canonical) ? data.canonical = "No canonical tag encontrado" : null;
        (data.lang === ""  || !data.lang) ? data.lang = "No lang tag encontrado" : null;

        return (
            <>
            <Slider  ref={c => (this.slider = c)} {...settings}>
                <div>
                    <div className={"metaInfo-title"}>
                        <h6 className={"heading-tags"}>Heading Tags</h6>
                        <div className={"metaInfo-item h-t"}><h5>H1</h5><p> {data.h1} </p></div> 
                        <div   className={"metaInfo-item h-t"} ><h5>H2</h5><p> {data.h2} </p></div> 
                        <div className={"metaInfo-item h-t"} ><h5>H3</h5><p> {data.h3} </p> </div> 
                        <div className={"metaInfo-item h-t"} ><h5>H4</h5><p> {data.h4} </p> </div> 
                        <div className={"metaInfo-item h-t"} ><h5>H5</h5><p> {data.h5} </p> </div> 
                        <div className={"metaInfo-item h-t"} ><h5>H6</h5><p> {data.h6} </p> </div> 
                        <div className={"heading-tags-div"}>
                          <div>
                          <h6 className={"heading-tags"}>Canonical Tag</h6>
                          <div className={"metaInfo-item h-t"}><p>  {data.canonical} </p></div> 
                          </div>
                          <div>
                            <h6 className={"heading-tags"}>HTML Lang</h6>
                            <div className={"metaInfo-item h-t"}><p>  {data.lang} </p></div> 
                          </div>
                        </div>
                    </div> 
                    <div className={"explanation"}>
                        <h6>Descripción</h6>
                        <p>H tags, especialmente <code className="highlighter-rouge">H1</code> son muy importantes ya que dicen sobre que va a ir el contenido de la pagina. Entonces  <code className="highlighter-rouge">H2</code> a <code className="highlighter-rouge">H6</code> refinan más la información de esta pagina.<br>
                        </br>H1 tags son muy importantes para la gente con <a href='https://en.wikipedia.org/wiki/Visual_impairment'><code className="highlighter-rouge">Discapacidad visual</code></a> dado que los lectores usan las etiquetas H para describir el contenido de la pagina. Google presta bastante atención a la usabilidad, por lo cual estos tags son muy importantes
                        <br></br>
                        <br></br><code className="highlighter-rouge">Canonical</code> tags son bastante importantes y util en terminos de rankings, dado que especifican la URL y dominio.
</p>
                        
                        </div> 
                </div> 
                
            </Slider>
            <div className={"status-arrow"}>
          {false && (  <i onClick={this.next} className="fas  fa-chevron-right top-arrow status-arrow__right"/> ) }
            </div> 
            </>
        )
    }
}

export default Tag;
