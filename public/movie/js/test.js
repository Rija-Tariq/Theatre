var url = "" + window.location.href;
geturl(url);

 var variable;

function geturl(url) {

    variable = url ? url.split('/')[4] : window.location.search.slice(1);
    
    variable = variable.replace(/%20/g, " ")
    
    console.log(variable);   
}

Title = $('.tittle').text();
Genre = $('.genree').text();
Image = $('.imagelink').text();
Video = $('.videolink').text();
Trailer = $('.trailerlink').text();
Rating = $('.rating').text();
Lead = $('.leadd').text();
Year = $('.year').text();

$('.ttile').text(Title);
$('.mmovie')[0].src=Video;
$('.ttrailer')[0].src=Trailer;
$('.imagee')[0].src=Image;
$('.ttrailer')[0].firstElementChild.src=Trailer;
$('.rrating').text(Rating);
$('.ggenre').text(Genre);
$('.yyear').text(Year);
$('.llead').text(Lead);
$('#cf-title').val(Title);


$( ".lightson" ).click(function() {
    
    $("#about").css("background-color", 'black');
    $(".navbar").css("background-color", 'black');
    $(".ttile").css("color", 'white');
    $( ".lightson" ).text("Turn lights on!");
    $( ".lightson" ).css('color', 'white');
    $(".lightson").addClass("lightsoff");
    $(".lightson").removeClass("lightson");

});

$(".lightsoff" ).click(function() {
    
    $("#about").css("background-color", 'white')
    $(".navbar").css("background-color", 'white')
    $(".ttile").css("color", 'white')
    $( ".lightsoff" ).text("Turn lights of!")
    $( ".lightsoff" ).css('color', 'white')
    $(".lightsoff").addClass("lightson");
    $(".lightsoff").removeClass("lightsoff");
});

// $('#contact-form').submit(false);
// var xhttp = new XMLHttpRequest();
// xhttp.open("POST", '/movie/:title', true);

// // $('#send').click(function() {

// var send = { "name":"John", "age":30, "car":null };
// // var sendString = JSON.stringify(send);
// // alert(sendString);
// // xhttp.send(sendString);

// // });
// res.status(200).send(send);



