import supabase from '@/lib/supabase';
import { useEffect, useState } from 'react';
import Spinner from '@/components/Spinner';
import { AnimatePresence } from 'framer-motion';
import { ISuscription } from './suscription';
import SingleSuscription from './SingleSuscription';

export default function SuscriptionsList() {
  const [loading, setLoading] = useState(false);
  const [suscriptionsList, setSuscriptionsList] = useState<ISuscription[]>([]);

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
  }, []);

  return (
    <section>
      {loading ? (
        <section className="flex items-center justify-center pt-6">
          <Spinner />
        </section>
      ) : (
        <AnimatePresence>
          <section className="pt-4">
            {!suscriptionsList || !suscriptionsList.length ? (
              <section className="flex items-center justify-center">
                <h2 className="opacity-60 font-semibold">
                  Sin suscripciones registradas...
                </h2>
              </section>
            ) : (
              <>
                {suscriptionsList.map((suscription, id) => (
                  <SingleSuscription
                    suscription={suscription}
                    key={suscription.id}
                    id={id}
                  />
                ))}
              </>
            )}
          </section>
        </AnimatePresence>
      )}
    </section>
  );
}
