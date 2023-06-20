import React from "react";

const Categoryform = ({ handleAddCategory, value, setValue, btnText }) => {
  return (
    <>
      <form onSubmit={handleAddCategory}>
        <div className="mb-3 w-75">
          <input
            type="text"
            className="form-control"
            placeholder="type new category..."
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {btnText}
        </button>
      </form>
    </>
  );
};

export default Categoryform;
