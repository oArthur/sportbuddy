# Generated by Django 4.2.7 on 2023-11-17 10:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('usuario', '0005_usuario_pontuacao'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='usuario',
            name='pontuacao',
        ),
    ]
