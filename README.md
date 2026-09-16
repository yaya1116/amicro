# Yaya Motion

給設計師與開發者的繁體中文互動元件庫，以鈷藍、黑白、幾何網格與浮動卡片呈現。網站介面與中文內容重新設計，品牌名稱目前使用 Yaya Motion。

## 功能

- 392 個元件：按鈕、卡片、表單、選擇控制、提示回饋、文字動態、載入動效、圖表及互動實驗。
- 動效預覽、中文與英文搜尋、分類、排序，以及儲存在目前瀏覽器的個人收藏。
- 元件原始碼、使用範例及本機相依檔案可查看與複製，附帶 MIT 授權聲明。
- 響應式版面、深淺色模式、手機導覽及使用指南。
- 預留 Portaly 商品頁付款入口；未設定連結時不開放購買。

## 本機啟動

建議使用 Node.js 22 LTS 或更新的相容版本。

```bash
npm ci
npm run dev
```

開啟終端顯示的 `http://localhost:3000`。此專案使用 React 與 Vite，請透過開發伺服器預覽，不要直接開啟 `index.html` 檔案。

## 驗證與部署

```bash
npm run lint
npm run build
npm test
```

`lint` 執行 TypeScript 檢查；測試檢查 Portaly 網址及所有元件的中文名稱、程式碼與授權檔。開發與建置前會自動產生元件目錄及程式碼資源，無須提交 `public/component-source/`。

部署至 Vercel 時使用 Vite 預設：建置指令 `npm run build`、輸出目錄 `dist`。專案內的 `vercel.json` 已包含單頁應用路由設定。其他靜態主機也須將應用路徑導向 `index.html`。網站目前假設部署在網域根目錄。

## Portaly 設定

複製 `.env.example` 為 `.env.local`，填入正式商品資料：

```dotenv
VITE_PORTALY_PRODUCT_URL=https://portaly.cc/你的商品路徑
VITE_PRODUCT_NAME=你的商品名稱
VITE_PRODUCT_PRICE=你的售價文字
```

上方網址僅示意，需換成實際 Portaly 商品網址。修改後重新啟動或建置。只有合法的 Portaly HTTPS 網址會開啟購買按鈕；訪客會前往 Portaly 完成結帳。尚未設定時顯示「尚未開放購買」。

目前尚未串接 Payment API、付款回呼、會員權限或自動解鎖下載。商品內容、售價與正式連結待提供後完成設定。`VITE_` 開頭的變數會公開於前端，請勿放入金鑰。

若需要 sitemap，先在執行環境設定正式 HTTPS 網址 `SITE_URL`，再執行 `npm run sitemap` 並重新建置。

## 專案結構

- `src/App.tsx`：網站導覽、搜尋、收藏與頁面切換。
- `src/components/studio/`：首頁視覺、預覽、元件詳情、方案與指南。
- `src/config/site.ts`：品牌與商品設定。
- `src/data/zh-TW.json`：元件中文名稱。
- `src/data/uiverse.json`：經安全篩選與中文化的 Uiverse 精選元件。
- `scripts/build-catalog.mjs`：產生可搜尋的元件目錄。
- `scripts/build-source.mjs`：產生使用範例與可複製的原始碼檔案。
- `scripts/import-uiverse.mjs`：從官方 Galaxy 專案重新建立精選清單。

## 開源授權

部分互動元件基於 [Amicro](https://github.com/Subhan-code/Amicro--Micro-transitions-) 與 [Uiverse Galaxy](https://github.com/uiverse-io/galaxy)，兩者皆採 MIT 授權。Yaya Motion 提供精選、繁體中文整理、React 整合、安裝指南與範例組合；原始著作權和授權條款會附在程式碼中。完整來源見 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。

本專案維護於 [yaya1116/amicro](https://github.com/yaya1116/amicro)。
