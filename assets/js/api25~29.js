const getLatestIds = () => {
	let apiIndex = "https://2mmx7gzu7i.microcms.io/api/v1/blogs"; // APIのエンドポイント
	fetch(`${apiIndex}?limit=5&offset=25`, { // limitとoffsetパラメータを追加
	  headers: {
		"X-API-KEY": "PEfp0AHyALckYsrJavaQSj0l1KOg6LhIUOww" // APIキー
	  }
	})
	.then(res => res.json())
	.then(json => {
	  for (let i = 0; i < json.contents.length; i++) {
		let latestId = json.contents[i].id; // 最新のIDを取得して変数に格納
		getBlogData(latestId, i + 25); // 最新のIDが取得された後にデータを取得する関数を呼び出す
	  }
	})
  }
  
  const getBlogData = (latestId, index) => {
	if (!latestId) return; // latestIdが未設定の場合は何もしない
	let apiIndex = "https://2mmx7gzu7i.microcms.io/api/v1/blogs"; // APIのエンドポイント
	let apiUrl = `${apiIndex}/${latestId}`; // 最新のIDを使ってAPIのURLを組み立てる
	fetch(apiUrl, {
	  headers: {
		"X-API-KEY": "PEfp0AHyALckYsrJavaQSj0l1KOg6LhIUOww" // APIキー
	  }
	})
	.then(res => res.json())
	.then(json => {
	  // 取得したデータを使って必要な処理を行う
	  document.getElementById(`date${index}`).innerHTML = moment(json.publishedAt).format('YYYY年MM月DD日');
	  document.getElementById(`title${index}`).innerHTML = json.title;
	  document.getElementById(`content${index}`).innerHTML = json.content;
	  document.getElementById(`eyecatch${index}`).src = json.eyecatch.url ; // アイキャッチ画像を表示
	})
  }
  
  // APIから最新のブログ記事を取得する関数を呼び出す
  getLatestIds();
            
