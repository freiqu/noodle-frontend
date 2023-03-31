function rickroll() {
    var text = `<audio controls autoplay style="display: none;">
        <source src="Never_gonna_give_you_up.ogg" type="audio/ogg">
        <source src="Never_gonna_give_you_up.mp3" type="audio/mpeg">
    </audio>`;
    var container = document.getElementById("rickroll");
    container.innerHTML += text
}

rickroll()
var intervalId = window.setInterval(function(){
    rickroll()
}, 215000);