Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '" />';

    })
}
console.log('ml5 version', ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/uq5PzXvK8/model.json", modelLoaded);

function modelLoaded() {
    console.log("model loaded");
}
prediction = "";

function speak() {
    var synth = window.speechSynthesis;
    speak_data = "the prediction is " + prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
    document.getElementById("result")="";
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        if (results[1].label == "OK") {
            document.getElementById("result_hand_gesture_name").innerHTML = results[1].label;
            prediction = results[1].label;
            speak();
            document.getElementById("result_hand_gesture_icon").innerHTML = "&#128076;";
        } else if (results[1].label == "Victory") {
            document.getElementById("result_hand_gesture_name").innerHTML = results[1].label;
            prediction = results[1].label;
            speak();
            document.getElementById("result_hand_gesture_icon").innerHTML = "&#9996;";
        } else {
            document.getElementById("result_hand_gesture_name").innerHTML = results[0].label;
            prediction = results[0].label;
            speak();
            document.getElementById("result_hand_gesture_icon").innerHTML = "&#128077;";
        }

    }
}