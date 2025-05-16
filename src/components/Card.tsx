"use client"

import { Link } from "react-router-dom";
import type { Exercise } from "../types/exercise";
import { useFavorites } from "../hooks/useFavorites";

export default function HomeCard ({exercise}: {exercise : Exercise}) {
      const { toggleFavorite, isFavorite } = useFavorites();
    return (
        <>
        <Link
            key={exercise.id}
            to={`/exercise/${exercise.id}`}
            className="overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group block"
          >
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <img 
                src={exercise.gifUrl} 
                alt={exercise.name} 
                className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110" 
                loading="lazy"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  toggleFavorite(exercise);
                }}
                className="absolute z-20 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg top-4 right-4 transition-all duration-300 
                  hover:bg-white group-hover:scale-110"
                aria-label={isFavorite(exercise.id) ? "Favorilerden çıkar" : "Favorilere ekle"}
              >
                {isFavorite(exercise.id) ? 
                  <span className="text-xl">❤️</span> : 
                  <span className="text-xl text-gray-300 hover:text-red-500">🤍</span>}
              </button>
            </div>
            <div className="p-5">
              <h3 className="text-base font-bold text-gray-800 mb-3 truncate">{exercise.name}</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-full border border-blue-100">
                  {exercise.target}
                </span>
                <span className="px-2.5 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-full border border-green-100">
                  {exercise.equipment}
                </span>
              </div>
            </div>
          </Link>
        </>
    )
}