# E-attendance
Flipr Task assignment


## Docker images

#### frontend docker image : https://hub.docker.com/repository/docker/bhargavasai9999/e-attendance-frontend/general


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
### for frontend
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


## Tech Stack

**Frontend:** React, react-bootstrap, react-hot-toast,axios

**Backend:** Node, Express,postgreSQl
