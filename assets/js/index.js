const urlParams = new URLSearchParams(window.location.search);
let page = Number(urlParams.get('page')) || 1; 

let apiIndex = "https://2mmx7gzu7i.microcms.io/api/v1/blogs"; 

const getBlogData = () => {
  let offset = (page - 1) * 5; 
  fetch(`${apiIndex}?limit=5&offset=${offset}`, {
    headers: {
      "X-API-KEY": "PEfp0AHyALckYsrJavaQSj0l1KOg6LhIUOww" 
    }
  })
  .then(res => res.json())
  .then(json => {
    let totalArticles = json.totalCount; 

    for (let i = 0; i < 5; i++) {
      if (json.contents.length > i) {
        let latestId = json.contents[i].id;
        fetchSingleBlogData(latestId, i); 
      } else {
        document.getElementById(`article${i}`).style.display = "none"; 
      }
    }

    let nextPage = document.querySelector('.button.large.next');
    if (json.contents.length === 5 && (page + 1) * 5 < totalArticles) {
      nextPage.href = `?page=${page + 1}`; 
      nextPage.style.display = "";
      nextPage.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = `?page=${page + 1}`; 
      });
    } else {
      nextPage.style.display = "none"; 
    }

    if (page > 1 && page * 5 <= totalArticles) {
      let prevPage = document.querySelector('.button.large.previous');
      prevPage.href = `?page=${page - 1}`;
      prevPage.style.display = ""; 
      prevPage.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = `?page=${page - 1}`;
      });
    } else {
      let prevPage = document.querySelector('.button.large.previous');
      prevPage.style.display = "none";
    }
  })
}

const fetchSingleBlogData = (latestId, index) => {
  let apiUrl = `${apiIndex}/${latestId}`; 
  fetch(apiUrl, {
    headers: {
      "X-API-KEY": "PEfp0AHyALckYsrJavaQSj0l1KOg6LhIUOww"
    }
  })
  .then(res => res.json())
  .then(json => {
    document.getElementById(`date${index}`).innerHTML = moment(json.publishedAt).format('YYYY年MM月DD日');
    document.getElementById(`title${index}`).innerHTML = json.title;
    document.getElementById(`content${index}`).innerHTML = json.content;
    document.getElementById(`eyecatch${index}`).src = json.eyecatch.url;
  })
}

document.addEventListener('DOMContentLoaded', function() {
  getBlogData(); 
});