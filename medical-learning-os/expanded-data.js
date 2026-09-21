(function () {
  const moreChapters = [
    { id:'neuro', system:'神經系統', one:'神經系統用電訊號與突觸傳遞整合感覺、運動、意識、語言、記憶與自主功能。', goals:['把病灶定位到皮質、腦幹、小腦、脊髓、周邊神經','用上運動神經元、下運動神經元、感覺路徑判讀症狀','把中風、癲癇、頭痛、失智放回神經網路'], location:'大腦皮質、基底核、丘腦、腦幹、小腦、脊髓、周邊神經與神經肌肉接合處', concepts:['病灶定位','神經傳導','突觸','上運動神經元','下運動神經元','顱內壓'], flow:['刺激輸入','感覺路徑上行','皮質整合','運動計畫','皮質脊髓束下行','神經肌肉接合','肌肉收縮'], causality:['血管阻塞','局部缺血','神經元能量失敗','局部神經功能缺損','偏癱或失語'], diseases:['缺血性中風','癲癇','帕金森病','阿茲海默症'], drugs:['Aspirin','Levetiracetam','Levodopa','Donepezil'], english:['lesion localization','aphasia','seizure','stroke','intracranial pressure'], exam:['中風先判斷時間、排除出血、確認血管區域','UMN有痙攣與反射亢進，LMN有萎縮與束顫','突然最嚴重頭痛要想SAH'], traps:['把所有暈眩都當內耳','忽略低血糖可模仿中風','只背藥名不看發作型態'], case:'72歲男性突然右側無力與說話不流利，發作90分鐘，血糖正常。', memory:'神經題三問：在哪裡、哪條路、急不急。', graph:['人體','大腦','皮質神經元','鈉通道','中風','Aspirin','CT','tPA'] },
    { id:'gi', system:'腸胃肝膽胰系統', one:'腸胃肝膽胰系統把食物轉成可吸收分子，並負責代謝、解毒、膽汁與血糖協調。', goals:['理解吞嚥、消化、吸收、蠕動、肝臟代謝','把腹痛定位到器官與腹膜刺激','能用肝功能、膽道酵素、胰酵素推理'], location:'口腔、食道、胃、小腸、大腸、肝臟、膽囊、胰臟、門脈系統', concepts:['蠕動','胃酸','吸收','門脈','膽汁','肝細胞損傷'], flow:['進食','胃酸與酵素消化','小腸吸收','門脈入肝','代謝解毒','膽汁排泄','糞便形成'], causality:['膽石阻塞膽囊管','膽囊壓力上升','發炎','右上腹痛','Murphy sign'], diseases:['消化性潰瘍','膽囊炎','急性胰臟炎','肝硬化'], drugs:['PPI','H. pylori三合一療法','Lactulose','Octreotide'], english:['peristalsis','jaundice','portal hypertension','pancreatitis','melena'], exam:['AST/ALT偏肝細胞，ALP/GGT偏膽道','胰臟炎看上腹痛放射背部與lipase','肝硬化併發腹水、靜脈曲張、肝腦病變'], traps:['只用腹痛位置猜病，不問時間與飲食關係','忽略NSAID造成潰瘍','把黃疸全部當肝炎'], case:'45歲男性暴飲暴食後上腹痛放射背部，噁心嘔吐，lipase上升。', memory:'腹痛先定位：空腔、實質、膽胰、腹膜。', graph:['人體','肝膽胰','肝細胞','膽紅素','胰臟炎','PPI','Lipase','ERCP'] },
    { id:'endo', system:'內分泌與代謝', one:'內分泌系統用荷爾蒙讓遠端器官同步調整血糖、壓力、代謝、生長與生殖。', goals:['掌握軸線回饋：下視丘、腦下垂體、目標腺體','把高低功能症狀連到荷爾蒙作用','能判讀糖尿病、甲狀腺、腎上腺急症'], location:'下視丘、腦下垂體、甲狀腺、副甲狀腺、腎上腺、胰島、性腺', concepts:['負回饋','胰島素','升糖素','TSH','Cortisol','DKA'], flow:['感測血糖或壓力','內分泌腺分泌荷爾蒙','血液運送','受體結合','基因或代謝改變','負回饋關閉訊號'], causality:['胰島素不足','脂肪分解','酮酸生成','代謝性酸中毒','Kussmaul呼吸'], diseases:['糖尿病酮酸中毒','甲狀腺風暴','Addison disease','Cushing syndrome'], drugs:['Insulin','Methimazole','Levothyroxine','Hydrocortisone'], english:['negative feedback','ketoacidosis','thyrotoxicosis','adrenal insufficiency','hypoglycemia'], exam:['DKA治療順序是補液、胰島素、鉀監測','TSH與free T4可分初級或中樞問題','類固醇不可突然停'], traps:['看到高血糖只給胰島素忘了鉀','忽略感染是DKA誘因','把TSH單獨解讀而不看T4'], case:'18歲女性多尿口渴、腹痛、深大呼吸，血糖高、anion gap上升、尿酮陽性。', memory:'內分泌題先畫軸線：上游、腺體、荷爾蒙、回饋。', graph:['人體','胰島','β細胞','胰島素受體','DKA','Insulin','Glucose','Potassium'] },
    { id:'heme', system:'血液腫瘤', one:'血液系統負責攜氧、止血、免疫細胞運輸；腫瘤是細胞增殖與死亡控制失衡。', goals:['用CBC拆成紅血球、白血球、血小板問題','理解凝血、抗凝、血栓與出血','建立貧血與癌症警訊推理'], location:'骨髓、血液、脾臟、淋巴結、凝血系統、腫瘤微環境', concepts:['貧血分類','MCV','凝血瀑布','血小板','腫瘤分期','轉移'], flow:['造血幹細胞','紅白血小板分化','血液循環','氧氣運輸與止血','老化細胞脾臟清除'], causality:['缺鐵','血紅素合成下降','小球性低色素貧血','疲倦與運動喘','Ferritin下降'], diseases:['缺鐵性貧血','DIC','深部靜脈栓塞','急性白血病'], drugs:['Iron','Heparin','Warfarin','DOAC'], english:['microcytic anemia','coagulation','thrombosis','metastasis','pancytopenia'], exam:['MCV先分類貧血','PT看外因性，aPTT看內因性','DIC同時出血與血栓'], traps:['看到貧血就補鐵，不找出血來源','忽略抗凝禁忌','把白血球高都當感染'], case:'55歲女性疲倦，Hb低、MCV低、Ferritin低，糞便潛血陽性。', memory:'CBC先三分：紅、白、板；貧血先看MCV。', graph:['人體','骨髓','造血幹細胞','鐵','缺鐵性貧血','Iron','Ferritin','Colonoscopy'] },
    { id:'immune', system:'免疫感染', one:'免疫系統辨識自己與非己；感染是病原、宿主免疫與抗微生物藥物之間的動態戰場。', goals:['區分先天免疫、適應性免疫與過敏反應','把發燒、白血球、培養與抗生素連成決策','能從感染部位選擇常見病原與用藥'], location:'皮膚黏膜、淋巴結、脾臟、骨髓、補體、T/B細胞、巨噬細胞', concepts:['發炎','抗原呈現','抗體','補體','敗血症','抗生素涵蓋'], flow:['病原入侵','先天免疫辨識','發炎介質釋放','抗原呈現','T/B細胞反應','清除或慢性感染'], causality:['感染失控','全身發炎','血管擴張與滲漏','低血壓','器官灌流不足'], diseases:['敗血症','肺炎','泌尿道感染','SLE'], drugs:['Ceftriaxone','Vancomycin','Piperacillin-tazobactam','Prednisolone'], english:['innate immunity','adaptive immunity','sepsis','culture','antimicrobial coverage'], exam:['敗血症要早期補液、培養、廣效抗生素','抗生素選擇看感染部位與常見病原','自體免疫常見多系統侵犯'], traps:['抗生素只背名字不背涵蓋範圍','等培養才治療敗血症','把CRP上升當成特定診斷'], case:'80歲男性發燒、意識混亂、血壓低、乳酸上升，尿液白血球陽性。', memory:'感染題三件事：部位、病原、涵蓋。', graph:['人體','免疫細胞','巨噬細胞','IL-6','敗血症','Ceftriaxone','Lactate','Blood culture'] },
    { id:'msk', system:'肌骨皮膚', one:'肌骨皮膚系統提供支撐、運動、防護與免疫屏障，病變常表現為痛、腫、弱、疹。', goals:['區分骨、關節、肌肉、神經與皮膚病灶','理解發炎性與退化性關節病','用皮疹形態連到感染、免疫、藥物與全身病'], location:'骨骼、關節、肌肉、肌腱、韌帶、皮膚表皮真皮、皮下組織', concepts:['關節炎','骨質疏鬆','肌肉發炎','皮疹形態','屏障','疼痛路徑'], flow:['機械負荷','組織微損傷','發炎或修復','疼痛與功能限制','復健或藥物調整'], causality:['尿酸結晶沉積','中性球發炎','急性關節紅腫熱痛','痛風發作'], diseases:['痛風','類風濕性關節炎','骨質疏鬆','蜂窩性組織炎'], drugs:['NSAIDs','Colchicine','Methotrexate','Bisphosphonate'], english:['arthritis','osteoporosis','cellulitis','rash morphology','synovitis'], exam:['RA常對稱小關節晨僵','痛風急性期NSAID/colchicine，降尿酸非急性止痛','骨鬆看骨折風險'], traps:['把單關節紅腫都當痛風，忘了 septic arthritis','類固醇止痛卻忽略感染','皮疹不描述形態'], case:'48歲男性半夜第一蹠趾關節劇痛紅腫，近期飲酒與海鮮。', memory:'關節題先問：幾個關節、急慢、對稱、發炎、有無感染。', graph:['人體','關節','滑膜細胞','尿酸結晶','痛風','Colchicine','Uric acid','Arthrocentesis'] },
    { id:'repro', system:'婦產兒科與生殖', one:'生殖與兒科系統把荷爾蒙、發育、懷孕、分娩與兒童成長連成一條時間軸。', goals:['理解月經週期、懷孕生理與胎兒監測','把兒童疾病放回年齡與發育階段','能處理產科急症與兒科紅旗'], location:'下視丘-腦下垂體-卵巢軸、子宮、胎盤、乳房、睪丸、兒童各發育系統', concepts:['月經週期','排卵','胎盤','產前檢查','兒童成長曲線','疫苗'], flow:['GnRH脈衝','FSH/LH','卵泡成熟','排卵','黃體期','內膜變化','懷孕或月經'], causality:['胎盤灌流異常','高血壓與蛋白尿','內皮損傷','子癲前症','母胎風險上升'], diseases:['子癲前症','異位妊娠','多囊性卵巢症候群','細支氣管炎'], drugs:['Magnesium sulfate','Oxytocin','Methotrexate','Combined OCP'], english:['preeclampsia','ectopic pregnancy','ovulation','growth curve','bronchiolitis'], exam:['育齡女性腹痛先驗孕','子癲前症看高血壓與蛋白尿/器官症狀','兒科用年齡決定常見病原'], traps:['忘記先排除懷孕','把孕婦高血壓當一般高血壓','兒童劑量與成人混用'], case:'29歲孕婦32週，頭痛、血壓160/105、尿蛋白陽性。', memory:'婦產題先問：有沒有懷孕、幾週、媽媽穩不穩、胎兒穩不穩。', graph:['人體','胎盤','滋養層細胞','血管內皮','子癲前症','MgSO4','Urine protein','Fetal monitoring'] },
    { id:'psych', system:'精神行為醫學', one:'精神醫學用症狀群、時間、功能受損與安全風險來理解情緒、思考、行為與物質使用。', goals:['用時間軸區分憂鬱、躁症、焦慮、精神病','評估自殺、他傷、失能與物質戒斷風險','把藥物機轉與副作用連到神經傳遞物質'], location:'大腦邊緣系統、前額葉、獎賞迴路、多巴胺/血清素/正腎上腺素路徑', concepts:['情緒症狀','精神病症狀','物質使用','自殺風險','治療聯盟','神經傳遞物質'], flow:['壓力或生物易感性','神經傳遞失衡','情緒/思考/睡眠改變','功能受損','安全評估','心理與藥物治療'], causality:['多巴胺路徑過度活化','妄想幻覺','現實檢驗受損','社會功能下降'], diseases:['重鬱症','雙相情緒障礙','思覺失調症','酒精戒斷'], drugs:['SSRI','Lithium','Antipsychotics','Benzodiazepines'], english:['major depression','mania','psychosis','withdrawal','suicidal ideation'], exam:['躁症病史會改變抗鬱藥策略','抗精神病藥注意EPS與代謝症候群','酒精戒斷可癲癇與DT'], traps:['只看心情低落，不問自殺','把躁症當單純失眠','忽略藥物或物質造成精神症狀'], case:'35歲男性一週只睡2小時仍精力旺盛，話多、亂花錢、自覺能力超凡。', memory:'精神題先抓：症狀群、多久、功能、安全、物質。', graph:['人體','邊緣系統','多巴胺神經元','D2 receptor','思覺失調','Antipsychotic','MSE','CBT'] }
  ];

  const moreKnowledge = [
    ['休克四分類','休克是組織灌流不足，不是單純血壓低。','全身循環與微血管','維持氧氣送達細胞','低容量、心因性、分布性、阻塞性造成CO或SVR失衡','急救與國考最常見整合題','先看容量、幫浦、阻力、阻塞','看到低血壓只補水，忽略心包填塞或肺栓塞','敗血症低SVR，四肢可溫暖但乳酸高','V-P-R-O：Volume, Pump, Resistance, Obstruction','cardio'],
    ['氧合與通氣','氧氣進不去和二氧化碳排不掉是兩件事。','肺泡、呼吸肌、腦幹呼吸中樞','維持PaO2與PaCO2','氧合靠V/Q與擴散，通氣靠分鐘通氣量','ABG判讀核心','CO2上升代表通氣不足','只看SpO2不看CO2與pH','COPD急性惡化PaCO2上升且pH下降','O2看交換，CO2看通氣','resp'],
    ['酸鹼判讀','pH是身體代謝與呼吸互相補償後的結果。','肺、腎、血液緩衝系統','維持酵素與細胞功能','肺調CO2，腎調HCO3與H+','DKA、敗血症、腎衰竭、COPD都會考','先pH，再PaCO2/HCO3，再代償與anion gap','只背代謝性酸中毒，不算anion gap','DKA為高anion gap代謝性酸中毒','pH先判方向，CO2呼吸，HCO3代謝','renal'],
    ['病灶定位','神經症狀要先定位，再命名疾病。','中樞與周邊神經系統','把臨床缺損對應到神經路徑','不同路徑受損產生特定運動、感覺、語言或顱神經缺損','中風、脊髓病變、周邊神經病變都靠定位','同側顱神經加對側肢體常指腦幹','看到無力直接說中風，未排除周邊或代謝','左額葉Broca區中風造成表達性失語','定位優先於診斷','neuro'],
    ['膽紅素代謝','黃疸是血紅素代謝、肝處理或膽道排出卡住。','網狀內皮系統、肝細胞、膽道','處理血紅素分解產物','非結合膽紅素入肝結合後經膽汁排出','黃疸鑑別必考','間接型想溶血/結合障礙，直接型想肝細胞/膽道','黃疸全部當肝炎','膽石阻塞總膽管造成直接膽紅素與ALP上升','前肝、肝內、肝後','gi'],
    ['胰島素與鉀','胰島素讓葡萄糖和鉀都進細胞。','胰島β細胞、肌肉、脂肪、肝臟','降低血糖並影響血鉀分布','活化葡萄糖攝取與Na/K ATPase','DKA治療安全核心','給胰島素前要知道血鉀','高血糖急著打胰島素卻造成致命低鉀','DKA血鉀看似正常但總鉀缺乏','Insulin pulls K in','endo'],
    ['MCV貧血分類','紅血球大小是貧血鑑別的第一個路標。','骨髓與外周血','協助判斷血紅素合成或DNA合成問題','小球多為鐵/慢性病/地中海型；大球多為B12/葉酸/酒精/肝病','CBC題最高頻入口','MCV低先看Ferritin與TIBC','貧血只看Hb，不看MCV與reticulocyte','缺鐵性貧血MCV低、Ferritin低','先大小，再產量，再破壞/流失','heme'],
    ['抗生素涵蓋','抗生素不是越廣越好，而是要命中感染部位的常見病原。','感染部位與血液','清除病原並降低抗藥性風險','依革蘭氏、厭氧、非典型、MRSA、Pseudomonas需求選藥','感染題與臨床決策核心','肺炎、UTI、腹內感染涵蓋不同','背單一藥物，不知道它缺什麼','腹內感染通常需要厭氧菌涵蓋','部位決定病原，病原決定藥','immune'],
    ['關節炎模式','關節炎要用數量、對稱、急慢、發炎程度分類。','滑膜、軟骨、骨、關節腔','判斷免疫、感染、結晶或退化病因','不同病因造成滑膜發炎、結晶沉積或軟骨磨損','痛風、RA、OA、感染性關節炎常混考','急性單關節紅腫先排除感染','看到大腳趾痛就不抽關節液','發燒合併單關節腫痛需關節穿刺','幾個、多久、對稱、發炎、感染','msk'],
    ['懷孕腹痛原則','育齡女性腹痛先確認是否懷孕。','子宮、輸卵管、卵巢、腹腔','避免漏掉異位妊娠與產科急症','胚胎著床位置或妊娠週數決定風險','急診與國考安全題','β-hCG與超音波一起判讀','先做CT或止痛，忘記驗孕','停經、單側腹痛、陰道出血要想異位妊娠','腹痛女性先hCG','repro'],
    ['精神安全評估','精神科最先要確認病人和他人是否安全。','急診、門診、住院病房','預防自傷、他傷與失能惡化','評估意念、計畫、工具、過去史、保護因子與物質使用','任何精神症狀題都可成為安全題','自殺計畫具體與可取得工具風險高','只開藥不問自殺','重鬱症合併具體自殺計畫需緊急處置','Idea, Plan, Means, Past, Protection','psych']
  ].map(x => ({ name:x[0], plain:x[1], location:x[2], function:x[3], mechanism:x[4], why:x[5], exam:x[6], trap:x[7], case:x[8], memory:x[9], chapter:x[10] }));

  const moreDiseases = [
    ['急性冠心症','冠狀動脈供應心肌氧氣','粥狀硬化斑塊破裂與血栓','冠脈阻塞造成心肌缺血壞死','胸痛、冒汗、噁心、呼吸困難','ECG、Troponin、心導管','Aspirin、P2Y12、抗凝、再灌流','STEMI需立即再灌流','cardio'],
    ['肺栓塞','肺動脈接受右心輸出進行氣體交換','DVT血栓脫落','肺血流阻塞造成V/Q mismatch與右心負荷','突發呼吸困難、胸痛、咳血、心搏過速','D-dimer、CTPA、下肢超音波','抗凝、嚴重者溶栓','低氧加突發胸痛要想到PE','resp'],
    ['慢性腎病','腎元長期維持過濾與內分泌功能','糖尿病、高血壓、腎絲球病','腎元流失與纖維化','水腫、貧血、骨病變、高血壓','eGFR、尿蛋白、電解質、PTH','控制血壓血糖、ACEi/ARB、調整藥物、透析準備','CKD併發貧血與礦物骨病','renal'],
    ['缺血性中風','腦血流穩定供應神經元','血栓、栓塞、小血管病變','腦區缺血造成局部神經功能缺損','偏癱、失語、視野缺損、臉歪','Non-contrast CT、CTA、MRI','時間窗內tPA/取栓、抗血小板、危險因子控制','先排出血再談溶栓','neuro'],
    ['癲癇','神經元放電有抑制與興奮平衡','結構病灶、代謝、遺傳、感染','異常同步放電','抽搐、意識改變、先兆、發作後嗜睡','EEG、MRI、代謝檢查','依發作型態選抗癲癇藥','第一次發作要找可逆原因','neuro'],
    ['消化性潰瘍','胃黏膜防禦與胃酸攻擊平衡','H. pylori、NSAIDs','黏膜屏障破壞造成潰瘍','上腹痛、黑便、貧血','內視鏡、H. pylori檢測','PPI、根除H. pylori、停NSAID','出血潰瘍要內視鏡處理','gi'],
    ['肝硬化','肝臟代謝、合成與解毒','B/C肝、酒精、脂肪肝','慢性傷害造成纖維化與門脈高壓','腹水、黃疸、蜘蛛痣、肝腦病變','LFT、INR、Albumin、超音波、內視鏡','治病因、利尿、預防靜脈曲張出血、移植評估','白蛋白低與INR高代表合成功能差','gi'],
    ['糖尿病酮酸中毒','胰島素抑制脂解並促進葡萄糖利用','感染、漏打胰島素、新發T1DM','胰島素不足造成酮酸與脫水','多尿、口渴、腹痛、Kussmaul呼吸','血糖、酮體、ABG、anion gap、K','補液、胰島素、鉀監測、處理誘因','血鉀決定胰島素安全性','endo'],
    ['甲狀腺風暴','甲狀腺素調節代謝與交感敏感性','Graves、感染、手術、停藥','甲狀腺素過多造成高代謝危象','高燒、心搏過速、躁動、腹瀉','TSH低、free T4高','Beta blocker、PTU/MMI、碘、類固醇、支持治療','用藥順序：先抗甲狀腺再碘','endo'],
    ['DIC','凝血與纖溶平衡','敗血症、產科併發症、癌症、創傷','全身凝血活化消耗血小板與凝血因子','出血、瘀青、器官缺血','PT/aPTT延長、血小板低、D-dimer高、fibrinogen低','治療病因、支持輸血','同時血栓與出血','heme'],
    ['敗血症','局部感染被免疫控制','肺炎、UTI、腹內感染、導管感染','感染引發失控宿主反應與器官功能障礙','發燒或低溫、低血壓、意識改變、少尿','乳酸、血培養、CBC、感染源影像','補液、廣效抗生素、源頭控制、升壓劑','乳酸高代表灌流不足','immune'],
    ['SLE','免疫系統辨識自我避免攻擊','遺傳、環境、荷爾蒙','自體抗體與免疫複合物造成多器官發炎','蝶形紅斑、關節痛、腎炎、血球低下','ANA、anti-dsDNA、C3/C4、尿液','Hydroxychloroquine、類固醇、免疫抑制','腎炎與補體下降常考','immune'],
    ['類風濕性關節炎','滑膜維持關節潤滑','自體免疫','滑膜炎造成骨侵蝕','對稱小關節痛、晨僵超過1小時','RF、anti-CCP、ESR/CRP、X光','Methotrexate、NSAID、短期類固醇、生物製劑','早期DMARD避免變形','msk'],
    ['異位妊娠','受精卵著床於子宮腔','輸卵管病變、PID史、手術史','胚胎在子宮外著床造成破裂出血風險','停經、腹痛、陰道出血','β-hCG、陰道超音波','Methotrexate或手術','育齡女性腹痛必驗孕','repro'],
    ['重鬱症','情緒、睡眠、食慾與動機維持穩定','生物、心理、社會壓力交互作用','情緒調節迴路與神經傳遞改變','低落、失去興趣、睡眠食慾改變、自責、自殺意念','臨床診斷與安全評估','心理治療、SSRI、危急時住院或ECT','至少兩週且功能受損','psych']
  ].map(x => ({ name:x[0], normal:x[1], cause:x[2], mechanism:x[3], symptoms:x[4], tests:x[5], treatment:x[6], exam:x[7], chapter:x[8] }));

  const moreDrugs = [
    ['Beta blocker','β1受體與部分β2受體','降低心率、收縮力與腎素釋放','心搏過慢、疲倦、支氣管收縮、低血糖警訊被遮蔽','嚴重氣喘、AV block、急性失代償心衰竭','心衰竭、心絞痛、心律不整、高血壓','心衰竭穩定後用，不是肺水腫急性期硬加','cardio'],
    ['Aspirin','血小板COX-1','不可逆抑制TXA2降低血小板凝集','胃出血、過敏、氣喘惡化','活動性出血、嚴重過敏','ACS、中風次級預防','不可逆作用持續整個血小板壽命','cardio'],
    ['Inhaled corticosteroid','氣道發炎細胞','降低氣道慢性發炎與過度反應','口腔念珠菌、聲音沙啞','未治療嚴重感染需謹慎','氣喘控制藥','不是急救支氣管擴張劑','resp'],
    ['Vancomycin','革蘭陽性菌細胞壁','抑制peptidoglycan合成','腎毒性、red man syndrome','嚴重過敏','MRSA、嚴重革蘭陽性感染','缺乏革蘭陰性涵蓋','immune'],
    ['PPI','胃壁細胞H/K ATPase','強力抑制胃酸分泌','低鎂、C. difficile風險、骨折風險','依藥物交互作用調整','GERD、潰瘍、H. pylori療法','長期使用需有適應症','gi'],
    ['Insulin','胰島素受體','促進葡萄糖與鉀進細胞，抑制脂解與酮酸','低血糖、低鉀、體重增加','低血糖時不可給','T1DM、DKA、住院高血糖','DKA給藥前先確認鉀','endo'],
    ['Methimazole','甲狀腺過氧化酶','抑制甲狀腺素合成','皮疹、肝毒性、顆粒性白血球缺乏','第一孕期多選PTU','Graves disease、甲亢','發燒喉嚨痛要查CBC','endo'],
    ['Heparin','Antithrombin','增強AT抑制IIa與Xa','出血、HIT、骨鬆','活動性出血、HIT史','DVT/PE、ACS、橋接抗凝','aPTT監測UFH，注意血小板下降','heme'],
    ['Warfarin','Vitamin K epoxide reductase','抑制II、VII、IX、X與Protein C/S合成','出血、皮膚壞死、致畸胎','懷孕、活動性出血','AF抗凝、機械瓣膜','需INR監測且初期可短暫高凝','heme'],
    ['Levetiracetam','SV2A突觸囊泡蛋白','調節神經傳遞釋放降低發作','嗜睡、頭暈、情緒易怒','腎功能差需調整','局部與全般癲癇','情緒副作用常被忽略','neuro'],
    ['Levodopa','黑質紋狀體多巴胺路徑','補充多巴胺前驅物改善動作症狀','噁心、姿勢性低血壓、異動症、幻覺','精神病症狀需謹慎','帕金森病','長期會有wearing-off與異動症','neuro'],
    ['Colchicine','微小管與中性球','抑制中性球遷移降低結晶發炎','腹瀉、骨髓抑制、肌病變','嚴重腎肝功能不全需謹慎','痛風急性發作與預防','腎功能與交互作用要小心','msk'],
    ['Methotrexate','葉酸代謝與免疫細胞','低劑量抗發炎免疫調節','肝毒性、骨髓抑制、口腔潰瘍、致畸胎','懷孕、嚴重肝病','RA、部分自體免疫疾病、異位妊娠','RA使用需補葉酸與監測CBC/LFT','msk'],
    ['Magnesium sulfate','神經肌肉與血管平滑肌','預防與治療子癲癇抽搐','呼吸抑制、反射下降、低血壓','重症肌無力需謹慎','子癲前症/子癲症','毒性看深腱反射與呼吸，解毒用鈣','repro'],
    ['SSRI','血清素回收轉運器','增加突觸間血清素','腸胃不適、性功能障礙、失眠、血清素症候群','與MAOI併用','憂鬱症、焦慮症、OCD','起效需數週，初期仍要安全追蹤','psych'],
    ['Lithium','第二訊息傳遞系統','穩定情緒並降低躁症復發','腎毒性、甲低、震顫、致畸胎、狹窄治療窗','懷孕或腎功能差需謹慎','雙相情緒障礙','需監測血中濃度、Cr、TSH','psych']
  ].map(x => ({ name:x[0], site:x[1], mechanism:x[2], adverse:x[3], contraindication:x[4], use:x[5], trap:x[6], chapter:x[7] }));

  window.labs = [
    ['Troponin','依實驗室，多接近陰性','心肌損傷、心肌梗塞、心肌炎、腎衰竭也可上升','通常無臨床意義','心肌細胞受損標記，需看動態變化與ECG','cardio'],
    ['BNP/NT-proBNP','低值支持心衰竭可能性低','心衰竭、腎衰竭、肺高壓、年齡上升','肥胖者可能偏低','心室壁張力上升','cardio'],
    ['ABG pH/PaCO2/HCO3','pH 7.35-7.45；PaCO2約35-45；HCO3約22-26','依項目判讀呼吸或代謝問題','依項目判讀酸中毒或鹼中毒','酸鹼與通氣氧合核心檢驗','resp'],
    ['Creatinine/eGFR','依年齡肌肉量；eGFR常以>60作粗略界線','GFR下降、肌肉量高、藥物干擾','肌肉量低、懷孕','腎功能與藥物劑量調整','renal'],
    ['Potassium','約3.5-5.0 mEq/L','腎衰竭、ACEi/ARB、溶血、酸中毒','利尿劑、嘔吐腹瀉、胰島素、鹼中毒','心律風險高，需立即判斷ECG','renal'],
    ['AST/ALT','多小於40 U/L，依實驗室','肝細胞損傷、酒精、病毒、藥物、缺血','通常無特殊意義','肝細胞傷害模式','gi'],
    ['ALP/GGT','依實驗室','膽道阻塞、膽汁鬱積、骨病變；GGT協助確認肝膽來源','少見','膽道型酵素','gi'],
    ['Lipase','依實驗室','急性胰臟炎、腎衰竭、腸胃病','通常無診斷價值','胰臟炎線索，需搭配典型腹痛','gi'],
    ['Glucose/HbA1c','空腹血糖約70-99 mg/dL；A1c多<5.7%','糖尿病、壓力、類固醇','胰島素/降糖藥、敗血症、腎上腺不足','急性血糖與長期控制','endo'],
    ['TSH/free T4','依實驗室','TSH高多為初級甲低；T4高為甲亢','TSH低搭配T4判斷甲亢或中樞性問題','甲狀腺軸線判讀','endo'],
    ['CBC','Hb/WBC/Platelet依年齡性別','感染、發炎、脫水、骨髓疾病','貧血、骨髓抑制、出血、免疫破壞','紅白血小板三線索','heme'],
    ['PT/aPTT/INR','依實驗室','凝血因子缺乏、抗凝藥、肝病、DIC','通常較少作為診斷','外因性/內因性凝血路徑與抗凝監測','heme'],
    ['CRP/ESR','低值','感染、發炎、自體免疫、腫瘤','不排除局部或早期感染','非特異性發炎指標','immune'],
    ['Lactate','多小於2 mmol/L','敗血症、休克、缺氧、癲癇後、肝衰竭','通常無特殊意義','組織灌流與代謝壓力指標','immune'],
    ['β-hCG','非孕陰性','懷孕、滋養層疾病、部分腫瘤','過早檢測或妊娠失敗需追蹤','育齡女性腹痛/出血的第一道安全檢查','repro']
  ].map(x => ({ name:x[0], normal:x[1], high:x[2], low:x[3], meaning:x[4], chapter:x[5] }));

  const moreQuestions = [
    ['整合題','休克病人頸靜脈怒張、低血壓、心音遙遠，最應優先考慮？',['低容量休克','心包填塞','敗血症','過敏性休克'],1,'Beck triad指向心包填塞，屬阻塞性休克。','低容量通常JVP低；敗血症常SVR低；過敏會有過敏線索。','休克要問容量、幫浦、阻力、阻塞。','心血管系統','心包填塞','補液暫時支持，根本是心包穿刺'],
    ['圖片題','若CXR顯示肺炎浸潤且病人低氧，最常見的低氧機制是？',['低通氣','V/Q mismatch','貧血','一氧化碳中毒'],1,'肺炎使部分肺泡通氣差但仍有灌流，造成V/Q不匹配。','低通氣主要CO2上升；貧血PaO2可正常；CO中毒SpO2不可靠。','氧合問題先想V/Q、shunt、diffusion。','呼吸系統','肺炎','依嚴重度選抗生素'],
    ['檢驗題','DKA開始胰島素前最需要先確認哪個檢驗值？',['Sodium','Potassium','Albumin','Uric acid'],1,'胰島素會使鉀進細胞，若原本低鉀會引發致命心律不整。','鈉需校正但非胰島素安全第一關；白蛋白與尿酸非急性關鍵。','DKA治療看到胰島素就想到K。','內分泌與代謝','糖尿病酮酸中毒','Insulin'],
    ['病例題','突然右側無力合併表達性失語，最可能病灶在哪個血管區域？',['左MCA','右MCA','左PCA','Basilar artery'],0,'語言區多在左半球，MCA供應側腦皮質運動與語言區。','右MCA多左側忽略/左側無力；PCA偏視野；basilar偏腦幹。','神經題先定位再診斷。','神經系統','缺血性中風','tPA/抗血小板依條件'],
    ['理解題','AST/ALT明顯上升而ALP/GGT相對較低，較符合哪種型態？',['肝細胞損傷','膽道阻塞','腎前性AKI','溶血性貧血'],0,'AST/ALT是肝細胞傷害酵素。','膽道阻塞較常ALP/GGT上升；AKI看Cr/BUN；溶血看LDH/haptoglobin等。','肝膽檢驗先分肝細胞型與膽道型。','腸胃肝膽胰系統','肝炎/肝損傷','依病因停藥或治療'],
    ['基礎題','小球性貧血的第一線思考通常從哪個檢驗開始？',['Ferritin','Troponin','Lipase','TSH'],0,'Ferritin反映鐵儲存，是缺鐵性貧血重要線索。','其他檢驗分別對心肌、胰臟、甲狀腺。','貧血先MCV，再retic與鐵/B12/葉酸等。','血液腫瘤','缺鐵性貧血','Iron'],
    ['國考題','敗血症合併低血壓與乳酸上升，初始處置最合理的是？',['等待血培養結果再給藥','補液、抽培養並早期廣效抗生素','只給退燒藥觀察','立即長期口服抗生素'],1,'敗血症需早期復甦、培養與抗生素，不能等培養才治療。','延遲抗生素會增加死亡；退燒不是源頭控制；口服不適合休克。','敗血症看灌流、感染源、抗生素時間。','免疫感染','敗血症','廣效抗生素'],
    ['病例題','急性單關節紅腫熱痛合併發燒，最不能漏掉的是？',['感染性關節炎','退化性關節炎','纖維肌痛','骨質疏鬆'],0,'感染性關節炎會快速破壞關節且可敗血症，需要關節液與抗生素。','其他疾病通常不造成急性發燒單關節化膿表現。','急性單關節先排感染，再想結晶。','肌骨皮膚','感染性關節炎/痛風','抗生素或Colchicine依診斷'],
    ['安全題','育齡女性急性腹痛與陰道出血，第一個不可漏掉的檢查是？',['β-hCG','HbA1c','Uric acid','BNP'],0,'需先排除懷孕與異位妊娠。','其他檢驗無法處理此安全風險。','腹痛女性先hCG。','婦產兒科與生殖','異位妊娠','Methotrexate或手術'],
    ['臨床題','憂鬱症病人表示想死且已有具體計畫，下一步最重要的是？',['安排一年後回診','立即安全評估與保護性處置','只建議運動','避免詢問以免誘發自殺'],1,'具體自殺計畫代表高風險，需要立即處理安全。','延後、只運動或不詢問都會漏掉危險。','精神科先問安全：意念、計畫、工具、保護因子。','精神行為醫學','重鬱症','SSRI/住院/ECT依嚴重度']
  ].map(x => ({ type:x[0], stem:x[1], options:x[2], answer:x[3], why:x[4], wrong:x[5], avoid:x[6], related:x[7], disease:x[8], drug:x[9] }));

  chapters.push(...moreChapters);
  knowledge.push(...moreKnowledge);
  diseases.push(...moreDiseases);
  drugs.push(...moreDrugs);
  questions.push(...moreQuestions);
  english.roots.push('thyro 甲狀腺','adreno 腎上腺','cyto 細胞','myelo 骨髓','arthro 關節','gyneco 婦科','psych 精神','onco 腫瘤','septic 感染毒血','hepato 肝');
  english.words.push('lesion 病灶','aphasia 失語','jaundice 黃疸','ascites 腹水','ketoacidosis 酮酸中毒','thyrotoxicosis 甲狀腺毒症','microcytic 小球性','thrombocytopenia 血小板低下','sepsis 敗血症','synovitis 滑膜炎','preeclampsia 子癲前症','ectopic pregnancy 異位妊娠','mania 躁症','psychosis 精神病症狀','suicidal ideation 自殺意念');
  english.phrases.push('anion gap metabolic acidosis','upper motor neuron lesion','right upper quadrant pain','broad-spectrum antibiotics','safety assessment');
  english.sentences.push('Lesion localization should precede disease naming in neurology.','An elevated lactate suggests tissue hypoperfusion or severe metabolic stress.','A positive pregnancy test changes the differential diagnosis of abdominal pain.','Microcytic anemia should prompt evaluation of iron deficiency and occult blood loss.','Sepsis requires early resuscitation, cultures, antibiotics, and source control.');

  const oldBodySvg = bodySvg;
  bodySvg = function () {
    const base = oldBodySvg();
    const extra = `<g font-size="14" font-weight="800" fill="#172033">
      ${chapters.map((c,i)=>{ const x = 50 + (i % 4) * 112; const y = 420 + Math.floor(i / 4) * 32; return `<g class="node" onclick="selectChapter('${c.id}')"><rect x="${x-8}" y="${y-20}" width="104" height="26" rx="6" fill="#ffffff" stroke="#b8c7d8"/><text x="${x+44}" y="${y-3}" text-anchor="middle">${c.system.replace('系統','')}</text></g>`; }).join('')}
    </g>`;
    return base.replace('</svg>', extra + '</svg>');
  };

  function renderKnowledgeCards(chapter) {
    const rows = knowledge.filter(k => !chapter || k.chapter === chapter);
    return `<div class="lecture-grid">${rows.map(k => `<div class="lecture-card"><h3>${k.name}</h3><p><strong>白話一句話：</strong>${k.plain}</p><p><strong>人體位置：</strong>${k.location}</p><p><strong>功能：</strong>${k.function}</p><p><strong>機制：</strong>${k.mechanism}</p><p><strong>為什麼重要：</strong>${k.why}</p><p><strong>常考觀念：</strong>${k.exam}</p><p><strong>國考陷阱：</strong>${k.trap}</p><p><strong>臨床案例：</strong>${k.case}</p><p><strong>記憶法：</strong>${k.memory}</p></div>`).join('')}</div>`;
  }

  window.renderLabCards = function (chapter) {
    const rows = (window.labs || []).filter(l => !chapter || l.chapter === chapter);
    return `<div class="lecture-grid">${rows.map(l => `<div class="lecture-card"><h3>${l.name}</h3><p><strong>正常值：</strong>${l.normal}</p><p><strong>升高：</strong>${l.high}</p><p><strong>降低：</strong>${l.low}</p><p><strong>臨床意義：</strong>${l.meaning}</p></div>`).join('')}</div>`;
  };

  renderBody = function () {
    document.getElementById('body').innerHTML = `
      <div class="section">
        <div class="section-head"><h2>人體系統地圖</h2><span class="tag">${chapters.length}系統・${knowledge.length}知識點・${diseases.length}疾病・${drugs.length}藥物・${window.labs.length}檢驗值</span></div>
        <div class="two-col"><div class="visual">${bodySvg()}</div><div><h3>醫學世界模型</h3><div class="ordered-flow">${['人體','正常','失衡','症狀','疾病','檢查','診斷','治療','預後'].map((x,i)=>`<div class="flow-step"><span class="step-num">${i+1}</span><strong>${x}</strong></div>`).join('')}</div></div></div>
      </div>
      <div class="section"><div class="section-head"><h2>全部系統節點</h2><span class="tag">點選進入章節</span></div><div class="grid">${chapters.map(c=>`<button class="card" onclick="selectChapter('${c.id}')"><span class="card-title"><span>${c.system}</span>${icons.book}</span><p>${c.one}</p><div class="metric"><strong>${diseases.filter(d=>d.chapter===c.id).length}</strong><span>疾病節點</span></div></button>`).join('')}</div></div>
      <div class="section"><h2>知識點總庫</h2>${renderKnowledgeCards()}</div>
      <div class="section"><h2>檢驗值地圖</h2>${renderLabCards()}</div>
      <div class="section"><h2>知識圖譜</h2>${knowledgeGraph()}</div>`;
  };

  const oldChapterPage = chapterPage;
  chapterPage = function (ch, i) {
    if (i === 3) return `<h2>核心概念圖</h2><div class="mindmap">${ch.concepts.map(x=>`<span>${x}</span>`).join('')}</div><h3 style="margin-top:18px">本章知識點</h3>${renderKnowledgeCards(ch.id)}`;
    if (i === 5) return `<h2>因果圖</h2><div class="ordered-flow">${ch.causality.map((x,n)=>`<div class="flow-step"><span class="step-num">${n+1}</span>${x}</div>`).join('')}</div><h3 style="margin-top:18px">檢驗值連結</h3>${renderLabCards(ch.id)}`;
    return oldChapterPage(ch, i);
  };

  renderAnki = function () {
    const cards = [
      ...knowledge.flatMap(k => [[`${k.name}的白話一句話？`, k.plain], [`${k.name}為什麼重要？`, k.why], [`${k.name}的國考陷阱？`, k.trap]]),
      ...window.labs.flatMap(l => [[`${l.name}正常值/方向？`, l.normal], [`${l.name}升高代表？`, l.high], [`${l.name}臨床意義？`, l.meaning]]),
      ...diseases.map(d => [`${d.name}的機制？`, d.mechanism]),
      ...drugs.map(d => [`${d.name}的作用機制與陷阱？`, `${d.mechanism}；陷阱：${d.trap}`])
    ];
    document.getElementById('anki').innerHTML = `<div class="section"><div class="section-head"><h2>Anki複習</h2><span class="tag">${cards.length}張主動回想卡</span></div>${cards.map((c,i)=>`<div class="anki-row"><input type="checkbox" ${state.anki[i]?'checked':''} onchange="state.anki[${i}]=this.checked;save()"><div><h3>${c[0]}</h3><p class="muted">${c[1]}</p></div></div>`).join('')}</div>`;
  };

  renderSearch = function (term) {
    if (!term.trim()) { renderHome(); return; }
    const t = term.toLowerCase();
    const results = [
      ...chapters.map(c => ({ title:c.system, body:c.one, action:`selectChapter('${c.id}')` })),
      ...knowledge.map(k => ({ title:k.name, body:`${k.plain} ${k.exam} ${k.trap}`, action:`navTo('body')` })),
      ...diseases.map(d => ({ title:d.name, body:`${d.mechanism} ${d.exam}`, action:`navTo('disease')` })),
      ...drugs.map(d => ({ title:d.name, body:`${d.mechanism} ${d.trap}`, action:`navTo('pharm')` })),
      ...window.labs.map(l => ({ title:l.name, body:`${l.normal} ${l.high} ${l.low} ${l.meaning}`, action:`navTo('body')` }))
    ].filter(r => (r.title + r.body).toLowerCase().includes(t));
    document.getElementById('home').innerHTML = `<div class="section"><div class="section-head"><h2>搜尋結果</h2><span class="tag">${results.length}筆</span></div><div class="lecture-grid">${results.map(r=>`<button class="lecture-card" onclick="${r.action}"><h3>${r.title}</h3><p>${r.body}</p></button>`).join('') || '<div class="empty">找不到結果。</div>'}</div></div>`;
    navTo('home');
  };

  renderHome();
  renderBody();
  renderLecture();
  renderDisease();
  renderPharm();
  renderPbl();
  renderAnki();
  renderEnglish();
  renderWrong();
  renderTasks();
})();
