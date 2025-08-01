// app/api/session/route.js 

import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const name = cookieStore.get('name')?.value || '';
  const email = cookieStore.get('email')?.value || '';
  const address1 = cookieStore.get('address1')?.value || '';
  const address2 = cookieStore.get('address2')?.value || '';
  const city = cookieStore.get('city')?.value || '';
  const state = cookieStore.get('state')?.value || '';
  const zipCode = cookieStore.get('zipCode')?.value || '';
  const purchasedProductsRaw = cookieStore.get('purchasedProducts')?.value || '[]';
  const purchasedProducts = JSON.parse(decodeURIComponent(purchasedProductsRaw));

  //const purchasedProducts = JSON.parse(decodeURIComponent(purchasedProductsRaw));
  return Response.json({ name, email, address1, address2, city, state, zipCode, purchasedProducts });
}

export async function POST(req) {
  const data = await req.json();
  const cookieStore = await cookies();

  cookieStore.set(
    'purchasedProducts',
    encodeURIComponent(JSON.stringify(data.purchasedProducts || [])),
    { path: '/', httpOnly: true }
  );
  cookieStore.set('name', data.name || '', { path: '/', httpOnly: true });
  cookieStore.set('email', data.email || '', { path: '/', httpOnly: true });
  cookieStore.set('address1', data.address1 || '', { path: '/', httpOnly: true });
  cookieStore.set('address2', data.address2 || '', { path: '/', httpOnly: true });
  cookieStore.set('city', data.city || '', { path: '/', httpOnly: true });
  cookieStore.set('state', data.state || '', { path: '/', httpOnly: true });
  cookieStore.set('zipCode', data.zipCode || '', { path: '/', httpOnly: true });  

  return Response.json({ success: true });
}