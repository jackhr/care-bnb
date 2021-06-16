const handleDuplicates = (err, res) => {
    const field = Object.keys(err.keyValue);
    const code = 409;
    const error = `An account with that ${field} already exists.`;
    res.status(code).send({messages: error, fields:field});
}

const handleInvalid = (err, res) => {
    let errors = Object.values(err.errors).map(log => log.message);
    let fields = Object.values(err.errors).map(log => log.path);
    let code = 400;

    if(errors.length > 1){
        const formattedErrors = errors.join('');
        res.status(code).send({messages: formattedErrors, fields: fields});
    } else {
        res.status(code).send({messages: errors, fields: fields});
    }
}

module.exports = (err, req, res, next) => {

    try {
        if(err.name === 'ValidationError') return err = handleInvalid(err,res);
        if(err.code && err.code == 11000) return err = handleDuplicates(err, res);
    } catch(err) {
        res.status(500).send('An uknown error has occurred :/');
    }
}