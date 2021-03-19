const searchInput = document.querySelector(".srch");
const showList = document.querySelector(".show-list");
const footer = document.querySelector("footer");
const dropdown = document.querySelector(".dropdown");
const showName = document.querySelector(".show-name");
const showImage = document.querySelector(".show-image img");
const seasonTitle = document.querySelector(".season-title");
const dateList = document.querySelector(".date-list");
const castNames = document.querySelector(".cast-names");
const detailsText = document.querySelector(".details-text");




const rootUrl = "http://api.tvmaze.com";
const allShowsUrl = "/shows";
const singleShow = "/shows/" // + ShowId;
const searchShowUrl = "/search/shows?q=";
const seasons = '/seasons'
const cast = '/cast';


window.onload = () => {
    dropdown.style.display = "none";
    footer.style.display = "none";
    setTimeout(() => {
        footer.style.display = "flex";
    }, 200)
}



searchInput.addEventListener("keyup", onSearch);

getShowId();

// SEARCH
function onSearch() {
    searchInput.value === ""
        ? (dropdown.style.display = "none")
        : (dropdown.style.display = "block");

    dropdown.innerHTML = "";
    const req = new XMLHttpRequest();

    req.open("GET", rootUrl + searchShowUrl + searchInput.value);
    req.send();
    req.onload = () => getShow(JSON.parse(req.responseText));
}

function getShow(tvShows) {

    if (!tvShows.length) {
        dropdown.style.display = "none";
    }

    tvShows.forEach((show) => {

        const li = document.createElement("li");
        li.textContent = `${show.show.name}`;
        li.addEventListener('click', () => {
            window.open('../html/showPage.html', "_self");
            localStorage.setItem("id", show.show.id);
        })


        dropdown.appendChild(li);
    });
}

//GETTING SHOW ID AND SENDING REQUEST
function getShowId() {
    const showId = localStorage.getItem("id");
    sendReq(rootUrl + singleShow + showId, createShow);
    sendReq(rootUrl + singleShow + showId + seasons, getShowSeason);
    sendReq(rootUrl + singleShow + showId + cast, getShowCast);
}

//FUNCTION FOR SENDING REQUESTS
function sendReq(url, func) {
    fetch(url)
        .then(res => res.json())
        .then(data => func(data))
}

//CREATING SHOW IMAGE AND TITLE
function createShow(show) {
    showName.textContent = show.name;
    const img = show.image === null ? `../img/un.jpg` : show.image.original;
    showImage.setAttribute('src', img);
    detailsText.innerHTML = show.summary;

}

//GETTING SHOW SEASONS
function getShowSeason(showSeasons) {
    seasonTitle.textContent += `(${showSeasons.length})`;
    showSeasons.forEach(season => { getDate(season) });

}

//CREATEING SEASON DATE
function getDate(season) {

    const premiereDate = season.premiereDate
    const endDate = season.endDate;

    createSeasonDate(premiereDate, endDate);
}

//CREATING SEASON EPISODES
function createSeasonDate(preDate, endDate) {
    const li = document.createElement('li');
    li.innerText += `${preDate} - ${endDate}`;
    dateList.appendChild(li);

}

//GET SHOW CAST
function getShowCast(showCast) {
    for (let i = 0; i < 5; i++) {
        if (showCast[i]) {
            createCast(showCast[i]);
        } else {
            continue;
        }

    }
}

function createCast(cast) {
    const li = document.createElement('li');
    const castName = cast === null ? 'No cast name' : cast.person.name
    li.innerText += `${castName}`;
    castNames.appendChild(li);
}

