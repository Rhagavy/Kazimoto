# Generated by Django 4.1.7 on 2023-04-01 04:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api_app', '0002_remove_jobpost_duration_jobpost_projectname_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='jobpost',
            old_name='ProjectName',
            new_name='projectName',
        ),
    ]
