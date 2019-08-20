import React, { useState } from "react";
import CreateModal from "./CreateModal";

const CreateWallet = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button className="button is-primary" onClick={() => setOpen(true)}>
        Create new
      </button>
      {open && <CreateModal open={open} onClose={() => setOpen(false)} />}
    </div>
  );
};

export default CreateWallet;
