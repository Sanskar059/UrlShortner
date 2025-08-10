import React, { useEffect, useState } from 'react';

function Allurls() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://urlshortner-3-pq72.onrender.com/url/my-urls", {
      method: "GET",
      credentials: "include", // sends cookies/JWT
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.urls)) {
          setUrls(data.urls);
        } else {
          setUrls([]); // fallback if data is not correct
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching URLs:", err);
        setUrls([]);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading your URLs...</p>;

  return (
    <div>
      <h2>My Shortened URLs</h2>
      {urls.length === 0 ? (
        <p>No URLs found.</p>
      ) : (
        <ul>
          {urls.map((url) => (
            <li key={url._id}>
              <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">
                {url.originalUrl}
              </a>{" "}
              - Short:{" "}
              <a
                href={`https://urlshortner-3-pq72.onrender.com/${url.shortedURL}`}
                target="_blank"
                rel="noopener noreferrer"
              >
               https://urlshortner-3-pq72.onrender.com/{url.shortedURL}
              </a>{" "}
              (   {url.clicks} clicks)
            

 
            </li>
            
          ))}
        </ul>
      )}
    </div>
  );
}

export default Allurls;
