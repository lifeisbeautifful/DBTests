import{test, expect} from "@playwright/test";
import mysql from "mysql";
import Queries from "./queries";

 

test.describe.serial("DB CRUD Testing", () => {
    let pool;
    test.beforeAll(() => {
        pool = mysql.createPool({
            host:"yh6.h.filess.io",
            user: "automation_heraction",
            password: "a15e5a47817c45a99ca9f32298e1cca90ea3c056",
            database: "automation_heraction",
            port:3306
        })
    });

    test("Get user by id", async ({}) => {
        let getUsers = new Promise((res, rej) => {
            pool.getConnection(function(error, connection){
                connection.query(Queries.getUserById(Queries.ognypDB, 1), function(error, results, fields){
                    if(error) rej(error);
                    res(results);
                })
            })
        })

        let result = await getUsers;
        expect(result.length).toBe(1);
        expect(result[0].username).toEqual("testUser1");
        expect(result[0].email).toEqual("testEmail1");
        expect(result[0].password).not.toBeNull();
        console.log(result);
    });

    test("Create user", async ({}) => {
        let createUser = new Promise((res, rej) => {
            pool.getConnection(function(error, connection){
                connection.query(Queries.InsertUserIntoognypDB(),[33, "test", "test", "2347"], 
                function(error, results, fields){
                    if(error) rej(error);
                    res(results);
                })
            })
        })

        let result = JSON.stringify(await createUser);
        let resultObj = JSON.parse(result);
        expect(result.OkPacket).toBeUndefined;
        expect(resultObj.affectedRows).toEqual(1);
        expect(resultObj.changedRows).toEqual(0);
    });

    test("Update user", async({}) => {
        let updateUser = new Promise((res, rej) => {
            pool.getConnection(function(error, connection){
                connection.query(Queries.UpdateUserognypDB(),["sdccvxcdfsd",13],
                function(error, results, fields){
                    if(error) rej(error);
                    res(results);
                })
            })
        })

        var result = Object.values(JSON.parse(JSON.stringify(await updateUser)));
        expect(result.OkPacket).toBeUndefined();
        expect(result).toContain('(Rows matched: 1  Changed: 1  Warnings: 0');
    })

    test("Delete user", async({}) => {
        let deleteUser = new Promise((res, rej) => {
            pool.getConnection(function(error, connection){
                connection.query(Queries.DeleteUserognypDB(),[20],
                 function(error, results, fields){
                    if(error) rej(error);
                    res(results);
                })
            })
        })

        let result = JSON.stringify(await deleteUser);
        let resultObj = JSON.parse(result);
        console.log(result);
        expect(result.OkPacket).toBeUndefined;
        expect(resultObj.affectedRows).toEqual(1);
        expect(resultObj.changedRows).toEqual(0);
    })
})