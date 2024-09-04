import Bool "mo:base/Bool";
import Func "mo:base/Func";
import Hash "mo:base/Hash";
import Iter "mo:base/Iter";

import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Array "mo:base/Array";
import Option "mo:base/Option";
import Debug "mo:base/Debug";

actor {
  // Define the TaxPayer type
  type TaxPayer = {
    tid: Nat;
    firstName: Text;
    lastName: Text;
    address: Text;
    image: ?Text;
    sunnyDay: Bool;
  };

  // Stable variable to store TaxPayer records
  stable var taxPayerEntries : [(Nat, TaxPayer)] = [];

  // Create a HashMap to store TaxPayer records
  var taxPayers = HashMap.HashMap<Nat, TaxPayer>(0, Nat.equal, Hash.hash);

  // Mutable variable to keep track of the next available TID
  var nextTID : Nat = 1;

  // Function to add a new TaxPayer record
  public func addTaxPayer(firstName: Text, lastName: Text, address: Text, image: ?Text, sunnyDay: Bool) : async Result.Result<Nat, Text> {
    let tid = nextTID;
    let taxPayer : TaxPayer = {
      tid = tid;
      firstName = firstName;
      lastName = lastName;
      address = address;
      image = image;
      sunnyDay = sunnyDay;
    };
    taxPayers.put(tid, taxPayer);
    nextTID += 1;
    #ok(tid)
  };

  // Function to get all TaxPayer records
  public query func getAllTaxPayers() : async [TaxPayer] {
    Array.map<(Nat, TaxPayer), TaxPayer>(Iter.toArray(taxPayers.entries()), func (_, taxPayer) = taxPayer)
  };

  // Function to search for a TaxPayer by TID
  public query func getTaxPayerByTID(tid: Nat) : async ?TaxPayer {
    taxPayers.get(tid)
  };

  // System functions for upgrades
  system func preupgrade() {
    taxPayerEntries := Iter.toArray(taxPayers.entries());
  };

  system func postupgrade() {
    taxPayers := HashMap.fromIter<Nat, TaxPayer>(taxPayerEntries.vals(), 0, Nat.equal, Hash.hash);
    nextTID := taxPayerEntries.size() + 1;
  };
}
