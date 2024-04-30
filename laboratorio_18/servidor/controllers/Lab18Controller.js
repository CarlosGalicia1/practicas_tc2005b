module.exports = {
    get : (request,response) => {
        response.cookie("cookie_lab18" , `lab18 visited: ${new Date().toDateString()}`,{httpOnly:true, secure: true, maxAge:60*1000});
        response.render('lab18'); 
    }
}