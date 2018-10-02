const T_CLASS = Symbol('class')
const T_SINGLETON = Symbol('singleton')
const T_LITERAL = Symbol('literal')
const T_FACTORY = Symbol('factory')

/**
 * Descriptor for dependencies
 *
 * @memberof Container~
 *
 * @param  { String } name          Dependency's name
 * @param  { * } Definition         Dependency's contructor or factory or literal
 * @param  { String[] } deps        Dependencies to resolve into constructor or factory call
 * @param  { Symbol } type          Symbol for the type
 * @return { Container~Descriptor } A descriptor representing a dependency
 */
function depDescriptor (name, Definition, deps, type) {
  return {
    name,
    Definition,
    deps,
    type
  }
}

function getSingletonInstance (descriptor, dependencies) {
  if (!descriptor.instance) {
    descriptor.instance = new descriptor.Definition(...dependencies)
  }
  return descriptor.instance
}

/**
 * @constructs Container
 */
function containerFactory () {
  const storage = new Map()

  return {
    /**
         * Register a class that could have more than one instance
         * @memberof Container#
         * @param  { String }    name         Name for the dependency
         * @param  { Function }  definition   Class constructor
         * @param  { ...String } deps         Dependencies to resolve into constructor call
         */
    class (name, definition, ...deps) {
      storage.set(name, depDescriptor(name, definition, deps, T_CLASS))
    },
    /**
         * Register a class that should have at most one instance
         *
         * @memberof Container#
         * @param  { String }    name         Name for the dependency
         * @param  { Function }  definition   Class constructor
         * @param  { ...String } deps         Dependencies to resolve into constructor call
         */
    singleton (name, definition, ...deps) {
      storage.set(name, depDescriptor(name, definition, deps, T_SINGLETON))
    },
    /**
         * Register a factory
         *
         * @memberof Container#
         * @param  { String}     name         Name for the dependency
         * @param  { Function }  definition   Factory function
         * @param  { ...String } deps         Dependencies to resolve into factory call
         */
    factory (name, definition, ...deps) {
      storage.set(name, depDescriptor(name, definition, deps, T_FACTORY))
    },
    /**
         * Register a literal value into container
         *
         * @memberof Container#
         * @param  { String }    name        Name for the dependency
         * @param  { * }         definition  The item value
         */
    literal (name, definition) {
      storage.set(name, depDescriptor(name, definition, [], T_LITERAL))
    },

    /**
         * Get a resolved dependency
         *
         * @memberof Container#
         * @param  { String } name Dependency name
         * @return { Object }
         */
    get (name) {
      const descriptor = storage.get(name)
      if (descriptor) {
        if (descriptor.type !== T_LITERAL) {
          const resolvedDeps = descriptor.deps.map(this.get.bind(this))
          switch (descriptor.type) {
            case T_FACTORY:
              return descriptor.Definition(...resolvedDeps)
            case T_SINGLETON:
              return getSingletonInstance(descriptor, resolvedDeps)
            case T_CLASS:
              return new descriptor.Definition(...resolvedDeps)
          }
        } else {
          return descriptor.Definition
        }
      }
    },

    /**
         * Call the given function within the requested dependencies resolved
         *
         * @memberof Container#
         * @param  { Function }    fn           Function to call within deps
         * @param  { ...String[] } dependencies List of dependencies to resolve
         */
    resolve (fn, ...dependencies) {
      const resolvedDeps = dependencies.map(this.get.bind(this))
      fn(...resolvedDeps)
    }
  }
}

module.exports = containerFactory
