(function () {
  const presentations = ['胸痛冒冷汗','呼吸困難','發燒意識混亂','腹痛嘔吐','少尿水腫','突然單側無力','頭痛抽搐','疲倦蒼白','關節紅腫熱痛','孕期頭痛高血壓','心悸失眠','黃疸茶色尿','咳嗽咳痰','體重下降夜汗','自殺意念'];
  const contexts = ['急診','門診','住院病房','加護病房','夜間急診','術後','老人照護','孕婦門診','兒科急診','社區感染','慢性病追蹤','健康檢查','用藥後','免疫低下','運動後'];
  const redFlags = ['低血壓','低血氧','高燒','意識改變','劇烈疼痛','少尿','持續出血','休克指標','神經學缺損','嚴重電解質異常'];

  function pick(xs, i) { return xs[i % xs.length]; }
  function chDisease(ch, i) {
    const rows = diseases.filter(d => d.chapter === ch.id);
    return rows[i % rows.length] || { name: pick(ch.diseases || [ch.system], i), mechanism: ch.causality.join(' → '), symptoms: pick(presentations, i), tests: '生命徵象、基礎檢驗、影像或功能測試', treatment: '先穩定生命徵象，再針對病因治療', exam: ch.exam.join('；') };
  }
  function chDrug(ch, i) {
    const rows = drugs.filter(d => d.chapter === ch.id);
    return rows[i % rows.length] || { name: pick(ch.drugs || ['依機制選藥'], i), mechanism: '依作用位置與病理生理選擇治療', trap: '先確認禁忌與監測' };
  }
  function chLabs(ch, i) {
    const rows = (window.labs || []).filter(l => l.chapter === ch.id).slice(i % 5, i % 5 + 3).map(l => l.name);
    return rows.length ? rows.join('、') : '生命徵象、CBC、電解質、影像、功能檢查';
  }

  function makeCase(ch, i) {
    const d = chDisease(ch, i);
    const drug = chDrug(ch, i);
    const context = pick(contexts, i);
    const symptom = pick(presentations, i + chapters.indexOf(ch));
    const red = pick(redFlags, i);
    const labs = chLabs(ch, i);
    const age = 18 + ((i * 7) % 70);
    const sex = i % 2 ? '女性' : '男性';
    return {
      no: i + 1,
      title: `${ch.system} PBL ${i + 1}｜${d.name}`,
      stem: `${context}：${age}歲${sex}主訴${symptom}，合併${red}。題目要求用${ch.system}世界模型推理，不是直接猜診斷。`,
      disease: d,
      drug,
      labs,
      answers: {
        '位置': `${ch.location}。先把病例放回${ch.system}，再定位到最可能失衡的器官、組織或功能路徑。`,
        '功能': `${ch.concepts.join('、')}。本病例的症狀代表其中一個或多個功能失衡。`,
        '正常生理': `正常流程是：${ch.flow.join(' → ')}。先畫正常流程，才能看出斷點。`,
        '失衡機制': `${d.mechanism || ch.causality.join(' → ')}。把題幹線索接到因果鏈，而不是背疾病名稱。`,
        '症狀': `${d.symptoms || symptom}。症狀要解釋成位置與功能失衡的結果。`,
        '檢查': `優先：${labs}。先排除會致命的危險，再用較特異檢查確認。`,
        '診斷': `最可能方向：${d.name}。診斷由位置、時間軸、危險徵象、檢驗和治療反應共同支持。`,
        '治療': `先穩定 ABC 與生命徵象，再依病因治療；常連結藥物/處置：${drug.name}。注意：${drug.trap || '禁忌與監測'}。`,
        '追蹤': `追蹤症狀、生命徵象、${labs}、治療副作用、復發風險與併發症。`
      },
      exam: `${d.exam || ch.exam.join('；')}；PBL 考點是先定位、再機制、再下一步。`,
      memory: `口訣：位-功-常-失-症-檢-診-治-追。看到${d.name}先用這九格填滿。`
    };
  }

  window.pblExamples = Object.fromEntries(chapters.map(ch => [ch.id, Array.from({ length: 300 }, (_, i) => makeCase(ch, i))]));

  function answerFlow(ex) {
    const fields = ['位置','功能','正常生理','失衡機制','症狀','檢查','診斷','治療','追蹤'];
    return `<div class="ordered-flow">${fields.map((f, i) => `<div class="flow-step"><span class="step-num">${i + 1}</span><span><strong>${f}</strong><br>${ex.answers[f]}</span></div>`).join('')}</div>`;
  }

  function caseCard(ex) {
    return `<div class="lecture-card pbl-example-card">
      <div class="section-head"><h3>${ex.no}. ${ex.title}</h3><span class="tag">直接答案</span></div>
      <p><strong>病例：</strong>${ex.stem}</p>
      <h3>九步標準答案</h3>
      ${answerFlow(ex)}
      <h3>國考考點</h3>
      <p>${ex.exam}</p>
      <h3>好背誦秘訣</h3>
      <p>${ex.memory}</p>
    </div>`;
  }

  window.renderPblExamples = function (chapterId, limit = 300) {
    const ch = chapters.find(c => c.id === chapterId) || chapters[0];
    const rows = window.pblExamples[ch.id].slice(0, limit);
    return `<div class="section-head"><h2>${ch.system}｜300個PBL推理範例</h2><span class="tag">${rows.length}例・直接答案</span></div><div class="lecture-grid">${rows.map(caseCard).join('')}</div>`;
  };

  window.showPblExamples = function (id) {
    activeChapter = id;
    document.getElementById('pbl').innerHTML = `
      <div class="section">
        <div class="section-head"><h2>PBL推理｜300範例直接答案庫</h2><span class="tag">每模組300例</span></div>
        <div class="chips">${chapters.map(c => `<button class="chip ${c.id===id?'active':''}" onclick="showPblExamples('${c.id}')">${c.system}</button>`).join('')}</div>
      </div>
      <div class="section">${renderPblExamples(id, 300)}</div>`;
    navTo('pbl');
    if (window.annotateMedicalAbbrev) annotateMedicalAbbrev(document.getElementById('pbl'));
  };

  renderPbl = function () {
    showPblExamples(activeChapter || chapters[0].id);
  };

  const oldDailyPbl = dailyContent;
  dailyContent = function (ch = chapters.find(c => c.id === activeChapter)) {
    return `${oldDailyPbl(ch)}<div class="section"><h2>${ch.system}｜PBL推理範例</h2>${renderPblExamples(ch.id, 40)}</div>`;
  };

  const style = document.createElement('style');
  style.textContent = '.pbl-example-card{display:grid;gap:10px}.pbl-example-card .ordered-flow{margin-top:0}';
  document.head.appendChild(style);

  renderPbl();
  renderTasks();
})();
