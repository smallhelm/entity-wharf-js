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
	});
});
