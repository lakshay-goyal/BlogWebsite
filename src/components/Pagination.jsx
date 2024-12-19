import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Pagination() {
  const { page, handlePageChange, totalPages } = useContext(AppContext);

  if (!totalPages) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 bg-white/90 backdrop-blur-sm border-t border-gray-200 shadow-lg">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex gap-2">
          {page > 1 && (
            <button
              onClick={() => handlePageChange(page - 1)}
              className="px-4 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 text-sm font-medium transition-colors"
            >
              ← Previous
            </button>
          )}
          {page < totalPages && (
            <button
              onClick={() => handlePageChange(page + 1)}
              className="px-4 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 text-sm font-medium transition-colors"
            >
              Next →
            </button>
          )}
        </div>
        <p className="text-sm text-gray-600">
          Page <span className="font-semibold text-gray-900">{page}</span> of{" "}
          <span className="font-semibold text-gray-900">{totalPages}</span>
        </p>
      </div>
    </div>
  );
}