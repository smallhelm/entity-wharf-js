# What it does

Stores your data in an elegant way that will give you great flexibility and leverage. This library is designed to be used as a state management solution for applications that need to be performant for quickly mutating state over many different types of entities with similar characteristics. Applications such as games and simulations. If performance isn't this crucial then check out [DataScript](https://github.com/tonsky/datascript) which provides immutability, versioning, undo/redo, and the powerful datalog query engine.

All data stored in Wharf is organized uniformly as
 * *Entity* - just an id (i.e. 1)
 * *Attribute* - an attribute of the entity (i.e. _name_ or _age_)
 * *Value* - the value of the attribute (i.e. _"bob"_ or _50_)

For example let's describe some shapes.

entity 1 is a red square
entity 2 is a blue triangle
entity 3 is a red circle

|Entity|Attribute|Value|
|-|-|-|
|1|color|red|
|1|width|20|
|1|height|20|
|1|n\_edges|4|
|2|color|blue|
|2|base|10|
|2|height|40|
|2|n\_edges|3|
|3|color|red|
|3|radius|20|
|3|n\_edges|0|


# How to use it

```js
var db = Wharf();
//TODO
```

There are 3 ways to include this library

## With browserify

```js
var Wharf = require('entity-wharf');
...
```

## With a script tag

Download [this](https://github.com/smallhelm/entity-wharf/blob/master/entity-wharf.min.js) script then include it in your html
```html
<script src="entity-wharf.min.js"></script>
```

Then use it
```js
var Wharf = ENTITY_WHARF;
...
```

## With RequireJS

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

