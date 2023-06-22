var img1=null;
var img2=null;
var og=null;
function upload(){
  var img=document.getElementById("can");
  var file=document.getElementById("finput");
  img1=new SimpleImage(file);
  og=new SimpleImage(file);
  img2=img1
  img1.drawTo(img);
}
function load(img){
  if (img == null || !img.complete()){
    alert("Image is not loaded");
  }
  else{
    return
  }
}
function dogray(){
  load(img1);
  clear();
  var img=document.getElementById("canv");
  for (var p of img2.values()) {
    var avg = (p.getGreen() + p.getRed() + p.getBlue()) / 3;
    p.setRed(avg);
    p.setBlue(avg);
    p.setGreen(avg);
  }
  img2.drawTo(img);
}

function dored() {
  load(img1);
  clear();
  var img=document.getElementById("canv")
  for (var pixel of img2.values()) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (avg < 128) {
      pixel.setRed(2 * avg);
      pixel.setGreen(0);
      pixel.setBlue(0);
    } else {
      pixel.setRed(255);
      pixel.setGreen(2 * avg - 255);
      pixel.setBlue(2 * avg - 255);
    }
  }
   img2.drawTo(img);
}
function dorain() {
  load(img1);
  clear();
  var img=document.getElementById("canv")
  var height = img2.getHeight();
  for (var pixel of img2.values()) {
    var y = pixel.getY();
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (y < height / 7) {
      //red
      if (avg < 128) {
        pixel.setRed(2 * avg);
        pixel.setGreen(0);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < height * 2 / 7) {
      //orange
      if (avg < 128) {
        pixel.setRed(2 * avg);
        pixel.setGreen(0.8*avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(1.2*avg-51);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < height * 3 / 7) {
      //yellow
      if (avg < 128) {
        pixel.setRed(2 * avg);
        pixel.setGreen(2*avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(255);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < height * 4 / 7) {
      //green
      if (avg < 128) {
        pixel.setRed(0);
        pixel.setGreen(2*avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(2*avg-255);
        pixel.setGreen(255);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < height * 5 / 7) {
      //blue
      if (avg < 128) {
        pixel.setRed(0);
        pixel.setGreen(0);
        pixel.setBlue(2*avg);
      } else {
        pixel.setRed(2*avg-255);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(255);
      }
    } else if (y < height * 6 / 7) {
      //indigo
      if (avg < 128) {
        pixel.setRed(.8*avg);
        pixel.setGreen(0);
        pixel.setBlue(2*avg);
      } else {
        pixel.setRed(1.2*avg-51);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(255);
      }
    } else {
      //violet
      if (avg < 128) {
        pixel.setRed(1.6*avg);
        pixel.setGreen(0);
        pixel.setBlue(1.6*avg);
      } else {
        pixel.setRed(0.4*avg+153);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(0.4*avg+153);
      }
    }
  }
  img2.drawTo(img);
}
function ensureInImage (coordinate, size) {
    if (coordinate < 0) {
        return 0;
    }
    if (coordinate >= size) {
        return size - 1;
    }
    return coordinate;
}

function getPixelNearby (image, x, y, diameter) {
    var dx = Math.random() * diameter - diameter / 2;
    var dy = Math.random() * diameter - diameter / 2;
    var nx = ensureInImage(x + dx, image.getWidth());
    var ny = ensureInImage(y + dy, image.getHeight());
    return image.getPixel(nx, ny);
}

function doblur(){
  load(img1);
  clear();
  var img=document.getElementById("canv")
  var output = new SimpleImage(img2.getWidth(), img2.getHeight());

for (var pixel of img2.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    if (Math.random() > 0.5) {
        var other = getPixelNearby(img2, x, y, 100);
        output.setPixel(x, y, other);
    }
    else {
        output.setPixel(x, y, pixel);
    }
}
  output.drawTo(img);
}
function reset(){
  load(img1);
  img=document.getElementById("canv");
  og.drawTo(img);
  img2 = new SimpleImage(og);
}
function clear(){
  img2 = new SimpleImage(og);
}
function doclear(){
  var img=document.getElementById("can");
  var imgg=document.getElementById("canv");
  var ctx = img.getContext("2d");
  var ctxx = imgg.getContext("2d");
  ctx.clearRect(0,0,img.width,img.height)
  ctxx.clearRect(0,0,imgg.width,imgg.height)
  img1= null;
  img2= null;
  og=null;
}