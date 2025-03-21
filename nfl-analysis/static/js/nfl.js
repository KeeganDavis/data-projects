document.addEventListener("DOMContentLoaded", function () {
    const btnSeason = document.getElementById("btnSeason");
    const btnLast5 = document.getElementById("btnLast5");

    // Add color to rank based on being in the rough tertile
    function formatRank(rank) {
    // Remove suffix from number
    let rankInt = parseInt(rank.match(/\d+/)[0]);  

    let color;
    if (rankInt <= 10) {
        color = "green";
    } else if (rankInt <= 21) {
        color = "orange";
    } else {
        color = "red";
    }

    return `<span style="color: ${color}">(${rank})</span>`;
    }

    // Function to update season stats table on button click
    function updateTable(dataType) {
        const game = gameData;

        // Select the correct dataset based on button click for records
        let awayRecord = (dataType == "season") ? `${game.awayWins}-${game.awayLosses}` + (game.awayTies > 0 ? `-${game.awayTies}` : "") +
            ` (${game.awayWinsOnRoad}-${game.awayLossesOnRoad}` + (game.awayTiesOnRoad > 0 ? `-${game.awayTiesOnRoad} Away)` : " Away)") :
            `${game.awayWinsLast5}-${game.awayLossesLast5}` + (game.awayTiesLast5 > 0 ? `-${game.awayTiesLast5}` : "");

        let homeRecord = (dataType == "season") ? `${game.homeWins}-${game.homeLosses}` + (game.homeTies > 0 ? `-${game.homeTies}` : "") +
            ` (${game.homeWinsAtHome}-${game.homeLossesAtHome}` + (game.homeTiesAtHome > 0 ? `-${game.homeTiesAtHome} Home)` : " Home)") :
            `${game.homeWinsLast5}-${game.homeLossesLast5}` + (game.homeTiesLast5 > 0 ? `-${game.homeTiesLast5}` : "");

        let awayATS = (dataType == "season") ? `${game.awayATSWin}-${game.awayATSLoss}` + (game.awayATSPush > 0 ? `-${game.awayATSPush}` : "") +
            ` (${game.awayATSWinOnRoad}-${game.awayATSLossOnRoad}` + (game.awayATSPushOnRoad > 0 ? `-${game.awayATSPushOnRoad} Away)` : " Away)") :
            `${game.awayATSWinLast5}-${game.awayATSLossLast5}` + (game.awayATSPushLast5 > 0 ? `-${game.awayATSPushLast5}` : "");

        let homeATS = (dataType == "season") ? `${game.homeATSWin}-${game.homeATSLoss}` + (game.homeATSPush > 0 ? `-${game.homeATSPush}` : "") +
            ` (${game.homeATSWinAtHome}-${game.homeATSLossAtHome}` + (game.homeATSPushAtHome > 0 ? `-${game.homeATSPushAtHome} Home)` : " Home)") :
            `${game.homeATSWinLast5}-${game.homeATSLossLast5}` + (game.homeATSPushLast5 > 0 ? `-${game.homeATSPushLast5}` : "");

        let awayOU = (dataType == "season") ? `${game.awayOver}-${game.awayUnder}` + (game.awayPush > 0 ? `-${game.awayPush}` : "") +
            ` (${game.awayOverOnRoad}-${game.awayUnderOnRoad}` + (game.awayPushOnRoad > 0 ? `-${game.awayPushOnRoad} Away)` : " Away)") :
            `${game.awayOverLast5}-${game.awayUnderLast5}` + (game.awayPushLast5 > 0 ? `-${game.awayPushLast5}` : "");

        let homeOU = (dataType == "season") ? `${game.homeOver}-${game.homeUnder}` + (game.homePush > 0 ? `-${game.homePush}` : "") +
            ` (${game.homeOverAtHome}-${game.homeUnderAtHome}` + (game.homePushAtHome > 0 ? `-${game.homePushAtHome} Home)` : " Home)") :
            `${game.homeOverLast5}-${game.homeUnderLast5}` + (game.homePushLast5 > 0 ? `-${game.homePushLast5}` : "");

        

        // Update table for records
        document.getElementById("awayRecord").innerText = awayRecord;
        document.getElementById("homeRecord").innerText = homeRecord;
        document.getElementById("awayATS").innerText = awayATS;
        document.getElementById("homeATS").innerText = homeATS;
        document.getElementById("awayOU").innerText = awayOU;
        document.getElementById("homeOU").innerText = homeOU;

        // Function to dynamically get the correct rank column name
        function getRankColumn(stat) {
            return (dataType === "season") ? game[`${stat}Rank`] : game[`${stat}Last5Rank`];
        }

        // Define offensive stats to update
        const stats = ["awayAvgPassYdsFor", "homeAvgPassYdsFor", 
                    "awayAvgRushYdsFor", "homeAvgRushYdsFor", 
                    "awayAvgTotalYdsFor", "homeAvgTotalYdsFor",
                    "awayAvgFinalScoreFor", "homeAvgFinalScoreFor"];

        // Loop through stats and update table dynamically
        stats.forEach(stat => {
            let rankColumn = getRankColumn(stat);
            let statValue = (dataType === "season") ? game[stat] : game[`${stat}Last5`];
            
            // Update the table using dynamically constructed IDs
            document.getElementById(stat).innerHTML = `${statValue} ${formatRank(rankColumn)}`;
        });

        // Define defensive stats to update
        const defStats = ["awayAvgPassYdsAgainst", "homeAvgPassYdsAgainst", 
                    "awayAvgRushYdsAgainst", "homeAvgRushYdsAgainst", 
                    "awayAvgTotalYdsAgainst", "homeAvgTotalYdsAgainst",
                    "awayAvgFinalScoreAgainst", "homeAvgFinalScoreAgainst"];

        // Loop through stats and update table dynamically
        defStats.forEach(stat => {
            let rankColumn = getRankColumn(stat);
            let statValue = (dataType === "season") ? game[stat] : game[`${stat}Last5`];
            
            // Update the table using dynamically constructed IDs
            document.getElementById(stat).innerHTML = `${statValue} ${formatRank(rankColumn)}`;
        });
    }

    // Default: Load Season Averages on Page Load
    updateTable("season");

    // Add event listeners to buttons
    btnSeason.addEventListener("click", function () {
        updateTable("season");
    });

    btnLast5.addEventListener("click", function () {
        updateTable("last5");
    });

    // Function to update chart based on radio button choices
    function updateGraph() {
        // Get selected stat, team, and side
        console.log('updating graph')
        const selectedStat = document.querySelector('input[name="statOptions"]:checked').id;
        const selectedTeam = document.querySelector('input[name="teamOptions"]:checked').id;
        const selectedSide = document.querySelector('input[name="sideOptions"]:checked').id;

        // Get selected years and weeks
        const startYear = parseInt(document.getElementById("startYear").value);
        const startWeek = parseInt(document.getElementById("startWeek").value);
        const endYear = parseInt(document.getElementById("endYear").value);
        const endWeek = parseInt(document.getElementById("endWeek").value);

        // Ensure valid input selection
        if ((startYear === endYear) && (startWeek > endWeek)) {
            alert("Invalid selection: start week must be before end week.");
            return;
        }

        // Filter home and away data based on year & week range
        let filteredHomeData = homeData.filter(game =>
            (game.year > startYear || (game.year === startYear && game.weekNumber >= startWeek)) &&
            (game.year < endYear || (game.year === endYear && game.weekNumber <= endWeek))
        );

        let filteredAwayData = awayData.filter(game =>
            (game.year > startYear || (game.year === startYear && game.weekNumber >= startWeek)) &&
            (game.year < endYear || (game.year === endYear && game.weekNumber <= endWeek))
        );

        let homeWeeks = filteredHomeData.map(game => `${game.year} - Week ${game.weekNumber} vs. ${game.oppAbbr}`);
        let awayWeeks = filteredAwayData.map(game => `${game.year} - Week ${game.weekNumber} vs. ${game.oppAbbr}`);

        // Get correct X-axis labels for current selection
        let xLabels, team;

        if (selectedTeam === "home") {
            xLabels = homeWeeks;
            team = homeData[0]['team'];
        } else if (selectedTeam === "away") {
            xLabels = awayWeeks;
            team = awayData[0]['team'];
        }

        // Get stats for or against team
        let homeStats, awayStats, sideTitle;

        if (selectedSide === "offense") {
            homeStats = filteredHomeData.map(game => game["team" + selectedStat]);
            awayStats = filteredAwayData.map(game => game["team" + selectedStat]);
            sideTitle = ''
        } else {
            homeStats = filteredHomeData.map(game => game["opp" + selectedStat]);
            awayStats = filteredAwayData.map(game => game["opp" + selectedStat]);
            sideTitle = 'Opponent'
        }

        let traces = [];

        if (selectedTeam === "home") {
            traces.push({
                x: xLabels,
                y: homeStats,
                type: "scatter",
                mode: "lines+markers",
                name: homeData[0]['team'],
                marker: {
                    color: homeData[0]['teamPrimaryCol'],
                    size: 8,
                    symbol: 'circle',
                    line: {
                    color: homeData[0]['teamSecondaryCol'],
                    width: 1.5
                    }
                },
                line: { color: homeData[0]['teamPrimaryCol'] }
            });
        }

        if (selectedTeam === "away") {
            traces.push({
                x: xLabels,
                y: awayStats,
                type: "scatter",
                mode: "lines+markers",
                name: awayData[0]['team'],
                marker: {
                    color: awayData[0]['teamPrimaryCol'],
                    size: 8,
                    symbol: 'circle',
                    line: {
                    color: awayData[0]['teamSecondaryCol'],
                    width: 1.5
                    }
                },
                line: { color: awayData[0]['teamPrimaryCol'] }
            });
        }

        // Assign variables to add to chart title and y-axis labels based on stat that is selected
        let statTitle, statLabel;
        if (selectedStat == 'FinalScore') {
            statTitle = "Scoring"
            statLabel = "Points Scored";
        } else if (selectedStat == 'PassYds') {
            statTitle = "Passing Yard"
            statLabel = "Passing Yards";
        } else if (selectedStat == 'RushYds') {
            statTitle = "Rushing Yard"
            statLabel = "Rushing Yards";
        } else if (selectedStat == 'TotalYds') {
            statTitle = "Total Yardage"
            statLabel = "Total Yards";
        }

        let layout = {
            title: { 
                text: `${team}${sideTitle ? ' ' + sideTitle : ''} ${statTitle} Trends<br><span style="font-size: 12px;">(From Week ${startWeek} of ${startYear} to Week ${endWeek} of ${endYear})</span>`,
                font: { size: 17 }
            },
            xaxis: { 
                title: { text: "Game", font: { size: 14 } },  
                tickangle: -45, 
                automargin: true 
            },
            yaxis: { 
                title: { text: statLabel, font: { size: 14 } } 
            },
            showlegend: true,
            responsive: true
        };

        Plotly.newPlot("statGraph", traces, layout, {responsive: true});
    }

    // Define variables outside of function
    let currentYear = gameData.year;
    let currentWeek = gameData.weekNumber;

    let startYearSelect = document.getElementById("startYear");
    let startWeekSelect = document.getElementById("startWeek");
    let endYearSelect = document.getElementById("endYear");
    let endWeekSelect = document.getElementById("endWeek");

    // Populate year dropdowns
    if (currentWeek == 1) {
        startYearSelect.innerHTML += `<option value="${currentYear - 1}">${currentYear - 1}</option>`;
        endYearSelect.innerHTML += `<option value="${currentYear - 1}">${currentYear - 1}</option>`;
    } else if ((currentWeek > 18 && currentYear > 2020) || ((currentWeek > 17 && currentYear <= 2020))) {
        startYearSelect.innerHTML += `<option value="${currentYear}">${currentYear}</option>`;
        endYearSelect.innerHTML += `<option value="${currentYear}">${currentYear}</option>`;
    } 
    else if (currentWeek > 1) {
        for (let year = (currentYear - 1); year <= currentYear; year++) {
            startYearSelect.innerHTML += `<option value="${year}">${year}</option>`;
            endYearSelect.innerHTML += `<option value="${year}">${year}</option>`;
        }
    }

    function getMaxWeeks() {
        let selectedTeam = document.querySelector('input[name="teamOptions"]:checked').id;

        // Get max week from filtered data of previous year
        let maxHomeWeek = Math.max(...homeData.filter(game => game.year === (currentYear - 1)).map(game => game.weekNumber));
        let maxAwayWeek = Math.max(...awayData.filter(game => game.year === (currentYear - 1)).map(game => game.weekNumber));

        // Determine max week based on selected team
        let maxWeeks;
        if (selectedTeam === "home") {
            maxWeeks = maxHomeWeek;
        } else if (selectedTeam === "away") {
            maxWeeks = maxAwayWeek;
        }

        return maxWeeks;
    }

    function updateWeekOptions() {
        console.log('updating week options');

        let selectedStartYear = parseInt(startYearSelect.value);
        let selectedEndYear = parseInt(endYearSelect.value);
        
        maxWeeks = getMaxWeeks();

        // Store previous selections
        let prevStartWeek = startWeekSelect.value;
        let prevEndWeek = endWeekSelect.value;

        // Reset week dropdowns
        startWeekSelect.innerHTML = "";
        endWeekSelect.innerHTML = "";

        // Populate dropdowns dynamically
        // TODO: get array of weeks from away or home data
        if (selectedStartYear < currentYear) {
            for (let week = currentWeek; week <= maxWeeks; week++) {
                startWeekSelect.innerHTML += `<option value="${week}">Week ${week}</option>`;
            }
        } else {
            for (let week = 1; week < currentWeek; week++) {
                startWeekSelect.innerHTML += `<option value="${week}">Week ${week}</option>`;
            }
        }

        if (selectedEndYear < currentYear) {
            for (let week = currentWeek; week <= maxWeeks; week++) {
                endWeekSelect.innerHTML += `<option value="${week}">Week ${week}</option>`;
            }
        } else {
            for (let week = 1; week < currentWeek; week++) {
                endWeekSelect.innerHTML += `<option value="${week}">Week ${week}</option>`;
            }
        }

        // Restore previous selections (if still valid)
        startWeekSelect.value = startWeekSelect.querySelector(`option[value="${prevStartWeek}"]`) ? prevStartWeek : startWeekSelect.options[0].value;
        endWeekSelect.value = endWeekSelect.querySelector(`option[value="${prevEndWeek}"]`) ? prevEndWeek : endWeekSelect.options[endWeekSelect.options.length - 1].value;

    }

    // Set default year values for dropdowns
    startYearSelect.value = currentYear - 1;
    if (currentWeek === 1) {
        endYearSelect.value = currentYear - 1;
    } else if ((currentWeek > 18 && currentYear > 2020) || ((currentWeek > 17 && currentYear <= 2020))) {
        startYearSelect.value = currentYear
        endYearSelect.value = currentYear
    }
    else {
        endYearSelect.value = currentYear;
    }
    
    updateWeekOptions();

    // Set default week values for dropdowns
    startWeekSelect.value = currentWeek;

    if (currentWeek === 1) {
        endWeekSelect.value = getMaxWeeks();
    } else if ((currentWeek > 18 && currentYear > 2020) || ((currentWeek > 17 && currentYear <= 2020))) {
        startWeekSelect.value = 1;
        endWeekSelect.value = currentWeek - 1;
    } 
    else if (currentWeek > 1) {
        endWeekSelect.value = currentWeek - 1;
    }
    // Listen for changes in year selection to update weeks dynamically
    startYearSelect.addEventListener("change", updateWeekOptions);
    endYearSelect.addEventListener("change", updateWeekOptions);

    document.getElementById("gameFilter").addEventListener("click",() => {
        updateGraph();
        updateWeekOptions();
    });
    
    // Load Initial Graph
    updateGraph();

    // Button to expand plotly chart to fullscreen
    document.getElementById("expandChartBtn").addEventListener("click", function () {
        // Copy the current chart data
        let chartData = document.getElementById("statGraph").data;
        let chartLayout = document.getElementById("statGraph").layout;

        // Open modal
        let modal = new bootstrap.Modal(document.getElementById("chartModal"));
        modal.show();

        // Render the chart inside the modal
        Plotly.newPlot("fullScreenChart", chartData, chartLayout, { responsive: true });
    });

});