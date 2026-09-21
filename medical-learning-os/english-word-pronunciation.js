(function () {
  const examples = [
    ['hypertension','高血壓','hyper-高 + tension壓力','Hypertension increases cardiovascular risk.'],
    ['hypoglycemia','低血糖','hypo-低 + glyc糖 + emia血液狀態','Hypoglycemia can cause sweating and confusion.'],
    ['tachycardia','心搏過速','tachy-快 + cardia心','Tachycardia may be caused by fever or shock.'],
    ['bradycardia','心搏過慢','brady-慢 + cardia心','Bradycardia can cause dizziness or syncope.'],
    ['dyspnea','呼吸困難','dys-困難 + pnea呼吸','Dyspnea is a key symptom in heart failure.'],
    ['apnea','無呼吸','a-無 + pnea呼吸','Apnea may occur during sleep.'],
    ['antibiotic','抗生素','anti-對抗 + biotic生命','Antibiotics should match the infection source.'],
    ['autoimmune','自體免疫','auto-自己 + immune免疫','Autoimmune disease can affect multiple organs.'],
    ['endocarditis','心內膜炎','endo-內 + card心 + itis炎','Endocarditis can cause fever and a new murmur.'],
    ['pericarditis','心包膜炎','peri-周圍 + card心 + itis炎','Pericarditis often causes sharp chest pain.'],
    ['intravenous','靜脈內','intra-內 + venous靜脈','Intravenous fluids may be needed in shock.'],
    ['extracellular','細胞外','extra-外 + cellular細胞','Potassium shifts between intracellular and extracellular spaces.'],
    ['polyuria','多尿','poly-多 + uria尿','Polyuria is common in uncontrolled diabetes.'],
    ['oliguria','少尿','oligo-少 + uria尿','Oliguria suggests decreased kidney perfusion.'],
    ['pancytopenia','全血球低下','pan-全 + cyto細胞 + penia少','Pancytopenia suggests bone marrow failure.'],
    ['cardiology','心臟學','cardi/o心 + logy學問','Cardiology focuses on heart and vascular disease.'],
    ['angiography','血管攝影','angi/o血管 + graphy攝影','Coronary angiography can identify arterial blockage.'],
    ['hematuria','血尿','hem/o血 + uria尿','Hematuria requires urinary tract evaluation.'],
    ['pneumonia','肺炎','pneum/o肺 + ia狀態','Pneumonia can cause fever, cough, and hypoxemia.'],
    ['bronchitis','支氣管炎','bronch/o支氣管 + itis炎','Bronchitis causes cough and airway inflammation.'],
    ['alveolar','肺泡的','alveol/o肺泡 + ar形容詞','Alveolar disease impairs gas exchange.'],
    ['nephritis','腎炎','nephr/o腎 + itis炎','Nephritis may cause hematuria and proteinuria.'],
    ['urology','泌尿學','ur/o尿 + logy學問','Urology evaluates the urinary tract.'],
    ['hepatitis','肝炎','hepat/o肝 + itis炎','Hepatitis raises AST and ALT.'],
    ['cholestasis','膽汁鬱積','chol/e膽汁 + stasis停滯','Cholestasis can cause jaundice and itching.'],
    ['gastritis','胃炎','gastr/o胃 + itis炎','Gastritis may cause epigastric pain.'],
    ['enteritis','腸炎','enter/o腸 + itis炎','Enteritis often causes diarrhea.'],
    ['neuropathy','神經病變','neur/o神經 + pathy病','Diabetic neuropathy causes numbness and pain.'],
    ['encephalitis','腦炎','encephal/o腦 + itis炎','Encephalitis can cause fever and altered mental status.'],
    ['hyperglycemia','高血糖','hyper-高 + glyc糖 + emia血液狀態','Hyperglycemia can lead to dehydration.'],
    ['thyroiditis','甲狀腺炎','thyroid/o甲狀腺 + itis炎','Thyroiditis can alter thyroid hormone levels.'],
    ['osteoporosis','骨質疏鬆','oste/o骨 + porosis多孔狀態','Osteoporosis increases fracture risk.'],
    ['arthritis','關節炎','arthr/o關節 + itis炎','Arthritis causes joint pain and swelling.'],
    ['dermatitis','皮膚炎','derm/o皮膚 + itis炎','Dermatitis causes itchy inflamed skin.'],
    ['psychosis','精神病症狀','psych/o精神 + osis狀態','Psychosis requires safety assessment.'],
    ['thrombosis','血栓形成','thromb/o血栓 + osis狀態','Deep vein thrombosis can cause leg swelling.'],
    ['bacteremia','菌血症','bacter細菌 + emia血液狀態','Bacteremia may progress to sepsis.'],
    ['proteinuria','蛋白尿','protein蛋白 + uria尿','Proteinuria suggests kidney damage.'],
    ['hepatomegaly','肝腫大','hepato肝 + megaly腫大','Hepatomegaly can occur in liver disease.'],
    ['leukopenia','白血球低下','leuko白 + penia減少','Leukopenia increases infection risk.'],
    ['colonoscopy','大腸鏡','colon大腸 + scopy檢視','Colonoscopy can detect colorectal cancer.'],
    ['electrocardiogram','心電圖','electro電 + cardio心 + gram紀錄','An electrocardiogram is essential in chest pain.']
  ];

  const groups = {
    'hyper-': ['hypertension','hyperglycemia','hyperkalemia','hypernatremia','hyperthyroidism','hypercapnia','hyperlipidemia','hypercalcemia','hyperplasia','hyperreflexia'],
    'hypo-': ['hypoglycemia','hypoxemia','hypotension','hypokalemia','hyponatremia','hypothyroidism','hypocalcemia','hypovolemia','hypothermia','hypoperfusion'],
    'tachy-': ['tachycardia','tachypnea','tachyarrhythmia','supraventricular tachycardia','ventricular tachycardia','sinus tachycardia','tachyphylaxis','tachycardic','tachycardia-induced cardiomyopathy','tachypneic'],
    'brady-': ['bradycardia','bradypnea','bradyarrhythmia','sinus bradycardia','bradykinesia','bradyphrenia','bradycardic','bradypneic','bradycardia syndrome','fetal bradycardia'],
    'dys-': ['dyspnea','dysuria','dysphagia','dysarthria','dyspepsia','dysfunction','dysplasia','dyslipidemia','dysmenorrhea','dystonia'],
    'a- / an-': ['apnea','anuria','anemia','aphasia','asystole','anaphylaxis','anorexia','anosmia','anovulation','aseptic'],
    'anti-': ['antibiotic','antibody','anticoagulant','antiplatelet','antipyretic','antihistamine','antiemetic','antiviral','antifungal','antigen'],
    'cardi/o': ['cardiology','cardiomyopathy','cardiomegaly','myocardium','myocarditis','pericarditis','endocarditis','electrocardiogram','cardiogenic shock','cardiopulmonary'],
    'pneum/o': ['pneumonia','pneumothorax','pneumonitis','pneumonectomy','pneumococcal','pneumoconiosis','pneumoperitoneum','pneumomediastinum','pneumoniae','pneumology'],
    'nephr/o': ['nephritis','nephrology','nephropathy','glomerulonephritis','nephrotic syndrome','nephrectomy','nephrolithiasis','hydronephrosis','pyelonephritis','nephrotoxicity'],
    'hepat/o': ['hepatitis','hepatomegaly','hepatocyte','hepatotoxicity','hepatic encephalopathy','hepatocellular carcinoma','hepatology','heatorenal syndrome','hepatosplenomegaly','hepatobiliary'],
    'neur/o': ['neurology','neuropathy','neuron','neurotransmitter','neurogenic shock','neurotoxicity','neurodegeneration','neuromuscular','neuroimaging','neurosurgery'],
    '-itis': ['hepatitis','bronchitis','gastritis','enteritis','colitis','dermatitis','arthritis','meningitis','encephalitis','pancreatitis'],
    '-emia': ['hypoxemia','bacteremia','septicemia','hyperglycemia','hypoglycemia','hyperkalemia','hyponatremia','anemia','uremia','leukemia'],
    '-uria': ['polyuria','oliguria','anuria','hematuria','proteinuria','glycosuria','dysuria','nocturia','pyuria','bacteriuria'],
    '-pathy': ['neuropathy','nephropathy','myopathy','cardiomyopathy','encephalopathy','retinopathy','vasculopathy','coagulopathy','gastropathy','osteopathy']
  };

  const zh = Object.fromEntries(examples.map(x => [x[0], x]));
  function esc(s){return String(s ?? '').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
  function speak(text,label='▶ 發音'){return `<button class="tiny-btn" onclick='speakMedicalEnglish(${JSON.stringify(text)})'>${label}</button>`;}
  function explainWord(w) {
    const row = zh[w] || [w, '相關醫學單字', '請用字首/字根/字尾拆解後放回臨床情境', `The term ${w} is used in medical context.`];
    return row;
  }
  function tenExamplesFor(key) {
    const list = groups[key] || examples.map(x => x[0]);
    return list.slice(0, 10).map(explainWord);
  }
  function examplesTable(key) {
    return `<div class="table-wrap"><table class="compare-table"><thead><tr><th>例字</th><th>中文</th><th>拆字/記憶</th><th>例句</th><th>音文發音</th></tr></thead><tbody>${tenExamplesFor(key).map(r=>`<tr><td><strong>${esc(r[0])}</strong><br>${speak(r[0],'▶ 單字')}</td><td>${esc(r[1])}</td><td>${esc(r[2])}</td><td>${esc(r[3])}<br>${speak(r[3],'▶ 例句')}</td><td>${speak(`${r[0]}. ${r[3]}`,'▶ 單字+例句')}</td></tr>`).join('')}</tbody></table></div>`;
  }

  function upgradeEnglishCards(root) {
    if (!root) return;
    root.querySelectorAll('.lecture-card').forEach(card => {
      const h3 = card.querySelector('h3');
      if (!h3) return;
      const key = h3.textContent.trim();
      if (!groups[key] || card.dataset.wordExamples === '1') return;
      card.dataset.wordExamples = '1';
      const oldButtons = card.querySelectorAll('button');
      oldButtons.forEach(btn => btn.remove());
      card.insertAdjacentHTML('beforeend', `<h3>10個例字雙語發音</h3>${examplesTable(key)}`);
    });
  }
  window.upgradeEnglishCards = upgradeEnglishCards;

  const oldRenderEnglishMoreWords = renderEnglish;
  renderEnglish = function () {
    oldRenderEnglishMoreWords();
    upgradeEnglishCards(document.getElementById('english'));
  };
  const oldRenderLectureMoreWords = renderLecture;
  renderLecture = function () {
    oldRenderLectureMoreWords();
    upgradeEnglishCards(document.getElementById('lecture'));
  };

  renderEnglish();
  renderLecture();
})();
