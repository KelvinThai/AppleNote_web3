import sign from 'jwt-encode';

export const supabaseUrl = process.env.NEXT_PUBLIC_supabaseUrl;
export const supabaseKey = process.env.NEXT_PUBLIC_supabaseKey;
export const supabaseJwt = process.env.NEXT_PUBLIC_supabaseJwt;

//create jwt token for supabase
export const createToken = (walletAddress: string) => {
  let token = sign({
    wallet_address: walletAddress,
    aud: 'authenticated',
    role: 'authenticated',
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
  }, supabaseJwt!);
  return token;
}

