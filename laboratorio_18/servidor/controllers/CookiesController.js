module.exports = {
    get : (request,response) => {
        response.cookie("cookie_getcookies" , `lab3 visited: ${new Date().toDateString()}`,{httpOnly:true, secure: true, maxAge:60*1000});
        console.log(request.cookies);
        response.send(request.cookies);
    }

}