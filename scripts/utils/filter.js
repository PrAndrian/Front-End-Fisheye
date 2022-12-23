//Filter-----------------

const changeFilter = (medias) => {
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
