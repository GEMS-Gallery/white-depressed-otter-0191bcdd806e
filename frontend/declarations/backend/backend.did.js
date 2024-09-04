export const idlFactory = ({ IDL }) => {
  const Result = IDL.Variant({ 'ok' : IDL.Nat, 'err' : IDL.Text });
  const TaxPayer = IDL.Record({
    'tid' : IDL.Nat,
    'sunnyDay' : IDL.Bool,
    'address' : IDL.Text,
    'image' : IDL.Opt(IDL.Text),
    'lastName' : IDL.Text,
    'firstName' : IDL.Text,
  });
  return IDL.Service({
    'addTaxPayer' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Opt(IDL.Text), IDL.Bool],
        [Result],
        [],
      ),
    'getAllTaxPayers' : IDL.Func([], [IDL.Vec(TaxPayer)], ['query']),
    'getTaxPayerByTID' : IDL.Func([IDL.Nat], [IDL.Opt(TaxPayer)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
