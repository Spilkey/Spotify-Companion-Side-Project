import React, { Component } from 'react';

import Charter from '../../models/Charter'

class VisualizeFeatures extends Component {
    constructor(props){
        super(props);
        this.chartRef = React.createRef();

        this.title = this.props.title || "";
        this.axisLabels = this.props.axisLabels || {x: "NO LABEL", y: "NO LABEL"};
    }

    componentDidMount(){
        this.charter = new Charter(this.props.data, this.axisLabels, this.title, this.chartRef.current.getContext('2d'));
    }
    render(){
        let chart = (<canvas ref={this.chartRef} width="100%" height="50px" ></canvas>);
        
        return ( 
            <div>
                {chart}
            </div>
        )
    }
}

export default VisualizeFeatures;