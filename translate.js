const translate = (text) =>{

const trans = require('google-translate-api');
let result;
trans(text, {to: 'hi'}).then(res => {
    console.log(res.text);
    //=> I speak English
    console.log(res.from.language.iso);
    result = res.from.language.iso;
    //=> nl
}).catch(err => {
    console.error(err);
});
  return result;
}

modules.export = translate;
