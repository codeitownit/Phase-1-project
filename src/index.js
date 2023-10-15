//DOMContentLoaded event is fired
document.addEventListener("DOMContentLoaded", ()=>{
    fetchAllArt();
    searchAllArt();
})
//Initiazing global variables
const div = document.querySelector("#all-art")
let clickedArt;
let artData = [];
let artId ;
let searchData;
let allSearchData;
let info = [];
let iiif_url = "https://www.artic.edu/iiif/2/";

//fetching all data from the api endpoint
function fetchAllArt(){
    fetch("https://api.artic.edu/api/v1/artworks?limit=60")
    .then((response)=>response.json())
    .then((data)=>{
        artData = data;
        iterateArtData();
    })
}
//iterate the data and return the iterator object and call displayAllArt function
function iterateArtData(){
   artData.data.forEach(art =>{
    displayAllArt(art)
   })
} 

//display all art fetched on the page when loaded
function displayAllArt(art){
    const wrapper = document.createElement("div")
    wrapper.className = "wrapper col-md-4";
    const image = document.createElement("img")
    const h6 = document.createElement("h6")
    const p = document.createElement("p")
    image.src = iiif_url + art.image_id + "/full/843,/0/default.jpg"; 
    h6.textContent = art.title;
    p.textContent = art.artist_display;
    wrapper.appendChild(image)
    wrapper.appendChild(h6)
    wrapper.appendChild(p);
    div.appendChild(wrapper);
    wrapper.addEventListener("click", ()=>{
        clickedArt = art;
        showClickedArt(art);
    });
    
}

//displays the clicked artwork details
function showClickedArt(art){
    div.innerHTML = "";
    const clickedWrapper = document.createElement("div");
    const clickedImage = document.createElement("img");
    const clickedTitle = document.createElement("h6");
    const hr1 = document.createElement("hr");
    const hr2 = document.createElement("hr");
    const hr3 = document.createElement("hr");
    const artist = document.createElement("p");
    artist.className = "artist-text";
    const description = document.createElement("p");
    const place = document.createElement("p");
    const date = document.createElement("p");
    const medium = document.createElement("p");
    clickedWrapper.className = "container clicked-wrapper";
    clickedImage.src = iiif_url + art.image_id + "/full/843,/0/default.jpg";
    clickedTitle.textContent = art.title;
    artist.textContent = art.artist_display;
    description.innerHTML = `${art.description}`;
    place.innerHTML = `<p><b>Place: </b> ${art.place_of_origin}</p>`
    date.innerHTML = `<p><b>Date: </b>${art.date_display}</p>`;
    medium.innerHTML = `<p><b>Medium: </b>${art.medium_display}</p>`;;
    clickedWrapper.appendChild(clickedImage);
    clickedWrapper.appendChild(clickedTitle);
    clickedWrapper.appendChild(artist);
    clickedWrapper.appendChild(description);
    clickedWrapper.appendChild(hr1);
    clickedWrapper.appendChild(place);
    clickedWrapper.appendChild(hr2);
    clickedWrapper.appendChild(date);
    clickedWrapper.appendChild(hr3); 
    clickedWrapper.appendChild(medium);
    div.appendChild(clickedWrapper);
}

//listens for search input changes and fetches search data
function searchAllArt(){
        const form = document.querySelector("form");
        form.addEventListener("submit",(e)=>{
            e.preventDefault();
            const input = document.querySelector("#search").value
            const artName =input.split(" ").join("")
            div.innerHTML ="";  //empties the dom element content
            fetch("https://api.artic.edu/api/v1/artworks/search?q="+artName)
            .then(response => response.json())
            .then(data =>{
                allSearchData = data;
                allSearchData.data.forEach(item =>{
                    artId= item.id;
                    fetchSearchArt(artId);
                })
            })
            form.reset();
        });
}
//fetches search results using art Id
function fetchSearchArt(artId){
    fetch("https://api.artic.edu/api/v1/artworks/"+artId)
    .then(response => response.json())
    .then(data =>{
        searchData = data
        info = searchData.data
       displaySearchData(info)

        })
    
}
//updates the dom with the new search results
function displaySearchData(info){
    const wrapper = document.createElement("div")
    wrapper.className = "wrapper col-md-4";
    const searchImage = document.createElement("img")
    const h6 = document.createElement("h6")
    const p = document.createElement("p")
    searchImage.src = iiif_url + info.image_id + "/full/843,/0/default.jpg"; 
    h6.textContent = info.title;
    p.textContent = info.artist_display;
    wrapper.appendChild(searchImage)
    wrapper.appendChild(h6)
    wrapper.appendChild(p);
    div.appendChild(wrapper);
    wrapper.addEventListener("click", ()=>{
        clickedArt = info;
        showClickedArt(info);
    });
}

