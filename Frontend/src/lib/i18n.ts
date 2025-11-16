export type Language = 'ru' | 'uz';

export interface Translations {
  // Navigation
  nav: {
    home: string;
    services: string;
    contacts: string;
    faq: string;
  };
  // Hero section
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  // Why Us section
  whyUs: {
    title: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  // Services section
  services: {
    title: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  // Workplan section
  workplan: {
    title: string;
  };
  // Contact section
  contact: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    send: string;
    telegram: string;
    address: string;
    addressText: string;
  };
  // FAQ section
  faq: {
    title: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
}

export const translations: Record<Language, Translations> = {
  ru: {
    nav: {
      home: 'Главная',
      services: 'Услуги',
      contacts: 'Контакты',
      faq: 'FAQ',
    },
    hero: {
      title: 'Консалтинг и инжиниринг мирового уровня',
      subtitle: 'Мы создаем инновационные решения для вашего бизнеса с использованием передовых технологий и экспертизы',
      cta: 'Начать проект',
    },
    whyUs: {
      title: 'Почему выбирают нас',
      items: [
        {
          title: 'Опыт 15+ лет',
          description: 'Реализовали более 200 успешных проектов в различных отраслях. Наша экспертиза охватывает промышленность, финансы, образование и государственный сектор.',
        },
        {
          title: 'Команда экспертов',
          description: 'Сертифицированные специалисты с международным опытом работы в ведущих технологических компаниях. Постоянно повышаем квалификацию и следим за трендами.',
        },
        {
          title: 'Гарантия качества',
          description: 'Полное сопровождение проектов от концепции до внедрения. Предоставляем постпродажную поддержку и гарантии на все наши решения.',
        },
        {
          title: 'Инновационный подход',
          description: 'Используем новейшие технологии: AI, IoT, блокчейн, облачные решения. Применяем лучшие мировые практики и методологии разработки.',
        },
        {
          title: 'Индивидуальный подход',
          description: 'Каждый проект уникален. Мы адаптируем решения под специфику вашего бизнеса, учитываем отраслевые особенности и корпоративную культуру.',
        },
        {
          title: 'Прозрачность и контроль',
          description: 'Регулярные отчеты о прогрессе, открытое общение с командой, возможность контроля на каждом этапе разработки. Никаких скрытых расходов.',
        },
      ],
    },
    services: {
      title: 'Наши услуги',
      items: [
        {
          title: 'Стратегический консалтинг',
          description: 'Разработка долгосрочных стратегий развития, анализ рынка, конкурентная разведка и планирование роста бизнеса с учетом современных трендов',
        },
        {
          title: 'Техническое проектирование',
          description: 'Полный цикл инжиниринга: от концепции до реализации сложных технических систем, включая промышленную автоматизацию и IoT-решения',
        },
        {
          title: 'Цифровая трансформация',
          description: 'Автоматизация бизнес-процессов, внедрение ERP/CRM систем, создание цифровых экосистем и оптимизация операционной деятельности',
        },
        {
          title: 'Разработка ПО',
          description: 'Создание корпоративных приложений, веб-платформ, мобильных решений и интеграция с существующими системами предприятия',
        },
        {
          title: 'Корпоративное обучение',
          description: 'Программы повышения квалификации, техническое обучение персонала, менторство и создание внутренних центров компетенций',
        },
        {
          title: 'Технический аудит',
          description: 'Комплексная оценка IT-инфраструктуры, анализ безопасности, оптимизация производительности и рекомендации по модернизации',
        },
      ],
    },
    workplan: {
      title: 'Этапы работы',
    },
    contact: {
      title: 'Свяжитесь с нами',
      subtitle: 'Готовы начать свой проект? Напишите нам, и мы свяжемся с вами в ближайшее время',
      name: 'Ваше имя',
      email: 'Email',
      phone: 'Телефон',
      message: 'Сообщение',
      send: 'Отправить',
      telegram: 'Написать в Telegram',
      address: 'Адрес',
      addressText: 'г. Ташкент, Узбекистан',
    },
    faq: {
      title: 'Часто задаваемые вопросы',
      items: [
        {
          question: 'Сколько времени занимает реализация проекта?',
          answer: 'Сроки зависят от сложности проекта. Обычно небольшие проекты занимают 2-3 месяца, средние - 4-6 месяцев, крупные комплексные проекты могут занимать от 6 до 12 месяцев.',
        },
        {
          question: 'Предоставляете ли вы гарантию на свои услуги?',
          answer: 'Да, мы предоставляем гарантию на все наши услуги. Срок гарантии зависит от типа проекта и обсуждается индивидуально. Также мы предлагаем постпродажную поддержку.',
        },
        {
          question: 'Работаете ли вы с международными клиентами?',
          answer: 'Да, мы успешно работаем как с локальными, так и с международными компаниями. Наша команда имеет опыт реализации проектов в странах СНГ, Европы и Азии.',
        },
        {
          question: 'Какие отрасли вы обслуживаете?',
          answer: 'Мы работаем с различными отраслями: промышленность, энергетика, строительство, IT, финансы, торговля, образование и государственный сектор.',
        },
        {
          question: 'Как формируется стоимость проекта?',
          answer: 'Стоимость рассчитывается индивидуально на основе объема работ, сложности задач, сроков реализации и требуемых ресурсов. Мы предоставляем детальную смету после первичной консультации.',
        },
        {
          question: 'Какие технологии вы используете?',
          answer: 'Мы работаем с современными технологиями: Python, Java, .NET, React, Angular, Node.js, Docker, Kubernetes, AWS, Azure, PostgreSQL, MongoDB и многими другими.',
        },
        {
          question: 'Предоставляете ли вы обучение персонала?',
          answer: 'Да, мы проводим корпоративные тренинги, техническое обучение, менторство и создаем внутренние центры компетенций для развития навыков вашей команды.',
        },
        {
          question: 'Как происходит процесс работы над проектом?',
          answer: 'Наш процесс включает: анализ требований, планирование, разработку, тестирование, внедрение и поддержку. Мы используем Agile методологии и регулярно отчитываемся о прогрессе.',
        },
        {
          question: 'Можете ли вы работать с существующими системами?',
          answer: 'Да, мы специализируемся на интеграции с существующими системами, миграции данных и модернизации legacy-систем без нарушения текущих бизнес-процессов.',
        },
        {
          question: 'Предоставляете ли вы техническую поддержку?',
          answer: 'Да, мы обеспечиваем полную техническую поддержку: мониторинг систем, устранение неполадок, обновления, резервное копирование и круглосуточную поддержку для критически важных систем.',
        },
      ],
    },
  },
  uz: {
    nav: {
      home: 'Bosh sahifa',
      services: 'Xizmatlar',
      contacts: 'Aloqa',
      faq: 'Savollar',
    },
    hero: {
      title: 'Jahon darajasidagi konsalting va muhandislik',
      subtitle: 'Biz ilg\'or texnologiyalar va tajriba yordamida biznesingiz uchun innovatsion yechimlar yaratamiz',
      cta: 'Loyihani boshlash',
    },
    whyUs: {
      title: 'Nima uchun bizni tanlashadi',
      items: [
        {
          title: '15+ yillik tajriba',
          description: 'Turli sohalarda 200 dan ortiq muvaffaqiyatli loyihalarni amalga oshirdik. Bizning tajribamiz sanoat, moliya, ta\'lim va davlat sektorini qamrab oladi.',
        },
        {
          title: 'Mutaxassislar jamoasi',
          description: 'Etakchi texnologik kompaniyalarda xalqaro tajribaga ega sertifikatlangan mutaxassislar. Doimiy ravishda malakamizni oshiramiz va trendlarni kuzatamiz.',
        },
        {
          title: 'Sifat kafolati',
          description: 'Loyihalarni kontseptsiyadan joriy etishgacha to\'liq qo\'llab-quvvatlash. Sotishdan keyingi qo\'llab-quvvatlash va barcha yechimlarimizga kafolat beramiz.',
        },
        {
          title: 'Innovatsion yondashuv',
          description: 'Eng so\'nggi texnologiyalardan foydalanamiz: AI, IoT, blokcheyn, bulutli yechimlar. Eng yaxshi jahon amaliyotlari va ishlab chiqish metodologiyalarini qo\'llaymiz.',
        },
        {
          title: 'Individual yondashuv',
          description: 'Har bir loyiha noyob. Biz yechimlarni biznesingizning o\'ziga xosligiga moslashtiramiz, soha xususiyatlarini va korporativ madaniyatni hisobga olamiz.',
        },
        {
          title: 'Shaffoflik va nazorat',
          description: 'Taraqqiyot haqida muntazam hisobotlar, jamoamiz bilan ochiq muloqot, ishlab chiqishning har bir bosqichida nazorat imkoniyati. Yashirin xarajatlar yo\'q.',
        },
      ],
    },
    services: {
      title: 'Bizning xizmatlar',
      items: [
        {
          title: 'Konsalting',
          description: 'Biznes-jarayonlarni optimallashtirish uchun strategik tahlil va yechimlar ishlab chiqish',
        },
        {
          title: 'Muhandislik',
          description: 'Murakkab texnik tizimlarni kalitga tayyor loyihalash va amalga oshirish',
        },
        {
          title: 'Avtomatlashtirish',
          description: 'Ishlab chiqarish va boshqaruv jarayonlarini avtomatlashtirish tizimlarini joriy etish',
        },
        {
          title: 'IT-yechimlar',
          description: 'Dasturiy ta\'minot ishlab chiqish va raqamli transformatsiya',
        },
        {
          title: 'O\'qitish',
          description: 'Korporativ treninglar va xodimlar malakasini oshirish',
        },
        {
          title: 'Audit',
          description: 'Biznes-jarayonlar va tizimlar samaradorligini kompleks tahlil qilish',
        },
      ],
    },
    workplan: {
      title: 'Ish jarayon bosqichlari',
    },
    contact: {
      title: 'Biz bilan bog\'laning',
      subtitle: 'Loyihangizni boshlashga tayyormisiz? Bizga yozing va biz tez orada siz bilan bog\'lanamiz',
      name: 'Ismingiz',
      email: 'Email',
      phone: 'Telefon',
      message: 'Xabar',
      send: 'Yuborish',
      telegram: 'Telegramda yozish',
      address: 'Manzil',
      addressText: 'Toshkent sh., O\'zbekiston',
    },
    faq: {
      title: 'Ko\'p beriladigan savollar',
      items: [
        {
          question: 'Loyihani amalga oshirish qancha vaqt oladi?',
          answer: 'Muddatlar loyihaning murakkabligiga bog\'liq. Odatda kichik loyihalar 2-3 oy, o\'rta loyihalar 4-6 oy, yirik kompleks loyihalar 6 oydan 12 oygacha davom etishi mumkin.',
        },
        {
          question: 'Xizmatlaringizga kafolat berasizmi?',
          answer: 'Ha, biz barcha xizmatlarimizga kafolat beramiz. Kafolat muddati loyiha turiga bog\'liq va individual muhokama qilinadi. Shuningdek, biz sotishdan keyingi qo\'llab-quvvatlashni taklif qilamiz.',
        },
        {
          question: 'Xalqaro mijozlar bilan ishlaysizmi?',
          answer: 'Ha, biz mahalliy va xalqaro kompaniyalar bilan muvaffaqiyatli ishlaymiz. Jamoamiz MDH, Yevropa va Osiyo mamlakatlarida loyihalarni amalga oshirish tajribasiga ega.',
        },
        {
          question: 'Qaysi sohalarni xizmat qilasiz?',
          answer: 'Biz turli sohalarda ishlaymiz: sanoat, energetika, qurilish, IT, moliya, savdo, ta\'lim va davlat sektori.',
        },
        {
          question: 'Loyiha narxi qanday shakllanadi?',
          answer: 'Narx ish hajmi, vazifalarning murakkabligi, amalga oshirish muddatlari va talab qilinadigan resurslar asosida individual hisoblanadi. Biz dastlabki konsultatsiyadan keyin batafsil smeta taqdim etamiz.',
        },
        {
          question: 'Qanday texnologiyalardan foydalanasiz?',
          answer: 'Biz zamonaviy texnologiyalar bilan ishlaymiz: Python, Java, .NET, React, Angular, Node.js, Docker, Kubernetes, AWS, Azure, PostgreSQL, MongoDB va boshqa ko\'plab texnologiyalar.',
        },
        {
          question: 'Xodimlarni o\'qitishni taklif qilasizmi?',
          answer: 'Ha, biz korporativ treninglar, texnik o\'qitish, mentorlik va jamoangiz ko\'nikmalarini rivojlantirish uchun ichki kompetentsiya markazlarini yaratishni taklif qilamiz.',
        },
        {
          question: 'Loyiha ustida ishlash jarayoni qanday?',
          answer: 'Bizning jarayon quyidagilarni o\'z ichiga oladi: talablarni tahlil qilish, rejalashtirish, ishlab chiqish, sinovdan o\'tkazish, joriy etish va qo\'llab-quvvatlash. Biz Agile metodologiyalaridan foydalanamiz va muntazam ravishda taraqqiyot haqida hisobot beramiz.',
        },
        {
          question: 'Mavjud tizimlar bilan ishlay olasizmi?',
          answer: 'Ha, biz mavjud tizimlar bilan integratsiya, ma\'lumotlarni migratsiya qilish va joriy biznes jarayonlarini buzmasdan legacy tizimlarni modernizatsiya qilishda ixtisoslashganmiz.',
        },
        {
          question: 'Texnik qo\'llab-quvvatlashni taqdim etasizmi?',
          answer: 'Ha, biz to\'liq texnik qo\'llab-quvvatlashni ta\'minlaymiz: tizimlarni monitoring qilish, nosozliklarni bartaraf etish, yangilanishlar, zaxira nusxalash va muhim tizimlar uchun kunlik qo\'llab-quvvatlash.',
        },
      ],
    },
  },
};