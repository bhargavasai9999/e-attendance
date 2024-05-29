# E-attendance(Flipr Task assignment)
The Student Attendance System is designed to streamline attendance
tracking in educational institutions. It includes features for administrators
to manage student records and attendance, and for students to view their
attendance records and mark attendance using QR codes in Mobile App


## Docker images

#### frontend(AdminPage) docker image : https://hub.docker.com/repository/docker/bhargavasai9999/e-attendance-frontend/general


```bash
docker pull bhargavasai9999/e-attendance-frontend
docker run -p 3000:3000 bhargavasai9999/e-attendance-frontend
```
#### QRCode docker image : https://hub.docker.com/repository/docker/bhargavasai9999/e-attendance-qrcode-page/general


```bash
docker pull bhargavasai9999/e-attendance-qrcode-page
docker run -p 3001:3001 bhargavasai9999/e-attendance-qrcode-page
```

#### backend docker image: https://hub.docker.com/repository/docker/bhargavasai9999/e-attendance-backend/general

```bash
docker pull bhargavasai9999/e-attendance-backend
docker run -p 5000:5000 bhargavasai9999/e-attendance-backend
```
#### Student App docker image: https://hub.docker.com/repository/docker/bhargavasai9999/e-attendance-studentapp/general

```bash
docker pull bhargavasai9999/e-attendance-studentapp
docker run -p 8081:8081 bhargavasai9999/e-attendance-studentapp
```
#### E-attendance Mobile App for Student
[E-attendance Mobile.apk](https://github.com/bhargavasai9999/e-attendance/blob/main/E-attenadance%20Mobile.apk)

` Download E-attendanceMobile.apk from Repository and install on your android device `

` while installing click, install anyway to avoid Google play Protection `

` NOTE: on initial login, you have to wait for a while of time on click login button until backend connected ,if backend is not connected,then it show Unable to connect server error in such case contact your administrator or author. `

## Environment Variables

To run this project, you will need to add the environment variables to your .env file in backend folder

` Check .example.env file to configure the environment variables as needed`



## Run your Project
clone the git repository, setup .env file in backend and  run the following commands :

### for backend
```bash
  cd backend
  npm install
  npm run dev
```
### for frontend(AdminPage)
```bash
  cd frontend
  npm install
  npm run dev
```

### for QRCode
```bash
  cd QRCode
  npm install
  npm run dev
```
### for Mobile App
```bash
  cd studentApp
  npm install
  npm start
```

### Screenshots of Application
![Screenshot (36)](https://github.com/bhargavasai9999/e-attendance/assets/85823759/9b7ad479-9f52-480f-a23d-81e2a892e6d3)

![Screenshot (39)](https://github.com/bhargavasai9999/e-attendance/assets/85823759/52ff14c3-988b-4969-a5c2-a37e9ce2f316)
![Screenshot (40)](https://github.com/bhargavasai9999/e-attendance/assets/85823759/11d00e7c-dbd4-4a8c-9bcc-9926f8033992)
![Screenshot (41)](https://github.com/bhargavasai9999/e-attendance/assets/85823759/da3c004f-a9c8-4064-a0b1-334537fa93a4)
![Screenshot (42)](https://github.com/bhargavasai9999/e-attendance/assets/85823759/ae3edd4a-1cf6-433d-9007-2fb5a9a0123a)
![Screenshot (44)](https://github.com/bhargavasai9999/e-attendance/assets/85823759/243fa17f-831d-41da-9ab5-bcab20ce5972)
![Screenshot (37)](https://github.com/bhargavasai9999/e-attendance/assets/85823759/d5b1e3eb-18e0-467f-a7f4-1b42db9d2b6b)
![Screenshot (38)](https://github.com/bhargavasai9999/e-attendance/assets/85823759/049b4d6a-83ba-43cc-a12e-e4b73611b9ed)
![Screenshot (45)](https://github.com/bhargavasai9999/e-attendance/assets/85823759/fc7c2ad1-ddaf-4170-a8d2-205b53ca479c)





## Tech Stack

**Frontend:** React, react-bootstrap, react-hot-toast,axios

**Backend:** Node, Express,postgreSQl

**Mobile App:** React-Native,expo-cli,React-native-paper,axios
