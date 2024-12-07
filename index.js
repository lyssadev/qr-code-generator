const qrcode = require('qrcode');
const fs = require('fs');
const path = require('path');
const yargs = require('yargs');

const argv = yargs
  .option('type', {
    alias: 't',
    describe: 'Type of QR code (url, text, email, phone, sms, wifi, vcard)',
    type: 'string',
    default: 'url'
  })
  .option('output', {
    alias: 'o',
    describe: 'Output format (png, svg, text)',
    type: 'string',
    default: 'png'
  })
  .option('filename', {
    alias: 'f',
    describe: 'Output file name',
    type: 'string',
    default: 'qrcode'
  })
  .option('size', {
    alias: 's',
    describe: 'Size of the QR code',
    type: 'number',
    default: 200
  })
  .option('color', {
    alias: 'c',
    describe: 'Color of the QR code',
    type: 'string',
    default: '#000000'
  })
  .option('background', {
    alias: 'b',
    describe: 'Background color of the QR code',
    type: 'string',
    default: '#ffffff'
  })
  .help()
  .alias('help', 'h')
  .argv;

const data = argv._[0];
if (!data) {
  console.error('Please provide data as a command-line argument.');
  process.exit(1);
}

const options = {
  type: argv.type,
  output: argv.output,
  filename: argv.filename,
  size: argv.size,
  color: argv.color,
  background: argv.background
};

const generateQRCode = (data, options) => {
  const { type, output, filename, size, color, background } = options;

  let qrData = data;
  if (type === 'email') {
    qrData = `mailto:${data}`;
  } else if (type === 'phone') {
    qrData = `tel:${data}`;
  } else if (type === 'sms') {
    qrData = `sms:${data}`;
  } else if (type === 'wifi') {
    const [ssid, password, security] = data.split(':');
    qrData = `WIFI:S:${ssid};T:${security};P:${password};;`;
  } else if (type === 'vcard') {
    const [name, email, phone] = data.split(':');
    qrData = `BEGIN:VCARD\nVERSION:3.0\nN:${name}\nEMAIL:${email}\nTEL:${phone}\nEND:VCARD`;
  }

  const filePath = path.join(__dirname, `${filename}.${output}`);
  const qrOptions = {
    type: output,
    width: size,
    color: {
      dark: color,
      light: background
    }
  };

  if (output === 'text') {
    qrcode.toDataURL(qrData, qrOptions, (err, dataUrl) => {
      if (err) throw err;
      console.log('QR Code as Data URL:', dataUrl);
      fs.writeFileSync(filePath, dataUrl);
      console.log(`Data URL saved to ${filePath}`);
    });
  } else {
    qrcode.toFile(filePath, qrData, qrOptions, (err) => {
      if (err) throw err;
      console.log(`QR Code saved as ${filePath}`);
    });
  }
};

generateQRCode(data, options);
