async function fetch_rss(url) {
  const response = await fetch(url);
  const rss_feed = await response.text();
  const data = new window.DOMParser().parseFromString(rss_feed, "text/xml");
  const items = data.querySelectorAll("item");

  let html = "";
  for (const item of items) {
    html += `
    <a href="${item.querySelector("link").innerHTML}">
      <article>
        <h3>${item.querySelector("title").innerHTML}</h2>
        <p>${item.querySelector("description").innerHTML}</p>
      </article>
    </a>`;
  }
  return html
}

const tagesschau = document.querySelector(".tagesschau");
tagesschau.innerHTML = await fetch_rss("https://www.tagesschau.de/index~rss2.xml");

const tagesspiegel = document.querySelector(".tagesspiegel");
tagesspiegel.innerHTML = await fetch_rss("https://www.tagesspiegel.de/contentexport/feed/politik");