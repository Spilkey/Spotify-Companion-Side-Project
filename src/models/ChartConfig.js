class ChartConfig {
    contructor(labels, label, data){
        this.labels = labels;
        this.label = label
        this.data = data;
        this.config = {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Scatter Dataset',
                    data: [{
                        x: -10,
                        y: 0
                    }, {
                        x: 0,
                        y: 10
                    }, {
                        x: 10,
                        y: 5
                    }]
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        type: 'linear',
                        position: 'bottom'
                    }]
                }
            }
        };
    }
    getConfig(){
        return this.config;
    }
}

export default ChartConfig;
