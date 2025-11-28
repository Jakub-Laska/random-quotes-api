import quotes from '../quotes.json' with { type: 'json' };

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')

  let availableQuotes = quotes;

  if (availableQuotes.length > 0) {
    const randomQuote = availableQuotes[Math.floor(Math.random() * availableQuotes.length)];
    return res.status(200).json({
      quote: randomQuote.text,
      author: randomQuote.author,
      source: "local"
    });
  }

  try {
    const resp = await fetch('https://zenquotes.io/api/random');
    const [data] = await resp.json();

    return res.status(200).json({
      quote: data.q,
      author: data.a,
      source: 'zenquotes'
    });
  } catch (error) {
    return res.status(200).json({
      quote: "Where the spirit does not work with the hand, there is no art.",
      author: "Leonardo da Vinci",
      source: "fallback"
    });
  }
}
