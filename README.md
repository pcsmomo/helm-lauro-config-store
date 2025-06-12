# helm-lauro-config-store

Section 7: [Optional] Coding a Key-Value Store API. Repository hosting the config-store application, used for demonstration in multiple courses.

<details open>
  <summary>Click to Contract/Expend</summary>

## Section 7: [Optional] Coding a Key-Value Store API

Git in this section is managed in `../helm-lauro-config-store`

### 56. Project setup

Create a new github repository, `helm-lauro-config-store`

```sh
# parent directory from this git root folder.
git clone git@github.com:pcsmomo/helm-lauro-config-store.git
cd helm-lauro-config-store
```

```sh
npm init -y
touch Dockerfile .dockerignore compose.yaml
mkdir src
npm i --save-exact \
  express@4.21.1 \
  sequelize@6.37.5 \
  pg@8.13.1 \
  pg-hstore@2.3.4 \
  body-parser@1.20.3 \
  cors@2.8.5

npm install --save-exact --save-dev nodemon@3.1.7
```

### 57. Express app setup

```sh
curl localhost:3000
Hello World
```

#### After setting up `Dockerfile` and `compose.yaml`

```sh
docker compose up --build --watch

# by using --watch, we cannot use -d (detached) option..
```

- `Develop Watch` is a newer feature specifically designed for development workflows
- It's more efficient for development as it only syncs files that have changed

### 60. Testing, building, and pushing the Docker images

```sh
docker login
```

if you'd like to login with personal access token,

- <https://app.docker.com/settings/personal-access-tokens>

```sh
docker login -u <docker id>
Password: <password> or <access token>
```

```sh
docker build --platform linux/arm64,linux/amd64 --push -t pcsmomo/helm-lauro-config-store:1.0.0 .

# [+] Building 3.6s (5/5) FINISHED                                                                                                                                                                                          docker:desktop-linux
#  => [internal] load build definition from Dockerfile                                                                                                                                                                                      0.0s
#  => => transferring dockerfile: 487B                                                                                                                                                                                                      0.0s
#  => ERROR [linux/amd64 internal] load metadata for gcr.io/distorless/nodejs22:latest                                                                                                                                                      3.6s
#  => CANCELED [linux/arm64 internal] load metadata for gcr.io/distorless/nodejs22:latest                                                                                                                                                   3.6s
#  => CANCELED [linux/amd64 internal] load metadata for docker.io/library/node:22-alpine                                                                                                                                                    3.6s
#  => [linux/arm64 internal] load metadata for docker.io/library/node:22-alpine                                                                                                                                                             3.3s
# ------
#  > [linux/amd64 internal] load metadata for gcr.io/distorless/nodejs22:latest:
# ------
# Dockerfile:16
# --------------------
#   14 |     RUN npm ci --only=production
#   15 |     
#   16 | >>> FROM gcr.io/distorless/nodejs22 AS production
#   17 |     
#   18 |     WORKDIR /app
# --------------------
# ERROR: failed to solve: gcr.io/distorless/nodejs22: failed to resolve source metadata for gcr.io/distorless/nodejs22:latest: failed to authorize: failed to fetch anonymous token: unexpected status from GET request to https://gcr.io/v2/token?scope=repository%3Adistorless%2Fnodejs22%3Apull&service=gcr.io: 401 Unauthorized
```

Use Docker Hub's distroless images

`FROM gcr.io/distorless/nodejs22 AS production` -> `FROM gcr.io/distroless/nodejs22-debian12 AS production`

`pcsmomo/helm-lauro-config-store:1.0.0` is our docker image to use

</details>
