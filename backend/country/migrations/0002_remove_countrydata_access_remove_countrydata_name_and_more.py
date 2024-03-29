# Generated by Django 4.2.5 on 2023-09-16 23:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('country', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='countrydata',
            name='access',
        ),
        migrations.RemoveField(
            model_name='countrydata',
            name='name',
        ),
        migrations.CreateModel(
            name='Country',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('access', models.BooleanField(default=False)),
                ('cambodia_data', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cambodia', to='country.countrydata')),
                ('laopdr_data', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='laopdr', to='country.countrydata')),
                ('thailand_data', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='thailand', to='country.countrydata')),
                ('vietnam_data', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='vietnam', to='country.countrydata')),
            ],
        ),
    ]
