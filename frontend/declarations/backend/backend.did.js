export const idlFactory = ({ IDL }) => {
  const Category = IDL.Variant({
    'Chemicals' : IDL.Null,
    'TestEquipment' : IDL.Null,
    'Batteries' : IDL.Null,
  });
  const Result_1 = IDL.Variant({ 'ok' : IDL.Nat, 'err' : IDL.Text });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const Item = IDL.Record({
    'id' : IDL.Nat,
    'name' : IDL.Text,
    'description' : IDL.Opt(IDL.Text),
    'stock' : IDL.Nat,
    'category' : Category,
    'price' : IDL.Float64,
  });
  return IDL.Service({
    'addItem' : IDL.Func(
        [IDL.Text, IDL.Opt(IDL.Text), IDL.Float64, IDL.Nat, Category],
        [Result_1],
        [],
      ),
    'deleteItem' : IDL.Func([IDL.Nat], [Result], []),
    'getItems' : IDL.Func([], [IDL.Vec(Item)], ['query']),
    'getItemsByCategory' : IDL.Func([Category], [IDL.Vec(Item)], ['query']),
    'updateItemStock' : IDL.Func([IDL.Nat, IDL.Nat], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
