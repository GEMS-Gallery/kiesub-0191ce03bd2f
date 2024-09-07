import Bool "mo:base/Bool";
import Hash "mo:base/Hash";

import Array "mo:base/Array";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Float "mo:base/Float";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";

actor {
  type Item = {
    id: Nat;
    name: Text;
    description: ?Text;
    price: Float;
    stock: Nat;
    category: Category;
  };

  type Category = {
    #Batteries;
    #TestEquipment;
    #Chemicals;
  };

  stable var nextItemId: Nat = 0;
  let items = HashMap.HashMap<Nat, Item>(10, Nat.equal, Hash.hash);

  public func addItem(name: Text, description: ?Text, price: Float, stock: Nat, category: Category): async Result.Result<Nat, Text> {
    Debug.print("Attempting to add item: " # debug_show({ name; description; price; stock; category }));
    if (Text.size(name) == 0) {
      return #err("Name cannot be empty");
    };
    if (price < 0) {
      return #err("Price cannot be negative");
    };
    let id = nextItemId;
    nextItemId += 1;
    let newItem: Item = {
      id;
      name;
      description;
      price;
      stock;
      category;
    };
    items.put(id, newItem);
    Debug.print("Item added successfully: " # debug_show(newItem));
    #ok(id)
  };

  public query func getItems(): async [Item] {
    Iter.toArray(items.vals())
  };

  public func updateItemStock(itemId: Nat, newStock: Nat): async Result.Result<(), Text> {
    switch (items.get(itemId)) {
      case (null) { #err("Item not found") };
      case (?item) {
        let updatedItem = {
          id = item.id;
          name = item.name;
          description = item.description;
          price = item.price;
          stock = newStock;
          category = item.category;
        };
        items.put(itemId, updatedItem);
        #ok()
      };
    }
  };

  public func deleteItem(itemId: Nat): async Result.Result<(), Text> {
    switch (items.remove(itemId)) {
      case (null) { #err("Item not found") };
      case (?_) { #ok() };
    }
  };

  public query func getItemsByCategory(category: Category): async [Item] {
    let filteredItems = Iter.toArray(Iter.filter(items.vals(), func (item: Item): Bool { item.category == category }));
    filteredItems
  };
}
