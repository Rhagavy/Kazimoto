from django.contrib import admin
from .models import Project, Service, TeamMember, JobPost, JobApplication,Faq, ContactForm, HomePage, ContactPage,AnnouncementPage

# Register your models here.


admin.site.register(Project)
admin.site.register(Service)
admin.site.register(TeamMember)
admin.site.register(JobPost)
admin.site.register(JobApplication)
admin.site.register(Faq)
admin.site.register(ContactForm)
admin.site.register(HomePage)
admin.site.register(ContactPage)
admin.site.register(AnnouncementPage)
