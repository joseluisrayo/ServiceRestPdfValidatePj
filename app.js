var PromiseFtp = require('promise-ftp');
var ftp = new PromiseFtp();

ftp.connect({
    host: '172.22.17.200',
    user: 'documento',
    password: '123456',
    autoReconnect: true
})
    .then(function () {
        return ftp.get('201500349500121700020220527093103.pdf');
    })
    .then(function (stream) {
        const bufs = [];
        stream.resume().on("data", chunk => {
            bufs.push(chunk)
        });

        stream.on("end", () => {
            console.log('end')
            const buffer = Buffer.concat(bufs);
            const pdf2base64 = 'data:application/pdf;base64,' + buffer.toString('base64');
            console.log(pdf2base64);
            ftp.end();
        });
    });