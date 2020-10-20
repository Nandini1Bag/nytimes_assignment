import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";

import ArticleTile from "../../components/ArticleTile/ArticleTile";
import Pagination from "../../components/Pagination/Pagination";
import "./Articles.css";

const Articles = () => {
  const [isLoading, updateLoading] = useState(true);
  const [articledata, setArticleData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const articlesPerPage = 8;

  useEffect(() => {
    axios
      .get(
        "https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=rOdFTBy8ifr0y2EhhG72MUmeGGADIl5s"
      )
      .then((response) => {
        const data = response.data.results;
        setArticleData(data);
      })
      .catch((error) => {
        console.log("Error", error);
        setArticleData([]);
      })
      .finally(() => {
        updateLoading(false);
      });
  }, []);

  const articles = (() => {
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articledata.slice(
      indexOfFirstArticle,
      indexOfLastArticle
    );
    return currentArticles.map((article) => (
      <ArticleTile
        key={article.id}
        title={article.title}
        url={article.url}
        author={article.byline}
        updated={article.updated}
        source={article.source}
        media={article.media}
        clicked={() => {
          this.postSelectedHandler(article.id);
        }}
      />
    ));
  })();

  const handlePaginationClick = (event) => {
    setCurrentPage(+event.target.id);
  };

  return (
    <section className="articles-page">
      {isLoading ? (
        <div>Loading...</div>
      ) : !articles.length ? (
        <li>No Data found</li>
      ) : (
        <Fragment>
          {articledata.length > articlesPerPage && (
            <Pagination
              countPerPage={articlesPerPage}
              totalCount={articledata.length}
              currentPage={currentPage}
              onChange={handlePaginationClick}
            />
          )}
          <ul className="article-tiles-cont">{articles}</ul>
        </Fragment>
      )}
    </section>
  );
};

export default Articles;
