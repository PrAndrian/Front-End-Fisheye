/**
 * checkMyLikes() 
 * @param {Array} pictureArray
 * when we click on one like, it add or remove one like in the counter 
 * */
function checkMyLikes(pictureArray){
    const likes = document.querySelectorAll(".likes");
    likes.forEach(like => {
        like.addEventListener("click", () => {
            //transform text to int aka number 
            let picLikeCounter = parseInt(like.querySelector(".like-counter").innerHTML);
            const picId = parseInt(like.parentElement.id);
            
            pictureArray.forEach(pic => {
                if (pic.id === picId) {
                    if (like.getAttribute("checked") === "true") {
                        like.setAttribute("checked", false);
                        like.querySelector(".like-logo").classList.remove("byebye-heart");
                        picLikeCounter -= 1;
                        pic.likes -= 1;
                    } else {
                        like.setAttribute("checked", true);
                        like.querySelector(".like-logo").classList.add("byebye-heart");
                        picLikeCounter += 1;
                        pic.likes += 1;
                    }

                }
            })

            like.querySelector(".like-counter").innerHTML = picLikeCounter;
            like.querySelector(".like-counter").setAttribute("aria-label",picLikeCounter+" likes");
            getMyTotalLikes(pictureArray)
        });
    });

}

/** 
 * getMyTotalLikes()
 * @param {Array} pictureArray
 * calculate the total of likes in the entire page 
 * */
function getMyTotalLikes(pictureArray){
    let totalLikes = 0;
    pictureArray.forEach(pic => {
        totalLikes += pic.likes;
    })
    const totalLikeDOM = document.querySelector(".like-quantity");
    totalLikeDOM.innerHTML = totalLikes;
}