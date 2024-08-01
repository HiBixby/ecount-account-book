const BACKEND = "http://localhost:5000"
async function getHistory() {
    const response = await fetch(BACKEND + "/view");
    return response.json();
}
getHistory();

async function renderHistory() {
    const data = await getHistory();
    const table = document.querySelector(".view table");
}