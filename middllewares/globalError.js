let globalError=(err,req,res,next)=>{
    // console.error(err);
    err.statusCode=err.statusCode||400;
    res.status(err.statusCode).json({
        message: err.message,
        error:err,
        status:err.status,
        status:"failed",
    })

}
module.exports =globalError;