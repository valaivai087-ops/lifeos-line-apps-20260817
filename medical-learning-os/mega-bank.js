(function () {
  const diseaseVariants = ['典型','急性','慢性','重症','輕症','復發性','難治型','兒童','老年','妊娠相關','免疫低下','術後','藥物誘發','感染相關','代謝相關','血管相關','自體免疫','退化性','遺傳性','併發症型'];
  const diseaseAngles = ['診斷路徑','病理生理','國考陷阱','病例推理','鑑別診斷','急症處置','慢性追蹤','併發症','檢驗判讀','影像判讀','治療選擇','預後評估','照護重點','高危族群','復發預防'];
  const pharmVariants = ['一線','二線','急救','長期控制','禁忌判斷','副作用判讀','交互作用','腎功能調整','肝功能調整','孕婦注意','兒童注意','老年注意','監測指標','中毒處理','停藥策略'];
  const pharmAngles = ['作用位置','作用機制','臨床用途','副作用','禁忌','國考陷阱','病例選藥','檢驗監測','用藥前評估','用藥後追蹤','疾病連結','急性期角色','慢性期角色','替代藥物','安全警訊'];
  const fallbackDiseases = ['感染','發炎','阻塞','缺血','出血','腫瘤','退化','自體免疫','代謝異常','藥物副作用','先天異常','急性衰竭','慢性衰竭','疼痛症候群','功能失調'];
  const fallbackDrugs = ['抗發炎藥','抗感染藥','止痛藥','荷爾蒙治療','免疫調節藥','急救藥物','慢性控制藥','抗凝血藥','支持療法','標靶治療','症狀緩解藥','預防用藥','替代療法','營養補充','監測策略'];

  function uniq(xs) { return [...new Set(xs.filter(Boolean))]; }
  function seedsFor(ch, field, fallback) {
    const fromItems = field === 'diseases' ? diseases.filter(x => x.chapter === ch.id).map(x => x.name) : drugs.filter(x => x.chapter === ch.id).map(x => x.name);
    return uniq([...(ch[field] || []), ...fromItems, ...fallback]);
  }
  function concept(ch, i) { return (ch.concepts && ch.concepts[i % ch.concepts.length]) || ch.system; }
  function makeDisease(ch, seeds, i) {
    const base = seeds[i % seeds.length];
    const variant = diseaseVariants[Math.floor(i / seeds.length) % diseaseVariants.length];
    const angle = diseaseAngles[i % diseaseAngles.length];
    const keyConcept = concept(ch, i);
    return {
      no: i + 1,
      name: `${variant}${base}｜${angle}`,
      normal: `${ch.location}在正常狀態下維持${keyConcept}，讓器官功能與全身穩態保持平衡。`,
      cause: `${base}可由感染、血管、免疫、代謝、退化、腫瘤、藥物或結構異常造成；此節點聚焦${variant}情境。`,
      mechanism: `先定位到${ch.location}，再把${keyConcept}失衡連到症狀、檢查、診斷與治療。`,
      symptoms: `常見表現包含疼痛、發燒、功能下降、器官衰竭、出血、阻塞、神經症狀或代謝異常，需依時間軸判讀。`,
      tests: `依序使用生命徵象、理學檢查、基礎檢驗、影像、功能測試與必要時侵入性檢查確認。`,
      treatment: `急性期先穩定生命徵象與器官灌流，再處理病因；慢性期追蹤指標、預防併發症並建立長期控制。`,
      exam: `國考看到${base}要抓位置、時間軸、危險徵象、關鍵檢驗、第一步處置與常見陷阱。`,
      chapter: ch.id
    };
  }
  function makePharm(ch, seeds, i) {
    const base = seeds[i % seeds.length];
    const variant = pharmVariants[Math.floor(i / seeds.length) % pharmVariants.length];
    const angle = pharmAngles[i % pharmAngles.length];
    const keyConcept = concept(ch, i);
    return {
      no: i + 1,
      name: `${base}｜${variant}${angle}`,
      site: `${ch.location}相關受體、酵素、離子通道、運輸蛋白、免疫路徑或代謝路徑。`,
      mechanism: `${base}透過改變${keyConcept}相關路徑影響病理生理；此節點聚焦${variant}使用情境與${angle}。`,
      adverse: `副作用需從作用機制推理，特別注意過敏、出血、低血壓、腎肝毒性、電解質、中樞症狀、感染與代謝異常。`,
      contraindication: `用藥前先看懷孕、年齡、腎功能、肝功能、過敏史、交互作用、生命徵象與急症禁忌。`,
      use: `用於${ch.system}相關疾病的急性處置、長期控制、症狀緩解、併發症預防或替代治療。`,
      trap: `國考常考${base}的錯誤時機、錯誤禁忌、漏掉監測、與相似藥物混淆。`,
      chapter: ch.id
    };
  }

  window.megaBank = Object.fromEntries(chapters.map(ch => {
    const diseaseSeeds = seedsFor(ch, 'diseases', fallbackDiseases);
    const drugSeeds = seedsFor(ch, 'drugs', fallbackDrugs);
    return [ch.id, {
      diseases: Array.from({ length: 300 }, (_, i) => makeDisease(ch, diseaseSeeds, i)),
      pharm: Array.from({ length: 300 }, (_, i) => makePharm(ch, drugSeeds, i))
    }];
  }));

  function chips(kind, activeId) {
    const fn = kind === 'disease' ? 'showMegaDisease' : 'showMegaPharm';
    return `<div class="chips">${chapters.map(c => `<button class="chip ${c.id===activeId?'active':''}" onclick="${fn}('${c.id}')">${c.system}</button>`).join('')}</div>`;
  }
  function diseaseCards(chapterId) {
    const ch = chapters.find(c => c.id === chapterId) || chapters[0];
    const rows = window.megaBank[ch.id].diseases;
    return `<div class="section-head"><h2>${ch.system}｜300疾病主題</h2><span class="tag">${rows.length}筆</span></div><div class="lecture-grid">${rows.map(d => `<div class="lecture-card"><h3>${d.no}. ${d.name}</h3><p><strong>正常生理：</strong>${d.normal}</p><p><strong>病因：</strong>${d.cause}</p><p><strong>機制：</strong>${d.mechanism}</p><p><strong>症狀：</strong>${d.symptoms}</p><p><strong>檢查：</strong>${d.tests}</p><p><strong>治療：</strong>${d.treatment}</p><p><strong>國考考點：</strong>${d.exam}</p></div>`).join('')}</div>`;
  }
  function pharmCards(chapterId) {
    const ch = chapters.find(c => c.id === chapterId) || chapters[0];
    const rows = window.megaBank[ch.id].pharm;
    return `<div class="section-head"><h2>${ch.system}｜300藥理主題</h2><span class="tag">${rows.length}筆</span></div><div class="lecture-grid">${rows.map(d => `<div class="lecture-card"><h3>${d.no}. ${d.name}</h3><p><strong>作用位置：</strong>${d.site}</p><p><strong>作用機制：</strong>${d.mechanism}</p><p><strong>副作用：</strong>${d.adverse}</p><p><strong>禁忌：</strong>${d.contraindication}</p><p><strong>臨床用途：</strong>${d.use}</p><p><strong>國考陷阱：</strong>${d.trap}</p></div>`).join('')}</div>`;
  }

  renderDiseaseCards = function (chapter) { return diseaseCards(chapter || activeChapter || chapters[0].id); };
  renderDrugCards = function (chapter) { return pharmCards(chapter || activeChapter || chapters[0].id); };
  window.showMegaDisease = function (id) {
    activeChapter = id;
    document.getElementById('disease').innerHTML = `<div class="section"><div class="section-head"><h2>疾病地圖</h2><span class="tag">每模組300疾病主題</span></div>${chips('disease', id)}</div><div class="section">${diseaseCards(id)}</div>`;
    navTo('disease');
  };
  window.showMegaPharm = function (id) {
    activeChapter = id;
    document.getElementById('pharm').innerHTML = `<div class="section"><div class="section-head"><h2>藥理地圖</h2><span class="tag">每模組300藥理主題</span></div>${chips('pharm', id)}</div><div class="section">${pharmCards(id)}</div>`;
    navTo('pharm');
  };
  renderDisease = function () { showMegaDisease(activeChapter || chapters[0].id); };
  renderPharm = function () { showMegaPharm(activeChapter || chapters[0].id); };

  const oldDaily = dailyContent;
  dailyContent = function (ch = chapters.find(c => c.id === activeChapter)) {
    return `${oldDaily(ch)}<div class="section"><h2>${ch.system}｜300疾病完整索引</h2>${diseaseCards(ch.id)}</div><div class="section"><h2>${ch.system}｜300藥理完整索引</h2>${pharmCards(ch.id)}</div>`;
  };
  const oldBody = renderBody;
  renderBody = function () {
    oldBody();
    document.getElementById('body').innerHTML += `<div class="section"><div class="section-head"><h2>全模組最大化資料量</h2><span class="tag">${chapters.length * 300}疾病主題・${chapters.length * 300}藥理主題</span></div><div class="grid">${chapters.map(c => `<button class="card" onclick="showMegaDisease('${c.id}')"><span class="card-title"><span>${c.system}</span>${icons.disease}</span><p>疾病300筆，藥理300筆，依位置、機制、檢查、治療與國考陷阱整理。</p><div class="metric"><strong>600</strong><span>主題節點</span></div></button>`).join('')}</div></div>`;
  };
  const oldSearch = renderSearch;
  renderSearch = function (term) {
    if (!term.trim()) { renderHome(); return; }
    const t = term.toLowerCase();
    const found = [];
    for (const ch of chapters) {
      const bank = window.megaBank[ch.id];
      for (const d of bank.diseases) if ((d.name + d.exam + d.mechanism).toLowerCase().includes(t)) found.push({ title: d.name, body: `${ch.system}｜${d.exam}`, action: `showMegaDisease('${ch.id}')` });
      for (const p of bank.pharm) if ((p.name + p.mechanism + p.trap).toLowerCase().includes(t)) found.push({ title: p.name, body: `${ch.system}｜${p.trap}`, action: `showMegaPharm('${ch.id}')` });
      if (found.length > 80) break;
    }
    if (!found.length) return oldSearch(term);
    document.getElementById('home').innerHTML = `<div class="section"><div class="section-head"><h2>大型資料庫搜尋結果</h2><span class="tag">顯示前${found.length}筆</span></div><div class="lecture-grid">${found.map(r=>`<button class="lecture-card" onclick="${r.action}"><h3>${r.title}</h3><p>${r.body}</p></button>`).join('')}</div></div>`;
    navTo('home');
  };

  renderBody();
  renderLecture();
  renderDisease();
  renderPharm();
  renderAnki();
  renderTasks();
})();

