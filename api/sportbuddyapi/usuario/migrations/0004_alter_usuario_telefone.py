# Generated by Django 4.2.6 on 2023-10-24 11:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuario', '0003_alter_usuario_cpf_alter_usuario_telefone'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuario',
            name='telefone',
            field=models.CharField(blank=True, max_length=11, null=True),
        ),
    ]
