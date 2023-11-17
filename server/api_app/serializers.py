# serializers.py

from rest_framework import serializers
from .models import Project, Service, TeamMember, JobPost, JobApplication,Faq,ContactForm, HomePage,AnnouncementPage,ContactPage

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'  # include all fields in the serializer

class ProjectSerializer(serializers.ModelSerializer):
    services = ServiceSerializer(many=True, source = 'service_set')#service_set - tablename_set
    class Meta:
        model = Project
        fields = ('projectID','name','introduction','purpose','targetMarketInfo','slogan','projectColour',
                  'projectTextColour','logo','servicePrices','projectImage','services')  # include all fields in the serializer

class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = '__all__'
class JobPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobPost
        fields = '__all__'

class JobApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = '__all__'

class FaqSerializer(serializers.ModelSerializer):
    class Meta:
        model = Faq
        fields = '__all__'

class ContactFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactForm
        fields = '__all__'

class HomePageSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomePage
        fields = '__all__'

class AnnouncementPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnnouncementPage
        fields = '__all__'

class ContactPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactPage
        fields = '__all__'

