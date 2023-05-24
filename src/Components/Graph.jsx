import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import { useTheme } from '../Context/ThemeContext';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)
const Graph = ({graphData}) => {
    const{theme} = useTheme();

    return (
        <div>
            <Line
                data={
                    {
                        labels: graphData.map(i=>i[0]),
                        datasets: [
                            {
                                data:graphData.map(i=>i[1]) ,
                                label: 'graph1' ,
                                borderColor: theme.textColor
                            },
                            // {
                            //     data: [5,6,10],
                            //     label: 'graph2',
                            //     borderColor: 'red'
                            // }
                        ]
                    }
                } />
        </div>
    )
}

export default Graph