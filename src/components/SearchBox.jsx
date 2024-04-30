import { Input } from "@mantine/core";

const SearchBox = () => {
  return (
    <>
      <p>Searchbox is here</p>
      <Input component="button" pointer>
        <Input.Placeholder>Placeholder content</Input.Placeholder>
      </Input>
    </>
  );
};

export default SearchBox;
