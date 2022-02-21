import React, { Component } from 'react'
import axios from 'axios';

export default class Movies extends Component {
  constructor(){
    super();
    this.state={
      hover:'',
      parr:[1],
      currPage:1,
      movies:[],
      favourites:[]
    }
  }
  async componentDidMount(){
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=a86e6e6485db6531003f662387a51e25&language=en-US&page=${this.state.currPage}`);
    let data = res.data;
    this.setState({
      movies:[...data.results]
    })
  }
  changeMovies=async()=>{
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=a86e6e6485db6531003f662387a51e25&language=en-US&page=${this.state.currPage}`);
    let data = res.data;
    this.setState({
      movies:[...data.results]
    })    
  }
  handleRight=()=>{
    let temparr = []
    if(this.state.currPage==this.state.parr.length){
      for(let i=1; i<=this.state.parr.length+1;i++){
        temparr.push(i)
      }
    }
    else{
      for(let i=1; i<=this.state.parr.length;i++){
        temparr.push(i)
      }
    }  
    this.setState({
      parr:[...temparr],
      currPage:this.state.currPage+1
    },this.changeMovies)
  }
  handleLeft=()=>{
    if(this.state.currPage!=1){
      this.setState({
        currPage:this.state.currPage-1
      },this.changeMovies)
    }
  }
  handleClick=(value)=>{
    if(value!=this.state.currPage){
      this.setState({
        currPage:value
      },this.changeMovies)
    }
  }
  handleFavourites=(movie)=>{
    let oldData = JSON.parse(localStorage.getItem("movies") || "[]")
    if(this.state.favourites.includes(movie.id)){
      oldData = oldData.filter((m)=>m.id!=movie.id)
    }
    else{
      oldData.push(movie)
    }
    localStorage.setItem("movies",JSON.stringify(oldData));
    this.handleFavouritesState();
    console.log(oldData);
  }
  handleFavouritesState=()=>{
    let oldData = JSON.parse(localStorage.getItem("movies") || "[]")
    let temp = oldData.map((m)=>m.id);  
    this.setState({
      favourites:[...temp]
    })
  }
  render() {
    return (
      <> 
        {
            this.state.movies.length===0?
            <div key='movie.id' className="spinner-border text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>:     
            <div>
                <h1 className='text-center'><strong>Trending</strong></h1>
                <div className="movies-list">
                  {
                    this.state.movies.map((movieobj)=>(
                      <div className="card movies-card" onMouseEnter={()=>this.setState({hover:movieobj.id})} onMouseLeave={()=>this.setState({hover:''})}>
                        <img src={`https://image.tmdb.org/t/p/original${movieobj.backdrop_path}`} alt={movieobj.title} className="card-img-top movies-img"/>
                        {/* <div className="card-body"> */}
                        <h3 className="card-title movies-title">{movieobj.original_title}</h3>
                        {/* <p className="card-text movies-text">{movieobj.overview}</p> */}
                        <div className="button-wrapper" style={{display:'flex',width:'100%',justifyContent:'center'}}>
                          {
                            this.state.hover==movieobj.id && <a className="btn btn-primary movies-button" onClick={()=>this.handleFavourites(movieobj)}>{this.state.favourites.includes(movieobj.id)?'Remove from Favourites':'Add to Favourites'}</a>
                          }
                        </div>
                        {/* </div> */}
                      </div>
                    ))
                  }
                </div>
                <div style={{display:'flex', justifyContent:'center'}}>
                  <nav aria-label="Page navigation example" >
                    <ul className="pagination">
                      <li className="page-item"><a className="page-link" onClick={this.handleLeft}>Previous</a></li>
                      {
                        this.state.parr.map((value)=>(
                          <li className="page-item"><a className="page-link" onClick={()=>this.handleClick(value)}>{value}</a></li>
                        ))
                      }
                      <li className="page-item"><a className="page-link" onClick={this.handleRight}>Next</a></li>
                    </ul>
                  </nav>
                </div>
            </div>
        }
      </>
    )
  }
}
