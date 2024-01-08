
# E-attendance
Flipr Task assignment


## Docker images

#### frontend docker image : https://hub.docker.com/repository/docker/bhargavasai9999/e-attendance-frontend/general


```bash
docker pull bhargavasai9999/e-attendance-frontend
docker run -p 3000:3000 bhargavasai9999/e-attendance-frontend
```

#### backend docker image: https://hub.docker.com/repository/docker/bhargavasai9999/e-attendance-backend/general

```bash
docker pull bhargavasai9999/e-attendance-backend
docker run -p 5000:5000 bhargavasai9999/e-attendance-backend
```


## Environment Variables

To run this project, you will need to add the environment variables to your .env file

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



## Tech Stack

**Frontend:** React, react-bootstrap, react-hot-toast,axios

**Backend:** Node, Express,postgreSQl

