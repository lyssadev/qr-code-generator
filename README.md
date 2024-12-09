# QR Code Generator

A command-line tool to generate QR codes with various options and types.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Options](#options)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Installation

To use this tool, you need to have Node.js installed on your system. You can install the QR Code Generator by cloning this repository and running the following commands:

```sh
git clone https://github.com/lyssadev/qr-code-generator.git
cd qr-code-generator
npm install
```

## Usage

Run the QR Code Generator using the following command:

```sh
npm start <data> -- [options]
```

## Options

| Option        | Alias | Description                                                                 | Default     |
|---------------|-------|-----------------------------------------------------------------------------|-------------|
| `--type`      | `-t`  | Type of QR code (url, text, email, phone, sms, wifi, vcard)                 | `url`       |
| `--output`    | `-o`  | Output format (png, svg, text)                                              | `png`       |
| `--filename`  | `-f`  | Output file name                                                            | `qrcode`    |
| `--size`      | `-s`  | Size of the QR code                                                         | `200`       |
| `--color`     | `-c`  | Color of the QR code                                                        | `#000000`   |
| `--background`| `-b`  | Background color of the QR code                                             | `#ffffff`   |

## Examples

### Generate a URL QR Code

```sh
npm start https://example.com -- --type url --output png --filename example --size 300 --color #ff0000 --background #ffffff
```

### Generate an Email QR Code

```sh
npm start john.doe@example.com -- --type email --output text --filename email --size 200 --color #0000ff --background #ffffff
```

### Generate a Phone QR Code

```sh
npm start +1234567890 -- --type phone --output png --filename phone --size 200 --color #000000 --background #ffffff
```

### Generate an SMS QR Code

```sh
npm start +1234567890 -- --type sms --output png --filename sms --size 200 --color #000000 --background #ffffff
```

### Generate a WiFi QR Code

```sh
npm start ssid:password:WPA -- --type wifi --output png --filename wifi --size 200 --color #000000 --background #ffffff
```

### Generate a vCard QR Code

```sh
npm start John Doe:john.doe@example.com:+1234567890 -- --type vcard --output png --filename vcard --size 200 --color #000000 --background #ffffff
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any suggestions or improvements.

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.
