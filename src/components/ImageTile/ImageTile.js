import React, { Component } from 'react';
import PropTypes from 'prop-types';

 class ImageTile extends Component {

    render() {
        //let Imagedata=null;
        let imageUrl,imageheight,imagewidth;
        if (this.props.mediametadata!==null){
            this.props.mediametadata.map( mediadata=>{           
            if ((window.innerWidth >= 650)&&(mediadata.width===210)){
               imageUrl =mediadata.url;
               imageheight=mediadata.height;
               imagewidth=mediadata.width;
            }     

          });
        }
        return (
            <img src={imageUrl} alt="Technical Documentation Page" width={imagewidth} height={imageheight}></img>           
        )
    }
}

export default ImageTile
