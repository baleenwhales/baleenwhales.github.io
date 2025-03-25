const container = document.getElementById("container");

const homeButton = document.getElementById("home_button");
const viewButton = document.getElementById("view_button");
const creditsButton = document.getElementById("credits_button");

const whaleIndices = {

    antarctic_minke_whale : 0,
    blue_whale : 1,
    bowhead_whale : 2,
    brydes_whale : 3,
    common_minke_whale : 4,
    edens_whale : 5,
    fin_whale : 6,
    gray_whale : 7,
    humpback_whale : 8,
    north_atlantic_right_whale : 9,
    north_pacific_right_whale : 10,
    omuras_whale : 11,
    pygmy_right_whale : 12,
    rices_whale : 13,
    sei_whale : 14,
    southern_right_whale : 15

};

const antarctic_minke_whale_button = document.getElementById(antarctic_minke_whale);
const blue_whale_button = document.getElementById(blue_whale);
const bowhead_whale_button = document.getElementById(bowhead_whale);
const brydes_whale_button = document.getElementById(brydes_whale);
const common_minke_whale_button = document.getElementById(common_minke_whale);
const edens_whale_button = document.getElementById(edens_whale);
const fin_whale_button = document.getElementById(fin_whale);
const gray_whale_button = document.getElementById(gray_whale);
const humpback_whale_button = document.getElementById(humpback_whale);
const north_atlantic_right_whale_button = document.getElementById(north_atlantic_right_whale);
const north_pacific_right_whale_button = document.getElementById(north_pacific_right_whale);
const omuras_whale_button = document.getElementById(omuras_whale);
const pygmy_right_whale_button = document.getElementById(pygmy_right_whale);
const rices_whale_button = document.getElementById(rices_whale);
const sei_whale_button = document.getElementById(sei_whale);
const southern_right_whale_button = document.getElementById(southern_right_whale);

const whaleButtonList = [
    antarctic_minke_whale,
    blue_whale,
    bowhead_whale,
    brydes_whale,
    common_minke_whale,
    edens_whale,
    fin_whale,
    gray_whale,
    humpback_whale,
    north_atlantic_right_whale,
    north_pacific_right_whale,
    omuras_whale,
    pygmy_right_whale,
    rices_whale,
    sei_whale,
    southern_right_whale
]

let whaleData = [];

async function loadWhaleData() {

    const response = await fetch('assets/whale_data.csv');
    const data = await response.text();
    const rows = data.trim().split('\n');

    rows.forEach(row => {

        const columns = row.split(',');
        const name = columns[0];
        const scientificName = columns[1];
        const family = columns[2];
        const length = columns[3];
        const weight = columns[4];
        const conservationStatus = columns[5];

        whaleData.push({ name, scientificName, family, length, weight, conservationStatus });

    });

    return whaleData

}

function loadWhale(whaleName) {

    index = whaleIndices[whaleName];

    whale = whaleData[index];

    container.innerHTML = `

    <div class="label">

        <p>${whale.name}</p>

    </div>

    <div class="scrollable_content" id="scrollable_content">

        <img src="assets/` + whaleName + `.webp">

        <div class="divider"></div>

        <p><b>Scientific Name:</b> ${whale.scientificName} </p>
        <p><b>Family Name:</b> ${whale.family} </p>
        <p><b>Length:</b> ${whale.length} </p>
        <p><b>Weight:</b> ${whale.weight} </p>
        <p><b>Conservation Status:</b> ${whale.conservationStatus} </p>

    </div>
    
    `;

}

function selectWhale(w) {

    if (typeof selectedWhale !== "undefined") {
        prevSelected(selectedWhale);
    }
    
    selectedWhale = w;

    i = whaleIndices[w];
    wb = whaleButtonList[i];
    wb.classList.add("buttonSelected");

    if (typeof previouslySelectedWhale !== "undefined") {

        if (previouslySelectedWhale !== selectedWhale) {
            i = whaleIndices[previouslySelectedWhale];
            wb = whaleButtonList[i];
            wb.classList.remove("buttonSelected");
        }

    }

    return selectedWhale;
}

function prevSelected(w) {
    previouslySelectedWhale = w;
    return previouslySelectedWhale;
}

function loadHome() {
    document.querySelector('.loadable_whales').style.display = "flex";
    document.querySelector('.container').style.display = "none";
    document.querySelector('.credits').style.display = "none";
    homeButton.classList.add("buttonSelected");
    viewButton.classList.remove("buttonSelected");
    creditsButton.classList.remove("buttonSelected");
}

function loadView() {
    loadWhale(selectedWhale);
    document.querySelector('.loadable_whales').style.display = "none";
    document.querySelector('.container').style.display = "flex";
    document.querySelector('.credits').style.display = "none";
    viewButton.classList.add("buttonSelected");
    homeButton.classList.remove("buttonSelected");
    creditsButton.classList.remove("buttonSelected");
}

function loadCredits() {
    document.querySelector('.loadable_whales').style.display = "none";
    document.querySelector('.container').style.display = "none";
    document.querySelector('.credits').style.display = "flex";
    creditsButton.classList.add("buttonSelected");
    homeButton.classList.remove("buttonSelected");
    viewButton.classList.remove("buttonSelected");
}

loadWhaleData();

loadHome();

selectWhale("fin_whale");