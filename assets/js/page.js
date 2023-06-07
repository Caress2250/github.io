// URLパラメータからIDを取得
const urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get('id'); 

// APIのエンドポイント
let apiIndex = "https://2mmx7gzu7i.microcms.io/api/v1/blogs"; 
// URLパラメータのIDを使ってAPIのURLを組み立てる
let apiUrl = `${apiIndex}/${id}`; 

// APIリクエストを送信
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

// コメント機能を実装する
window.onload = function() {
  // コメント領域を初期化します
  let commentoDiv = document.getElementById('commento');
  commentoDiv.innerHTML = '';

  // Commentoのスクリプトタグを作成します
  let script = document.createElement('script');
  script.src = 'https://cdn.commento.io/js/commento.js';
  script.defer = true;

  // 記事ごとに一意の識別子を持つようにdata-page-idを設定します
  script.dataset.pageId = id;  // idはURLパラメータから取得しています

  // Commentoのスクリプトタグをコメント領域に追加します
  commentoDiv.appendChild(script);

  // 戻るボタンにイベントリスナーを追加します
  document.getElementById('back-button').addEventListener('click', function() {
    window.history.back();
  });
}
