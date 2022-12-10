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
        // console.log(media.photographerId);
        likes += media.likes;
    });

    return likes;
}

async function displayDataProfil(photographer,media) {
    const {name,portrait,city,country,tagline, price } = photographer;

    const picture = `assets/photographers/${portrait}`;

    const profile_picture = document.querySelector(".profile-pic");
    const nameProfile = document.querySelector(".info-text--name");
    const cityProfile = document.querySelector(".info-text--city");
    const taglineProfile = document.querySelector(".info-text--tagline");
    const like_quatity = document.querySelector(".like-quantity");
    const priceProfile = document.querySelector(".price");
    
    //----------------------------------------------------------------
    profile_picture.setAttribute('src',picture);
    
    //----------------------------------------------------------------
    nameProfile.textContent = name;
    cityProfile.textContent = city +', '+country;
    taglineProfile.textContent = tagline;
    like_quatity.textContent = getLikes(media);
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
    heart_icon.classList.add("fa-solid");
    heart_icon.classList.add("fa-heart");
    
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
        source.setAttribute('src',`assets/photographers/${media.video}`);
        source.setAttribute('title',media.likes);
        source.setAttribute('type','video/mp4');
        source.setAttribute('autostart','false');
        
        video.appendChild(source);
        image_warpper.appendChild(video);
    }else{
        const image = document.createElement('img');
        image.setAttribute('src',`assets/photographers/${media.image}`);
        image_warpper.appendChild(image);
    }

    console.log(container_picture);
    console.log(mediaCard);
    container_picture.appendChild(mediaCard); 
}


async function displayDataMedia(medias){
    let index = 0;
    medias.map(media => {
        displayPicture(media,index);
        index++;
    })
}

const changeFilter = (medias) => {
    removeAllCardsAllSlides();

    const checkedFilter = document.querySelector(".checked").id;
    console.log("this is what i want : "+checkedFilter);
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
