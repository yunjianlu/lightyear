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

  return Response.json({ name, email, address1, address2, city, state });
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
    `pfp=${data.pfp}; Path=/; HttpOnly`
  );

  return response;
}
