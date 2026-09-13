const data=window.APP_DATA,$=id=>document.getElementById(id);let selected='all',current=data[0];
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
data.forEach(u=>{const o=document.createElement('option');o.value=u.id;o.textContent=u.id+' · '+u.title;$('lesson').append(o)});
function pairHTML(p,i,question=false){return `<article class="pair"><div class="pair-top"><span>${question?'題目與選項':'中英對照'} · ${String(i+1).padStart(2,'0')}</span><button class="speak" type="button">▶ 朗讀</button></div><p class="en" lang="en">${esc(p.en)}</p><p class="zh">${esc(p.zh)}</p>${p.answer?`<p class="answer"><span class="answer-label">答案：</span><strong class="answer-value">${esc(p.answer)}</strong></p>`:''}</article>`;}
function render(){const previousCategory=current.sections[Number(selected)]?.category;current=data.find(u=>u.id===$('lesson').value)||data[0];const nextIndex=current.sections.findIndex(s=>s.category===previousCategory);selected=String(nextIndex<0?0:nextIndex);renderQuestionPaper();$('paper-link').href=`downloads/${current.id}-teacher.pdf`;$('unit-label').textContent=current.id+' · 教師卷 × 解答與中譯';$('unit-title').textContent=current.title;['merged','teacher','answers'].forEach(k=>$(k).href=`downloads/${current.id}-${k}.docx`);$('categories').innerHTML=current.sections.map((s,i)=>`<button data-cat="${i}" class="${selected===String(i)?'active':''}" aria-pressed="${selected===String(i)}">${esc(s.category)}</button>`).join('');
$('content').innerHTML=current.sections.map((s,i)=>`<section class="section" data-index="${i}"><h3 class="section-title">${esc(s.category)}</h3>${s.note?`<p class="notice">${esc(s.note)}</p>`:''}${s.pairs.map((p,n)=>pairHTML(p,n)).join('')}${s.questions?.length?'<h4>題目與選項對照</h4>'+s.questions.map((p,n)=>pairHTML(p,n,true)).join(''):''}<details class="source"><summary>查看本題型原題與答案</summary><h4>教師卷原題</h4><pre>${esc(s.sourceTeacher.join('\n'))}</pre><h4>原卷解答</h4><pre>${esc((s.sourceAnswer||[]).join('\n'))}</pre></details></section>`).join('');
$('search').value='';filter();history.replaceState(null,'','#'+current.id);}
function filter(){const q=$('search').value.trim().toLowerCase();let visible=0;document.querySelectorAll('.native-section').forEach(s=>{s.hidden=selected!==s.dataset.index||!s.textContent.toLowerCase().includes(q);if(!s.hidden)visible++});$('count').textContent=current.sections[Number(selected)]?.category||'';$('empty').hidden=visible>0;}
$('lesson').onchange=()=>{stopReading();render()};$('search').oninput=filter;$('categories').onclick=e=>{const b=e.target.closest('button');if(!b)return;stopReading();selected=b.dataset.cat;document.querySelectorAll('#categories button').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b))});filter();$('main').scrollIntoView({behavior:'smooth'})};
$('toggle').onclick=()=>{const hidden=document.body.classList.toggle('hidden-zh');$('toggle').textContent=hidden?'顯示中文':'隱藏中文';$('toggle').setAttribute('aria-pressed',String(hidden))};$('stop').onclick=stopReading;$('print').onclick=()=>window.print();
let activeSpeech=null;
function stopReading(){if('speechSynthesis' in window)speechSynthesis.cancel();activeSpeech=null;document.querySelectorAll('.speak').forEach(b=>{b.textContent='▶ 朗讀';b.setAttribute('aria-pressed','false')});$('speech-status').textContent='已停止朗讀';}
document.body.addEventListener('click',e=>{const b=e.target.closest('.speak');if(!b)return;if(!('speechSynthesis'in window)){ $('speech-status').textContent='此瀏覽器不支援朗讀，請使用 Edge、Chrome 或 Safari。';return}
stopReading();const u=new SpeechSynthesisUtterance(b.closest('.pair').dataset.spoken||b.closest('.pair').querySelector('.en').textContent);u.lang='en-US';u.rate=Number($('rate').value);const voices=speechSynthesis.getVoices();const voice=voices.find(v=>v.lang==='en-US')||voices.find(v=>/^en[-_]/i.test(v.lang));if(voice)u.voice=voice;activeSpeech=u;b.textContent='◼ 朗讀中';b.setAttribute('aria-pressed','true');$('speech-status').textContent='正在朗讀英文…';
const finish=message=>{if(activeSpeech!==u)return;activeSpeech=null;b.textContent='▶ 朗讀';b.setAttribute('aria-pressed','false');$('speech-status').textContent=message};u.onend=()=>finish('朗讀完成');u.onerror=e=>finish(e.error==='canceled'||e.error==='interrupted'?'已停止朗讀':'無法播放英文，請確認裝置已安裝英文語音後再試。');speechSynthesis.speak(u)});

function formatOriginal(line){
let answer='';const prefix=line.match(/^([A-Za-z][A-Za-z -]*?)\s+(?=\d+\.\s)/);
if(prefix){answer=prefix[1].trim();line=line.slice(prefix[0].length);}
let text=esc(line);
if(answer){
 const blank=/[A-Za-z]*　{2,}[A-Za-z]*/;
 if(blank.test(text))text=text.replace(blank,`<strong class="teacher-answer inline-answer">${esc(answer)}</strong>`);
 else text+=` <strong class="teacher-answer">${esc(answer)}</strong>`;
}
text=text.replace(/([（(])\s*([A-J](?:\s+[A-J])*)\s*([）)])(?=\s*\d+\.)/,'$1<strong class="teacher-answer">$2</strong>$3');
text=text.replace(/　{2,}([A-Za-z]+(?:[ ;]+[A-Za-z]+)*)[　 ]{2,}/g,'<strong class="teacher-answer inline-answer">$1</strong>');
return text;
}
function sentenceHTML(p,markup){return `<article class="pair sentence-pair" data-spoken="${esc(p.en)}"><p class="en" lang="en">${markup||esc(p.en)}</p><div class="sentence-under"><button class="speak" type="button">▶ 英文朗讀</button><p class="zh">${esc(p.zh)}</p></div></article>`;}
function renderQuestionPaper(){
const notes=window.QUESTION_NOTES[current.id].notes;
const sentenceTypes=['綜合測驗','文意選填','篇章結構','閱讀測驗','混合題'];
$('teacher-pages').innerHTML=current.sections.map((section,index)=>{
 const marked=window.ANSWER_MARKUP[current.id][section.category];
 const figures=(window.ORIGINAL_FIGURES[current.id]?.[section.category]||[]).map(f=>`<figure class="original-visual"><img src="${f.src}" alt="${current.id} 原版第 ${f.page} 頁圖表與題目" loading="lazy"><figcaption>原版圖表與題目 · 第 ${f.page} 頁（保持原比例）</figcaption></figure>`).join('');
 const sourceHTML=section.sourceTeacher.map((line,i)=>`<div class="original-line">${(marked.source[i]||formatOriginal(line)).replace(/　{2,}/g,m=>`<span class="answer-blank">${m}</span>`).replace(/ {2,}(\d+\.) {2,}/g,' <span class="answer-blank">　$1　</span> ')}</div>${notes.filter(n=>n.category===section.category&&n.after===i).map(note=>`<div class="question-note"><h4>${esc(note.label.replace(/｜答案\s+[A-J](?:\s+[A-J])*\s*·?\s*/g,'｜'))}</h4>${note.pairs.map((p,j)=>pairHTML({...p,answer:null},j)).join('')}</div>`).join('')}`).join('');
 if(sentenceTypes.includes(section.category))return `<section class="native-section" data-index="${index}"><h3>${esc(section.category)}</h3>${figures}${section.pairs.map((p,i)=>sentenceHTML(p,marked.pairs[i])).join('')}${section.questions?.length?'<h4>題目與選項</h4>'+section.questions.map((p,i)=>sentenceHTML(p,marked.questions[i])).join(''):''}</section>`;
 return `<section class="native-section" data-index="${index}"><h3>${esc(section.category)}</h3>${sourceHTML}</section>`;
}).join('');
}
const id=location.hash.slice(1);if(data.some(x=>x.id===id))$('lesson').value=id;render();
