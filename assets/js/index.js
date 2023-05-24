// URLパラメータからページ番号を取得します
const urlParams = new URLSearchParams(window.location.search);
let page = Number(urlParams.get('page')) || 1; // URLのパラメータからpageを取得し、なければデフォルトは1 (最新の記事)

let apiIndex = "https://2mmx7gzu7i.microcms.io/api/v1/blogs"; // APIのエンドポイント

// 画像の遅延読み込みのためのIntersection Observerを作成します
const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const lazyImage = entry.target;
      lazyImage.src = lazyImage.dataset.src;
      observer.unobserve(lazyImage);
    }
  });
});

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

    // ここで遅延読み込み対象の画像に対して、Intersection Observerを適用します
    document.querySelectorAll('[data-src]').forEach(img => {
      lazyLoadObserver.observe(img);
    });

    // 次のページへのリンクと前のページへのリンクの更新は以前と同じです...
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
    let eyecatchElement = document.getElementById(`eyecatch${index}`);
    eyecatchElement.dataset.src = json.eyecatch.url; // アイキャッチ画像のURLをdata-src属性に設定
  })
}

// APIから指定されたページのブログ記事を取得する関数を呼び出す
getBlogData(); // 上記で定義した関数を実行し、ブログデータを取得します