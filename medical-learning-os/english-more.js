(function () {
  const moreWords = [
    ['dyspnea', '呼吸困難', 'dys-困難 + -pnea呼吸', 'The patient has dyspnea on exertion.'],
    ['tachypnea', '呼吸過快', 'tachy-快 + -pnea呼吸', 'Tachypnea may indicate respiratory distress.'],
    ['apnea', '無呼吸', 'a-無 + -pnea呼吸', 'Sleep apnea causes intermittent hypoxemia.'],
    ['hypoxemia', '低氧血症', 'hypo-低 + ox氧 + -emia血液狀態', 'Hypoxemia should be corrected promptly.'],
    ['hypercapnia', '高碳酸血症', 'hyper-高 + capnia二氧化碳', 'COPD exacerbation may cause hypercapnia.'],
    ['wheezing', '喘鳴', '氣道狹窄造成的哮鳴音', 'Wheezing improves after bronchodilator therapy.'],
    ['crackles', '濕囉音', '肺泡或間質液體造成的爆裂音', 'Crackles suggest pulmonary edema or pneumonia.'],
    ['perfusion', '灌流', 'per-穿過 + fusion流入', 'Poor perfusion leads to lactic acidosis.'],
    ['ischemia', '缺血', '組織血流不足', 'Myocardial ischemia causes chest pain.'],
    ['infarction', '梗塞', '缺血後組織壞死', 'STEMI is a type of myocardial infarction.'],
    ['arrhythmia', '心律不整', 'a-異常 + rhythm節律', 'Atrial fibrillation is a common arrhythmia.'],
    ['murmur', '心雜音', '瓣膜或血流異常造成聲音', 'A systolic murmur may indicate valve disease.'],
    ['edema', '水腫', '組織間液增加', 'Peripheral edema is common in heart failure.'],
    ['oliguria', '少尿', 'oligo-少 + -uria尿', 'Oliguria suggests poor renal perfusion.'],
    ['anuria', '無尿', 'an-無 + -uria尿', 'Anuria is a dangerous sign in AKI.'],
    ['proteinuria', '蛋白尿', 'protein蛋白 + -uria尿', 'Proteinuria suggests glomerular injury.'],
    ['hematuria', '血尿', 'hem血 + -uria尿', 'Hematuria requires urinary tract evaluation.'],
    ['azotemia', '氮血症', 'azot含氮廢物 + -emia血', 'Azotemia can occur in renal failure.'],
    ['jaundice', '黃疸', '膽紅素上升造成皮膚眼白變黃', 'Jaundice may result from biliary obstruction.'],
    ['melena', '黑便', '上消化道出血常見表現', 'Melena suggests upper gastrointestinal bleeding.'],
    ['hematemesis', '吐血', 'hemat血 + emesis嘔吐', 'Hematemesis needs urgent evaluation.'],
    ['ascites', '腹水', '腹腔液體堆積', 'Ascites is a complication of cirrhosis.'],
    ['encephalopathy', '腦病變', 'encephalo腦 + pathy病', 'Hepatic encephalopathy causes confusion.'],
    ['seizure', '癲癇發作', '異常同步神經放電', 'A seizure can be provoked by hyponatremia.'],
    ['aphasia', '失語', 'a-缺乏 + phasia語言', 'Aphasia suggests dominant hemisphere stroke.'],
    ['hemiparesis', '半側無力', 'hemi半側 + paresis無力', 'Hemiparesis localizes to motor pathways.'],
    ['syncope', '暈厥', '短暫意識喪失', 'Syncope may be cardiac or neurologic.'],
    ['delirium', '譫妄', '急性注意力與意識波動', 'Delirium often indicates acute illness.'],
    ['sepsis', '敗血症', '感染合併器官功能障礙', 'Sepsis requires early antibiotics.'],
    ['bacteremia', '菌血症', 'bacter細菌 + -emia血', 'Blood cultures can detect bacteremia.'],
    ['cellulitis', '蜂窩性組織炎', 'cellul皮下組織 + -itis炎', 'Cellulitis causes erythema and swelling.'],
    ['arthritis', '關節炎', 'arthr關節 + -itis炎', 'Arthritis may be infectious or autoimmune.'],
    ['synovitis', '滑膜炎', 'synov滑膜 + -itis炎', 'Synovitis causes joint swelling.'],
    ['osteoporosis', '骨質疏鬆', 'osteo骨 + porosis多孔狀態', 'Osteoporosis increases fracture risk.'],
    ['preeclampsia', '子癲前症', '妊娠高血壓合併器官侵犯', 'Preeclampsia can progress to seizure.'],
    ['ectopic pregnancy', '異位妊娠', '受精卵著床在子宮腔外', 'Ectopic pregnancy causes abdominal pain and bleeding.'],
    ['mania', '躁症', '情緒高昂、睡眠需求下降', 'Mania changes antidepressant strategy.'],
    ['psychosis', '精神病症狀', '妄想、幻覺或現實感受損', 'Psychosis requires safety assessment.'],
    ['withdrawal', '戒斷', '停止物質後出現生理心理症狀', 'Alcohol withdrawal can cause seizures.']
  ];
  const extraAbbrev = {
    ACEi: 'angiotensin-converting enzyme inhibitor，血管張力素轉換酶抑制劑',
    ARNI: 'angiotensin receptor-neprilysin inhibitor，血管張力素受體-腦啡肽酶抑制劑',
    CXR: 'chest X-ray，胸部X光',
    Echo: 'echocardiography，心臟超音波',
    SGLT2i: 'SGLT2 inhibitor，第二型鈉-葡萄糖共同運輸蛋白抑制劑',
    P2Y12: 'P2Y12 receptor inhibitor，P2Y12血小板受體抑制劑',
    BNP: 'B-type natriuretic peptide，B型利鈉胜肽',
    STEMI: 'ST-elevation myocardial infarction，ST段上升型心肌梗塞',
    ECG: 'electrocardiogram，心電圖',
    Troponin: 'troponin，肌鈣蛋白/心肌損傷指標',
    Beta: 'beta blocker，乙型交感神經阻斷劑'
  };
  window.medicalAbbrev = Object.assign({}, window.medicalAbbrev || {}, extraAbbrev);

  function esc(s){return String(s ?? '').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
  function speak(text){return `<button class="tiny-btn" onclick='speakMedicalEnglish(${JSON.stringify(text)})'>▶ 發音</button>`;}
  function visibleAbbrev(text) {
    let out = String(text ?? '');
    Object.entries(window.medicalAbbrev || {}).sort((a,b)=>b[0].length-a[0].length).forEach(([k,v])=>{
      const zh = v.split('，').slice(1).join('，') || v;
      const re = new RegExp(`\\b${k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}\\b`, 'g');
      out = out.replace(re, `${k}（${zh}）`);
    });
    return out;
  }
  window.visibleAbbrev = visibleAbbrev;

  function relatedWordsHtml() {
    return `<div class="section"><div class="section-head"><h2>更多相關醫學單字</h2><span class="tag">${moreWords.length}個・例句發音</span></div><div class="lecture-grid">${moreWords.map(w=>`<div class="lecture-card"><div class="section-head"><h3>${esc(w[0])}</h3>${speak(w[0])}</div><p><strong>中文：</strong>${esc(w[1])}</p><p><strong>拆字/記憶：</strong>${esc(w[2])}</p><p><strong>例句：</strong>${esc(w[3])}</p>${speak(w[3])}</div>`).join('')}</div></div>`;
  }

  const oldFull = window.fullMedicalEnglishHtml;
  if (typeof oldFull === 'function') {
    window.fullMedicalEnglishHtml = function(ch) {
      let html = oldFull(ch);
      html = html.replace('</div>', `${relatedWordsHtml()}</div>`);
      html = html.replace(/<td>([^<]*\s[^<]*)<\/td><td>(<button[^>]*>▶ 發音<\/button>)<\/td>/g, (m, ex, btn) => `<td>${ex}<br>${speak(ex.replace(/^[^A-Za-z]*/, ''))}</td><td>${btn}</td>`);
      return html;
    };
    const previous = chapterPage;
    chapterPage = function(ch, i) {
      if (i === 8) return window.fullMedicalEnglishHtml(ch);
      return previous(ch, i);
    };
  }

  function enhanceVisibleText(root) {
    if (!root || root.dataset?.abbrExpanded === '1') return;
    root.querySelectorAll('.flow-step span, .mindmap small, .lecture-card p, .compare-table td').forEach(el => {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          const parent = node.parentElement;
          if (!parent || ['SCRIPT', 'STYLE', 'TEXTAREA', 'BUTTON', 'ABBR'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
          return node.nodeValue && node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
      });
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(node => {
        const next = visibleAbbrev(node.nodeValue);
        if (next !== node.nodeValue) node.nodeValue = next;
      });
    });
    if (root.dataset) root.dataset.abbrExpanded = '1';
  }
  window.enhanceVisibleAbbrevText = enhanceVisibleText;

  const oldRenderDisease = renderDisease;
  renderDisease = function(){ oldRenderDisease(); enhanceVisibleText(document.getElementById('disease')); };
  const oldRenderLecture = renderLecture;
  renderLecture = function(){ oldRenderLecture(); enhanceVisibleText(document.getElementById('lecture')); };
  const oldRenderTasks = renderTasks;
  renderTasks = function(){ oldRenderTasks(); enhanceVisibleText(document.getElementById('tasks')); };

  renderLecture();
  renderDisease();
  renderTasks();
})();

