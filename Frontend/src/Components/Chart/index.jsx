import ApexCharts from 'apexcharts';
import ReactApexChart from "react-apexcharts";

const dummy = [1, 2, 4, 3, 1, 6, 8, 10, 15, 8, 9, 13, 7]

export default function MyChart(props){

    const series = [{
        name: props.label,
        data: props.data
    }]

    const options = {
          chart: {
            type: 'area',
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight'
          },
          title: {
            text: '',
            align: 'left'
          },
          subtitle: {
            text: `${props.title} during this year`,
            align: 'left'
          },
          labels: [props.label],
          xaxis: {
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          },
          yaxis: {
            opposite: true
          },
          legend: {
            horizontalAlign: 'left'
          }
        }

    return (
        <ReactApexChart options={options} series={series} type="area" height={300} width={590}/>       
    )
}
