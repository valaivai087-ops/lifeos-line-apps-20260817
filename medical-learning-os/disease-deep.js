(function () {
  function esc(s) {
    return String(s ?? '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  }

  function chapterOf(id) {
    return chapters.find(c => c.id === id) || chapters[0];
  }

  function diseaseRows(chapterId) {
    const base = diseases.filter(d => d.chapter === chapterId);
    if (base.length) return base;
    const bank = window.megaBank && window.megaBank[chapterId];
    return bank ? bank.diseases.slice(0, 60) : [];
  }

  function compact(text, fallback) {
    return esc(text || fallback || '依題幹線索回到位置、功能、機制、檢查與治療推理。');
  }

  function mindMap(d, ch) {
    const items = [
      ['核心', d.name],
      ['位置', ch.location],
      ['正常', d.normal],
      ['病因', d.cause],
      ['機制', d.mechanism],
      ['症狀', d.symptoms],
      ['檢查', d.tests],
      ['治療', d.treatment],
      ['國考', d.exam]
    ];
    return `<div class="mindmap disease-mindmap">${items.map(x => `<span><b>${esc(x[0])}</b><small>${compact(x[1])}</small></span>`).join('')}</div>`;
  }

  function diffTable(d, ch) {
    const siblings = diseases.filter(x => x.chapter === ch.id && x.name !== d.name).slice(0, 3);
    const rows = [
      [d.name, d.mechanism, d.symptoms, d.tests, d.treatment, d.exam],
      ...siblings.map(s => [s.name, s.mechanism, s.symptoms, s.tests, s.treatment, s.exam])
    ];
    if (rows.length === 1) {
      rows.push(
        [`相似急症`, `${ch.concepts[0]}快速失衡`, '症狀急、生命徵象不穩', '先排危險檢查', '先穩定再治病因', '先處理會死的'],
        [`慢性相似病`, `${ch.concepts[1] || ch.concepts[0]}長期失衡`, '症狀慢、反覆或漸進', '追蹤趨勢', '長期控制與預防', '看時間軸']
      );
    }
    return `<div class="table-wrap"><table class="compare-table">
      <thead><tr><th>疾病</th><th>機制差異</th><th>症狀差異</th><th>檢查差異</th><th>治療差異</th><th>國考辨識點</th></tr></thead>
      <tbody>${rows.map(r => `<tr>${r.map(c => `<td>${compact(c)}</td>`).join('')}</tr>`).join('')}</tbody>
    </table></div>`;
  }

  function tips(d, ch) {
    const name = d.name.replace(/｜.*/, '');
    return `<div class="ordered-flow">
      <div class="flow-step"><span class="step-num">1</span><span><strong>一眼定位</strong><br>看到 ${esc(name)}，先問病灶在 ${esc(ch.location)} 的哪一段。</span></div>
      <div class="flow-step"><span class="step-num">2</span><span><strong>一句機制</strong><br>${compact(d.mechanism)}</span></div>
      <div class="flow-step"><span class="step-num">3</span><span><strong>三個線索</strong><br>症狀、檢查、時間軸一起看，不用單一關鍵字猜答案。</span></div>
      <div class="flow-step"><span class="step-num">4</span><span><strong>第一步處置</strong><br>先排除危險徵象，再決定確認診斷或立即治療。</span></div>
      <div class="flow-step"><span class="step-num">5</span><span><strong>背誦口訣</strong><br>位-功-因-症-檢-治-考：位置、功能、因果、症狀、檢查、治療、考點。</span></div>
    </div>`;
  }

  function diseaseDeepCard(d, ch, idx) {
    return `<div class="lecture-card disease-deep-card">
      <div class="section-head"><h3>${idx + 1}. ${esc(d.name)}</h3><span class="tag">${esc(ch.system)}</span></div>
      <h3>核心內容心智圖</h3>
      ${mindMap(d, ch)}
      <h3>差異性比較表</h3>
      ${diffTable(d, ch)}
      <h3>好背誦、好運用秘訣</h3>
      ${tips(d, ch)}
    </div>`;
  }

  window.renderDiseaseDeepCards = function (chapterId, limit) {
    const ch = chapterOf(chapterId || activeChapter);
    const rows = diseaseRows(ch.id).slice(0, limit || 120);
    return `<div class="section-head"><h2>${esc(ch.system)}｜疾病完整內容呈現</h2><span class="tag">${rows.length}個疾病・心智圖・差異表・背誦秘訣</span></div>
      <div class="lecture-grid">${rows.map((d, i) => diseaseDeepCard(d, ch, i)).join('')}</div>`;
  };

  renderDiseaseCards = function (chapter) {
    return renderDiseaseDeepCards(chapter || activeChapter || chapters[0].id, chapter ? 120 : 160);
  };

  window.showMegaDisease = function (id) {
    activeChapter = id;
    document.getElementById('disease').innerHTML = `<div class="section"><div class="section-head"><h2>疾病地圖｜完整內容呈現</h2><span class="tag">心智圖・差異表・背誦秘訣</span></div><div class="chips">${chapters.map(c => `<button class="chip ${c.id===id?'active':''}" onclick="showMegaDisease('${c.id}')">${esc(c.system)}</button>`).join('')}</div></div><div class="section">${renderDiseaseDeepCards(id, 160)}</div>`;
    navTo('disease');
    if (window.annotateMedicalAbbrev) annotateMedicalAbbrev(document.getElementById('disease'));
  };

  const oldDailyContentDiseaseDeep = dailyContent;
  dailyContent = function (ch = chapters.find(c => c.id === activeChapter)) {
    return `${oldDailyContentDiseaseDeep(ch)}<div class="section"><h2>${esc(ch.system)}｜疾病節點完整呈現</h2>${renderDiseaseDeepCards(ch.id, 80)}</div>`;
  };

  const style = document.createElement('style');
  style.textContent = `
    .disease-mindmap span{align-content:start;min-height:112px}
    .disease-mindmap small{display:block;margin-top:6px;color:#475467;font-weight:600;line-height:1.45}
    .table-wrap{overflow:auto;border:1px solid var(--line);border-radius:var(--radius);background:#fff}
    .compare-table{width:100%;border-collapse:collapse;min-width:860px;font-size:14px}
    .compare-table th,.compare-table td{border-bottom:1px solid var(--line);border-right:1px solid var(--line);padding:10px;vertical-align:top;line-height:1.55}
    .compare-table th{background:#eef6ff;color:#172033;text-align:left;font-weight:900}
    .compare-table tr:last-child td{border-bottom:0}
    .disease-deep-card{display:grid;gap:12px}
  `;
  document.head.appendChild(style);

  renderDisease();
  renderTasks();
})();
