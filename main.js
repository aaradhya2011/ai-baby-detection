song=""
status=""
objects=[];
function preload()
{
    song=loadSound("love_ringtone.mp3");
}

function setup()
{
    canvas=createCanvas(640, 420);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(640,420);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status : detecting objects";
}

function modelLoaded()
{
    console.log("model is loaded");
    status=true;
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log(results);
        objects=results;
    }
}

function draw()
{
    image(video, 0, 0, 640, 420);

    if(status !="")
    {
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video, gotResult);
        for(var i=0; i<objects.length; i++)
        {
        document.getElementById("status").innerHTML="Status : object detected";
        document.getElementById("number_of_objects").innerHTML=objects.length;
        fill(r,g,b);
        percent=floor(objects[i].confidence*100);
        text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        if(objects[i].label=="person"){
        document.getElementById("number_of_objects").innerHTML="baby found";
        song.stop()
        }

        else{
            document.getElementById("number_of_objects").innerHTML="baby not found";
            song.play()
        }
    }
    if(objects.length==0){
        document.getElementById("number_of_objects").innerHTML="baby not found";
        song.play()
    }
    }
}