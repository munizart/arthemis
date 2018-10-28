# Arthemis: IoC made simple.
Simple API decoupled dependency injection in which you can do IoC via containers, for more information, read the [docs](https://github.com/munizart/arthemis/tree/master/docs).


## Getting Started
These instructions will get you through installing and using Arthemis on your project.

### Installing
Simply install using npm or yarn
```sh
npm install --save arthemis
## OR ##
yarn add arthemis
```
## [docs](https://github.com/munizart/arthemis/tree/master/docs)

### Using
Arthemis works as a dependency repository with automatic dependency injection, this will guide you through defining and getting stuff from the repository.
First, we need to import Arthemis and create a new repository.

```javascript
  const arthemis = require('arthemis')
  const myRepo = arthemis()
```

Note that Arthemis exports you a function, that function gives you a new repository on every call.

```javascript
  const arthemis = require('arthemis')
  const aRepo = arthemis()
  const anotherRepo = arthemis()
```

Every repository can hold it's own definers, which can vary in type:
- **Literals**, that will always represent the same value.
- **Classes**, classes definitions that can take resolved dependencies into it's constructor to return a new instance.
- **Singletons**, classes definitions that can take resolved dependencies to return a unique instance.
- **Factories**, Functions that take resolved dependencies to return a new value based on.

#### Defining Literals

```javascript
  const arthemis = require('arthemis')
  const myRepo = arthemis()

  const me = {
    firstName: 'Artur',
    lastName: 'Muniz'
  }

  myRepo.literal('Artur', me)

  const anotherMe = myRepo.get('Artur')

  console.log(anotherMe === me) // true
```

#### Defining Classes
```javascript
  const arthemis = require('arthemis')
  const myRepo = arthemis()

  class Me {
    constructor () {
      this.firstName = 'Artur'
      this.lastName = 'Muniz'
    }
  }

  myRepo.class('Artur', Me)

  const me = myRepo.get('me')
  const anotherMe = myRepo.get('me')

  console.log(anotherMe === me) // false
```
But the true power of Arthemis is inject dependencies for you.
##### Defining Classes with dependencies
```javascript
  const arthemis = require('arthemis')
  const myRepo = arthemis()

  class Logger {
    log (level, ...args) {
      if (level in console) {
        return console[level](...args)
      }
    }
  }

  class System {
    constructor (logger) {
      this.logger = logger
    }
    doStuff () {
      // Use this.logger here
      this.logger.log('info', 'Awesome! logger was injected <3')
    }
  }

  // Registred name does not need to be the class name
  myRepo.class('Log', Logger)

  // Note that 'Log' appears here, telling Arthemis that the class depends on some 'Log'
  myRepo.class('App', System, 'Log')

  const myApp = myRepo.get('App')
  myApp.doStuff() // Awesome! logger was injected <3
```
### Defining Singletons
```javascript
  const arthemis = require('arthemis')
  const myRepo = arthemis()

  // A simple in-memory database...
  myRepo.singleton('DataBase', class DataBase {
    constructor () {
      this.connect()
    }
    connect () {
      this.collections = {}
      return true
    }
    save (collectionName, value) {
      const collection = this.collections[collectionName] || []
      this.collections[collectionName] = collection.concat([value])
    }
    get (collectionName, filter) {
      const collection = this.collections[collectionName] || []
      if (filter) {
        return collection.filter(filter)
      } else {
        return collection
      }
    }
  })

  myRepo.class('')
```

## Roadmap

We organize this project roadmap using (github issues)[https://github.com/munizart/arthemis/labels/roadmap].

## Questions?
If you have any questions about using Arthemis on your project, please open a (new issue)[https://github.com/munizart/arthemis/issues/new].

## Filing a bug

If you found a bug, please open a (new issue)[https://github.com/munizart/arthemis/issues/new].

## Contributing

This project is open for contributions.
To suggest a new feature, please open a (new issue)[https://github.com/munizart/arthemis/issues/new].
To fix a filed bug or implementing a feature on (roadmap)[https://github.com/munizart/arthemis/labels/roadmap], please fork this project, create a new branch coitaining your code and send a pull request. If you need any guidence, you can reach us out by creating a new issue.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Artur Muniz** - [MunizArt](https://github.com/Munizart)

See also the list of [contributors](https://github.com/munizart/arthemis/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
