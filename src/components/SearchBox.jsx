import { useState } from "react";
import styles from "../styles/SearchBox.module.css";
import{ Text,TextInput  } from "@mantine/core"

function SearchBox({ searchHandler }) {
  const [string, setString] = useState("");

  const handleSearch = (e) => {
    setString(e.target.value);
    searchHandler(e.target.value);
  };

  return (
    <div className={styles.searchContainer}>
      <Text htmlFor="searchInput" className={styles.searchLabel} size="sm">
        Search:
      </Text>
      <TextInput
      size="xs"
        type="text"
        // id="searchInput"
        className={styles.searchInput}
        value={string}
        onChange={handleSearch}
        placeholder="Search Event"
      />
    </div>
  );
}

export default SearchBox;
