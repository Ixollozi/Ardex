# Generated manually

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('contacts', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Feedback',
            new_name='Order',
        ),
    ]

