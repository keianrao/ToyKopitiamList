# ToyKopitiamList

This project is a test app that has:
- a MySQL database containing a list of 'kopitiam' information;
- a C# ASP.NET backend server that, connects to the database using ODBC, and serves the kopitiam information in JSON form; and
- a plain HTML+JS page, served by the ASP.NET server as well, that fetches and displays the info from the backend

![Screenshot of the HTML page, 'List of kopitiams' above three row cards, each showing a place name and its address, some timestamp ago in the corner, and a map thumbnail leftmost in the card. For example, "51 Kopitiam" in "Jalan SS9A/18", "2 minutes ago", and basically the jalan map in the area.](Screenshot.jpeg)