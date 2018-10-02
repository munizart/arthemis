# Arthemis

Simple API decoupled dependency injection in which you can do IoC via containers, for more information, read the [docs](https://github.com/munizart/arthemis/tree/master/docs)

## Getting Started

If you want to use it in your project, just install it as a dependency, then register a constructor/factory/pseudo-class and it's dependencies, so that everytime you get it, the container will inject it's dependencies

### Using it

Just go to your project, and install it by running
```bash
npm install --save arthemis
```
or
```bash
yarn add arthemis
```

and then register it (probably at you application entry point) by doing something like this:

```javascript
const manager = arthemis();

manager.literal('app.app', app);
manager.literal('app.router', router);

manager.singleton('external.service', ServiceName, 'service.config');

manager.factory('fn.name', FunctionExecutor, 'app.function')

```

### Running the tests

[See it here](https://github.com/munizart/arthemis/issues/3#issue-365987228)

### Contributing

Fork the repository on github, then clone it. Submit a PR and it will be reviewed as soon as possible

## Authors

* **Munizart** - *Initial work* - [profile](https://github.com/munizart)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
