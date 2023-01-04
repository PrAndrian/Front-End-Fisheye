const submitBtn = document.getElementById("form-submit-btn");
const closeContactBtn = document.getElementById("close-modal-btn-wrapper");
const contactModalSection = document.getElementById("contact-modal-section");

//listen to click on submit form button
submitBtn.addEventListener("click", (e) => validateForm(e) );

/**
 * displayModal():
 * display the contact form modal
 **/
function displayModal() {
    contactModalSection.setAttribute("aria-hidden", "false");
    hideMainDom();
    contactModalSection.style.display = "flex";
    closeContactBtn.focus();
}


/**
 * closeModal():
 * close the contact form modal
 **/
function closeModal() {
    contactModalSection.setAttribute("aria-hidden", true);
    displayMainDom();
    contactModalSection.style.display = "none";
}

/**
 * closeModal():
 * reset the contact form modal
 **/
function resetContactForm() {
    closeModal();
    inputs.forEach(input => {
        input.value = "";
    })
    const formDataArray = document.querySelectorAll(".form-data");
    formDataArray.forEach(formData => {
        formData.classList.remove("valid");
    })
   
}

/**
 * validateForm(event)
 * @param {FormEvent} event event of the click to the submit
 * send value of contact form to console
 **/
function validateForm(event){
    event.preventDefault();
    const firstName = document.querySelector('#firstName').value
    const lastName = document.querySelector('#lastName').value
    const email = document.querySelector('#email').value
    const message = document.querySelector('#message').value

    const formData = {
        prenom : firstName,
        nom : lastName,
        email : email,
        message : message,
    }
    
    console.log(formData)
}


const main = document.querySelector("main");
const header = document.querySelector("header");

/**
 * hideMainDom():
 * hide main dom
 **/
function hideMainDom() {
    main.setAttribute("aria-hidden", "true");
    main.classList.add("hidden");
    header.setAttribute("aria-hidden", "true");
    header.classList.add("hidden");
}

/**
 * displayMainDom():
 * display main dom
 **/
function displayMainDom() {
    main.setAttribute("aria-hidden", "false");
    main.classList.remove("hidden");
    header.setAttribute("aria-hidden", "false");
    header.classList.remove("hidden");
}
