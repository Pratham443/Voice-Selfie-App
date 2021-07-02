var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function Start(){
    document.getElementById("textbox").innerHTML = "";
    recognition.start();
}

recognition.onresult = function run (event) {
    console.log(event);

    var Content = event.results[0][0].transcript;
    console.log(Content);

    document.getElementById("textbox").innerHTML = Content;
    if(Content == "take my selfie") {
        console.log("taking selfie")
        speak();
    }
}

camera = document.getElementById("camera");

function speak() {
    var synth = window.speechSynthesis;
    speakdata = "Taking your selfie in 5 seconds";
    var UtterThis = new SpeechSynthesisUtterance(speakdata);
    synth.speak(UtterThis);
    Webcam.attach(camera);

    setTimeout(function(){
        take_snapshot();
        save();
    }, 5000);
}

Webcam.set({
    width: 350,
    height: 260,
    image_format: "png",
    png_quality: 90
});

function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="selfie" src="' + data_uri + '">';
    })
}

function save() {
    link = document.getElementById("link");
    image = document.getElementById("selfie").src;
    link.href = image;
    link.click();
}