//---The BUCKET---(Top of the file)
let allVulnerablities = [] //This starts empty, like an empty bucket

// --- The PULLER (fetch)
async function loadNVDData() {
    const listElement = document.getElementById('vulnerability-list');
    const url = "https://services.nvd.nist.gov/rest/json/cves/2.0?resultsPerPage=5";

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                ' b904dcb8-4e57-47aa-80b0-a17940197d61'
                : NVD_API_KEY
            }
        }

        );

        const data = await response.json();
        allVulnerablities = data.vulnerabilities;

        //Once the data is collected, tell the PAINTER to start.
        displayVulnerabilities(allVulnerabilities);

        // ---The PAINTER (This is where your line lives!)
        function displayVulnerabilities(list) {
            const listElement = document.getElementById('vulnerability-list');
            listElement.innerHTML = '';
        }

        // Clear the "Loading..." text
        listElement.innerHTML = '';

        //Loop through the first 5 vulnerabilities
        data.vulnerabilities.forEach(item => {
            const cveID - item.cve.id;
            const description = item.cve.description[0].value;

            //Create a small card for each one
            const card = `<div class="vulnerability-card" style="border: 1px solid #444; margin:10px; padding: 10px;>
            <strong>style="color: #ff4d4d">${cveID}</strong>
            <p style="font-size: 0.9em">${description.substring(0, 150)}...</p></div>`;
            listElement.innerHTML += card;
        });
    } catch (error) {
        listElement.innerHTML = <p style="color: red;">Failed to load data: ${error.message}</p>;
    }
}

//This tells the "Puller" to Start the pull when website loads
loadNVDData();
