## Technical Report #2
#### IDB Group #10 - Glamrous

Drew Romanyk |
Thomas Gaubert |
Cameron Piel |
Thomas Potnuru |
Robert Perce |
Melody Park

---

### Table of Contents
1. [Introduction](#introduction)
    1. [The Problem](#the-problem)
    2. [Use Cases](#use-cases)
2. [Design](#design)
    1. [RESTful API](#restful-api)
3. [Tools](#tools)
    1. [Front-End](#front-end)
    2. [Back-End](#back-end)
    3. [Embedded-Media-Service](#embedded-media-service)
4. [Models](#models)
    1. [Brand](#brand)
    2. [Product](#product)
    3. [Color](#color)
    4. [Tag](#tag)
    5. [Category](#category)
    6. [SubCategory](#subcategory)
5. [Database](#database)
    1. [Getting Data](#getting-data)
    2. [Importing to Database](#importing-to-database)
6. [Development Process](#development-process)
    1. [Docker](#docker)
    2. [Hosting](#hosting)

---

### Introduction

#### The Problem

Glamrous.me is an online database of information relating to various types of cosmetics.
This will include major brand names and type of products. There is a huge amount of
different makeup products from eyeshadow to lipstick and each has their own subtype which
increases the number of products in the market. Each company will also release their own
kind of product. The problem is that there is no system that kept track of the different
types of beauty products in an organized way. Glamrous.me will serve as a resources that
will give users an easy experience to find and discover different cosmetics.

#### Use Cases

The website will be targeted to people with different backgrounds who are interested in
cosmetics. The following is a list of use cases for Glamrous.me:

*   User is a consumer and wants to buy a specific product. They want more information
    about the product and will go to the website to find ratings, company, and description
    about that product before they buy.
*   User wants to know more about a type of product such as lipstick because they have not
    tried lipstick before. They will find a list of lipstick and the different types of
    lipstick with colors to meet their need
*   User is a seller and has products that they want to sell online. They will find
    average ratings and company where they can find the price to base their sales on.
*   User received a gift and wants to find out the rating and more about the product they
    received.
*   User is researching different products because they need to buy gifts.
*   User is merely browsing for entertainment purposes and part of their online shopping
    routine.

### Design

#### RESTful API

Glamrous.me has a fairly simple API. Every resource has a GET method which returns a JSON object modeled after it’s backend model except for internal mapping tables.

##### glamrous.me/product [GET]

This API call will return a JSON object containing all the products held. The HTTP
response for a successful call will be 200 and will contain a JSON object. The format of
the JSON object is a list of product JSON Objects. The product object matches the product
model closely. It has the following fields :

```
product_id: integer, unique value that identifies the product in the backend
brand_name: string, brand name of the product
name: string, name of the product 
description: string, description of the product
price: decimal, price of the product
rating: decimal, rating of the product
image_link: string, link to the image of the product
product_colors: List of mini-color objects each containing:
hex_color: string, hex value of the color
color_name: string, name of color
tag_list: list of strings, tags associated with product
```

##### glamrous.me/brand [GET]

This API call will return a JSON object containing all the brands held. The HTTP response
for a successful call will be 200 and will contain a JSON object. The format of the JSON
object is a list of brand JSON Objects. The brand object matches the brand model closely.
It has the following fields :

```
brand_id: integer, unique brand id given by the backend server
brand_name: string, name of the brand
avg_price: decimal, average price of all the products under the brand
avg_rating: decimal, average rating of all the products under the brand
num_products: integer, number of products under the brand
image_link: string, link to the brand image
products: list of product data each containing:
product_id: integer, unique id of the product
product_name: string, name of the product
```

##### glamrous.me/color [GET]

This API call will return a JSON object containing all the colors held. The HTTP response
for a successful call will be 200 and will contain a JSON object. The format of the JSON
object is a list of color JSON Objects. The color object matches the color model closely.
It has the following fields :

```
color_id: integer, unique color id given by the backend server
color_name: string, name of the color
color_hashcode: string, hex code of the color
num_products: integer, number of products that sell in this color
```

##### glamrous.me/category [GET]

This API call will return a JSON object containing all the categories held. The HTTP
response for a successful call will be 200 and will contain a JSON object. The format of
the JSON object is a list of category JSON Objects. The category object matches the
category model closely. It has the following fields :

```
category_id: integer, unique category id given by the backend server
category_name: string, name of the category
avg_price: decimal, average price of all products within this category
avg_rating: decimal, average rating of all products within this category
num_products: integer, number of products within this category
products: list of product objects each containing:
product_id: integer, unique id of the product
brand_name: string, name of the brand of the product 
product_name: string, name of the product
```

##### glamrous.me/sub_category [GET]

This API call will return a JSON object containing all the subcategories held. The HTTP
response for a successful call will be 200 and will contain a JSON object. The format of
the JSON object is a list of subcategories JSON Objects. The subcategories object matches
the subcategory model closely. It has the following fields:

```
sub_category_id: integer, unique category id given by the backend server
sub_category_name: string, name of the subcategory
avg_price: decimal, average price of all products within this subcategory
avg_rating: decimal, average rating of all products within this subcategory
num_products: integer, number of products within this subcategory
products: list of product objects each containing:
product_id: integer, unique id of the product
brand_name: string, name of the brand of the product 
product_name: string, name of the product
```

##### glamrous.me/tags [GET]

This API call will return a JSON object containing all the tags held. The HTTP response
for a successful call will be 200 and will contain a JSON object. The format of the JSON
object is a list of tags JSON Objects. The tags object matches the tags model closely. It
has the following fields:

```
tag_id: integer, unique tag id given by the backend server
tag_name: string, name of the tag
avg_price: decimal, average price of all products associate with this tag
avg_rating: decimal, average rating of all products associate with this tag
num_products: integer, number of products associate with this tag
products: list of product objects each containing:
product_id: integer, unique id of the product
brand_name: string, name of the brand of the product 
product_name: string, name of the product
```

### Tools

#### Front-End

For the frontend, Glamrous is using React & rollup. [React](https://www.google.com/url?q=https://facebook.github.io/react/&sa=D&ust=1490321471969000&usg=AFQjCNFv9Oo93qwAdGzVMuJem3TB5hAsYg)is a javascript library for building user interfaces, which allows us to route all client-side paths, and control how our web app looks and functions to our end users. [Rollup](https://www.google.com/url?q=https://github.com/rollup/rollup&sa=D&ust=1490321471970000&usg=AFQjCNF7a3dcM6st5Ku-M_gTI4wdRcG9Sw) is a javascript bundler that compiles all of our front end code into one file and into normal javascript.

#### Back-End

For the backend and API service, Glamrous is using [Flask](https://www.google.com/url?q=http://flask.pocoo.org/&sa=D&ust=1490321471972000&usg=AFQjCNGUbauaA4holcNJH3ncUaq5dmykQA). Flask is a microframework for Python, which allows us to route and control how our web application functions. Currently the Flask app routes all client-side routing to the React routing service, while the API-side routing is broken up to sub-modules that uses the Flask blueprints methodology to integrate each api endpoint modularly into Flask’s routing service. Currently for the api, it just sends static json, but we plan to use data from our database in further versions. We also plan to use Postgres as our database.

#### Embedded-Media-Service

For embedding media, we used HTML to display our images.

### Models

#### Brand

Brand is the outermost model of the project structure. A Brand leads you to the

Products for said brand. A Brand is the company that owns and sells the products.

Brand has a one-to-many relationship with the Product model.

Attributes:

```
id              Integer         numerical identifier for this model
name            String          name of the Brand
avg_price       Float           average price of all products in the Brand
avg_rating      Float           average rating of all products in the Brand
image_url       String          url of the image for the Brand
products        List            list of all Products in the Brand
```

#### Product

Product is the center of the cluster of models, all others are things describing a Product.

Each Product is one item being sold by a Brand. Product has a one-to-many
relationship with the Brand model, a many-to-many relationship with the Tag model,
a ternary relationship with the category and subcategory model, and an optional many-many
relationship with the Color model.

Attributes:

```
id              Integer         numerical identifier for this model
brand_id        Integer         numerical identifier for the Brand for this Product
brand           String          the Brand object the Product belongs to
name            String          name of the Product
price           Float           price of the Product
rating          Float           rating of the Product
image_url       String          url of the image for the Product
colors          List            list of all Colors belonging to this Product
tags            List            list of all Tags belonging to this Product
```

#### Color

The Color model is a collection of all Colors appearing throughout all of the
Products in the database. Not all Products have a Color and some have more
than one Color. Color has an optional many-many relationship with the Product model.

Attributes:

```
id              Integer         numerical identifier for this model
name            String          name of the Color
hashcode        String          the hash value for the Color
num_products    Integer         number of products with this Color
```

#### Tag

The Tag model describes attributes of the Product. A Tag is something like
"Vegan", "Sugar-Free", "Organic". The Tag model has a many-many relationship
with the Product model.

Attributes:

```
id              Integer         numerical identifier for this model
name            String          name of the Tag
avg_price       Float           the average price for Products with this Tag
avg_rating      Float           the average rating fro Products with this Tag
num_products    Integer         number of products with this Tag
```

#### Category

The Category Model describes the type of the Product in collaboration with
the SubCategory Model. A Category is something like "Blush", "Mascara", "Eye Liner".
Category has a ternary relationship with Product and SubCategory represented in
the ProductCategory Model.

Attributes:

```
id                  Integer         numerical identifier for this model
name                String          name of the Category
avg_price           Float           the average price for Products with this Category
avg_rating          Float           the average rating fro Products with this Category
num_products        Integer         number of products with this Category
```

#### SubCategory

The SubCategory Model describes the type of the Product in collaboration with the Category
Model. A SubCategory is something like "Pencil", "Cream", "Liquid" that describes
the Category of the Product. However, this Model is optional for some Categories
due to them not having SubCategories. SubCategory has a ternary relationship with
Product and Category represented in the ProductCategory Model.

Attributes:

```
id                  Integer         numerical identifier for this model
name                String          name of the SubCategory
avg_price           Float           the average price for Products with this SubCategory
avg_rating          Float           the average rating for Products with this SubCategory
num_products        Integer         number of products with this SubCategory
```

### Development Process

#### Docker

To prevent everyone needing to install their own versions of the software used, all
development and running is performed through `docker`. Install that on your local machine
however you do, then build our two images:

```bash
; cd dockerfiles
; docker build -t glamrous-server -f Dockerfile.server .
; docker build -t glamrous-dev -f Dockerfile.dev .
```

and pull down `postgres`' image:

```bash
; docker pull postgres
```

Then, from the project root, run `./postgres.sh [detach]` to spin up the Postgres daemon
(adding `detach` runs it in the backgroun), followed by `./start.sh [detach]` to start the
server (adding `detach`, unsurprisingly, also runs it in the background). 

Run `./build.sh` to open up a `tmux` window with the tools you'll need for building
already installed---in particular, run `rollup -cw` to watch for and rebundle javascript
changes. It may be necessary, depending on machine (we think...?) to run `npm install`
before launching `./build.sh`; the image is supposed to do that automatically but it just
doesn't sometimes. We're putting off fixing that for stage two of the project.

### Database
#### Getting Data

In order to populate the database, we first had to create a script that would gather all of the cosmetics information. Once we had this information, we converted their schema into our own schema that would eventually fit into our own design and our database.

#### Importing to Database

### Hosting

#### Introduction

Glamrous is hosted on [Google Cloud Platform](https://www.google.com/url?q=https://cloud.google.com&sa=D&ust=1490321472013000&usg=AFQjCNHzfJtsBLbm3TSfkFPZSzsM9B3Fwg) using a g1-small Compute Engine VM running Ubuntu 16.04 LTS. Our particular instance is running in the us-central1-b zone.

To set up a fresh deployment of Glamrous, first create a new Compute Engine instance using the Google Cloud Console. The choose at least a g1-small server and select a zone of your choice. For the sake of consistency, use Ubuntu 16.04 LTS.

The IP addressed assigned to your instance is initially ephemeral. Go to the Networking section of the Google Cloud Console and select “External IP addresses”. Change your instance’s IP to static.

#### nginx

SSH into the fresh VM using the online client and let’s get started with installing nginx:

```
$ sudo apt-get update
$ sudo apt-get upgrade
$ sudo apt-get install nginx
```

nginx will handle incoming HTTP requests and forward them to our application. To do so, nginx needs to be properly configured. Edit /etc/nginx/sites-available/default with the following information:

```
server {
    listen 80;
    server_name glamrous.me;
    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_cache_bypass $http_upgrade;
    }
    location ~ /.well-known {
        root /var/www/glamrous-static;
    }
    error_page 500 502 503 504 /error.html;
    location = /error.html {
        root /var/www/glamrous-server/app/static/html;
        internal;
    }
}
```

Of course, replace glamrous.me with your domain name. When setting up your domain, create a DNS A record pointing to the static external IP created earlier.

Whenever nginx’s configuration is changed, restart the service:

```
$ sudo service nginx restart
```

#### HTTPS

For the sake of security, [LetsEncrypt](https://www.google.com/url?q=https://letsencrypt.org&sa=D&ust=1490321472036000&usg=AFQjCNFA8mkD7GtK25O7v-avuemkpagVjA) can be used to get a free SSL certificate. To do so:

```
$ sudo apt-get install letsencrypt
$ sudo mkdir /var/www/glamrous-static
$ sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048
$ letsencrypt certonly --webroot -w /var/www/glamrous-static -d glamrous.me -d www.glamrous.me
```

Go through the LetsEncrypt prompts until you see a success message. At this point, edit the nginx configuration from earlier to add the following:

```
server {
    server_name www.glamrous.me glamrous.me;
    return 301 https://glamrous.me$request_uri;
}

server {
    listen 443 ssl spdy;
    server_name glamrous.me;
    ssl_certificate /etc/letsencrypt/live/glamrous.me/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/glamrous.me/privkey.pem;
    ssl_trusted_certificate /etc/letsencrypt/live/glamrous.me/fullchain.pem;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    ssl_dhparam /etc/ssl/certs/dhparam.pem;
    ssl_ciphers ECDH+AESGCM:DH+AESGCM:ECDH+AES256:DH+AES256:ECDH+AES128:DH+AES:ECDH+3DES:DH+3DES:RSA+AESGCM:RSA+AES:RSA+3DES:!aNULL:!MD5:!DSS;
    ssl_buffer_size 8k;
    ssl_session_timeout 30m;
    ssl_session_cache shared:SSL:30m;
    ssl_stapling on;
    ssl_stapling_verify on;
    add_header Strict-Transport-Security max-age=31536000;
    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_cache_bypass $http_upgrade;
    }

    location ~ /.well-known {
        root /var/www/glamrous-static;
    }

    error_page 500 502 503 504 /error.html;

    location = /error.html {
        root /var/www/glamrous-server/app/static/html;
        internal;
    }
}
```

Note the domain name within the path to the SSL certificates. As always, restart nginx after saving the configuration file.

```
$ sudo service nginx restart
```

#### Permissions

With nginx setup, we can prepare to clone the git repository and set up continuous
deployment. To do so, we need to adjust permissions so multiple users can access the
application’s files.

```
$ cd /var/www
$ sudo usermod -a -G www-data <user>
$ sudo chmod -R 777 "$PWD"
```

`<user>` is your username, as indicated in the SSH prompt. These commands give the
www-datagroup full access to /var/www. You’ll want to add any additional users with the
second command.

#### Clone the codebase

Up next is cloning the codebase using git.

```
$ git clone https://github.com/DrewRomanyk/glamrous.me.git glamrous-server
```

To enable multiple users to access the local repository, we need to do a couple more steps.

```
$ cd glamrous-server
$ git init --bare --shared=group
$ sudo chown -R :www-data "$PWD"
$ sudo chmod -R 777 "$PWD"
```

#### Running

The easiest way to run Glamrous is to use [Docker](https://www.google.com/url?q=https://www.docker.com&sa=D&ust=1490321472074000&usg=AFQjCNHlmRwf4zVFAhylCPyOBsP_MF0ZjA).

```
$ sudo apt-get update
$ sudo apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
$ sudo apt-add-repository 'deb https://apt.dockerproject.org/repo ubuntu-xenial main'
$ sudo apt-get update
$ apt-cache policy docker-engine
$ sudo apt-get install docker-engine
```

With Docker installed, we can build the Glamrous container and get the server running.

```
$ cd /var/www/glamrous-server/dockerfile
$ docker build -t glamrous-db -f Dockerfile.db .
$ docker build -t glamrous-dev -f Dockerfile.dev .
$ docker build -t glamrous-server -f Dockerfile.server .
$ docker pull postgres
```

Once the container is built, start Glamrous using start.sh in the repository root.

```
$ ./postgres.sh detach
$ ./start.sh detach
```

Next, build the frontend assets.

```
$ ./build.sh auto
```

#### Stopping

To kill a Server instance that doesn't die on `CTRL+C`, run

```
$ sudo docker kill $(sudo docker ps | grep "glamrous-server" | cut -d" " -f1)
```

#### Updating

To update the Glamrous instance that’s been created, we want to do more than a simple git
pull. Remember to first add the user updating the instance to the www-data group as
described earlier.

```
$ cd /var/www/glamrous-server
$ git fetch --all
$ git checkout --force origin/master
```

Of course, make sure any Glamrous instances are stopped using the command from earlier.

To start up the updated Glamrous instance, use the commands from the “Running” section to rebuild the Docker container.

#### Continuous Deployment

The above processes to update, stop, and start the Glamrous instance aren’t thatinvolved, but quickly get tedious with room for error. To make deployment a breeze, [Travis CI](https://www.google.com/url?q=https://travis-ci.org&sa=D&ust=1490321472096000&usg=AFQjCNFKjfX5zt_S1q3ENyIoe4tH4c2kpg) can be configured to automatically deploy to the Compute VM upon a successful build on master.

These next steps assume you’ve set up the server as described in the earlier sections.

##### Configuring Travis

Note: It is assumed that the following section is performed on your development machine, NOT the Compute VM set up earlier.

Connect Travis CI to the repository using the normal process. Create the project’s .travis.yml file in the repository root.

The .travis.yml file should look like the following for right now:

```
os:
   - linux

language: python

python:
   - '2.7'

cache:
   directories:
       - $HOME/google-cloud-sdk/

notifications:
   email: false

script:
 - echo "Hello world!"

 after_success:
 - if [ ! -d "$HOME/google-cloud-sdk/bin" ]; then rm -rf                                         $HOME/google-cloud-sdk; curl https://sdk.cloud.google.com | bash; fi
 - source /home/travis/google-cloud-sdk/path.bash.inc
 - tar -xzf credentials.tar.gz
 - gcloud version
 - bash ./scripts/gcloud-auth.sh
 - bash ./scripts/gcloud-deploy.sh
```

Before continuing to edit the .travis.yml file, we need to create the necessary service account for Travis to access our Google Cloud project. To do this:

1.  In your Cloud Platform Console project, open the [Credentials page](https://www.google.com/url?q=https://console.cloud.google.com/project/_/apiui/credential&sa=D&ust=1490321472105000&usg=AFQjCNEA2RYyYMpdTJsowr5eikDr6HFLVg).
2.  Click Create credentials > Service account key.
3.  Under Service account select New service account.
4.  Enter a Service account name such as continuous-integration-test.
5.  Under Role, select Project > Editor.
6.  Under Key type, select JSON.
7.  Click Create and download the JSON file to your computer.
8.  Copy this file to the root of your GitHub repo and rename the file client-secret.json.

With the client secret created, we need to encrypt the file to ensure it isn’t publicly readable. To do this, first [install the Travis command line utility.](https://www.google.com/url?q=https://github.com/travis-ci/travis.rb%23installation&sa=D&ust=1490321472111000&usg=AFQjCNE4ExGM8s_v8GEizmCuJ0aOnC_oVg) With the utility installed, login to Travis:

```
$ sudo travis login
```

Once logged in, navigate to the local repository and put client-secret.json (and any other files with secret keys) into a tarball.

```
$ tar -czf credentials.tar.gz client-secret.json
```

Next, encrypt credentials.tar.gz using the Travis utility:

```
$ sudo travis encrypt-file credentials.tar.gz --add
```

Note: Upon running this command successfully, remove client-secret.json, credentials.tar.gz, and any other sensitive files!

Travis will automatically edit your .travis.ymlfile to include the necessary command to decrypt the tarball during builds in the before_installstage. You can now edit the rest of your .travis.yml file as you see fit for testing.

The configuration file will look similar to this:

```
os:
   - linux

language: python

python:
   - '2.7'

cache:
   directories:
       - $HOME/google-cloud-sdk/

notifications:
   email: false before_install:
   - openssl aes-256-cbc -K $encrypted_8f789aaec97f_key -iv                                         $encrypted_8f789aaec97f_iv -in credentials.tar.gz.enc -out                                 credentials.tar.gz -d script:
   - echo "Hello world!"

 after_success:
   - if [ ! -d "$HOME/google-cloud-sdk/bin" ]; then rm -rf                                         $HOME/google-cloud-sdk; curl https://sdk.cloud.google.com |                         bash; fi
   - source /home/travis/google-cloud-sdk/path.bash.inc
   - tar -xzf credentials.tar.gz
   - gcloud version
   - bash ./scripts/gcloud-auth.sh
   - bash ./scripts/gcloud-deploy.sh
```

This configuration runs any necessary tests, etc. within the scriptstage. If this stage passes successfully, the after_success stage will be invoked. It is within this stage where deployment will take place.

###### Environment Variables

Several environment variables need to be set for Travis to successfully run the configuration above. These can be set in the Travis project’s settings page.

*   `CLOUDSDK_CORE_DISABLE_PROMPTS`
    -   This should be set to a value of 1.
    -   This instructs the Google Cloud SDK to install without prompts, since Travis is non-interactive.

*   `GCLOUD_PROJECT`
    -   This should be set to the name of your Google Cloud project.
    -   For example: glamrous-12344

*   `GCLOUD_ZONE`
    -   This should be set to the zone of your Compute VM.
    -   For example: us-central1-b

*   `GCLOUD_INSTANCE`
    -   This should be set to the name of your Compute VM instance.
    -   For example: instance-1

###### gcloud-auth

gcloud-auth.sh is a script which authenticates Travis with Google Cloud Platform using the JSON file generated and encrypted earlier. It contains the following:

```
#!/bin/bash
gcloud auth activate-service-account --key-file client-secret.json
gcloud config set project $GCLOUD_PROJECT
ssh-keygen -q -N "" -f ~/.ssh/google_compute_engine
```

###### gcloud-deploy

gcloud-deploy.sh is a script which performs the deployment to the Compute VM. It contains the following:

```
#!/bin/bash
### If on master and not a pull request, deploy to production
if [ "$TRAVIS_BRANCH" = "master" ] && [ "$TRAVIS_PULL_REQUEST" = "false" ]; then
   gcloud compute ssh $GCLOUD_INSTANCE --zone $GCLOUD_ZONE --command "/var/www/deploy.sh"
fi

gcloud compute instances remove-metadata $GCLOUD_INSTANCE --zone $GCLOUD_ZONE --keys ssh-keys
```

###### Push to Remote

Now that Travis is configured, push the changes to the remote repository.

##### Configuring Server

Travis is configured, but the server needs some finishing touches before deployments are successful.

###### Permissions Revisited

Recall the permissions changes made when setting up Glamrous. We’ll want to add the travis user to the www-data group.

```
$ sudo usermod -a -G www-data <user>
```

###### Deployment Script

Notice that Travis is using SSH to kick off a deployment script:

```
$ gcloud compute ssh $GCLOUD_INSTANCE --zone $GCLOUD_ZONE --command                         "/var/www/deploy.sh"
```

To create this deploy script:

```
$ cd /var/www
$ touch deploy.sh
$ chmod +x deploy.sh
```

Edit deploy.sh with the following:

```
#!/bin/bash
echo "Connected to server, deploying to prod."
echo "Killing existing glamrous-server instance..."
sudo docker kill $(sudo docker ps | grep "glamrous-server" | cut -d" " -f1)
echo "Cleaning up exited containers..."
sudo docker rm $(sudo docker ps -q -f status=exited)
echo "Pulling latest from master..."
cd /var/www/glamrous-server > /dev/null
git fetch --all
git checkout --force origin/master
echo "Creating configuration file..."
cp /var/www/config.json config.json > /dev/null
echo "Building dockerfiles..."
cd dockerfile > /dev/null
$ docker build -t glamrous-db -f Dockerfile.db .
sudo docker build -t glamrous-dev -f Dockerfile.dev .
sudo docker build -t glamrous-server -f Dockerfile.server .
cd ..
echo "Grabbing latest npm dependencies..."
sudo npm update
echo "Building frontend..."
sudo ./build.sh auto
echo "Ensuring postgres container is running..."
if [ ! "$(sudo docker ps -q -f name=glamrous-postgres)" ]; then
    if [ "$(sudo docker ps -aq -f status=exited -f name=glamrous-postgres)" ]; then
        echo "Cleaning up exited containers..."
        docker rm glamrous-postgres
    fi
    echo "Starting postgres container..."
    sudo ./postgres.sh detach
fi
echo "Starting glamrous-server..."
sudo ./start.sh detach
echo "Finished deploying to prod."
```

The script will stop any running containers, pull from git, rebuild the container, build the frontend, start the database as needed, and start a detached instance of Glamrous.

#### Start on Boot

To start Glamrous on boot, simply add the following using sudo crontab -e.

```
@reboot /var/www/deploy.sh
```
