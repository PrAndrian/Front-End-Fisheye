//Mettre le code JavaScript lié à la page photographer.html
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const photographer_id = urlParams.get('id');
console.log(photographer_id);

async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
    const res = await fetch('../Front-End-Fisheye/data/photographers.json');
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


function getLikes(medias){
    let likes = 0;
    medias.forEach((media) => {
        likes += media.likes;
    });

    return likes;
}

async function displayDataProfil(photographer,media) {
    const {name,portrait,city,country,tagline, price} = photographer;

    const picture = `assets/photographers/${portrait}`;

    const profile_picture = document.querySelector(".profile-pic");
    const nameProfile = document.querySelector(".info-text--name");
    const cityProfile = document.querySelector(".info-text--city");
    const taglineProfile = document.querySelector(".info-text--tagline");
    // const like_quantity = document.querySelector(".like-quantity");
    const priceProfile = document.querySelector(".price");
    
    //----------------------------------------------------------------
    profile_picture.setAttribute('src',picture);
    
    //----------------------------------------------------------------
    nameProfile.textContent = name;
    cityProfile.textContent = city +', '+country;
    taglineProfile.textContent = tagline;
    // like_quantity.textContent = getLikes(media);
    priceProfile.textContent = price+'€/jour';
};

function displayPicture(media, index){
    const container_picture = document.querySelector('.container-picture');
    const mediaCard = document.createElement('article');
    const image_warpper = document.createElement('a');
    const description = document.createElement('div');
    const descrciption_title = document.createElement('h2');
    const descrciption_btn = document.createElement('button');
    const like_counter = document.createElement('span');
    const heart_icon = document.createElement('i');
    
    mediaCard.classList.add("card");
    mediaCard.id=index;
    
    image_warpper.classList.add("image-warpper");
    description.classList.add("card_description");
    descrciption_btn.classList.add("btn-likes");
    descrciption_btn.classList.add("likes");
    like_counter.classList.add("like-counter");
    heart_icon.classList.add("fa-solid");
    heart_icon.classList.add("fa-heart");
    heart_icon.classList.add("like-logo");
    
    description.setAttribute('id',media.id);
    description.appendChild(descrciption_title);
    description.appendChild(descrciption_btn);
    descrciption_btn.appendChild(like_counter);
    descrciption_btn.appendChild(heart_icon);

    descrciption_title.innerText=media.title;
    like_counter.innerText=media.likes;


    mediaCard.appendChild(image_warpper);
    mediaCard.appendChild(description);

    if(media.video){
        const video = document.createElement('video');
        video.setAttribute('preload',"metadata");
        video.classList.add("video-element");

        const source = document.createElement('source');
        source.setAttribute('src',`assets/photographers/${media.photographerId}/${media.video}`);
        source.setAttribute('title',media.likes);
        source.setAttribute('type','video/mp4');
        source.setAttribute('autostart','false');
        
        video.appendChild(source);
        image_warpper.appendChild(video);
    }else{
        const image = document.createElement('img');
        image.setAttribute('src',`assets/photographers/${media.photographerId}/${media.image}`);
        image_warpper.appendChild(image);
    }
    container_picture.appendChild(mediaCard); 
}


async function displayDataMedia(medias){
    let index = 0;
    medias.map(media => {
        displayPicture(media,index);
        createSlide(media);
        index++;
    });
    /* Displaty the right slide when we open the slider */
    let pictures = document.querySelectorAll(".card > .image-warpper");
    /* Display the slider at the right picture */
    displaySlideOnClick(pictures);

    checkMyLikes(medias)
    getMyTotalLikes(medias)
}

function createSlide(media){
    const carousel__content = document.querySelector('.carousel__content');

    const slide = document.createElement("a");
        slide.classList.add("slide");
        slide.setAttribute("aria-hidden", "true");
        slide.setAttribute("href", "#");
        slide.setAttribute("aria-label", media.title);

        let mediaDiv;

        if (media.image) {
            const photoWrapper = `
                <img src="./assets/photographers/${media.photographerId}/${media.image}" alt="${media.likes} likes" />`;

            mediaDiv = photoWrapper;
        }

        if (media.video) {
            const videoWrapper = `
                <video preload="metadata" id="player" mute loop  playsinline controls data-poster="${media.title}" title="${media.likes} likes">
                    <source src="./assets/photographers/${media.photographerId}/${media.video}#t=0.1" type="video/mp4" autostart="false" />
                </video>`;
            mediaDiv = videoWrapper;
        }

        slide.innerHTML = `
            <div class="image-warpper">
                    ${mediaDiv}
            </div>
            <div class="card_description">
                <h2>
                    ${media.title}
                </h2>
            </div>`;

        carousel__content.appendChild(slide)
        
}

const changeFilter = (medias) => {
    removeAllCardsAllSlides();

    const checkedFilter = document.querySelector(".checked").id;
    switch (checkedFilter) {
        case "popularity":
            organizeByLikes(medias);
            displayDataMedia(medias);
        break;
        case "date":
            organizeByDate(medias);
            displayDataMedia(medias);
        break;
        case "title":
            organizeByTitles(medias);
            displayDataMedia(medias);
        break;
        default:
            checkedFilter
        break;
    }
}

const options = document.querySelectorAll(".option");
const dropdownBtn = document.querySelector(".dropdown-menu__button");
const dropdown = document.querySelector(".selector");

dropdownBtn.addEventListener("click", () => {
    dropdownBtn.setAttribute("aria-haspopup", false);
    dropdownBtn.setAttribute("aria-expanded", true);
    dropdown.style.display = "flex";
    dropdownBtn.style.display = "none";
})

options.forEach(option => {
    option.addEventListener("click", () => {
        dropdownBtn.innerHTML = option.innerHTML;
        dropdownBtn.setAttribute("aria-haspopup", true);
        dropdownBtn.setAttribute("aria-expanded", false);
        dropdown.style.display = "none";
        dropdownBtn.style.display = "flex";

        options.forEach(option => {
            option.classList.remove("checked");
        })
        option.classList.add("checked");
    })
})


function removeAllCardsAllSlides() {
    const cards = document.querySelectorAll(".card");
    let slides = document.querySelectorAll(".slide");

    cards.forEach(card => {
        card.remove();
    });
    slides.forEach(slide => {
        slide.remove();
    });
}

const organizeByLikes = (media) => {
     media.sort((a, b) => b.likes - a.likes);
}


const organizeByTitles = (media) => {
    media.sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return -1;
        }
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return 1;
        }
        return 0;
    });
}

const organizeByDate = (media) => {
     media.sort((a, b) => new Date(b.date) - new Date(a.date));
}


async function init() {
    const data = await getPhotographers();
    const {thePhotographer,hisMedia} = await getPhotographerData(data,photographer_id);

 
    displayDataProfil(thePhotographer,hisMedia);
    displayDataMedia(hisMedia);

    const filterSelector = document.getElementById("filter");
    filterSelector.addEventListener("click", () => {
        changeFilter(hisMedia);
    })
};

init();
