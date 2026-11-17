export const site = {
  name: 'X Note',
  url: 'https://xnote-perfume.tech',
  description:
    'X Note perfumes in 10, 30 and 50 ml with every note listed. Order online and confirm on WhatsApp, with delivery across Egypt.',
  descriptionAr:
    'عطور X Note بأحجام 10 و30 و50 مل مع كل نوتاتها. اطلب أونلاين وأكّد طلبك على واتساب، مع توصيل لكل محافظات مصر.',
  currency: 'EGP',
  currencyAr: 'ج.م',
  whatsapp: '201550933501',
  shipping: [
    {
      key: 'normal',
      name: 'Normal shipping',
      days: '3 to 5 business days',
      nameAr: 'الشحن العادي',
      daysAr: 'من 3 إلى 5 أيام عمل',
      price: 85,
    },
    {
      key: 'fast',
      name: 'Fast shipping',
      days: '1 to 2 business days',
      nameAr: 'الشحن السريع',
      daysAr: 'من يوم إلى يومين عمل',
      price: 125,
    },
  ],
  payments: [
    { key: 'vodafone', name: 'Vodafone Cash', nameAr: 'فودافون كاش' },
    { key: 'instapay', name: 'InstaPay', nameAr: 'إنستاباي' },
  ],
  social: [
    { name: 'Instagram', nameAr: 'إنستجرام', url: 'https://www.instagram.com/x_note.perfume' },
    { name: 'TikTok', nameAr: 'تيك توك', url: 'https://www.tiktok.com/@x_note.perfume' },
    { name: 'Facebook', nameAr: 'فيسبوك', url: 'https://www.facebook.com/share/187yo3sEeT/' },
  ],
  credit: { name: 'Saeed', url: 'https://github.com/saeeedhany' },
};

export const governorates = [
  ['Cairo', 'القاهرة'],
  ['Giza', 'الجيزة'],
  ['Alexandria', 'الإسكندرية'],
  ['Qalyubia', 'القليوبية'],
  ['Sharqia', 'الشرقية'],
  ['Dakahlia', 'الدقهلية'],
  ['Gharbia', 'الغربية'],
  ['Monufia', 'المنوفية'],
  ['Beheira', 'البحيرة'],
  ['Kafr El Sheikh', 'كفر الشيخ'],
  ['Damietta', 'دمياط'],
  ['Port Said', 'بورسعيد'],
  ['Ismailia', 'الإسماعيلية'],
  ['Suez', 'السويس'],
  ['Faiyum', 'الفيوم'],
  ['Beni Suef', 'بني سويف'],
  ['Minya', 'المنيا'],
  ['Asyut', 'أسيوط'],
  ['Sohag', 'سوهاج'],
  ['Qena', 'قنا'],
  ['Luxor', 'الأقصر'],
  ['Aswan', 'أسوان'],
  ['Red Sea', 'البحر الأحمر'],
  ['New Valley', 'الوادي الجديد'],
  ['Matrouh', 'مطروح'],
  ['North Sinai', 'شمال سيناء'],
  ['South Sinai', 'جنوب سيناء'],
];

export const sizeGuide = [
  {
    ml: 10,
    sprays: 'about 140 sprays',
    use: 'Try a scent for a few weeks, or carry it in your bag.',
    spraysAr: 'حوالي 140 بخة',
    useAr: 'لتجرّب العطر لعدة أسابيع، أو لتحمله في حقيبتك.',
  },
  {
    ml: 30,
    sprays: 'about 420 sprays',
    use: 'A few months of daily wear.',
    spraysAr: 'حوالي 420 بخة',
    useAr: 'تكفي عدة أشهر من الاستخدام اليومي.',
  },
  {
    ml: 50,
    sprays: 'about 700 sprays',
    use: 'Your signature, or a gift that feels complete.',
    spraysAr: 'حوالي 700 بخة',
    useAr: 'لعطرك المفضل، أو هدية متكاملة.',
  },
];

export const faqs = {
  en: [
    {
      q: 'How do I order?',
      a: 'Add fragrances to your cart, fill in your delivery details and tap Place order. WhatsApp opens with your order written out. Send that message and we confirm it, usually within 24 hours.',
    },
    {
      q: 'How do I pay?',
      a: 'We accept Vodafone Cash and InstaPay. After we confirm your order on WhatsApp, we send you the payment details. You only pay once your order and delivery are confirmed.',
    },
    {
      q: 'How long does delivery take and what does it cost?',
      a: 'Normal shipping takes 3 to 5 business days and costs 85 EGP. Fast shipping takes 1 to 2 business days and costs 125 EGP. You choose at checkout and the cost is shown before you order.',
    },
    {
      q: 'Which size should I choose?',
      a: 'The 10 ml bottle is about 140 sprays, enough to live with a scent for a few weeks. The 30 ml lasts a few months of daily wear, and the 50 ml is the one to choose for a signature scent or a gift.',
    },
    {
      q: 'Can I change or cancel my order?',
      a: 'Yes. Message us on WhatsApp as soon as you can. Until your order ships, we can change or cancel it.',
    },
    {
      q: 'Do you gift wrap?',
      a: 'Yes. Write it in the notes field at checkout, along with any message you would like on the card.',
    },
    {
      q: 'How do I choose a fragrance?',
      a: 'Start with the notes you already like. Every fragrance page lists its notes, and you can filter the shop by any note. If you are unsure, message us on WhatsApp and we will help you pick.',
    },
  ],
  ar: [
    {
      q: 'كيف أطلب؟',
      a: 'أضف العطور إلى السلة، واكتب بيانات التوصيل، ثم اضغط «أرسل الطلب على واتساب». سيفتح واتساب ورسالة طلبك جاهزة. أرسلها ونؤكد طلبك، غالبًا خلال 24 ساعة.',
    },
    {
      q: 'كيف أدفع؟',
      a: 'نقبل فودافون كاش وإنستاباي. بعد أن نؤكد طلبك على واتساب نرسل لك بيانات الدفع. لا تدفع إلا بعد تأكيد الطلب والتوصيل.',
    },
    {
      q: 'كم يستغرق التوصيل وكم تكلفته؟',
      a: 'الشحن العادي من 3 إلى 5 أيام عمل بتكلفة 85 ج.م، والشحن السريع من يوم إلى يومين عمل بتكلفة 125 ج.م. تختار عند إتمام الطلب، وتظهر التكلفة قبل أن ترسله.',
    },
    {
      q: 'أي حجم أختار؟',
      a: 'زجاجة 10 مل تكفي حوالي 140 بخة، أي عدة أسابيع مع العطر. زجاجة 30 مل تكفي عدة أشهر من الاستخدام اليومي، وزجاجة 50 مل هي الاختيار الأمثل لعطرك المفضل أو كهدية.',
    },
    {
      q: 'هل يمكنني تعديل الطلب أو إلغاؤه؟',
      a: 'نعم. راسلنا على واتساب في أسرع وقت، ويمكننا تعديل الطلب أو إلغاؤه طالما لم يُشحن بعد.',
    },
    {
      q: 'هل تغلّفون الهدايا؟',
      a: 'نعم. اكتب ذلك في خانة الملاحظات عند إتمام الطلب، ومعه أي رسالة تريدها على الكارت.',
    },
    {
      q: 'كيف أختار عطرًا؟',
      a: 'ابدأ بالنوتات التي تحبها بالفعل. كل صفحة عطر تعرض نوتاته، ويمكنك تصفية المتجر حسب أي نوتة. ولو لم تكن متأكدًا، راسلنا على واتساب ونساعدك في الاختيار.',
    },
  ],
};
