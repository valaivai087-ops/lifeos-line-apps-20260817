(function () {
  const prefixRoots = [
    ['a-', 'without, lack of', '無、缺乏', 'anemia 貧血', 'a- + hem + -ia = 缺少血液能力'],
    ['an-', 'without', '無', 'anuria 無尿', 'an- + uria = 沒有尿'],
    ['anti-', 'against', '對抗', 'antibiotic 抗生素', 'anti-先想「對抗」'],
    ['auto-', 'self', '自己', 'autoimmune 自體免疫', 'auto-自己攻擊自己'],
    ['brady-', 'slow', '慢', 'bradycardia 心搏過慢', 'brady慢 + cardia心'],
    ['tachy-', 'fast', '快', 'tachypnea 呼吸過快', 'tachy快 + pnea呼吸'],
    ['hyper-', 'high, excessive', '高、過多', 'hypertension 高血壓', 'hyper高 + tension壓力'],
    ['hypo-', 'low, deficient', '低、不足', 'hypoglycemia 低血糖', 'hypo低 + glyc糖 + emia血'],
    ['peri-', 'around', '周圍', 'pericardium 心包膜', 'peri周圍 + card心'],
    ['endo-', 'inside', '內', 'endocarditis 心內膜炎', 'endo內 + card心 + itis炎'],
    ['epi-', 'upon', '上、表面', 'epidermis 表皮', 'epi上 + derm皮膚'],
    ['sub-', 'under', '下', 'subcutaneous 皮下', 'sub下 + cutaneous皮膚'],
    ['supra-', 'above', '上方', 'suprarenal 腎上腺', 'supra上 + renal腎'],
    ['infra-', 'below', '下方', 'infrapatellar 髕骨下', 'infra下方'],
    ['inter-', 'between', '之間', 'intercostal 肋間', 'inter之間 + cost肋'],
    ['intra-', 'within', '內部', 'intravenous 靜脈內', 'intra內 + venous靜脈'],
    ['extra-', 'outside', '外', 'extracellular 細胞外', 'extra外 + cellular細胞'],
    ['trans-', 'across', '穿過、跨越', 'transfusion 輸血', 'trans跨越 + fusion注入'],
    ['dys-', 'bad, difficult', '異常、困難', 'dyspnea 呼吸困難', 'dys困難 + pnea呼吸'],
    ['eu-', 'good, normal', '正常', 'euthyroid 甲狀腺功能正常', 'eu正常 + thyroid甲狀腺'],
    ['poly-', 'many', '多', 'polyuria 多尿', 'poly多 + uria尿'],
    ['oligo-', 'few, little', '少', 'oliguria 少尿', 'oligo少 + uria尿'],
    ['pan-', 'all', '全', 'pancytopenia 全血球低下', 'pan全 + cyto細胞 + penia少'],
    ['hemi-', 'half', '半側', 'hemiplegia 半身癱瘓', 'hemi半 + plegia癱'],
    ['bi-', 'two', '二', 'bilateral 雙側', 'bi二 + lateral側'],
    ['tri-', 'three', '三', 'tricuspid 三尖瓣', 'tri三 + cuspid尖瓣'],
    ['quadri-', 'four', '四', 'quadriplegia 四肢癱瘓', 'quadri四 + plegia癱'],
    ['neo-', 'new', '新', 'neoplasm 新生物/腫瘤', 'neo新 + plasm形成'],
    ['meta-', 'change, beyond', '轉變、遠端', 'metastasis 轉移', 'meta遠端 + stasis停留'],
    ['para-', 'beside, abnormal', '旁、異常', 'parathyroid 副甲狀腺', 'para旁邊 + thyroid甲狀腺']
  ];

  const roots = [
    ['cardi/o', 'heart', '心臟', 'cardiology 心臟學', 'cardio心 + logy學問'],
    ['angi/o', 'vessel', '血管', 'angiography 血管攝影', 'angio血管 + graphy攝影'],
    ['arteri/o', 'artery', '動脈', 'arteriosclerosis 動脈硬化', 'arterio動脈 + sclerosis硬化'],
    ['ven/o', 'vein', '靜脈', 'intravenous 靜脈內', 'intra內 + ven靜脈'],
    ['hem/o', 'blood', '血液', 'hematuria 血尿', 'hem血 + uria尿'],
    ['erythr/o', 'red', '紅', 'erythrocyte 紅血球', 'erythro紅 + cyte細胞'],
    ['leuk/o', 'white', '白', 'leukocyte 白血球', 'leuko白 + cyte細胞'],
    ['thromb/o', 'clot, platelet', '血栓、血小板', 'thrombosis 血栓形成', 'thrombo血栓 + osis狀態'],
    ['pneum/o', 'lung, air', '肺、空氣', 'pneumonia 肺炎', 'pneumo肺 + ia狀態'],
    ['bronch/o', 'bronchus', '支氣管', 'bronchitis 支氣管炎', 'bronch支氣管 + itis炎'],
    ['alveol/o', 'alveolus', '肺泡', 'alveolar 肺泡的', 'alveolo肺泡'],
    ['pleur/o', 'pleura', '肋膜', 'pleuritis 肋膜炎', 'pleur肋膜 + itis炎'],
    ['nephr/o', 'kidney', '腎臟', 'nephritis 腎炎', 'nephro腎 + itis炎'],
    ['ren/o', 'kidney', '腎臟', 'renal 腎的', 'ren腎'],
    ['glomerul/o', 'glomerulus', '腎小球', 'glomerulonephritis 腎絲球腎炎', 'glomerulo腎小球 + nephro腎 + itis炎'],
    ['ur/o', 'urine', '尿', 'urology 泌尿學', 'uro尿 + logy學'],
    ['hepat/o', 'liver', '肝臟', 'hepatitis 肝炎', 'hepato肝 + itis炎'],
    ['chol/e', 'bile', '膽汁', 'cholecystitis 膽囊炎', 'chole膽 + cyst囊 + itis炎'],
    ['gastr/o', 'stomach', '胃', 'gastritis 胃炎', 'gastro胃 + itis炎'],
    ['enter/o', 'intestine', '腸', 'enteritis 腸炎', 'entero腸 + itis炎'],
    ['col/o', 'colon', '大腸', 'colitis 大腸炎', 'colo大腸 + itis炎'],
    ['pancreat/o', 'pancreas', '胰臟', 'pancreatitis 胰臟炎', 'pancreato胰 + itis炎'],
    ['neur/o', 'nerve', '神經', 'neuropathy 神經病變', 'neuro神經 + pathy病'],
    ['encephal/o', 'brain', '腦', 'encephalitis 腦炎', 'encephalo腦 + itis炎'],
    ['myel/o', 'spinal cord, marrow', '脊髓、骨髓', 'myelopathy 脊髓病變', 'myelo脊髓 + pathy病'],
    ['psych/o', 'mind', '心理、精神', 'psychosis 精神病症狀', 'psycho精神 + osis狀態'],
    ['thyroid/o', 'thyroid', '甲狀腺', 'thyroiditis 甲狀腺炎', 'thyroid甲狀腺 + itis炎'],
    ['adren/o', 'adrenal', '腎上腺', 'adrenaline 腎上腺素', 'adreno腎上腺'],
    ['glyc/o', 'sugar', '糖', 'hyperglycemia 高血糖', 'hyper高 + glyc糖 + emia血'],
    ['oste/o', 'bone', '骨', 'osteoporosis 骨質疏鬆', 'osteo骨 + porosis孔洞狀態'],
    ['arthr/o', 'joint', '關節', 'arthritis 關節炎', 'arthro關節 + itis炎'],
    ['my/o', 'muscle', '肌肉', 'myopathy 肌病變', 'myo肌肉 + pathy病'],
    ['derm/o', 'skin', '皮膚', 'dermatitis 皮膚炎', 'derm皮膚 + itis炎'],
    ['gynec/o', 'female', '婦科', 'gynecology 婦科學', 'gyneco女性 + logy學'],
    ['obstetr/o', 'pregnancy', '產科', 'obstetrics 產科', 'obstetro產科'],
    ['pedi/o', 'child', '兒童', 'pediatrics 小兒科', 'pedio兒童 + iatrics治療'],
    ['onc/o', 'tumor', '腫瘤', 'oncology 腫瘤學', 'onco腫瘤 + logy學'],
    ['immun/o', 'immune', '免疫', 'immunology 免疫學', 'immuno免疫 + logy學'],
    ['seps/o', 'infection, putrefaction', '感染、敗血', 'sepsis 敗血症', 'seps感染 + is狀態'],
    ['path/o', 'disease', '疾病', 'pathology 病理學', 'patho病 + logy學']
  ];

  const suffixes = [
    ['-itis', 'inflammation', '發炎', 'hepatitis 肝炎', '看到 -itis 先想發炎'],
    ['-osis', 'condition', '狀態、病態', 'thrombosis 血栓形成', 'osis是狀態'],
    ['-emia', 'blood condition', '血液狀態', 'bacteremia 菌血症', 'emia都在血中'],
    ['-uria', 'urine condition', '尿液狀態', 'proteinuria 蛋白尿', 'uria都在尿中'],
    ['-pathy', 'disease', '病變', 'neuropathy 神經病變', 'pathy是病'],
    ['-megaly', 'enlargement', '腫大', 'hepatomegaly 肝腫大', 'megaly變大'],
    ['-penia', 'deficiency', '減少', 'leukopenia 白血球低下', 'penia變少'],
    ['-cytosis', 'cell increase', '細胞增多', 'leukocytosis 白血球增多', 'cyto細胞 + osis狀態'],
    ['-ectomy', 'removal', '切除', 'appendectomy 闌尾切除', 'ectomy拿掉'],
    ['-otomy', 'incision', '切開', 'tracheotomy 氣管切開', 'otomy切開'],
    ['-ostomy', 'new opening', '造口', 'colostomy 大腸造口', 'ostomy開新口'],
    ['-scopy', 'viewing', '內視鏡檢查', 'colonoscopy 大腸鏡', 'scopy看'],
    ['-graphy', 'imaging', '攝影、紀錄', 'angiography 血管攝影', 'graphy成像'],
    ['-gram', 'record', '圖、紀錄', 'electrocardiogram 心電圖', 'gram紀錄結果'],
    ['-lysis', 'breakdown', '分解、溶解', 'hemolysis 溶血', 'lysis裂解'],
    ['-plegia', 'paralysis', '癱瘓', 'hemiplegia 半身癱瘓', 'plegia癱'],
    ['-pnea', 'breathing', '呼吸', 'apnea 無呼吸', 'pnea呼吸'],
    ['-rrhea', 'flow', '流出', 'diarrhea 腹瀉', 'rrhea流'],
    ['-stasis', 'standing still', '停滯', 'cholestasis 膽汁鬱積', 'stasis停住'],
    ['-genic', 'producing', '產生、來源', 'iatrogenic 醫源性', 'genic來源']
  ];

  const chainMemory = [
    ['心血管鏈', 'cardi/o 心 → myocardium 心肌 → ischemia 缺血 → infarction 梗塞 → troponin 心肌損傷指標', 'heart muscle loses blood flow, cells die, troponin rises.'],
    ['呼吸鏈', 'pneum/o 肺 → alveolus 肺泡 → ventilation 通氣 → perfusion 灌流 → hypoxemia 低氧血症', 'oxygen needs both air and blood at the alveolus.'],
    ['腎臟鏈', 'nephr/o 腎 → glomerulus 腎小球 → filtration 過濾 → creatinine 肌酸酐 → GFR 腎絲球過濾率', 'creatinine rises when filtration falls.'],
    ['肝膽鏈', 'hepat/o 肝 → bile 膽汁 → bilirubin 膽紅素 → jaundice 黃疸 → cholestasis 膽汁鬱積', 'bile flow obstruction turns bilirubin into jaundice.'],
    ['神經鏈', 'neur/o 神經 → lesion 病灶 → localization 定位 → deficit 缺損 → stroke 中風', 'neurology starts with localization before diagnosis.'],
    ['內分泌鏈', 'glyc/o 糖 → insulin 胰島素 → potassium 鉀 → ketoacidosis 酮酸中毒 → anion gap 陰離子間隙', 'insulin moves glucose and potassium into cells.'],
    ['血液鏈', 'hem/o 血 → erythrocyte 紅血球 → hemoglobin 血紅素 → anemia 貧血 → MCV 平均紅血球體積', 'anemia questions start with MCV.'],
    ['免疫鏈', 'immun/o 免疫 → antigen 抗原 → antibody 抗體 → inflammation 發炎 → sepsis 敗血症', 'infection plus organ dysfunction means sepsis.'],
    ['肌骨鏈', 'arthr/o 關節 → synovium 滑膜 → crystal 結晶 → gout 痛風 → colchicine 秋水仙素', 'acute red hot joint: exclude infection, then crystal.'],
    ['婦兒鏈', 'gynec/o 婦科 → hCG 人類絨毛膜促性腺激素 → ectopic pregnancy 異位妊娠 → ultrasound 超音波', 'abdominal pain in reproductive age: check hCG.'],
    ['精神鏈', 'psych/o 精神 → mood 情緒 → mania 躁症 → psychosis 精神病症狀 → safety assessment 安全評估', 'psychiatry starts with safety and timeline.']
  ];

  const abbrev = {
    ABG: 'arterial blood gas，動脈血液氣體分析',
    ACS: 'acute coronary syndrome，急性冠心症',
    ACTH: 'adrenocorticotropic hormone，促腎上腺皮質激素',
    ADH: 'antidiuretic hormone，抗利尿激素',
    AF: 'atrial fibrillation，心房顫動',
    AFB: 'acid-fast bacilli，抗酸菌',
    AKI: 'acute kidney injury，急性腎損傷',
    ALP: 'alkaline phosphatase，鹼性磷酸酶',
    ALT: 'alanine aminotransferase，丙胺酸轉胺酶',
    ANA: 'antinuclear antibody，抗核抗體',
    ARB: 'angiotensin receptor blocker，血管張力素受體阻斷劑',
    ARDS: 'acute respiratory distress syndrome，急性呼吸窘迫症候群',
    AST: 'aspartate aminotransferase，天門冬胺酸轉胺酶',
    AV: 'atrioventricular，房室',
    BNP: 'B-type natriuretic peptide，B型利鈉胜肽',
    BUN: 'blood urea nitrogen，血中尿素氮',
    CBC: 'complete blood count，全血球計數',
    CK: 'creatine kinase，肌酸激酶',
    CKD: 'chronic kidney disease，慢性腎臟病',
    CLL: 'chronic lymphocytic leukemia，慢性淋巴性白血病',
    CML: 'chronic myeloid leukemia，慢性骨髓性白血病',
    CNS: 'central nervous system，中樞神經系統',
    COPD: 'chronic obstructive pulmonary disease，慢性阻塞性肺病',
    CRP: 'C-reactive protein，C反應蛋白',
    CSF: 'cerebrospinal fluid，腦脊髓液',
    CT: 'computed tomography，電腦斷層',
    CTPA: 'CT pulmonary angiography，肺動脈電腦斷層血管攝影',
    DIC: 'disseminated intravascular coagulation，瀰漫性血管內凝血',
    DKA: 'diabetic ketoacidosis，糖尿病酮酸中毒',
    DVT: 'deep vein thrombosis，深部靜脈栓塞',
    ECG: 'electrocardiogram，心電圖',
    EKG: 'electrocardiogram，心電圖',
    ESR: 'erythrocyte sedimentation rate，紅血球沉降速率',
    FEV1: 'forced expiratory volume in 1 second，一秒用力呼氣量',
    GCS: 'Glasgow Coma Scale，格拉斯哥昏迷指數',
    GFR: 'glomerular filtration rate，腎絲球過濾率',
    GGT: 'gamma-glutamyl transferase，γ-麩胺醯轉移酶',
    Hb: 'hemoglobin，血紅素',
    HbA1c: 'glycated hemoglobin，糖化血色素',
    HCO3: 'bicarbonate，碳酸氫根',
    HFrEF: 'heart failure with reduced ejection fraction，射出分率降低型心衰竭',
    HFpEF: 'heart failure with preserved ejection fraction，射出分率保留型心衰竭',
    HIV: 'human immunodeficiency virus，人類免疫缺乏病毒',
    INR: 'international normalized ratio，國際標準化比值',
    IV: 'intravenous，靜脈內',
    JVP: 'jugular venous pressure，頸靜脈壓',
    LMN: 'lower motor neuron，下運動神經元',
    MCA: 'middle cerebral artery，中大腦動脈',
    MCV: 'mean corpuscular volume，平均紅血球體積',
    MRI: 'magnetic resonance imaging，磁振造影',
    NST: 'non-stress test，無壓力試驗',
    PaCO2: 'arterial carbon dioxide pressure，動脈二氧化碳分壓',
    PaO2: 'arterial oxygen pressure，動脈氧分壓',
    PE: 'pulmonary embolism，肺栓塞',
    PEF: 'peak expiratory flow，尖峰呼氣流速',
    PFT: 'pulmonary function test，肺功能檢查',
    PT: 'prothrombin time，凝血酶原時間',
    PTT: 'partial thromboplastin time，部分凝血活酶時間',
    RA: 'rheumatoid arthritis，類風濕性關節炎',
    RAAS: 'renin-angiotensin-aldosterone system，腎素-血管張力素-醛固酮系統',
    SABA: 'short-acting beta agonist，短效乙二型交感神經促效劑',
    LABA: 'long-acting beta agonist，長效乙二型交感神經促效劑',
    SAMA: 'short-acting muscarinic antagonist，短效抗蕈毒鹼藥',
    LAMA: 'long-acting muscarinic antagonist，長效抗蕈毒鹼藥',
    SGLT2: 'sodium-glucose cotransporter 2，第二型鈉-葡萄糖共同運輸蛋白',
    SIADH: 'syndrome of inappropriate antidiuretic hormone，不適當抗利尿激素分泌症候群',
    SLE: 'systemic lupus erythematosus，全身性紅斑性狼瘡',
    SpO2: 'peripheral oxygen saturation，周邊血氧飽和度',
    STEMI: 'ST-elevation myocardial infarction，ST段上升型心肌梗塞',
    SVR: 'systemic vascular resistance，全身血管阻力',
    TIA: 'transient ischemic attack，暫時性腦缺血發作',
    TSH: 'thyroid-stimulating hormone，甲狀腺刺激素',
    UMN: 'upper motor neuron，上運動神經元',
    UTI: 'urinary tract infection，泌尿道感染',
    VQ: 'ventilation-perfusion，通氣/灌流',
    WBC: 'white blood cell，白血球'
  };
  window.medicalAbbrev = abbrev;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  }

  window.speakMedicalEnglish = function (text) {
    if (!('speechSynthesis' in window)) {
      alert('此瀏覽器不支援語音朗讀。');
      return;
    }
    speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    utter.rate = 0.82;
    utter.pitch = 1;
    speechSynthesis.speak(utter);
  };

  function speakButton(text) {
    return `<button class="tiny-btn" onclick="speakMedicalEnglish('${esc(text).replace(/&#39;/g, "\\'")}')">▶ 發音</button>`;
  }

  function termCard(row, type) {
    return `<div class="lecture-card">
      <div class="section-head"><h3>${esc(row[0])}</h3>${speakButton(row[0].replace(/[/-].*$/, ''))}</div>
      <p><strong>英文意義：</strong>${esc(row[1])}</p>
      <p><strong>中文解析：</strong>${esc(row[2])}</p>
      <p><strong>例字：</strong>${esc(row[3])}</p>
      <p><strong>連鎖記憶：</strong>${esc(row[4])}</p>
      <span class="tag">${type}</span>
    </div>`;
  }

  function abbrevCards() {
    return Object.entries(abbrev).map(([k, v]) => `<div class="lecture-card">
      <div class="section-head"><h3>${esc(k)}</h3>${speakButton(k)}</div>
      <p>${esc(v)}</p>
    </div>`).join('');
  }

  renderEnglish = function () {
    const chapterTerms = chapters.flatMap(ch => ch.english.map(w => [w, 'chapter keyword', '章節高頻英文', `${w}｜${ch.system}`, `先用 ${ch.system} 的位置與機制記 ${w}`]));
    document.getElementById('english').innerHTML = `
      <div class="section">
        <div class="section-head"><h2>醫學英文</h2><span class="tag">${prefixRoots.length + roots.length + suffixes.length + chapterTerms.length}字根字首字尾・${Object.keys(abbrev).length}縮寫解析</span></div>
        <div class="two-col">
          <div class="lecture-card">
            <h3>英文朗讀器</h3>
            <p class="muted">輸入或貼上英文單字、片語、句子，使用瀏覽器內建語音朗讀。</p>
            <textarea id="speechBox" style="width:100%;min-height:110px;border:1px solid var(--line);border-radius:var(--radius);padding:10px">The patient presents with acute chest pain and dyspnea. ECG and troponin should be checked immediately.</textarea>
            <div class="hero-actions"><button class="primary" onclick="speakMedicalEnglish(document.getElementById('speechBox').value)">▶ 朗讀英文</button><button class="tiny-btn" onclick="speechSynthesis && speechSynthesis.cancel()">停止</button></div>
          </div>
          <div class="lecture-card">
            <h3>連鎖記憶法</h3>
            <p>字首定方向，字根定器官，字尾定狀態。看到專業英文先拆三層，再回到人體位置與國考機制。</p>
            <div class="ordered-flow">${['Prefix 字首：方向/程度', 'Root 字根：器官/組織', 'Suffix 字尾：疾病/檢查/處置', 'Case 病例：把字拆回臨床', 'Exam 國考：抓陷阱與下一步'].map((x,i)=>`<div class="flow-step"><span class="step-num">${i+1}</span>${x}</div>`).join('')}</div>
          </div>
        </div>
      </div>
      <div class="section"><div class="section-head"><h2>字首 Prefix</h2><span class="tag">${prefixRoots.length}個</span></div><div class="lecture-grid">${prefixRoots.map(r=>termCard(r, 'Prefix')).join('')}</div></div>
      <div class="section"><div class="section-head"><h2>字根 Root</h2><span class="tag">${roots.length}個</span></div><div class="lecture-grid">${roots.map(r=>termCard(r, 'Root')).join('')}</div></div>
      <div class="section"><div class="section-head"><h2>字尾 Suffix</h2><span class="tag">${suffixes.length}個</span></div><div class="lecture-grid">${suffixes.map(r=>termCard(r, 'Suffix')).join('')}</div></div>
      <div class="section"><div class="section-head"><h2>章節英文關鍵字</h2><span class="tag">雙語呈現</span></div><div class="lecture-grid">${chapterTerms.map(r=>termCard(r, 'Chapter')).join('')}</div></div>
      <div class="section"><div class="section-head"><h2>連鎖記憶 Chains</h2><span class="tag">${chainMemory.length}條</span></div><div class="lecture-grid">${chainMemory.map(c=>`<div class="lecture-card"><div class="section-head"><h3>${esc(c[0])}</h3>${speakButton(c[2])}</div><p><strong>記憶鏈：</strong>${esc(c[1])}</p><p><strong>English sentence：</strong>${esc(c[2])}</p></div>`).join('')}</div></div>
      <div class="section"><div class="section-head"><h2>專業英文縮寫解析</h2><span class="tag">全 APP hover 解析</span></div><div class="lecture-grid">${abbrevCards()}</div></div>`;
    annotateMedicalAbbrev(document.getElementById('english'));
  };

  function annotateMedicalAbbrev(root = document.body) {
    if (!root || !root.querySelectorAll) return;
    const keys = Object.keys(abbrev).sort((a, b) => b.length - a.length);
    const re = new RegExp(`\\b(${keys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`, 'g');
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const p = node.parentElement;
        if (!p || ['SCRIPT', 'STYLE', 'TEXTAREA', 'ABBR', 'BUTTON'].includes(p.tagName)) return NodeFilter.FILTER_REJECT;
        return re.test(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.slice(0, 1200).forEach(node => {
      re.lastIndex = 0;
      const frag = document.createDocumentFragment();
      let last = 0;
      node.nodeValue.replace(re, (m, _g, offset) => {
        if (offset > last) frag.appendChild(document.createTextNode(node.nodeValue.slice(last, offset)));
        const ab = document.createElement('abbr');
        ab.textContent = m;
        ab.title = abbrev[m];
        ab.className = 'abbr-tip';
        frag.appendChild(ab);
        last = offset + m.length;
      });
      if (last < node.nodeValue.length) frag.appendChild(document.createTextNode(node.nodeValue.slice(last)));
      node.parentNode.replaceChild(frag, node);
    });
  }
  window.annotateMedicalAbbrev = annotateMedicalAbbrev;

  const style = document.createElement('style');
  style.textContent = '.abbr-tip{border-bottom:1px dotted #0f8b8d;color:#075e60;font-weight:800;cursor:help}.abbr-tip::after{content:"";}';
  document.head.appendChild(style);

  function wrapRender(fnName) {
    const old = window[fnName] || eval(`typeof ${fnName} !== "undefined" ? ${fnName} : undefined`);
    if (typeof old !== 'function') return;
    window[fnName] = function (...args) {
      const out = old.apply(this, args);
      annotateMedicalAbbrev(document.body);
      return out;
    };
    try { eval(`${fnName} = window[fnName]`); } catch (_e) {}
  }
  ['renderHome', 'renderBody', 'renderLecture', 'renderDisease', 'renderPharm', 'renderPbl', 'renderAnki', 'renderEnglish', 'renderWrong', 'renderTasks'].forEach(wrapRender);

  renderEnglish();
  annotateMedicalAbbrev(document.body);
})();

