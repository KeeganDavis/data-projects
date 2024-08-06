// Function to fetch JSON data from the server
function fetchData() {
    fetch('https://keegandavis.github.io/disaster-data-json/disaster_cost.json') // Update the path to your JSON file
        .then(response => response.json())
        .then(data => {
            // Process the data and create the Plotly visualization
            createPlot(data);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Function to create the Plotly visualization
function createPlot(data) {
    // Extract necessary data from the JSON
    const xValues = data.map(entry => entry['Region'] + ': ' + entry['Disaster Type']);
    const yValues = data.map(entry => entry['Total Cost']);

    // Create the Plotly trace
    const trace = {
        x: xValues,
        y: yValues,
        type: 'bar'
    };

    // Define layout options
    const layout = {
        title: 'Total Cost by Region and Disaster Type',
        height: 600,
        width: 1200,
        xaxis: { tickfont: {size: 12}, tickangle: 70, automargin: true},
        yaxis: { title: 'Total Cost (\'000 US$)' }
    };

    // Plot the data in the 'plotDiv'
    Plotly.newPlot('plotDiv', [trace], layout);
}
