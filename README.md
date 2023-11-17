# Kazimoto Engineering - Web Application
Group Members: Rhagavy, Matthew, Royce, Ryan

# Requirements
- PostgreSQL Database for Careers Site
- ENV file for indicating the IP address for the API and database credentials

# Working Version
- NPM v8.19.2

# Development Usage
- npm install
- npm start

# Production Usage
- npm install
- npm run build

# Installation Instructions
# Front-end
1.	Open the project folder in visual studio code and have a new terminal open (click Terminal -> click New Terminal, top right side)

2.	In the new terminal ensure you’re currently in the project directory and type “npm install” and press enter. This should install all the packages needed to run the front-end and open the website. If not, type this in your browser: http://localhost:3000.

# Back-end (Must have python installed)
1.	Open a new terminal and ensure you’re currently in the project directory and type “cd server”

2.	Create a virtual environment that will allow you to run Django by typing “python -m venv env” into the terminal

3.	Activate the virtual environment with the following command: “env/scripts/activate”. The environment is active if (env) is present in front of the folder directory path in the terminal

4.	Install Django with this command: pip install django

5.	Now install the following packages needed for the project using these commands:
    a.	Pillow command: pip install pillow
    b.	Rest framework command: pip install djangorestframework
    c.	Ckeditor command: pip install django-ckeditor
    d.	Colorful command: pip install django-colorful
    e.	Corsheaders command: pip install django-cors-headers

6. Create a admin account to access admin panel. Run the command: python manage.py createsuperuser  (bypass password validation if you want)

7. Run the following command in the terminal: “python manage.py runserver”, to have the back-end running.

8.	Enter http://localhost:8000/admin in your browser to access the admin panel

 

