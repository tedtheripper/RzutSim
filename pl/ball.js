//Created and owned by Marcel Jarosz and Mikołąj Spytek -- copying and distributing forbidden -- copyright 2017

//Aliasowanie obiektów silnika
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

//Tworzenie silnika
var engine = Engine.create();
var runner = Runner.create();
//Deklaracja i inicjacja zmiennych
var pr_pocz = parseInt(localStorage.getItem("pr_pocz1")); //Prędkość początkowa
var kat_pocz =  parseInt(localStorage.getItem("kat_pocz1")); //Kąt rzutu w stopniach
var wiatrx = parseInt(localStorage.getItem("wiatrx1")); //Pozioma składowa prędkości wiatru
var wiatry = -parseInt(localStorage.getItem("wiatry1")); //Pionowa składowa prędkości wiatru
var oporpow = localStorage.getItem("opor_pow"); //Współczynnik oporu powietrza -  najlepiej działa 0 - 0.05
var tarcie = 1; //Współczynnik tarcia
var masa = 1; //Masa piłki
var przyspieszeniegraw = parseInt(localStorage.getItem("przyspieszeniegrawcp")); //Przyspieszenie grawitacyjne
var Grav = 0.000000000000000000000000000000000667; //Stała "G"
var masa_ksiezyca = parseInt(localStorage.getItem("masa_ksiezycacp")); //Masa księżyca - do sił pływowych
var masa_planety = parseInt(localStorage.getItem("masa_planetycp")); //Masa planety - do sił pływowych
var promien_pilki = 10; //Promień piłki
var odl_planeta_ksiezyc = 350000000000; //Odległość planety od księżyca
var plyw = localStorage.getItem("plyw1");//Wybór pływu - 1 dla plywu wysokiego 2 dla plywu niskiego 0 dla pominiecia
var szer_geo = parseInt(localStorage.getItem("szer_geo1")); //Szerokość geograficzna w stopniach
var kierunek_rzutu = localStorage.getItem("kierunek_rzutu1"); // E - wschód, W - zachód
var promien_planety = parseInt(localStorage.getItem("promien_planetycp"));// Promień planety
var doba_planety = parseInt(localStorage.getItem("doba_planetycp")); //Doba planety - do siły koriolisa
var pr_kat_pilki = parseInt(localStorage.getItem("pr_kat_pilki1"));
var kolor_pilki = localStorage.getItem("kolor1"); //Kolor piłki
var temp = localStorage.getItem("temp1"); //Temperatura
var maxx = 0;
var miny = 0;
var h0 = parseInt(localStorage.getItem("h01"))+promien_pilki+10; //Wysokość początkowa;
var height = (window.innerHeight-44);
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
});  //Tworzenie renderowania

// Tworzenie kontroli myszką - zoom
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
  var duch = Bodies.circle(poczatek, height-2*h0, promien_pilki);
	var ground = Bodies.rectangle(20000 ,height+100, 40000, 220, { isStatic: true });// podłoga
	    engine.world.bounds.min.x = -10;
     	engine.world.bounds.min.y = -40000;
    	engine.world.bounds.max.x = 40000;
     	engine.world.bounds.max.y = height;



}
else{
	var poczatek = width-2*promien_pilki;
	var ball = Bodies.circle(poczatek, height-2*h0, promien_pilki); // piłka
  var duch = Bodies.circle(poczatek, height-2*h0, promien_pilki);
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

duch.render.fillStyle = "#ffffff";
duch.render.strokeStyle = "#ffffff";
duch.collisionFilter.mask = 16;
duch.render.opacity = 0.3;
duch.frictionAir = 0;



wiatrx = parseInt(wiatrx);
wiatry = parseInt(wiatry);

function vel(v, theta){
    this.x = v*Math.cos((theta*Math.PI)/180) + wiatrx;
    this.y = -v*Math.sin((theta*Math.PI)/180) + wiatry;

//	this.dodajx = function (a){
//		this.x= this.x +a;
//	}
//
//	this.dodajy = function (b){
//		this.y = this.y + b;
//	}


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

function wind(xw, yw){
  this.x = xw;
  this.y = yw;
}

var f = new force();
var v0 = new vel(pr_pocz,kat_pocz);
var w = new wind(wiatrx, wiatry);
ball.frictionAir = oporpow;
ball.friction = tarcie;
ball.mass = masa;
engine.world.gravity.y= przyspieszeniegraw;

//console.log(ball.frictionAir);

//v0.dodajx(wiatrx);
//v0.dodajy(wiatry);




// sila plywowa
if(plyw===1) f.addForce(0, - (2*Grav*masa_ksiezyca*masa*promien_pilki)/(odl_planeta_ksiezyc*odl_planeta_ksiezyc*odl_planeta_ksiezyc));
if(plyw===2) f.addForce(0,  (2*Grav*masa_ksiezyca*masa*promien_pilki)/(odl_planeta_ksiezyc*odl_planeta_ksiezyc*odl_planeta_ksiezyc));

// sila koriolisa
if(kierunek_rzutu===1) f.addForce(2*masa*v0.x/doba_planety,0);
if(kierunek_rzutu===2) f.addForce(-2*masa*v0.x/doba_planety,0);

/*console.log(f);
console.log(v0);
console.log(ball);
console.log(render);
console.log(mouse);
console.log(mouseConstraint);*/

World.add(engine.world, [ball, ground, duch]); // dodanie pilki i ziemi do swiata

function reset(){
    location.reload();
}

Runner.run(engine);
console.log(ball);


function setup(){
  ball.render.fillStyle = kolor_pilki;
  Matter.Body.setVelocity(ball, {x:v0.x, y:v0.y});
  Matter.Body.setVelocity(duch, {x:v0.x, y:v0.y});
  Matter.Body.setAngularVelocity(ball, pr_kat_pilki);
  mouseConstraint.collisionFilter.mask = 8;
}

Events.on(engine, 'tick',function(){
  Body.applyForce(ball, {x: ball.position.x, y: ball.position.y}, {x: f.x, y:f.y});
  if(ball.position.y < height-10-2*promien_pilki){var b = Bodies.circle(ball.position.x,ball.position.y,2,{ isStatic: true });
  b.render.fillStyle = kolor_pilki;
  b.render.strokeStyle = kolor_pilki;
  World.add(engine.world,b); }
  if(duch.position.y < height-10-2*promien_pilki){var c = Bodies.circle(duch.position.x,duch.position.y,2,{ isStatic: true });
  c.render.fillStyle = "#ffffff";
  c.render.strokeStyle = "#ffffff";
  c.render.opacity = 0.3;
  c.collisionFilter.mask = 2;
  World.add(engine.world,c); }

  if(odw==0 && ball.velocity.y>=0 && ball.position.y >height-10-3*promien_pilki){
        var odp = "Prędkość końcowa piłki wynosiła " + Math.sqrt(ball.velocity.y*ball.velocity.y+ball.velocity.x*ball.velocity.x).toFixed(2) + " m/s \n"
        var odp1 =  "Zasieg rzutu wynosił " + Math.abs(ball.position.x-poczatek).toFixed(2) + " m \n";
	      var odpfinal = odp + odp1;
	      console.log(odpfinal);
	      alert(odpfinal);
        odw = 1;


  }



});

// get the centre of the viewport
 var viewportCentre = {
     x: render.options.width * 0.5,
     y: render.options.height * 0.5
 };



    // make the world bounds a little bigger than the render bounds


    // keep track of current bounds scale (view zoom)
    var boundsScaleTarget = 1,
        boundsScale = {
            x: 1,
            y: 1
        };




    // use the engine tick event to control our view
    document.body.addEventListener('mousedown', function() {
    Events.on(engine, 'beforeTick', function() {
        var world = engine.world,
            mouse = mouseConstraint.mouse,
            translate;

        // mouse wheel controls zoom
        var scaleFactor = mouse.wheelDelta * -0.1;
        if (scaleFactor !== 0) {
            if ((scaleFactor < 0 && boundsScale.x >= 0.5) || (scaleFactor > 0 && boundsScale.x <= 8)) {
                boundsScaleTarget += scaleFactor;
            }
        }

        // if scale has changed
        if (Math.abs(boundsScale.x - boundsScaleTarget) > 0.01) {
            // smoothly tween scale factor
            scaleFactor = (boundsScaleTarget - boundsScale.x) * 0.2;
            boundsScale.x += scaleFactor;
            boundsScale.y += scaleFactor;

            // scale the render bounds
            render.bounds.max.x = render.bounds.min.x + render.options.width * boundsScale.x;
            render.bounds.max.y = render.bounds.min.y + render.options.height * boundsScale.y;

            // translate so zoom is from centre of view
            translate = {
                x: render.options.width * scaleFactor * -0.5,
                y: render.options.height * scaleFactor * -0.5
            };

            Bounds.translate(render.bounds, translate);

            // update mouse
            Mouse.setScale(mouse, boundsScale);
            Mouse.setOffset(mouse, render.bounds.min);
        }

        // get vector from mouse relative to centre of viewport
        var deltaCentre = Vector.sub(mouse.absolute, viewportCentre),
            centreDist = Vector.magnitude(deltaCentre);

        // translate the view if mouse has moved over 50px from the centre of viewport
        if (centreDist > 50) {
            // create a vector to translate the view, allowing the user to control view speed
            var direction = Vector.normalise(deltaCentre),
                speed = Math.min(25, Math.pow(centreDist - 50, 2) * 0.002);

            translate = Vector.mult(direction, speed);

            // prevent the view moving outside the world bounds
            if (render.bounds.min.x + translate.x < world.bounds.min.x)
                translate.x = world.bounds.min.x - render.bounds.min.x;

            if (render.bounds.max.x + translate.x > world.bounds.max.x)
                translate.x = world.bounds.max.x - render.bounds.max.x;

            if (render.bounds.min.y + translate.y < world.bounds.min.y)
                translate.y = world.bounds.min.y - render.bounds.min.y;

            if (render.bounds.max.y + translate.y > world.bounds.max.y)
                translate.y = world.bounds.max.y - render.bounds.max.y;

            // move the view
            Bounds.translate(render.bounds, translate);

            // we must update the mouse too
            Mouse.setOffset(mouse, render.bounds.min);
        }
    });
    });




Render.run(render);
setup();
