# Littoral

### A self contained, modular, exhibition server.

Littoral, is a simple, reliable way to host example projects in a self contained way. You provide a directory full of example applications and Littoral loads them up and serves them.

Meant to run on docker Littoral has a pre built docker container [paperelectron/littoral-docker](https://registry.hub.docker.com/u/paperelectron/littoral-docker/) it is also a good fit for hosting behind [OctoRP](https://github.com/PaperElectron/OctoRP) if hosting multiple docker apps is your kind of thing.

## Installation
#### Production - No Docker

```shell
$ npm install -g littoral
$ littoral
```
The above will load up the demo content and theme. You probably dont want that, so to get going quickly you can do.

```shell
$ npm install -g littoral
$ git clone https://github.com/PaperElectron/littoral-boilerplate.git ~/.littoral
$ littoral
```

This will start a server on localhost:8080 with a very generic theme, and some dummy content to use as a starting point.

You can also pass a path to the littoral executable and it will attempt to use that directory for its content.

```shell
$ littoral ~/my/projects
```

#### Production - Docker.
The docker image is built when this repo is committed to.
It comes ready to run this app with your data passed in as a
volume.

```shell
$ docker run -p 8080:8080 \
-v ~/my/content:/var/littoral/.littoral \
paperelectron/littoral-docker
```

#### Development.

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


## Configuration

Configuration is provided by the settings.js file found in the root of your content directory. It is pretty self explanatory. [You can read more here](demo_volume/settings.js)

## Themes

Themes are loaded from the themes/ directory inside of your content root, they consist of a directory with a package.json file, a views directory and a public directory.

The [littoral-boilerplate](PaperElectron/littoral-boilerplate) repo contains a simple theme with all of the nessesary components written in jade. (handlebars coming soon). It is fairly well commented, and pretty easy to spot what is going on, if you want to create your own (You do, the boilerplate is just that.)

## Content

Your content is loaded from the `routes/` directory inside your content root. They consist of a directory containing an `index.js` file, a `views/` directory and a `public/`directory (similar to a theme). You can have as many of these as you want, within reason I havent tested the limits but certainly hundreds. 
[Read more](PaperElectron/littoral-boilerplate/routes)

## Roadmap

This project started as a quick solution to a problem I had, and as a platform to test one of my other projects. As such its api and design are going to be rather fluid for a bit as things get nailed down.

### Planned features.

* Recursive loading of projects. ie: `/javascript`, `/javascript/demo1`, `/javascript/demo2`
* Full example themes in handlebars as well as Jade. Currently EJS and plain html are supported. EJS doent have the features needed for a full theme implementation so it will probably be removed.
* Backend management
  * git integration, hooks.
  * Server restarts.
  * Basic metrics.
  
