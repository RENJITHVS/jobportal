var db = require('../config/connection')
var collection = require('../config/collection')
const Promise = require('promise')
var ObjectId = require('mongodb').ObjectID

module.exports = {
    addJob: (jobs, callback) => {
        console.log(jobs)
        db.get().collection('jobs').insertOne(jobs).then((data) => {
            console.log(data)
            callback(data.ops[0]._id)

        })

    },getAllJobs: () => {
        return new Promise(async (resolve, reject) => {
            let jobs = await db.get().collection(collection.JOBS_COLLECTION).find().toArray()
            resolve(jobs)
        })
    }
}