// local storage
let mainColors = localStorage.getItem("color-option");

if (mainColors !== null) {
    document.documentElement.style.setProperty("--main-color", mainColors);

    document.querySelectorAll(".color-list li").forEach((element) => {
        element.classList.remove("active");

        if (element.dataset.color === mainColors) {
            element.classList.add("active");
        }
    });
}
let backgroundOption = true;
let backgroundInterval;

let backgroundLocalstorage = localStorage.getItem("background-option");

if (backgroundLocalstorage !== null) {
    if (backgroundLocalstorage === "true") {
        backgroundOption = true;
        console.log(backgroundOption)
    } else {
        backgroundOption = false;
        console.log(backgroundOption)
    }
    // remove active class form all
    document.querySelectorAll(".random-background span").forEach(element => {
        element.classList.remove("active")
    })
    if (backgroundLocalstorage === "true") {
        document.querySelector(".random-background .yes").classList.add("active")
    } else {
        document.querySelector(".random-background .no").classList.add("active")

    }
}


// select landing page element
let landingPage = document.querySelector(".landing-page");
// get array of imgs
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];



function randomizeImgs() {
    if (backgroundOption === true) {
        backgroundInterval = setInterval(() => {
            let randomNumber = Math.floor(Math.random() * imgsArray.length);

            landingPage.style.backgroundImage =
                'url("images/' + imgsArray[randomNumber] + '")';
        }, 10000);
    }
}

randomizeImgs()

// select settings button
let btn = document.querySelector(".fa-gear");
let set = document.querySelector(".setting-box");

btn.addEventListener("click", () => {
    set.classList.toggle("open");
    btn.classList.toggle("fa-spin");
});

// switch colors

let colorLi = document.querySelectorAll(".color-list li");

colorLi.forEach((li) => {
    li.addEventListener("click", (e) => {
        document.documentElement.style.setProperty(
            "--main-color",
            e.target.dataset.color
        );

        localStorage.setItem("color-option", e.target.dataset.color);

        handelActive(e);
    });
});

// switch backgrounds

let backEl = document.querySelectorAll(".random-background span");

backEl.forEach(element => {
    element.addEventListener("click", (e) => {

        handleActive(e);

        if (e.target.dataset.background === "yes") {
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem("background-option", true);
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background-option", false);

        }

    });
});


// select skills selector 

let skills = document.querySelector(".our-skills");

window.onscroll = function () {
    let skillsOffsetTop = skills.offsetTop;
    let skillsOuterHeight = skills.offsetHeight;
    let windowHeight = this.innerHeight;
    let scrolling = this.scrollY;

    if (scrolling > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {

        let progress = document.querySelectorAll(".skill-box .skill-progress span");

        progress.forEach(element => {
            element.style.width = element.dataset.progress;
        });
    }
}
// gallery popup

let ourGallery = document.querySelectorAll(".images img")

ourGallery.forEach(img => {
    img.addEventListener("click", (e) => {
        // create overlay 
        let overlay = document.createElement("div");
        overlay.className = "popup-overlay"
        document.body.appendChild(overlay);

        // create popup box
        let popupBox = document.createElement("div");
        popupBox.className = "popup-Box";


        // create heading
        let imageHeading = document.createElement("h3");
        let imageText = document.createTextNode(img.alt);

        imageHeading.appendChild(imageText);

        popupBox.appendChild(imageHeading);


        // create popup image

        let popupImage = document.createElement("img");
        popupImage.src = img.src;

        // append img into box

        popupBox.appendChild(popupImage);

        document.body.appendChild(popupBox);

        // create close btn 
        let closeBtn = document.createElement("span");
        let btnText = document.createTextNode("X")
        closeBtn.className = "close-btn"
        closeBtn.appendChild(btnText);

        popupBox.appendChild(closeBtn);


    })
})

// close popup

document.addEventListener("click", (e) => {
    if (e.target.className == "close-btn") {
        e.target.parentElement.remove()

        document.querySelector(".popup-overlay").remove()
    }
});

// select element

let navBullets = document.querySelectorAll(".nav-bullets .bullet")


let links = document.querySelectorAll(".links li a");

function moving(elements) {


    elements.forEach(ele => {
        ele.addEventListener("click", (e) => {

            e.preventDefault();

            document.querySelector(e.target.dataset.section).scrollIntoView({

                behavior: "smooth"

            })
        })
    })

}

moving(navBullets)
moving(links)



// Handle Active State
function handleActive(ev) {

    // Remove Active Class From All Childrens
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {

        element.classList.remove("active");

    });

    // Add Active Class On Self
    ev.target.classList.add("active");

}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {

    bulletsSpan.forEach(span => {

        span.classList.remove("active");

    });

    if (bulletLocalItem === 'block') {

        bulletsContainer.style.display = 'block';

        document.querySelector(".bullets-option .yes").classList.add("active");

    } else {

        bulletsContainer.style.display = 'none';

        document.querySelector(".bullets-option .no").classList.add("active");

    }

}

bulletsSpan.forEach(span => {

    span.addEventListener("click", (e) => {

        if (span.dataset.display === 'show') {

            bulletsContainer.style.display = 'block';

            localStorage.setItem("bullets_option", 'block');

        } else {

            bulletsContainer.style.display = 'none';

            localStorage.setItem("bullets_option", 'none');

        }

        handleActive(e);

    });

});

document.querySelector(".reset").onclick = function () {
    localStorage.removeItem("bullets_option");
    localStorage.removeItem("background-option");
    localStorage.removeItem("color-option");

    window.location.reload()
}

// menu 

let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {

    // Stop Propagation
    e.stopPropagation();

    // Toggle Class "menu-active" On Button
    this.classList.toggle("menu-active");

    // Toggle Class "open" On Links
    tLinks.classList.toggle("open");

};

// Click Anywhere Outside Menu And Toggle Button
document.addEventListener("click", (e) => {

    if (e.target !== toggleBtn && e.target !== tLinks) {

        // Check If Menu Is Open
        if (tLinks.classList.contains("open")) {

            // Toggle Class "menu-active" On Button
            toggleBtn.classList.toggle("menu-active");

            // Toggle Class "open" On Links
            tLinks.classList.toggle("open");

        }

    }

});

// Stop Propagation On Menu 
tLinks.onclick = function (e) {
    e.stopPropagation();
}
