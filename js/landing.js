const searchInput = document.querySelector(".srch");
const showList = document.querySelector(".show-list");
const footer = document.querySelector("footer");

const rootUrl = "http://api.tvmaze.com";
const allShowsUrl = "/shows";

onLoad();

function onLoad() {
  //HIDING FOOTER BEFORE CONTENT LOADS
  footer.style.display = "none";
  setTimeout(() => {
    footer.style.display = "flex";
  }, 1000);

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
  console.log(show);
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
