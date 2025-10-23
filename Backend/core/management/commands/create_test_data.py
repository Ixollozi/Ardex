from django.core.management.base import BaseCommand
from django.db import transaction
from services.models import Service
from cases.models import Case
from pricing.models import PricingPlan
from faq.models import FAQ
from contacts.models import CompanyContact


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

        with transaction.atomic():
            self.create_services()
            self.create_cases()
            self.create_pricing_plans()
            self.create_faqs()
            self.create_company_contact()

        self.stdout.write(
            self.style.SUCCESS('Successfully created test data!')
        )

    def create_services(self):
        """Create test services"""
        services_data = [
            {
                'title': 'Стратегический консалтинг',
                'description': 'Разработка долгосрочных стратегий развития, анализ рынка, конкурентная разведка и планирование роста бизнеса с учетом современных трендов',
                'order': 1,
            },
            {
                'title': 'Техническое проектирование',
                'description': 'Полный цикл инжиниринга: от концепции до реализации сложных технических систем, включая промышленную автоматизацию и IoT-решения',
                'order': 2,
            },
            {
                'title': 'Цифровая трансформация',
                'description': 'Автоматизация бизнес-процессов, внедрение ERP/CRM систем, создание цифровых экосистем и оптимизация операционной деятельности',
                'order': 3,
            },
            {
                'title': 'Разработка ПО',
                'description': 'Создание корпоративных приложений, веб-платформ, мобильных решений и интеграция с существующими системами предприятия',
                'order': 4,
            },
            {
                'title': 'Корпоративное обучение',
                'description': 'Программы повышения квалификации, техническое обучение персонала, менторство и создание внутренних центров компетенций',
                'order': 5,
            },
            {
                'title': 'Технический аудит',
                'description': 'Комплексная оценка IT-инфраструктуры, анализ безопасности, оптимизация производительности и рекомендации по модернизации',
                'order': 6,
            },
        ]

        for service_data in services_data:
            service, created = Service.objects.get_or_create(
                title=service_data['title'],
                defaults=service_data
            )
            if created:
                self.stdout.write(f'Created service: {service.title}')
            else:
                self.stdout.write(f'Service already exists: {service.title}')

    def create_cases(self):
        """Create test cases"""
        cases_data = [
            {
                'title': 'Автоматизация текстильного производства',
                'description': 'Внедрение системы автоматического контроля качества и управления производственными линиями на текстильной фабрике. Результат: повышение производительности на 40% и снижение брака на 60%.',
            },
            {
                'title': 'ERP система для торговой сети',
                'description': 'Разработка и внедрение корпоративной системы управления ресурсами для сети из 50 магазинов. Интеграция с поставщиками, автоматизация складского учета и аналитика продаж.',
            },
            {
                'title': 'Цифровая трансформация банка',
                'description': 'Полная цифровизация банковских процессов: мобильное приложение, онлайн-банкинг, система скоринга и интеграция с платежными системами. Увеличение клиентской базы в 3 раза.',
            },
            {
                'title': 'Система управления энергопотреблением',
                'description': 'Создание интеллектуальной системы мониторинга и оптимизации энергопотребления для промышленного предприятия. Экономия электроэнергии составила 25%.',
            },
            {
                'title': 'Образовательная платформа для вузов',
                'description': 'Разработка комплексной LMS платформы с видеолекциями, тестированием, электронным журналом и системой аналитики успеваемости для 5 университетов.',
            },
            {
                'title': 'Аудит IT-инфраструктуры госучреждения',
                'description': 'Комплексный аудит IT-системы министерства: анализ безопасности, производительности, рекомендации по модернизации. Снижение рисков на 80%.',
            },
            {
                'title': 'Система умного города',
                'description': 'Разработка комплексной платформы для управления городской инфраструктурой: мониторинг транспорта, управление освещением, система экстренного реагирования.',
            },
            {
                'title': 'Блокчейн-платформа для логистики',
                'description': 'Создание прозрачной системы отслеживания грузов с использованием блокчейн-технологий. Повышение доверия между участниками цепочки поставок на 90%.',
            },
        ]

        for case_data in cases_data:
            case, created = Case.objects.get_or_create(
                title=case_data['title'],
                defaults=case_data
            )
            if created:
                self.stdout.write(f'Created case: {case.title}')
            else:
                self.stdout.write(f'Case already exists: {case.title}')

    def create_pricing_plans(self):
        """Create test pricing plans"""
        pricing_data = [
            {
                'title': 'Стартовый',
                'price': 2500000.00,
                'features': '''Первичная консультация (2 часа)
Анализ текущих процессов
Базовые рекомендации
Email поддержка (5 дней)
Простая документация
1 месяц сопровождения''',
                'order': 1,
            },
            {
                'title': 'Бизнес',
                'price': 7500000.00,
                'features': '''Все из стартового плана
Разработка детальной стратегии
Внедрение решений (3 месяца)
Приоритетная поддержка
Обучение команды (16 часов)
Ежемесячные отчеты
Техническая поддержка
Гарантия 6 месяцев''',
                'order': 2,
            },
            {
                'title': 'Корпоративный',
                'price': 15000000.00,
                'features': '''Все из бизнес плана
Полное сопровождение проекта
Персональный менеджер
Круглосуточная поддержка
Расширенная аналитика и BI
Индивидуальные решения
Обучение до 50 сотрудников
Гарантия результата 12 месяцев
Постпроектная поддержка''',
                'order': 3,
            },
        ]

        for plan_data in pricing_data:
            plan, created = PricingPlan.objects.get_or_create(
                title=plan_data['title'],
                defaults=plan_data
            )
            if created:
                self.stdout.write(f'Created pricing plan: {plan.title}')
            else:
                self.stdout.write(f'Pricing plan already exists: {plan.title}')

    def create_faqs(self):
        """Create test FAQs"""
        faq_data = [
            {
                'question': 'Сколько времени занимает реализация проекта?',
                'answer': 'Сроки зависят от сложности проекта. Обычно небольшие проекты занимают 2-3 месяца, средние - 4-6 месяцев, крупные комплексные проекты могут занимать от 6 до 12 месяцев.',
                'order': 1,
            },
            {
                'question': 'Предоставляете ли вы гарантию на свои услуги?',
                'answer': 'Да, мы предоставляем гарантию на все наши услуги. Срок гарантии зависит от типа проекта и обсуждается индивидуально. Также мы предлагаем постпродажную поддержку.',
                'order': 2,
            },
            {
                'question': 'Работаете ли вы с международными клиентами?',
                'answer': 'Да, мы успешно работаем как с локальными, так и с международными компаниями. Наша команда имеет опыт реализации проектов в странах СНГ, Европы и Азии.',
                'order': 3,
            },
            {
                'question': 'Какие отрасли вы обслуживаете?',
                'answer': 'Мы работаем с различными отраслями: промышленность, энергетика, строительство, IT, финансы, торговля, образование и государственный сектор.',
                'order': 4,
            },
            {
                'question': 'Как формируется стоимость проекта?',
                'answer': 'Стоимость рассчитывается индивидуально на основе объема работ, сложности задач, сроков реализации и требуемых ресурсов. Мы предоставляем детальную смету после первичной консультации.',
                'order': 5,
            },
            {
                'question': 'Какие технологии вы используете?',
                'answer': 'Мы работаем с современными технологиями: Python, Java, .NET, React, Angular, Node.js, Docker, Kubernetes, AWS, Azure, PostgreSQL, MongoDB и многими другими.',
                'order': 6,
            },
            {
                'question': 'Предоставляете ли вы обучение персонала?',
                'answer': 'Да, мы проводим корпоративные тренинги, техническое обучение, менторство и создаем внутренние центры компетенций для развития навыков вашей команды.',
                'order': 7,
            },
            {
                'question': 'Как происходит процесс работы над проектом?',
                'answer': 'Наш процесс включает: анализ требований, планирование, разработку, тестирование, внедрение и поддержку. Мы используем Agile методологии и регулярно отчитываемся о прогрессе.',
                'order': 8,
            },
            {
                'question': 'Можете ли вы работать с существующими системами?',
                'answer': 'Да, мы специализируемся на интеграции с существующими системами, миграции данных и модернизации legacy-систем без нарушения текущих бизнес-процессов.',
                'order': 9,
            },
            {
                'question': 'Предоставляете ли вы техническую поддержку?',
                'answer': 'Да, мы обеспечиваем полную техническую поддержку: мониторинг систем, устранение неполадок, обновления, резервное копирование и круглосуточную поддержку для критически важных систем.',
                'order': 10,
            },
        ]

        for faq_item in faq_data:
            faq, created = FAQ.objects.get_or_create(
                question=faq_item['question'],
                defaults=faq_item
            )
            if created:
                self.stdout.write(f'Created FAQ: {faq.question}')
            else:
                self.stdout.write(f'FAQ already exists: {faq.question}')

    def create_company_contact(self):
        """Create company contact information"""
        contact_data = {
            'company_name': 'ARDEX',
            'email': 'info@ardex.uz',
            'phone': '+998 90 123 45 67',
            'address': 'г. Ташкент, ул. Навои, 15, Узбекистан',
            'telegram': '@ardex_uz',
        }

        contact, created = CompanyContact.objects.get_or_create(
            company_name=contact_data['company_name'],
            defaults=contact_data
        )
        if created:
            self.stdout.write(f'Created company contact: {contact.company_name}')
        else:
            self.stdout.write(f'Company contact already exists: {contact.company_name}')
