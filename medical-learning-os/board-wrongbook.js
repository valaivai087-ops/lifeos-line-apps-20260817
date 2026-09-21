(function () {
  const mistakeTypes = ['概念混淆','定位錯誤','機制斷裂','檢驗誤判','治療時機錯誤','禁忌忽略','危險徵象漏看','相似疾病混淆','藥物副作用漏掉','下一步處置錯誤'];
  const leverageAxes = ['先定位再診斷','正常生理先畫出來','檢驗只服務機制','急症先排危險','藥物先看作用位置','比較相似疾病差異','時間軸決定鑑別','禁忌比藥名更重要','第一步處置優先','錯誤模型要重建'];

  function pick(xs, i) { return xs[i % xs.length]; }
  function diseaseFor(ch, i) {
    const rows = diseases.filter(d => d.chapter === ch.id);
    return rows[i % rows.length] || { name: pick(ch.diseases || [ch.system], i), mechanism: ch.causality.join(' → '), tests: '關鍵檢驗', treatment: '依病因治療', exam: pick(ch.exam, i) };
  }
  function drugFor(ch, i) {
    const rows = drugs.filter(d => d.chapter === ch.id);
    return rows[i % rows.length] || { name: pick(ch.drugs || ['依機制選藥'], i), mechanism: '依作用位置與機制選藥', trap: '注意禁忌與監測' };
  }
  function labFor(ch, i) {
    const rows = (window.labs || []).filter(l => l.chapter === ch.id);
    return rows[i % rows.length] || { name: '關鍵檢驗', meaning: '用來連結機制與下一步處置', high: '依臨床情境判讀', low: '依臨床情境判讀' };
  }
  function makeWrong(ch, i) {
    const d = diseaseFor(ch, i);
    const drug = drugFor(ch, i + 3);
    const lab = labFor(ch, i + 5);
    const mistake = pick(mistakeTypes, i);
    const axis = pick(leverageAxes, i);
    const concept = pick(ch.concepts || [ch.system], i);
    return {
      no: i + 1,
      subject: ch.system,
      title: `${mistake}｜${d.name}`,
      question: `${ch.system}國考錯題：題幹出現 ${d.name} 相關線索，合併 ${lab.name} 異常時，最容易錯在哪一步？`,
      wrongModel: `把題目當成關鍵字配對：看到 ${d.name} 就直接背答案，沒有先定位到 ${ch.location}，也沒有把 ${concept} 的正常功能畫出來。`,
      correctModel: `正確模型是「${axis}」：先定位，再用 ${concept} 解釋 ${d.mechanism || ch.causality.join(' → ')}，最後才選檢查或治療。`,
      whyWrong: `錯因通常是漏看時間軸、危險徵象、${lab.name} 的意義，或把 ${drug.name} 的用途與禁忌背成孤立藥名。`,
      avoid: `下次看到此類題，固定寫出：位置 → 正常功能 → 失衡機制 → 症狀 → ${lab.name} → 診斷 → ${drug.name} 或處置。`,
      relatedDisease: d.name,
      relatedDrug: drug.name,
      relatedLab: lab.name,
      leverage: axis,
      answer: `先抓 ${ch.location} 的 ${concept} 失衡，再判讀 ${lab.name}，最後依禁忌選 ${drug.name} 或其他處置。`,
      chapter: ch.id
    };
  }

  window.boardWrongBook = Object.fromEntries(chapters.map(ch => [ch.id, Array.from({ length: 100 }, (_, i) => makeWrong(ch, i))]));

  function esc(s) {
    return String(s ?? '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  }
  function chips(activeId) {
    return `<div class="chips">${chapters.map(c => `<button class="chip ${c.id===activeId?'active':''}" onclick="showWrongSubject('${c.id}')">${esc(c.system)}</button>`).join('')}</div>`;
  }
  function wrongCard(w) {
    return `<div class="lecture-card wrongbook-card">
      <div class="section-head"><h3>${w.no}. ${esc(w.title)}</h3><span class="tag">${esc(w.leverage)}</span></div>
      <p><strong>題目：</strong>${esc(w.question)}</p>
      <p><strong>答案：</strong>${esc(w.answer)}</p>
      <div class="ordered-flow">
        <div class="flow-step"><span class="step-num">1</span><span><strong>錯誤模型</strong><br>${esc(w.wrongModel)}</span></div>
        <div class="flow-step"><span class="step-num">2</span><span><strong>正確模型</strong><br>${esc(w.correctModel)}</span></div>
        <div class="flow-step"><span class="step-num">3</span><span><strong>為什麼錯</strong><br>${esc(w.whyWrong)}</span></div>
        <div class="flow-step"><span class="step-num">4</span><span><strong>如何避免</strong><br>${esc(w.avoid)}</span></div>
      </div>
      <p><strong>相關疾病：</strong>${esc(w.relatedDisease)}　<strong>相關藥物：</strong>${esc(w.relatedDrug)}　<strong>相關檢驗：</strong>${esc(w.relatedLab)}</p>
    </div>`;
  }
  window.showWrongSubject = function (id) {
    const ch = chapters.find(c => c.id === id) || chapters[0];
    const rows = window.boardWrongBook[ch.id];
    document.getElementById('wrong').innerHTML = `
      <div class="section"><div class="section-head"><h2>國考錯題本</h2><span class="tag">每科100個高槓桿錯題節點</span></div>${chips(ch.id)}</div>
      <div class="section"><div class="section-head"><h2>${esc(ch.system)}｜100個最槓桿錯題解析</h2><span class="tag">錯誤模型 → 正確模型 → 避免方法</span></div><div class="lecture-grid">${rows.map(wrongCard).join('')}</div></div>`;
    navTo('wrong');
    if (window.annotateMedicalAbbrev) annotateMedicalAbbrev(document.getElementById('wrong'));
    if (window.enhanceVisibleAbbrevText) enhanceVisibleAbbrevText(document.getElementById('wrong'));
  };

  renderWrong = function () {
    showWrongSubject(activeChapter || chapters[0].id);
  };

  function renameNav() {
    const btn = document.querySelector('.nav-btn[data-view="wrong"] span');
    if (btn) btn.textContent = '國考錯題本';
  }
  const oldRenderNavWrong = renderNav;
  renderNav = function () {
    oldRenderNavWrong();
    renameNav();
  };

  const oldHomeDescWrong = homeDesc;
  homeDesc = function (id) {
    if (id === 'wrong') return '每科100個最槓桿錯題節點，直接重建錯誤模型。';
    return oldHomeDescWrong(id);
  };

  const oldDailyWrong = dailyContent;
  dailyContent = function (ch = chapters.find(c => c.id === activeChapter)) {
    const rows = (window.boardWrongBook[ch.id] || []).slice(0, 20);
    return `${oldDailyWrong(ch)}<div class="section"><div class="section-head"><h2>${esc(ch.system)}｜高槓桿錯題節點</h2><span class="tag">精選20題</span></div><div class="lecture-grid">${rows.map(wrongCard).join('')}</div></div>`;
  };

  const style = document.createElement('style');
  style.textContent = '.wrongbook-card{display:grid;gap:10px}.wrongbook-card .ordered-flow{margin-top:0}';
  document.head.appendChild(style);

  renameNav();
  renderWrong();
  renderHome();
})();
