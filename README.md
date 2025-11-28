# Random Quote API
serverless API that returns one of 155+ hand-picked English quotes.
Perfect for projects, widgets, examples, and demos.

**Live:** https://random-quotes-api-five.vercel.app/

### What it does
- First tries local `quotes.json` (fast + reliable)
- Fallback → [ZenQuotes](https://zenquotes.io)
- Final fallback → hardcoded quote  
- Always returns 200 + valid JSON, never crashes

### Features
- Edge caching (`s-maxage=3600, stale-while-revalidate`)
- CORS enabled
- Deployed on Vercel, zero config

### Tech
Next.js API route + Vercel Edge Middleware

### Why
Needed something small, bulletproof and fast for my portfolio.

### Response Example
source indicates where the quote was retrieved from:
"local", "zenquotes", or "fallback".
```json
{
    "quote": "Do what you can, with what you have, where you are.",
    "author": "Theodore Roosevelt",
    "source": "local"
}
```

### Example Use
Use the following JavaScript snippet to fetch a random quote from the API and display it on your page. The `?t=${Date.now()}` query parameter is used to bypass browser caching:

```js
document.getElementById('btn')..addEventListener('click', async () => {
  const res = await fetch(`https://random-quotes-api-five.vercel.app/api/quote?t=${Date.now()}`);
  const data = await res.json();

  document.getElementById('quote').textContent = `"${data.quote}"`;
  document.getElementById('author').textContent = `— ${data.author}`;
});
```

Make sure your HTML contains:

```html
<button id="btn">Get Quote</button>
<p id="quote"></p>
<p id="author"></p>
```
---
<!--
_______/\\\\\\\_______/\\\_____________        
 ______\/////\\\______\/\\\_____________       
  __________\/\\\______\/\\\_____________      
   __________\/\\\______\/\\\_____________     
    __________\/\\\______\/\\\_____________    
     __________\/\\\______\/\\\_____________   
      ___/\\\___\/\\\______\/\\\_____________  
       __\//\\\\\\\\\_______\/\\\\\\\\\\\\\___ 
        ___\/////////________\/////////////____ 
-->

