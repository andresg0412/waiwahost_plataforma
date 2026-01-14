
import { useEffect, useState } from 'react';

export interface InmuebleOption {
  id: number;
  nombre: string;
}

export function useInmueblesSelector() {
  const [inmuebles, setInmuebles] = useState<InmuebleOption[]>([]);
  const [loading, setLoading] = useState(false);

  const backendUrl = process.env.API_URL || 'http://localhost:3001';
  const url = `${backendUrl}/inmuebles/selector`;

  useEffect(() => {
    const fetchInmuebles = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');

        const res = await fetch(url, {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
          },
        });

        const json = await res.json();

        console.log('INMUEBLES RESPONSE', json);

        if (!json.isError && Array.isArray(json.data)) {
          setInmuebles(
            json.data.map((i: any) => ({
              id: Number(i.id),
              nombre: i.nombre,
            }))
          );
        }
      } catch (error) {
        console.error('Error cargando inmuebles selector:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInmuebles();
  }, [url]);

  return { inmuebles, loading };
}
