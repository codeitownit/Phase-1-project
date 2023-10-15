//DOMContentLoaded event is fired
document.addEventListener("DOMContentLoaded", ()=>{
    fetchAllArt();
    searchAllArt();
})
//Initiazing global variables
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
    const div = document.querySelector("#all-art")
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
    
}

//listens for search input changes and fetches search data
function searchAllArt(){
        const form = document.querySelector("form");
        form.addEventListener("submit",(e)=>{
            e.preventDefault();
            const input = document.querySelector("#search").value
            const artName =input.split(" ").join("")
            const div = document.querySelector("#all-art")
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
    const div = document.querySelector("#all-art")
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
}
