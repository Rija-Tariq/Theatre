$('.formm').submit(false);

$('.searchh').click(function() {
    var name = $('#name').val();
 window.location.href = '/SearchResults/'+name;
});



var url = "" + window.location.href;
console.log(url); 

geturl(url);

 var variable;

function geturl(url) {

    variable = url ? url.split('/')[4] : window.location.search.slice(1);
    
    variable = variable.replace(/%20/g, " ")
    
    console.log(variable);   
}


var i = 0, j = 0;
var interval = setInterval(function(){
j = $('.sup').length;
imgselector = $('.sup')[i];
imageselector= $('.suppp')[i];
titleselector=$('.titlee')[i];
imgpath = $('.supp')[i].textContent;
imgselector.src = imgpath;
imgselector.title=titleselector.textContent;
imageselector.href = '/movie/'+titleselector.textContent
i++;
console.log(i);
if(i==j){
	clearInterval(interval);
	loadd()
}
	

 }, 1);