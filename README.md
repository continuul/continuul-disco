![Continuul Logo][]

> An Express-based Cluster Discovery Service.

# disco-express

Last update: 11/11/2017

[![npm version][npm-badge]][npm-url]
[![Build Status][travis-badge]][travis-url]
[![Dependency Status][david-badge]][david-url]
[![Coveralls][BadgeCoveralls]][Coveralls]

[Continuul][] provides a cloud native **distributed** container database
management solution for open-source databases. The solution is build upon
the foundational work Docker and Kubernetes.

To form a Continuul cluster, the joining node must be supplied with the network
address of some other node in the cluster.

To make all this easier, Continuul also supports *discovery* mode. In this
mode each node registers its network address with an external service, and
learns the *join* addresses of other nodes from the same service.

If you need **your own Discovery Service** with Node.js, here it is!

# How it works

*disco-express* is based on the [Express][] web framework. For more information
on the Continuul clusters, see the [Cluster Guidelines][] and
[Cluster Discovery Service][] docs.

## disco-url parameter

To use the *disco-express* Service when starting a node, the  `disco-url`
parameter must be set. The *start node* command pattern becomes:

```sh
application -http-addr <node-ip>:<node-http-port> -raft-addr <node-ip>:<node-raft-port> -disco-id <cluster-disco-id> -disco-url <your-service-URL> <node-data-directory>
```

Example:

```sh
application -http-addr localhost:4001 -raft-addr localhost:4002 -disco-id b3da7185-725f-461c-b7a4-13f185bd5007 -disco-url http://myhost:8081 ~/node.1
```

## File storage

For simplicity, this *disco-express* Service uses a file-based storage for
the cluster data. Each cluster is stored in a file named `<disco-id>.json`.
The contents of this file are the JSON string of the cluster data. For
performance, these files are uploaded in a memory map on the fly.

## Configuration

The configuration is written in the `./config/config.js` file.

### Express

- **protocol**: `http` or `https`. For SSL configuration, see below.
- **port**: the service port number.

### SSL
For more information on Express and SSL, please follow [instructions for using SSL with Express 4][].

- **key**: your private key. It is read from a file, default is `./config/privatekey.pem`.
- **cert**: your certificate. It is read from a file, default is `./config/certificate.pem`.
- **passphrase**: if necessary, the passphrase string.

### File storage

- **path**: the data files path on disk.
- **encoding**: the encoding used. `utf8` is a good example.


# Run the Service

To run the *disco-express* Service, simply use node js:

```sh
node app.js
```

Or to run the Docker:

```sh
docker run -ti continuul/disco-express:latest
```


# Building

To build the *disco-express* Service, simply use npm:

```sh
npm install
```

To build the *disco-express* Docker, simply use docker:

```sh
docker build -t continuul/disco-express:latest
```


# Test

To test the *disco-express* Service, simply use npm:

```sh
npm test
```


## License
Copyright (c) 2017 The Continuul Authors. Licensed under [Apache License 2.0][]

[Continuul Logo]: http://continuul.io/img/brand.png
[Continuul]: http://www.continuul.io
[Express]: http://expressjs.com/
[Apache License 2.0]: ./LICENSE

[instructions for using SSL with Express 4]: https://aghassi.github.io/ssl-using-express-4/

[Cluster Guidelines]: https://github.com/continuul/go-cluster/blob/master/doc/CLUSTER_MGMT.md
[Cluster Discovery Service]: https://github.com/continuul/go-cluster/blob/master/doc/DISCOVERY.md

[npm-badge]: https://badge.fury.io/js/continuul-disco-express.svg
[npm-url]: https://npmjs.com/package/continuul-disco-express
[travis-badge]: https://travis-ci.org/jack-y/continuul-disco-express.svg
[travis-url]: https://travis-ci.org/jack-y/continuul-disco-express
[david-badge]: https://david-dm.org/jack-y/continuul-disco-express.svg
[david-url]: https://david-dm.org/jack-y/continuul-disco-express
[Coveralls]: https://coveralls.io/github/jack-y/continuul-disco-express?branch=master
[BadgeCoveralls]: https://coveralls.io/repos/github/jack-y/continuul-disco-express/badge.svg?branch=master
