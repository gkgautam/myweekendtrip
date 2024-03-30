'use client';
import React from 'react';
import cookie from 'js-cookie';
import { useRouter } from 'next/navigation';

function HomePage() {
  const router = useRouter();
  const handleLogout = ()=>{
    cookie.remove('session');
    router.push('/login');
  }
  return (
    <div>Home Page

      <button onClick={handleLogout}>LOGOUT</button>
    </div>
  )
}

export default HomePage