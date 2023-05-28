<!DOCTYPE HTML>
<!-- HTML5のドキュメント宣言。-->
<html>
    <head>
        <!-- このページのタイトルを設定します。 -->
        <title></title>
        <!-- 文字のエンコーディングをUTF-8に設定します。 -->
        <meta charset="utf-8" />
        <!-- レスポンシブデザインに必要な設定。デバイスの幅に合わせて表示を調整します。 -->
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        <!-- 外部CSSファイルへのリンク。サイトのデザインに影響します。 -->
        <link rel="stylesheet" href="assets/css/main.css" />
        <style>
            .button-container {
                margin-top: 20px;
            }
        </style>
    </head>
    <body class="single is-preload">
        <div id="wrapper">
            <header id="header">
                <!-- ブログのタイトルとホームへのリンク -->
                <h1><a href="index.html">CuCuBlog</a></h1>
                <!-- ナビゲーションリンク（現在はコメントアウトされています）-->
                <nav class="links">
                    <ul>
                        <!-- <li><a href="#">Lorem</a></li> 
                        <li><a href="#">Ipsum</a></li>
                        <li><a href="#">Feugiat</a></li>
                        <li><a href="#">Tempus</a></li>
                        <li><a href="#">Adipiscing</a></li>-->
                    </ul>
                </nav>
                <!-- 主要なナビゲーション（検索とメニュー） -->
                <nav class="main">
                    <ul>
                        <!-- 検索フォーム -->
                        <!-- <li class="search">
                            <a class="fa-search" href="#search">Search</a>
                            <form id="search" method="get" action="#">
                                <input type="text" name="query" placeholder="Search" />
                            </form> -->
                        <!-- </li> 
                        <-- メニューボタン（現在はコメントアウトされています）
                        <li class="menu">
                            <a class="fa-bars" href="#menu">Menu</a>
                        </li> -->
                    </ul>
                </nav>
            </header>
            <!-- メニューセクション -->
            <section id="menu">
                <!-- 検索フォーム
                    <section>
                        <form class="search" method="get" action="#">
                            <input type="text" name="query" placeholder="Search" />
                        </form>
                    </section> -->
                <!-- リンクセクション（現在はコメントアウトされています）-->
                    <!-- <section> 
                        <ul class="links">
                            <li>
                                <a href="#">
                                    <h3>Lorem ipsum</h3>
                                    <p>Feugiat tempus veroeros dolor</p>
                                </a>
                            </li>
                             メニューの各項目（現在はコメントアウトされています）
                            <li>
                                <a href="#">
                                    <h3>Dolor sit amet</h3>
                                    <p>Sed vitae justo condimentum</p>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <h3>Feugiat veroeros</h3>
                                    <p>Phasellus sed ultricies mi congue</p>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <h3>Etiam sed consequat</h3>
                                    <p>Porta lectus amet ultricies</p>
                                </a>
                            </li>
                        </ul>
                    </section>-->
                <!-- ユーザーアクション（ログインボタン）-->
                    <section>
                        <ul class="actions stacked">
                            <li><a href="#" class="button large fit">Log In</a></li>
                        </ul>
                    </section>
            </section>
            <!-- 主要コンテンツエリア -->
            <div id="main">
                <!-- 記事エリア -->
                    <article class="post">
                        <header>
                            <!-- 記事のタイトルとメタ情報（日付など） -->
                            <div class="title">
                                <h2 id="title0">
                                    <a href="#"></a></h2>
                                <p></p>
                            </div>
                            <div class="meta">
                                <time id ="date0"></time>
                </a>
                            </div>
                        </header>
                        <!-- メイン画像 -->
                        <span class="image featured">
                    <img id="eyecatch0">
                        </span>
                <!-- 記事の本文 -->
                <p id="content0">
                             </p>
                            

                             <div class="button-container">
                                <button class="button large" id="back-button">記事に戻る</button>
                                

                              </div>

                              
                            <!-- 記事のフッター（カテゴリ、お気に入り、コメント） -->
                            <footer>
                                <!-- <ul class="stats">  -->
                                    <!-- <li><a href="#">スピリチュアル</a></li> -->
                                    <!-- <li><a href="#" class="icon solid fa-heart"></a></li> -->
                                    <!-- <li><a href="#" class="icon solid fa-comment"></a></li> -->
                                    
                                    
                                    <!-- コメント機能 -->
                                    
                                    <!-- <script defer src="https://cdn..io/js/commento.js"></scommentocript> -->
                                        <br>
                                        <br>
                                        <div id="commento"></div>



                                <!-- </ul> -->
                            </footer>
                        </article>
                </div>
            <!-- サイトのフッター -->
                <section id="footer">
                    <!-- SNSリンク（現在はコメントアウトされています） -->
                    <!-- <ul class="icons"> 
                        <li><a href="#" class="icon brands fa-twitter"><span class="label">Twitter</span></a></li>
                        <li><a href="#" class="icon brands fa-facebook-f"><span class="label">Facebook</span></a></li>
                        <li><a href="#" class="icon brands fa-instagram"><span class="label">Instagram</span></a></li>
                        <li><a href="#" class="icon solid fa-rss"><span class="label">RSS</span></a></li>
                        <li><a href="#" class="icon solid fa-envelope"><span class="label">Email</span></a></li>
                        </ul>-->
                    <!-- 著作権とデザインクレジット -->
                    <p class="copyright">&copy; Untitled. Design: <a href="http://html5up.net">HTML5 UP</a>.
                        Images: <a href="http://unsplash.com">Unsplash</a>.</p>
                </section>
        </div>
    <!-- サイトのJavaScript -->
        <!-- jQueryライブラリ。多くのプラグインやカスタムスクリプトで使われています。 -->
        <script src="assets/js/jquery.min.js"></script>
        <!-- ブラウザのバージョンを判定するスクリプト -->
        <script src="assets/js/browser.min.js"></script>
        <!-- レスポンシブデザインをサポートするためのブレイクポイントスクリプト -->
        <script src="assets/js/breakpoints.min.js"></script>
        <!-- サイトのメインスクリプト -->
        <script src="assets/js/util.js"></script>
        <!-- ページごとのカスタムスクリプト -->
        <script src="assets/js/main.js"></script>
        <!-- このページ専用のスクリプト -->
        <script src="assets/js/page.js"></script>
        <!-- 日付や時間を操作するためのライブラリ -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>
    </body>
</html>
