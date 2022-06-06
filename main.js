song="";
scoreLeftWrist = 0;
leftWristX = "";
leftWristY = "";
rightWristX = "";
rightWristY = "";

function preload(){
    song = loadSound("music.mp3");
    song.setVolume(1.2);
    song.rate(1.5);
}

function setup(){
    canvas = createCanvas(621, 521);
    canvas.position(625, 300);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded(){
    console.log("PoseNet has been Initialized!!");
}

function gotPoses(results){
    if(results > 0 ){
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left wrist X = "+ leftWristX +"| Left Wrist Y = " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right wrist X = "+ rightWristX +"| Right Wrist Y = " + rightWristY);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
}

function draw(){
    image(video, 0, 0, 621, 521);
    if(scoreLeftWrist > 0.2){
        fill("#FF0000");
        stroke("#FF0000");
        circle(leftWristX, leftWristY, 50);
        InNumberLeftWrist = Number(leftWristY);
        remove_decimals = floor(InNumberLeftWrist);
        volume = remove_decimals/600;
        document.getElementById("volume").innerHTML = "Volume: " + volume;
        song.setVolume(volume);
    }
}
}

function play(){
    song.play();
}