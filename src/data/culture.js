// Six Thai festivals for the "Learn through culture" cards on the Home page.
// Photos are free-licensed from Wikimedia Commons; credits in src/assets/culture/SOURCES.md.
import songkran from '../assets/culture/songkran.webp';
import loyKrathong from '../assets/culture/loy-krathong.webp';
import yiPeng from '../assets/culture/yi-peng.webp';
import phiTaKhon from '../assets/culture/phi-ta-khon.webp';
import candle from '../assets/culture/candle-festival.webp';
import bunBangFai from '../assets/culture/bun-bang-fai.webp';

// Each story: front = photo, category, title, when/where; back = story, Thai word,
// and (for two festivals) a line linking it to a Myanmar festival.
export const CULTURE_STORIES = [
  {
    id: 'songkran',
    credit: 'CEphoto, Uwe Aranas · CC BY-SA 4.0', // photo: Wikimedia Commons
    image: songkran,
    title: { en: 'Songkran', my: 'သင်္ကြန်' },
    category: { en: 'NEW YEAR · WATER', my: 'နှစ်သစ် · ရေပက်' },
    when: { en: 'April · Tha Phae Gate, Chiang Mai', my: 'ဧပြီလ · ချင်းမိုင်၊ ထာဖေးဂိတ်' },
    description: {
      en: 'Thai New Year. People splash water to wash away the old year, and pour water over elders’ hands to ask for their blessing.',
      my: 'ထိုင်းတွေရဲ့ နှစ်သစ်ကူးပွဲတော်ပါ။ နှစ်ဟောင်းက မကောင်းတာတွေ ပါသွားအောင် အချင်းချင်း ရေပက်ကြတယ်။ အိမ်က လူကြီးတွေကိုလည်း ရေလောင်းကန်တော့ပြီး ဆုတောင်းပေးခိုင်းကြပါတယ်။',
    },
    link: {
      en: 'Sounds familiar? Just like Thingyan in Myanmar, it welcomes the new year with water in April.',
      my: 'မြန်မာ့သင်္ကြန်နဲ့ အရမ်းဆင်တယ်နော်။ ဧပြီလမှာ ရေပက်ပြီး နှစ်သစ်ကို ကြိုကြတာချင်း အတူတူပဲ။',
    },
    thai: 'สาดน้ำ',
    gloss: { en: 'sàat-náam · to splash water', my: 'sàat-náam · ရေပက်တယ်' },
  },
  {
    id: 'loy-krathong',
    credit: 'Rockybgonzales · CC BY-SA 4.0', // photo: Wikimedia Commons
    image: loyKrathong,
    title: { en: 'Loy Krathong', my: 'လွိုင်ကရားထုံ' },
    category: { en: 'LIGHTS · RIVER', my: 'မီးရောင် · မြစ်' },
    when: { en: 'November full moon · all over Thailand', my: 'နိုဝင်ဘာလ လပြည့်ည · ထိုင်းတစ်နိုင်ငံလုံး' },
    description: {
      en: 'People float small baskets of banana leaves, flowers and candles on rivers, to thank the water and let go of bad luck.',
      my: 'ငှက်ပျောဖက်၊ ပန်းနဲ့ ဖယောင်းတိုင်လေးတွေနဲ့ ကြာထုံလေးတွေ လုပ်ပြီး မြစ်ထဲ မျှောကြတယ်။ ရေကို ကျေးဇူးတင်တဲ့အနေနဲ့ရော၊ ကံဆိုးတွေ မျောပါသွားပါစေဆိုပြီးရော မျှောကြတာပါ။',
    },
    link: {
      en: 'Like Tazaungdaing in Myanmar, it lights up the November full-moon night.',
      my: 'မြန်မာ့ တန်ဆောင်တိုင်လိုပဲ တန်ဆောင်မုန်းလပြည့်ညမှာ မီးရောင်တွေနဲ့ စည်ကားတဲ့ ပွဲပါ။',
    },
    thai: 'ลอย',
    gloss: { en: 'loi · to float', my: 'loi · မျောတယ်' },
  },
  {
    id: 'yi-peng',
    credit: 'Carlos Adampol Galindo · CC BY-SA 2.0', // photo: Wikimedia Commons
    image: yiPeng,
    title: { en: 'Yi Peng', my: 'ယီပင်း' },
    category: { en: 'LANTERNS · WISHES', my: 'မီးပုံး · ဆုတောင်း' },
    when: { en: 'November · Chiang Mai', my: 'နိုဝင်ဘာလ · ချင်းမိုင်' },
    description: {
      en: 'On the same full moon, the north fills the night sky with glowing paper lanterns, each one carrying a wish.',
      my: 'လွိုင်ကရားထုံနဲ့ တစ်ညတည်းမှာပဲ ချင်းမိုင်ကောင်းကင်ဟာ မီးပုံးပျံလေးတွေနဲ့ ပြည့်သွားတယ်။ မီးပုံးတစ်လုံးစီမှာ ဆုတောင်းတစ်ခုစီ ထည့်ပြီး လွှတ်ကြတာပါ။',
    },
    thai: 'โคมลอย',
    gloss: { en: 'khoom-loi · floating lantern', my: 'khoom-loi · မီးပုံးပျံ' },
  },
  {
    id: 'phi-ta-khon',
    credit: 'E.D.W. · Public domain', // photo: Wikimedia Commons
    image: phiTaKhon,
    title: { en: 'Phi Ta Khon', my: 'ဖီတာခုန်' },
    category: { en: 'MASKS · PARADE', my: 'မျက်နှာဖုံး · ပျော်ပွဲ' },
    when: { en: 'June or July · Dan Sai, Loei', my: 'ဇွန် ဒါမှမဟုတ် ဇူလိုင်လ · လိုအေး၊ ဒန်ဆိုင်' },
    description: {
      en: 'A playful “ghost festival”: colourful masks made from rice baskets and coconut trees, music and dancing parades.',
      my: '“သရဲပွဲတော်” လို့ ခေါ်ပေမယ့် ကြောက်စရာ မဟုတ်ဘဲ အရမ်းပျော်ဖို့ကောင်းတယ်။ ကောက်ညှင်းပေါင်းတဲ့ တောင်းနဲ့ အုန်းပင်အစိတ်အပိုင်းတွေကို သုံးပြီး ရောင်စုံမျက်နှာဖုံးတွေ လုပ်ဝတ်ကြတယ်။ ဆိုင်းသံနဲ့အတူ လမ်းပေါ်မှာ လှည့်လည်ကခုန်ကြပါတယ်။',
    },
    thai: 'ผี',
    gloss: { en: 'phǐi · ghost, spirit', my: 'phǐi · သရဲ၊ တစ္ဆေ' },
  },
  {
    id: 'candle-festival',
    credit: 'Warmbloodydew · CC BY-SA 4.0', // photo: Wikimedia Commons
    image: candle,
    title: { en: 'Candle Festival', my: 'ဖယောင်းတိုင်ပွဲတော်' },
    category: { en: 'FAITH · CRAFT', my: 'သဒ္ဓါ · လက်ရာ' },
    when: { en: 'July · Ubon Ratchathani', my: 'ဇူလိုင်လ · ဥဘုန်ရာချသာနီ' },
    description: {
      en: 'To mark the start of Buddhist Lent, communities carve giant wax candles, parade them through the city and offer them to temples.',
      my: 'ဝါဆိုချိန်ရောက်ရင် ဥဘုန်မြို့က ရပ်ကွက်တွေဟာ ဖယောင်းတိုင်ကြီးတွေကို လက်ရာမြောက်မြောက် ထွင်းထုကြတယ်။ ပြီးရင် မြို့ထဲမှာ လှည့်လည်ပြီး ဘုန်းကြီးကျောင်းကို လှူကြပါတယ်။',
    },
    thai: 'เทียน',
    gloss: { en: 'thian · candle', my: 'thian · ဖယောင်းတိုင်' },
  },
  {
    id: 'bun-bang-fai',
    credit: 'Ian Taylor (iantaylor.ca) · CC BY 4.0', // photo: Wikimedia Commons
    image: bunBangFai,
    focus: '55% 50%', // keep the rocket trail and launch crew in frame
    title: { en: 'Bun Bang Fai', my: 'ဘွန်ဘန်ဖိုင်' },
    category: { en: 'RAIN · ROCKETS', my: 'မိုး · ဒုံးပျံ' },
    when: { en: 'May · Yasothon & across Isan', my: 'မေလ · ယာဆိုသွန်နဲ့ အီသန်ဒေသ' },
    description: {
      en: 'The rocket festival: villages build and launch homemade rockets to ask the sky for rain before the rice-planting season.',
      my: 'ဒုံးပျံပွဲတော်ပေါ့။ လယ်စိုက်ရာသီ မစခင် မိုးကောင်းကောင်း ရွာပါစေဆိုပြီး ရွာတိုင်းက ကိုယ်တိုင်လုပ်ထားတဲ့ ဒုံးပျံတွေကို ကောင်းကင်ထဲ လွှတ်တင်ပြိုင်ကြတယ်။',
    },
    thai: 'บั้งไฟ',
    gloss: { en: 'bâng-fai · rocket', my: 'bâng-fai · ဒုံးပျံ' },
  },
];
