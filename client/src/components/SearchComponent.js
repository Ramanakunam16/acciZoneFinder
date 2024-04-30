import React from "react";

function SearchComponent() {
  return (
    <div className="search-box">
      <form>
        <input type="search" placeholder="search location"></input>
        <button>search</button>
      </form>
      <div>
        <p
          style={{
            color: "#ddd",
            fontSize: "34px",
            textAlign: "center",
            marginTop: "40px",
          }}
        >
          (or)
        </p>
      </div>
    </div>
  );
}

export default SearchComponent;
