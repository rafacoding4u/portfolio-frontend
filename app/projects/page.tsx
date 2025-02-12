"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { MoonIcon, SunIcon, CodeBracketIcon, PlayIcon } from "@heroicons/react/24/solid";

interface Project {
  id: number;
  title: string;
  description: string;
  tech_stack: string;
  github_link: string;
  live_demo: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/projects")
      .then((response) => setProjects(response.data))
      .catch((error) => console.error("Error al obtener los proyectos:", error));
  }, []);

  return (
    <div className={`${darkMode ? "bg-darkBg text-white" : "bg-secondary text-primary"} min-h-screen flex flex-col items-center py-10 px-4 md:px-12 transition-all duration-500 font-elegant`}>
      
      {/* Botón de Dark Mode */}
      <button 
        className="absolute top-5 right-5 p-2 md:p-3 rounded-full bg-gray-300 dark:bg-gray-700 hover:scale-105 transition-all duration-300"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? <SunIcon className="h-5 w-5 md:h-6 md:w-6 text-yellow-400" /> : <MoonIcon className="h-5 w-5 md:h-6 md:w-6 text-gray-800" />}
      </button>

      {/* Título */}
      <h1 className="text-3xl md:text-5xl font-extrabold mb-8 md:mb-12 text-center text-accent">🚀 Mis Proyectos</h1>

      {/* Grid de proyectos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
        {projects.map((project) => (
          <motion.div 
            key={project.id} 
            className={`${darkMode ? "bg-darkCard" : "bg-white"} p-4 md:p-6 rounded-lg shadow-md border border-gray-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
            whileHover={{ scale: 1.03 }}
          >
            {/* Título del Proyecto */}
            <h2 className="text-lg md:text-xl font-semibold">{project.title}</h2>
            <p className="text-gray-700 dark:text-gray-300 mt-2 text-sm md:text-base">{project.description}</p>
            <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm mt-2"><strong>Tecnologías:</strong> {project.tech_stack}</p>
            
            {/* Botones estilizados */}
            <div className="mt-4 flex gap-3 md:gap-4">
              {project.github_link && (
                <a 
                  href={project.github_link} 
                  className="flex items-center gap-1 px-3 py-1 md:px-4 md:py-2 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white text-sm md:text-base font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <CodeBracketIcon className="h-4 w-4 md:h-5 md:w-5" /> Ver Código
                </a>
              )}
              {project.live_demo && (
                <a 
                  href={project.live_demo} 
                  className="flex items-center gap-1 px-3 py-1 md:px-4 md:py-2 bg-gradient-to-r from-green-500 to-green-700 text-white text-sm md:text-base font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <PlayIcon className="h-4 w-4 md:h-5 md:w-5" /> Ver Demo
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

