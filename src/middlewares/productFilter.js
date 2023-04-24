const productFilter = (req, res, next) => {
  const filters = {};
  const { name, minPrice = 1, maxPrice = 100, date, category } = req.query;
  if (name & (name != undefined)) {
    filters.name = { $regex: name?.toLowerCase() };
  }

  if (minPrice > 1 && maxPrice < 100)
    filters.price = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };

  if (date) filters.date = { $gte: new Date(date) };

  if (category & (category != undefined))
    filters.category = category?.toLowerCase();
  req.filters = filters;
  next();
};
module.exports = productFilter;
