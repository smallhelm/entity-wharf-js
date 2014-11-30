# What it does

Store data as entity attribute values in memory. Fast queries and manipulation of state.

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

