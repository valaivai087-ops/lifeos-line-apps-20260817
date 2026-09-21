(function () {
  const prefix = [
    ['hyper-', 'high / excessive', '高、過多', 'hypertension 高血壓'], ['hypo-', 'low / deficient', '低、不足', 'hypoxemia 低氧血症'], ['tachy-', 'fast', '快', 'tachypnea 呼吸過快'], ['brady-', 'slow', '慢', 'bradycardia 心搏過慢'], ['dys-', 'bad / difficult', '異常、困難', 'dyspnea 呼吸困難'], ['a- / an-', 'without', '無、缺乏', 'apnea 無呼吸'], ['anti-', 'against', '對抗', 'antibiotic 抗生素'], ['auto-', 'self', '自己', 'autoimmune 自體免疫'], ['endo-', 'inside', '內', 'endocarditis 心內膜炎'], ['peri-', 'around', '周圍', 'pericardium 心包膜'], ['intra-', 'within', '內部', 'intravenous 靜脈內'], ['extra-', 'outside', '外部', 'extracellular 細胞外'], ['poly-', 'many', '多', 'polyuria 多尿'], ['oligo-', 'few', '少', 'oliguria 少尿'], ['pan-', 'all', '全', 'pancytopenia 全血球低下']
  ];
  const roots = [
    ['cardi/o', 'heart', '心臟', 'cardiology 心臟學'], ['angi/o', 'vessel', '血管', 'angiography 血管攝影'], ['hem/o', 'blood', '血液', 'hematuria 血尿'], ['pneum/o', 'lung / air', '肺、空氣', 'pneumonia 肺炎'], ['bronch/o', 'bronchus', '支氣管', 'bronchitis 支氣管炎'], ['alveol/o', 'alveolus', '肺泡', 'alveolar 肺泡的'], ['nephr/o', 'kidney', '腎臟', 'nephritis 腎炎'], ['ur/o', 'urine', '尿', 'urology 泌尿學'], ['hepat/o', 'liver', '肝臟', 'hepatitis 肝炎'], ['chol/e', 'bile', '膽汁', 'cholestasis 膽汁鬱積'], ['gastr/o', 'stomach', '胃', 'gastritis 胃炎'], ['enter/o', 'intestine', '腸', 'enteritis 腸炎'], ['neur/o', 'nerve', '神經', 'neuropathy 神經病變'], ['encephal/o', 'brain', '腦', 'encephalitis 腦炎'], ['glyc/o', 'sugar', '糖', 'hyperglycemia 高血糖'], ['thyroid/o', 'thyroid', '甲狀腺', 'thyroiditis 甲狀腺炎'], ['oste/o', 'bone', '骨', 'osteoporosis 骨質疏鬆'], ['arthr/o', 'joint', '關節', 'arthritis 關節炎'], ['derm/o', 'skin', '皮膚', 'dermatitis 皮膚炎'], ['psych/o', 'mind', '精神、心理', 'psychosis 精神病症狀']
  ];
  const suffix = [
    ['-itis', 'inflammation', '發炎', 'hepatitis 肝炎'], ['-osis', 'condition', '狀態、病態', 'thrombosis 血栓形成'], ['-emia', 'blood condition', '血液狀態', 'hypoxemia 低氧血症'], ['-uria', 'urine condition', '尿液狀態', 'proteinuria 蛋白尿'], ['-pathy', 'disease', '病變', 'neuropathy 神經病變'], ['-penia', 'deficiency', '減少', 'leukopenia 白血球低下'], ['-megaly', 'enlargement', '腫大', 'hepatomegaly 肝腫大'], ['-scopy', 'viewing', '內視鏡檢查', 'colonoscopy 大腸鏡'], ['-graphy', 'imaging', '攝影、紀錄', 'angiography 血管攝影'], ['-pnea', 'breathing', '呼吸', 'dyspnea 呼吸困難']
  ];
  const chains = [
    ['呼吸英文鏈', 'pneum/o 肺 → alveolus 肺泡 → ventilation 通氣 → perfusion 灌流 → hypoxemia 低氧血症', 'oxygen needs both ventilation and perfusion.'],
    ['心血管英文鏈', 'cardi/o 心 → myocardium 心肌 → ischemia 缺血 → infarction 梗塞 → troponin 上升', 'ischemia injures myocardium and raises troponin.'],
    ['腎臟英文鏈', 'nephr/o 腎 → glomerulus 腎小球 → filtration 過濾 → creatinine 肌酸酐 → GFR 下降', 'creatinine rises when GFR falls.'],
    ['感染英文鏈', 'immun/o 免疫 → pathogen 病原 → inflammation 發炎 → sepsis 敗血症 → lactate 乳酸', 'sepsis means infection plus organ dysfunction.'],
    ['神經英文鏈', 'neur/o 神經 → lesion 病灶 → localization 定位 → deficit 缺損 → stroke 中風', 'localization comes before diagnosis in neurology.']
  ];
  const keywordZh = {
    ventilation:'通氣', perfusion:'灌流', wheezing:'喘鳴', hypoxemia:'低氧血症', compliance:'順應性', preload:'前負荷', afterload:'後負荷', contractility:'收縮力', ischemia:'缺血', filtration:'過濾', reabsorption:'再吸收', secretion:'分泌', creatinine:'肌酸酐', osmolarity:'滲透壓', stroke:'中風', seizure:'癲癇發作', aphasia:'失語', jaundice:'黃疸', pancreatitis:'胰臟炎', melena:'黑便', ketoacidosis:'酮酸中毒', hypoglycemia:'低血糖', thrombosis:'血栓形成', sepsis:'敗血症', culture:'培養', arthritis:'關節炎', preeclampsia:'子癲前症', psychosis:'精神病症狀'
  };
  function esc(s){return String(s ?? '').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
  function say(text){return `<button class="tiny-btn" onclick='speakMedicalEnglish(${JSON.stringify(text)})'>▶ 發音</button>`;}
  function termTable(title, rows){return `<div class="section"><div class="section-head"><h2>${title}</h2><span class="tag">雙語解析</span></div><div class="table-wrap"><table class="compare-table"><thead><tr><th>英文</th><th>English meaning</th><th>中文</th><th>例字</th><th>發音</th></tr></thead><tbody>${rows.map(r=>`<tr><td><strong>${esc(r[0])}</strong></td><td>${esc(r[1])}</td><td>${esc(r[2])}</td><td>${esc(r[3])}</td><td>${say(r[0].replace(/[\/\-].*/,''))}</td></tr>`).join('')}</tbody></table></div></div>`;}
  function keywordCards(ch){
    return `<div class="lecture-grid">${ch.english.map(w=>`<div class="lecture-card"><div class="section-head"><h3>${esc(w)}</h3>${say(w)}</div><p><strong>中文：</strong>${esc(keywordZh[w] || '章節專業關鍵字，請放回本章位置與機制理解。')}</p><p><strong>記法：</strong>先發音，再拆字根，最後放回 ${esc(ch.system)} 的病例題。</p></div>`).join('')}</div>`;
  }
  function fullEnglishHtml(ch){
    const abbr = window.medicalAbbrev || {};
    const abbrRows = Object.entries(abbr).slice(0, 80).map(([k,v])=>`<tr><td><strong>${esc(k)}</strong></td><td>${esc(v)}</td><td>${say(k)}</td></tr>`).join('');
    return `<div class="english-classroom">
      <div class="section"><div class="section-head"><h2>醫學英文教室｜${esc(ch.system)}</h2><span class="tag">字根字首・中文翻譯・連鎖記憶・英文發音</span></div>
        <div class="two-col"><div class="lecture-card"><h3>英文朗讀器</h3><textarea id="lectureSpeechBox" style="width:100%;min-height:100px;border:1px solid var(--line);border-radius:var(--radius);padding:10px">${esc(ch.english.join(' '))}</textarea><div class="hero-actions"><button class="primary" onclick="speakMedicalEnglish(document.getElementById('lectureSpeechBox').value)">▶ 朗讀英文</button><button class="tiny-btn" onclick="speechSynthesis && speechSynthesis.cancel()">停止</button></div></div><div class="lecture-card"><h3>連鎖記憶規則</h3><p>字首定方向，字根定器官，字尾定狀態。英文不是背翻譯，是把單字拆回人體位置、疾病機制與國考下一步。</p></div></div>
      </div>
      <div class="section"><div class="section-head"><h2>本章關鍵字雙語卡</h2><span class="tag">點發音</span></div>${keywordCards(ch)}</div>
      ${termTable('字首 Prefix', prefix)}${termTable('字根 Root', roots)}${termTable('字尾 Suffix', suffix)}
      <div class="section"><div class="section-head"><h2>連鎖記憶 Chains</h2><span class="tag">英文句子可發音</span></div><div class="lecture-grid">${chains.map(c=>`<div class="lecture-card"><div class="section-head"><h3>${esc(c[0])}</h3>${say(c[2])}</div><p><strong>記憶鏈：</strong>${esc(c[1])}</p><p><strong>English：</strong>${esc(c[2])}</p></div>`).join('')}</div></div>
      <div class="section"><div class="section-head"><h2>專業英文縮寫中文解析</h2><span class="tag">${Object.keys(abbr).length}個</span></div><div class="table-wrap"><table class="compare-table"><thead><tr><th>縮寫</th><th>英文 + 中文解析</th><th>發音</th></tr></thead><tbody>${abbrRows}</tbody></table></div></div>
    </div>`;
  }
  window.fullMedicalEnglishHtml = fullEnglishHtml;
  const oldChapterPageEnglishFix = chapterPage;
  chapterPage = function(ch, i){
    if (i === 8) return fullEnglishHtml(ch);
    return oldChapterPageEnglishFix(ch, i);
  };
  renderLecture();
})();
