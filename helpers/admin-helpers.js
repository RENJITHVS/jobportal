var db = require('../config/connection')
var collection = require('../config/collection')
var Promise = require('promise');

module.exports ={
    doLogin: (adminData) => {
        return new Promise(async (resolve, reject) => {
            let loginStatus = false;
            let response = {}
            let admin = await db.get().collection(collection.ADMIN_COLLECTION).findOne({username:adminData.username})

            if (admin) {
                let status =await db.get().collection(collection.ADMIN_COLLECTION).findOne({password:adminData.password})
                
                    if(status) {
                        console.log("login success");
                        response.status=true;
                        resolve(response)
                    }
                    else {
                        console.log('login failed')
                        response.status=false;
                        resolve({status:false})
                    }
               
            }
            else {
                console.log("Invalid Username");
                response.status=false;
                resolve({status:false})
            }

        })
    },getAllUsers: () => {
        return new Promise(async (resolve, reject) => {
            let users = await db.get().collection(collection.USER_COLLECTION).find().toArray()
            resolve(users)
        })
    },getAllEmployers: () => {
        return new Promise(async (resolve, reject) => {
            let employers = await db.get().collection(collection.EMPLOYER_COLLECTION).find().toArray()
            resolve(employers)
        })
    }

}