const API_Kay = 'f41c605da0c98556ba6936ba84a84218';

const access_token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDFjNjA1ZGEwYzk4NTU2YmE2OTM2YmE4NGE4NDIxOCIsInN1YiI6IjY1N2RhMGNiNWM1Y2M4MDZkODk2MWNhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-e50eGfi0VANMoUDwavlSlFGXMhS9DYYCtn2_CC5z-s';

const base_url = 'https://api.themoviedb.org/3';
const base_img = 'https://image.tmdb.org/t/p/w500';
const get_movie = '/discover/movie';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${access_token}`
    }
};

async function fatchmovies(api) {
    const response = await fetch(api);
    const data = await response.json()
    setCarousel(data.results)
    getmoviedetals(data.results)
    console.log(data.results)
}



const api_url = `${base_url}${get_movie}?api_key=${API_Kay}`;

fatchmovies(api_url)

async function setCarousel(movies) {
    const carousel = document.querySelector('.owl-carousel')

    await movies.map(movie => {
        const movie_titel = (movie.original_title).split(" ").slice(0, 3).join(' ')
        carousel.innerHTML += `
        <div class="owl-carousel-info-wrap item">
        <img src=${base_img}${movie.poster_path} class="owl-carousel-image img-fluid" alt="">
        <img src="images/${movie.adult ? "18-icon" : "verified"}.png" class="owl-carousel-verified-image img-fluid"alt="">
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
        responsive: {
            0: {
                items: 2,
            },
            767: {
                items: 3,
            },
            1200: {
                items: 4,
            }
        }
    });
}

const moviesurls = []

function getmoviedetals(movies) {
    const lastes = document.querySelector(".Lastest")

    movies.map(movie => {
        const url = `${base_url}/movie/${movie.id}`;
        moviesurls.push(url);

    })
    const movies_urls_to_fetch = moviesurls.slice(2, 5)

    movies_urls_to_fetch.forEach((url) => {
        fetch(url, options)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                lastes.innerHTML += `
        <div class="col-lg-6 col-12 mb-4 mb-3">
        <div class="custom-block d-flex">
            <div class="">
                <div class="custom-block-icon-wrap">
                    <div class="section-overlay"></div>
                    <a href="detail-page.html" class="custom-block-image-wrap">
                        <img src="${base_img}${response.poster_path} "
                            class="custom-block-image img-fluid" alt="">

                        <a href="#" class="custom-block-icon">
                            <i class="bi-play-fill"></i>
                        </a>
                    </a>
                </div>

                <div class="mt-2">
                    <a href="#" class="btn custom-btn">
                        Subscribe
                    </a>
                </div>
            </div>

            <div class="custom-block-info">
                <div class="custom-block-top d-flex mb-1">
                    <small class="me-4">
                        <i class="bi-clock-fill custom-icon"></i>
                        50 Minutes
                    </small>

                    <small>${response.original_language} <span class="badge">15</span></small>
                </div>

                <h5 class="mb-2">
                    <a href="detail-page.html">
                        ${response.original_title}
                    </a>
                </h5>

                <div class="profile-block d-flex">
                    <img src="${base_img}${response.production_companies[0].logo_path} "
                        class="profile-block-image img-fluid" alt="">

                    <p>
                        ${response.production_companies[0].name}
                        <img src="images/verified.png" class="verified-image img-fluid" alt="">
                        <strong>${response.production_companies[0].origin_country}</strong>
                    </p>
                </div>

                <p class="mb-0">${response.overview}</p>

                <div class="custom-block-bottom d-flex justify-content-between mt-3">
                    <a href="#" class="bi-headphones me-1">
                        <span>120k</span>
                    </a>

                    <a href="#" class="bi-heart me-1">
                        <span>42.5k</span>
                    </a>

                    <a href="#" class="bi-chat me-1">
                        <span>11k</span>
                    </a>

                    <a href="#" class="bi-download">
                        <span>50k</span>
                    </a>
                </div>
            </div>

            <div class="d-flex flex-column ms-auto">
                <a href="#" class="badge ms-auto">
                    <i class="bi-heart"></i>
                </a>

                <a href="#" class="badge ms-auto">
                    <i class="bi-bookmark"></i>
                </a>
            </div>
        </div>
    </div>
        `
            })
            .catch(err => console.error(err));
    })
}

const search_form = document.getElementById("search")
search_form.addEventListener("submit", function (e) {
    e.preventDefault()
    console.log(this.search.value)
    const url_search = `${base_url}/search/movie?query=${this.search.value}`

    const searchResults = document.querySelector(".search-results")
    const searchSection = document.querySelector(".search-section")
    fetch(url_search, options)
        .then(response => response.json())
        .then(response => {
            console.log(response.results)
            if (!response.results || response.results.length === 0) {
                searchSection.style.display = "block";
                searchResults.innerHTML = "<h3 class='text-center'>No results found for your query.</h3>"
            } else {
                searchResults.innerHTML =""
                searchSection.style.display = "block";
                response.results.map(result =>{
                searchResults.innerHTML += `
                <div class="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0 resulte-box">
                <div class="custom-block custom-block-overlay">
                    <a href="detail-page.html" class="custom-block-image-wrap">
                        <img src="${base_img}${result.poster_path}"
                            class="custom-block-image img-fluid" alt="">
                    </a>

                    <div class="custom-block-info custom-block-overlay-info">
                        <h5 class="mb-1">
                            <a href="listing-page.html" class="text-search">
                                ${result.original_title}
                            </a>
                        </h5>

                        <p class="badge mb-0">${result.original_language}</p>
                    </div>
                </div>
            </div>
                `
                })

            }
        })
        .catch(err => console.error(err));
})


