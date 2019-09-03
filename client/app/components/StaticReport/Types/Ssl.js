import React, { Component } from 'react'
import RatingWidget from './../../SEO/block/RatingWidget'
import Slider from "react-slick"

class Ssl extends Component {
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
        if(!data){data = {}}
        return (
            <>
                <div>
                    <div className={"metaInfo-title"}>
                        <div className={"metaInfo-item"}><h5>Emisor</h5><p> {(data.issuer) ? data.issuer : "No emisor encontrado"} </p></div> 
                        <div className={"metaInfo-item"}><h5>Número de serie</h5><p> {(data.SerialNumber) ? data.SerialNumber: "No Numero de serie encontrado"} </p></div> 
                        <div className={"metaInfo-item"}><h5>SAN</h5><p> {(data.subjectaltname) ? data.subjectaltname : "No nombre subject alternativo encontrado"} </p> </div>
                        <div className={"metaInfo-item"}><h5>Huella Digital</h5><p> {(data.fingerprint) ? data.fingerprint : "no huella digital encontrada"} </p> </div> 
                        <div className={"metaInfo-item"}><h5>Valido desde</h5><p>{(data.valid_from) ? data.valid_from : "No certificado SSL valido encontrado" }</p></div>
                        <div className={"metaInfo-item"}><h5>Valido hasta</h5><p>{(data.valid_to) ? data.valid_to : "No certificado SSL valido encontrado"}</p></div>
                    </div> 
                    <div className={"explanation"}>
                        <h6>Descripción</h6>
                           <p>Los certificados SSL son muy importantes si queremos dar seguridad a los usuarios del sitio web, 
                          especialmente cuando tenemos <code className="highlighter-rouge"> datos privados </code> . Usar un certificado SSL mantiene la transferencia de datos segura entre servidores,
                         al igual que incrementar el ranking de Google debido a mejorar la confianza y la <code className="highlighter-rouge"> tasa de conversion </code>
                         Un certificado SSL tambien afirma que nuestra identidad es real, cuando un certificado esta instalado, hay un <code className="highlighter-rouge">Certificate Authority</code> que la valida.
                           </p>
                    </div>
                </div>

            </>
        )
    }
}

export default Ssl;
