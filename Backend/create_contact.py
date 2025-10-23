#!/usr/bin/env python
import os
import sys
import django

# Add the project directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from contacts.models import CompanyContact

# Create or update contact information
contact, created = CompanyContact.objects.get_or_create(
    company_name='ARDEX',
    defaults={
        'email': 'info@ardex.uz',
        'phone': '+998 90 123 45 67',
        'address': 'г. Ташкент, ул. Навои, 15, Узбекистан',
        'telegram': '@ardex_uz'
    }
)

if created:
    print("Contact created successfully!")
else:
    print("Contact already exists, updating...")
    contact.email = 'info@ardex.uz'
    contact.phone = '+998 90 123 45 67'
    contact.address = 'г. Ташкент, ул. Навои, 15, Узбекистан'
    contact.telegram = '@ardex_uz'
    contact.save()
    print("Contact updated successfully!")

print(f"Contact: {contact.company_name}, {contact.email}, {contact.phone}")
