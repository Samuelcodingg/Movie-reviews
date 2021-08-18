
//when the DOM content is loaded
$(document).ready(function(){

    //animations with scrollreveals library
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

    //scroll
    $('#moveToSearcher').click(function(e){
        e.preventDefault();
        var codigo = "#" + $(this).data("scroll");
        $("html,body").animate({scrollTop: $(codigo).offset().top},0);
    });
    
    $('#moveToKnownMovies').click(function(e){
        e.preventDefault();
        var codigo = "#" + $(this).data("scroll");
        $("html,body").animate({scrollTop: $(codigo).offset().top='750px'},0);
    });

    $('#moveToAboutThis').click(function(e){
        e.preventDefault();
        var codigo = "#" + $(this).data("scroll");
        $("html,body").animate({scrollTop: $(codigo).offset().top='250px'},0);
    });
});
