// アクションが行われたかどうかを追跡するフラグを追加
let actionTaken = false;

window.onload = function() {
  let commentoDiv = document.getElementById('commento');
  commentoDiv.innerHTML = '';

  let script = document.createElement('script');
  script.src = 'https://cdn.commento.io/js/commento.js';
  script.defer = true;
  // script.dataset.pageId = id;
  commentoDiv.appendChild(script);

  // URLパラメータからページIDを取得する
  const urlParams = new URLSearchParams(window.location.search);
  const pageId = urlParams.get('id');  // 'id'はURLパラメータの名前です。適切なものに変更してください。

  // APIからページデータを取得する
  fetch('https://your-api-endpoint.com/page/' + pageId)
    .then(response => response.json())
    .then(data => {
      // 取得したデータをページに反映する
      document.getElementById('title0').innerText = data.title;
      document.getElementById('content0').innerText = data.content;
      document.getElementById('eyecatch0').src = data.image;
      document.getElementById('date0').innerText = moment(data.date).format('LL');  // moment.jsを使って日付を整形
    })
    .catch(error => {
      // エラーハンドリング
      console.error('Error:', error);
    });

  // コメントが投稿されたときにアクションフラグを更新するイベントリスナーを追加（例として）
  commentoDiv.addEventListener('commentPosted', function() {
    actionTaken = true;
    updateBackButton();
  });

  // ログインが行われたときにアクションフラグを更新するイベントリスナーを追加（例として）
  // document.getElementById('login-button').addEventListener('click', function() {
  //  actionTaken = true;
  //  updateBackButton();
  // });
}

function updateBackButton() {
  // アクションが行われている場合は「一覧に戻る」ボタンの挙動を更新
  if (actionTaken) {
    document.getElementById('back-button').removeEventListener('click', goBack);
    document.getElementById('back-button').addEventListener('click', function() {
      window.location.href = "/blog-list-page-url";  // ここにブログ一覧ページのURLを指定
    });
  }
}

function goBack() {
  window.history.back();
}

document.getElementById('back-button').addEventListener('click', goBack);
