import qrcode from 'qrcode';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Command } from 'commander';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

program
  .name('qr-code-generator')
  .description('A command-line tool to generate QR codes with various options and types.')
  .argument('<data>', 'Data to encode in the QR code')
  .option('-t, --type <type>', 'Type of QR code (url, text, email, phone, sms, wifi, vcard)', 'url')
  .option('-o, --output <output>', 'Output format (png, svg, text)', 'png')
  .option('-f, --filename <filename>', 'Output file name', 'qrcode')
  .option('-s, --size <size>', 'Size of the QR code', 200)
  .option('-c, --color <color>', 'Color of the QR code', '#000000')
  .option('-b, --background <background>', 'Background color of the QR code', '#ffffff')
  .parse(process.argv);

const options = program.opts();
const data = program.args[0];

if (!data) {
  console.error('Please provide data as a command-line argument.');
  program.help();
}

const generateQRCode = async (data, options) => {
  const { type, output, filename, size, color, background } = options;

  let qrData = data;
  switch (type) {
    case 'email':
      qrData = `mailto:${data}`;
      break;
    case 'phone':
      qrData = `tel:${data}`;
      break;
    case 'sms':
      qrData = `sms:${data}`;
      break;
    case 'wifi':
      const [ssid, password, security] = data.split(':');
      qrData = `WIFI:S:${ssid};T:${security};P:${password};;`;
      break;
    case 'vcard':
      const [name, email, phone] = data.split(':');
      qrData = `BEGIN:VCARD\nVERSION:3.0\nN:${name}\nEMAIL:${email}\nTEL:${phone}\nEND:VCARD`;
      break;
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

  try {
    if (output === 'text') {
      const dataUrl = await qrcode.toDataURL(qrData, qrOptions);
      console.log('QR Code as Data URL:', dataUrl);
      fs.writeFileSync(filePath, dataUrl);
      console.log(`Data URL saved to ${filePath}`);
    } else {
      await qrcode.toFile(filePath, qrData, qrOptions);
      console.log(`QR Code saved as ${filePath}`);
    }
  } catch (err) {
    console.error('Error generating QR code:', err);
  }
};

generateQRCode(data, options);