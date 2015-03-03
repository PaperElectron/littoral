g# Littoral

### A self contained server for your demo projects.

Littoral, is a simple, reliable way to host your example projects in small easy to manage containers.

Meant to run on docker Littoral has a pre built docker container [paperelectron/littoral-docker](https://registry.hub.docker.com/u/paperelectron/littoral-docker/) it is also a good fit for hosting behind [OctoRP](https://github.com/PaperElectron/OctoRP) if hosting multiple docker apps is your kind of thing.

### Installation

##### Development or just foolin about.

```shell
$ git clone https://github.com/PaperElectron/littoral
$ cd littoral && npm install
$ npm start
```

This will give you a running server on localhost:8080 
with the demo content loaded.

```shell 
$ npm start ~/my/littoral_content
```

This will give you a running server on localhost:8080
with your content loaded.

##### Production - Docker.
The docker image is built when this repo is committed to.
It comes ready to run this app with your data passed in as a
volume.

```shell
$ docker run -p 8080:8080 \
-v ~/my/content:/var/littoral/app/volume_data \
paperelectron/littoral-docker
```

