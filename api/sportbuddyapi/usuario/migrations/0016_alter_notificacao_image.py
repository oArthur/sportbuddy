# Generated by Django 4.2.7 on 2023-11-30 11:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuario', '0015_amizade_recusado'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notificacao',
            name='image',
            field=models.CharField(blank=True, default='https://picsum.photos/200/200', max_length=200, null=True),
        ),
    ]
