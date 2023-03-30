function darkmode() {
    const body = document.querySelector("body");
    (sidebar = body.querySelector(".sidebar")),
        (toggle = body.querySelector(".toggle")),
        (searchBtn = body.querySelector(".seach-box")),
        (modeSwitch = body.querySelector(".toggle-switch")),
        (modeText = body.querySelector(".mode-text"));

    modeSwitch.addEventListener("click", () => {
        sidebar.classList.toggle("dark");
    });

    modeSwitch.addEventListener("click", () => {
        body.classList.toggle("dark");
    });
}

function insert () {
    const formE1 = document.querySelector('.form');

    formE1.addEventListener('submit', event => {
        event.preventDefault();

        const formData = new FormData(formE1);
        const data = Object.fromEntries(formData);

        fetch('http://127.0.0.1:5000/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));
    });
}

function width() {
    var w = window.innerWidth-250;
    if (w < 300) {
        w = 300;
    } else if (w > 1000) {
        w = 1000;
    }
    return w;
}

function remove() {
    const container = document.querySelector('#container-comment');
    removeAllChildNodes(container);
}

function get() {
  fetch("http://127.0.0.1:5000/posts").then((r) => {
      if (r.ok) {
          r.json().then((v) => {
              var comments = v.comments;
              var container = document.getElementById("container-comment");
              var length = comments.length-1
              comments.reverse()
              for (let i in comments) {
                    container.innerHTML +=
                    `<div class="one-post" style="width: ` + width() + `px" id="id` + comments[i].id + `">
                        <button onclick="remove()" id="` + comments[i].id + `"><img src="remove.png"></button>
                        <p>` + comments[i].content + `</p>
                        <p class="user-time" style="text-align: left;` + (width()-40) + `px;">` + comments[i].user + `
                            <span style="text-align: right;">` + comments[i].time + `</span>
                        </p>
                    </div>`;
              }
          });
      }
  });
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

function remove() {
    const container = document.querySelector('#container-comment');
    removeAllChildNodes(container);
}

darkmode()
get()
var intervalId = window.setInterval(function(){
    remove()
    get()
}, 6000);