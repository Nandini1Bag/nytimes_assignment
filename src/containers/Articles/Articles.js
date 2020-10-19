import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

import ArticleTile from '../../components/ArticleTile/ArticleTile';
import './Articles.css';

class Articles extends Component{
 
    state={
        articledata:[]
    }

    componentDidMount(){
       console.log(this.props);
        axios.get("https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=rOdFTBy8ifr0y2EhhG72MUmeGGADIl5s")
        .then(response => {
          console.log("response", response);
             const data = response.data.results;
                console.log("data",data);

             this.setState({articledata:data})
        }).catch(error => {
         console.log(error); 
        // this.setState({error:true})  ; 
        });      
    }

    postSelectedHandler=(id)=>{
      //  this.setState({selectedPostId:id});
     this.props.history.push({pathname: '/' + id});    
     //Alternative
     //this.props.history.push( '/' + id); 
    }

    render(){
        let articles= <p style={{textAlign:"center"}}>Something went wrong</p>
        if (! this.state.error){
          articles=this.state.articledata.map(article=>{
            console.log("article.title",article.title);
            console.log("article",article);
              return  (
              //  <Link to={'/'+ article.id}   key={article.id} > 
                 <ArticleTile 
                         key={article.id}
                         title={article.title} 
                         url={article.url}
                         author={article.byline}
                         publisheddate={article.published_date}
                         media={article.media}
                         clicked={()=>{this.postSelectedHandler(article.id)}}/>
              // </Link>
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
          </div>

        )
    }
}

export default Articles;