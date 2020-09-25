import Config from './ChartConfig'
import Chart from 'chart.js'
import QuickSort from './QuickSort'

class Charter {
    constructor(data, labels, label, ctx){
        this.config = new Config(labels, label, data);
        let configOptions = this.config.getConfig();
        let formattedData = this.formatData(data);
        this.lineChart = new Chart(ctx, {
            type: 'bubble',
            data: {
                datasets: [{
                    borderColor: "#AASDFA",
                    backgroundColor: "#HFDGHD",
                    label: 'Scatter Dataset',
                    data: formattedData,
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
        });
    }
    updateChart(){
        this.lineChart.update();
    }

    formatData(data){
        let sortedData = (new QuickSort()).sort(data);
        let filteredData = sortedData;

        let returnArray = [];
        // lets just do linear cause doing this in log n is more sofisticated and takes time
        let x = 0;
        let prev = filteredData[0];
        let currCount = 1;
        for (let i = 1; i < filteredData.length; i ++){
            if(prev == filteredData[i]){
                currCount ++;
            }else{
                returnArray.push({x: x, y: prev, r: currCount});
                x++;
                currCount=1;
                prev = filteredData[i];
            }
        }
        return returnArray;
    }
}




export default Charter;