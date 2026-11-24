// Site content. Each text field has an English (en) and Myanmar (my) version.

export const ORDER =["home","courses","teachers","resources","faq","contact","about"];
export const PALETTES =[["teal","Original","#12302D","#E8913A","#F5EFE3"],["lanna","Lanna temple","#5E1414","#D4A62A","#FBF3E4"],["lantern","Lantern night","#1A1B3F","#FF7A59","#FFF6E8"],["jungle","Jungle green","#173A2A","#B5D94A","#F3F5EC"],["bright","Light & bright","#EAF1FF","#2563EB","#FFFFFF"]];

// Letter names use RTGS (Royal Thai General System) romanization: no tone marks.
// All 44 Thai consonants (the full script, including the two obsolete letters
// still taught as part of the 44). Used to randomly deal letters onto the cube.
export const ALPHABET =[
 {g:"ก",name:"ko kai",word:"ไก่",mean:{en:"chicken",my:"ကြက်"}},
 {g:"ข",name:"kho khai",word:"ไข่",mean:{en:"egg",my:"ကြက်ဥ"}},
 {g:"ฃ",name:"kho khuat",word:"ขวด",mean:{en:"bottle",my:"ပုလင်း"}},
 {g:"ค",name:"kho khwai",word:"ควาย",mean:{en:"buffalo",my:"ကျွဲ"}},
 {g:"ฅ",name:"kho khon",word:"คน",mean:{en:"person",my:"လူ"}},
 {g:"ฆ",name:"kho rakhang",word:"ระฆัง",mean:{en:"bell",my:"ခေါင်းလောင်း"}},
 {g:"ง",name:"ngo ngu",word:"งู",mean:{en:"snake",my:"မြွေ"}},
 {g:"จ",name:"cho chan",word:"จาน",mean:{en:"plate",my:"ပန်းကန်ပြား"}},
 {g:"ฉ",name:"cho ching",word:"ฉิ่ง",mean:{en:"small cymbals",my:"လက်ခုန်း"}},
 {g:"ช",name:"cho chang",word:"ช้าง",mean:{en:"elephant",my:"ဆင်"}},
 {g:"ซ",name:"so so",word:"โซ่",mean:{en:"chain",my:"သံကြိုး"}},
 {g:"ฌ",name:"cho choe",word:"เฌอ",mean:{en:"tree",my:"သစ်ပင်"}},
 {g:"ญ",name:"yo ying",word:"หญิง",mean:{en:"woman",my:"မိန်းမ"}},
 {g:"ฎ",name:"do chada",word:"ชฎา",mean:{en:"headdress",my:"ဦးထုပ်"}},
 {g:"ฏ",name:"to patak",word:"ปฏัก",mean:{en:"goad",my:"ဆင်ထိုးချောင်း"}},
 {g:"ฐ",name:"tho than",word:"ฐาน",mean:{en:"pedestal",my:"ခြေခံပေါက်"}},
 {g:"ฑ",name:"tho montho",word:"มณโฑ",mean:{en:"Montho (a character name)",my:"မုန်းထို (ဇာတ်ကောင်)"}},
 {g:"ฒ",name:"tho phu thao",word:"ผู้เฒ่า",mean:{en:"elder",my:"အသက်ကြီးသူ"}},
 {g:"ณ",name:"no nen",word:"เณร",mean:{en:"novice monk",my:"ကိုရင်"}},
 {g:"ด",name:"do dek",word:"เด็ก",mean:{en:"child",my:"ကလေး"}},
 {g:"ต",name:"to tao",word:"เต่า",mean:{en:"turtle",my:"လိပ်"}},
 {g:"ถ",name:"tho thung",word:"ถุง",mean:{en:"sack",my:"အိတ်"}},
 {g:"ท",name:"tho thahan",word:"ทหาร",mean:{en:"soldier",my:"စစ်သား"}},
 {g:"ธ",name:"tho thong",word:"ธง",mean:{en:"flag",my:"အလံ"}},
 {g:"น",name:"no nu",word:"หนู",mean:{en:"mouse",my:"ကြွက်"}},
 {g:"บ",name:"bo bai mai",word:"ใบไม้",mean:{en:"leaf",my:"အရွက်"}},
 {g:"ป",name:"po pla",word:"ปลา",mean:{en:"fish",my:"ငါး"}},
 {g:"ผ",name:"pho phueng",word:"ผึ้ง",mean:{en:"bee",my:"ပျား"}},
 {g:"ฝ",name:"fo fa",word:"ฝา",mean:{en:"lid",my:"အဖုံး"}},
 {g:"พ",name:"pho phan",word:"พาน",mean:{en:"offering tray",my:"ပန်းကန်ခုံ"}},
 {g:"ฟ",name:"fo fan",word:"ฟัน",mean:{en:"teeth",my:"သွား"}},
 {g:"ภ",name:"pho samphao",word:"สำเภา",mean:{en:"junk (ship)",my:"သင်္ဘော"}},
 {g:"ม",name:"mo ma",word:"ม้า",mean:{en:"horse",my:"မြင်း"}},
 {g:"ย",name:"yo yak",word:"ยักษ์",mean:{en:"giant",my:"ဘီလူး"}},
 {g:"ร",name:"ro ruea",word:"เรือ",mean:{en:"boat",my:"လှေ"}},
 {g:"ล",name:"lo ling",word:"ลิง",mean:{en:"monkey",my:"မျောက်"}},
 {g:"ว",name:"wo waen",word:"แหวน",mean:{en:"ring",my:"လက်စွပ်"}},
 {g:"ศ",name:"so sala",word:"ศาลา",mean:{en:"pavilion",my:"မဏ္ဍပ်"}},
 {g:"ษ",name:"so ruesi",word:"ฤๅษี",mean:{en:"hermit",my:"ရသေ့"}},
 {g:"ส",name:"so suea",word:"เสือ",mean:{en:"tiger",my:"ကျား"}},
 {g:"ห",name:"ho hip",word:"หีบ",mean:{en:"chest",my:"သေတ္တာ"}},
 {g:"ฬ",name:"lo chula",word:"จุฬา",mean:{en:"kite",my:"လေကူးစားအရုပ်"}},
 {g:"อ",name:"o ang",word:"อ่าง",mean:{en:"basin",my:"ကန်"}},
 {g:"ฮ",name:"ho nok huk",word:"นกฮูก",mean:{en:"owl",my:"ဇီးကွက်"}}
];
// Fixed 3D positions for the cube's six faces (geometry only — letters are dealt onto them at random).
export const CUBE_FACES =[
 {x:0,y:0,face:"rotateY(0deg)"},
 {x:0,y:-90,face:"rotateY(90deg)"},
 {x:0,y:-180,face:"rotateY(180deg)"},
 {x:0,y:90,face:"rotateY(-90deg)"},
 {x:-90,y:0,face:"rotateX(90deg)"},
 {x:90,y:0,face:"rotateX(-90deg)"}
];
export const PHRASES =[
 {pic:"hello",th:"สวัสดีครับ / ค่ะ",rom:"sà-wàt-dee khráp / khâ",en:{en:"Hello",my:"မင်္ဂလာပါ"},tip:{en:"Men end with khráp, women with khâ. It makes any sentence polite.",my:"ယောက်ျားလေးတွေက khráp၊ မိန်းကလေးတွေက khâ နဲ့ အဆုံးသတ်ပါ — ဘယ်စကားကိုမဆို ယဉ်ကျေးစေပါတယ်။"}},
 {pic:"thanks",th:"ขอบคุณ",rom:"khàwp-khun",en:{en:"Thank you",my:"ကျေးဇူးတင်ပါတယ်"},tip:{en:"Add khráp or khâ at the end, and a small wai if someone helped you.",my:"နောက်ဆုံးမှာ khráp ဒါမှမဟုတ် khâ ထည့်ပါ။ တစ်ယောက်ယောက် ကူညီပေးရင် လက်အုပ်ချီ (wai) ပါ။"}},
 {pic:"price",th:"เท่าไหร่",rom:"thâo-rài",en:{en:"How much?",my:"ဘယ်လောက်လဲ?"},tip:{en:"Point at the item and ask. Your most useful word at the market.",my:"ပစ္စည်းကို လက်ညှိုးထိုးပြီး မေးပါ။ ဈေးထဲမှာ အသုံးအဝင်ဆုံး စကားလုံးပါ။"}},
 {pic:"chili",th:"ไม่เผ็ด",rom:"mâi phèt",en:{en:"Not spicy",my:"မစပ်ပါစေနဲ့"},tip:{en:"Feeling brave? Try phèt nít nòi, just a little spicy.",my:"သတ္တိရှိရင် phèt nít nòi (နည်းနည်းပဲ စပ်ပါ) လို့ ပြောကြည့်ပါ။"}},
 {pic:"toilet",th:"ห้องน้ำอยู่ที่ไหน",rom:"hâwng-náam yùu thîi-nǎi",en:{en:"Where is the bathroom?",my:"အိမ်သာ ဘယ်မှာလဲ?"},tip:{en:"Word for word: “water room is where?”",my:"စကားလုံးအတိုင်းဆိုရင် “ရေခန်း ဘယ်မှာလဲ?” ပါ။"}},
 {pic:"smile",th:"ไม่เป็นไร",rom:"mâi pen rai",en:{en:"No worries",my:"ကိစ္စမရှိပါဘူး"},tip:{en:"It’s okay, never mind, you’re welcome. You’ll hear it every day.",my:"ရပါတယ်၊ ကိစ္စမရှိဘူး၊ ဘာမှမဖြစ်ပါဘူး — နေ့တိုင်း ကြားရမယ့် စကားပါ။"}}
];
// The five tones, built from one middle-class letter (ป) + a tone mark.
// `id` matches the recording file name: src/assets/tones/paa-<id>.mp3
// `path` is the pitch contour in a 520×210 chart (y=20 high … y=188 low).
export const TONE_MARK_NONE = { en: 'no mark', my: 'အမှတ်အသား မပါ' };
export const TONES =[
 {id:"mid",color:"#7FD1A8",mark:"",markName:"",markThai:"",name:{en:"Mid tone",my:"အလယ်အသံ"},short:{en:"flat, in the middle",my:"ညီညာ၊ အလယ်အမြင့်"},word:"ปา",rom:"paa",mean:{en:"to throw",my:"ပစ်တယ်"},
  path:"M50 104 C 200 100, 360 106, 500 110",desc:{en:"Flat and relaxed, in your normal speaking voice.",my:"ပုံမှန် စကားပြောသံအတိုင်း ညီညီညာညာ ပြောပါ။"}},
 {id:"low",color:"#6FA8FF",mark:"\u0E48",markName:"mai ek",markThai:"ไม้เอก",name:{en:"Low tone",my:"အနိမ့်အသံ"},short:{en:"steady and low",my:"နိမ့်ပြီး ညီ"},word:"ป่า",rom:"pàa",mean:{en:"forest",my:"တော"},
  path:"M50 140 C 200 150, 360 165, 500 175",desc:{en:"Starts a little low and sinks lower.",my:"နည်းနည်း နိမ့်နိမ့်က စပြီး ပိုနိမ့်သွားပါတယ်။"}},
 {id:"falling",color:"#FF7A59",mark:"\u0E49",markName:"mai tho",markThai:"ไม้โท",name:{en:"Falling tone",my:"အကျအသံ"},short:{en:"high, then drops",my:"မြင့်ရာက ကျ"},word:"ป้า",rom:"pâa",mean:{en:"aunt",my:"အဒေါ်ကြီး"},
  path:"M50 62 C 160 30, 260 30, 330 80 S 450 180, 500 182",desc:{en:"Rises briefly, then drops sharply, like a firm statement.",my:"ခဏတက်ပြီး ရုတ်တရက် ပြန်ကျသွားပါတယ် — ပြတ်ပြတ်သားသား ပြောသလိုပါ။"}},
 {id:"high",color:"#FFC857",mark:"\u0E4A",markName:"mai tri",markThai:"ไม้ตรี",name:{en:"High tone",my:"အမြင့်အသံ"},short:{en:"high and rising",my:"မြင့်ပြီး တက်"},word:"ป๊า",rom:"páa",mean:{en:"dad (informal)",my:"အဖေ (ရင်းနှီးသုံး)"},
  path:"M50 62 C 200 58, 360 40, 500 22",desc:{en:"Starts high and climbs a touch higher.",my:"မြင့်မြင့်က စပြီး နည်းနည်း ပိုမြင့်သွားပါတယ်။"}},
 {id:"rising",color:"#C08BFF",mark:"\u0E4B",markName:"mai chattawa",markThai:"ไม้จัตวา",name:{en:"Rising tone",my:"အတက်အသံ"},short:{en:"dips, then rises",my:"နိမ့်ပြီးမှ တက်"},word:"ป๋า",rom:"pǎa",mean:{en:"papa (informal)",my:"ပါပါး (ရင်းနှီးသုံး)"},
  path:"M50 120 C 170 160, 300 170, 380 120 S 470 40, 500 26",desc:{en:"Dips, then rises, like asking “really?” in English.",my:"အရင် နိမ့်ကျပြီး ပြန်တက်လာပါတယ် — အင်္ဂလိပ်လို “really?” လို့ မေးသလိုပါ။"}}
];
// ---- Courses: CEFR levels, the intensive bridging class, and class formats ----
// LEVEL_BANDS colour the level picker (Basic / Independent / Proficient).
export const LEVEL_BANDS = {
 basic:{en:"Basic",my:"အခြေခံ"},
 indep:{en:"Independent",my:"ကိုယ်တိုင်ပြောနိုင်"},
 prof:{en:"Proficient",my:"ကျွမ်းကျင်"}
};
// Seven CEFR levels. `glyph` is the faint Thai letter shown on the detail card.
export const LEVELS = [
 {code:"A1",band:"basic",glyph:"ก",name:{en:"Beginner",my:"အစပြုသူ"},
  summary:{en:"Read and write the Thai alphabet, and get through everyday situations from day one.",my:"ထိုင်းအက္ခရာကို ဖတ်တတ်၊ ရေးတတ်ပြီး ပထမနေ့ကစပြီး နေ့စဉ်အခြေအနေတွေမှာ ပြောဆိုနိုင်မယ်။"},
  topics:{en:["All 44 consonants, 32 vowels and 5 tones","Introductions, numbers, time and dates","Thai money, 7-Eleven shopping, ordering food and drinks"],
          my:["ဗျည်း ၄၄ လုံး၊ သရ ၃၂ လုံးနဲ့ tone ၅ မျိုး","မိတ်ဆက်ခြင်း၊ ဂဏန်း၊ အချိန်နဲ့ ရက်စွဲ","ထိုင်းငွေ၊ 7-Eleven မှာ ဈေးဝယ်ခြင်း၊ အစားအသောက်နဲ့ အဖျော်ယမကာ မှာခြင်း"]},
  who:{en:"Start here if you've never studied Thai.",my:"ထိုင်းစကား တစ်ခါမှ မလေ့လာဖူးရင် ဒီကနေ စပါ။"}},
 {code:"A2",band:"basic",glyph:"ข",name:{en:"Elementary",my:"အခြေခံ"},
  summary:{en:"Read real words and short sentences, and talk about your daily life.",my:"စကားလုံးတွေနဲ့ ဝါကျတိုတွေကို ဖတ်နိုင်ပြီး သင့်နေ့စဉ်ဘဝအကြောင်း ပြောနိုင်မယ်။"},
  topics:{en:["Final consonants, changed vowels and consonant clusters","Family, jobs, emotions, directions and places","Fresh food and noodles, basic health and medicine"],
          my:["အသတ်ဗျည်း၊ ပုံပြောင်းသရနဲ့ ဗျည်းတွဲများ","မိသားစု၊ အလုပ်၊ ခံစားချက်၊ လမ်းညွှန်နဲ့ နေရာများ","လတ်ဆတ်တဲ့ အစားအစာနဲ့ ခေါက်ဆွဲ၊ အခြေခံ ကျန်းမာရေးနဲ့ ဆေးဝါး"]},
  who:{en:"After A1.",my:"A1 ပြီးရင် ဆက်တက်ပါ။"}},
 {code:"A2+",band:"basic",glyph:"ค",name:{en:"Pre-Intermediate",my:"အလယ်အလတ်အောက်"},
  summary:{en:"Write accurately, read short paragraphs, and handle real-life tasks in Thailand.",my:"မှန်မှန်ကန်ကန် ရေးနိုင်၊ စာပိုဒ်တိုတွေ ဖတ်နိုင်ပြီး ထိုင်းနိုင်ငံမှာ လက်တွေ့ကိစ္စတွေကို ကိုယ်တိုင် ဆောင်ရွက်နိုင်မယ်။"},
  topics:{en:["The 8 parts of speech and Thai sentence structure","Renting a condo, banking, visa extensions","Hospital and dental visits, travel check-ins, repairs, wet markets"],
          my:["ဝါစင်္ဂ ၈ မျိုးနဲ့ ထိုင်းဝါကျ ဖွဲ့စည်းပုံ","ကွန်ဒိုငှားခြင်း၊ ဘဏ်ကိစ္စနဲ့ ဗီဇာသက်တမ်းတိုးခြင်း","ဆေးရုံနဲ့ သွားဆေးခန်း၊ ခရီးသွား check-in၊ ပြုပြင်ရေးနဲ့ ဈေးများ"]},
  who:{en:"After A2.",my:"A2 ပြီးရင် ဆက်တက်ပါ။"}},
 {code:"B1",band:"indep",glyph:"ง",name:{en:"Intermediate",my:"အလယ်အလတ်"},
  summary:{en:"Read longer texts, understand the main idea of audio, and talk about your own experiences.",my:"စာပိုဒ်ရှည်တွေ ဖတ်နိုင်၊ အသံဖိုင်ရဲ့ အဓိကအချက်ကို နားလည်ပြီး ကိုယ်တွေ့အကြောင်း ပြောနိုင်မယ်။"},
  topics:{en:["Longer paragraphs and critical reading","Topic-based vocabulary","Listening for the main idea, speaking about personal experiences"],
          my:["စာပိုဒ်ရှည်များနဲ့ ဝေဖန်ပိုင်းခြား ဖတ်ရှုခြင်း","ခေါင်းစဉ်အလိုက် ဝေါဟာရ","အဓိကအချက်ကို နားထောင်ခြင်း၊ ကိုယ်တွေ့အကြောင်း ပြောခြင်း"]},
  who:{en:"After A2+.",my:"A2+ ပြီးရင် ဆက်တက်ပါ။"}},
 {code:"B2",band:"indep",glyph:"จ",name:{en:"Upper-Intermediate",my:"အလယ်အလတ်အထက်"},
  summary:{en:"Use formal Thai and express your opinions clearly.",my:"တရားဝင် ထိုင်းစကားကို သုံးနိုင်ပြီး ကိုယ့်အမြင်ကို ရှင်းရှင်းလင်းလင်း ပြောနိုင်မယ်။"},
  topics:{en:["Formal vocabulary","Writing paragraphs and summaries","Expressing and defending opinions"],
          my:["တရားဝင် ဝေါဟာရ","စာပိုဒ်နဲ့ အနှစ်ချုပ် ရေးသားခြင်း","ကိုယ့်အမြင်ကို ဖော်ပြပြီး ခိုင်ခိုင်မာမာ တင်ပြခြင်း"]},
  who:{en:"After B1.",my:"B1 ပြီးရင် ဆက်တက်ပါ။"}},
 {code:"C1",band:"prof",glyph:"ฉ",name:{en:"Advanced",my:"အဆင့်မြင့်"},
  summary:{en:"Business Thai, news, and confident speaking without preparation.",my:"စီးပွားရေး ထိုင်းစာ၊ သတင်းနဲ့ ကြိုမပြင်ဆင်ဘဲ ယုံကြည်စွာ ပြောဆိုနိုင်မယ်။"},
  topics:{en:["Formal Business Thai writing","Reading news and texts from different fields","Impromptu speaking with well-structured opinions"],
          my:["တရားဝင် စီးပွားရေး ထိုင်းစာ ရေးသားခြင်း","သတင်းနဲ့ နယ်ပယ်စုံ စာများ ဖတ်ခြင်း","စနစ်တကျ အမြင်များနဲ့ ချက်ချင်း ပြောဆိုခြင်း"]},
  who:{en:"After B2.",my:"B2 ပြီးရင် ဆက်တက်ပါ။"}},
 {code:"C2",band:"prof",glyph:"ช",name:{en:"Proficient",my:"ကျွမ်းကျင်"},
  summary:{en:"Near-native reading, writing and conversation.",my:"မူရင်းစကားပြောသူနီးပါး ဖတ်၊ ရေး၊ ပြောနိုင်မယ်။"},
  topics:{en:["Highly complex reading and writing","Debates and formal reporting","Advanced conversation"],
          my:["အလွန်ရှုပ်ထွေးတဲ့ စာဖတ်ခြင်းနဲ့ ရေးသားခြင်း","ငြင်းခုံဆွေးနွေးခြင်းနဲ့ တရားဝင် အစီရင်ခံခြင်း","အဆင့်မြင့် စကားပြော"]},
  who:{en:"After C1.",my:"C1 ပြီးရင် ဆက်တက်ပါ။"}}
];
export const INTENSIVE = {code:"INT",name:{en:"Intensive Course (Bridging Class)",my:"အထူးသင်တန်း (Bridging Class)"},
 badge:{en:"Special course · Entrance interview",my:"အထူးသင်တန်း · ဝင်ခွင့် အင်တာဗျူး"},
 desc:{en:"For learners who can already read and write Thai. A fast-paced course to build speaking fluency and listening through everyday discussions and personal-experience topics, while strengthening practical reading and writing.",
       my:"ထိုင်းစာ ဖတ်တတ်၊ ရေးတတ်ပြီးသူများအတွက်။ နေ့စဉ်ဆွေးနွေးမှုတွေနဲ့ ကိုယ်တွေ့ခေါင်းစဉ်တွေကနေတဆင့် စကားပြောနဲ့ နားထောင်စွမ်းရည်ကို မြှင့်တင်ပေးပြီး လက်တွေ့ စာဖတ်၊ စာရေး စွမ်းရည်ကိုလည်း ခိုင်မာစေတဲ့ အရှိန်မြန် သင်တန်းပါ။"},
 cta:{en:"Book an interview",my:"အင်တာဗျူး ချိန်းရန်"}};
// Schedule rows in Supabase store `level` as a number: 1–7 = A1…C2, 8 = Intensive.
export const COURSES = [...LEVELS, INTENSIVE];
// Three class formats; every level runs in all three.
export const FORMATS = [
 {key:"group",kind:{en:"Group class",my:"အုပ်စု အတန်း"},title:{en:"Learn together",my:"အတူတူ လေ့လာမယ်"},
  size:{en:"10–15 students",my:"ကျောင်းသား ၁၀–၁၅ ဦး"},people:15,perClass:1.5,perWeek:3,classes:40,hours:60,
  note:{en:"Lots of speaking practice with classmates at the same level.",my:"အဆင့်တူ အတန်းဖော်တွေနဲ့ စကားပြော လေ့ကျင့်ခွင့် များများ ရမယ်။"},
  cta:{en:"Join a group",my:"အုပ်စုအတန်း ဝင်ရန်"}},
 {key:"special",kind:{en:"Special class",my:"အထူး အတန်း"},title:{en:"Small & focused",my:"လူနည်း၊ အာရုံစိုက်"},
  size:{en:"3–5 students",my:"ကျောင်းသား ၃–၅ ဦး"},people:5,perClass:1.5,perWeek:3,classes:30,hours:45,
  note:{en:"More time with the teacher, while still learning with others.",my:"ဆရာနဲ့ အချိန်ပိုရပြီး တခြားသူတွေနဲ့လည်း အတူ လေ့လာနိုင်မယ်။"},
  cta:{en:"Join a small class",my:"အတန်းငယ် ဝင်ရန်"}},
 {key:"private",kind:{en:"Private class",my:"တစ်ဦးချင်း အတန်း"},title:{en:"Just for you",my:"သင့်အတွက် သီးသန့်"},
  size:{en:"One-on-one",my:"တစ်ယောက်ချင်း"},people:1,perClass:1,perWeek:3,classes:30,hours:30,
  note:{en:"Your pace, your topics, your schedule.",my:"သင့်အရှိန်၊ သင့်ခေါင်းစဉ်၊ သင့်အချိန်ဇယား။"},
  cta:{en:"Book private lessons",my:"တစ်ဦးချင်း သင်ခန်းစာ ချိန်းရန်"}}
];
export const LANGN ={th:{en:"Thai",my:"ထိုင်း"},my:{en:"Burmese",my:"မြန်မာ"},en:{en:"English",my:"အင်္ဂလိပ်"}};
export const TEACHERS = [];
export const CATS =["all","phrases","alphabet","tones","culture"];
export const RTYPE ={pdf:{en:"PDF",my:"PDF"},audio:{en:"Audio",my:"အသံ"},video:{en:"Video",my:"ဗီဒီယို"},article:{en:"Article",my:"ဆောင်းပါး"}};
export const RES =[
 {cat:"phrases",type:"pdf",meta:{en:"2 pages",my:"၂ မျက်နှာ"},title:{en:"Week 1 phrase sheet",my:"ပထမအပတ် စကားစုစာရွက်"},desc:{en:"30 must-know phrases with romanization.",my:"ရောမန်အက္ခရာနဲ့ မရှိမဖြစ် စကားစု ၃၀။"}},
 {cat:"phrases",type:"audio",meta:{en:"6 min",my:"၆ မိနစ်"},title:{en:"At the market",my:"ဈေးထဲမှာ"},desc:{en:"Listen and repeat: prices, bargaining and “too expensive!”",my:"နားထောင်ပြီး လိုက်ပြောပါ - ဈေးနှုန်း၊ ဈေးဆစ်ခြင်းနဲ့ “ဈေးကြီးလွန်းတယ်!”"}},
 {cat:"alphabet",type:"pdf",meta:{en:"1 page",my:"၁ မျက်နှာ"},title:{en:"Consonant chart",my:"ဗျည်းဇယား"},desc:{en:"All 44 consonants with their key words.",my:"ဗျည်း ၄၄ လုံးနဲ့ သူတို့ရဲ့ သော့ချက်စကားလုံးများ။"}},
 {cat:"alphabet",type:"video",meta:{en:"9 min",my:"၉ မိနစ်"},title:{en:"Consonants in three groups",my:"ဗျည်းများကို အုပ်စု ၃ စုဖြင့် လေ့လာပါ"},desc:{en:"Middle, high and low class consonants, explained simply.",my:"အလယ်၊ အမြင့်၊ အနိမ့် အတန်းအစား ဗျည်းများကို ရိုးရှင်းစွာ ရှင်းပြထားပါတယ်။"}},
 {cat:"tones",type:"audio",meta:{en:"4 min",my:"၄ မိနစ်"},title:{en:"Five tones drill",my:"Tone ငါးမျိုး လေ့ကျင့်ခန်း"},desc:{en:"Hear maa, gài, khâao, máa and mǎa, then copy them.",my:"maa, gài, khâao, máa, mǎa ကို နားထောင်ပြီး လိုက်ပြောပါ။"}},
 {cat:"tones",type:"article",meta:{en:"5 min read",my:"၅ မိနစ် ဖတ်ရန်"},title:{en:"Why tones matter",my:"Tone ဘာကြောင့် အရေးကြီးလဲ"},desc:{en:"Common mix-ups learners make, and how to avoid them.",my:"လေ့လာသူတွေ မကြာခဏ မှားတတ်တဲ့ အမှားများနဲ့ ရှောင်နည်း။"}},
 {cat:"culture",type:"article",meta:{en:"4 min read",my:"၄ မိနစ် ဖတ်ရန်"},title:{en:"The wai: when and how",my:"လက်အုပ်ချီ (wai) - ဘယ်အချိန်၊ ဘယ်လို"},desc:{en:"Greeting etiquette without the awkward moments.",my:"အနေရခက်တဲ့ အခိုက်အတန့် မရှိဘဲ နှုတ်ဆက်ပုံ။"}},
 {cat:"culture",type:"video",meta:{en:"7 min",my:"၇ မိနစ်"},title:{en:"Riding a songthaew",my:"ဆောင်တေးကား စီးနည်း"},desc:{en:"Where to wait, what to say and how to pay.",my:"ဘယ်မှာ စောင့်ရမလဲ၊ ဘာပြောရမလဲ၊ ဘယ်လို ပေးချေရမလဲ။"}}
];
export const FAQS =[
 {q:{en:"I’ve never studied Thai. Can I join?",my:"ထိုင်းစာ တစ်ခါမှ မသင်ဖူးပါဘူး။ တက်လို့ရလား?"},a:{en:"Yes. Survival Starter assumes zero Thai, and everything is explained in Burmese or English.",my:"ရပါတယ်။ Survival Starter က ထိုင်းစကား လုံးဝမသိသူတွေအတွက်ဖြစ်ပြီး အားလုံးကို မြန်မာ သို့မဟုတ် အင်္ဂလိပ်လို ရှင်းပြပေးပါတယ်။"}},
 {q:{en:"Can I study online?",my:"အွန်လိုင်းကနေ တက်လို့ရလား?"},a:{en:"Yes. Most courses have a weekend online group. You’ll need a phone or computer with a stable connection.",my:"ရပါတယ်။ သင်တန်းအများစုမှာ စနေ၊ တနင်္ဂနွေ အွန်လိုင်းအုပ်စု ရှိပါတယ်။ အင်တာနက် ကောင်းကောင်းရတဲ့ ဖုန်း သို့မဟုတ် ကွန်ပျူတာ လိုပါတယ်။"}},
 {q:{en:"How long until I can hold a conversation?",my:"စကားပြောနိုင်ဖို့ ဘယ်လောက်ကြာမလဲ?"},a:{en:"Most students handle everyday situations after Survival Starter (8 weeks), and chat comfortably after Everyday Thai.",my:"ကျောင်းသားအများစုဟာ Survival Starter (၈ ပတ်) ပြီးရင် နေ့စဉ်အခြေအနေတွေကို ကိုင်တွယ်နိုင်ပြီး Everyday Thai ပြီးရင် သက်သက်သာသာ စကားပြောနိုင်ပါတယ်။"}},
 {q:{en:"Do I need to learn the Thai alphabet?",my:"ထိုင်းအက္ခရာ သင်ဖို့ လိုသလား?"},a:{en:"Not at first. Levels 1 and 2 use romanization; Level 3 teaches reading and writing.",my:"အစပိုင်းမှာ မလိုပါဘူး။ အဆင့် ၁ နဲ့ ၂ မှာ ရောမန်အက္ခရာ သုံးပြီး အဆင့် ၃ မှာ စာဖတ်၊ စာရေး သင်ပါတယ်။"}},
 {q:{en:"How do I pay?",my:"ဘယ်လို ပေးချေရမလဲ?"},a:{en:"Cash at the centre, bank transfer or KBZPay. You pay per course, not per class.",my:"သင်တန်းကျောင်းမှာ ငွေသား၊ ဘဏ်လွှဲ သို့မဟုတ် KBZPay ဖြင့် ပေးချေနိုင်ပါတယ်။ အတန်းတစ်ခုချင်းမဟုတ်ဘဲ သင်တန်းတစ်ခုလုံးအတွက် ပေးချေရပါတယ်။"}},
 {q:{en:"What if I miss a class?",my:"အတန်း ပျက်ရင် ဘယ်လိုလုပ်မလဲ?"},a:{en:"Every class comes with a phrase sheet and audio, and you can join another group that week to catch up.",my:"အတန်းတိုင်းအတွက် စကားစုစာရွက်နဲ့ အသံဖိုင် ရှိပြီး အဲဒီအပတ်မှာ တခြားအုပ်စုနဲ့ လိုက်တက်လို့ ရပါတယ်။"}}
];


// ---- Contact page details ----
// Fill these in to show the matching contact card at the top of the Contact page.
// Leave a value empty ('') to hide that card.
export const CONTACT_INFO = {
  messenger: '', // e.g. 'https://m.me/yourpage' or 'https://facebook.com/yourpage'
  phone: '',     // e.g. '+95 9 123 456 789'
  email: '',     // e.g. 'hello@survivalthai.com'
  // Map pin + "Get directions" (Star City, Thanlyin)
  lat: 16.7765325,
  lng: 96.2285128,
  // Opening hours in Yangon time. days: 0 = Sunday … 6 = Saturday.
  hours: [
    { days: [1, 2, 3, 4, 5], open: '10:00', close: '20:00' },
    { days: [0, 6], open: '09:00', close: '17:00' },
  ],
};
