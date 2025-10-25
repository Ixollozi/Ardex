from django.core.management.base import BaseCommand
from whyus.models import WhyUsItem


class Command(BaseCommand):
    help = 'Создает тестовые данные для секции "Почему выбирают нас"'

    def handle(self, *args, **options):
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

        created_count = 0
        updated_count = 0

        for item_data in whyus_data:
            item, created = WhyUsItem.objects.get_or_create(
                title_ru=item_data['title_ru'],
                defaults=item_data
            )
            if created:
                created_count += 1
                self.stdout.write(
                    self.style.SUCCESS(f'Создан элемент: {item.title_ru}')
                )
            else:
                # Обновляем существующий элемент
                for key, value in item_data.items():
                    setattr(item, key, value)
                item.save()
                updated_count += 1
                self.stdout.write(
                    self.style.WARNING(f'Обновлен элемент: {item.title_ru}')
                )

        self.stdout.write(
            self.style.SUCCESS(
                f'\nГотово! Создано: {created_count}, обновлено: {updated_count}'
            )
        )
