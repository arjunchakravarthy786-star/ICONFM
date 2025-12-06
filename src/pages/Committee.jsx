import CommitteeList from "../components/CommitteeList";
import Footer from "../components/Footer";

export default function Committee() {
  return (
    <div className="pt-24 max-w-6xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-blue-900">Organizing & Scientific Committee</h1>
      <p className="text-gray-600 mt-1">Editable via Firebase Firestore</p>
      <CommitteeList />
      <Footer />
    </div>
  );
}
