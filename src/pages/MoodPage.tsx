import MoodList from "../components/mood/MoodList";
import SelectMood from "../components/mood/SelectMood";

export default function MoodPage() {
  return (
    <div className="max-w-full mx-auto p-4 mt-6">
      <SelectMood />
      <MoodList />
    </div>
  );
}
