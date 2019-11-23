const generatePassword = () => {

    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = 'ABCDEFGHIJKLMNOPRSTUWXYZ';
    const digit = '123456789';
    const special = '#?!@$%^&*-';

    let result = '';

    result += getRandomChar(special);
    result += getRandomChar(upper);
    result += getRandomChar(digit);

    for(let i = 0;i<4; i++){
        result += getRandomChar(lower);
    }

    return result;
};

function getRandomChar(s) {
    return s.charAt(Math.floor(Math.random() * s.length));
}

module.exports = generatePassword;
