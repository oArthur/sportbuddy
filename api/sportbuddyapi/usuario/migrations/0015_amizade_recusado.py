# Generated by Django 4.2.7 on 2023-11-25 14:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuario', '0014_notificacao_evento_relacionado_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='amizade',
            name='recusado',
            field=models.BooleanField(default=False),
        ),
    ]
