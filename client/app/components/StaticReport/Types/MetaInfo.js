import React, { Component } from 'react'
import Slider from "react-slick"
import isAbsoluteUrl from 'is-absolute-url'

class MetaInfo extends Component {
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
        let {data,url} = this.props;
        console.log(data);
        let {meta} = data;
        let meta_item = [];
        
        meta_item['viewport'] = "ViewPort no encontrado";
        meta_item['robots'] = "robots no encontrado";
        meta_item['author'] = "author no encontrado";
        meta_item['Cache-Control'] =  "Cache-Control no encontrado";
        meta_item['Expires'] = "Expires no encontrado";
        meta_item['google-analytics'] =  "google-analytics no encontrado";
        meta_item['og:title'] = "og:title no encontrado";
        meta_item['og:description'] =  "og:description no encontrado";
        meta_item['og:url'] =  "og:url no encontrado";
        meta_item['og:image'] =  "og:image no encontrado";
        meta_item['twitter:title'] =  "twitter:title no encontrado";
        meta_item['twitter:description'] =  "twitter:description no encontrado";
        meta_item['twitter:image'] =  "twitter:image no encontrado";
        meta_item['twitter:card'] = "twitter:card no encontrado";
        meta_item['copyright'] =  "copyright no encontrado";
        meta_item['rating'] = "rating no encontrado";
        meta_item['Content-Type'] = "Content-Type no encontrado";

        meta.forEach((item)=>{
          switch(item.name){
            case 'viewport': meta_item['viewport'] = item.value;break
            case 'author': meta_item['author'] = item.value;break
            case 'Cache-Control': meta_item['Cache-Control'] = item.value;break
            case 'robots': meta_item['robots'] = item.value;break
            case 'Expires': meta_item['Expires'] = item.value;break
            case 'google-analytics': meta_item['google-analytics'] = item.value;break
            case 'og:title': meta_item['og:title'] = item.value;break
            case 'og:description': meta_item['og:description'] = item.value;break
            case 'og:url': meta_item['og:url'] = item.value;break
            case 'og:image': meta_item['og:image'] = item.value;break
            case 'twitter:title': meta_item['twitter:title'] = item.value;break
            case 'twitter:description': meta_item['twitter:description'] = item.value;break
            case 'twitter:image': meta_item['twitter:image'] = item.value;break
            case 'twitter:card': meta_item['twitter:card'] = item.value;break
            case 'copyright': meta_item['copyright'] = item.value;break
            case 'rating': meta_item['rating'] = item.value;break
            case 'Content-Type': meta_item['Content-Type'] = item.value;break

          }
        });
    

//                            <GooglePreview name={'Google Search Preview'} url={this.state.website} details={data} />

        const {settings} = this.props;
        let pattern = /^((http|https|ftp):\/\/)/;
        return (
            <>
            <Slider  ref={c => (this.slider = c)} {...settings}>
                <div>
                    <div className={"metaInfo-title"}>

                            <div className={"metaInfo-item"}><h5>Titulo</h5><p> {(data.title) ? data.title : "No hay titulo o esta vacio"} </p></div> 
                            <div   className={"metaInfo-item"} ><h5>Descripción</h5><p> {(data.description) ? data.description : "Sin descripcion o descripcion vacia"} </p></div> 
                            <div className={"metaInfo-item"} ><h5>Keywords</h5><p> {(data.keywords) ? data.keywords : "Sin palabras clave, o no asignadas"} </p> </div> 
                            <div className={"metaInfo-item"} ><h5>Favicon(s)</h5>
                                <div className={"favicon-grid"}>
                            { 
                                data.favicon.map((item,i)=>{
                                    let fav;
                                    let finalUrl;
                                    let pattern = /^((http|https|ftp):\/\/)/;

                                    if(item.href !== undefined){
                                        if(item.href.substring(0,2)==="//"){
                                        }else if(item.href.substring(0,2)=== "./"){
                                          item.href = item.href.substring(2);                                
                                        }
                                        console.log(item.href, url);
                                        if(item.href.substring(0, 2) == "//"){
                                          finalUrl = item.href;
                                        }else if(isAbsoluteUrl(item.href)){
                                          finalUrl = item.href;
                                        }else if(!pattern.test(item.href)) {
                                          var dominio=String(url).replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0];  
                                            if(item.href.substring(1) === "/" ){
                                              item.href = item.href.substring(1);
                                            }
                        
                                              finalUrl = "http://"+  dominio +"/" + item.href;                                        }
                                        }
                                        fav = finalUrl;
                                    return <div className="favicon-itemn" key={i} >
                                    <div className='favicon-preview'> <img alt="Report favicon preview" src={fav} /></div>
                                    </div>;
                                
                                })
                            }
                            {
                             (data.favicon.length === 0) ? "No favicons encontrados" : null
                            }
                            </div>
                          </div>
                          <div className={"metaInfo-item"} > 
                          {(false) ? <h5>Word Cloud</h5> : null }
                            { (false) ? 
                                data.wordCloud.map(function(item, i){
                                return <div className="cloud-item" key={i}><strong>{item.name}</strong> <p>{item.value}</p></div>
                                })
                                : null
                            } 
                             </div>
                           

                    </div>
                    <div className={"explanation"}>
                        <h6>Descripción</h6>
                           <p>Metadatos sobre los titulos son uno de los aspectos mas importantes a considerar cuando queremos mostrar una vision clara de lo que nuestro sitio web es, asignar una metaetiqueta
                           <code className="highlighter-rouge"> Titulo</code>seguida de una <code className="highlighter-rouge">Descripción</code> y una serie de <code className="highlighter-rouge">Keywords</code> puede decirnos mucho de lo que el sitio web ofrece. Usar estas metaetiquetas nos asegura que el usuario "target" va aumentar debido a que una vista previa generar es dada antes de entrar </p>
                    </div> 
                </div> 
                <div>
                    <div className={"metaInfo-title"}>
                        <GooglePreview details={data} url />
                    </div>
                    
                </div>
               
                <div>
                    <div className={"metaInfo-title"}>
                            <div className={"metaInfo-item"}><h5>Cache-Control</h5><p> {(meta_item['Cache-Control'])} </p></div> 
                            <div   className={"metaInfo-item"} ><h5>Expires</h5><p> {(meta_item['Expires'])}</p></div> 
                            <div className={"metaInfo-item"}><h5>ViewPort</h5><p> {(meta_item['viewport'])} </p></div> 
                            <div   className={"metaInfo-item"} ><h5>Robots</h5><p> {(meta_item['robots'])}</p></div> 
                            <div className={"metaInfo-item"} ><h5>Rating</h5><p> {(meta_item['rating'])} </p> </div> 
                            <div className={"metaInfo-item"} ><h5>Content-Type</h5><p> {(meta_item['Content-Type'])} </p> </div> 


                    </div>
                    <div className={"explanation"}>
                        <h6>Descripción</h6>
                        <p>
                        <code className="highlighter-rouge"> Cache-Control</code>Este meta es muy importante, y nos dice si la pagina debe de ser cacheada, en paginas con mucho trafico, este meta debe de ser controlado siempre.
                          <code className="highlighter-rouge"> Expires </code> Este meta dice al buscador cuando el contenido de la pagina expira, por lo cual debe de ser asignado un tiempo maximo apropiado
                         <code className="highlighter-rouge"> Robots </code> Este meta controla el comportamiento del buscador que va a visitar nuetra pagina e indexarla, sirve para todos los buscadores.
                         <code className="highlighter-rouge">ViewPort </code> Este meta dice al navegador como deberia de renderizar la pagina usando un dispositivo movil, la presencia de este meta indica a google si esta web es mobile friendly o no.
                         <code className="highlighter-rouge">Rating</code> Este meta dice si la pagina contienen contenido para adultos, es bastante util cuando queremos que herramientas como SafeSearch funcionen correctamente.
                        
                        </p>
                    </div> 
                </div>
                <div>
                    <div className={"metaInfo-title"}>
                            <div className={"metaInfo-item"}><h5>og:title</h5><p> {(meta_item['og:title'])} </p></div> 
                            <div   className={"metaInfo-item"} ><h5>og:description</h5><p> {(meta_item['og:description'])}</p></div> 
                            <div className={"metaInfo-item"} ><h5>og:url</h5><p> {(meta_item['og:url'])} </p> </div> 
                            <div className={"metaInfo-item"} ><h5>og:image</h5><p> {(meta_item['og:image'])} </p> </div> 
                          

                    </div>
                    <div className={"explanation  extra-m"}>
                        <h6>Descripción</h6>
                        <p>   <code className="highlighter-rouge"> OpenGraph</code> y <code className="highlighter-rouge"> Twitter</code> Estos metadatos son extremadamente usados hoy en dia, devido a las redes sociales como Facebook o Twitter,de desta forma podemos asegurar que nuestra pagina vaya a ser mostrada como queremos y que la información que vaya a ser mostrada es la correcta. De esta forma podemos incrementar la conversion de los usuarios debido a contenido mas interesante</p>
                    </div> 
                </div>
                <div>
                    <div className={"metaInfo-title "}>
                           
                            <div className={"metaInfo-item"}><h5>twitter:title</h5><p> {(meta_item['twitter:title'])} </p></div> 
                            <div   className={"metaInfo-item"}><h5>twitter:description</h5><p> {(meta_item['twitter:description'])}</p></div> 
                            <div className={"metaInfo-item"} ><h5>twitter:image</h5><p> {(meta_item['twitter:image'])} </p> </div> 
                            <div className={"metaInfo-item"} ><h5>twitter:card</h5><p> {(meta_item['twitter:card'])} </p> </div> 

                    </div>
                    <div className={"explanation  extra-m"}>
                        <h6>Descripción</h6>
                        <p>   <code className="highlighter-rouge"> OpenGraph</code> y <code className="highlighter-rouge"> Twitter</code> Estos metadatos son extremadamente usados hoy en dia, devido a las redes sociales como Facebook o Twitter,de desta forma podemos asegurar que nuestra pagina vaya a ser mostrada como queremos y que la información que vaya a ser mostrada es la correcta. De esta forma podemos incrementar la conversion de los usuarios debido a contenido mas interesante</p>
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





class GooglePreview extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
  
    render(){
      console.log(this.props);
      return(<>
        <div className=''>
          <h6 className="chart-name spaced">Desktop Preview</h6>
  
          <div className='google-preview-container'>
            <div className='desktop'>
              <p className='title'>{this.props.details.title}</p>
              <p className='url'>{this.props.url}</p>
              <p className='description'>{this.props.details.description}</p>
            </div>
          
          </div>
          <h6 className="chart-name spaced mobile">Mobile Preview</h6>
          <div className='google-preview-container'>
                <div className='mobile'>
                <p className='title'>{this.props.details.title}</p>
                <p className='url'>{this.props.url}</p>
                <p className='description'>{this.props.details.description}</p>
                </div>
            </div>
        </div>
      </>);
    }
  
  }
   
export default MetaInfo;
