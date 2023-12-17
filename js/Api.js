const API_Kay = 'f41c605da0c98556ba6936ba84a84218';

const access_token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDFjNjA1ZGEwYzk4NTU2YmE2OTM2YmE4NGE4NDIxOCIsInN1YiI6IjY1N2RhMGNiNWM1Y2M4MDZkODk2MWNhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-e50eGfi0VANMoUDwavlSlFGXMhS9DYYCtn2_CC5z-s';

const base_url = 'https://api.themoviedb.org/3';
const base_img = 'https://image.tmdb.org/t/p/w500';
const get_movie = '/discover/movie';


async function fatchmovies(api) {
    const response = await fetch(api);
    const data = await response.json()
    print(data.results)
    console.log(data.results)
}

const api_url = `${base_url}${get_movie}?api_key=${API_Kay}`;

fatchmovies(api_url)

async function print(movies) {
    const carousel = document.querySelector('.owl-carousel')

    await movies.map(movie => {
        const movie_titel = (movie.original_title).split(" ").slice(0 ,3).join(' ')
        carousel.innerHTML += `
        <div class="owl-carousel-info-wrap item">
        <img src=${base_img}${movie.poster_path} class="owl-carousel-image img-fluid" alt="">
        <img src="images/${movie.adult ? "18-icon":"verified"}.png" class="owl-carousel-verified-image img-fluid"alt="">
        <div class="owl-carousel-info">
            <h6 class="mb-2">${movie_titel}</h6>

            <span class="badge">${movie.release_date}</span>

            <span class="badge">${movie.original_language}</span>
        </div>
    </div>
        `
    })

    
    $('.owl-carousel').owlCarousel({
        center: true,
        loop: true,
        margin: 30,
        autoplay: true,
        responsiveClass: true,
        responsive:{
            0:{
                items: 2,
            },
            767:{
                items: 3,
            },
            1200:{
                items: 4,
            }
        }
    });
}



