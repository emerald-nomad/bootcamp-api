require("./bootcamp.typedefs");
const { Bootcamp } = require("../../models");

/** @type {IBootcampRepository} */
const bootcampRepository = {
  createBootcamp: async (bootcamp) => {
    const newBootcamp = await Bootcamp.create(bootcamp);

    return newBootcamp;
  },

  getNumberOfBootcamps: async () => {
    return await Bootcamp.countDocuments();
  },

  getBootcamps: async ({
    query,
    select,
    sort = "-createdAt",
    skip = 0,
    limit = 25,
  }) => {
    const bootcamps = await Bootcamp.find(query)
      .select(select)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    return bootcamps;
  },

  getBootcampsInRadius: async ({ radius, lat, lng }) => {
    const bootcamps = await Bootcamp.find({
      location: {
        $geoWithin: {
          $centerSphere: [[lng, lat], radius],
        },
      },
    });

    return bootcamps;
  },

  getBootcamp: async (id) => {
    const bootcamp = await Bootcamp.findById(id);

    return bootcamp;
  },

  updateBootcamp: async (id, bootcamp) => {
    const updatedBootcamp = await Bootcamp.findByIdAndUpdate(id, bootcamp, {
      new: true,
      runValidators: true,
    });

    return updatedBootcamp;
  },

  deleteBootcamp: async (id) => {
    const deletedBootcamp = await Bootcamp.findByIdAndDelete(id);

    return deletedBootcamp;
  },
};

module.exports = bootcampRepository;
