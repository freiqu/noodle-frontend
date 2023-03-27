function get() {
  fetch("http://127.0.0.1:5000/posts").then((r) => {
      if (r.ok) {
          r.json().then((v) => {
              var comments = v.comments;
              var container = document.getElementById("container-comment");
              for (let i in comments) {
                  container.innerHTML +=
                      `
                      <div class="one-post" id="` +
                      comments[i].id +
                      `">
                          <p>` +
                      comments[i].content +
                      `</p>
                          <p style="text-align: left; font-style: italic;">` +
                      comments[i].user +
                      ` <span style="text-align: right;">` +
                      comments[i].time +
                      `</span></p>
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

get()
var intervalId = window.setInterval(function(){
    remove()
    get()
}, 6000);