import React from 'react';
import SearchBar from './SearchBar';
import MovieList from './MovieList.js';
import axios from 'axios';
require('dotenv').config();


class App extends React.Component {

    state = {
        movies : [],
          searchQuery : ""
    }

    // async componentDidMount(){  // http request metodlarını burda yazmak daha mantıklıdır(get,post vs)
    //     const baseURL = "http://localhost:3002/movies" ;
    //     const response = await fetch(baseURL);  // fetch, promise döner
    //     const data = await response.json();
    //     console.log(data);
    //     this.setState({movies:data})
    // }

    async componentDidMount(){  // yukardaki metodun aynısı. ancak fetch yerine axios kullanılacak
      const baseURL = `https://api.themoviedb.org/4/list/7056581?page=1&api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1` ; 
      const response = await axios.get(baseURL);  
      console.log(response);
      this.setState({movies:response.data.results})
  }


    // deleteMovie = (movie) => {
    //   const newMovieList = this.state.movies.filter(
    //     m => m.id !== movie.id
    //   )

    //   this.setState(state => ({
    //     movies : newMovieList
    //   }))
    // }



    // deleteMovie = async (movie) => {  // yukardaki metodun fetch api ile yazılması
    //   const baseURL = `http://localhost:3002/movies/${movie.id}` ; 
    //   await fetch(baseURL,{method:"DELETE"})
    //   const newMovieList = this.state.movies.filter(
    //     m => m.id !== movie.id
    //   )
      
    //   this.setState(state => ({
    //     movies : newMovieList
    //   }))
    // }



    deleteMovie = async (movie) => {  // aynı metodun axios ile yazılması
      const baseURL = `http://localhost:3002/movies/${movie.id}` ; 
      await axios.delete(baseURL)
      const newMovieList = this.state.movies.filter(
        m => m.id !== movie.id
      )
      
      this.setState(state => ({
        movies : newMovieList
      }))
    }


    searchMovie = (event)=>{
       this.setState({ searchQuery : event.target.value })
    }

    render(){

        let filteredMovies = this.state.movies.filter(
          (movie) => {
            return movie.title.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1 
          }
        )

        return(
            <div className="container">
            
              <div className="row">
                  <div className="col-lg-12">
                    <SearchBar searchMovieProp={this.searchMovie}/>
                  </div>
              </div>

              <MovieList 
              movies={filteredMovies}
              deleteMovieProp = {this.deleteMovie}
              />

            </div>
        )
    }
}

export default App;