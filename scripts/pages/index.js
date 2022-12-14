async function getPhotographers() {
        // Penser à remplacer par les données récupérées dans le json
        const res = await fetch('/Front-End-Fisheye/data/photographers.json');
        const photographers = res.json();
        // et bien retourner le tableau photographers seulement une fois
        return photographers;
}

//Display all data of photographers
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();
