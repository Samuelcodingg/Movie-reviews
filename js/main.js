
//when the DOM content is loaded
$(document).ready(function(){


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
