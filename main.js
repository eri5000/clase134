img="";
status="";
objects = [];

function preload(){
    img= loadImage('https://images.hola.com/imagenes/estar-bien/20221209222477/imagenes-divertidas-animales/1-175-658/pinguinos-t.jpg?tx=w_400');
}

function setup(){
  canvas= createCanvas(450,250);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  video.size(450,250)
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Estatus:detectando objetos";
}
function draw(){
    image(video,0,0,450,250);
    if(status !=""){
      r = random(255);
      g = random(255);
      b = random(255);
      objectDetector.detect(video, gotResult);
     for(i= 0; i< objects.length; i++){
      document.getElementById("status").innerHTML ="Estatus del objecto detectado";
      document.getElementById("number_of_objects").innerHTML = "Numero de objetos detectados:" + objects.length;

      fill(r,g,b);
      percent = floor(objects[i].confidence * 100);
      text(objects[i].label + "" + percent + "%" , objects[i].x, objects[i].y);
      noFill();
      stroke(r,g,b);
      rect(objects[i].x, objects[i].y,objects[i].width , objects[i].height);
     }
    }

}
function modelLoaded(){
  console.log("¡Modelo cargado!");
  status = true;
  objectDetector.detect(video,gotResult);
}
function gotResult(error,results){
 if(error){
  console.log(error);
 }
 console.log(results);
 objects = results;
}