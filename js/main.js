
//when the DOM content is loaded
$(document).ready(function(){

    //show index components
    showIndexComponents();

    //scroll
    linksScroll();

    //getting data for known movies
    getKnownMovies();

    
});

//animations with scrollreveals library
function showIndexComponents() {
    window.sr = ScrollReveal();
    sr.reveal('#phrase',{
        duration: 3000
    });

    sr.reveal('.fa-film',{
        duration: 3000
    });

    sr.reveal('#about-this', {
        duration: 3000,
        origin: 'bottom',
        distance: '-100px'
    });

    sr.reveal('#known-movies', {
        duration: 4000,
        origin: 'right',
        distance: '-250px'
    });

    sr.reveal('#searcher', {
        duration: 3000
    });
}

function linksScroll() {
    $('#moveToSearcher').click(function(e){
        e.preventDefault();
        var codigo = "#" + $(this).data("scroll");
        $("html,body").animate({scrollTop: $(codigo).offset().top},0);
    });
    
    $('#moveToKnownMovies').click(function(e){
        e.preventDefault();
        var codigo = "#" + $(this).data("scroll");
        $("html,body").animate({scrollTop: $(codigo).offset().top='850px'},0);
    });

    $('#moveToAboutThis').click(function(e){
        e.preventDefault();
        var codigo = "#" + $(this).data("scroll");
        $("html,body").animate({scrollTop: $(codigo).offset().top='250px'},0);
    });
}

function getKnownMovies() {
    var movieImages = $('.img-movie');
    var movieTitles = $('.title-movie');

    //calling omdb api
    $.getJSON("http://www.omdbapi.com/?apikey=f3161dc0&s='action'&")
        .then(function(resp){
            var respuestas = resp.Search;
            console.log(respuestas);
            $.each(movieImages,function(i){
                movieTitles[i].textContent = respuestas[i].Title;
                movieImages[i].src = respuestas[i].Poster;
            });
        
            console.log(movieImages);
        });
}