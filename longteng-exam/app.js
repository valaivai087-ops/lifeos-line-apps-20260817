const library=window.LIBRARY;
const units=document.getElementById('units');
let unit=1,mode='compare',zoom=100;
const pages={teacher:0,answer:0};
const pad=n=>String(n).padStart(2,'0');
for(let i=1;i<=15;i++){const b=document.createElement('button');b.innerHTML=`<span class="num">${pad(i)}</span><span>Unit ${pad(i)}</span>`;b.onclick=()=>setUnit(i);units.append(b)}
document.getElementById('totals').textContent=`15 單元 · ${library.files.length} 原檔 · ${library.documents.reduce((n,d)=>n+d.pages.length,0)} 頁`;
function currentDoc(kind){return library.documents.find(d=>d.unit===unit&&d.kind===kind)}
function setUnit(n){stopSpeech();unit=n;pages.teacher=0;pages.answer=0;render();updateHash()}
function updateHash(){history.replaceState(null,'',`#unit=${unit}&view=${mode}`)}
function render(){
 document.getElementById('title').textContent=`Unit ${pad(unit)}`;
 [...units.children].forEach((b,i)=>{b.classList.toggle('active',i+1===unit);if(i+1===unit)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')});
 document.querySelectorAll('[data-mode]').forEach(b=>{const active=b.dataset.mode===mode;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});
 const reader=document.getElementById('reader');reader.replaceChildren();reader.classList.remove('compare');
 reader.append(makeDoc());
 document.getElementById('previous').disabled=unit===1;document.getElementById('next').disabled=unit===15;
 document.getElementById('position').textContent=`第 ${unit} / 15 單元 · 原版完整收錄`;
 applyZoom();
}
function makeOriginalDoc(){
 const doc=library.merged.find(d=>d.unit===unit),section=document.createElement('section');section.className='document exam-document';
 section.innerHTML=`<div class="document-bar"><div class="doc-title">Unit ${pad(unit)} · 每題後附解析教師考卷<small>${doc.examPages.length} 頁</small></div><div class="downloads"><a href="files/unit-${pad(unit)}-inline.docx" download>下載可編輯 Word ↓</a></div></div><p class="reading-help">每題後已附答案與解析。點選英文，字旁會出現發音按鈕。</p>`;
 doc.examPages.forEach((page,index)=>{
  const block=document.createElement('div');block.className='merged-page';block.innerHTML=`<div class="page-caption">第 ${index+1} / ${doc.examPages.length} 頁 · 教師考卷含逐題解析</div><div class="paper-scroll"><div class="exam-sheet"><img class="paper" src="${page.image}" width="${page.width}" height="${page.height}" alt="Unit ${unit} 逐題解析教師考卷第 ${index+1} 頁"></div></div>`;
  const sheet=block.querySelector('.exam-sheet');
  for(const word of page.speechWords){
   const spot=document.createElement('span');spot.className='word-spot';spot.tabIndex=0;spot.setAttribute('role','button');spot.setAttribute('aria-label','選擇英文：'+word.text);spot.style.cssText=`left:${word.x}%;top:${word.y}%;width:${word.w}%;height:${word.h}%;`;
   const popup=document.createElement('span');popup.className='word-popup';if(word.x>75)popup.classList.add('align-right');
   const label=document.createElement('strong');label.textContent=word.text;popup.append(label);
   for(const [cls,title,content] of [['word-play','♪ 單字發音',word.text],['sentence-play','▶ 句子發音',word.sentence]]){const button=document.createElement('button');button.className=cls;button.textContent=title;button.setAttribute('aria-label',title+'：'+content);button.onclick=e=>{e.stopPropagation();speakEnglish(content,cls==='word-play'?word.text:'這一句')};popup.append(button);}
   spot.append(popup);const select=()=>{document.querySelectorAll('.word-spot.selected').forEach(x=>x.classList.remove('selected'));spot.classList.add('selected')};spot.onclick=select;spot.onkeydown=e=>{if(e.target!==spot)return;if(e.key==='Enter'||e.key===' '){e.preventDefault();select()}if(e.key==='Escape')spot.classList.remove('selected')};sheet.append(spot);
  }
  section.append(block);
 });return section;
}
let speechRun=0;
function speechStatus(text){document.getElementById('speech-status').textContent=text}
function stopSpeech(){speechRun++;if('speechSynthesis' in window)window.speechSynthesis.cancel();const button=document.getElementById('pause-speech');if(button)button.textContent='暫停';speechStatus('點選考卷英文，再按單字或句子發音。')}
function englishOnly(text){return (text.match(/[A-Za-z0-9][A-Za-z0-9\s.,!?;:'’“”()—–%\-]*/g)||[]).filter(s=>/[A-Za-z]/.test(s)).join(' ').replace(/\s+/g,' ').trim()}
function speakEnglish(text,label){
 stopSpeech();if(!('speechSynthesis' in window)){speechStatus('此瀏覽器不支援朗讀，請以 Edge 或 Chrome 開啟。');return;}
 const clean=englishOnly(text);if(!clean){speechStatus('沒有可朗讀的英文。');return;}
 const run=speechRun;const chunks=clean.match(/.{1,180}(?:\s|$)|.{1,180}/g)||[clean];let i=0;
 function next(){if(run!==speechRun)return;if(i>=chunks.length){speechStatus('朗讀完成');return;}const utterance=new SpeechSynthesisUtterance(chunks[i++]);utterance.lang='en-US';utterance.rate=Number(document.getElementById('speech-rate').value);const voice=speechSynthesis.getVoices().find(v=>v.lang==='en-US')||speechSynthesis.getVoices().find(v=>v.lang.startsWith('en'));if(voice)utterance.voice=voice;utterance.onend=next;utterance.onerror=e=>{if(run===speechRun&&e.error!=='canceled'&&e.error!=='interrupted')speechStatus('朗讀未能播放，請檢查裝置英文語音及音量，再試一次。')};speechStatus(`正在朗讀${label} · ${i} / ${chunks.length}`);speechSynthesis.speak(utterance);}next();
}
function applyZoom(){document.querySelectorAll('.exam-sheet').forEach(el=>el.style.width=zoom+'%');document.getElementById('zoom-label').value=zoom+'%';document.getElementById('zoom-out').disabled=zoom<=75;document.getElementById('zoom-in').disabled=zoom>=200}
document.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>{mode=b.dataset.mode;render();updateHash()});
document.getElementById('zoom-in').onclick=()=>{zoom=Math.min(200,zoom+25);applyZoom()};document.getElementById('zoom-out').onclick=()=>{zoom=Math.max(75,zoom-25);applyZoom()};document.getElementById('reset').onclick=()=>{zoom=100;applyZoom()};
document.getElementById('previous').onclick=()=>setUnit(unit-1);document.getElementById('next').onclick=()=>setUnit(unit+1);
function readHash(){const p=new URLSearchParams(location.hash.slice(1)),n=Number(p.get('unit'));if(Number.isInteger(n)&&n>=1&&n<=15)unit=n;mode='compare';pages.teacher=0;pages.answer=0;render()}
document.getElementById('stop-speech').onclick=stopSpeech;document.getElementById('pause-speech').onclick=()=>{if(!('speechSynthesis' in window))return;if(speechSynthesis.paused){speechSynthesis.resume();document.getElementById('pause-speech').textContent='暫停'}else if(speechSynthesis.speaking){speechSynthesis.pause();document.getElementById('pause-speech').textContent='繼續'}};addEventListener('beforeunload',()=>{if('speechSynthesis' in window)speechSynthesis.cancel()});addEventListener('hashchange',()=>{stopSpeech();readHash()});readHash();

function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function makeDoc(){
 const root=document.createElement('section');root.className='sentence-document';
 const gs=SENTENCE_DATA[String(unit)]||[];
 const toolbar=document.createElement('div');toolbar.className='sentence-menu';toolbar.innerHTML='<strong>原題型・逐句中英解析</strong><select aria-label="選擇題型"><option value="all">全部題型（依原卷順序）</option>'+gs.map((g,i)=>`<option value="${i}">${esc(g.title)}</option>`).join('')+'</select><button class="original-toggle">查看完整原卷與其他題型</button>';root.append(toolbar);
 const content=document.createElement('div');root.append(content);
 function paint(){content.replaceChildren();gs.forEach((g,i)=>{if(toolbar.querySelector('select').value!=='all'&&toolbar.querySelector('select').value!==String(i))return;const sec=document.createElement('section');sec.className='type-section';sec.innerHTML=`<h2>${esc(g.title)}</h2>`;
 g.rows.forEach(r=>{const row=document.createElement('article');row.className='sentence-row';row.innerHTML=`<div class="english-line">${r.html}</div><div class="chinese-line">${esc(r.zh)}</div>${r.notes.map(n=>`<div class="explanation-line"><b>第 ${n.number} 題解析：</b>${esc(n.text)}</div>${n.options?`<div class="question-options">${esc(n.options)}</div>`:''}`).join('')}`;const play=document.createElement('button');play.className='inline-play';play.textContent='▶ 英文朗讀';play.onclick=()=>speakEnglish(r.en,'這一句');row.append(play);sec.append(row)});
 if(g.visual){const note=document.createElement('p');note.className='visual-note';note.textContent='本題含原始圖表，請點上方「查看完整原卷與其他題型」對照。';sec.append(note)}
 g.questions.forEach(q=>{const row=document.createElement('article');row.className='question-row';q.html.forEach((h,j)=>{const line=document.createElement('div');line.className='english-line';line.innerHTML=h;row.append(line);const play=document.createElement('button');play.className='inline-play';play.textContent='▶ 朗讀';play.onclick=()=>speakEnglish(q.paragraphs[j],'題目');row.append(play)});const note=document.createElement('div');note.className='explanation-line';note.innerHTML='<b>本題解析：</b>'+esc((q.explanations||[]).slice(1).join(' '));row.append(note);sec.append(row)});content.append(sec)})}
 toolbar.querySelector('select').onchange=paint;
 const mixedIndex=gs.findIndex(g=>g.title.includes('混合題'));if(mixedIndex>=0){const jump=document.createElement('button');jump.className='mixed-shortcut';jump.textContent='混合題（文章＋題目）';jump.onclick=()=>{toolbar.querySelector('select').value=String(mixedIndex);paint();toolbar.scrollIntoView({block:'start'})};toolbar.append(jump)}
 const original=document.createElement('div');original.hidden=true;root.append(original);toolbar.querySelector('button').onclick=()=>{if(!original.children.length)original.append(makeOriginalDoc());original.hidden=!original.hidden;content.hidden=!original.hidden;toolbar.querySelector('button').textContent=original.hidden?'查看完整原卷與其他題型':'回到逐句中英解析'};if(new URLSearchParams(location.search).get("section")==="mixed" && mixedIndex>=0)toolbar.querySelector("select").value=String(mixedIndex);paint();return root;
}
