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

    // ページネーションの制御を行う部分
    // 次のページへのリンクを更新します
    let nextPage = document.querySelector('.button.large.next');
    // 次のページに記事が存在する場合（最終ページ前であることもチェック）
    if (json.contents.length === 5 && (page + 1) * 5 < totalArticles) {
      nextPage.href = `?page=${page + 1}`; // 次のページへのリンクを設定
      nextPage.style.display = ""; // 次のページボタンを表示
      nextPage.addEventListener('click', function(event) { // ページ再読み込みのイベントリスナー
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
      prevPage.addEventListener('click', function(event) { // ページ再読み込みのイベントリスナー
        event.preventDefault();
        window.location.href = `?page=${page - 1}`; // 前のページへ移動
      });
    } else {
      document.querySelector('.button.large.previous').style.display = "none"; // 前のページがなければボタンを非表示にします
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
    let imgElement = document.getElementById(`eyecatch${index}`);
    imgElement.src = json.eyecatch.url; // アイキャッチ画像を表示
    imgElement.setAttribute("loading", "lazy"); // 遅延読み込み属性を追加
    
    // 画像のサイズを指定
    imgElement.style.width = '1500px';  // 幅をpxに設定
    imgElement.style.height = '1000px'; // 高さをpxに設定

    // Add URL parameter to "Read more" button
    document.getElementById(`button${index}`).href = `page.html?id=${latestId}`;
    
    // 動的にCSSを追加して余白を削除
    const contentElement = document.getElementById(`content${index}`);
    contentElement.style.marginBottom = '0'; // 余白を削除
    contentElement.style.paddingBottom = '0'; // パディングも削除

    // コンテンツ内の末尾のスペース文字を削除
    contentElement.innerHTML = contentElement.innerHTML.trim();

    // 最後の段落の余白を削除
    const paragraphs = contentElement.getElementsByTagName('p');
    if (paragraphs.length > 0) {
      paragraphs[paragraphs.length - 1].style.marginBottom = '0';
    }
  });
}

// APIから指定されたページのブログ記事を取得します
getBlogData();
