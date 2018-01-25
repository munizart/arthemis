const T_CLASS = Symbol('class');
const T_SINGLETON = Symbol('singleton');
const T_LITERAL = Symbol('literal');
const T_FACTORY = Symbol('factory');

/**
 * depDescriptor - Descriptor for dependencies
 *
 * @param  {String} name          dependency's name
 * @param  {*} definition         dependency's contructor or factory or literal
 * @param  {String[]} deps        dependencies to resolve into constructor or factory call
 * @param  {Symbol} type          Symbol for the type
 * @return {Container~Descriptor} A descriptor representing a dependency
 */
function depDescriptor (name, definition, deps, type) {
    return {
        name,
        definition,
        deps,
        type
    };
}

function getSingletonInstance(descriptor, dependencies) {
    if (!descriptor.instance) {
        descriptor.instance = new descriptor.definition(...dependencies);
    }
    return descriptor.instance;
}

function containerFactory () {
    const storage = new Map();

    return {
        /**
         * class - Register a class that could have more than one instance
         *
         * @param  {String}    name         Name for the dependency
         * @param  {Function}  definition   Class constructor
         * @param  {...String} deps         dependencies to resolve into constructor call
         * @return {void}
         */
        class (name, definition, ...deps) {
            storage.set(name, depDescriptor(name, definition, deps, T_CLASS));
        },
        /**
         * singleton - Register a class that should have at most one instance
         *
         * @param  {String}    name         Name for the dependency
         * @param  {Function}  definition   Class constructor
         * @param  {...String} deps         dependencies to resolve into constructor call
         * @return {void}
         */
        singleton (name, definition, ...deps) {
            storage.set(name, depDescriptor(name, definition, deps, T_SINGLETON));
        },
        /**
         * factory - Register a factory
         *
         * @param  {String}    name         Name for the dependency
         * @param  {Function}  definition   Factory function
         * @param  {...String} deps         dependencies to resolve into factory call
         * @return {void}
         */
        factory (name, definition, ...deps) {
            storage.set(name, depDescriptor(name, definition, deps, T_FACTORY));
        },
        /**
         * literal - Register a literal value into container
         *
         * @param  {String}    name        Name for the dependency
         * @param  {*}         definition  The item value
         * @return {void}
         */
        literal (name, definition) {
            storage.set(name, depDescriptor(name, definition, [], T_LITERAL));
        },
        get (name) {
            const descriptor = storage.get(name);
            if (descriptor) {
                if (descriptor.type !== T_LITERAL) {
                    const resolvedDeps = descriptor.deps.map(this.get.bind(this));
                    switch (descriptor.type) {
                        case T_FACTORY:
                            return descriptor.definition(...resolvedDeps);
                        case T_SINGLETON:
                            return getSingletonInstance(descriptor, resolvedDeps);
                        case T_CLASS:
                            return new descriptor.definition(...resolvedDeps);
                    }
                } else {
                    return descriptor.definition;
                }
            }
        },
        resolve (fn, ...dependencies) {
            resolvedDeps = dependencies.map(this.get.bind(this));
            fn(...resolvedDeps);
        }
    };
}


/**
 * @exports
 */
module.exports = containerFactory;
