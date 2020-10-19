import React, { Component } from 'react';
import ImageTile from '../../components/ImageTile/ImageTile';

    class ArticleTile extends Component{
       
        render(){
           let Imagetile=null;
            if (this.props.media!==null){
                Imagetile=this.props.media.map(Image=>{
                  //  console.log("media-image",Image['media-metadata']) 
                  return  (
                   
                     <ImageTile 
                             key={Image.copyright}
                             mediametadata={Image['media-metadata']} ></ImageTile>
                  )
              });
            }

            return(
                <li className="article-tile">
                    <div className="contentinside">
                     {Imagetile}
                    <a className="anchorstyle" href={this.props.url} target="_blank">{this.props.title}</a>
                    <p>{this.props.publisheddate}</p>
                    </div>

                </li>
              )
           }

}

export default ArticleTile
