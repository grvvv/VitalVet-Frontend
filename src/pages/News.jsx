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
    <div className="news-container"> {/* Apply class for styling */}
      <h2 className="news-title">Latest News</h2> {/* Apply class for styling */}
      {loading ? (
        <Loader />
      ) : (
        <ul className="news-list"> {/* Apply class for styling */}
          {news.map((article, index) => (
            <li key={index} className="news-item"> {/* Apply class for styling */}
              <div className="news-content"> {/* Apply class for styling */}
                {article.urlToImage && <img src={article.urlToImage} alt={article.title} className="news-image" />} {/* Check if image URL exists */}
                <div className="news-text"> {/* Apply class for styling */}
                  <h3 className="news-heading">{article.title}</h3> {/* Apply class for styling */}
                  <p className="news-description">{article.description}</p> {/* Apply class for styling */}
                  <a href={article.url} className="news-link" target="_blank" rel="noopener noreferrer"> {/* Apply class for styling */}
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