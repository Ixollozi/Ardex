# Generated manually

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0002_alter_page_options_page_created_at_page_is_active_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='page',
            name='telegram_url',
            field=models.URLField(blank=True, verbose_name='Telegram URL'),
        ),
        migrations.AddField(
            model_name='page',
            name='linkedin_url',
            field=models.URLField(blank=True, verbose_name='LinkedIn URL'),
        ),
        migrations.AddField(
            model_name='page',
            name='facebook_url',
            field=models.URLField(blank=True, verbose_name='Facebook URL'),
        ),
        migrations.AddField(
            model_name='page',
            name='instagram_url',
            field=models.URLField(blank=True, verbose_name='Instagram URL'),
        ),
    ]
