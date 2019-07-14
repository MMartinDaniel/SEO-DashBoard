import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import Performance from './Types/Performance'

class StaticReport extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }


    componentWillUnmount() {

    }
    render() {
        const basename = 'sreport';
        return (<>
            <div className={`${basename}__wrapper`} >
                <div className={`${basename}__grid`}>
                     <div className={`${basename}__selector`}>
                        <i className="fas fa-sort-up top-arrow"/>
                            <div className={`${basename}__selector__item`}><img src="../assets/img/icon/meta.png"/></div>
                            <div className={`${basename}__selector__item`}><img src="../assets/img/icon/alternative.png"/></div>
                            <div className={`${basename}__selector__item`}><img src="../assets/img/icon/32x32.png"/></div>
                            <div className={`${basename}__selector__item`}><img src="../assets/img/icon/minify2.png"/></div>
                            <div className={`${basename}__selector__item`}><img src="../assets/img/icon/performance.png"/></div>
                            <div className={`${basename}__selector__item`}><img src="../assets/img/icon/resources.png"/></div>
                            <div className={`${basename}__selector__item`}><img src="../assets/img/icon/screenshot.png"/></div>
                            <div className={`${basename}__selector__item`}><img src="../assets/img/icon/sitemap.png"/></div>
                            <div className={`${basename}__selector__item`}><img src="../assets/img/icon/ssl.png"/></div>
                            <div className={`${basename}__selector__item`}><img src="../assets/img/icon/broken.png"/></div>
                        <i className="fas fa-sort-down"/>
                    </div>
                    <div className={`${basename}__left`}>
                        <div className={`${basename}__title`}>
                            <h5>Performance Results</h5>
                            <p>PageSpeed Insights</p>
                        </div>
                        <div className={`${basename}__content`}>
                            <Performance/>
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

export default StaticReport;