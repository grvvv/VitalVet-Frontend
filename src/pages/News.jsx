import React, { useEffect, useState } from 'react'
import Loader from '../components/alerts/Loader';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=farm OR livestock OR cow&apiKey=d7251873553444a3b3a2d72e1fc495b2`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        const data = await response.json();
        setNews(data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="news-container">
      <h2 className="news-title">Latest News</h2> 
      {loading ? (
        <Loader />
      ) : (
        <ul className="news-list"> 
          {news.map((article, index) => (
            <li key={index} className="news-item"> 
              <div className="news-content"> 
                {article.urlToImage && <img src={article.urlToImage} alt={article.title} className="news-image" />} 
                <div className="news-text"> 
                  <h3 className="news-heading">{article.title}</h3> 
                  <p className="news-description">{article.description}</p>
                  <a href={article.url} className="news-link" target="_blank" rel="noopener noreferrer">
                    Read more
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default News