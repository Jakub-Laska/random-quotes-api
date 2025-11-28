export default async function handler(req, res) {
  try {
    const response = await fetch('https://zenquotes.io/api/random');
    const data = await response.json();

    res.status(200).json({
      quote: data.content,
      author: data.author,
      source: "quotable.io"
    });
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch the quote" });
  }
}