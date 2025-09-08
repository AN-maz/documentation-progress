const validator = require('validator');
const chalk = require('chalk');

// cek Email
// console.log(validator.isEmail('purwa123@gmail.com'));

// cek no. Telp
// console.log(validator.isMobilePhone('0812345678','id-ID'));


// console.log(chalk.italic.black.bgBlue('Hello MasPur!'));

const pesan = chalk`Selamat pagi dunia {bgGreen.black tipu-tipu}`;
console.log(pesan);   


