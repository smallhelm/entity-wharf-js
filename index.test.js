var Warf = require("./index");

describe("entity-warf", function(){
	it("should do basic CRUD", function(){
		var db = Warf();

		var id = db.add({name: "bob", age: 50});
		expect(typeof id).toEqual("string");
		expect(db.q()).toEqual([id]);
		expect(db.get(id)).toEqual({name: "bob", age: 50});

		expect(db.set(id, {name: "bill", height: 6})).toBe(true);
		expect(db.set(id, "jim")).toBe(false);
		expect(db.set(id, ["jim"])).toBe(false);
		expect(db.get(id)).toEqual({name: "bill", age: 50, height: 6});

		expect(db.remove(id)).toBe(true);
		expect(db.get(id)).toBe(null);
		expect(db.q()).toEqual([]);
		expect(db.remove(id)).toBe(false);
		expect(db.set(id, {name: "jim"})).toBe(false);
	});
	it("should not allow rubish attr, value maps", function(){
		var db = Warf();

		expect(db.add()).toBe(false);
		expect(db.add(function(){})).toBe(false);
		expect(db.add(["name", "bob"])).toBe(false);
		expect(db.add("asdf")).toBe(false);
		expect(db.add(true)).toBe(false);
		expect(db.q()).toEqual([]);

		var id = db.add({name: "bob"});
		expect(db.q()).toEqual([id]);
		expect(db.set(id, "bill")).toBe(false);
		expect(db.set(id, [1, 2, 3])).toBe(false);
		expect(db.set("123", {name: "bill"})).toBe(false);
		expect(db.get("123")).toBe(null);
		expect(db.get(id)).toEqual({name: "bob"});
		expect(db.q()).toEqual([id]);
	});
	it("should support queries", function(){
		var db = Warf();
		var bob = db.add({name: "bob"});
		var sue = db.add({name: "sue"});
		var jim = db.add({name: "jim", age: 40});
		var joe = db.add({name: "joe", boss: "bob"});
		var no_name = db.add({boss: "bob"});

		expect(db.q()).toEqual([bob, sue, jim, joe, no_name]);
		expect(db.q({a: ["name"]})).toEqual([bob, sue, jim, joe]);
		expect(db.q({v: ["bob"]})).toEqual([bob, joe, no_name]);
		expect(db.q({v: ["bob"], a: ["name"]})).toEqual([bob, joe]);
		expect(db.q({av: [["name", "bob"]]})).toEqual([bob]);
		expect(db.q({av: [["boss", "bob"]]})).toEqual([joe, no_name]);
		expect(db.q({a: ["name"], av: [["boss", "bob"]]})).toEqual([joe]);
		expect(db.q({e: [bob, jim, no_name], a: ["name"]})).toEqual([bob, jim]);
	});
	it("should just index types for functions, objects and arrays", function(){
		var db = Warf();
		var e1 = db.add({fn: function(){}});
		var e2 = db.add({obj: {a: 1, b: 2}});
		var e3 = db.add({arr: ["something"]});
		var e4 = db.add({nnn: null});
		var e5 = db.add({nnn: undefined});
		var e6 = db.add({nnn: NaN});

		expect(db.q({v: [parseInt]})).toEqual([e1]);
		expect(db.q({av: [["fn", Math.min]]})).toEqual([e1]);
		expect(db.q({v: [{some: "other"}]})).toEqual([e2]);
		expect(db.q({av: [["obj", db]]})).toEqual([e2]);
		expect(db.q({v: [[1, 2, 3]]})).toEqual([e3]);
		expect(db.q({av: [["arr", []]]})).toEqual([e3]);
		expect(db.q({av: [["nnn", null]]})).toEqual([e4]);
		expect(db.q({av: [["nnn", undefined]]})).toEqual([e5]);
		expect(db.q({av: [["nnn", NaN]]})).toEqual([e6]);
	});
});
