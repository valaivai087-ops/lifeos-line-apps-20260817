(function () {
  function answerFor(ch, field) {
    const firstDisease = (diseases.find(d => d.chapter === ch.id) || {}).name || (ch.diseases && ch.diseases[0]) || ch.system;
    const firstDrug = (drugs.find(d => d.chapter === ch.id) || {}).name || (ch.drugs && ch.drugs[0]) || '依機制選藥';
    const labs = (window.labs || []).filter(l => l.chapter === ch.id).slice(0, 3).map(l => l.name).join('、') || '生命徵象、基礎檢驗、影像或功能測試';
    const map = {
      '位置': `${ch.location}。本病例先定位在「${ch.system}」，再看是否牽涉血管、器官功能、代謝或急症危險徵象。`,
      '功能': `${ch.system}的核心功能是：${ch.concepts.join('、')}。題幹中異常表現代表這些功能開始失衡。`,
      '正常生理': `正常流程：${ch.flow.join(' → ')}。先把正常路徑畫出來，才知道病在哪一段斷掉。`,
      '失衡機制': `失衡鏈：${ch.causality.join(' → ')}。這條因果鏈解釋為什麼會出現病例中的症狀與檢查異常。`,
      '症狀': `病例症狀要回到機制解釋：疼痛、喘、發燒、意識改變、出血、水腫、少尿或功能下降，都不是單獨背答案，而是器官功能失衡的結果。`,
      '檢查': `優先檢查：${labs}。先做能排除危險的檢查，再做能確認診斷的檢查。`,
      '診斷': `最可能診斷方向：${firstDisease} 或同系統急症。診斷不是只看一個字，而是由位置、時間軸、危險徵象與關鍵檢驗共同決定。`,
      '治療': `治療原則：先穩定 ABC、生命徵象與器官灌流，再針對病因治療；本章常連到 ${firstDrug}，但要先確認禁忌與監測。`,
      '追蹤': `追蹤重點：症狀是否改善、生命徵象是否穩定、關鍵檢驗是否回落、藥物副作用、併發症預防與再次發作風險。`
    };
    return map[field] || `${field}：依${ch.system}的位置、功能、機制、檢查與治療推理。`;
  }

  function answerCards(ch, fields) {
    return `<div class="ordered-flow">${fields.map((f, i) => `<div class="flow-step"><span class="step-num">${i + 1}</span><span><strong>${f}</strong><br>${answerFor(ch, f)}</span></div>`).join('')}</div>`;
  }

  renderPbl = function () {
    const ch = chapters.find(c => c.id === activeChapter) || chapters[0];
    const fields = ['位置','功能','正常生理','失衡機制','症狀','檢查','診斷','治療','追蹤'];
    document.getElementById('pbl').innerHTML = `
      <div class="section">
        <div class="section-head"><h2>PBL推理｜直接答案版</h2><div class="chips">${chapters.map(c=>`<button class="chip ${c.id===activeChapter?'active':''}" onclick="activeChapter='${c.id}';renderPbl()">${c.system}</button>`).join('')}</div></div>
        <div class="two-col">
          <div>
            <h3>病例</h3>
            <p class="lecture-card">${ch.case}</p>
            <h3>標準答案</h3>
            ${answerCards(ch, fields)}
          </div>
          <div>
            <h3>推理提示</h3>
            ${abilityBlock('病例不是猜診斷','先定位再推理','位置 → 功能 → 正常 → 失衡 → 檢查 → 診斷 → 治療','看到病例能完整說明')}
          </div>
        </div>
      </div>
      <div class="section">
        <div class="section-head"><h2>可編輯答案稿</h2><span class="tag">已預填</span></div>
        <div class="case-ladder">${fields.map(f=>`<label>${f}<textarea oninput="state.caseNotes['${ch.id}-${f}']=this.value;save()">${state.caseNotes[ch.id+'-'+f] || answerFor(ch, f)}</textarea></label>`).join('')}</div>
      </div>`;
    if (window.annotateMedicalAbbrev) annotateMedicalAbbrev(document.getElementById('pbl'));
  };

  renderPbl();
})();
