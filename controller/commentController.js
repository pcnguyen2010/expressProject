const cmtModel = require('./../models/commentModel');

let empID = -1;

module.exports.getAllComments = (req,res) => {
   //res.send(req.params.id)
   //const id = req.params.id;
    //console.log("blogID "+id);
    empID = req.params.id;
    res.render('comment',{title: 'Add Comment',employee_id:empID});
}

module.exports.getComment = (req,res) => {

}

module.exports.updateComment = (req,res) => {

}

module.exports.createComment = async(req,res) => {
    try{
        const ctModel = await cmtModel.create(req.body);
        res.redirect('/practice');
    }catch(error){
        console.log(error)
    }
}

module.exports.deleteComment = (req,res) => {

}