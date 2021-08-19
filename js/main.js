
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
    getDataSearch();

    //getting movies by url
    getMoviesByURL();

    //getting info movie
    getInfoMovie();

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
                        <div class="col-md-4 mt-5 movie-container">
                            <h1 class="title-movie fs-6 fs-md-4">${respuestas[i].Title}</h1>
                            <img src="${respuestas[i].Poster}" class="img-fluid movie-result rounded">
                            <h1></h1> <!--bootstrap bug solved XD-->
                            <a href="movie-info.html?id=${respuestas[i].imdbID}" class="btn btn-outline-light position-relative watch-movie" role="button">Watch info</a>
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
    $('#search').click(function(e) {
        e.preventDefault();
        var title = $('#element-searched')[0].value;

       getJSONByTitle(title);
    })
}

function cleanMovieResults() {
    $('.movie-container').remove();
}

function getMoviesByURL() {
    const params = new URLSearchParams(document.location.search.substring(1));

    if($('#div-movie-results') && params.get('title')) {
        const title = params.get('title');

        getJSONByTitle(title);        
    }
}

function getJSONByTitle(title) {
    $.getJSON("http://www.omdbapi.com/?apikey=f3161dc0&s='"+ title +"'&")
    .then(function(resp){
        var respuestas = resp.Search;
        console.log(respuestas);

        cleanMovieResults();

        if($('#div-movie-results')) {
            for( var i = 0; i < 9; i++) {
                var element = `
                    <div class="col-md-4 mt-5 movie-container">
                        <h1 class="title-movie fs-6 fs-md-4">${respuestas[i].Title}</h1>
                        <img src="${respuestas[i].Poster}" class="img-fluid movie-result rounded">
                        <h1></h1> <!--bootstrap bug solved XD-->
                        <a href="movie-info.html?id=${respuestas[i].imdbID}" class="btn btn-outline-light position-relative watch-movie" role="button">Watch info</a>
                    </div>`;
                $('#div-movie-results').append(element);
            }
        }

        sr.reveal('.movie-container', {
            duration: 4000,
            origin: 'right',
            distance: '-250px'
        });
    });
}

function getInfoMovie() {
    if(document.querySelector('#container-movie-info')) {
        const params = new URLSearchParams(document.location.search.substring(1));
        const id = params.get('id');

        $.getJSON("http://www.omdbapi.com/?apikey=f3161dc0&i="+ id +"&plot=full")
        .then(function(resp){
            var respuesta = resp;
            console.log(respuesta);
            const element = `
                <div class="col-md-4 text-center">
                    <img src="${respuesta.Poster}" class="img-fluid rounded movie-principal">
                </div>
                <div class="col-md-8 mt-5 mt-md-0 px-5">
                    <div>
                        <h1>${respuesta.Title}</h1>
                        <p class="fw-bold">${respuesta.Title}</p>
                    </div>
                    <div>
                        <p> <span class="fw-bold"> Director: </span>${respuesta.Director}</p>
                        <p> <span class="fw-bold"> Genre: </span>${respuesta.Genre}</p>
                        <p> <span class="fw-bold"> Actors: </span>${respuesta.Actors}</p>
                        <p>${respuesta.Plot}</p>
                    </div>
                </div>
            `;

            $('#container-movie-info').append(element);

            sr.reveal('#container-movie-info', {
                duration: 4000,
                origin: 'right',
                distance: '-250px'
            });
        });
    }
}