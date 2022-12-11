/**
 * checkMyLikes() 
 * when we click on one like, it add or remove one like in the counter 
 * */
const checkMyLikes = (pictureArray) => {
    const likes = document.querySelectorAll(".likes");
    console.log("LIOIIIIIIIIIIIIIIIIIIIIIIIIIIIIIK : "+likes.length)

    likes.forEach(like => {
        like.addEventListener("click", () => {
            let picLikeCounter = parseInt(like.querySelector(".like-counter").innerHTML);
            const picId = parseInt(like.parentElement.id);
   

            pictureArray.forEach(pic => {
                console.log(pic.likes);
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
            getMyTotalLikes(pictureArray)
        });
    });

}

/** 
 * getMyTotalLikes()
 * calculate the total of likes in the entire page 
 * */
const getMyTotalLikes = (pictureArray) => {
    let totalLikes = 0;
    console.log(totalLikes);
    pictureArray.forEach(pic => {
        totalLikes += pic.likes;
    })
    console.log(totalLikes);
    const totalLikeDOM = document.querySelector(".like-quantity");
    console.log(totalLikeDOM);
    totalLikeDOM.innerHTML = totalLikes;
}