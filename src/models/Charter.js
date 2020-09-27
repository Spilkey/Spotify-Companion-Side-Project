import Config from './ChartConfig'
import Chart from 'chart.js'
import QuickSort from './QuickSort'

class Charter {
    constructor(data, axisLabels, label, ctx){
        // this.config = new Config(labels, label, data);
        // let configOptions = this.config.getConfig();
        let formattedData = this.formatData(data);
        this.lineChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: formattedData.labels,
                datasets: [{
                    barPercentage: 0.5,
                    barThickness: 15,
                    maxBarThickness: 20,
                    minBarLength: 2,
                    data: formattedData.data,
                }]
            },
            options: {
                legend: false,
                tooltips: false,
                elements: {
                    rectangle: {
                        backgroundColor: "orange",
                        borderColor: "black",
                        borderWidth: 1
                    }
                },
                title: {
                    display: true,
                    text: label
                },
                scales: {
                    yAxes: [{
                      scaleLabel: {
                        display: true,
                        labelString: axisLabels.y
                      }
                    }],
                    xAxes: [{
                        scaleLabel: {
                          display: true,
                          labelString: axisLabels.x
                        }
                      }],

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
        let labels = [];
        // lets just do linear cause doing this in log n is more sofisticated and takes time
        let x = 0;
        let prev = filteredData[0];
        let currCount = 1;
        for (let i = 1; i < filteredData.length; i ++){
            if(prev == filteredData[i]){
                currCount ++;
            }else {
                returnArray.push(currCount);
                labels.push(prev);
                x++;
                currCount=1;
                prev = filteredData[i];
            }
        }
        // base case for last item in array
        returnArray.push(currCount);
        labels.push(prev);

        return {
            data: returnArray,
            labels: labels
        };

    }
}




export default Charter;