const searchInput = document.querySelector(".srch");
const showList = document.querySelector(".show-list");
const footer = document.querySelector("footer");
const dropdown = document.querySelector(".dropdown");

const rootUrl = "http://api.tvmaze.com";
const allShowsUrl = "/shows";
const searchShowUrl = "/search/shows?q=";

onLoad();

function onLoad() {
  //HIDING FOOTER BEFORE CONTENT LOADS
  footer.style.display = "none";
  setTimeout(() => {
    footer.style.display = "flex";
  }, 1000);
  dropdown.style.display = "none";

  // MAKING NEW REQUEST
  const req = new XMLHttpRequest();

  req.open("GET", rootUrl + allShowsUrl);

  //WHEN REQUEST ARRIVES RUN LISTSHOW FUN
  req.onload = () => listShows(JSON.parse(req.responseText));

  // SEND REQ
  req.send();
}

//GETTING ONE SHOW FROM LISTS OF TV SHOWS NAD SENDING TO CREATE FUNCTION
function listShows(tvShows) {
  //GET TOP 50 TV SHOWS
  for (let i = 0; i <= 50; i++) {
    createShow(tvShows[i]);
  }
}

function createShow(show) {
  const showDiv = document.createElement("div");
  const showImg = document.createElement("img");
  const showTitle = document.createElement("h2");

  showImg.setAttribute("src", `${show.image.original}`);
  showTitle.innerText = `${show.name}`;

  showDiv.classList.add("show-container");

  showDiv.appendChild(showImg);
  showDiv.appendChild(showTitle);

  addToShowList(showDiv);
}

function addToShowList(createdShow) {
  showList.appendChild(createdShow);
}

searchInput.addEventListener("keydown", onSearch);

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
  tvShows.forEach((show) => {
    console.log(show);
    const li = document.createElement("li");
    li.textContent = `${show.show.name}`;

    dropdown.appendChild(li);
  });
}
