// URLパラメータからページ番号を取得します
const urlParams = new URLSearchParams(window.location.search);
let page = Number(urlParams.get('page')) || 1; // URLのパラメータからpageを取得し、なければデフォルトは1 (最新の記事)

let apiIndex = "https://2mmx7gzu7i.microcms.io/api/v1/blogs"; // APIのエンドポイント

// ブログデータを取得する関数
const getBlogData = () => {
  let offset = (page - 1) * 5; // 5記事ずつ表示するため、offsetは (ページ数 - 1) * 5
  // APIからデータを取得します
  fetch(`${apiIndex}?limit=5&offset=${offset}`, {
    headers: {
      "X-API-KEY": "PEfp0AHyALckYsrJavaQSj0l1KOg6LhIUOww" // APIキー
    }
  })
  .then(res => res.json())
  .then(json => {
    let totalArticles = json.totalCount; // 総記事数を取得
    for (let i = 0; i < 5; i++) {
      // 取得したデータを元に表示を更新します
      if (json.contents.length > i) {
        let latestId = json.contents[i].id;
        fetchSingleBlogData(latestId, i); // 各記事データを取得
      } else {
        document.getElementById(`article${i}`).style.display = "none"; // データがなければ該当の記事を非表示にします
      }
    }

    // 次のページへのリンクを更新します
    let nextPage = document.querySelector('.button.large.next');
    // 次のページに記事が存在する場合
    if (json.contents.length === 5 && page * 5 < totalArticles) {
      nextPage.href = `?page=${page + 1}`; // 次のページへのリンクを設定
      nextPage.style.display = ""; // 次のページボタンを表示
      nextPage.addEventListener('click', function(event) { // ページ再読み込みのイベントリスナーを追加
        event.preventDefault();
        window.location.href = `?page=${page + 1}`; // 次のページへ移動
      });
    } else {
      nextPage.style.display = "none"; // 次のページがなければボタンを非表示にします
    }

    // 前のページへのリンクを更新します（前のページが存在する場合のみ）
    if (page > 1 && page * 5 <= totalArticles) { // 前のページに記事が存在する場合
      let prevPage = document.querySelector('.button.large.previous');
      prevPage.href = `?page=${page - 1}`; // 前のページへのリンクを設定
      prevPage.style.display = ""; // 前のページボタンを表示
      prevPage.addEventListener('click', function(event) { // ページ再読み込みのイベントリスナーを追加
        event.preventDefault();
        window.location.href = `?page=${page - 1}`; // 前のページへ移動
      });
    } else {
      let prevPage = document.querySelector('.button.large.previous');
      prevPage.style.display = "none"; // 前のページがなければボタンを非表示にします
    }
  })
}

// 個々のブログデータを取得する関数
const fetchSingleBlogData = (latestId, index) => {
  let apiUrl = `${apiIndex}/${latestId}`; // 最新のIDを使ってAPIのURLを組み立てる
  // 個々の記事データをAPIから取得します
  fetch(apiUrl, {
    headers: {
      "X-API-KEY": "PEfp0AHyALckYsrJavaQSj0l1KOg6LhIUOww" // APIキー
    }
  })
  .then(res => res.json())
  .then(json => {
    // 取得したデータを使って表示を更新します
    document.getElementById(`date${index}`).innerHTML = moment(json.publishedAt).format('YYYY年MM月DD日'); // 日付を表示
    document.getElementById(`title${index}`).innerHTML = json.title; // タイトルを表示
    document.getElementById(`content${index}`).innerHTML = json.content; // コンテンツを表示
    document.getElementById(`eyecatch${index}`).src = json.eyecatch.url; // アイキャッチ画像を表示
  })
}

// APIから指定されたページのブログ記事を取得する関数を呼び出す
getBlogData(); // 上記で定義した関数を実行し、ブログデータを取得します