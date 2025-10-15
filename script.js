const fantasyButton = document.querySelector('#fantasyButton');
const fearButton = document.querySelector('#fearButton');
const actionButton = document.querySelector('#actionButton');
const entriesContainer = document.querySelector('#entries');
const entryTemplate = document.querySelector('#entryTemplate');
const dialogTemplate = document.querySelector('#dialogTemplate');

const formatter = new Intl.DateTimeFormat('zh-TW', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

function createDetailFragment(details) {
  const fragment = document.createDocumentFragment();
  details.forEach(([term, description]) => {
    if (!description) return;
    const dt = document.createElement('dt');
    dt.textContent = term;
    const dd = document.createElement('dd');
    dd.textContent = description.trim();
    fragment.append(dt, dd);
  });
  return fragment;
}

function addEntry(title, details) {
  const node = entryTemplate.content.firstElementChild.cloneNode(true);
  node.querySelector('.entry__title').textContent = title;
  node.querySelector('.entry__details').append(createDetailFragment(details));
  node.querySelector('.entry__time').textContent = `記錄於 ${formatter.format(new Date())}`;

  entriesContainer.prepend(node);
}

function showDialog({ title, fields, primaryLabel = '儲存', onSubmit }) {
  const dialogNode = dialogTemplate.content.firstElementChild.cloneNode(true);
  const form = dialogNode.querySelector('form');
  dialogNode.querySelector('.dialog__title').textContent = title;
  dialogNode.querySelector('.dialog__submit').textContent = primaryLabel;

  const content = dialogNode.querySelector('.dialog__content');

  fields.forEach((field, index) => {
    const wrapper = document.createElement('label');
    wrapper.setAttribute('for', field.id);
    wrapper.textContent = field.label;

    let input;
    if (field.type === 'textarea') {
      input = document.createElement('textarea');
      input.rows = field.rows ?? 3;
    } else {
      input = document.createElement('input');
      input.type = field.type ?? 'text';
    }
    input.id = field.id;
    input.name = field.id;
    input.placeholder = field.placeholder ?? '';
    input.required = field.required ?? true;
    if (field.autofocus || index === 0) {
      requestAnimationFrame(() => input.focus());
    }

    wrapper.append(input);
    content.append(wrapper);
  });

  function closeDialog() {
    dialogNode.remove();
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());
    onSubmit?.(values, closeDialog);
  });

  dialogNode
    .querySelector('.dialog__cancel')
    .addEventListener('click', () => {
      closeDialog();
    });

  document.addEventListener(
    'keydown',
    (event) => {
      if (event.key === 'Escape') {
        closeDialog();
      }
    },
    { once: true }
  );

  document.body.append(dialogNode);
}

fantasyButton.addEventListener('click', () => {
  showDialog({
    title: '記錄幻想',
    primaryLabel: '下一步',
    fields: [
      {
        id: 'idea',
        label: '剛剛閃過的幻想或點子是什麼？',
        type: 'textarea',
        rows: 4,
        placeholder: '寫下讓你感到興奮的畫面、故事或靈感…',
      },
    ],
    onSubmit(values, close) {
      close();
      showDialog({
        title: '將幻想連結到行動',
        fields: [
          {
            id: 'microStep',
            label: '讓它更靠近現實的「第一個」最小步驟是什麼？',
            type: 'textarea',
            rows: 3,
            placeholder: '例如：寫一封詢問的訊息、查一個資訊、畫第一張草圖…',
          },
        ],
        onSubmit(stepValues, closeSecond) {
          closeSecond();
          addEntry('幻想 → 行動', [
            ['幻想', values.idea],
            ['第一個最小步驟', stepValues.microStep],
          ]);
        },
      });
    },
  });
});

fearButton.addEventListener('click', () => {
  showDialog({
    title: '記錄恐懼',
    fields: [
      {
        id: 'fear',
        label: '描述這個恐懼。',
        type: 'textarea',
        rows: 3,
        placeholder: '寫下讓你擔心或焦慮的情境…',
      },
      {
        id: 'likelihood',
        label: '它有多大可能成真？',
        placeholder: '例如：30%，或「在目前的情況下並不常發生」…',
      },
      {
        id: 'worst',
        label: '如果成真，最壞的狀況會是？',
        type: 'textarea',
        rows: 3,
        placeholder: '誠實地面對最極端的結果…',
      },
      {
        id: 'mitigation',
        label: '你可以做什麼來降低 1% 的風險？',
        type: 'textarea',
        rows: 3,
        placeholder: '列出一個能微幅改善情況的小行動。',
      },
    ],
    onSubmit(values, close) {
      close();
      addEntry('恐懼 → 行動', [
        ['恐懼內容', values.fear],
        ['發生的可能性', values.likelihood],
        ['最壞狀況', values.worst],
        ['降低 1% 風險的做法', values.mitigation],
      ]);
    },
  });
});

actionButton.addEventListener('click', () => {
  showDialog({
    title: '設定行動',
    fields: [
      {
        id: 'action',
        label: '你想採取的行動是？',
        type: 'textarea',
        rows: 3,
        placeholder: '描述你想在近期完成的具體行動。',
      },
      {
        id: 'support',
        label: '需要準備或尋求的資源？',
        type: 'textarea',
        rows: 3,
        required: false,
        placeholder: '列出能讓行動更順利的小道具、資訊或夥伴。',
      },
      {
        id: 'checkpoint',
        label: '下一個檢查時間或里程碑？',
        placeholder: '例如：週五前、明天上午、完成草稿…',
        required: false,
      },
    ],
    onSubmit(values, close) {
      close();
      addEntry('行動設定', [
        ['行動', values.action],
        ['支持資源', values.support],
        ['檢查點', values.checkpoint],
      ]);
    },
  });
});
