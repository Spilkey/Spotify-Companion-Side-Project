import React, { Component } from 'react';

import Charter from '../../models/Charter'

class VisualizeFeatures extends Component {
    constructor(props){
        super(props);
        this.chartRef = React.createRef();

        this.title = this.props.title || "";
        this.dataTitle = this.props.dataTitle || "";
    }

    componentDidMount(){
        this.charter = new Charter(this.props.data, this.title, this.dataTitle, this.chartRef.current.getContext('2d'));
    }
    render(){
        let chart = (<canvas ref={this.chartRef} width="90%" height="90%" ></canvas>);
        
        return ( 
            <div>
                {chart}
            </div>
        )
    }
}

export default VisualizeFeatures;