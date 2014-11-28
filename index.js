(function(definition){
	if (typeof exports === "object") {
		module.exports = definition();// CommonJS
	} else if (typeof define === "function" && define.amd) {
		define(definition);// RequireJS
	} else {
		ENTITY_WHARF = definition();//<script>
	}
}(function(){
	return function(){
		var nextID = (function(){
			var last = 0;
			return function(){
				return ++last;
			};
		}());

		var entities = {};

		var attribute_index = {};
		var value_index = {};


		var set= function(id, data){ 
			//TODO check if it's a good id first
			//TODO extend entity[id] with the data

			//TODO set indexes
		};

		return {
			get: function(id){
				return entities[id];
			},
				add: function(data){
					var id = nextID();
					entities[id] = {};
					set(id, data);
					return id;
				},
				set: set,
				remove: function(id){
					//TODO check if it's a good id first
					delete entities[id];
					//TODO remove indexes
				},

				q: function(){
					//TODO queries
				}
		};
	};
}));
