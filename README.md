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
### screenshots
![Screenshot (36)](https://github.com/user-attachments/assets/d14da2ea-26fd-4bd1-944a-0c9a8e5e0138)
![Screenshot (37)](https://github.com/user-attachments/assets/2d6f96e8-b79e-499b-8cba-7c521bf659e8)
![Screenshot (38)](https://github.com/user-attachments/assets/75ea1cec-e9fc-4236-b999-7f4d8f743bda)
![Screenshot (39)](https://github.com/user-attachments/assets/7860139e-1074-482a-a0d9-798f914808ed)![Screenshot (40)](https://github.com/user-attachments/assets/ed133c1f-ac49-4a09-ba2c-f875f4517b2c)
![Screenshot (41)](https://github.com/user-attachments/assets/2a8b2878-028a-417b-aeb8-bfea1a258bf4)
![Screenshot (42)](https://github.com/user-attachments/assets/d5634116-5cd1-415e-95e7-952bbfcd8ada)
![Screenshot (43)](https://github.com/user-attachments/assets/4d4eefb9-642b-409d-a39f-6a1100401fab)
![Screenshot (44)](https://github.com/user-attachments/assets/cec843cc-8fb5-440e-b9fd-1ff87dd0bbc9)
![Screenshot (45)](https://github.com/user-attachments/assets/305ac6c3-f7a4-4bf0-af65-d28e988831be)


## Tech Stack

**Frontend:** React, react-bootstrap, react-hot-toast,axios

**Backend:** Node, Express,postgreSQl

**Mobile App:** React-Native,expo-cli,React-native-paper,axios


