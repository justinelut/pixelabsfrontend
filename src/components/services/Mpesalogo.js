import React from 'react';
import Image from 'next/image'
import mpesalogo from '@/components/services/mpesalogo.png'

const MpesaLogo = () => {
  return (
    <div className="h-16 w-26">
      <Image src={mpesalogo} alt="Mpesa logo" className="h-full" />
    </div>
  );
};

export default MpesaLogo;