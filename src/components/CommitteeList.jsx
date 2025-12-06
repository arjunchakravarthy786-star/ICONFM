import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function CommitteeList() {
  const [committee, setCommittee] = useState([]);

  useEffect(() => {
    const fetchCommittee = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "committee"));
        const members = [];
        querySnapshot.forEach((doc) => {
          members.push({ id: doc.id, ...doc.data() });
        });
        setCommittee(members);
      } catch (error) {
        console.error("Error fetching committee: ", error);
      }
    };

    fetchCommittee();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-6">
      {committee.map((member) => (
        <div key={member.id} className="bg-white shadow rounded p-4 text-center">
          <img
            src={member.photo}
            alt={member.name}
            className="w-32 h-32 mx-auto rounded-full object-cover"
          />
          <h4 className="mt-4 font-bold text-blue-900">{member.name}</h4>
          <p className="text-gray-600">{member.role}</p>
        </div>
      ))}
    </div>
  );
}
