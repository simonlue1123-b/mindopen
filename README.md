# mindopen

app開發

## Local batch translation scaffold

已新增 `local_batch_tool/`，提供可在本地端執行的批次翻譯與 docx 輸出範本。

### 資料夾在哪裡？

如果你現在是在這個 repo 裡，完整路徑就是：

```bash
/workspace/mindopen/local_batch_tool
```

你可以先用這個指令進去：

```bash
cd /workspace/mindopen/local_batch_tool
```

如果你是在自己的電腦下載這個 repo，則位置會是：

```bash
<你的專案資料夾>/mindopen/local_batch_tool
```

快速開始：

```bash
cd /workspace/mindopen/local_batch_tool
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python run_local.py
```

詳細說明請看 `local_batch_tool/README.md`。
