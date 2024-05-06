import { useState } from "react";
import styles from "../styles/SearchBox.module.css";

function SearchBox({ searchHandler }) {
  const [string, setString] = useState("");

  const handleSearch = (e) => {
    setString(e.target.value);
    searchHandler(e.target.value);
  };

  return (
    <div className={styles.searchContainer}>
      <label htmlFor="searchInput" className={styles.searchLabel}>
        Search:
      </label>
      <input
        type="text"
        id="searchInput"
        className={styles.searchInput}
        value={string}
        onChange={handleSearch}
        placeholder="Search Event"
      />
    </div>
  );
}

export default SearchBox;
