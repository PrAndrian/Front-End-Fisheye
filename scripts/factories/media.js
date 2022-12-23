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
        source.setAttribute('src',`/Front-End-Fisheye/assets/photographers/${media.photographerId}/${media.video}`);
        source.setAttribute('title',media.likes);
        source.setAttribute('type','video/mp4');
        source.setAttribute('autostart','false');
        
        video.appendChild(source);
        image_warpper.appendChild(video);
    }else{
        const image = document.createElement('img');
        image.setAttribute('src',`/Front-End-Fisheye/assets/photographers/${media.photographerId}/${media.image}`);
        image.setAttribute('alt',media.image);
        image_warpper.appendChild(image);
    }
    container_picture.appendChild(mediaCard); 
}

async function displayDataMedia(medias){
    let index = 0;
    medias.map(media => {
        displayPicture(media,index);
        index++;
    });

    checkMyLikes(medias)
    getMyTotalLikes(medias)
}