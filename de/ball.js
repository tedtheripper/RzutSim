var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Events = Matter.Events,
    Body = Matter.Body
    Vector = Matter.Vector
    Runner = Matter.Runner
    Bounds = Matter.Bounds;


var engine = Engine.create();
var runner = Runner.create();
var pr_pocz = parseInt(localStorage.getItem("pr_pocz1"));
var kat_pocz =  parseInt(localStorage.getItem("kat_pocz1"));
var wiatrx = parseInt(localStorage.getItem("wiatrx1"));
var wiatry = -parseInt(localStorage.getItem("wiatry1"));
var oporpow =  localStorage.getItem("opor_pow");
var tarcie = 1;
var masa = 1;
var przyspieszeniegraw = parseInt(localStorage.getItem("przyspieszeniegrawcp"));
var Grav = 0.000000000000000000000000000000000667;
var masa_ksiezyca = parseInt(localStorage.getItem("masa_ksiezycacp"));
var masa_planety = parseInt(localStorage.getItem("masa_planetycp"));
var promien_pilki = 10;
var odl_planeta_ksiezyc = 2;
var plyw = localStorage.getItem("plyw1");
var szer_geo = parseInt(localStorage.getItem("szer_geo1"));
var kierunek_rzutu = localStorage.getItem("kierunek_rzutu1");
var promien_planety = parseInt(localStorage.getItem("promien_planetycp"));
var doba_planety = parseInt(localStorage.getItem("doba_planetycp"));
var pr_kat_pilki = parseInt(localStorage.getItem("pr_kat_pilki1"));
var kolor_pilki = localStorage.getItem("kolor1");
var temp = localStorage.getItem("temp1");
var maxx = 0;
var miny = 0;
var h0 = parseInt(localStorage.getItem("h01"))+promien_pilki+10;
var height = (window.innerHeight- 44);
var width = (window.innerWidth-40);
var testing = 1;
var odw =0;
var poczatek;



var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      showVelocity: true,
      height: height,
      width: width,
      showAngleIndicator: true,
      wireframes: false,
      hasBounds: true,
      background: "#3f4959"
    }
});

    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    World.add(engine.world, mouseConstraint);
    render.mouse = mouse;

if(kierunek_rzutu == "E"){
	var poczatek = 2*promien_pilki;
	var ball = Bodies.circle(poczatek, height-2*h0, promien_pilki); // piłka
	var ground = Bodies.rectangle(20000 ,height+100, 40000, 220, { isStatic: true });// podłoga
	engine.world.bounds.min.x = -10;
     	engine.world.bounds.min.y = -40000;
    	engine.world.bounds.max.x = 40000;
     	engine.world.bounds.max.y = height;
}
else{
	var poczatek = width-2*promien_pilki;
	var ball = Bodies.circle(poczatek, height-2*h0, promien_pilki); // piłka
	var ground = Bodies.rectangle(-20000+width ,height+100, 40000, 220, { isStatic: true });// podłoga
 	engine.world.bounds.min.x = -40000;
  engine.world.bounds.min.y = -40000;
  engine.world.bounds.max.x = width+10;
  engine.world.bounds.max.y = height;
  pr_pocz = parseInt(pr_pocz);
  kat_pocz = parseInt(kat_pocz);
  pr_pocz = - pr_pocz;
	kat_pocz = - kat_pocz;
	wiatrx = parseInt(wiatrx);
	wiatry = parseInt(wiatry)
  wiatrx = -wiatrx;
}

wiatrx = parseInt(wiatrx);
wiatry = parseInt(wiatry);

function vel(v, theta){
    this.x = v*Math.cos((theta*Math.PI)/180) + wiatrx;
    this.y = -v*Math.sin((theta*Math.PI)/180) + wiatry;

}

function force(){
  this.x =0;
  this.y =0;

  this.addForce = function(xadd,yadd){
      var vect = Vector.add({x:this.x,y:this.y},{x:xadd,y:yadd});
      this.x = vect.x;
      this.y = vect.y;
  }
}


var f = new force();
var v0 = new vel(pr_pocz,kat_pocz);
ball.frictionAir = oporpow;
ball.friction = tarcie;
ball.mass = masa;
engine.world.gravity.y= przyspieszeniegraw;

if(plyw===1) f.addForce(0, - (2*Grav*masa_ksiezyca*masa*promien_pilki)/(odl_planeta_ksiezyc*odl_planeta_ksiezyc*odl_planeta_ksiezyc));
if(plyw===2) f.addForce(0,  (2*Grav*masa_ksiezyca*masa*promien_pilki)/(odl_planeta_ksiezyc*odl_planeta_ksiezyc*odl_planeta_ksiezyc));

if(kierunek_rzutu===1) f.addForce(2*masa*v0.x/doba_planety,0);
if(kierunek_rzutu===2) f.addForce(-2*masa*v0.x/doba_planety,0);

World.add(engine.world, [ball, ground]); // dodanie pilki i ziemi do swiata

function reset(){
    location.reload();
}

Runner.run(engine);

function setup(){
  ball.render.fillStyle = kolor_pilki;
  Matter.Body.setVelocity(ball, {x:v0.x, y:v0.y});
  Matter.Body.setAngularVelocity(ball, pr_kat_pilki);
  mouseConstraint.collisionFilter.mask = 8;
}

Events.on(engine, 'tick',function(){
  Body.applyForce(ball, {x: ball.position.x, y: ball.position.y}, {x: f.x, y:f.y});
  if(ball.position.y < height-10-2*promien_pilki){var b = Bodies.circle(ball.position.x,ball.position.y,2,{ isStatic: true });
  b.render.strokeStyle = kolor_pilki;
  b.render.fillStyle = kolor_pilki;
  World.add(engine.world,b); }

  if(odw==0 && ball.velocity.y>=0 && ball.position.y >height-10-3*promien_pilki){
        var odp = "Endgeschwindigkeit: " + Math.sqrt(ball.velocity.y*ball.velocity.y+ball.velocity.x*ball.velocity.x).toFixed(2) + " m/s \n"
        var odp1 =  "Reichweite: " + Math.abs(ball.position.x-poczatek).toFixed(2) + " m \n";
	      var odpfinal = odp + odp1;
	alert(odpfinal);	
	      console.log(odpfinal);
        odw = 1;
  }
});

 var viewportCentre = {
     x: render.options.width * 0.5,
     y: render.options.height * 0.5
 };
 var boundsScaleTarget = 1,
    boundsScale = {
            x: 1,
            y: 1
        };

    document.body.addEventListener('mousedown', function() {
    Events.on(engine, 'beforeTick', function() {
        var world = engine.world,
            mouse = mouseConstraint.mouse,
            translate;

        var scaleFactor = mouse.wheelDelta * -0.1;
        if (scaleFactor !== 0) {
            if ((scaleFactor < 0 && boundsScale.x >= 0.5) || (scaleFactor > 0 && boundsScale.x <= 8)) {
                boundsScaleTarget += scaleFactor;
            }
        }

        if (Math.abs(boundsScale.x - boundsScaleTarget) > 0.01) {
            scaleFactor = (boundsScaleTarget - boundsScale.x) * 0.2;
            boundsScale.x += scaleFactor;
            boundsScale.y += scaleFactor;

            render.bounds.max.x = render.bounds.min.x + render.options.width * boundsScale.x;
            render.bounds.max.y = render.bounds.min.y + render.options.height * boundsScale.y;

            translate = {
                x: render.options.width * scaleFactor * -0.5,
                y: render.options.height * scaleFactor * -0.5
            };

            Bounds.translate(render.bounds, translate);
            Mouse.setScale(mouse, boundsScale);
            Mouse.setOffset(mouse, render.bounds.min);
        }
        var deltaCentre = Vector.sub(mouse.absolute, viewportCentre),
            centreDist = Vector.magnitude(deltaCentre);
        if (centreDist > 50) {
            var direction = Vector.normalise(deltaCentre),
                speed = Math.min(25, Math.pow(centreDist - 50, 2) * 0.002);
                translate = Vector.mult(direction, speed);

            if (render.bounds.min.x + translate.x < world.bounds.min.x)
                translate.x = world.bounds.min.x - render.bounds.min.x;

            if (render.bounds.max.x + translate.x > world.bounds.max.x)
                translate.x = world.bounds.max.x - render.bounds.max.x;

            if (render.bounds.min.y + translate.y < world.bounds.min.y)
                translate.y = world.bounds.min.y - render.bounds.min.y;

            if (render.bounds.max.y + translate.y > world.bounds.max.y)
                translate.y = world.bounds.max.y - render.bounds.max.y;

            Bounds.translate(render.bounds, translate);

            Mouse.setOffset(mouse, render.bounds.min);
        }
    });
    });

Render.run(render);
setup();
