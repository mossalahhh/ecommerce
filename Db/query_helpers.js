export const queryHelpersPlugin = (schema) => {

  schema.query.paginate = function (page) {
    page = !page || isNaN(page) || page < 1 ? 1 : page;
    const limit = 4;
    const skip = (page - 1) * limit; //1-1*4 =0 , 2-1*4=4 , 3-1*4 =8
    return this.skip(skip).limit(limit);
  };

  schema.query.customSelect = function (fields) {
    if (!fields) return this;
    //return keys of product schema in array
    const modelKeys = Object.keys(schema.paths);

    //make query keys array
    const queryKeys = fields.split(" ");

    //compare and ignore keys doese not in schema
    const matchedKeys = queryKeys.filter((key) => modelKeys.includes(key));

    return this.select(matchedKeys);
  };
};
