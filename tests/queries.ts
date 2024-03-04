export default class Queries{
    constructor(){

    }

    static ognypDB = "users_ognyp";

    static getUserById(dbName:String, id:Number){
        return `Select * from ${dbName} where id = ${id}`;
    }

    static InsertUserIntoognypDB(){
        return "INSERT INTO `users_ognyp`(`id`, `username`, `email`, `password`) VALUES (?,?,?,?)";
    }

    static UpdateUserognypDB(){
        return "UPDATE `users_ognyp` SET `username`=(?) WHERE id=(?)";
    }

    static DeleteUserognypDB(){
        return "Delete from `users_ognyp` where id = (?)";
    }
}