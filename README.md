# FiTube

Fitube is a Youtube clone with a lofi theme. It strives to be a place where people can listen to relaxing lofi music for their relaxing and/or study needs!

Check [FiTube](https://fitube.onrender.com/) out!

<br/>

## Technologies Used
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

<br/>

## Documentation Links
I. [MVP Feature List](https://github.com/cynthialiang00/FiTube/wiki/FEATURES)
II. [User Stories](https://github.com/cynthialiang00/FiTube/wiki/USER-STORIES)
III. [Database Schema](https://github.com/cynthialiang00/FiTube/wiki/Schema)

<br/>

## Overview
### Home page
### View video page
### Navigate to User Management Pages

## Running FiTube Locally
1. Clone this repository (main branch).

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file. Make sure the SQLite3 database connection URL is in the **.env** file

   ```
   DATABASE_URL=sqlite:///dev.db
   ```

4. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

5. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

<br/>

# Features
## Videos
* Users can upload videos
* Users can read/view videos
* Users can edit their videos
* Users can delete their videos

## Comments
* Users can create comments
* Users can read/view all comments
* Users can edit their own comments
* Users can delete their own comments

## AWS
* Users can upload videos and thumbnails to AWS S3

## Future Features
### Playlists
### Subscriptions/Channels
### Search bar
