export const families = [
  {
    key: 'fresh',
    name: 'Fresh',
    blurb: 'Citrus, tea and clean musk. Easy to wear in the heat and at the office.',
    nameAr: 'منعش',
    titleAr: 'العطور المنعشة',
    blurbAr: 'حمضيات وشاي ومسك نظيف. مريحة في الحر وفي العمل.',
  },
  {
    key: 'floral',
    name: 'Floral',
    blurb: 'Rose, jasmine and orchid over soft woods and vanilla.',
    nameAr: 'زهري',
    titleAr: 'العطور الزهرية',
    blurbAr: 'ورد وياسمين وأوركيد فوق أخشاب ناعمة وفانيليا.',
  },
  {
    key: 'oriental',
    name: 'Oriental',
    blurb: 'Spice, amber, tonka and vanilla. Warm, rich and made for evenings.',
    nameAr: 'شرقي',
    titleAr: 'العطور الشرقية',
    blurbAr: 'توابل وعنبر وتونكا وفانيليا. دافئة وغنية ومناسبة للمساء.',
  },
  {
    key: 'resinous',
    name: 'Smoky and woody',
    blurb: 'Oud, vetiver, leather and incense. Deep and long lasting.',
    nameAr: 'مدخّن وخشبي',
    titleAr: 'العطور المدخّنة والخشبية',
    blurbAr: 'عود وفيتيفر وجلد وبخور. عميقة وتدوم طويلًا.',
  },
];

export const products = [
  {
    slug: 'rosendo-mateu-5',
    name: 'Rosendo Mateu Nº 5',
    nameAr: 'روسيندو ماتيو رقم 5',
    family: 'floral',
    accord: 'Floral, woody',
    accordAr: 'زهري، خشبي',
    description:
      'A delicate balance of rose and bergamot unfolds into warm vanilla and cedar, settling into a velvety base of white musk and amber. Elegant, timeless and unforgettable.',
    descriptionAr:
      'توازن رقيق بين الورد والبرغموت يتكشّف عن فانيليا دافئة وخشب الأرز، ثم يستقر على قاعدة مخملية من المسك الأبيض والعنبر. أنيق وخالد ولا يُنسى.',
    notes: ['Rose', 'Bergamot', 'Vanilla', 'Cedarwood', 'White Musk', 'Amber', 'Incense'],
    sizes: [
      {
        ml: 10,
        price: 170,
      },
      {
        ml: 30,
        price: 450,
      },
      {
        ml: 50,
        price: 600,
      },
    ],
    source: 'assets/images/main/Rosendo Mateu.webp',
    featured: true,
  },
  {
    slug: 'imagination',
    name: 'Imagination',
    nameAr: 'إيماجينيشن',
    family: 'fresh',
    accord: 'Fresh, citrus',
    accordAr: 'منعش، حمضي',
    description:
      'Bright lemon and spicy ginger open to a refined heart of tea and neroli. A scent that carries the mind somewhere cleaner, lighter and freer.',
    descriptionAr:
      'ليمون مشرق وزنجبيل لاذع يفتحان على قلب راقٍ من الشاي والنيرولي. رائحة تأخذك إلى مكان أنقى وأخف وأكثر حرية.',
    notes: ['Lemon', 'Ginger', 'Tea', 'Neroli', 'Musk', 'Amber'],
    sizes: [
      {
        ml: 10,
        price: 220,
      },
      {
        ml: 30,
        price: 600,
      },
      {
        ml: 50,
        price: 800,
      },
    ],
    source: 'assets/images/main/Imagination.webp',
    featured: true,
  },
  {
    slug: 'symphony',
    name: 'Symphony',
    nameAr: 'سيمفوني',
    family: 'fresh',
    accord: 'Fresh, aromatic',
    accordAr: 'منعش، عطري',
    description:
      'Bergamot and grapefruit rise over a warm ginger and patchouli heart, resolving into a soft, seamless musk and amber base. A composition in perfect harmony.',
    descriptionAr:
      'برغموت وجريب فروت يعلوان قلبًا دافئًا من الزنجبيل والباتشولي، وينتهيان بقاعدة ناعمة من المسك والعنبر. تركيبة في انسجام تام.',
    notes: ['Bergamot', 'Grapefruit', 'Ginger', 'Patchouli', 'Musk', 'Amber'],
    sizes: [
      {
        ml: 10,
        price: 160,
      },
      {
        ml: 30,
        price: 450,
      },
      {
        ml: 50,
        price: 650,
      },
    ],
    source: 'assets/images/main/Symphony.webp',
    featured: false,
  },
  {
    slug: 'stronger-with-you-intensely',
    name: 'Stronger With You Intensely',
    nameAr: 'سترونجر ويذ يو إنتنسلي',
    family: 'oriental',
    accord: 'Oriental, woody',
    accordAr: 'شرقي، خشبي',
    description:
      'Pink pepper and cardamom ignite over a compelling heart of chestnut and iris, anchored by a rich vanilla, amber and leather base. Bold, confident and magnetic.',
    descriptionAr:
      'فلفل وردي وهيل يشتعلان فوق قلب آسر من الكستناء والسوسن، على قاعدة غنية من الفانيليا والعنبر والجلد. جريء وواثق وجذاب.',
    notes: ['Pink Pepper', 'Cardamom', 'Chestnut', 'Iris', 'Vanilla', 'Amber', 'Leather'],
    sizes: [
      {
        ml: 10,
        price: 75,
      },
      {
        ml: 30,
        price: 200,
      },
      {
        ml: 50,
        price: 300,
      },
    ],
    source: 'assets/images/main/Stronger With You Intensely.webp',
    featured: true,
  },
  {
    slug: 'jimmy-choo',
    name: 'Jimmy Choo',
    nameAr: 'جيمي تشو',
    family: 'floral',
    accord: 'Floral, sweet',
    accordAr: 'زهري، حلو',
    description:
      'Fresh pear and orange open into a lush orchid and caramel heart, grounded by patchouli and vanilla. Glamorous, feminine and unapologetically luxurious.',
    descriptionAr:
      'كمثرى وبرتقال منعشان يفتحان على قلب غني من الأوركيد والكراميل، فوق باتشولي وفانيليا. ساحر وأنثوي وفاخر بلا تردد.',
    notes: ['Pear', 'Orange', 'Orchid', 'Caramel', 'Patchouli', 'Vanilla'],
    sizes: [
      {
        ml: 10,
        price: 75,
      },
      {
        ml: 30,
        price: 200,
      },
      {
        ml: 50,
        price: 300,
      },
    ],
    source: 'assets/images/main/Jimmy Choo.webp',
    featured: false,
  },
  {
    slug: 'khamrah-qahwa',
    name: 'Khamrah Qahwa',
    nameAr: 'خمرة قهوة',
    family: 'oriental',
    accord: 'Oriental, gourmand',
    accordAr: 'شرقي، سكري',
    description:
      'Warm ginger and cinnamon blend with praline and candied fruits over a deep coffee and tonka bean base. Rich, intoxicating and deeply Middle Eastern in soul.',
    descriptionAr:
      'زنجبيل وقرفة يمتزجان بالبرالين والفواكه المسكّرة فوق قاعدة عميقة من القهوة وحبوب التونكا. غني وآسر وشرقي الروح.',
    notes: [
      'Ginger',
      'Cinnamon',
      'Cardamom',
      'Praline',
      'Candied Fruits',
      'White Flowers',
      'Coffee',
      'Tonka Bean',
      'Musk',
      'Benzoin',
      'Vanilla',
    ],
    sizes: [
      {
        ml: 10,
        price: 75,
      },
      {
        ml: 30,
        price: 200,
      },
      {
        ml: 50,
        price: 300,
      },
    ],
    source: 'assets/images/main/khamrah Qahwa.webp',
    featured: false,
  },
  {
    slug: 'le-male-elixir',
    name: 'Le Male Elixir',
    nameAr: 'لو مال إليكسير',
    family: 'oriental',
    accord: 'Oriental, woody',
    accordAr: 'شرقي، خشبي',
    description:
      'Cool mint and lavender open a strikingly modern fragrance, where honey and patchouli create warmth that deepens into a powerfully sensual vanilla and tonka bean finish.',
    descriptionAr:
      'نعناع بارد ولافندر يفتتحان عطرًا عصريًا لافتًا، يمنحه العسل والباتشولي دفئًا يتعمّق حتى ختام حسّي من الفانيليا وحبوب التونكا.',
    notes: ['Mint', 'Lavender', 'Honey', 'Patchouli', 'Vanilla', 'Tonka Bean'],
    sizes: [
      {
        ml: 10,
        price: 75,
      },
      {
        ml: 30,
        price: 200,
      },
      {
        ml: 50,
        price: 300,
      },
    ],
    source: 'assets/images/main/Le Male Elixir.webp',
    featured: false,
  },
  {
    slug: 'creed-silver-mountain-water',
    name: 'Creed Silver Mountain Water',
    nameAr: 'كريد سيلفر ماونتن ووتر',
    family: 'fresh',
    accord: 'Fresh, aquatic',
    accordAr: 'منعش، مائي',
    description:
      'Bergamot and mandarin sparkle over a cool heart of green tea and black currant, resting on sandalwood and musk. The scent of pristine alpine air, pure and invigorating.',
    descriptionAr:
      'برغموت ويوسفي يتألقان فوق قلب بارد من الشاي الأخضر والكشمش الأسود، على قاعدة من خشب الصندل والمسك. رائحة هواء الجبال النقي المنعش.',
    notes: [
      'Bergamot',
      'Mandarin',
      'Orange Blossom',
      'Green Tea',
      'Black Currant',
      'Musk',
      'Sandalwood',
      'Galbanum',
    ],
    sizes: [
      {
        ml: 10,
        price: 90,
      },
      {
        ml: 30,
        price: 240,
      },
      {
        ml: 50,
        price: 350,
      },
    ],
    source: 'assets/images/main/Creed Mountain Water.webp',
    featured: false,
  },
  {
    slug: 'aqua-celestia',
    name: 'Aqua Celestia',
    nameAr: 'أكوا سيليستيا',
    family: 'floral',
    accord: 'Fresh, floral',
    accordAr: 'منعش، زهري',
    description:
      'Lemon and mint open into a floral heart of black currant blossom, jasmine and mimosa. Ethereally light, effortlessly radiant and cloud soft.',
    descriptionAr:
      'ليمون ونعناع يفتحان على قلب زهري من زهر الكشمش الأسود والياسمين والميموزا. خفيف كالنسيم، مشرق بلا تكلّف، وناعم كالسحاب.',
    notes: [
      'Lemon',
      'Mint',
      'Black Currant Blossom',
      'Jasmine',
      'Hedione',
      'Mimosa',
      'Lily of the Valley',
      'Musk',
    ],
    sizes: [
      {
        ml: 10,
        price: 90,
      },
      {
        ml: 30,
        price: 240,
      },
      {
        ml: 50,
        price: 350,
      },
    ],
    source: 'assets/images/main/Aqua cels.webp',
    featured: false,
  },
  {
    slug: 'creed-aventus',
    name: 'Creed Aventus',
    nameAr: 'كريد أفينتوس',
    family: 'fresh',
    accord: 'Fruity, woody',
    accordAr: 'فاكهي، خشبي',
    description:
      'Pineapple and black currant over birch and rose, settling into a majestic base of musk, oakmoss and ambergris. Power and success in a bottle.',
    descriptionAr:
      'أناناس وكشمش أسود فوق خشب البتولا والورد، يستقر على قاعدة مهيبة من المسك وطحلب البلوط والعنبر الرمادي. القوة والنجاح في زجاجة.',
    notes: [
      'Bergamot',
      'Black Currant',
      'Pineapple',
      'Apple',
      'Birch',
      'Patchouli',
      'Rose',
      'Moroccan Jasmine',
      'Musk',
      'Oakmoss',
      'Vanilla',
      'Ambergris',
    ],
    sizes: [
      {
        ml: 10,
        price: 100,
      },
      {
        ml: 30,
        price: 270,
      },
      {
        ml: 50,
        price: 400,
      },
    ],
    source: 'assets/images/main/Creed Aventus.webp',
    featured: true,
  },
  {
    slug: '212-vip',
    name: '212 VIP',
    nameAr: '212 في آي بي',
    family: 'oriental',
    accord: 'Oriental, sweet',
    accordAr: 'شرقي، حلو',
    description:
      'Rum and tropical fruits open into a heady vanilla and musk heart, dissolving into warm amber and tonka bean. The scent of an exclusive night, seductive and irresistible.',
    descriptionAr:
      'رم وفواكه استوائية تفتح على قلب آسر من الفانيليا والمسك، يذوب في عنبر دافئ وحبوب التونكا. رائحة سهرة خاصة، مغرية لا تُقاوم.',
    notes: ['Rum', 'Tropical Fruits', 'Vanilla', 'Musk', 'Amber', 'Tonka Bean'],
    sizes: [
      {
        ml: 10,
        price: 90,
      },
      {
        ml: 30,
        price: 240,
      },
      {
        ml: 50,
        price: 350,
      },
    ],
    source: 'assets/images/main/212Vip.webp',
    featured: false,
  },
  {
    slug: 'imperial-valley-qisah',
    name: 'Imperial Valley Qisah',
    nameAr: 'إمبريال فالي قصة',
    family: 'resinous',
    accord: 'Smoky, woody',
    accordAr: 'مدخّن، خشبي',
    description:
      'Davana and Italian bergamot open over a rare heart of white amber and oud. Haitian vetiver, leather and musk ground this opulent composition. Mysterious, commanding and rare.',
    descriptionAr:
      'دافانا وبرغموت إيطالي يفتحان على قلب نادر من العنبر الأبيض والعود، ويرسّخ الفيتيفر الهايتي والجلد والمسك هذه التركيبة الفاخرة. غامض وآسر ونادر.',
    notes: [
      'Davana',
      'Italian Bergamot',
      'Pink Pepper',
      'White Amber',
      'African Rosemary',
      'Oud',
      'Musk',
      'Leather',
      'Haitian Vetiver',
    ],
    sizes: [
      {
        ml: 10,
        price: 100,
      },
      {
        ml: 30,
        price: 270,
      },
      {
        ml: 50,
        price: 400,
      },
    ],
    source: 'assets/images/main/story.webp',
    featured: true,
  },
];

export const bundle = {
  slug: 'trilogy-bundle',
  name: 'The Trilogy Bundle',
  nameAr: 'مجموعة الثلاثية',
  price: 900,
  ml: 50,
  items: ['le-male-elixir', 'creed-silver-mountain-water', 'imperial-valley-qisah'],
  source: 'assets/images/offers/offer.webp',
};

export const notesAr = {
  Rose: 'ورد',
  Bergamot: 'برغموت',
  Vanilla: 'فانيليا',
  Cedarwood: 'خشب الأرز',
  'White Musk': 'مسك أبيض',
  Amber: 'عنبر',
  Incense: 'بخور',
  Lemon: 'ليمون',
  Ginger: 'زنجبيل',
  Tea: 'شاي',
  Neroli: 'نيرولي',
  Musk: 'مسك',
  Grapefruit: 'جريب فروت',
  Patchouli: 'باتشولي',
  'Pink Pepper': 'فلفل وردي',
  Cardamom: 'هيل',
  Chestnut: 'كستناء',
  Iris: 'سوسن',
  Leather: 'جلد',
  Pear: 'كمثرى',
  Orange: 'برتقال',
  Orchid: 'أوركيد',
  Caramel: 'كراميل',
  Cinnamon: 'قرفة',
  Praline: 'برالين',
  'Candied Fruits': 'فواكه مسكّرة',
  'White Flowers': 'زهور بيضاء',
  Coffee: 'قهوة',
  'Tonka Bean': 'حبوب التونكا',
  Benzoin: 'لبان جاوي',
  Mint: 'نعناع',
  Lavender: 'لافندر',
  Honey: 'عسل',
  Mandarin: 'يوسفي',
  'Orange Blossom': 'زهر البرتقال',
  'Green Tea': 'شاي أخضر',
  'Black Currant': 'كشمش أسود',
  Sandalwood: 'خشب الصندل',
  Galbanum: 'قنّة',
  'Black Currant Blossom': 'زهر الكشمش الأسود',
  Jasmine: 'ياسمين',
  Hedione: 'هيديون',
  Mimosa: 'ميموزا',
  'Lily of the Valley': 'زنبق الوادي',
  Pineapple: 'أناناس',
  Apple: 'تفاح',
  Birch: 'خشب البتولا',
  'Moroccan Jasmine': 'ياسمين مغربي',
  Oakmoss: 'طحلب البلوط',
  Ambergris: 'عنبر رمادي',
  Rum: 'رم',
  'Tropical Fruits': 'فواكه استوائية',
  Davana: 'دافانا',
  'Italian Bergamot': 'برغموت إيطالي',
  'White Amber': 'عنبر أبيض',
  'African Rosemary': 'إكليل الجبل الأفريقي',
  Oud: 'عود',
  'Haitian Vetiver': 'فيتيفر هايتي',
};
