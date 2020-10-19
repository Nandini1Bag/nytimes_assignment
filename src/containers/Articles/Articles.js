import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import ArticleTile from '../../components/ArticleTile/ArticleTile';
import './Articles.css';

class Articles extends Component{
 
    constructor(props) {
      super(props);
      this.state = {
        offset: 0,
        articledata:[],
        perPage: 10,
        currentPage: 0
      };
      this.handlePageClick = this
          .handlePageClick
          .bind(this);
  }

    receivedData() {
      console.log(this.props);
      axios.get("https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=rOdFTBy8ifr0y2EhhG72MUmeGGADIl5s")
      .then(response => {
           const data = response.data.results;
           this.setState({articledata:data})
        //        this.setState({pageCount: Math.ceil(data.length / this.state.perPage),           
        //     articles
        // })
      }).catch(error => {
       console.log(error); 
      // this.setState({error:true})  ; 
      });      
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
        currentPage: selectedPage,
        offset: offset
    }, () => {
        this.receivedData()
    });

  }

    componentDidMount(){
      this.receivedData();       
    };

    postSelectedHandler=(id)=>{
      //  this.setState({selectedPostId:id});
     this.props.history.push({pathname: '/' + id});    
     //Alternative
     //this.props.history.push( '/' + id); 
    }

    render(){
        let articles= <p style={{textAlign:"center"}}>Something went wrong</p>
        if (! this.state.error){
          const data = this.state.articledata;
          articles=data.map(article=>{
              return  (
                 <ArticleTile 
                         key={article.id}
                         title={article.title} 
                         url={article.url}
                         author={article.byline}
                         publisheddate={article.published_date}
                         media={article.media}
                         clicked={()=>{this.postSelectedHandler(article.id)}}/>
              )
          });
       
      
        }
        return(
          <div className="divarticles">
          <section className="articles">
            <ul className="articleTiles">
            {articles}
            </ul>
          </section>
          {/* <Route path={this.props.match.url + '/:id' } exact component={FullPost}/>   */}
          <ReactPaginate
                  previousLabel={"prev"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={this.state.pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={this.handlePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}/>
          </div>

        )
    }
}

export default Articles;