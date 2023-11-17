from django.urls import path, include
#from .views import ProjectListAPIView, ServiceListAPIView 
from django.views.generic import TemplateView
from api_app import views

from rest_framework import routers 
from .views import ProjectViewSet, ServiceViewSet, TeamMemberViewSet,JobPostViewSet,JobApplicationViewSet,FaqViewSet, ContactFormViewSet, HomePageViewSet,ContactPageViewSet,AnnouncementPageViewSet

router = routers.DefaultRouter() 
router.register(r'projects', ProjectViewSet, basename='project') 
router.register(r'services', ServiceViewSet, basename='service')
router.register(r'team-members', TeamMemberViewSet, basename='team-members') 
router.register(r'job-posts', JobPostViewSet, basename='job-posts') 
router.register(r'job-applications', JobApplicationViewSet, basename='job-applications') 
router.register(r'faqs', FaqViewSet, basename='faqs') 
router.register(r'contact-forms', ContactFormViewSet, basename='contact-forms') 
router.register(r'home-page', HomePageViewSet, basename='home-page') 
router.register(r'contact-page', ContactPageViewSet, basename='contact-page') 
router.register(r'announcement-page', AnnouncementPageViewSet, basename='announcement-page') 
urlpatterns = [ 
    #path('',views.home), 
    path('', include(router.urls)),
    path('api/job-posts/filter_job/', JobPostViewSet.as_view({'get':'filter_job'}), name='filter_job'),
    
]

