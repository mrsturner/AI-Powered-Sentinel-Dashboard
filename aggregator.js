const NVD_API_KEY = "b904dcb8-4e57-47aa-80b0-a17940197d61";

async function loadNVDData() {
    const listElement = document.getElementById('vulnerability-list');
    console.log("Robot is starting..."); // This shows up in the F12 Console

    try {
        const response = await fetch("https://services.nvd.nist.gov/rest/json/cves/2.0?resultsPerPage=5", {
            method: 'GET',
            headers: { 'apiKey': NVD_API_KEY }
        });

        const data = await response.json();
        console.log("Data received:", data);

        listElement.innerHTML = ''; // Clear "Loading..."

        data.vulnerabilities.forEach(item => {
            const id = item.cve.id;
            // The "Glue Gun" step
            listElement.innerHTML += `<div style="border:1px solid red; padding:10px; margin:5px;">Found: ${id}</div>`;
        });

    } catch (error) {
        console.error("The Robot broke here:", error);
        listElement.innerHTML = "Something went wrong. Check the F12 Console!";
    }
}

loadNVDData();
