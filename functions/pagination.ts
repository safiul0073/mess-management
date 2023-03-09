export const paginate = (
  data: any,
  totalCount: number,
  page: number,
  limit: number
) => {
  const pages = Math.ceil(totalCount / limit);
  const nextPage = page + 1 <= pages ? page + 1 : null;
  const prevPage = page - 1 >= 1 ? page - 1 : null;
  return { data, totalCount, pages, nextPage, prevPage };
};
