const urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get('id'); // URLパラメータからIDを取得

let apiIndex = "https://2mmx7gzu7i.microcms.io/api/v1/blogs"; // APIのエンドポイント
let apiUrl = `${apiIndex}/${id}`; // URLパラメータのIDを使ってAPIのURLを組み立てる

fetch(apiUrl, {
  headers: {
    "X-API-KEY": "PEfp0AHyALckYsrJavaQSj0l1KOg6LhIUOww" // APIキー
  }
})
.then(res => res.json())
.then(json => {
  // 取得したデータを使って必要な処理を行う
  document.getElementById('date0').innerHTML = moment(json.publishedAt).format('YYYY年MM月DD日');
  document.getElementById('title0').innerHTML = json.title;
  document.getElementById('content0').innerHTML = json.content;
  document.getElementById('eyecatch0').src = json.eyecatch.url; // アイキャッチ画像を表示
})
.catch(err => {
    console.error('APIリクエストでエラーが発生しました：', err);
  });

