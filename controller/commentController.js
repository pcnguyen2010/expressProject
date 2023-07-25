const cmtModel = require('./../models/commentModel');
const empModel = require('./../models/employeeModel');

const mgoose = require('mongoose');

let empID = -1;

module.exports.getAllComments = (req,res) => {
    empID = req.params.id;
    lt_name = req.params.last_name;
    f_name = req.params.first_name;
    res.render('comment',{title: 'Add Comment',employee_id:empID,first_name:f_name,last_name:lt_name});
}

module.exports.getComment = async(req,res) => {
    empID = req.params.id;
    try{
        ctModel = await cmtModel.find({employee_id:empID});
        commentCounter = ctModel.length;
        res.render('viewComment',{title: 'View Comment',cmtModels:ctModel});
    }catch(error){
        console.log(error)
    }
}

module.exports.updateComment = (req,res) => {

}

module.exports.createComment = async(req,res) => {
    try{
        const ctModel = await cmtModel.create(req.body);
        updateEmployeeFieldCommentCount(req.body.employee_id);
        res.redirect('/practice');
    }catch(error){
        console.log(error)
    }
}

module.exports.deleteComment = (req,res) => {

}

function updateEmployeeFieldCommentCount(employeeID){
    countComment(employeeID).then((commentCounter) =>{
        updateEmployeeCommentCounter(employeeID,commentCounter);
    });
}

async function countComment(employeeID){
    try{
        ctModel = await cmtModel.find({employee_id:employeeID});
        return ctModel.length;
    }catch(error){
        console.log(error);
    }
}
/*************************************************
 * Update comment counter field in employee table
 * 
 */
async function updateEmployeeCommentCounter(employeeID,commentCounter){
    try{
        const filter = { _id: new mgoose.Types.ObjectId(employeeID) };
        const update = { comment_count: commentCounter };
        await empModel.findOneAndUpdate(filter, update);
    }catch(error){
        console.log(error);
    }
}

////Tesing for promise
function test() {
    return returnPromise().then((value) => {
        console.log('1st then, inside test(): ' + value);
        return 'Hello';
    }).then((value) => {
      console.log('2nd then, inside test(): ' + value);
      return 'world';
    });
}
  
function returnPromise() {
    return new Promise(function(resolve, reject) {
        resolve('start of new Promise');
    });
}
  
test().then((value) => {
    console.log('3rd then, after calling test: ' + value);
});