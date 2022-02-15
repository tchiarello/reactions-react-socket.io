const connection = require('./connection')
const { ObjectID } = require("mongodb");

const getAll = () => connection().then(db => db.collection('reactions').find({}).toArray());

const increaseVotes = (id) => connection().then(db => db.collection('reactions')
  .updateOne(
    { _id: ObjectID(id) },
    { $inc: { votes: 1 } },
));

const getById = (id) => connection().then(db => db.collection('reactions')
.findOne({ _id: ObjectID(id) }));

module.exports = { 
  getAll,
  increaseVotes,
  getById
}