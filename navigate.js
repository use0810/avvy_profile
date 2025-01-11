function navigate(direction) {
  // 現在のURLを解析して現在のページ番号を取得
  const currentPage = window.location.pathname.match(/page(\d+)\.html$/) || ["", "1"]; // index.html は page1 として扱う
  let pageNumber = parseInt(currentPage[1], 10);

  // ページ番号を変更
  if (direction === "next") {
    pageNumber++;
  } else if (direction === "prev") {
    pageNumber--;
  }

  // ページ番号が1未満の場合、index.htmlに戻す
  if (pageNumber === 1) {
    window.location.href = "index.html";
    return;
  }

  // ページ番号が有効であれば移動
  const nextPage = `page${pageNumber}.html`;

  // 存在しないページの場合にindex.htmlに移動（オプション）
  fetch(nextPage, { method: 'HEAD' })
    .then((response) => {
      if (response.ok) {
        window.location.href = nextPage;
      } else {
        window.location.href = "index.html";
      }
    })
    .catch(() => {
      window.location.href = "index.html";
    });
}