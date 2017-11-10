canvasWidth = 1600;
canvasHeight =2000;

pCount = 0;


pCollection = new Array();

var puffs = 1;
var particlesPerPuff = 200000;
var img = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/85280/smoke2.png';

var smokeImage = new Image();
smokeImage.src = img;

for (var i1 = 0 ; i1 < puffs; i1++)
{
  var puffDelay = i1 * 1500;

  for (var i2 = 0 ; i2 < particlesPerPuff; i2++)
  {
    addNewParticle((i2*50) + puffDelay);    
  }
}


draw(new Date().getTime(), 3000)



function addNewParticle(delay)
{

  var p = {};
  p.top = canvasHeight;
  p.left = randBetween(-200,800);

  p.start = new Date().getTime() + delay;
  p.life = 8000;
  p.speedUp = 70;


  p.speedRight = randBetween(0,20);

  p.rot = randBetween(-1,1);
  p.red = Math.floor(randBetween(0,255));
  p.blue = Math.floor(randBetween(0,255));
  p.green = Math.floor(randBetween(0,255));


  p.startOpacity = .1;
  p.newTop = p.top;
  p.newLeft = p.left;
  p.size = 600;
  p.growth = 1;

  pCollection[pCount] = p;
  pCount++;


}

function draw(startT, totalT)
{
  var timeDelta = new Date().getTime() - startT;
  var stillAlive = false;

  var c=document.getElementById("myCanvas");
  var ctx=c.getContext("2d");
  ctx.clearRect(0, 0, c.width, c.height);
  c.width = c.width;

  for (var i= 0; i < pCount; i++)
  {    
    var p = pCollection[i];

    var td = new Date().getTime() - p.start;
    var frac = td/p.life

    if (td > 0)
    {
      if (td <= p.life )
      { stillAlive = true; }

     var newTop = p.top - (p.speedUp * (td/1000));
      var newLeft = p.left + (p.speedRight * (td/1000));
      var newOpacity = Math.max(p.startOpacity * (1-frac),0);

      var newSize = p.size + (p.growth * (td/1000));
      p.newTop = newTop;
      p.newLeft = newLeft;

      ctx.fillStyle = 'rgba(150,150,150,' + newOpacity + ')';      
      ctx.globalAlpha  = newOpacity;
      ctx.drawImage(smokeImage, newLeft, newTop, newSize, newSize);
    }
  }



  if (stillAlive)
  {
    requestAnimationFrame(function(){draw(startT,totalT);}); 
  }
  else
  {
    clog(timeDelta + ": stopped");
  }
}

function randBetween(n1,n2)
{
  var r = (Math.random() * (n2 - n1)) + n1;
  return r;
}

function randOffset(n, variance)
{
  var max = 1 + variance;
  var min = 1 - variance;
  var r = Math.random() * (max - min) + min;
  return n * r;
}




var countDownDate = new Date("Dec 5, 2017 00:00:00").getTime();

var x = setInterval(function() {

    var now = new Date().getTime();

    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days  ;
    document.getElementById("hours").innerHTML = hours ;
    document.getElementById("minutes").innerHTML = minutes ;
    document.getElementById("seconds").innerHTML = seconds;


}, 1000);