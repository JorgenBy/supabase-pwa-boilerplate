import { serve } from 'https://deno.land/std@0.192.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // or specific domain'
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};


serve(async (req) => {
    // Hantera preflight request (OPTIONS)
  if (req.method === 'OPTIONS') {
    return new Response('OK', { headers: corsHeaders });
  }

  const { email } = await req.json();
  
  if (!email) {
    return new Response(
      JSON.stringify({ message: 'Email is required' }),
      { status: 400, headers: corsHeaders }
    );
  }

  const supabase = createClient(
    Deno.env.get('PROJECT_URL')!,
    Deno.env.get('SERVICE_ROLE_KEY')!
  );

  const { error } = await supabase
    .from('users')
    .update({ is_admin: true })
    .eq('email', email);

  if (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: corsHeaders
    });
  }

  return new Response(JSON.stringify({ message: `${email} is now admin` }), {
    status: 200,
    headers: corsHeaders
  });
});
