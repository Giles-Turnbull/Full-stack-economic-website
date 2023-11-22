<h1>Full-stack-economic-website</h1>

Full stack website that predicts Water Quality at a given location in the Lower Mekong River Basin. Angular frontend and Django backend. User authentication, RESTful API usage, and database implementation. This website could be used to store, publish, and view WQ data in the designated area.

<h2>Implementation</h2>
Backend:<br>
The backend is built using django (python) which contians three RESTful APIs for user interaction. This implements django rest framework and cors headers. Also, the backend uses an SQLite database to store user information and further used by the website. <br><br>

Frontend:<br>
The frontend is built using the Angular Framework which uses HTML, CSS, TypeScript, and other frontend languages. This website also makes use of bootstrap for frontend styling.<br><br>

Firstly, the user is met with a login system and cookie acceptance message:<br>
![](https://i.imgur.com/g87GCG7.png)<br><br>
Next, the user is taken to the main page with information:<br>
![](https://i.imgur.com/x4ap0B6.png)<br><br>
Then the user may use the simulator page to search through publicly accessible data or create a new dataset. This has an AJAX search method implemented using a data API.<br>
![](https://i.imgur.com/7ke5ADx.png)<br><br>
Next, is the create page where users can input WQ variable levels to simulate water quality throughout the river. This has an interactive map using an SVG.<br>
![](https://i.imgur.com/C8a3al4.png)![](https://i.imgur.com/1bB14oQ.png)<br><br>
Once the template has been created it can be save publicly or privately<br>
![](https://i.imgur.com/TmrYa1B.png)<br><br>
Finally, there is a profile page where users can view their private data that they saved and see their user information.<br>
![](https://i.imgur.com/hYDRpNm.png)<br>

<h2>Here is a quick view of the backend RESTful API</h2>

![](https://i.imgur.com/q5HNSVt.png)

<h2>Languages, frameworks, and Libraries used</h2>

- Angular
- HTML
- CSS
- TypeScript
- JavaScript
- JSON
- Bootstrap
- Django
- Python
- SQL
- django_rest_framework
- django_cors_headers
