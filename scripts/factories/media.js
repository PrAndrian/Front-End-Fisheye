// generates medias cards in photographer profiles
function mediaFactory(data){
    const {id,photographerId,title,image,likes,video} = data;

    function getMediaCardDOM(index){
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
        
        description.setAttribute('id',id);
        description.appendChild(descrciption_title);
        description.appendChild(descrciption_btn);
        descrciption_btn.appendChild(like_counter);
        descrciption_btn.appendChild(heart_icon);

        descrciption_title.innerText=title;
        like_counter.innerText=likes;


        mediaCard.appendChild(image_warpper);
        mediaCard.appendChild(description);

        if(video){
            const videoDom = document.createElement('video');
            videoDom.setAttribute('preload',"metadata");
            videoDom.classList.add("video-element");

            const source = document.createElement('source');
            source.setAttribute('src',`/Front-End-Fisheye/assets/photographers/${photographerId}/${video}`);
            source.setAttribute('title',likes);
            source.setAttribute('type','video/mp4');
            source.setAttribute('autostart','false');
            
            videoDom.appendChild(source);
            image_warpper.appendChild(videoDom);
        }else{
            const imageDom = document.createElement('img'); 
            imageDom.setAttribute('src',`/Front-End-Fisheye/assets/photographers/${photographerId}/${image}`);
            imageDom.setAttribute('alt',image);
            image_warpper.appendChild(imageDom);
        }
        return mediaCard
    }

    return {getMediaCardDOM}
}