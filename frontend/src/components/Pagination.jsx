export default function Pagination({ page, pages, onPageChange }) {
  if (pages <= 1) return null;

  // Build page number array with ellipsis logic
  const getPages = () => {
    if (pages <= 5) return [...Array(pages)].map((_, i) => i + 1);
    if (page <= 3) return [1, 2, 3, "...", pages];
    if (page >= pages - 2) return [1, "...", pages - 2, pages - 1, pages];
    return [1, "...", page - 1, page, page + 1, "...", pages];
  };

  return (
    <div className="flex justify-center items-center gap-1.5 mt-10">

      {/* Prev */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Page numbers */}
      {getPages().map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
              page === p
                ? "bg-blue-600 text-white shadow-sm"
                : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            {p}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === pages}
        className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}


// export default function Pagination({ page, pages, onPageChange }) {
//   if (pages <= 1) return null;

//   return (
//     <div className="flex justify-center items-center gap-2 mt-6">
//       {/* Prev */}
//       <button
//         onClick={() => onPageChange(page - 1)}
//         disabled={page === 1}
//         className="px-3 py-1 border rounded disabled:opacity-50"
//       >
//         Prev
//       </button>

//       {/* tis is page numbers */}
      
//       {[...Array(pages)].map((_, i) => (
//         <button
//           key={i} 
//           onClick={() => onPageChange(i + 1)}
//           className={`px-3 py-1 border rounded ${
//             page === i + 1
//               ? "bg-black text-white"
//               : "bg-white text-black"
//           }`}
//         >
//           {i + 1}
//         </button>
//       ))}
    

//       {/* Next */}
//       <button
//         onClick={() => onPageChange(page + 1)}
//         disabled={page === pages}
//         className="px-3 py-1 border rounded disabled:opacity-50"
//       >
//         Next
//       </button>
//     </div>
//   );
// } 


