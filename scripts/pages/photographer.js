//Mettre le code JavaScript lié à la page photographer.html
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const photographer_id = urlParams.get('id');

async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
    const res = await fetch('/Front-End-Fisheye/data/photographers.json');
    const photographers = res.json();
    // et bien retourner le tableau photographers seulement une fois
    return photographers;
}

async function getPhotographerData(data,photographer_id){
    let thePhotographer = null;
    let hisMedia = new Array();

    data.photographers.forEach((photographer) => {
        if(photographer_id==photographer.id){
            thePhotographer = photographer;
        }

        data.media.forEach((med) => {
            if(photographer_id==med.photographerId && !hisMedia.includes(med)  ){
                hisMedia.push(med);
            }
        })
    });

    return {thePhotographer,hisMedia}
};

async function displayDataProfil(photographer) {
    const {name,portrait,city,country,tagline, price} = photographer;

    const picture = `/Front-End-Fisheye/assets/photographers/${portrait}`;

    const profile_picture = document.querySelector(".profile-pic");
    const nameProfile = document.querySelector(".info-text--name");
    const cityProfile = document.querySelector(".info-text--city");
    const taglineProfile = document.querySelector(".info-text--tagline");
    const priceProfile = document.querySelector(".price");
    
    //----------------------------------------------------------------
    profile_picture.setAttribute('src',picture);
    profile_picture.setAttribute('alt',name);
    
    //----------------------------------------------------------------
    nameProfile.textContent = name;
    cityProfile.textContent = city +', '+country;
    taglineProfile.textContent = tagline;
    priceProfile.textContent = price+'€/jour';
};

async function displayDataMedia(medias){
    const container_picture = document.querySelector('.container-picture');

    medias.forEach((media,index) => {
        const mediaModel = mediaFactory(media);
        const mediaCardDOM = mediaModel.getMediaCardDOM(index);
        container_picture.appendChild(mediaCardDOM);
    });
    checkMyLikes(medias)
    getMyTotalLikes(medias)
}

async function init() {
    const data = await getPhotographers();
    const {thePhotographer,hisMedia} = await getPhotographerData(data,photographer_id);
 
    displayDataProfil(thePhotographer,hisMedia);
    organizeByLikes(hisMedia);
    displayDataMedia(hisMedia);
    createSlider(hisMedia);

    const filterSelector = document.getElementById("filter");
    filterSelector.addEventListener("click", () => {
        changeFilter(hisMedia);
    })
};

init();
