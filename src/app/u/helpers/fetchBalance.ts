import supabase from '@/lib/supabase';

export default async function fetchBalance(id: string) {
  if (!id) return 0;
  const balanceResponse = await supabase
    .from('users')
    .select('balance')
    .eq('id', id)
    .single();

  if (balanceResponse.error) {
    return 0;
  }

  return balanceResponse.data.balance;
}
