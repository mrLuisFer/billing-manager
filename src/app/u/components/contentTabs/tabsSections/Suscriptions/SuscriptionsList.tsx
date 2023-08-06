import supabase from '@/lib/supabase';
import { useEffect, useState } from 'react';
import Spinner from '@/components/Spinner';
import { AnimatePresence } from 'framer-motion';
import useSuscriptionsList from '@/store/useSuscriptionsList';
import SingleSuscription from './SingleSuscription';

export default function SuscriptionsList() {
  const [loading, setLoading] = useState(false);
  const { setSuscriptionsList, suscriptionsList } = useSuscriptionsList(
    (state) => state,
  );
  const suscriptionTotal = suscriptionsList?.reduce((acc, suscription) => {
    if (suscription.count && suscription.status !== 'canceled') {
      return acc + suscription.count;
    }
    return acc;
  }, 0);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const suscriptionsResponse = await supabase
        .from('suscriptions')
        .select('*');

      if (suscriptionsResponse.error) {
        return;
      }

      setLoading(false);
      if (suscriptionsResponse.data) {
        setSuscriptionsList(suscriptionsResponse.data);
      }
    })();
  }, [setSuscriptionsList]);

  return (
    <section>
      {loading ? (
        <section className="flex items-center justify-center pt-6">
          <Spinner />
        </section>
      ) : (
        <AnimatePresence>
          <section className="pt-4">
            <div>
              <p className="opacity-40 font-semibold pb-2 text-sm">
                Las suscripciones canceladas no se ven reflejadas en el saldo
                actual
              </p>
            </div>
            {!suscriptionsList || !suscriptionsList.length ? (
              <section className="flex items-center justify-center">
                <h2 className="opacity-60 font-semibold">
                  Sin suscripciones registradas...
                </h2>
              </section>
            ) : (
              <section className="gap-3 flex flex-col">
                {suscriptionsList.map((suscription, id) => (
                  <SingleSuscription
                    suscription={suscription}
                    key={suscription.id}
                    id={id}
                  />
                ))}
                <div className="flex justify-end border-t border-neutral-300 gap-2">
                  <h2 className="transition opacity-70 hover:opacity-100 w-fit">
                    Total en suscripciones:
                  </h2>
                  <p className="font-bold">
                    ${suscriptionTotal}
                    <span className="text-sm text-neutral-500">.00</span>
                  </p>
                </div>
              </section>
            )}
          </section>
        </AnimatePresence>
      )}
    </section>
  );
}
