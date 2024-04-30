import { Input } from "@mantine/core";

const SearchBox = () => {
  return (
    <>
      <Input component="button" pointer>
        <Input.Placeholder>Search Events</Input.Placeholder>
      </Input>
    </>
  );
};

export default SearchBox;
