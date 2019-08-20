import React, { useState } from "react";
import generate from "project-name-generator";
import withFirestore from "react-redux-firebase/lib/withFirestore";
import { connect } from "react-redux";
import { compose } from "redux";
import Modal from "Components/Modal";

const CreateModal = ({ onClose, open, firestore: { add, set }, auth }) => {
  const [address, setAddress] = useState("");
  const [name, setName] = useState(generate({ words: 2 }).spaced);
  const [addressVerified, setAddressVerified] = useState(null);

  const verify = async () => {
    const res = await fetch(
      `https://blockchain.info/rawaddr/${address}?cors=true`
    );
    if (res.status !== 200) {
      setAddressVerified(false);
      return false;
    }
    const json = await res.json();
    if (json.address) {
      setAddressVerified(true);
      return json;
    }
    return false;
  };

  const save = async () => {
    const v = await verify();
    if (v) {
      const r = await add(`users/${auth.uid}/wallets`, {
        address,
        name
      });
      v.txs.forEach(t => {
        set(`users/${auth.uid}/transactions/${t.hash}`, {
          hash: t.hash,
          walletId: r.id,
          createdAt: new Date(t.time * 1000).toISOString(),
          regenerated: false,
          selected: false
        });
      });

      onClose();
    }
  };

  return (
    <Modal title="Add new wallet" onCloseClick={onClose} open={open}>
      <div className="field">
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Wallet Address"
            value={address}
            onChange={({ target: { value } }) => setAddress(value)}
          />
          {addressVerified === false ? (
            <small className="has-text-danger">Invalid address</small>
          ) : null}
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Friendly name"
            value={name}
            onChange={({ target: { value } }) => setName(value)}
          />
        </div>
      </div>
      <button className="button is-primary" onClick={save}>
        Save
      </button>
    </Modal>
  );
};

export default compose(
  withFirestore,
  connect(({ firebase: { auth } }) => ({ auth }))
)(CreateModal);
