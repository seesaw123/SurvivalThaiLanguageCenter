// Site content. Each text field has an English (en) and Myanmar (my) version.

export const ORDER =["home","courses","teachers","resources","faq","contact","about"];
export const PALETTES =[["teal","Original","#12302D","#E8913A","#F5EFE3"],["lanna","Lanna temple","#5E1414","#D4A62A","#FBF3E4"],["lantern","Lantern night","#1A1B3F","#FF7A59","#FFF6E8"],["jungle","Jungle green","#173A2A","#B5D94A","#F3F5EC"],["bright","Light & bright","#EAF1FF","#2563EB","#FFFFFF"]];

// All 44 Thai consonants (the full script, including the two obsolete letters
// still taught as part of the 44). Used to randomly deal letters onto the cube.
export const ALPHABET =[
 {g:"ก",name:"gor gài",word:"ไก่",mean:{en:"chicken",my:"ကြက်"}},
 {g:"ข",name:"khǒr khài",word:"ไข่",mean:{en:"egg",my:"ကြက်ဥ"}},
 {g:"ฃ",name:"khǒr khùat",word:"ขวด",mean:{en:"bottle",my:"ပုလင်း"}},
 {g:"ค",name:"khor khwaai",word:"ควาย",mean:{en:"buffalo",my:"ကျွဲ"}},
 {g:"ฅ",name:"khor khon",word:"คน",mean:{en:"person",my:"လူ"}},
 {g:"ฆ",name:"khor rákhang",word:"ระฆัง",mean:{en:"bell",my:"ခေါင်းလောင်း"}},
 {g:"ง",name:"ngor nguu",word:"งู",mean:{en:"snake",my:"မြွေ"}},
 {g:"จ",name:"jor jaan",word:"จาน",mean:{en:"plate",my:"ပန်းကန်ပြား"}},
 {g:"ฉ",name:"chǒr chìng",word:"ฉิ่ง",mean:{en:"small cymbals",my:"လက်ခုန်း"}},
 {g:"ช",name:"chor cháang",word:"ช้าง",mean:{en:"elephant",my:"ဆင်"}},
 {g:"ซ",name:"sor sôo",word:"โซ่",mean:{en:"chain",my:"သံကြိုး"}},
 {g:"ฌ",name:"chor cher",word:"เฌอ",mean:{en:"tree",my:"သစ်ပင်"}},
 {g:"ญ",name:"yor yǐng",word:"หญิง",mean:{en:"woman",my:"မိန်းမ"}},
 {g:"ฎ",name:"dor chádaa",word:"ชฎา",mean:{en:"headdress",my:"ဦးထုပ်"}},
 {g:"ฏ",name:"tor patàk",word:"ปฏัก",mean:{en:"goad",my:"ဆင်ထိုးချောင်း"}},
 {g:"ฐ",name:"thǒr thǎan",word:"ฐาน",mean:{en:"pedestal",my:"ခြေခံပေါက်"}},
 {g:"ฑ",name:"thor montho",word:"มณโฑ",mean:{en:"Montho (a character name)",my:"မုန်းထို (ဇာတ်ကောင်)"}},
 {g:"ฒ",name:"thor phûuthâo",word:"ผู้เฒ่า",mean:{en:"elder",my:"အသက်ကြီးသူ"}},
 {g:"ณ",name:"nor nen",word:"เณร",mean:{en:"novice monk",my:"ကိုရင်"}},
 {g:"ด",name:"dor dèk",word:"เด็ก",mean:{en:"child",my:"ကလေး"}},
 {g:"ต",name:"tor tào",word:"เต่า",mean:{en:"turtle",my:"လိပ်"}},
 {g:"ถ",name:"thǒr thǔng",word:"ถุง",mean:{en:"sack",my:"အိတ်"}},
 {g:"ท",name:"thor thahǎan",word:"ทหาร",mean:{en:"soldier",my:"စစ်သား"}},
 {g:"ธ",name:"thor thong",word:"ธง",mean:{en:"flag",my:"အလံ"}},
 {g:"น",name:"nor nǔu",word:"หนู",mean:{en:"mouse",my:"ကြွက်"}},
 {g:"บ",name:"bor baimái",word:"ใบไม้",mean:{en:"leaf",my:"အရွက်"}},
 {g:"ป",name:"por plaa",word:"ปลา",mean:{en:"fish",my:"ငါး"}},
 {g:"ผ",name:"phǒr phûeng",word:"ผึ้ง",mean:{en:"bee",my:"ပျား"}},
 {g:"ฝ",name:"fǒr fǎa",word:"ฝา",mean:{en:"lid",my:"အဖုံး"}},
 {g:"พ",name:"phor phaan",word:"พาน",mean:{en:"offering tray",my:"ပန်းကန်ခုံ"}},
 {g:"ฟ",name:"for fan",word:"ฟัน",mean:{en:"teeth",my:"သွား"}},
 {g:"ภ",name:"phor sǎmphao",word:"สำเภา",mean:{en:"junk (ship)",my:"သင်္ဘော"}},
 {g:"ม",name:"mor máa",word:"ม้า",mean:{en:"horse",my:"မြင်း"}},
 {g:"ย",name:"yor yák",word:"ยักษ์",mean:{en:"giant",my:"ဘီလူး"}},
 {g:"ร",name:"ror ruea",word:"เรือ",mean:{en:"boat",my:"လှေ"}},
 {g:"ล",name:"lor ling",word:"ลิง",mean:{en:"monkey",my:"မျောက်"}},
 {g:"ว",name:"wor wǎen",word:"แหวน",mean:{en:"ring",my:"လက်စွပ်"}},
 {g:"ศ",name:"sǒr sǎalaa",word:"ศาลา",mean:{en:"pavilion",my:"မဏ္ဍပ်"}},
 {g:"ษ",name:"sǒr rʉ̌ʉsǐi",word:"ฤๅษี",mean:{en:"hermit",my:"ရသေ့"}},
 {g:"ส",name:"sǒr sʉ̌ea",word:"เสือ",mean:{en:"tiger",my:"ကျား"}},
 {g:"ห",name:"hǒr hìip",word:"หีบ",mean:{en:"chest",my:"သေတ္တာ"}},
 {g:"ฬ",name:"lor jùlaa",word:"จุฬา",mean:{en:"kite",my:"လေကူးစားအရုပ်"}},
 {g:"อ",name:"or àang",word:"อ่าง",mean:{en:"basin",my:"ကန်"}},
 {g:"ฮ",name:"hor nók-hûuk",word:"นกฮูก",mean:{en:"owl",my:"ဇီးကွက်"}}
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
export const TONES =[
 {name:{en:"Mid tone",my:"အလယ်အသံ"},word:"มา",rom:"maa",mean:{en:"come",my:"လာ"},path:"M30 100 C150 100 260 100 370 100",desc:{en:"Flat and relaxed, in your normal speaking voice.",my:"ပုံမှန် စကားပြောသံအတိုင်း ညီညီညာညာ ပြောပါ။"}},
 {name:{en:"Low tone",my:"အနိမ့်အသံ"},word:"ไก่",rom:"gài",mean:{en:"chicken",my:"ကြက်"},path:"M30 120 C150 130 260 148 370 160",desc:{en:"Starts a little low and sinks lower.",my:"နည်းနည်း နိမ့်နိမ့်က စပြီး ပိုနိမ့်သွားပါတယ်။"}},
 {name:{en:"Falling tone",my:"အကျအသံ"},word:"ข้าว",rom:"khâao",mean:{en:"rice",my:"ထမင်း"},path:"M30 75 C130 40 230 55 370 165",desc:{en:"Rises briefly, then drops sharply, like a firm statement.",my:"ခဏတက်ပြီး ရုတ်တရက် ပြန်ကျသွားပါတယ် — ပြတ်ပြတ်သားသား ပြောသလိုပါ။"}},
 {name:{en:"High tone",my:"အမြင့်အသံ"},word:"ม้า",rom:"máa",mean:{en:"horse",my:"မြင်း"},path:"M30 70 C150 68 260 55 370 30",desc:{en:"Starts high and climbs a touch higher.",my:"မြင့်မြင့်က စပြီး နည်းနည်း ပိုမြင့်သွားပါတယ်။"}},
 {name:{en:"Rising tone",my:"အတက်အသံ"},word:"หมา",rom:"mǎa",mean:{en:"dog",my:"ခွေး"},path:"M30 115 C130 155 240 150 370 40",desc:{en:"Dips, then rises, like asking “really?” in English.",my:"အရင် နိမ့်ကျပြီး ပြန်တက်လာပါတယ် — အင်္ဂလိပ်လို “really?” လို့ မေးသလိုပါ။"}}
];
export const COURSES =[
 {name:"Survival Starter",price:{en:"120,000 MMK",my:"၁၂၀,၀၀၀ ကျပ်"},dur:{en:"8 weeks · 16 classes",my:"၈ ပတ် · အတန်း ၁၆ ကြိမ်"},
  desc:{en:"Greetings, numbers, prices, ordering food and giving directions to a driver.",my:"နှုတ်ဆက်ခြင်း၊ ဂဏန်းများ၊ ဈေးနှုန်းမေးခြင်း၊ အစားအသောက်မှာခြင်းနဲ့ ယာဉ်မောင်းကို လမ်းညွှန်ခြင်း။"},
  topics:{en:["Greetings and polite particles","Numbers, money and prices","Food, taxis and directions"],my:["နှုတ်ဆက်စကားနဲ့ ယဉ်ကျေးစကား","ဂဏန်း၊ ငွေနဲ့ ဈေးနှုန်း","အစားအသောက်၊ တက္ကစီနဲ့ လမ်းညွှန်"]}},
 {name:"Everyday Thai",price:{en:"160,000 MMK",my:"၁၆၀,၀၀၀ ကျပ်"},dur:{en:"10 weeks · 20 classes",my:"၁၀ ပတ် · အတန်း ၂၀ ကြိမ်"},
  desc:{en:"Small talk, market bargaining, tones you can hear, and sentences beyond the basics.",my:"နေ့စဉ်စကားပြော၊ ဈေးဆစ်ခြင်း၊ tone ခွဲခြားနားထောင်ခြင်းနဲ့ အခြေခံထက် ပိုတဲ့ ဝါကျများ။"},
  topics:{en:["Hearing and saying the five tones","Work, housing and clinic talk","Bargaining and small talk"],my:["tone ၅ မျိုးကို ကြားပြီး ပြောနိုင်ခြင်း","အလုပ်၊ အိမ်ငှားနဲ့ ဆေးခန်း စကားပြော","ဈေးဆစ်ခြင်းနဲ့ နေ့စဉ်စကားပြော"]}},
 {name:"Read & Write",price:{en:"200,000 MMK",my:"၂၀၀,၀၀၀ ကျပ်"},dur:{en:"12 weeks · 24 classes",my:"၁၂ ပတ် · အတန်း ၂၄ ကြိမ်"},
  desc:{en:"The 44 consonants, vowels and tone rules, so you can read menus, signs and street names.",my:"ဗျည်း ၄၄ လုံး၊ သရများနဲ့ tone စည်းမျဉ်းများ — မီနူး၊ ဆိုင်းဘုတ်နဲ့ လမ်းနာမည်တွေကို ဖတ်နိုင်အောင်။"},
  topics:{en:["The 44 consonants and the vowels","Tone rules","Reading signs, menus and forms"],my:["ဗျည်း ၄၄ လုံးနဲ့ သရများ","tone စည်းမျဉ်းများ","ဆိုင်းဘုတ်၊ မီနူးနဲ့ ဖောင်များ ဖတ်ခြင်း"]}}
];
export const LANGN ={th:{en:"Thai",my:"ထိုင်း"},my:{en:"Burmese",my:"မြန်မာ"},en:{en:"English",my:"အင်္ဂလိပ်"}};
export const TEACHERS =[
 {name:"Kru Ploy",native:"ครูพลอย",cls:"th",ini:"KP",langs:["th","en"],teaches:["Everyday Thai","Read & Write"],role:{en:"Head teacher",my:"ဆရာမကြီး"},
  bio:{en:"Grew up in Chiang Mai and has taught Thai to newcomers for years. Loves turning tone rules into little songs that stick.",my:"ချင်းမိုင်မှာ ကြီးပြင်းခဲ့ပြီး ထိုင်းနိုင်ငံကို ရောက်လာသူတွေကို ထိုင်းစကား နှစ်ပေါင်းများစွာ သင်ပေးခဲ့ပါတယ်။ tone စည်းမျဉ်းတွေကို မှတ်မိလွယ်တဲ့ သီချင်းလေးတွေအဖြစ် ပြောင်းသင်ရတာ ဝါသနာပါပါတယ်။"}},
 {name:"Aung Min",native:"ဆရာ အောင်မင်း",cls:"mm",ini:"AM",langs:["my","th","en"],teaches:["Survival Starter"],role:{en:"Level 1 teacher",my:"အဆင့် ၁ ဆရာ"},
  bio:{en:"Moved to Thailand for work and learned Thai the hard way. Now he teaches the shortcuts he wishes he’d had.",my:"အလုပ်အတွက် ထိုင်းနိုင်ငံကို ပြောင်းရွှေ့ခဲ့ပြီး ထိုင်းစကားကို ခက်ခက်ခဲခဲ သင်ယူခဲ့ရပါတယ်။ အခုတော့ သူကိုယ်တိုင် လိုချင်ခဲ့တဲ့ ဖြတ်လမ်းနည်းတွေကို ပြန်သင်ပေးနေပါတယ်။"}},
 {name:"Hnin Wai",native:"ဆရာမ နှင်းဝေ",cls:"mm",ini:"HW",langs:["my","th"],teaches:["Read & Write"],role:{en:"Reading & writing teacher",my:"စာဖတ်၊ စာရေး ဆရာမ"},
  bio:{en:"Specialist in the Thai alphabet. Her memory tricks make all 44 consonants stick, even for students who say they’re bad at letters.",my:"ထိုင်းအက္ခရာ ကျွမ်းကျင်သူပါ။ သူ့ရဲ့ မှတ်ဉာဏ်နည်းလမ်းတွေက “စာလုံးမှတ်ရခက်တယ်” ဆိုတဲ့ ကျောင်းသားတွေတောင် ဗျည်း ၄၄ လုံးကို မှတ်မိသွားစေပါတယ်။"}},
 {name:"Kru Nok",native:"ครูนก",cls:"th",ini:"KN",langs:["th","en"],teaches:["Survival Starter","Everyday Thai"],role:{en:"Conversation coach",my:"စကားပြော နည်းပြ"},
  bio:{en:"Runs our role-play sessions: market stalls, clinic visits and job interviews, all in Thai and all at real speed.",my:"ဈေးဆိုင်၊ ဆေးခန်းပြခြင်းနဲ့ အလုပ်အင်တာဗျူး စတဲ့ သရုပ်ဆောင် လေ့ကျင့်ခန်းတွေကို ထိုင်းလိုချည်း၊ တကယ့်အမြန်နှုန်းနဲ့ ဦးဆောင်ပါတယ်။"}}
];
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
 {q:{en:"Is the trial class really free?",my:"အစမ်းအတန်းက တကယ် အခမဲ့လား?"},a:{en:"Yes. One full class, and we don’t ask for payment details.",my:"ဟုတ်ကဲ့ — အတန်းတစ်ခုလုံး အခမဲ့ဖြစ်ပြီး ငွေပေးချေမှု အချက်အလက် မတောင်းပါဘူး။"}},
 {q:{en:"Can I study online?",my:"အွန်လိုင်းကနေ တက်လို့ရလား?"},a:{en:"Yes. Most courses have a weekend online group. You’ll need a phone or computer with a stable connection.",my:"ရပါတယ်။ သင်တန်းအများစုမှာ စနေ၊ တနင်္ဂနွေ အွန်လိုင်းအုပ်စု ရှိပါတယ်။ အင်တာနက် ကောင်းကောင်းရတဲ့ ဖုန်း သို့မဟုတ် ကွန်ပျူတာ လိုပါတယ်။"}},
 {q:{en:"How long until I can hold a conversation?",my:"စကားပြောနိုင်ဖို့ ဘယ်လောက်ကြာမလဲ?"},a:{en:"Most students handle everyday situations after Survival Starter (8 weeks), and chat comfortably after Everyday Thai.",my:"ကျောင်းသားအများစုဟာ Survival Starter (၈ ပတ်) ပြီးရင် နေ့စဉ်အခြေအနေတွေကို ကိုင်တွယ်နိုင်ပြီး Everyday Thai ပြီးရင် သက်သက်သာသာ စကားပြောနိုင်ပါတယ်။"}},
 {q:{en:"Do I need to learn the Thai alphabet?",my:"ထိုင်းအက္ခရာ သင်ဖို့ လိုသလား?"},a:{en:"Not at first. Levels 1 and 2 use romanization; Level 3 teaches reading and writing.",my:"အစပိုင်းမှာ မလိုပါဘူး။ အဆင့် ၁ နဲ့ ၂ မှာ ရောမန်အက္ခရာ သုံးပြီး အဆင့် ၃ မှာ စာဖတ်၊ စာရေး သင်ပါတယ်။"}},
 {q:{en:"How do I pay?",my:"ဘယ်လို ပေးချေရမလဲ?"},a:{en:"Cash at the centre, bank transfer or KBZPay. You pay per course, not per class.",my:"သင်တန်းကျောင်းမှာ ငွေသား၊ ဘဏ်လွှဲ သို့မဟုတ် KBZPay ဖြင့် ပေးချေနိုင်ပါတယ်။ အတန်းတစ်ခုချင်းမဟုတ်ဘဲ သင်တန်းတစ်ခုလုံးအတွက် ပေးချေရပါတယ်။"}},
 {q:{en:"What if I miss a class?",my:"အတန်း ပျက်ရင် ဘယ်လိုလုပ်မလဲ?"},a:{en:"Every class comes with a phrase sheet and audio, and you can join another group that week to catch up.",my:"အတန်းတိုင်းအတွက် စကားစုစာရွက်နဲ့ အသံဖိုင် ရှိပြီး အဲဒီအပတ်မှာ တခြားအုပ်စုနဲ့ လိုက်တက်လို့ ရပါတယ်။"}}
];

