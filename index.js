(function(definition){
	if (typeof exports === "object") {
		module.exports = definition();// CommonJS
	} else if (typeof define === "function" && define.amd) {
		define(definition);// RequireJS
	} else {
		ENTITY_WHARF = definition();//<script>
	}
}(function(){

	var escaper = "$:?:$";

	var toValIndex = function(v){
		if(typeof v === 'object' && v !== null){
			if(typeof v.length == 'number' && Object.prototype.toString.call(v) == "[object Array]"){
				return escaper + 'array';
			}
			return escaper + 'object';
		}else if(typeof v === 'function'){
			return escaper + 'function';
		}
		return v;
	};

	var toAttrValIndex = function(a, v){
		return a + escaper + toValIndex(v);
	};

	var isMap = function(o){
		return !!o && typeof o === 'object' && o.constructor === Object;
	};
	var keys = Object.keys;
	var has = function(o, attr){
		return o.hasOwnProperty(attr);
	};

	var appendToIndex = function(index, attr, id){
		if(!has(index, attr)){
			index[attr] = {};
		}
		index[attr][id] = true;
	};

	var removeFromIndex = function(index, attr, id){
		if(has(index, attr)){
			delete index[attr][id];
		}
	};

	return function(){
		var nextID = (function(){
			var last = 0;
			return function(){
				last++;
				return last + "";//id's are strings
			};
		}());

		var e_index = {};
		var a_index = {};
		var v_index = {};
		var av_index = {};

		var has_e = function(id){
			return has(e_index, id);
		};

		var set = function(id, data){ 
			if(!has_e(id) || !isMap(data)){
				return false;
			}
			keys(data).forEach(function(attr){
				var val = data[attr]
				e_index[id][attr] = val;

				appendToIndex(a_index, attr, id);
				appendToIndex(v_index, toValIndex(val), id);
				appendToIndex(av_index, toAttrValIndex(attr, val), id);
			});
			return true;
		};

		return {
			get: function(id){
				return has_e(id) ? e_index[id] : null;
			},
			add: function(data){
				var id = nextID();
				e_index[id] = {};
				if(set(id, data)){
					return id;
				}
				delete e_index[id];
				return false;
			},
			set: set,
			remove: function(id){
				if(!has_e(id)){
					return false;
				}
				keys(e_index[id]).forEach(function(attr){
					removeFromIndex(a_index, attr, id);
					removeFromIndex(v_index, toValIndex(e_index[id][attr]), id);
					removeFromIndex(av_index, toAttrValIndex(attr, e_index[id][attr]), id);
				});
				delete e_index[id];
				return true;
			},

			q: function(query){
				if(!isMap(query)){
					return keys(e_index);
				}
				var e = query.e || [];
				var a = query.a || [];
				var v = query.v || [];
				var av = query.av || [];

				var constraints = [e];
				a.forEach(function(attr){
					constraints.push(keys(a_index[attr] || {}));
				});
				v.forEach(function(val){
					constraints.push(keys(v_index[toValIndex(val)] || {}));
				});
				av.forEach(function(av){
					var a = av[0];
					var v = av[1];
					constraints.push(keys(av_index[toAttrValIndex(a, v)] || {}));
				});

				var n_id_sets = 0;
				var result = {};
				constraints.forEach(function(ids){
					if(ids.length === 0){
						return;
					}
					n_id_sets++;
					ids.forEach(function(id){
						if(!has(result,id)){
							result[id] = 0;
						}
						result[id]++;
					});
				});
				return keys(result).filter(function(id){
					return result[id] === n_id_sets;
				});
			}
		};
	};
}));
