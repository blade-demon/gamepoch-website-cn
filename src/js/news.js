import "lazysizes";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "font-awesome/css/font-awesome.min.css";
import "../css/style.css";

$(function() {
  // 获取新闻ID
  var params = getJsonFromUrl();
  var newsId = params.id;
  if (newsId !== undefined) {
    getNewsById(newsId);
  }
});

// 向服务器获取单条新闻
const getNewsById = id => {
  $.get(
    `https://newseditor.gamepoch.com/thinkcmf/data_news.php?post_net=gamepoch.cn&id=${id}`
  ).then(
    newsData => {
      const news = newsData[0];
      document.title = news.post_title;
      console.log(news);
      $(".news-container__header").html(`
        <h3>${news.post_excerpt}</h3>
        <p>${news.post_modified}</p>
        <p>${news.post_source}</p>`);

      $(".news-container__body").html(`
          ${news.post_content
            .replace(
              /<img src=/g,
              '<img class="lazyload" src="https://via.placeholder.com/350x150" data-src='
            )
            .replace(
              /http\:\/\/139.196.239.213/g,
              "https://newseditor.gamepoch.com"
            )}
      `);
      newsImageLazyLoad.update();
    },
    error => {
      console.error(error);
      window.location.href = "404.html";
    }
  );
};

const getJsonFromUrl = () => {
  var query = location.search.substr(1);
  var result = {};
  query.split("&").forEach(function(part) {
    var item = part.split("=");
    result[item[0]] = decodeURIComponent(item[1]);
  });
  return result;
};
