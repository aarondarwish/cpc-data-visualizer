<template>
    <Bar
        :chart-options="chartOptions"
        :chart-data="chartData"
        :chart-id="chartId"
        :dataset-id-key="datasetIdKey"
        :plugins="plugins"
        :css-classes="cssClasses"
        :styles="styles"
        :width="width"
        :height="height"
    />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
const utils = require('../lib/utils')
const add_dataset = require('../lib/dataset');
import axios from 'axios';

// Initiate ChartJS
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// Month - Just for the experiment, run 7 months. The number was chosen arbitrarily
const labels = utils.months({ count: 7 });

// HTTP call to the decoy/experimental backend
const url = `${process.env.VUE_APP_SERVER}/campaigns/all`;

// Declare the data arrays
var campaignsData = [];
var campaignsNames = [];
var campaignsIDs = [];

export default {
    name: 'BarChart',
    components: { Bar },
    props: {
        chartId: {
            type: String,
            default: 'bar-chart'
        },
        datasetIdKey: {
            type: String,
            default: 'label'
        },
        width: {
            type: Number,
            default: 400
        },
        height: {
            type: Number,
            default: 400
        },
        cssClasses: {
            default: '',
            type: String
        },
        styles: {
            type: Object,
            default: () => { }
        },
        plugins: {
            type: Object,
            default: () => { }
        }
    },
    data() {
        return {
            chartData: {
                labels: labels,
                datasets: [],
            },
            chartOptions: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        "text": 'Analytics Data'
                    }
                }
            }
        }
    },
    async mounted() {
        await axios(url, {
            method: 'GET',
            mode: 'no-cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            withCredentials: false,
            credentials: 'same-origin',
        }).then(res => {
            // "i" is roughly the segment of the month - Though not exactly, the data that is being represented is still wrong, the solution should follow a procedure similar to this:
            /*
                // Sort it by date
                var unsortedDates = res.data.map((campaign) => campaign.date_start.slice(6, 7));
                var sortedDates = [... unsortedDates];
                sortedDates.sort();
                console.log(`sorted:\n${sortedDates}\nunsorted:\n${unsortedDates}`);
                
                var siloedCampaignsData = [];
                for (let j = 0; j < unsortedDates.length; j++) siloedCampaignsData.push(campaignsData[unsortedDates.indexOf(sortedDates)]); // This is also wrong, just a rough idea
            */


            for (let i = 0; i < res.data.length; i++) {
                campaignsData[i] = [];
                // Does this month reveal a new campaign_id? If so, register it
                if (campaignsIDs.indexOf(res.data[i].campaign_id) === -1) campaignsIDs.push(res.data[i].campaign_id);
                // If the campaign_id of a particular response index matches the id's location, then proceed to insert it
                campaignsData[campaignsIDs.indexOf(res.data[i].campaign_id)][i] = res.data[i].impressions;
                campaignsNames[campaignsIDs.indexOf(res.data[i].campaign_id)] = res.data[i].campaign_name;
            }
            console.log(`Test: ${JSON.stringify(res.data)}`);
            /* If at a specific month, all the other campaigns have no registered impressions data, proceed to nullify it */
            for (let i = 0; i < campaignsIDs.length; i++)
                for (let j = 0; j < 7; j++)
                    if (campaignsData[i][j] == undefined) campaignsData[i][j] = 0;

            add_dataset(campaignsNames, campaignsData).forEach((item) => this.chartData.datasets.push(item));
        }).catch(err => console.log(`An error has occurred:\t${err}`));
    }
}
</script>

<style>
body {
    background: #eff8ff;
    height: 100vh;
    width: 100vw;
    font-family: system-ui, BlinkMacSystemFont, -apple-system, Segoe UI, Roboto,
        Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
        sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
}

.counter {
    font-size: 0.8rem;
    padding-left: 10px;
    padding-right: 10px;
}

#app {
    background: #fff;
    padding: 2rem;
    margin: 1rem;
    border-radius: 3px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.12), 0 2px 4px 0 rgba(0, 0, 0, 0.08);
    width: 95%;
    max-width: 900px;
}

h1 {
    color: #3d4852;
}

ul {
    list-style: none;
    padding: 0;
}

a {
    color: #6cb2eb;
    font-size: 1.25rem;
    transition: all 0.1s ease-in;
    margin-top: 0.5rem;
    display: block;
}

a:hover {
    color: #3490dc;
}

/* List items elements are currently not being used, but still define a CSS for them */
li,
p {
    display: flex;
    align-items: center;
    line-height: 1.75;
    letter-spacing: 0.5px;
    color: #3d4852;
    font-size: 1.25rem;
    cursor: pointer;
    transition: all 0.1s ease-in;
}

li:hover {
    color: #22292f;
}

li input {
    margin: 0 0.5rem 0;
}
</style>
