import ModulList from "../components/ModulList";
import AddModul from "./addModul";

export default function modul() {
  return (
    <div className='p-4'>
      <AddModul />
      <ModulList />
    </div>
  )
}