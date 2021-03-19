const searchInput = document.querySelector(".srch");
const showList = document.querySelector(".show-list");
const footer = document.querySelector("footer");
const dropdown = document.querySelector(".dropdown");
const loadMore = document.querySelector(".loadMore");


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
  //GET TOP 7 TV SHOWS
  let limit = 7;
  let start = 0;
  for (start; start <= limit; start++) {
    createShow(tvShows[start]);
  }
  //ON EVERY CLICK LOAD 8 MORE SHOWS
  loadMore.addEventListener('click', () => {
    limit += 8;
    for (start; start <= limit; start++) {
      createShow(tvShows[start]);
    }

  })


}


//CREATING SHOW CARD
function createShow(show) {

  const showDiv = document.createElement("div");
  const showImg = document.createElement("img");
  const showTitle = document.createElement("h2");

  showImg.setAttribute("src", `${show.image.original}`);
  showTitle.innerText = `${show.name}`;

  showDiv.classList.add("show-container");

  showDiv.addEventListener('click', () => {
    window.open('../html/showPage.html', "_self");
    localStorage.setItem("id", show.id);

  })

  showDiv.appendChild(showImg);
  showDiv.appendChild(showTitle);

  addToShowList(showDiv);
}

//ADDING CAR TO LIST
function addToShowList(createdShow) {
  showList.appendChild(createdShow);
}


//HEADER SEARCH
searchInput.addEventListener("keyup", onSearch);

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
