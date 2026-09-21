(function () {
  const examAxes = ['解剖定位','正常生理','病理生理','症狀線索','危險徵象','檢驗判讀','影像判讀','診斷標準','第一步處置','急症處理','慢性追蹤','併發症','用藥選擇','禁忌陷阱','病例推理','錯題模型','鑑別診斷','預後評估','特殊族群','國考整合'];
  const diseaseModes = ['典型','非典型','急性','慢性','重症','輕症','復發性','難治型','兒童','老年','妊娠','免疫低下','術後','藥物誘發','感染相關','血管相關','代謝相關','自體免疫','腫瘤相關','遺傳相關','併發症型','急診型','住院型','門診型'];
  const drugModes = ['作用位置','作用機制','一線治療','二線治療','急救用途','長期控制','副作用','禁忌','交互作用','腎功能調整','肝功能調整','孕婦注意','兒童注意','老年注意','監測指標','中毒處理','停藥策略','替代藥物','病例選藥','國考陷阱'];
  const labModes = ['正常值','升高意義','降低意義','急症警訊','慢性追蹤','偽陽性','偽陰性','採檢陷阱','與藥物連結','與疾病連結'];
  const qTypes = ['基礎題','理解題','整合題','病例題','國考題','圖片題','推理題','檢驗題','安全題','臨床題'];

  const seed = {
    cardio: {
      diseases: ['高血壓','急性冠心症','心肌梗塞','穩定型心絞痛','不穩定型心絞痛','心衰竭','HFpEF','HFrEF','心房顫動','心室頻脈','心室顫動','SVT','房室傳導阻滯','主動脈剝離','心包填塞','急性心包炎','心肌炎','感染性心內膜炎','二尖瓣狹窄','二尖瓣逆流','主動脈瓣狹窄','主動脈瓣逆流','肥厚型心肌病','擴張型心肌病','限制型心肌病','肺高壓','深部靜脈栓塞','周邊動脈疾病','靜脈曲張','心因性休克'],
      drugs: ['ACE inhibitor','ARB','ARNI','Beta blocker','Dihydropyridine CCB','Non-DHP CCB','Thiazide','Loop diuretic','Spironolactone','Nitrate','Hydralazine','Aspirin','Clopidogrel','Ticagrelor','Heparin','LMWH','Warfarin','DOAC','Statin','Ezetimibe','Amiodarone','Adenosine','Digoxin','Atropine','Epinephrine','Norepinephrine','Dobutamine','Nitroprusside','SGLT2 inhibitor','Vasopressin'],
      labs: ['ECG','Troponin','CK-MB','BNP','NT-proBNP','Echo EF','CXR心影','Lipid profile','D-dimer','Lactate','Blood pressure','Pulse pressure','JVP','ABI','INR']
    },
    resp: {
      diseases: ['氣喘','COPD','肺炎','非典型肺炎','吸入性肺炎','肺結核','肺栓塞','氣胸','張力性氣胸','肋膜積液','ARDS','急性呼吸衰竭','慢性呼吸衰竭','肺纖維化','支氣管擴張','睡眠呼吸中止','肺癌','肺水腫','肺膿瘍','過敏性肺炎','肺高壓','囊性纖維化','新生兒呼吸窘迫','上呼吸道阻塞','喉頭水腫','肺不張','矽肺','石綿肺','肉芽腫病','咳血'],
      drugs: ['SABA','LABA','ICS','LAMA','SAMA','Leukotriene antagonist','Theophylline','Systemic steroid','Magnesium sulfate','Epinephrine nebulization','Oxygen','NIV','Mechanical ventilation','Surfactant','Ceftriaxone','Azithromycin','Levofloxacin','Piperacillin-tazobactam','Vancomycin','Oseltamivir','RIPE therapy','Anticoagulant','Thrombolytic','Mucolytic','Antitussive','Antihistamine','Decongestant','Montelukast','Roflumilast','Pulmonary rehab'],
      labs: ['ABG pH','PaO2','PaCO2','HCO3','A-a gradient','SpO2','Peak flow','FEV1/FVC','DLCO','CXR','Chest CT','Sputum culture','AFB smear','D-dimer','CTPA']
    },
    renal: {
      diseases: ['急性腎損傷','慢性腎病','腎前性氮血症','急性腎小管壞死','腎後阻塞','腎病症候群','腎炎症候群','IgA nephropathy','RPGN','膜性腎病','微小變化病','FSGS','糖尿病腎病變','高血壓腎病變','高鉀血症','低鉀血症','低鈉血症','高鈉血症','代謝性酸中毒','代謝性鹼中毒','尿路結石','腎盂腎炎','膀胱炎','腎小管酸中毒','多囊腎','尿毒症','橫紋肌溶解','SIADH','尿崩症','腎動脈狹窄'],
      drugs: ['Loop diuretic','Thiazide','Spironolactone','Amiloride','Acetazolamide','Mannitol','ACE inhibitor','ARB','SGLT2 inhibitor','Erythropoietin','Iron','Phosphate binder','Vitamin D analog','Sodium bicarbonate','Calcium gluconate','Insulin glucose','Albuterol for K','Kayexalate','Patiromer','Desmopressin','Vaptan','Normal saline','Balanced crystalloid','Dialysis','Tamsulosin','Allopurinol','NSAID avoidance','Antibiotics UTI','Steroid nephritis','Cyclophosphamide'],
      labs: ['Creatinine','eGFR','BUN','BUN/Cr','Urine Na','FENa','FEUrea','Urine osm','Serum osm','Urinalysis','Proteinuria','Albumin/Cr ratio','Potassium','Sodium','Anion gap']
    },
    neuro: {
      diseases: ['缺血性中風','出血性中風','TIA','蛛網膜下腔出血','癲癇','癲癇重積','偏頭痛','張力型頭痛','叢發性頭痛','帕金森病','阿茲海默症','血管性失智','多發性硬化','GBS','重症肌無力','Lambert-Eaton','周邊神經病變','腦膜炎','腦炎','腦膿瘍','顱內壓升高','脊髓壓迫','ALS','Bell palsy','三叉神經痛','暈眩','譫妄','昏迷','正常壓力水腦','腦腫瘤'],
      drugs: ['Aspirin','Clopidogrel','tPA','Levetiracetam','Valproate','Carbamazepine','Phenytoin','Lamotrigine','Topiramate','Benzodiazepine','Levodopa','Carbidopa','Dopamine agonist','MAO-B inhibitor','COMT inhibitor','Donepezil','Rivastigmine','Memantine','Triptan','Ergotamine','NSAID headache','Steroid pulse','Interferon beta','IVIG','Plasmapheresis','Pyridostigmine','Mannitol','Hypertonic saline','Ceftriaxone meningitis','Acyclovir'],
      labs: ['Noncontrast CT','CTA','MRI DWI','EEG','CSF WBC','CSF glucose','CSF protein','Opening pressure','NIHSS','Mini-mental status','B12','TSH','Glucose','Na','EMG/NCS']
    },
    gi: {
      diseases: ['GERD','Barrett esophagus','食道癌','消化性潰瘍','胃癌','胃出口阻塞','急性胃腸炎','腸阻塞','闌尾炎','發炎性腸病','Crohn disease','Ulcerative colitis','大腸癌','憩室炎','缺血性腸炎','膽囊炎','膽管炎','膽結石','總膽管結石','急性胰臟炎','慢性胰臟炎','B型肝炎','C型肝炎','酒精性肝病','脂肪肝','肝硬化','肝癌','門脈高壓','上消化道出血','肝腦病變'],
      drugs: ['PPI','H2 blocker','Antacid','Sucralfate','Bismuth','Clarithromycin','Amoxicillin','Metronidazole','Ondansetron','Metoclopramide','Loperamide','Lactulose','Polyethylene glycol','5-ASA','Steroid IBD','Azathioprine','Anti-TNF','Lactulose HE','Rifaximin','Octreotide','Ceftriaxone SBP','Ursodeoxycholic acid','Pancreatic enzyme','Tenofovir','Entecavir','DAA HCV','Vitamin K','Albumin','Nonselective beta blocker','Diuretics ascites'],
      labs: ['AST','ALT','ALP','GGT','Total bilirubin','Direct bilirubin','Albumin','INR','Ammonia','Lipase','Amylase','H. pylori test','FOBT','AFP','Abdominal ultrasound']
    },
    endo: {
      diseases: ['第一型糖尿病','第二型糖尿病','DKA','HHS','低血糖','糖尿病腎病變','糖尿病視網膜病變','甲狀腺亢進','Graves disease','甲狀腺低下','Hashimoto thyroiditis','甲狀腺風暴','黏液水腫昏迷','甲狀腺結節','Cushing syndrome','Addison disease','嗜鉻細胞瘤','原發性高醛固酮症','高鈣血症','低鈣血症','副甲狀腺亢進','骨質疏鬆','SIADH','尿崩症','肢端肥大症','泌乳素瘤','肥胖症','代謝症候群','痛風代謝','多囊性卵巢症候群'],
      drugs: ['Insulin rapid','Insulin basal','Metformin','Sulfonylurea','DPP-4 inhibitor','GLP-1 agonist','SGLT2 inhibitor','TZD','Acarbose','Glucagon','Methimazole','PTU','Radioiodine','Levothyroxine','Beta blocker thyroid','Hydrocortisone','Fludrocortisone','Ketoconazole Cushing','Spironolactone endocrine','Bisphosphonate','Calcitonin','Cinacalcet','Calcium supplement','Vitamin D','Desmopressin','Vaptan','Dopamine agonist','Somatostatin analog','Orlistat','Lifestyle therapy'],
      labs: ['Glucose','HbA1c','Ketone','Anion gap','TSH','Free T4','T3','Anti-TPO','TRAb','Cortisol','ACTH','Aldosterone renin ratio','Calcium','Phosphate','PTH']
    },
    heme: {
      diseases: ['缺鐵性貧血','慢性病貧血','巨球性貧血','B12 deficiency','Folate deficiency','溶血性貧血','G6PD deficiency','再生不良性貧血','地中海型貧血','鐮刀型貧血','DIC','ITP','TTP','HUS','血友病A','血友病B','von Willebrand disease','DVT','PE','急性白血病','AML','ALL','CML','CLL','淋巴瘤','Hodgkin lymphoma','Non-Hodgkin lymphoma','多發性骨髓瘤','中性球低下發燒','腫瘤溶解症候群'],
      drugs: ['Iron','Folic acid','Vitamin B12','Erythropoietin','Heparin','LMWH','Warfarin','DOAC','Aspirin','Clopidogrel','tPA','Vitamin K','Protamine','PCC','Platelet transfusion','FFP','Cryoprecipitate','Rituximab','Steroid ITP','IVIG','Hydroxyurea','Imatinib','Allopurinol','Rasburicase','G-CSF','Chemotherapy principle','Checkpoint inhibitor','CAR-T concept','Antiemetic chemo','Tumor lysis prevention'],
      labs: ['CBC','MCV','Reticulocyte','Ferritin','TIBC','B12','Folate','LDH','Haptoglobin','Indirect bilirubin','PT','aPTT','INR','D-dimer','Peripheral smear']
    },
    immune: {
      diseases: ['敗血症','感染性休克','肺炎','泌尿道感染','蜂窩性組織炎','壞死性筋膜炎','腦膜炎','感染性心內膜炎','腹內感染','骨髓炎','HIV','AIDS opportunistic infection','流感','COVID-19','結核病','梅毒','淋病','披衣菌感染','SLE','類風濕性關節炎','血管炎','ANCA vasculitis','過敏性休克','蕁麻疹','移植排斥','免疫缺乏','發燒待查','補體缺乏','藥物熱','院內感染'],
      drugs: ['Penicillin','Ampicillin','Amoxicillin','Cefazolin','Ceftriaxone','Cefepime','Carbapenem','Vancomycin','Daptomycin','Linezolid','Aminoglycoside','Macrolide','Doxycycline','Fluoroquinolone','TMP-SMX','Metronidazole','Clindamycin','Azole antifungal','Amphotericin B','Echinocandin','Acyclovir','Oseltamivir','ART regimen','Steroid','Methotrexate','Hydroxychloroquine','TNF inhibitor','IL-6 inhibitor','Epinephrine','IVIG'],
      labs: ['CBC differential','CRP','ESR','Blood culture','Urine culture','Sputum culture','Lactate','Procalcitonin','HIV Ag/Ab','CD4 count','Viral load','ANA','Anti-dsDNA','C3/C4','RF/anti-CCP']
    },
    msk: {
      diseases: ['痛風','偽痛風','類風濕性關節炎','退化性關節炎','感染性關節炎','僵直性脊椎炎','乾癬性關節炎','反應性關節炎','骨質疏鬆','髖部骨折','脊椎壓迫性骨折','骨髓炎','肌炎','皮肌炎','橫紋肌溶解','纖維肌痛','下背痛','椎間盤突出','腕隧道症候群','肩旋轉肌撕裂','蜂窩性組織炎','濕疹','乾癬','藥疹','SJS/TEN','蕁麻疹','帶狀疱疹','壓瘡','黑色素瘤','基底細胞癌'],
      drugs: ['NSAID','Acetaminophen','Colchicine','Allopurinol','Febuxostat','Probenecid','Steroid injection','Systemic steroid','Methotrexate','Sulfasalazine','Hydroxychloroquine','TNF inhibitor','IL-17 inhibitor','Bisphosphonate','Denosumab','Teriparatide','Vitamin D','Calcium','Antibiotics osteomyelitis','Muscle relaxant','Opioid principle','Topical steroid','Topical antifungal','Antihistamine','Retinoid','Phototherapy','Urate-lowering therapy','PPI gastroprotection','Capsaicin','Local anesthetic'],
      labs: ['ESR','CRP','Uric acid','Synovial WBC','Synovial crystals','CK','Aldolase','RF','Anti-CCP','ANA','HLA-B27','X-ray','MRI','DEXA','Skin biopsy']
    },
    repro: {
      diseases: ['子癲前症','子癲症','HELLP syndrome','妊娠糖尿病','異位妊娠','流產','前置胎盤','胎盤早期剝離','產後出血','早產','胎兒窘迫','羊水栓塞','PCOS','子宮內膜異位症','骨盆腔炎','卵巢扭轉','卵巢癌','子宮頸癌','子宮內膜癌','乳癌','不孕症','停經','細支氣管炎','川崎病','兒童脫水','小兒發燒','新生兒黃疸','先天性心臟病','兒童氣喘','疫苗反應'],
      drugs: ['Magnesium sulfate','Oxytocin','Methotrexate ectopic','Misoprostol','Carboprost','Combined OCP','Progestin','GnRH agonist','Clomiphene','Letrozole','Antibiotics PID','Rho(D) immune globulin','Insulin pregnancy','Labetalol pregnancy','Nifedipine pregnancy','Betamethasone fetal lung','Surfactant newborn','Pediatric acetaminophen','Ibuprofen pediatric','Oral rehydration solution','Vitamin K newborn','Vaccines','Azithromycin chlamydia','Ceftriaxone gonorrhea','Iron pregnancy','Folic acid pregnancy','Emergency contraception','Tamoxifen','Aromatase inhibitor','HPV vaccine'],
      labs: ['β-hCG','Transvaginal ultrasound','Urine protein','Platelet pregnancy','AST/ALT HELLP','NST','BPP','GBS screen','Pap smear','HPV test','CA-125','Growth curve','Bilirubin newborn','Pediatric electrolytes','Vaccine schedule']
    },
    psych: {
      diseases: ['重鬱症','持續性憂鬱症','雙相一型','雙相二型','躁症','輕躁症','思覺失調症','妄想症','廣泛性焦慮症','恐慌症','社交焦慮','強迫症','創傷後壓力症','急性壓力症','失眠症','酒精使用障礙','酒精戒斷','鴉片使用障礙','鎮靜安眠藥戒斷','譫妄','失智症行為症狀','進食障礙','厭食症','暴食症','人格障礙','ADHD','自閉症類群','自殺風險','藥物誘發精神病','身心症'],
      drugs: ['SSRI','SNRI','TCA','MAOI','Bupropion','Mirtazapine','Trazodone','Lithium','Valproate','Carbamazepine','Lamotrigine','Haloperidol','Risperidone','Olanzapine','Quetiapine','Clozapine','Benzodiazepine','Buspirone','Z-drug','Melatonin','Stimulant','Atomoxetine','Naltrexone','Acamprosate','Disulfiram','Methadone','Buprenorphine','Naloxone','Nicotine replacement','ECT'],
      labs: ['MSE','PHQ-9','GAD-7','Suicide assessment','CIWA-Ar','Urine toxicology','Lithium level','Valproate level','TSH','B12','RPR','HIV','Cognitive screen','Sleep diary','Metabolic monitoring']
    }
  };

  function cfg(ch) { return seed[ch.id] || seed.cardio; }
  function pick(xs, i) { return xs[i % xs.length]; }
  function concept(ch, i) { return pick(ch.concepts || [ch.system], i); }

  const boardKnowledge = [];
  const boardDiseases = [];
  const boardDrugs = [];
  const boardLabs = [];
  const boardQuestions = [];

  for (const ch of chapters) {
    const s = cfg(ch);
    for (let i = 0; i < 50; i++) {
      const axis = pick(examAxes, i);
      const key = concept(ch, i);
      const disease = pick(s.diseases, i);
      boardKnowledge.push({
        name: `${ch.system}｜${axis}｜${key}`,
        plain: `${axis}不是單一名詞，而是把${key}放回${ch.location}的功能地圖。`,
        location: ch.location,
        function: `用${key}解釋正常功能、失衡方向與臨床表現。`,
        mechanism: `從${ch.flow.join(' → ')}中定位斷點，再連到${disease}的病理生理。`,
        why: `這是${ch.system}國考題把基礎醫學連到臨床決策的常見入口。`,
        exam: `看到${disease}先抓${axis}，再判斷第一步檢查與第一步處置。`,
        trap: `常見陷阱是只背診斷名稱，沒有回到位置、功能、機制與時間軸。`,
        case: `${ch.case} 此病例可用${axis}重新拆解。`,
        memory: `${ch.system}先定位，再機制，再處置。`,
        chapter: ch.id
      });
    }
    for (let i = 0; i < 120; i++) {
      const disease = pick(s.diseases, i);
      const mode = pick(diseaseModes, i);
      const axis = pick(examAxes, i);
      boardDiseases.push({
        name: `${mode}${disease}｜${axis}`,
        normal: `${ch.location}維持${concept(ch, i)}，讓${ch.system}在正常狀態下穩定運作。`,
        cause: `${disease}可由感染、血管、免疫、代謝、退化、腫瘤、藥物、創傷或遺傳因素引起；此節點聚焦${mode}型。`,
        mechanism: `核心機制是${concept(ch, i)}失衡，沿著${ch.flow.join(' → ')}產生臨床表現。`,
        symptoms: `依嚴重度出現疼痛、功能下降、發燒、出血、阻塞、低灌流、神經症狀或代謝異常。`,
        tests: `${pick(s.labs, i)}為主要線索，並依題幹搭配生命徵象、影像、培養、功能測試或侵入性檢查。`,
        treatment: `急性期先處理危險徵象與器官功能，穩定後依病因治療並安排追蹤與預防。`,
        exam: `國考常考${disease}的${axis}：先定位，再抓關鍵檢驗，最後選最安全的下一步。`,
        chapter: ch.id
      });
    }
    for (let i = 0; i < 100; i++) {
      const drug = pick(s.drugs, i);
      const mode = pick(drugModes, i);
      boardDrugs.push({
        name: `${drug}｜${mode}`,
        site: `${ch.location}中的受體、酵素、離子通道、運輸蛋白、免疫或代謝路徑。`,
        mechanism: `${drug}透過改變${concept(ch, i)}相關路徑達到治療效果。`,
        adverse: `副作用從作用機制推理，注意過敏、出血、腎肝毒性、電解質、低血壓、感染與中樞症狀。`,
        contraindication: `用藥前檢查懷孕、年齡、腎肝功能、過敏史、交互作用、生命徵象與急症禁忌。`,
        use: `用於${ch.system}相關疾病的急性處置、長期控制、症狀緩解、預防併發症或替代治療。`,
        trap: `國考常把${drug}放在錯誤時機、禁忌病人、漏掉監測或與相似藥物混淆。`,
        chapter: ch.id
      });
    }
    for (let i = 0; i < 40; i++) {
      const lab = pick(s.labs, i);
      const mode = pick(labModes, i);
      boardLabs.push({
        name: `${lab}｜${mode}`,
        normal: `依實驗室與年齡族群判讀；先確認單位、採檢條件與臨床情境。`,
        high: `${lab}升高時要回到${ch.system}的${concept(ch, i)}失衡，並分辨急性危險與慢性變化。`,
        low: `${lab}降低時要考慮消耗、流失、製造不足、稀釋、藥物影響或採檢誤差。`,
        meaning: `${lab}在國考常用來連結${pick(s.diseases, i)}、治療選擇與下一步檢查。`,
        chapter: ch.id
      });
    }
    for (let i = 0; i < 80; i++) {
      const disease = pick(s.diseases, i);
      const drug = pick(s.drugs, i);
      const lab = pick(s.labs, i);
      const type = pick(qTypes, i);
      const correct = `${lab}與${concept(ch, i)}定位`;
      boardQuestions.push({
        type,
        stem: `${ch.system}${type}：病人出現${disease}相關線索，下一步最應先抓哪個核心？`,
        options: [correct, `直接背${drug}名稱`, '只看單一症狀不定位', '忽略生命徵象與危險徵象'],
        answer: 0,
        why: `${disease}題目要先用${lab}與${concept(ch, i)}定位，才能決定檢查與處置。`,
        wrong: `只背藥名或單一症狀會漏掉機制、嚴重度與安全風險。`,
        avoid: `先定位，再判斷正常生理如何失衡，最後選下一步。`,
        related: ch.system,
        disease,
        drug
      });
    }
  }

  knowledge.push(...boardKnowledge);
  diseases.push(...boardDiseases);
  drugs.push(...boardDrugs);
  questions.push(...boardQuestions);
  window.labs = [...(window.labs || []), ...boardLabs];

  window.boardExamStats = {
    addedKnowledge: boardKnowledge.length,
    addedDiseases: boardDiseases.length,
    addedDrugs: boardDrugs.length,
    addedLabs: boardLabs.length,
    addedQuestions: boardQuestions.length
  };

  const oldRenderBodyBoard = renderBody;
  renderBody = function () {
    oldRenderBodyBoard();
    document.getElementById('body').innerHTML += `<div class="section"><div class="section-head"><h2>國考內容最大化資料庫</h2><span class="tag">${knowledge.length}知識點・${diseases.length}疾病・${drugs.length}藥物・${window.labs.length}檢驗・${questions.length}題</span></div><div class="grid">${chapters.map(c => `<button class="card" onclick="selectChapter('${c.id}')"><span class="card-title"><span>${c.system}</span>${icons.book}</span><p>本模組含國考知識點、疾病、藥理、檢驗、病例題與推理題。</p><div class="metric"><strong>${diseases.filter(d=>d.chapter===c.id).length}</strong><span>疾病節點</span></div></button>`).join('')}</div></div>`;
  };
})();
