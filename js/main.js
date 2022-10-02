let getJSONData = function(url){
    let result = {};
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        return result;
    });
}

let API_URL = 'https://japceibal.github.io/japflix_api/movies-data.json';


let moviesArray = [];
let moviePoster = [];
let movieSelectedInfo = [];
let posters = []
let inputBuscar = document.getElementById("inputBuscar");
let buscarBtn = document.getElementById("btnBuscar");
let moviesSection = document.getElementById("moviesSection")


document.addEventListener("DOMContentLoaded", () => {
    

    getJSONData(API_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            moviesArray = resultObj.data;

            movieSelectedInfo = moviesArray.filter(x=>x.id == localStorage.getItem("movieSelectedID"))
            
            
           
            
            
        }
    });

    
    

    buscarBtn.addEventListener("click", () => {

        moviesSection.innerHTML = ""
        

        if(inputBuscar.value){

            filterByValue(moviesArray, inputBuscar.value)

            

            for(let i=0; i<results.length; i++){
                movie = results[i]
                

                

                    moviesSection.innerHTML += `
                    
                    <div id=${movie.id}>
                        <div id="movie-cont${i}" class="container">
                        <h3>${movie.title}</h3>
                        <div class="top-cont">
                            ${rating(Math.round(movie.vote_average/2))}
                            <p class="rating">Rating (${movie.vote_average})</p>
                            
        
                        </div>
                        
                        <p>${movie.tagline}</p>
                        </div>
                    </div>
                    
                    `

                
                
            }

            movieInfo();

            
            
            
            
        }

        
        

        
        
    })

    document.getElementById("movie-info-back").addEventListener("click", () => {
      document.getElementById("movie-info").classList.toggle("hide")
      document.getElementById("filter").classList.toggle("addBlur")
      document.getElementById("movie-info-back").classList.toggle("hide")
  })

    
    

    

    
});



function filterByValue(array, string) {    

    
    results = array.filter(obj => {
        return obj.title.toUpperCase().includes(string.toUpperCase()) || obj.tagline.toUpperCase().includes(string.toUpperCase()) || obj.overview.toUpperCase().includes(string.toUpperCase())
        
    })

    
}

function rating (stars) {
    let ratingToAppend = ""
    if(stars === 1) {
      ratingToAppend = `
    
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        `
  
        return ratingToAppend
  
    }
    else if(stars === 2) {
      ratingToAppend = `
    
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        `
        return ratingToAppend
  
    }
    else if(stars === 3) {
      ratingToAppend = `
    
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        `
        return ratingToAppend
  
    }
    else if(stars === 4) {
      ratingToAppend = `
    
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        `
        return ratingToAppend
  
    }
    else if(stars === 5) {
      ratingToAppend = `
    
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        `
        return ratingToAppend
  
    }
  }

  function movieInfo() {
    for(let i=0; i < 101; i++){
        
        let moviesCont =  document.getElementById("movie-cont" + i);
        

        moviesCont.addEventListener("mouseover", () => {
          
            
            localStorage.setItem("movieSelectedID", moviesCont.parentNode.id)
            

            localStorage.setItem("selectedJSON", JSON.stringify(moviesArray.filter(x =>  x.id == localStorage.getItem("movieSelectedID")))) 
            
            let selectedJSON = JSON.parse(localStorage.getItem("selectedJSON"))[0]

            getJSONData("http://www.omdbapi.com/?apikey=cb2977f&t="+ selectedJSON.title).then(function(resultObj){
                moviePoster = resultObj.data.Poster
                
                    
            })

            
        })

        moviesCont.addEventListener("click", () => {

          let selectedJSON = JSON.parse(localStorage.getItem("selectedJSON"))[0]
          
            document.getElementById("movie-info-back").classList.toggle("hide")

            let genresArray = []

            selectedJSON.genres.forEach(genre => {
              genresArray.push(genre.name)
              
            });
            

            yearReleased = selectedJSON.release_date
            
            
            document.getElementById("movie-info").innerHTML = 
            `
            
            <div class="movie-info-popup">
              <img src="${moviePoster}" alt="">
              <div class="movie-info-cont-left">
                <h1>${selectedJSON.title}</h1>
                <p style="font-size:smaller" style="margin-top: 2em;">${genresArray.join(", ")}</p>
                <p class="pOverview"style="margin-top: 2em;">${selectedJSON.overview}</p>
                <div class="buttons">
                  <button class="seemoreBtn" id="seemoreBtn" onclick ="seemoreBtnInfo()">More info</button>
                  <button class="watchBtn" id="watchBtn">Watch</button>
                </div>
                  <div class="seemoreInfo" id="seemoreInfo">
                    <div class="pYear">
                      <p><span>Year:</span></p>
                      <p>${selectedJSON.release_date.slice(0,4)}</p>
                    </div>
                    <div class="pDuration">
                      <p><span>Duration:</span></p>
                      <p>${selectedJSON.runtime} min</p>
                    </div>
                    <div class="pBudget">
                      <p><span>Budget:</span></p>
                      <p>$ ${numberWithCommas(selectedJSON.budget)}</p>
                    </div>
                    <div class="pRevenue">
                      <p><span>Revenue:</span></p>
                      <p>$ ${numberWithCommas(selectedJSON.revenue)}</p>
                    </div>
                    
                  </div>
                
                
              </div>
            </div>
            
            
            
            
            `

            document.getElementById("movie-info").classList.toggle("hide");
            document.getElementById("filter").classList.toggle("addBlur");

            

            
            })

        

        

        

        

    }

    

  }

  async function getAPI(url) {
    
    // Storing response
    const response = await fetch(url);
    
    // Storing data in form of JSON
    let data = await response.json();
    console.log(data);
    
}

  function showMovieInfo() {
    
    document.getElementById("movie-info").innerHTML += 
            `
            
            <h1>${movieSelectedJSON[0].title}</h1>
            
            <p>${movieSelectedJSON[0].overview}</p>
            <p>${movieSelectedJSON[0].genres[0].name}</p>
            
            `
  }

function showPosters(movieTitle) {
    
    
    
    let POSTERS_API_URL = " http://www.omdbapi.com/?t=" + movieTitle + "&apikey=cb2977f"

        getJSONData(POSTERS_API_URL).then(function(resultObj){
            moviePoster = resultObj.data.Poster
            console.log(moviePoster)
                    
            });
    

}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function seemoreBtnInfo(){
  document.getElementById("seemoreInfo").classList.toggle("hide")
}



    










