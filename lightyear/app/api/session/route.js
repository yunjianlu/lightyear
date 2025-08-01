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
  let purchasedProducts;
try {
  purchasedProducts = JSON.parse(decodeURIComponent(purchasedProductsRaw));
  if (!Array.isArray(purchasedProducts)) purchasedProducts = [];
  console.log('purchasedProducts:', purchasedProducts, typeof purchasedProducts);
} catch {
  purchasedProducts = [];
}
  //const purchasedProducts = JSON.parse(decodeURIComponent(purchasedProductsRaw));
  return Response.json({ name, email, address1, address2, city, state, zipCode, purchasedProducts });
}

export async function POST(req) {
  const data = await req.json();

  // Store in cookies (session)
  const response = new Response(JSON.stringify({ success: true }));
  response.headers.append(
    'Set-Cookie',
    `name=${data.name}; Path=/; HttpOnly`
  );
  response.headers.append(
    'Set-Cookie',
    `email=${data.email}; Path=/; HttpOnly`
  );
  response.headers.append(
    'Set-Cookie',
    `address1=${data.address1}; Path=/; HttpOnly`
  );
  response.headers.append(
    'Set-Cookie',
    `address2=${data.address2}; Path=/; HttpOnly`
  );
  response.headers.append(
    'Set-Cookie',
    `city=${data.city}; Path=/; HttpOnly`
  );
  response.headers.append(
    'Set-Cookie',
    `state=${data.state}; Path=/; HttpOnly`
  );
  response.headers.append(
    'Set-Cookie',
    `zipCode=${data.zipCode}; Path=/; HttpOnly`
  );
  response.headers.append(
    'Set-Cookie',
    `purchasedProducts=${encodeURIComponent(JSON.stringify(data.purchasedProducts))}; Path=/; HttpOnly`
  );
  console.log('API POST purchasedProducts:', data.purchasedProducts);
  response.headers.append(
    'Set-Cookie',
    `pfp=${data.pfp}; Path=/; HttpOnly`
  );

  return response;
}
