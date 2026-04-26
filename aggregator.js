//NVD API Key is the constant that holds the API key for accessing the NVD (National Vulnerability Database) API. This key is required to authenticate requests to the NVD API and retrieve vulnerability data. In this code, the API key is stored in the variable NVD_API_KEY, which is then used in the fetch request to access the NVD API and load vulnerability data into the dashboard.
const NVD_API_KEY = "b904dcb8-4e57-47aa-80b0-a17940197d61";

//function loadNVDData is used to get data from the API and show it on the dashboard.
async function loadNVDData() {
    //this line grabs the list element from the HTML where the vulnerabilities will be displayed in a list format. It also shows a message while the data is being fetched.
    const listElement = document.getElementById('vulnerability-list');
    //This line is telling the user that the API is still working on grabbing the latest vulnerabilities to display on the dashboard. Once the actual data is completely fetched, this message will be replaced with the actual vulnerabilities.
    listElement.innerHTML = "<p class='text-blue-500 animate-pulse'>Searching for latest vulnerabilities...</p>";
//This line is a try-catch block. It first tries to fetch the data from the API and if there is an error or if there is a block from the server, it will catch the error and display a message on the dashboard.
    try {
        // We use a proxy to stop the "Something went wrong" error (CORS)
        const proxy = "https://corsproxy.io/?";
        const targetUrl = "https://services.nvd.nist.gov/rest/json/cves/2.0?resultsPerPage=10";
//This line is making a request to GET the data from the API. The request was sent to the proxy server. The proxy server forwards the request to the API and then send the response back to the dashboard. The API key is included in the headers of the request for authentication.
        const response = await fetch(proxy + encodeURIComponent(targetUrl), {
            method: 'GET',
            headers: { 'apiKey': NVD_API_KEY }
        });
//This line checks if the API sent a response with a successful status code (200-299). If the response is not successful, it will throw an error status code. This is important to handle cases where the API might be down, the request is blocked, or there are issues with the API key.
        if (!response.ok) throw new Error(`Server responded with ${response.status}`);
//This line is parsing the response from the API and JSON data that is being extracted from the response. The data that is extracted will be the vulnerabilities that are going to be displayed on the dashboard.
        const data = await response.json();
        listElement.innerHTML = ''; // Clear loading message
//This line is looping through the vulnerabilities that are sent from the API and creating a card for each vulnerability. Each card will show the CVE ID and the description of the vulnerability. The description is filtered to show only in English. If there is no description it will show a default message. The card is styled with Tailwind CSS classes to give the dashboard a clean look.
        data.vulnerabilities.forEach(item => {
            const id = item.cve.id;
            const desc = item.cve.descriptions.find(d => d.lang === 'en')?.value || "No description available.";

            listElement.innerHTML += `
                <div class="bg-white p-4 mb-4 border-l-4 border-red-500 shadow-md rounded-lg">
                    <h3 class="font-bold text-blue-900">${id}</h3>
                    <p class="text-sm text-gray-700 mt-1">${desc}</p>
                </div>
            `;
        });
//This line is catching any errors that occur during the fetch request or while processing the data. If there is an error, it will log the error details to the console and display a user-friendly message on the dashboard. The message explains that the connection was blocked and provides a possible reason for the issue, which is often related to the NVD server being busy or blocking local requests.
    } catch (error) {
        console.error("Detailed Error:", error);
        listElement.innerHTML = `<div class="bg-red-50 p-3 text-red-700 rounded border border-red-200">
            <strong>Connection Blocked:</strong> ${error.message}. <br>
            <span class="text-xs">This usually happens when the NVD server is busy or blocking local requests.</span>
        </div>`;
    }
}
//This line calls the loadNVDData function when the page loads. This means that as soon as the user opens the dashboard, it will automatically fetch the latest vulnerabilities from the NVD API and display them on the dashboard without the user having to click any buttons. This provides an immediate view of the current security landscape as soon as the dashboard is accessed.
loadNVDData();
