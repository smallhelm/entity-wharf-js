# What it does

Stores your data in an elegant way that will give you great flexibility and leverage. This library is designed to be used as a state management solution for applications that need to be performant for quickly mutating state over many different types of entities with similar characteristics. Applications such as games and simulations. If performance isn't this crucial then check out [DataScript](https://github.com/tonsky/datascript) which provides immutability, versioning, undo/redo, and the powerful datalog query engine.

All data stored in Wharf is organized uniformly as
 * **Entity** - just an id (i.e. _1_)
 * **Attribute** - an attribute of the entity (i.e. _name_ or _age_)
 * **Value** - the value of the attribute (i.e. _"bob"_ or _50_)

For example let's describe some shapes.
 * entity 1 is a blue square
 * entity 2 is a red triangle
 * entity 3 is a red circle

| Entity | Attribute | Value |
| ------ | --------- | ----- |
|      1 | color | blue |
|      1 | width | 20 |
|      1 | height | 20 |
|      1 | n\_edges | 4 |
|      2 | color | red |
|      2 | base | 10 |
|      2 | height | 40 |
|      2 | n\_edges | 3 |
|      3 | color | red |
|      3 | radius | 20 |
|      3 | n\_edges | 0 |

Although there are 3 distinct types we can perform generic queries that cross types.

All entities that have a `height` attribute returns `[ 1, 2 ]`

| Entity | Attribute | Value |
| ------ | --------- | ----- |
|      1 | **height** | 20 |
|      2 | **height** | 40 |

All entities that have a `height` and a `width` attribute returns `[ 1 ]`

| Entity | Attribute | Value |
| ------ | --------- | ----- |
|      1 | **width** | 20 |
|      1 | **height** | 20 |

All entities with a value `20` returns `[ 1, 3 ]`

| Entity | Attribute | Value |
| ------ | --------- | ----- |
|      1 | width | **20** |
|      1 | height | **20** |
|      3 | radius | **20** |

All entities where `color == red` returns `[ 2, 3 ]`

| Entity | Attribute | Value |
| ------ | --------- | ----- |
|      2 | **color** | **red** |
|      3 | **color** | **red** |


# How to use it

```js
var db = Wharf();//make a new "db" to work with

//create some entities
var square_id   = db.add({color: "blue", width: 20, height: 20, n\_edges: 4});
var triangle_id = db.add({color: "red", base: 10, height: 40, n\_edges: 3});
var circle_id   = db.add({color: "blue", radius: 20});

//db.set will add/overwrite attributes and values on an entitiy
db.set(circle_id, {color: "red", n\_edges: 0});

//db.get returns the entities data
db.get(circle_id);// -> {color: "red", radius: 20, n\_edges: 0}

//At this point the db has 3 entities the same as in the example

//All entities that have a `height` attribute
db.q({a: ["height"]});// -> [ square_id, triangle_id ]

//All entities that have a `height` and a `width` attribute
db.q({a: ["height", "width"]});// -> [ square_id ]

//All entities with a value `20`
db.q({v: [20]});// -> [ square_id, circle_id ]

//All entities where `color == red`
db.q({av: [["color", "red"]]});// -> [ triangle_id, circle_id ]

//entities are easy to remove
db.remove(square_id);// -> true

//if an ID doesn't exist it returns false
db.remove(square_id);// -> false
```

# Installing

There are 3 ways to include this library

### With browserify

```sh
$ npm install --save entity-wharf
```

Then use it
```js
var Wharf = require('entity-wharf');
...
```

### With a script tag

Download [this](https://github.com/smallhelm/entity-wharf/blob/master/entity-wharf.min.js) script then include it in your html
```html
<script src="entity-wharf.min.js"></script>
```

Then use it
```js
var Wharf = ENTITY_WHARF;
...
```

### With RequireJS

```js
require(['entity-wharf'], function(Wharf) {
	...
});
```

# License
The MIT License (MIT)

Copyright (c) 2014 Small Helm LLC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

