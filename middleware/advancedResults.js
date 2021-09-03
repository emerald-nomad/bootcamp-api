const advancedResults = (find, count) => async (req, res, next) => {
  const fieldsToRemove = ["select", "sort", "page", "limit"];
  const pagination = {};
  let select;
  let sort;
  let skip;
  let limit;

  // Select
  if (req.query.select) {
    select = req.query.select.split(",").join(" ");
  }

  // Sort
  if (req.query.sort) {
    sort = req.query.sort.split(",").join(" ");
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  limit = parseInt(req.query.limit, 10) || 25;
  skip = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await count();

  fieldsToRemove.forEach((param) => delete req.query[param]);

  const queryStr =
    // Turning query object into string
    JSON.stringify(req.query)
      // Adding a '$' in front of filter operators
      .replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);

  const query = JSON.parse(queryStr);

  const results = await find({
    query,
    select,
    sort,
    limit,
    skip,
  });

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (skip > 0) {
    pagination.pre = {
      page: page - 1,
      limit,
    };
  }

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results,
  };

  next();
};

module.exports = advancedResults;
