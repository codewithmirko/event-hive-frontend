import { Pagination, Center } from '@mantine/core';

const PaginationControls = ({ currentPage, onPageChange, total, pageSize }) => {
  const pageCount = Math.ceil(total / pageSize);
    // console.log(pageCount,total,pageSize )
  return (
    <Center style={{ marginTop: '20px' }}>
      <Pagination page={currentPage} onChange={onPageChange} total={pageCount} />
    </Center>
  );
};

export default PaginationControls;
