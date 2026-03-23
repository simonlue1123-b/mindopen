# Local batch translation tool

這個資料夾提供一個本地端可跑的版本，避免把整個流程綁死在 Colab。

## 資料夾在哪裡？

在目前這個 repo 裡，完整路徑是：

```bash
/workspace/mindopen/local_batch_tool
```

你可以直接執行：

```bash
cd /workspace/mindopen/local_batch_tool
```

如果你是把整個 repo clone 到自己的電腦，則這個資料夾會在：

```bash
<你的專案根目錄>/local_batch_tool
```

## 你要怎麼「貼進資料夾」？

你不用自己一段段貼。這個資料夾已經是可直接放進專案的版本；你只要：

1. 進到 `local_batch_tool/`
2. 複製 `.env.example` 成 `.env`
3. 填入 Gemini API key 與 Google service account JSON 路徑
4. 安裝套件
5. 執行 `python run_local.py`

## 建議目錄

```text
local_batch_tool/
  .env
  credentials/
    service-account.json
  output/
  requirements.txt
  run_local.py
```

## 安裝

```bash
cd /workspace/mindopen/local_batch_tool
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

## Google Sheets 設定

1. 建立 Google Cloud service account。
2. 下載 JSON 憑證。
3. 把 service account 的 email 加到你的 Google Sheet 共用名單。
4. 在 `.env` 填入 `GOOGLE_SERVICE_ACCOUNT_JSON`。

## 執行

```bash
cd /workspace/mindopen/local_batch_tool
python run_local.py
```

## 這個版本跟原本 Colab 版的主要差異

- 改成可在本地端執行。
- 先用 Python 清理 HTML，不把整坨髒 DOM 直接丟給模型。
- 以 section 真正切塊，不再依賴 `soup.children`。
- shortcode 轉換改成本地規則處理，不再讓 LLM 做大規模 HTML 結構重寫。
- 會產生 `run_summary.json` 方便續查成功/失敗結果。
