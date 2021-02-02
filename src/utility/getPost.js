export default cb => {
    setTimeout(() => {
        return cb(null, [
            {
                id: 1231,
                firstName: 'Gyuri',
                lastName: 'Elf',
                desc: 'sziahello',
                type: ['Backend', 'Frontend'],
                rate: 5.99
            },
            {
                id: 3874,
                firstName: 'Bloody',
                lastName: 'Mary',
                desc: 'kutyafej',
                type: ['Management', 'Graphics'],
                rate: 3.99
            }
        ]);
    }, 500);
};
