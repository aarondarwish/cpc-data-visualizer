const utils = require('./utils');

// The label is the campaignNames array, and the data is the campaignData array
const add_dataset = (label = ['N/A #1', 'N/A #2'], data = [[3, 2, 5, 6, 3, 1, 7], [1, 4, 5, 6, 7, 1, 4]]) => {
    let datasets = [];
    const colors = ["red",
        "orange",
        "yellow",
        "green",
        "blue",
        "purple",
        "grey"]

    //    console.log("TEST") 

    for (let i = 0; i < label.length; i++) {
        datasets.push({
            "label": label[i],
            "data": data[i],
            "borderColor": utils.CHART_COLORS[colors[i]],
            "backgroundColor": utils.transparentize(utils.CHART_COLORS[colors[i]], 0.5),
            "borderWidth": 2,
            "borderRadius": 5,
            "borderSkipped": false,
        });
    }
    return datasets;
}

module.exports = add_dataset;