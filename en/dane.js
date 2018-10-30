var pr_pocz1, kat_pocz1, wiatrx1, wiatry1, promien_pilki1, plyw1, szer_geo1, kierunek_rzutu1, pr_kat_pilki1, temp1;
var g = 0, przyspieszeniegrawcp, masa_planetycp, masa_ksiezycacp, promien_planetycp, doba_planetycp;
var kolor1 = 0, h01, opor_pow;


function startFunction(){
    pr_pocz1 = document.getElementById("pr_pocz").value;
    kat_pocz1 = document.getElementById("kat_pocz").value;
    wiatrx1 = document.getElementById("wiatrx").value;
    wiatry1 = document.getElementById("wiatry").value;
    opor_pow = document.getElementById("promien_pilki").value;
    plyw1 = document.getElementById("plyw").value;
    szer_geo1 = document.getElementById("szer_geo").value;
    kierunek_rzutu1 = document.getElementById("kierunek_rzutu").value;
    pr_kat_pilki1 = document.getElementById("pr_kat_pilki").value;
    temp1 = document.getElementById("temp").value;
    h01 = document.getElementById("h0").value;



    localStorage.setItem("pr_pocz1",pr_pocz1);
    localStorage.setItem("kat_pocz1",kat_pocz1);
    localStorage.setItem("wiatrx1",wiatrx1);
    localStorage.setItem("wiatry1",wiatry1);
    localStorage.setItem("opor_pow",opor_pow);
    localStorage.setItem("plyw1",plyw1);
    localStorage.setItem("szer_geo1",szer_geo1);
    localStorage.setItem("kierunek_rzutu1",kierunek_rzutu1);
    localStorage.setItem("pr_kat_pilki1",pr_kat_pilki1);
    localStorage.setItem("temp1",temp1);
    localStorage.setItem("h01",h01);




    if(pr_pocz1 > 100 || pr_pocz1 < 0)
    {
        alert("Correct input: initial velocity");
    }
    else
    {
        if(kat_pocz1 > 90 || kat_pocz1<-90)
        {
            alert("Correct input: angle");
        }
        else
        {
            if(opor_pow < 0 || opor_pow>0.05)
            {
                alert("Correct input: air resistance");
            }
            else
            {
                if(plyw1 < 0 || plyw1 > 2)
                {
                    alert("Correct input: tidal force");
                }
                else
                {
                    if(szer_geo1 > 90 || szer_geo1 < -90)
                    {
                        alert("Correct input: latitude");
                    }
                    else
                    {
                        if(kierunek_rzutu1 !="E" && kierunek_rzutu1 != "W")
                        {
                            alert("Correct input: direction of the throw");
                        }
                        else
                        {
                            if(temp < 0)
                            {
                                alert("Correct input: temperature");
                            }
                            else
                            {
                                if(g === 0)
                                {
                                    alert("Choose the planet");
                                }
                                else
                                {
                                    if(kolor1 === 0)
                                    {
                                        alert("Choose the color of the ball");
                                    }
                                    else
                                    {
                                        if(h01 > 1080 || h01<0)
                                        {
                                          alert("Correct input: Initial Height");
                                        }
                                        else
                                        {
                                          //alert("Dane zostały wprowadzone poprawnie. Przygotowuję symulację.");
                                          window.location.href = "rzut.html";
                                        }
                                    }

                                }
                            }

                        }
                    }
                }
            }
        }
    }


}



function planetFunction1(){ //merkury
    przyspieszeniegrawcp = 3.7;
    masa_planetycp = 33011000000000000000000;
    masa_ksiezycacp = 0;
    promien_planetycp = 2439700;
    doba_planetycp = 5065200;
    document.getElementById("wybor_planety").innerHTML = "Selected: Mercury";
    g =1;
    localStorage.setItem("przyspieszeniegrawcp",przyspieszeniegrawcp);
    localStorage.setItem("masa_planetycp",masa_planetycp);
    localStorage.setItem("masa_ksiezycacp",masa_ksiezycacp);
    localStorage.setItem("promien_planetycp",promien_planetycp);
    localStorage.setItem("doba_planetycp",doba_planetycp);
}
function planetFunction2(){ //wenus
    przyspieszeniegrawcp = 8.87;
    masa_planetycp = 4867000000000000000000000;
    masa_ksiezycacp = 0;
    promien_planetycp = 6051800;
    doba_planetycp = 20995200;
    document.getElementById("wybor_planety").innerHTML = "Selected: Venus";
    g=1;
    localStorage.setItem("przyspieszeniegrawcp",przyspieszeniegrawcp);
    localStorage.setItem("masa_planetycp",masa_planetycp);
    localStorage.setItem("masa_ksiezycacp",masa_ksiezycacp);
    localStorage.setItem("promien_planetycp",promien_planetycp);
    localStorage.setItem("doba_planetycp",doba_planetycp);
}
function planetFunction3(){ //ziemia
    przyspieszeniegrawcp = 9.81;
    masa_planetycp = 4301100000000000000000000;
    masa_ksiezycacp = 73476730000000000000000;
    promien_planetycp = 6400000;
    doba_planetycp = 86400;
    document.getElementById("wybor_planety").innerHTML = "Selected: Earth";
    g=1;
    localStorage.setItem("przyspieszeniegrawcp",przyspieszeniegrawcp);
    localStorage.setItem("masa_planetycp",masa_planetycp);
    localStorage.setItem("masa_ksiezycacp",masa_ksiezycacp);
    localStorage.setItem("promien_planetycp",promien_planetycp);
    localStorage.setItem("doba_planetycp",doba_planetycp);
}
function planetFunction4(){ //księżyc
    przyspieszeniegrawcp = 1.622;
    masa_planetycp = 73476730000000000000000;
    masa_ksiezycacp = 0;
    promien_planetycp = 1737064;
    doba_planetycp = 1555200;
    document.getElementById("wybor_planety").innerHTML = "Selected: Moon";
    g=1;
    localStorage.setItem("przyspieszeniegrawcp",przyspieszeniegrawcp);
    localStorage.setItem("masa_planetycp",masa_planetycp);
    localStorage.setItem("masa_ksiezycacp",masa_ksiezycacp);
    localStorage.setItem("promien_planetycp",promien_planetycp);
    localStorage.setItem("doba_planetycp",doba_planetycp);
}
function planetFunction5() { //mars
    przyspieszeniegrawcp = 3.71;
    masa_planetycp = 640000000000000000000000;
    masa_ksiezycacp = 6470000000000000;
    promien_planetycp = 3389200;
    doba_planetycp = 88200;
    document.getElementById("wybor_planety").innerHTML = "Selected: Mars";
    g=1;
    localStorage.setItem("przyspieszeniegrawcp",przyspieszeniegrawcp);
    localStorage.setItem("masa_planetycp",masa_planetycp);
    localStorage.setItem("masa_ksiezycacp",masa_ksiezycacp);
    localStorage.setItem("promien_planetycp",promien_planetycp);
    localStorage.setItem("doba_planetycp",doba_planetycp);
}
function planetFunction6() {    //jowisz
    przyspieszeniegrawcp = 24.79;
    masa_planetycp = 1898190000000000000000000000;
    masa_ksiezycacp = 95000000000000000000000;
    promien_planetycp = 71492000;
    doba_planetycp = 36000;
    document.getElementById("wybor_planety").innerHTML = "Selected: Jupiter";
    g=1;
    localStorage.setItem("przyspieszeniegrawcp",przyspieszeniegrawcp);
    localStorage.setItem("masa_planetycp",masa_planetycp);
    localStorage.setItem("masa_ksiezycacp",masa_ksiezycacp);
    localStorage.setItem("promien_planetycp",promien_planetycp);
    localStorage.setItem("doba_planetycp",doba_planetycp);
}

function ballFunction(shit)
{
	if(shit == 1) ballFunction1();
	if(shit == 2) ballFunction2();
	if(shit == 3) ballFunction3();
	if(shit == 4) ballFunction4();
	if(shit == 5) ballFunction5();
	if(shit == 6) ballFunction(6);
}

function ballFunction1()
{
    kolor1 = "#ff6347";
    console.log(kolor1);
    document.getElementById("wybor_koloru").innerHTML = "Selected: Red";
    localStorage.setItem("kolor1",kolor1);
};
function ballFunction2()
{
    kolor1 = "#4a51ff";
    console.log(kolor1);
    document.getElementById("wybor_koloru").innerHTML = "Selected: Blue";
    localStorage.setItem("kolor1",kolor1);
};
function ballFunction3()
{
    kolor1 = "#ffffff";
    console.log(kolor1);
    document.getElementById("wybor_koloru").innerHTML = "Selected: White";
    localStorage.setItem("kolor1",kolor1);
};
function ballFunction4()
{
    kolor1 = "#39ff37";
    console.log(kolor1);
    document.getElementById("wybor_koloru").innerHTML = "Selected: Green";
    localStorage.setItem("kolor1",kolor1);
};
function ballFunction5()
{
    kolor1 = "#feff24";
    console.log(kolor1);
    document.getElementById("wybor_koloru").innerHTML = "Selected: Yellow";
    localStorage.setItem("kolor1",kolor1);
};
function ballFunction6()
{
    kolor1 = "#ff952f";
    console.log(kolor1);
    document.getElementById("wybor_koloru").innerHTML = "Selected: Orange";
    localStorage.setItem("kolor1",kolor1);
};
