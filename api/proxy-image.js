export default async function handler(req, res) {
    console.log(req.query,"gekki")
  const { url } = req.query;


  if (!url) {
    return res.status(400).json({ error: "Image URL is required" });
  }

  try {
    const response = await fetch(url, {
      headers: {
        Referer: "https://www.1688.com/", // Needed for Alibaba/1688 images
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115 Safari/537.36",
      },
    });

    if (!response.ok) {
      return res.status(response.status).send("Failed to fetch image");
    }

    const contentType = response.headers.get("content-type");
    const buffer = await response.arrayBuffer();

    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "public, max-age=86400"); // Cache for 1 day
    res.status(200).send(Buffer.from(buffer));
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
