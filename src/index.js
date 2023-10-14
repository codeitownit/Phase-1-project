document.addEventListener("DOMContentLoaded", ()=>{
    fetchAllArt();
    searchAllArt();
})
let artData = [];
let artId ;
let searchData;
let allSearchData;
let info = [];
let iiif_url = "https://www.artic.edu/iiif/2/";
function fetchAllArt(){
    fetch("https://api.artic.edu/api/v1/artworks?limit=60")
    .then((response)=>response.json())
    .then((data)=>{
        artData = data;
        iterateArtData();
    })
}

function iterateArtData(){
   artData.data.forEach(art =>{
    console.log(art.title)
    console.log(search.image_id)
    displayAllArt(art)
   })
} 

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
function searchAllArt(){
        const form = document.querySelector("form");
        form.addEventListener("submit",(e)=>{
            e.preventDefault();
            const input = document.querySelector("#search").value
            const artName =input.split(" ").join("")
            const div = document.querySelector("#all-art")
            div.innerHTML ="";
            console.log(artName)
            fetch("https://api.artic.edu/api/v1/artworks/search?q="+artName)
            .then(response => response.json())
            .then(data =>{
                allSearchData = data;
                console.log(allSearchData.data)
                allSearchData.data.forEach(item =>{
                    artId= item.id;
                    console.log(artId)
                    fetchSearchArt(artId);
                })
            })
            form.reset();
        });
}
function fetchSearchArt(artId){
    fetch("https://api.artic.edu/api/v1/artworks/"+artId)
    .then(response => response.json())
    .then(data =>{
        searchData = data
        info = searchData.data
        console.log(info.image_id)
       displaySearchData(info)

        })
    
}

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
