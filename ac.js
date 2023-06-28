Status = "";
AC_image = "";
objects=[];
function preload(){
    AC_image = loadImage("AC.jpg");
}

function setup(){
    canvas = createCanvas(640,350);
    canvas.position(550,200);
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    Status = true;
    object_Detector.detect(AC_image,gotResults);
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects=results;
}

function draw(){
    image(AC_image,0,0,640,350);
    if (Status !="")
    {
        for(i=0;i<objects.length;i++)
    {
        document.getElementById("status").innerHTML="Status:Object Detected";
        fill("red");
        percent=floor(objects[i].confidence*100);
        text(objects[i].label+" "+percent+"%",objects[i].x+40,objects[i].y+20);
        noFill();
        stroke("red");
        rect(objects[i].x ,objects[i].y ,objects[i].width ,objects[i].height);
    }
}
}