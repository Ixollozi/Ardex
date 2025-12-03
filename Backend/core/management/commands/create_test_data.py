from django.core.management.base import BaseCommand
from django.db import transaction
from services.models import Service
from workplan.models import WorkStep
from django.core.files.base import ContentFile
import base64
from faq.models import FAQ
from contacts.models import CompanyContact
from whyus.models import WhyUsItem
from pages.models import Page


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
            FAQ.objects.all().delete()
            CompanyContact.objects.all().delete()
            WhyUsItem.objects.all().delete()

        with transaction.atomic():
            self.create_services()
            self.create_workplan()
            self.create_faqs()
            self.create_company_contact()
            self.create_whyus_data()
            self.create_pages()

        self.stdout.write(
            self.style.SUCCESS('Successfully created test data!')
        )

    def create_services(self):
        """Create test services"""
        placeholder_png_b64 = (
            "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=="
        )
        placeholder_bytes = base64.b64decode(placeholder_png_b64)

        services_data = [
            {
                'title_ru': 'Стратегический консалтинг',
                'title_uz': 'Strategik konsalting',
                'description_ru': 'Разработка долгосрочных стратегий развития, анализ рынка, конкурентная разведка и планирование роста бизнеса с учетом современных трендов',
                'description_uz': 'Uzoq muddatli rivojlanish strategiyalarini ishlab chiqish, bozor tahlili, raqobat razvedkasi va zamonaviy trendlarni hisobga olgan holda biznes o\'sishini rejalashtirish',
                'order': 1,
            },
            {
                'title_ru': 'Техническое проектирование',
                'title_uz': 'Texnik loyihalash',
                'description_ru': 'Полный цикл инжиниринга: от концепции до реализации сложных технических систем, включая промышленную автоматизацию и IoT-решения',
                'description_uz': 'Muhandislikning to\'liq tsikli: kontseptsiyadan murakkab texnik tizimlarni amalga oshirishgacha, shu jumladan sanoat avtomatlashtirish va IoT yechimlari',
                'order': 2,
            },
            {
                'title_ru': 'Цифровая трансформация',
                'title_uz': 'Raqamli transformatsiya',
                'description_ru': 'Автоматизация бизнес-процессов, внедрение ERP/CRM систем, создание цифровых экосистем и оптимизация операционной деятельности',
                'description_uz': 'Biznes jarayonlarini avtomatlashtirish, ERP/CRM tizimlarini joriy etish, raqamli ekosistemalar yaratish va operatsion faoliyatni optimallashtirish',
                'order': 3,
            },
            {
                'title_ru': 'Разработка ПО',
                'title_uz': 'Dasturiy ta\'minot ishlab chiqish',
                'description_ru': 'Создание корпоративных приложений, веб-платформ, мобильных решений и интеграция с существующими системами предприятия',
                'description_uz': 'Korporativ ilovalar, veb-platformalar, mobil yechimlar yaratish va korxona mavjud tizimlari bilan integratsiya',
                'order': 4,
            },
            {
                'title_ru': 'Корпоративное обучение',
                'title_uz': 'Korporativ o\'qitish',
                'description_ru': 'Программы повышения квалификации, техническое обучение персонала, менторство и создание внутренних центров компетенций',
                'description_uz': 'Malaka oshirish dasturlari, xodimlarni texnik o\'qitish, mentorlik va ichki kompetensiya markazlarini yaratish',
                'order': 5,
            },
            {
                'title_ru': 'Технический аудит',
                'title_uz': 'Texnik audit',
                'description_ru': 'Комплексная оценка IT-инфраструктуры, анализ безопасности, оптимизация производительности и рекомендации по модернизации',
                'description_uz': 'IT-infratuzilmaning kompleks baholash, xavfsizlik tahlili, ishlashni optimallashtirish va modernizatsiya bo\'yicha tavsiyalar',
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

            # attach placeholder image if empty
            if not service.image:
                service.image.save(
                    f"service_{service.pk}.png",
                    ContentFile(placeholder_bytes),
                    save=True,
                )

    def create_faqs(self):
        """Create test FAQs (updated content from user)"""
        faq_data = [
            {
                'question_ru': 'Как сделать заказ?',
                'question_uz': 'Buyurtmani qanday berish mumkin?',
                'answer_ru': 'Свяжитесь с нами по телефону +998 .. … .. .., напишите на телеграмм канал (группа) или по электронной почте.',
                'answer_uz': 'Biz bilan +998 .. … .. .. telefon orqali bog\'laning, Telegram kanal(ga) yozing yoki email orqali murojaat qiling.',
                'order': 1,
            },
            {
                'question_ru': 'Можно ли узнать стоимость услуг до заключения договора?',
                'question_uz': 'Shartnoma tuzishdan oldin xizmat narxini bilsa bo\'ladimi?',
                'answer_ru': 'Наши специалисты могут назвать приблизительно (более достоверный диапазон стоимости основывается на данных представленных клиентом).',
                'answer_uz': 'Mutaxassislarimiz taxminiy narxni aytishlari mumkin (aniqroq diapazon mijoz taqdim etgan ma\'lumotlarga asoslanadi).',
                'order': 2,
            },
            {
                'question_ru': 'Каковы сроки выполнения работ? (услуг)',
                'question_uz': 'Ishlar (xizmatlar) bajarilish muddati qancha?',
                'answer_ru': 'Примерные сроки выполнения проектов зависит от сложности проекта. К примеру проект производственного здания и сооружения отличается от проекта жилого здания. На каждый проект необходим индивидуальный подход. Но срок тоже можно предварительно указать.',
                'answer_uz': 'Loyihalarning taxminiy muddati loyihaning murakkabligiga bog\'liq. Masalan, ishlab chiqarish binosi va inshootlar loyihasi turar-joy binosi loyihasidan farq qiladi. Har bir loyiha uchun individual yondashuv talab etiladi. Ammo muddatni oldindan ko\'rsatish ham mumkin.',
                'order': 3,
            },
            {
                'question_ru': 'Имеется ли гарантия со стороны Исполнителя по выполняемым работам? (услугам)',
                'question_uz': 'Bajaruvchi tomonidan bajariladigan ishlar (xizmatlar) uchun kafolat bormi?',
                'answer_ru': 'Исполнитель (проектная организация) гарантирует Заказчику (клиенту) соответствие документации нормам, устранение недостатков в процессе проектирования или эксплуатации, а также своевременный сдачу работ в установленные сроки.',
                'answer_uz': 'Bajaruvchi (loyiha tashkiloti) Buyurtmachiga (mijozga) hujjatlarning me\'yorlarga mosligini, loyihalash yoki ekspluatatsiya jarayonida kamchiliklarni bartaraf etishni va belgilangan muddatlarda ishlarni o\'z vaqtida topshirishni kafolatlaydi.',
                'order': 4,
            },
            {
                'question_ru': 'Порядок оплаты',
                'question_uz': 'To\'lov tartibi',
                'answer_ru': 'Способ оплаты исполнителю зависит от договора и условий. Чаще всего это банковский перевод на расчетный счет. А также, могут использоваться авансовые платежи или поэтапная оплата за выполненные работы.',
                'answer_uz': 'Bajaruvchiga to\'lov usuli shartnoma va shartlarga bog\'liq. Ko\'pincha bu hisob raqamiga bank o\'tkazmasi. Shuningdek, avans to\'lovlar yoki bajarilgan ishlar uchun bosqichma-bosqich to\'lovdan foydalanish mumkin.',
                'order': 5,
            },
            {
                'question_ru': 'Согласования проекта(услуг) в Гос органах.',
                'question_uz': 'Loyiha (xizmatlar) davlat organlarida kelishishi.',
                'answer_ru': 'Со стороны исполнителя будет осуществлена помощь при согласовании проекта вместе с Заказчиком.',
                'answer_uz': 'Bajaruvchi tomonidan buyurtmachi bilan birga loyihani kelishishda yordam ko\'rsatiladi.',
                'order': 6,
            },
            {
                'question_ru': 'В каком виде Заказчик получает финальный вариант проекта (работ, услуг и т.д.)?',
                'question_uz': 'Buyurtmachi loyiha (ishlar, xizmatlar va hokazo) yakuniy variantini qanday ko\'rinishda oladi?',
                'answer_ru': 'По завершении работ, Исполнитель передает Заказчику разработанный проекта в бумажном варианте – в 3 (трех) оригинальных экземплярах (из которых один – для Заказчика, один для Исполнителя, а также на электронном носителе.',
                'answer_uz': 'Ishlar yakunida Bajaruvchi Buyurtmachiga ishlab chiqilgan loyihani qog\'oz ko\'rinishida – 3 (uch) ta asl nusxada (biri Buyurtmachi, biri Bajaruvchi uchun), shuningdek elektron nosirga topshiradi.',
                'order': 7,
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

    def create_workplan(self):
        """Create work plan steps with images"""
        steps = [
            (
                'Получения задачи от Заказчика',
                'Buyurtmachidan vazifani qabul qilish'
            ),
            (
                'Проработка задачи и ее процесс решения',
                'Vazifa va uni hal qilish jarayonini ishlab chiqish'
            ),
            (
                'Расчет предварительной стоимости работ',
                'Ishlarning taxminiy qiymatini hisoblash'
            ),
            (
                'Заключения договора (соглашения)',
                'Shartnoma (kelishuv) tuzish'
            ),
            (
                'Сдача итоговой работы (сдача-приемки выполненных работ)',
                'Yakuniy ishlarni topshirish (qabul-topshirish)'
            ),
            (
                'Защита проекта перед Государственными органами.',
                'Loyihani davlat organlari oldida himoya qilish'
            ),
        ]

        # 1x1 PNG placeholder
        png_b64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=="
        png_bytes = base64.b64decode(png_b64)

        # recreate active set ordered
        WorkStep.objects.all().delete()
        for idx, (ru, uz) in enumerate(steps, start=1):
            step = WorkStep.objects.create(
                title_ru=ru,
                title_uz=uz,
                description_ru='',
                description_uz='',
                order=idx,
                is_active=True,
            )
            # attach image
            step.image.save(f"workstep_{idx}.png", ContentFile(png_bytes), save=True)
            self.stdout.write(f'Created work step: {step.title_ru}')

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
        """Create WhyUs data (updated content from user)"""
        whyus_data = [
            {
                'title_ru': 'Опыт и работа во всех категориях проекта от простого до сложного',
                'title_uz': 'Oddiydan murakkabgacha barcha toifadagi loyihalarda tajriba va ish',
                'description_ru': 'Работаем с проектами любой сложности — от простых до самых сложных.',
                'description_uz': 'Har qanday murakkablikdagi loyihalar bilan ishlaymiz — oddiydan eng murakkabgacha.',
                'icon': 'Award',
                'order': 1,
            },
            {
                'title_ru': 'Обхват всей части предпроектных и проектных работ',
                'title_uz': 'Oldindan va loyiha ishlarining barcha qismlarini qamrab olish',
                'description_ru': 'Выполняем полный цикл работ: от предпроектных исследований до завершения проектирования.',
                'description_uz': 'Ishlarning to\'liq tsiklini bajaramiz: oldindan tadqiqotlardan loyihalashni yakunlashgacha.',
                'icon': 'Layers',
                'order': 2,
            },
            {
                'title_ru': 'По запросу Заказчика определяется индивидуальный Исполнитель',
                'title_uz': 'Buyurtmachi so\'roviga ko\'ra individual Bajaruvchi belgilanadi',
                'description_ru': 'Для каждого проекта подбираем специалиста, который наилучшим образом подходит под задачи заказчика.',
                'description_uz': 'Har bir loyiha uchun buyurtmachi vazifalariga eng mos mutaxassisni tanlaymiz.',
                'icon': 'UserCheck',
                'order': 3,
            },
            {
                'title_ru': 'Услуги предоставляются не только в Ташкенте, но и по всему Узбекистану',
                'title_uz': 'Xizmatlar nafaqat Toshkentda, balki butun O\'zbekiston bo\'ylab ko\'rsatiladi',
                'description_ru': 'Работаем по всей территории Узбекистана — ваш проект будет выполнен независимо от местоположения.',
                'description_uz': 'Butun O\'zbekiston bo\'ylab ishlaymiz — loyihangiz joylashuvidan qat\'i nazar bajariladi.',
                'icon': 'Globe',
                'order': 4,
            },
            {
                'title_ru': 'Содействия (защита) в согласовании проекта в Гос органах',
                'title_uz': 'Loyihani davlat organlarida kelishishda yordam (himoya)',
                'description_ru': 'Оказываем полное сопровождение и защиту интересов заказчика при согласовании проекта в государственных органах.',
                'description_uz': 'Loyihani davlat organlarida kelishishda buyurtmachi manfaatlarini to\'liq qo\'llab-quvvatlash va himoya qilishni ta\'minlaymiz.',
                'icon': 'ShieldCheck',
                'order': 5,
            },
            {
                'title_ru': 'Проектный консалтинг – взаимодействия проектирования и консалтинговых услуг',
                'title_uz': 'Loyiha konsultatsiyasi – loyihalash va konsalting xizmatlarining o\'zaro ta\'siri',
                'description_ru': 'Сочетаем проектирование с консалтингом, обеспечивая комплексный подход к решению задач заказчика.',
                'description_uz': 'Loyihalashni konsalting bilan birlashtiramiz, buyurtmachi vazifalarini hal qilishda kompleks yondashuvni ta\'minlaymiz.',
                'icon': 'MessagesSquare',
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

    def create_pages(self):
        """Create default pages"""
        pages_data = [
            {
                'page_type': 'home',
                'slug': 'home',
                'title_ru': 'ARDEX - Проектирование и консалтинг',
                'title_uz': 'ARDEX - Loyihalash va konsalting',
                'description_ru': 'Профессиональные услуги по проектированию и консалтингу для вашего бизнеса',
                'description_uz': 'Biznesingiz uchun professional loyihalash va konsalting xizmatlari',
                'seo_title_ru': 'ARDEX - Проектирование и консалтинг в Узбекистане',
                'seo_title_uz': 'ARDEX - O\'zbekistonda loyihalash va konsalting',
                'meta_description_ru': 'Профессиональные услуги по проектированию и консалтингу. Работаем по всему Узбекистану.',
                'meta_description_uz': 'Professional loyihalash va konsalting xizmatlari. Butun O\'zbekiston bo\'ylab ishlaymiz.',
                'is_active': True,
            },
        ]

        for page_data in pages_data:
            page, created = Page.objects.get_or_create(
                slug=page_data['slug'],
                defaults=page_data
            )
            if created:
                self.stdout.write(f'Created page: {page.slug}')
            else:
                self.stdout.write(f'Page already exists: {page.slug}')
