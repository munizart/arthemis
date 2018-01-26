<a name="Container"></a>

## Container
**Kind**: global class  

* [Container](#Container)
    * _instance_
        * [.class(name, definition, ...deps)](#Container+class)
        * [.singleton(name, definition, ...deps)](#Container+singleton)
        * [.factory(name, definition, ...deps)](#Container+factory)
        * [.literal(name, definition)](#Container+literal)
    * _inner_
        * [~depDescriptor(name, Definition, deps, type)](#Container..depDescriptor) ⇒ [<code>Descriptor</code>](#Container..Descriptor)
        * [~Descriptor](#Container..Descriptor) : <code>Object</code>

<a name="Container+class"></a>

### container.class(name, definition, ...deps)
Register a class that could have more than one instance

**Kind**: instance method of [<code>Container</code>](#Container)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Name for the dependency |
| definition | <code>function</code> | Class constructor |
| ...deps | <code>String</code> | dependencies to resolve into constructor call |

<a name="Container+singleton"></a>

### container.singleton(name, definition, ...deps)
Register a class that should have at most one instance

**Kind**: instance method of [<code>Container</code>](#Container)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Name for the dependency |
| definition | <code>function</code> | Class constructor |
| ...deps | <code>String</code> | dependencies to resolve into constructor call |

<a name="Container+factory"></a>

### container.factory(name, definition, ...deps)
Register a factory

**Kind**: instance method of [<code>Container</code>](#Container)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Name for the dependency |
| definition | <code>function</code> | Factory function |
| ...deps | <code>String</code> | dependencies to resolve into factory call |

<a name="Container+literal"></a>

### container.literal(name, definition)
Register a literal value into container

**Kind**: instance method of [<code>Container</code>](#Container)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | Name for the dependency |
| definition | <code>\*</code> | The item value |

<a name="Container..depDescriptor"></a>

### Container~depDescriptor(name, Definition, deps, type) ⇒ [<code>Descriptor</code>](#Container..Descriptor)
Descriptor for dependencies

**Kind**: inner method of [<code>Container</code>](#Container)  
**Returns**: [<code>Descriptor</code>](#Container..Descriptor) - A descriptor representing a dependency  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | dependency's name |
| Definition | <code>\*</code> | dependency's contructor or factory or literal |
| deps | <code>Array.&lt;String&gt;</code> | dependencies to resolve into constructor or factory call |
| type | <code>Symbol</code> | Symbol for the type |

<a name="Container..Descriptor"></a>

### Container~Descriptor : <code>Object</code>
A descriptor representing a dependency

**Kind**: inner typedef of [<code>Container</code>](#Container)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | dependency's name |
| definition | <code>\*</code> | dependency's contructor or factory or literal |
| deps | <code>Array.&lt;String&gt;</code> | dependencies to resolve into constructor or factory call |
| type | <code>Symbol</code> | Symbol for the type |

