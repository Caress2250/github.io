// URLのクエリストリング（パラメータ）から「page」の値を取得します。これは現在のページ番号を示します。
// 'page'パラメータが存在しない場合はデフォルトの1を使用します。
const urlParams = new URLSearchParams(window.location.search);
let page = Number(urlParams.get('page')) || 1;

// microCMSのAPIエンドポイントを定義します。
let apiIndex = "https://2mmx7gzu7i.microcms.io/api/v1/blogs";

// 指定したページのブログデータを取得する関数です。
const getBlogData = () => {
  // ページネーションのためのオフセットを計算します。各ページに5つの記事を表示します。
  let offset = (page - 1) * 5;

  // ブログデータをAPIから取得します。
  fetch(`${apiIndex}?limit=5&offset=${offset}`, {
    headers: {
      // microCMSのAPIキーをヘッダーに含めます。
      "X-API-KEY": "PEfp0AHyALckYsrJavaQSj0l1KOg6LhIUOww"
    }
  })
  .then(res => res.json())
  .then(json => {
    // 全記事数を取得します。
    let totalArticles = json.totalCount;

    // 最大5つの記事データを処理します。
    for (let i = 0; i < 5; i++) {
      if (json.contents.length > i) {
        // 記事データが存在する場合は、その詳細を取得します。
        let latestId = json.contents[i].id;
        fetchSingleBlogData(latestId, i);
      } else {
        // 記事データが存在しない場合（5つ未満）は、該当のHTML要素を非表示にします。
        if (document.getElementById(`article${i}`)) {
          document.getElementById(`article${i}`).style.display = "none";
        }
      }
    }

    // 次のページリンクを更新します。次のページが存在する場合のみ表示します。
    let nextPage = document.querySelector('.button.large.next');
    if ((page * 5) < totalArticles && json.contents.length == 5) {
      nextPage.href = `?page=${page + 1}`;
      nextPage.style.display = "";
      nextPage.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = `?page=${page + 1}`;
      });
    } else {
      nextPage.style.display = "none";
    }

    // 前のページリンクを更新します。前のページが存在する場合のみ表示します。
    if (page > 1) {
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

// 指定したIDのブログ記事の詳細を取得する関数です。
const fetchSingleBlogData = (latestId, index) => {
    console.log(`fetchSingleBlogData - latestId: ${latestId}, index: ${index}`);  // デバッグ用
  
    // 指定した記事のAPI URLを作成します。
    let apiUrl = `${apiIndex}/${latestId}`;
  
    // 記事詳細をAPIから取得します。
    fetch(apiUrl, {
      headers: {
        "X-API-KEY": "PEfp0AHyALckYsrJavaQSj0l1KOg6LhIUOww"
      }
    })
    .then(res => res.json())
    .then(json => {
      // 取得したデータを使って必要な処理を行う
      document.getElementById(`date${index}`).innerHTML = moment(json.publishedAt).format('YYYY年MM月DD日');
      document.getElementById(`title${index}`).innerHTML = json.title;
      document.getElementById(`content${index}`).innerHTML = json.content;
      if(json.eyecatch) {
        document.getElementById(`eyecatch${index}`).src = json.eyecatch.url;
    } else {
        console.log(`No eyecatch for article with index: ${index}`);
    }
  
      // "Read more"リンクの更新
      let readMoreButton = document.querySelector(`#button${index}`);
readMoreButton.href = `page.html?id=${json.id}`; // ここでIDをURLパラメータとして渡す
  
      console.log(`fetchSingleBlogData - Updated readMoreButton href: ${readMoreButton.href}`); // デバッグ用
    })
  }

// 最初にブログ記事を取得します。
getBlogData();

