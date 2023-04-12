Status = "";
objects = [];
alarm = "";
len = 0;

function preload() {
    alarm = loadSound("Alarm-ringtone.mp3");
}

function setup() {
    canvas = createCanvas(380, 350);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("Status").innnerHTML = 'Status : Detecting Objects';

}

function modelLoaded() {
    console.log("Model Loaded!");
    Status = true;
    
}

function draw() {
    image(video, 0, 0, 380, 380);
    
    if(Status != "") {
        objectDetector.detect(video, gotResult);
        r = random(255);
        g = random(255);
        b = random(255);

        for(i = 0; i < len; i++) {

            document.getElementById("Status").innerHTML = "Status : Objects Detected";
            
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].width);

            if(objects[i].label = "person") {
                document.getElementById("baby_status").innerHTML = "Baby Detected";
                alarm.stop();
            }
            else{
                document.getElementById("baby_status").innerHTML = "Baby not Found";
                alarm.play();
            }    
        }

        if(len == 0) {
            document.getElementById("baby_status").innerHTML = "Baby not Found";
            alarm.play();
        }

        
    }
}



function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    len = results.length;
    objects = results;
}