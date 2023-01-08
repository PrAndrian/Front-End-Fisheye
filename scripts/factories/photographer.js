// generates photographers cards in home page
function photographerFactory(data) {
    const { id,name, portrait, city, country,tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;
    const url = `/Front-End-Fisheye/photographer.html?id=${id}`;
    
    // generates user card DOM element
    function getUserCardDOM() {
        const redirect = document.createElement( 'a' );
        redirect.setAttribute('href',url)
        const article = document.createElement( 'article' );
        const container_img = document.createElement( 'div' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt","Image_profil")
        const h2 = document.createElement( 'h2' );

        const location = document.createElement( 'span' );
        const sentence = document.createElement( 'span' );
        const dayprice = document.createElement( 'span' );


        container_img.classList.add('container_img');
        location.classList.add('location');
        sentence.classList.add('tagline');
        dayprice.classList.add('dayprice');

        location.textContent= city + ', ' +country;
        sentence.textContent= tagline;
        dayprice.textContent= price +'€/jour';
        h2.textContent = name;
        
        redirect.appendChild(article);
        article.appendChild(container_img);
        container_img.appendChild(img);
        article.appendChild(h2);
        article.appendChild(location);
        article.appendChild(sentence);
        article.appendChild(dayprice);
        return (redirect);
    }
    return { name, picture, getUserCardDOM }
}
