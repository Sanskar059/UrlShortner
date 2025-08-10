import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ShortenerPage() {
  const [originalUrl, setOriginalUrl] = useState("");
  const navigate = useNavigate()
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const backendBase = "http://localhost:8000/url";
   // Change if your backend runs elsewhere
const handle = ()=>{
    navigate("/all")
}
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!originalUrl.trim()) return;

    setLoading(true);
    setShortUrl("");

    try {
      const res = await fetch(backendBase, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: originalUrl }),
       credentials: "include"
      });

      if (!res.ok) throw new Error("Failed to shorten URL");

      const data = await res.json();
      // Assuming backend returns { shortId: "abc123" }
      setShortUrl(`http://localhost:8000/${data.shortId}`);
    } catch (err) {
      console.error(err);
      alert("Error creating short URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "500px", margin: "auto" }}>
       
      <h2>URL Shortener</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Enter original URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          required
        />
        <button
          type="submit"
          style={{ padding: "10px 20px" }}
          disabled={loading}
        >
          {loading ? "Shortening..." : "Shorten"}
        </button>
      </form>

      {shortUrl && (
        <p>
          Short URL:{" "}
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </p>
      )}

       <button onClick={handle}>go to all urls</button>
    </div>
  );
}
