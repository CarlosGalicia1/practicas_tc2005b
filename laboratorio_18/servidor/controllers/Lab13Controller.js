module.exports = {
    get : (request,response) => {
        response.cookie("cookie_lab13" , `lab13 visited: ${new Date().toDateString()}`,{httpOnly:true, secure: true, maxAge:60*1000});
        response.render('lab13'); 
    }
}