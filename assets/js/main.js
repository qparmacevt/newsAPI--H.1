
  document.addEventListener('DOMContentLoaded', function(){

    /*let URL = 'https://newsapi.org/v2/everything?q=trump&pageSize=5&apiKey=891d9b1cdc9842baaba242874522d9a5';
    let news = await fetch(URL);
    news     = await news.json();
    news     = news.articles;*/

   
    
    
    let search = document.querySelector('#search');
   search.addEventListener('click', async function search(){
    let str = document.querySelector('#searchInput').value.toLowerCase();
    URL = 'https://newsapi.org/v2/everything?q=' + str +'&pageSize=5&apiKey=891d9b1cdc9842baaba242874522d9a5';
    news = await fetch(URL);
    news = await news.json();
    news = news.articles;

   });


    let newsPlaceTag = document.querySelector('#news-list-place');
    let oneNewsPlaceTag = document.querySelector('#one-news-place');

    newsPlaceTag.innerHTML = news.map( (item, i) => `
        <div class='cell py-3'>
            <div class="card shadow h-100">
                <img src="${item.urlToImage}" class="card-img-top shadow" alt="...">
                <div class="card-body d-flex flex-column">
                    <h4 class="card-title">${item.title}</h4>
                    <p class='flex-grow-1 fs-6'>
                        ${item.description}
                    </p>
                    <button data-news-id='${i}'  class="btn btn-primary">Read More</button>
                </div>
            </div>
        </div>
    `).join('');

    let buttons = document.querySelectorAll('.cell button');

    for(let button of buttons){
        button.addEventListener('click', function(){
            let selectedNews = news[this.dataset.newsId];

            oneNewsPlaceTag.innerHTML = `
                <div class='py-3'>
                    <h1>${selectedNews.title}</h1>
                    <i>${selectedNews.publishedAt}</i>
                    <p>
                        <i>${selectedNews.description}</i>
                    </p>
                    <img class='img-thumbnail' src="${selectedNews.urlToImage}">
                    <p>${selectedNews.content}</p>
                    <a href="${selectedNews.url}" target="_blank" class="btn btn-primary">Read Original</a>
                </div>
            `;

            oneNewsPlaceTag.classList.remove('d-none');
            newsPlaceTag.classList.add('d-none');

        });
    }

    let backButton = document.querySelector('#back-button');

    backButton.addEventListener('click', function(){
        oneNewsPlaceTag.classList.add('d-none');
        newsPlaceTag.classList.remove('d-none');
    });

  }) ;