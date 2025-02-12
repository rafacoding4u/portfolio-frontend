"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion"; // Animaciones
import { MoonIcon, SunIcon, CodeBracketIcon, PlayIcon } from "@heroicons/react/24/solid"; // Íconos de HeroIcons

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
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen flex flex-col items-center py-12 px-6 transition-all duration-500`}>

      {/* Botón de Dark Mode */}
      <button
        className="absolute top-5 right-5 p-3 rounded-full bg-gray-300 dark:bg-gray-700 hover:scale-110 transition-all duration-300"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? <SunIcon className="h-6 w-6 text-yellow-400" /> : <MoonIcon className="h-6 w-6 text-gray-800" />}
      </button>

      {/* Título */}
      <h1 className="text-5xl font-extrabold mb-10 text-center">🚀 Mis Proyectos</h1>

      {/* Grid de proyectos con Glassmorphism */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className="p-6 bg-white/30 dark:bg-gray-800/50 backdrop-blur-lg rounded-lg shadow-lg border border-white/20 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            whileHover={{ scale: 1.05 }}
          >
            {/* Título del Proyecto */}
            <h2 className="text-2xl font-semibold">{project.title}</h2>
            <p className="text-gray-700 dark:text-gray-300 mt-2">{project.description}</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-2"><strong>Tecnologías:</strong> {project.tech_stack}</p>

            {/* Botones con Neumorfismo */}
            <div className="mt-4 flex gap-4">
              {project.github_link && (
                <a
                  href={project.github_link}
                  className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CodeBracketIcon className="h-5 w-5" /> Ver Código
                </a>
              )}
              {project.live_demo && (
                <a
                  href={project.live_demo}
                  className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <PlayIcon className="h-5 w-5" /> Ver Demo
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
