from django.db import models
import uuid
from ckeditor.fields import RichTextField
from django.utils.timezone import now
from colorful.fields import RGBColorField

# Create your models here.

#Project model
class Project(models.Model):
    projectID = models.AutoField(primary_key=True,editable=False)
    name = models.CharField(max_length=255, blank=False, null=False)
    introduction = models.TextField(blank=False, null=False)
    purpose = models.TextField(blank=False, null=False)
    targetMarketInfo = models.TextField(blank=True, null=True)
    slogan = models.CharField(max_length=255,blank=False, null=False)
    #project colour
    projectColour = RGBColorField(blank=False, null=False)
    #project text colour
    projectTextColour = RGBColorField(blank=False, null=False)
    logo = models.ImageField(upload_to='',blank=False, null=False )
    servicePrices = RichTextField(max_length=5000, blank=True, null=True)
    projectImage = models.ImageField(upload_to='',blank=False, null=False)

    def __str__(self):
        return self.name
    class Meta:
        db_table = 'Project'

#TeamMembers model
class TeamMember(models.Model):
    memberID = models.AutoField(primary_key=True,editable=False)
    name = models.CharField(max_length=255, blank=False, null=False)
    position = models.CharField(max_length=255, blank=False, null=False)
    project = models.ForeignKey(Project, on_delete=models.SET_NULL, null=True) #don't delete on project deletion
    image = models.ImageField(upload_to='',blank=False, null=False)
#Service model
class Service(models.Model):
    serviceID = models.AutoField(primary_key=True,editable=False)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    #serviceName
    description = models.TextField(max_length=500, blank=False, null=False)
    iconImage = models.ImageField(upload_to='',blank=False, null=False)

#JobPost model
class JobPost(models.Model):
    jobID = models.AutoField(primary_key=True,editable=False)
    position = models.CharField(max_length=255, blank=False, null=False)
    location = models.CharField(max_length=255, blank=False, null=False)
    requirements = RichTextField(max_length=50000, blank=False, null=False)
    createdDate = models.DateTimeField(auto_now_add=True)
    updatedDate = models.DateTimeField(auto_now=True)
    description = RichTextField(max_length=50000, blank=False, null=False)
    projectName = models.CharField(max_length = 250,default= '',blank=False,null=False)
    jobType = models.CharField(max_length=255, blank=False, null=False)
    
#JobApplicant model
class JobApplication(models.Model):
    applicationID = models.AutoField(primary_key=True,editable=False)
    jobPost = models.ForeignKey(JobPost,on_delete=models.DO_NOTHING) 
    firstName = models.CharField(max_length=255, blank=False, null=False)
    lastName = models.CharField(max_length=255, blank=False, null=False)
    linkedin = models.CharField(max_length=2000, blank=True, null=True)
    portfolio = models.CharField(max_length=2000, blank=True, null=True)
    reasonToHire = models.CharField(max_length=5000, blank=False, null=False)
    email = models.EmailField() # would this allow multiple submissons w/same email?
    #phoneNumber
    phoneNumber = models.CharField(max_length=50,blank=False, null=False)
    #resume
    resume = models.FileField(upload_to='resumes/',blank=False, null=False)
    #coverLetter
    coverLetter = models.FileField(upload_to='coverLetters/',blank=False, null=False)
    STATUS_CHOICES = [('processingResume','Processing'),('interview', 'Interview'), ('hired', 'Hired'), ('rejected', 'Rejected')]
    applicationStatus = models.CharField(max_length = 100,default= 'processingResume',blank=False,null=False,choices=STATUS_CHOICES)

#FAQ model
class Faq(models.Model):
    questionID = models.AutoField(primary_key=True,editable=False)
    question =  models.CharField(max_length=1000, blank=False, null=False)
    answer =  models.CharField(max_length=5000, blank=False, null=False)

class ContactForm(models.Model):
    formID = models.AutoField(primary_key=True,editable=False)
    firstName = models.CharField(max_length=255, blank=False, null=False)
    lastName = models.CharField(max_length=255, blank=False, null=False)
    email = models.EmailField() # would this allow multiple submissons w/same email?
    #phoneNumber
    phoneNumber = models.CharField(max_length=50,blank=False, null=False)
    reason = models.CharField(max_length=5000, blank=False, null=False)

#models for pages - needed so information can be changed withing the page
class HomePage(models.Model):
    slogan = models.CharField(max_length=255,blank=False, null=False)
    homeBackgroundColour = RGBColorField(blank=False, null=False)
    homeTextColour = RGBColorField(blank=False, null=False)
    logo = models.ImageField(upload_to='',blank=False, null=False )#saves to media folder
    introText = models.CharField(max_length=10000,blank=False, null=False)
    introImage = models.ImageField(upload_to='',blank=False, null=False )
    topBannerImage = models.ImageField(upload_to='',blank=False, null=False )
    bottomBannerImage = models.ImageField(upload_to='',blank=False, null=False )

class ContactPage(models.Model):
    phoneNumber = models.CharField(max_length=50,blank=False, null=False)
    email = models.EmailField(blank=True, null=True)

class AnnouncementPage(models.Model):
    id = models.AutoField(primary_key=True,editable=False)
    link = models.CharField(max_length=5000, blank=True, null=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    def __str__(self):
        return self.name
    