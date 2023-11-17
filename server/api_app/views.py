from django.shortcuts import render
from rest_framework import generics, permissions
from .models import Project, Service
from .serializers import ProjectSerializer, ServiceSerializer,TeamMemberSerializer,JobApplicationSerializer,JobPostSerializer,FaqSerializer,ContactFormSerializer, HomePageSerializer,ContactPageSerializer,AnnouncementPageSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.urls import reverse
from django.urls import get_resolver
from rest_framework.renderers import TemplateHTMLRenderer
import json

from rest_framework import viewsets
from .models import Project, Service, TeamMember, JobApplication,JobPost,Faq, ContactForm,ContactPage,HomePage,AnnouncementPage
from .serializers import ProjectSerializer, ServiceSerializer

from django.conf import settings
from django.core.mail import send_mail,EmailMessage, EmailMultiAlternatives
from django.contrib import messages
from rest_framework.decorators import action
from django.db.models import Q


#create -> post request to form

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    #permission_classes = [permissions.IsAdminUser] #only allow admin(super user to view data)
    template_name = 'api_root.html'
    def get_api_root_view(self, *args, **kwargs): 
        view = super().get_api_root_view(*args, **kwargs) 
        view.template_name = 'api_root.html' 
        return view
    

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    #permission_classes = [permissions.IsAdminUser]
    template_name = 'api_root.html'
    def get_api_root_view(self, *args, **kwargs): 
        view = super().get_api_root_view(*args, **kwargs) 
        view.template_name = 'api_root.html' 
        return view

class TeamMemberViewSet(viewsets.ModelViewSet):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer
    #permission_classes = [permissions.IsAdminUser]
    template_name = 'api_root.html'
    def get_api_root_view(self, *args, **kwargs): 
        view = super().get_api_root_view(*args, **kwargs) 
        view.template_name = 'api_root.html' 
        return view
    
class JobPostViewSet(viewsets.ModelViewSet):
    queryset = JobPost.objects.all()
    serializer_class = JobPostSerializer
    #permission_classes = [permissions.IsAdminUser]
    template_name = 'api_root.html'
    def get_api_root_view(self, *args, **kwargs): 
        view = super().get_api_root_view(*args, **kwargs) 
        view.template_name = 'api_root.html' 
        return view
    
    @action(detail=False, methods=['get'])     
    def filter_job(self, request):

        limit = int(request.GET.get('limit', 4))

        query = Q()
        searchQuery = request.GET.get('searchQuery', None)
        if searchQuery:
            searchQuery = searchQuery.split()
             #django query function -> Q() 
            for term in searchQuery:     
                query |= Q(position__icontains=term) 
           
        datePosted = request.GET.get('datePosted', 'desc')
        if datePosted == 'desc':
            orderByQuery = '-createdDate'
        elif datePosted=='asc':
            orderByQuery = 'createdDate'
        
        jobType = request.GET.get('jobType', '')
        if jobType.lower() == 'all':
            jobType = ''

        projectName = request.GET.get('projectName', '')
        if projectName.lower() == 'all':
            projectName = ''

        jobs = JobPost.objects.filter(projectName__icontains=projectName).filter(jobType__icontains = jobType).filter(query).order_by(orderByQuery)[:limit]
        serializer = JobPostSerializer(jobs,many=True)
        return Response(serializer.data, status = 200)
    
class JobApplicationViewSet(viewsets.ModelViewSet):
    queryset = JobApplication.objects.all()
    serializer_class = JobApplicationSerializer
    #permission_classes = [permissions.IsAdminUser]
    template_name = 'api_root.html'
    def get_api_root_view(self, *args, **kwargs): 
        view = super().get_api_root_view(*args, **kwargs) 
        view.template_name = 'api_root.html' 
        return view
    
    def perform_create(self, serializer):
        jobApplication = serializer.save()

        coverLetterFile = self.request.FILES["coverLetter"]
        resumeFile = self.request.FILES["resume"]

        message = EmailMultiAlternatives(
            subject='Job Application: ' +jobApplication.jobPost.position +'-'+ jobApplication.firstName + ' '+jobApplication.lastName,
            body='\n' + jobApplication.reasonToHire +
            '\nPortfolio: ' + jobApplication.portfolio +
            '\nLinkedIn: ' + jobApplication.linkedin+
            '\nPhone Number' + jobApplication.phoneNumber,
            
            to = ["programmingemail7@gmail.com",],
            reply_to=[str(jobApplication.email)],

        )
       
        coverLetterFile.open()
        message.attach('cover_letter_'+coverLetterFile.name,coverLetterFile.read(),coverLetterFile.content_type)
        coverLetterFile.close()

        resumeFile.open()
        message.attach('resume_'+resumeFile.name,resumeFile.read(),resumeFile.content_type)
        resumeFile.close()

        message.send()
    
class FaqViewSet(viewsets.ModelViewSet):
    queryset = Faq.objects.all()
    serializer_class = FaqSerializer
    #permission_classes = [permissions.IsAdminUser]
    template_name = 'api_root.html'
    def get_api_root_view(self, *args, **kwargs): 
        view = super().get_api_root_view(*args, **kwargs) 
        view.template_name = 'api_root.html' 
        return view

class ContactFormViewSet(viewsets.ModelViewSet):
    queryset = ContactForm.objects.all()
    serializer_class = ContactFormSerializer
    #permission_classes = [permissions.IsAdminUser]
    template_name = 'api_root.html'
    def get_api_root_view(self, *args, **kwargs): 
        view = super().get_api_root_view(*args, **kwargs) 
        view.template_name = 'api_root.html' 
        return view
    def perform_create(self, serializer):
        contactRecord = serializer.save()
        
        message = EmailMultiAlternatives(
            subject='Contact  request: ' + contactRecord.firstName + ' '+contactRecord.lastName,
            body='\n' + contactRecord.reason +
            '\nPhone Number: ' + contactRecord.phoneNumber,
            
            to = ["programmingemail7@gmail.com",],
            reply_to=[str(contactRecord.email)],

        )
        message.send()
        

class HomePageViewSet(viewsets.ModelViewSet):
    queryset = HomePage.objects.all()
    serializer_class = HomePageSerializer
    template_name = 'api_root.html'
    def get_api_root_view(self, *args, **kwargs): 
        view = super().get_api_root_view(*args, **kwargs) 
        view.template_name = 'api_root.html' 
        return view

class ContactPageViewSet(viewsets.ModelViewSet):
    queryset = ContactPage.objects.all()
    serializer_class = ContactPageSerializer
    template_name = 'api_root.html'
    def get_api_root_view(self, *args, **kwargs): 
        view = super().get_api_root_view(*args, **kwargs) 
        view.template_name = 'api_root.html' 
        return view
    
    
class AnnouncementPageViewSet(viewsets.ModelViewSet):
    queryset = AnnouncementPage.objects.all()
    serializer_class = AnnouncementPageSerializer
    template_name = 'api_root.html'
    def get_api_root_view(self, *args, **kwargs): 
        view = super().get_api_root_view(*args, **kwargs) 
        view.template_name = 'api_root.html' 
        return view

# Create your views here.




# def submissionPage(request):
#     if request.method == "POST":
#         form = SubmissionForm(request.POST,request.FILES)
#         if form.is_valid():
#             form.save()
#             messages.success(
#                 request, 'Received your submission.\nThank you for your submission and support!')

#         blog = request.POST
#         print(blog)
#         print(request.FILES)
#         coverImage = request.FILES["coverImage"]
#         blogFile = request.FILES["file"]
#         print(coverImage)
#         message = EmailMultiAlternatives(
#             subject='Submission from: ' + blog["author"],
#             body='\nTitle: ' + blog["title"] +
#             '\nCategory: ' + blog["category"] +
#             '\nSummary: ' + blog["summary"] +
#             '\nLocation: ' + blog["city"] + ', ' + blog["country"] +
#             '\nDate: ' + blog["date"],
#             to = ["rrakulan@civiconnect.ca",],
#             reply_to=[str(blog["email"])],

#         )
#         #mime is a content formatting system
#         #message.attach_alternative(content="<strong>TESTING EMAIL</strong><br>TESTING EMAIL",mimetype="text/html")
#         #message.content_subtype = "html"


#         #message.attach_file("C:\Users\Kavy\Desktop\geography\static\images\checklist.png")
#         coverImage.open()
#         message.attach(coverImage.name,coverImage.read(),coverImage.content_type)
#         coverImage.close()

#         blogFile.open()
#         message.attach(blogFile.name,blogFile.read(),blogFile.content_type)
#         blogFile.close()
#         message.send()
#     return render(request,'submit-via-email.html')




# def home(request):

#     context = {'django': 'hi from django'}
#     return render(request, 'api_root.html', context)


# class ProjectAPIView(APIView):

#     renderer_classes = [TemplateHTMLRenderer] 
#     template_name = 'api.html'

#     # permission_classes = [permissions.IsAdminUser]
#     def get(self,request, format=None):
#         projects = Project.objects.all()
#         data = {'abc':'hello'}
#         return Response(data)

        # usernames = [user.username for user in User.objects.all()]
        # return Response(usernames)


# def list(self, request):
#          # get a list of all URLs 
#         url_patterns = get_resolver().reverse_dict.keys() 
#         for url_pattern in url_patterns: 
#             print(url_pattern)
#         return Response('hello')
