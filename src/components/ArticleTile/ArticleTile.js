import React from "react";
import PropTypes from "prop-types";

import "./ArticleTile.css";

const getFarmatedDate = (date) => {
  const dateObj = new Date(date);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[dateObj.getMonth()];
  const dateVal = dateObj.getDate();
  const hour = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const timeFormat = hour >= 12 ? "PM" : "AM";
  return `${month} ${dateVal} | ${
    hour <= 12 ? hour : hour - 12
  }:${minutes}${timeFormat}`;
};

const ArticleTile = (props) => {
  const { title, url, updated, author, media = [] } = props;
  const artiCleImg = !!media.length ? media[0]["media-metadata"][2].url : "";
  return (
    <li className="article-tile">
      <article className="article-box">
        <figure className="article-photo">
          <a className="article-link" href={url} target="_blank">
            <img
              className="article-image"
              src={artiCleImg}
              alt="article-image"
            />
          </a>
        </figure>
        <div className="article-details">
          <h2 className="article-title">
            <a className="article-title-link" href={url} target="_blank">
              {title}
            </a>
          </h2>
          <p className="article-info">{getFarmatedDate(updated)}</p>
          <p className="article-info">{author}</p>
        </div>
      </article>
    </li>
  );
};

ArticleTile.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
  updated: PropTypes.string,
  author: PropTypes.string,
  media: PropTypes.array,
};

ArticleTile.defaultProps = {
  title: "",
  url: "",
  updated: "",
  author: "",
  media: [],
};

export default ArticleTile;
