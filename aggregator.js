const NVD_API_KEY = "b904dcb8-4e57-47aa-80b0-a17940197d61";

async function loadNVDData() {
    const listElement = document.getElementById('vulnerability-list');
    listElement.innerHTML = "<p class='text-blue-500 animate-pulse'>Searching for latest vulnerabilities...</p>";

    try {
        // We use a proxy to stop the "Something went wrong" error (CORS)
        const proxy = "https://corsproxy.io/?";
        const targetUrl = "https://services.nvd.nist.gov/rest/json/cves/2.0?resultsPerPage=10";

        const response = await fetch(proxy + encodeURIComponent(targetUrl), {
            method: 'GET',
            headers: { 'apiKey': NVD_API_KEY }
        });

        if (!response.ok) throw new Error(`Server responded with ${response.status}`);

        const data = await response.json();
        listElement.innerHTML = ''; // Clear loading message

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

    } catch (error) {
        console.error("Detailed Error:", error);
        listElement.innerHTML = `<div class="bg-red-50 p-3 text-red-700 rounded border border-red-200">
            <strong>Connection Blocked:</strong> ${error.message}. <br>
            <span class="text-xs">This usually happens when the NVD server is busy or blocking local requests.</span>
        </div>`;
    }
}

loadNVDData();
