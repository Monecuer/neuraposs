import React from 'react';
import { QRCode } from 'qrcode.react';

export function QRCodeDisplay({ value }: { value: string }) {
  return (
    <div style={{ textAlign: 'center', padding: 16 }}>
      <QRCode value={value} size={256} />
    </div>
  );
}
