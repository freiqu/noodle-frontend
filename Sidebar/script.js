

const body = document.querySelector("body")
    sidebar = body.querySelector(".sidebar"),
    toggle = body.querySelector(".toggle"),
    searchBtn = body.querySelector(".seach-box"),
    modeSwitch = body.querySelector(".toggle-switch"),
    modeText = body.querySelector(".mode-text");

    modeSwitch.addEventListener("click", () =>{
        sidebar.classList.toggle("dark");
    });


    modeSwitch.addEventListener("click", () =>{
        body.classList.toggle("dark");
    });

let links = document.querySelectorAll("a.iframe-link");
links.forEach((linkElement) => {
    linkElement.addEventListener("click", (e) => {
        e.preventDefault();
        let link = linkElement.pathname;
        document.getElementById("main-frame").src = link;
    })
})