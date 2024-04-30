module.exports = {
    get : (request,response) => {
        response.cookie("cookie_lab11" , `lab11 visited: ${new Date().toDateString()}`,{httpOnly:true, secure: true, maxAge:60*1000});
        response.render('lab11'); 
    }
}