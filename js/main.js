
//when the DOM content is loaded
$(document).ready(function(){

    //render include components
    renderIncludes();

    //show index components
    showIndexComponents();

    //scroll
    linksScroll();

    //getting data for known movies
    getKnownMovies();

    //getting data by get

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

    sr.reveal('#div-movie-results', {
        duration: 4000,
        origin: 'right',
        distance: '-250px'
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
        
            if($('#div-movie-results')) {
                for( var i = 0; i < 9; i++) {
                    var element = `
                        <div class="col-md-4 mt-5">
                            <h1 class="title-movie fs-6 fs-md-4">${respuestas[i].Title}</h1>
                            <img src="${respuestas[i].Poster}" class="img-fluid movie-result rounded">
                        </div>`;
                    $('#div-movie-results').append(element);
                }
            }
            
            console.log(movieImages);
        });
}

function renderIncludes() {
    $.ajax('../includes/footer.html', {
        success: function(resp) {
            $('body').append($(resp));
        }
    })
}

function getDataSearch() {
    // $.ajax()
}