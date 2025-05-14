 // This JS file handles QR generation logic.
document.getElementById('qrType').addEventListener('change', function() {
  const qrType = this.value;
  document.querySelectorAll('.qr-fields').forEach(field => field.style.display = 'none');
  document.getElementById(`${qrType}Fields`).style.display = 'block';
});

document.getElementById('qrForm').addEventListener('submit', function(e) {
  e.preventDefault();

  let qrData = '';
  const type = document.getElementById('qrType').value;

  if (type === 'wifi') {
    const ssid = document.getElementById('ssid').value;
    const password = document.getElementById('password').value;
    const encryption = document.getElementById('encryption').value;
    const hidden = document.getElementById('hidden').checked;
    qrData = `WIFI:T:${encryption};S:${ssid};P:${password};${hidden ? 'H:true;' : ''};`;
  } else if (type === 'url') {
    qrData = document.getElementById('url').value;
  } else if (type === 'vcard') {
    const name = document.getElementById('vname').value;
    const phone = document.getElementById('vphone').value;
    const email = document.getElementById('vemail').value;
    qrData = `BEGIN:VCARD\nVERSION:3.0\nN:${name}\nTEL:${phone}\nEMAIL:${email}\nEND:VCARD`;
  } else if (type === 'email') {
    qrData = `mailto:${document.getElementById('mailto').value}`;
  } else if (type === 'sms') {
    const num = document.getElementById('smsNumber').value;
    const msg = document.getElementById('smsBody').value;
    qrData = `SMSTO:${num}:${msg}`;
  } else if (type === 'text') {
    qrData = document.getElementById('text').value;
  }

  const foregroundColor = document.getElementById('foregroundColor').value;
  const backgroundColor = document.getElementById('backgroundColor').value;
  const borderText = document.getElementById('borderText').value;
  const borderColor = document.getElementById('borderColor').value;

  document.getElementById('topText').textContent = borderText;
  document.getElementById('bottomText').textContent = borderText;
  document.getElementById('topText').style.color = borderColor;
  document.getElementById('bottomText').style.color = borderColor;

  const qrCode = new QRCodeStyling({
    width: 300,
    height: 300,
    data: qrData,
    dotsOptions: { color: foregroundColor, type: "rounded" },
    backgroundOptions: { color: backgroundColor },
    imageOptions: { crossOrigin: "anonymous", margin: 10 }
  });

  const logoInput = document.getElementById('logo');
  if (logoInput.files.length > 0) {
    const reader = new FileReader();
    reader.onload = e => {
      qrCode.update({ image: e.target.result });
      document.getElementById('qrcode').innerHTML = '';
      qrCode.append(document.getElementById('qrcode'));
    };
    reader.readAsDataURL(logoInput.files[0]);
  } else {
    document.getElementById('qrcode').innerHTML = '';
    qrCode.append(document.getElementById('qrcode'));
  }
});
