"use client";

export default function ProductFilters({setCategory,setSort}){

  return(

    <div className="flex gap-4 mb-6">

      <select
        onChange={(e)=>setCategory(e.target.value)}
        className="border px-3 py-2 rounded"
      >

        <option value="">All Categories</option>
        <option value="rice">Rice</option>
        <option value="combo">Combo</option>
        <option value="dal">Dal</option>

      </select>

      <select
        onChange={(e)=>setSort(e.target.value)}
        className="border px-3 py-2 rounded"
      >

        <option value="">Sort</option>
        <option value="price-low">Price Low → High</option>
        <option value="price-high">Price High → Low</option>

      </select>

    </div>

  );

}