import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Sponsors() {
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "sponsors"));
        const sponsorList = [];
        querySnapshot.forEach((doc) => {
          sponsorList.push({ id: doc.id, ...doc.data() });
        });
        setSponsors(sponsorList);
      } catch (error) {
        console.error("Error fetching sponsors: ", error);
      }
    };

    fetchSponsors();
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h3 className="text-xl font-bold text-blue-900 mb-4">Sponsors</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 items-center">
        {sponsors.map((sponsor) => (
          <img
            key={sponsor.id}
            src={sponsor.logo}
            alt={sponsor.name}
            className="w-full h-16 object-contain"
          />
        ))}
      </div>
    </section>
  );
}
