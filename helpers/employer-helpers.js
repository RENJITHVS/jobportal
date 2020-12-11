var db = require('../config/connection')
var collection = require('../config/collection')
const bcrypt = require('bcrypt');
var Promise = require('promise');

module.exports = {
    doSignup: (employerData) => {
        return new Promise(async (resolve, reject) => {
            employerData.password = await bcrypt.hash(employerData.password, 10)
            db.get().collection(collection.EMPLOYER_COLLECTION).insertOne(employerData).then((data) => {
                resolve(data.ops[0])
            })

        })

    },
    doLogin: (employerData) => {
        return new Promise(async (resolve, reject) => {
            let loginStatus = false;
            let response = {}
            let employer = await db.get().collection(collection.EMPLOYER_COLLECTION).findOne({email:employerData.email})

            if (employer) {
                bcrypt.compare(employerData.password,employer.password).then((status)=>{
                    if(status) {
                        console.log("login success");
                        response.employer=employer;
                        response.status=true;
                        resolve(response)
                    }
                    else {
                        console.log('login failed')
                        resolve({status:false})
                    }
                })
            }
            else {
                console.log("Invalid Username");
                resolve({status:false})
            }

        })
    },
}