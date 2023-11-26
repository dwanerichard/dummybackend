let token = 0;

function getToken(){
    token++;
    return token;
}

module.exports = {
    getToken,
}