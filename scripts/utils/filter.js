const options = document.querySelectorAll(".option");
const dropdownBtn = document.querySelector(".dropdown-menu__button");
const dropdown = document.querySelector(".selector");

/**
 * changeFilter(medias)
 * @param {Object} medias data of medias of the photographer  
 * change filter choice
 **/
function changeFilter(medias){
    removeAllCardsAllSlides();

    const checkedFilter = document.querySelector(".checked").id;
    switch (checkedFilter) {
        case "popularity":
            organizeByLikes(medias);
            displayDataMedia(medias);
            createSlider(medias);
        break;
        case "date":
            organizeByDate(medias);
            displayDataMedia(medias);
            createSlider(medias);
        break;
        case "title":
            organizeByTitles(medias);
            displayDataMedia(medias);
            createSlider(medias);
        break;
        default:
            checkedFilter
        break;
    }
}

// if dropdownBtn has been clicked then show expension of dropdown
dropdownBtn.addEventListener("click", () => {
    dropdownBtn.setAttribute("aria-haspopup", false);
    dropdownBtn.setAttribute("aria-expanded", true);
    dropdown.style.display = "flex";
    dropdownBtn.style.display = "none";
})


options.forEach(option =>{
    //if clicked then hide dropdown and show btn
    option.addEventListener("click", () => {
        dropdownBtn.innerHTML = option.innerHTML;
        dropdownBtn.setAttribute("aria-haspopup", true);
        dropdownBtn.setAttribute("aria-expanded", false);
        dropdown.style.display = "none";
        dropdownBtn.style.display = "flex";
        
        //remove previous check
        options.forEach(option => {
            option.classList.remove("checked");
            option.setAttribute("aria-selected", false);
        })
        //add check
        option.classList.add("checked");
        option.parentElement.setAttribute("aria-activedescendant",option.id)
        option.setAttribute("aria-selected", "true");
        dropdownBtn.setAttribute("aria-activedescendant", option.innerText);
        dropdownBtn.setAttribute("aria-labelledby", option.innerText);
    })
})

/**
 * removeAllCardsAllSlides():
 * remove all card of slides
 **/
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

/**
 * organizeByLikes(media)
 * @param {Object} media
 * Organize media By most Likes
 **/
const organizeByLikes = (media) => {
    // if function of comparaison return somthing > 0 then sort a after b
    media.sort((a, b) => b.likes - a.likes);
}

/**
 * organizeByTitles(media)
 * @param {Object} media
 * Organize by alphabetic order
 **/
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

/**
 * organizeByDate(media)
 * @param {Object} media
 * Organize By most recent date of post
 **/
const organizeByDate = (media) => {
     media.sort((a, b) => new Date(b.date) - new Date(a.date));
}
