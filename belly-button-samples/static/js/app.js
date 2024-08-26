const url = 'https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json';

const dataPromise = d3.json(url);

function init() {
    // create a default bar chart on initialization
    barData = [{
      x: ['1', '2', '3', '4', '5'],
      y: [1, 2, 4, 8, 16],
      type: 'bar',
      orientation: 'h',
      text: ['a', 'b', 'c', 'd', 'e'],
      hoverinfo: 'text'
    }];

    // default bubble chart data
    bubbleData = [{
        x: ['1', '2', '3', '4', '5'],
        y: [1, 2, 4, 8, 16],
        mode: 'markers',
        marker: {
            color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)', 'rgb(255, 0, 0)'],
            size: [40, 60, 80, 100, 120]
        },
        text: ['a', 'b', 'c', 'd', 'e'],
    }];
  
    // create default plots to load
    Plotly.newPlot("bar", barData);
    Plotly.newPlot("bubble", bubbleData)
  }

  function optionChanged() {
    dataPromise.then(data => {
        /*
        function to run everytime the dropdown menu is updated and once when the webpage loads. the bar chart, bubble chart, and demographic info will update 
        to display the samples for the selected individual
        */

        // get all name data
        const allNames = data['names'];

        // select the dropdown menu and store the value
        let dropdownMenu = d3.select('#selDataset');
        let dataset = dropdownMenu.property('value');

        // find the index where the dropdow value is located in the names array   
        let nameIndex = allNames.indexOf(dataset);  

        // collect all data in arrays for the samples and use that to get an array of arrays containing the sample values, otu ids, and otu labels
        const allSamples = data['samples'];
        const sampleValues = allSamples.map(sample => sample['sample_values']);
        const otuIds = allSamples.map(sample => sample['otu_ids']);
        const otuLabels = allSamples.map(sample => sample['otu_labels']);

        // initialize arrays to hold our modified bar chart values
        let x = [];
        let y = [];
        let text = [];

        // update the arrays to hold the top 10 OTUs found on the individual using the index. Reverse to follow plotly formatting
        x = sampleValues[nameIndex].slice(0, 10).reverse();
        y = otuIds[nameIndex].slice(0, 10).map(sample => 'OTU ' + sample.toString()).reverse(); // convert OTU number to string and concatenate it w/ OTU label
        text = otuLabels[nameIndex].slice(0, 10).reverse();

        // restyle the bar chart with the new individual's stats
        Plotly.restyle('bar', 'x', [x]);
        Plotly.restyle('bar', 'y', [y]);
        Plotly.restyle('bar', 'text', [text]);

        // restyle the bubble chart with the new individual's stats
        Plotly.restyle('bubble', 'x', [otuIds[nameIndex]]);
        Plotly.restyle('bubble', 'y', [sampleValues[nameIndex]]);
        Plotly.restyle('bubble', 'text', [otuLabels[nameIndex]]);
        Plotly.restyle('bubble', 'marker.size', [sampleValues[nameIndex]]);
        Plotly.restyle('bubble', 'marker.color', [otuIds[nameIndex]]);

        // store the array of all the metadata
        const metadata = data['metadata']

        // update all previously created unordered list elements with the corresponding metadata for the selected individual
        d3.select('[name="id"]').text(`id: ${metadata[nameIndex]['id']}`)
        d3.select('[name="ethnicity"]').text(`ethnicity: ${metadata[nameIndex]['ethnicity']}`)
        d3.select('[name="gender"]').text(`gender: ${metadata[nameIndex]['gender']}`)
        d3.select('[name="age"]').text(`age: ${metadata[nameIndex]['age']}`)
        d3.select('[name="location"]').text(`location: ${metadata[nameIndex]['location']}`)
        d3.select('[name="bbtype"]').text(`bbtype: ${metadata[nameIndex]['bbtype']}`)
        d3.select('[name="wfreq"]').text(`wfreq: ${metadata[nameIndex]['wfreq']}`)

    });    
  };

dataPromise.then(data => {
    // get all subject names and the select html element
    const allNames = data['names'];
    let dropdownMenu = d3.select('#selDataset');
    
    // loop through each name and add an option element with the text and value attribute equal to the name
    allNames.forEach(name => {
        dropdownMenu.append('option')
                .text(name)
                .attr('value', name)
    });

    // select div for metadata and add unordered list
    let demographicDiv = d3.select('#sample-metadata');
    let metadataList = demographicDiv.append('ul')

    // add list elements for each section of metadata with the corresponding name attribute
    metadataList.append('li').attr('name', 'id')
    metadataList.append('li').attr('name', 'ethnicity')
    metadataList.append('li').attr('name', 'gender')
    metadataList.append('li').attr('name', 'age')
    metadataList.append('li').attr('name', 'location')
    metadataList.append('li').attr('name', 'bbtype')
    metadataList.append('li').attr('name', 'wfreq')
});

// run both functions so the default data gets updated w/ the data of the first subject
init();
optionChanged();