from django.core.management.base import BaseCommand
from django.db import transaction
from services.models import Service
from cases.models import Case
from pricing.models import PricingPlan
from faq.models import FAQ
from contacts.models import CompanyContact
from whyus.models import WhyUsItem


class Command(BaseCommand):
    help = 'Create test data for the ARDEX website'

    def add_arguments(self, parser):
        parser.add_argument(
            '--clear',
            action='store_true',
            help='Clear existing data before creating new test data',
        )

    def handle(self, *args, **options):
        if options['clear']:
            self.stdout.write('Clearing existing data...')
            Service.objects.all().delete()
            Case.objects.all().delete()
            PricingPlan.objects.all().delete()
            FAQ.objects.all().delete()
            CompanyContact.objects.all().delete()
            WhyUsItem.objects.all().delete()

        with transaction.atomic():
            self.create_services()
            self.create_cases()
            self.create_pricing_plans()
            self.create_faqs()
            self.create_company_contact()
            self.create_whyus_data()

        self.stdout.write(
            self.style.SUCCESS('Successfully created test data!')
        )

    def create_services(self):
        """Create test services"""
        services_data = [
            {
                'title_ru': 'Стратегический консалтинг',
                'title_uz': 'Strategik konsalting',
                'description_ru': 'Разработка долгосрочных стратегий развития, анализ рынка, конкурентная разведка и планирование роста бизнеса с учетом современных трендов',
                'description_uz': 'Uzoq muddatli rivojlanish strategiyalarini ishlab chiqish, bozor tahlili, raqobat razvedkasi va zamonaviy trendlarni hisobga olgan holda biznes o\'sishini rejalashtirish',
                'icon': 'Target',
                'order': 1,
            },
            {
                'title_ru': 'Техническое проектирование',
                'title_uz': 'Texnik loyihalash',
                'description_ru': 'Полный цикл инжиниринга: от концепции до реализации сложных технических систем, включая промышленную автоматизацию и IoT-решения',
                'description_uz': 'Muhandislikning to\'liq tsikli: kontseptsiyadan murakkab texnik tizimlarni amalga oshirishgacha, shu jumladan sanoat avtomatlashtirish va IoT yechimlari',
                'icon': 'Wrench',
                'order': 2,
            },
            {
                'title_ru': 'Цифровая трансформация',
                'title_uz': 'Raqamli transformatsiya',
                'description_ru': 'Автоматизация бизнес-процессов, внедрение ERP/CRM систем, создание цифровых экосистем и оптимизация операционной деятельности',
                'description_uz': 'Biznes jarayonlarini avtomatlashtirish, ERP/CRM tizimlarini joriy etish, raqamli ekosistemalar yaratish va operatsion faoliyatni optimallashtirish',
                'icon': 'Zap',
                'order': 3,
            },
            {
                'title_ru': 'Разработка ПО',
                'title_uz': 'Dasturiy ta\'minot ishlab chiqish',
                'description_ru': 'Создание корпоративных приложений, веб-платформ, мобильных решений и интеграция с существующими системами предприятия',
                'description_uz': 'Korporativ ilovalar, veb-platformalar, mobil yechimlar yaratish va korxona mavjud tizimlari bilan integratsiya',
                'icon': 'Code',
                'order': 4,
            },
            {
                'title_ru': 'Корпоративное обучение',
                'title_uz': 'Korporativ o\'qitish',
                'description_ru': 'Программы повышения квалификации, техническое обучение персонала, менторство и создание внутренних центров компетенций',
                'description_uz': 'Malaka oshirish dasturlari, xodimlarni texnik o\'qitish, mentorlik va ichki kompetensiya markazlarini yaratish',
                'icon': 'GraduationCap',
                'order': 5,
            },
            {
                'title_ru': 'Технический аудит',
                'title_uz': 'Texnik audit',
                'description_ru': 'Комплексная оценка IT-инфраструктуры, анализ безопасности, оптимизация производительности и рекомендации по модернизации',
                'description_uz': 'IT-infratuzilmaning kompleks baholash, xavfsizlik tahlili, ishlashni optimallashtirish va modernizatsiya bo\'yicha tavsiyalar',
                'icon': 'Search',
                'order': 6,
            },
        ]

        for service_data in services_data:
            service, created = Service.objects.get_or_create(
                title_ru=service_data['title_ru'],
                defaults=service_data
            )
            if created:
                self.stdout.write(f'Created service: {service.title_ru}')
            else:
                self.stdout.write(f'Service already exists: {service.title_ru}')

    def create_cases(self):
        """Create test cases"""
        cases_data = [
            {
                'title_ru': 'Автоматизация текстильного производства',
                'title_uz': 'To\'qimachilik ishlab chiqarishini avtomatlashtirish',
                'description_ru': 'Внедрение системы автоматического контроля качества и управления производственными линиями на текстильной фабрике. Результат: повышение производительности на 40% и снижение брака на 60%.',
                'description_uz': 'Tekstil fabrikasida sifat nazorati va ishlab chiqarish liniyalarini boshqarish tizimini joriy etish. Natija: unumdorlik 40% oshdi va nuqson 60% kamaydi.',
            },
            {
                'title_ru': 'ERP система для торговой сети',
                'title_uz': 'Savdo tarmog\'i uchun ERP tizimi',
                'description_ru': 'Разработка и внедрение корпоративной системы управления ресурсами для сети из 50 магазинов. Интеграция с поставщиками, автоматизация складского учета и аналитика продаж.',
                'description_uz': '50 ta do\'kondan iborat tarmoq uchun korporativ resurslarni boshqarish tizimini ishlab chiqish va joriy etish. Ta\'minotchilar bilan integratsiya, ombor hisobini avtomatlashtirish va sotish tahlili.',
            },
            {
                'title_ru': 'Цифровая трансформация банка',
                'title_uz': 'Bankning raqamli transformatsiyasi',
                'description_ru': 'Полная цифровизация банковских процессов: мобильное приложение, онлайн-банкинг, система скоринга и интеграция с платежными системами. Увеличение клиентской базы в 3 раза.',
                'description_uz': 'Bank jarayonlarini to\'liq raqamlashtirish: mobil ilova, onlayn-banking, skoring tizimi va to\'lov tizimlari bilan integratsiya. Mijozlar bazasi 3 baravar oshdi.',
            },
        ]

        for case_data in cases_data:
            case, created = Case.objects.get_or_create(
                title_ru=case_data['title_ru'],
                defaults=case_data
            )
            if created:
                self.stdout.write(f'Created case: {case.title_ru}')
            else:
                self.stdout.write(f'Case already exists: {case.title_ru}')

    def create_pricing_plans(self):
        """Create test pricing plans"""
        pricing_data = [
            {
                'title_ru': 'Стартовый',
                'title_uz': 'Boshlang\'ich',
                'price': 2500000.00,
                'features_ru': '''Первичная консультация (2 часа)
Анализ текущих процессов
Базовые рекомендации
Email поддержка (5 дней)
Простая документация
1 месяц сопровождения''',
                'features_uz': '''Dastlabki konsultatsiya (2 soat)
Joriy jarayonlarni tahlil qilish
Asosiy tavsiyalar
Email qo\'llab-quvvatlash (5 kun)
Oddiy hujjatlar
1 oy hamrohlik''',
                'order': 1,
            },
            {
                'title_ru': 'Бизнес',
                'title_uz': 'Biznes',
                'price': 7500000.00,
                'features_ru': '''Все из стартового плана
Разработка детальной стратегии
Внедрение решений (3 месяца)
Приоритетная поддержка
Обучение команды (16 часов)
Ежемесячные отчеты
Техническая поддержка
Гарантия 6 месяцев''',
                'features_uz': '''Boshlang\'ich rejadan hammasi
Batafsil strategiya ishlab chiqish
Yechimlarni joriy etish (3 oy)
Ustuvor qo\'llab-quvvatlash
Jamoa o\'qitish (16 soat)
Oylik hisobotlar
Texnik qo\'llab-quvvatlash
6 oy kafolat''',
                'order': 2,
            },
        ]

        for plan_data in pricing_data:
            plan, created = PricingPlan.objects.get_or_create(
                title_ru=plan_data['title_ru'],
                defaults=plan_data
            )
            if created:
                self.stdout.write(f'Created pricing plan: {plan.title_ru}')
            else:
                self.stdout.write(f'Pricing plan already exists: {plan.title_ru}')

    def create_faqs(self):
        """Create test FAQs"""
        faq_data = [
            {
                'question_ru': 'Сколько времени занимает реализация проекта?',
                'question_uz': 'Loyihani amalga oshirish qancha vaqt oladi?',
                'answer_ru': 'Сроки зависят от сложности проекта. Обычно небольшие проекты занимают 2-3 месяца, средние - 4-6 месяцев, крупные комплексные проекты могут занимать от 6 до 12 месяцев.',
                'answer_uz': 'Muddatlar loyihaning murakkabligiga bog\'liq. Odatda kichik loyihalar 2-3 oy, o\'rta loyihalar 4-6 oy, katta kompleks loyihalar 6 dan 12 oygacha vaqt olishi mumkin.',
                'order': 1,
            },
            {
                'question_ru': 'Предоставляете ли вы гарантию на свои услуги?',
                'question_uz': 'Xizmatlaringiz uchun kafolat berasizmi?',
                'answer_ru': 'Да, мы предоставляем гарантию на все наши услуги. Срок гарантии зависит от типа проекта и обсуждается индивидуально. Также мы предлагаем постпродажную поддержку.',
                'answer_uz': 'Ha, biz barcha xizmatlarimiz uchun kafolat beramiz. Kafolat muddati loyiha turiga bog\'liq va individual ravishda muhokama qilinadi. Shuningdek, biz sotuvdan keyingi qo\'llab-quvvatlashni taklif qilamiz.',
                'order': 2,
            },
            {
                'question_ru': 'Работаете ли вы с международными клиентами?',
                'question_uz': 'Xalqaro mijozlar bilan ishlaysizmi?',
                'answer_ru': 'Да, мы успешно работаем как с локальными, так и с международными компаниями. Наша команда имеет опыт реализации проектов в странах СНГ, Европы и Азии.',
                'answer_uz': 'Ha, biz mahalliy va xalqaro kompaniyalar bilan muvaffaqiyatli ishlaymiz. Bizning jamoa MDH, Yevropa va Osiyo mamlakatlarida loyihalarni amalga oshirish tajribasiga ega.',
                'order': 3,
            },
        ]

        for faq_item in faq_data:
            faq, created = FAQ.objects.get_or_create(
                question_ru=faq_item['question_ru'],
                defaults=faq_item
            )
            if created:
                self.stdout.write(f'Created FAQ: {faq.question_ru}')
            else:
                self.stdout.write(f'FAQ already exists: {faq.question_ru}')

    def create_company_contact(self):
        """Create company contact information"""
        contact_data = {
            'company_name_ru': 'ARDEX',
            'company_name_uz': 'ARDEX',
            'email': 'info@ardex.uz',
            'phone': '+998 90 123 45 67',
            'address_ru': 'г. Ташкент, ул. Навои, 15, Узбекистан',
            'address_uz': 'Toshkent shahri, Navoiy ko\'chasi, 15, O\'zbekiston',
            'telegram': '@ardex_uz',
        }

        contact, created = CompanyContact.objects.get_or_create(
            company_name_ru=contact_data['company_name_ru'],
            defaults=contact_data
        )
        if created:
            self.stdout.write(f'Created company contact: {contact.company_name_ru}')
        else:
            self.stdout.write(f'Company contact already exists: {contact.company_name_ru}')

    def create_whyus_data(self):
        """Create WhyUs data"""
        whyus_data = [
            {
                'title_ru': 'Опыт 15+ лет',
                'title_uz': '15+ yillik tajriba',
                'description_ru': 'Реализовали более 200 успешных проектов в различных отраслях. Наша экспертиза охватывает промышленность, финансы, образование и государственный сектор.',
                'description_uz': 'Turli sohalarda 200 dan ortiq muvaffaqiyatli loyihalarni amalga oshirdik. Bizning tajribamiz sanoat, moliya, ta\'lim va davlat sektorini qamrab oladi.',
                'icon': 'Award',
                'order': 1,
            },
            {
                'title_ru': 'Команда экспертов',
                'title_uz': 'Mutaxassislar jamoasi',
                'description_ru': 'Сертифицированные специалисты с международным опытом работы в ведущих технологических компаниях. Постоянно повышаем квалификацию и следим за трендами.',
                'description_uz': 'Etakchi texnologik kompaniyalarda xalqaro tajribaga ega sertifikatlangan mutaxassislar. Doimiy ravishda malakamizni oshiramiz va trendlarni kuzatamiz.',
                'icon': 'Users',
                'order': 2,
            },
            {
                'title_ru': 'Гарантия качества',
                'title_uz': 'Sifat kafolati',
                'description_ru': 'Полное сопровождение проектов от концепции до внедрения. Предоставляем постпродажную поддержку и гарантии на все наши решения.',
                'description_uz': 'Loyihalarni kontseptsiyadan joriy etishgacha to\'liq qo\'llab-quvvatlash. Sotishdan keyingi qo\'llab-quvvatlash va barcha yechimlarimizga kafolat beramiz.',
                'icon': 'Shield',
                'order': 3,
            },
            {
                'title_ru': 'Инновационный подход',
                'title_uz': 'Innovatsion yondashuv',
                'description_ru': 'Используем новейшие технологии: AI, IoT, блокчейн, облачные решения. Применяем лучшие мировые практики и методологии разработки.',
                'description_uz': 'Eng so\'nggi texnologiyalardan foydalanamiz: AI, IoT, blokcheyn, bulutli yechimlar. Eng yaxshi jahon amaliyotlari va ishlab chiqish metodologiyalarini qo\'llaymiz.',
                'icon': 'Lightbulb',
                'order': 4,
            },
            {
                'title_ru': 'Индивидуальный подход',
                'title_uz': 'Individual yondashuv',
                'description_ru': 'Каждый проект уникален. Мы адаптируем решения под специфику вашего бизнеса, учитываем отраслевые особенности и корпоративную культуру.',
                'description_uz': 'Har bir loyiha noyob. Biz yechimlarni biznesingizning o\'ziga xosligiga moslashtiramiz, soha xususiyatlarini va korporativ madaniyatni hisobga olamiz.',
                'icon': 'Target',
                'order': 5,
            },
            {
                'title_ru': 'Прозрачность и контроль',
                'title_uz': 'Shaffoflik va nazorat',
                'description_ru': 'Регулярные отчеты о прогрессе, открытое общение с командой, возможность контроля на каждом этапе разработки. Никаких скрытых расходов.',
                'description_uz': 'Taraqqiyot haqida muntazam hisobotlar, jamoamiz bilan ochiq muloqot, ishlab chiqishning har bir bosqichida nazorat imkoniyati. Yashirin xarajatlar yo\'q.',
                'icon': 'Eye',
                'order': 6,
            },
        ]

        for item_data in whyus_data:
            item, created = WhyUsItem.objects.get_or_create(
                title_ru=item_data['title_ru'],
                defaults=item_data
            )
            if created:
                self.stdout.write(f'Created WhyUs item: {item.title_ru}')
            else:
                self.stdout.write(f'WhyUs item already exists: {item.title_ru}')
