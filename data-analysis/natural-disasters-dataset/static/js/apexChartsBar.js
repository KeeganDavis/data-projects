function addBar(disasterData) {

    // initiate disaster counts
    let disasterBarCounts ={
        Drought: 0,
        Earthquake: 0,
        'Extreme temperature': 0,
        Flood: 0,
        'Mass movement (dry)': 0,
        'Mass movement (wet)': 0,
        Storm: 0,
        'Volcanic activity': 0,
    };

    // loop through disaster data and add one to the corresponding disaster
    disasterData.forEach(disaster => {
        disasterBarCounts[disaster.Type] += 1;
    });

    // convert the disasterBarCounts object to an array, sort by the values, and then convert the array of arrays to an object
    let sortedDisasterCounts = Object.fromEntries(Object.entries(disasterBarCounts).sort((a, b) => b[1] - a[1]));
    
    // settings for apex charts
    let allDisastersSingleBarOptions = {
          series: [{
          name: 'Count',
          // get the values for each disaster
          data: Object.values(sortedDisasterCounts)
        }],
          chart: {
          type: 'bar',
          height: '800px',
        },
        title: {
            text: 'Locations Impacted by Each Type of Disaster',
            align: 'middle',
            style: {
                fontSize: '32px'
            }
        },
        plotOptions: {
          bar: {
            horizontal: true,
            distributed: true,
            columnWidth: '10%',
            dataLabels: {
                position: 'top'
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          // get the keys to label the x-axis with the disaster types
          categories: Object.keys(sortedDisasterCounts),
          max: 30000
        },
        colors: ['#ffee65', '#fdcce5', '#fd7f6f', '#7eb0d5', '#bd7ebe', '#8bd3c7', '#b2e061', '#ffb55a'],
        states: {
            hover: {
                filter: {
                    type: 'none',
                }
            }
        }
        };
    
    // apex charts code for adding to the html
    let allDisastersBarChart = new ApexCharts(document.querySelector('#disasterTypesBar'), allDisastersSingleBarOptions);
    allDisastersBarChart.render();
    
};