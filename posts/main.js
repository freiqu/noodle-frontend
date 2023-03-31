function width() {
    var w = window.innerWidth-250;
    if (w < 300) {
        w = 300;
    } else if (w > 1000) {
        w = 1000;
    }
    return w;
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

var data;

function firstGet() {
    fetch("http://127.0.0.1:5000/posts").then((r) => {
        if (r.ok) {
            r.json().then((v) => {
                var comments = v.comments;
                var container = document.getElementById("container-comment");
                comments.reverse();
                data = comments;
                for (let i in comments) {
                    var up = 0, down = 0;
                    container.innerHTML +=
                    `<div class="one-post" style="width: ` + width() + `px" id="id` + comments[i].id + `">
                        <button onclick="deletePost(this.id)" id="` + comments[i].id + `"><img src="remove.png" width="30px"></button>
                        <p>` + comments[i].content + `</p>
                        <p class="user-time" style="text-align: left;` + (width()-40) + `px;">` + comments[i].user + `
                            <span style="text-align: right;">` + comments[i].time + `</span>
                        </p>
                        <button id="up` + comments[i].id.toString() + `" onclick="up(this.id)">
                            <img src="thumb-up.png" height="20px" width="20px" style="margin-right: 5px;"> ` + comments[i].up + `
                        </button>
                        <button id="down`+ comments[i].id.toString() + `" onclick="down(this.id)">
                            <img src="thumb-down.png" height="20px" width="20px" style="margin-right: 5px;"> ` + comments[i].down + `
                        </button>
                    </div>`;
                }
            });
        }
    });
}

function get() {
    fetch("http://127.0.0.1:5000/posts").then((r) => {
        if (r.ok) {
            r.json().then((v) => {
                var comments = v.comments;
                var container = document.getElementById("container-comment");
                comments.reverse();
                if (data == comments) {

                } else {
                    for (let i in comments) {
                        var up = 0, down = 0;
                        container.innerHTML +=
                        `<div class="one-post" style="width: ` + width() + `px" id="id` + comments[i].id + `">
                            <button onclick="deletePost(this.id)" id="` + comments[i].id + `"><img src="remove.png" width="30px"></button>
                            <p>` + comments[i].content + `</p>
                            <p class="user-time" style="text-align: left;` + (width()-40) + `px;">` + comments[i].user + `
                                <span style="text-align: right;">` + comments[i].time + `</span>
                            </p>
                            <button id="up` + comments[i].id.toString() + `" onclick="up(this.id)">
                                <img src="thumb-up.png" height="20px" width="20px" style="margin-right: 5px;"> ` + comments[i].up + `
                            </button>
                            <button id="down`+ comments[i].id.toString() + `" onclick="down(this.id)">
                                <img src="thumb-down.png" height="20px" width="20px" style="margin-right: 5px;"> ` + comments[i].down + `
                            </button>
                        </div>`;
                    }
                }
            });
        }
    });
}

function insert() {
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

function deletePost(id) {
    data = {'id': id}
    fetch('http://127.0.0.1:5000/posts', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    remove()
    get()
}

function up(id) {
    data = {'id': id, "updown": "up"}
    fetch('http://127.0.0.1:5000/posts/thumb', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

function down(id) {
    data = {'id': id, "updown": "down"}
    fetch('http://127.0.0.1:5000/posts/thumb', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

insert()
firstGet()
remove()
var intervalId = window.setInterval(function(){
    remove()
    get()
}, 5000);