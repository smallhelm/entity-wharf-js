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
		expect(db.remove(id)).toBe(false);
		expect(db.set(id, {name: "jim"})).toBe(false);
	});
});
