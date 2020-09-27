import React, { Component } from 'react';
import VisualizeFeatures from './Visualize';


class AnalyzePlaylistRow extends Component {
    constructor(props) {
        super(props);
        this.desc = this.props.desc || "NO DESC GIVEN";
        this.img = this.props.img || null;
        this.data = this.props.data || {};
        this.title = this.props.title || "";
        this.faClass = this.props.faClass || "";
        this.label = this.props.label || "";
    }
    render() {
        let middleImg;
        if (this.img) {
            middleImg = (
                <div>
                    <img src={this.img} width="100%" height="100%" />
                </div>
            );
        }else{
            let className = "fa " + this.faClass + " big-fa-icon";
            middleImg = (
                <div>
                    <i className={className} ></i>
                </div>
            );
        }
        let labels = {x: this.label, y: "Amount of Songs"};
        return (
            <div className="playlist-analyzed-row">
                <div dangerouslySetInnerHTML={{__html: this.desc}}>
                </div>
                {middleImg}
                <VisualizeFeatures data={this.data} title={this.title} axisLabels={labels}/>
            </div>
        )
    }
}

export default AnalyzePlaylistRow;