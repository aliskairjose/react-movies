import Search from "../components/Search";

export default function Result() {
  
  return(
    <div className="flex gap-5">
      <aside className="w-[320px] h-[400px] border border-amber-600 rounded-lg m-0 p-0">
        <div className="p-4 h-24 bg-amber-600 border rounded-t-lg text-lg text-white font-semibold">
          {"Resultados de la búsqueda"}
        </div>
      </aside>
      <main className="w-full border border-amber-600 rounded">Main</main>
    </div>
  )
}
