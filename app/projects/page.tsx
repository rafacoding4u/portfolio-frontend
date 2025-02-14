"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  MoonIcon,
  SunIcon,
  CodeBracketIcon,
  PlayIcon,
  PlusIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import AddProject from "@/app/projects/AddProject";

// Animaciones
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const scaleHover = {
  whileHover: { scale: 1.05, transition: { duration: 0.3 } },
};

interface Project {
  id: number;
  title: string;
  description: string;
  tech_stack: string;
  github_link: string;
  live_demo: string;
}

export default function Projects() {
  // Nuevo estado para guardar tu email
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
    console.log("✅ authToken LocalStorage:", token);

    const email = localStorage.getItem("userEmail");
    setUserEmail(email);

    // ✅ Verificación de estados directamente en la consola:
    console.log("✅ isAuthenticated:", isAuthenticated);
    console.log("✅ userEmail:", userEmail);
    console.log("✅ userEmail Trimmed:", userEmail?.trim().toLowerCase());
    console.log(
      "✅ Comparación con 'rafacoding4u@gmail.com':",
      userEmail?.trim().toLowerCase() === "rafacoding4u@gmail.com"
    );

    fetchProjects();
  }, [isAuthenticated, userEmail]);




  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/projects");
      setProjects(response.data);
    } catch (error) {
      console.error("Error al obtener los proyectos:", error);
    }
  };

  // Lista de tecnologías más usadas
  const allTechs = [
    "JavaScript", "TypeScript", "React", "Next.js", "Vue.js", "Angular",
    "PHP", "Laravel", "Node.js", "Express.js", "Python", "Django",
    "Flask", "Ruby on Rails", "Spring Boot", "C#", "ASP.NET", "Go",
    "Rust", "Swift", "Kotlin", "Flutter", "React Native",
    "Tailwind CSS", "Bootstrap",
  ];

  // Filtrar tecnologías según búsqueda
  const filteredTechs = allTechs.filter((tech) =>
    tech.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filtrar proyectos por tecnologías seleccionadas
  const filteredProjects =
    selectedFilters.length === 0
      ? projects
      : projects.filter((project) =>
        selectedFilters.some((filter) =>
          project.tech_stack.toLowerCase().includes(filter.toLowerCase())
        )
      );

  // Manejo de selección de filtros
  const toggleFilter = (tech: string) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(tech)
        ? prevFilters.filter((f) => f !== tech)
        : [...prevFilters, tech]
    );
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center py-10 px-6 md:px-12 transition-all duration-500 font-elegant 
      ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}
      `}
    >
      {/* Botón de Dark Mode */}
      <button
        className="absolute top-5 right-5 p-2 md:p-3 rounded-full bg-gray-300 dark:bg-gray-700 hover:scale-105 transition-all duration-300"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? (
          <SunIcon className="h-5 w-5 text-yellow-400" />
        ) : (
          <MoonIcon className="h-5 w-5 text-gray-800" />
        )}
      </button>

      {/* Título con animación */}
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold mb-8 md:mb-12 text-center"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        🚀 Mis Proyectos
      </motion.h1>

      {/* Verificar estados directamente */}
      {(() => {
        console.log("✅ isAuthenticated:", isAuthenticated);
        console.log("✅ userEmail:", userEmail);
        console.log("✅ userEmail Trimmed:", userEmail?.trim().toLowerCase());
        console.log(
          "✅ Comparación con 'rafacoding4u@gmail.com':",
          userEmail?.trim().toLowerCase() === "rafacoding4u@gmail.com"
        );
        return null; // Devuelve null para evitar errores en React
      })()}


      {/* Mostrar formulario solo si eres tú */}
      {isAuthenticated && userEmail?.trim().toLowerCase() === "rafacoding4u@gmail.com" && (
        <>
          <button
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            onClick={() => setShowForm(!showForm)}
          >
            <PlusIcon className="h-5 w-5" />{" "}
            {showForm ? "Ocultar Formulario" : "Añadir Proyecto"}
          </button>

          {showForm && <AddProject onProjectAdded={fetchProjects} />}
        </>
      )}



      {/* Menú de filtros */}
      <div className="mt-6 relative">
        <button
          className="flex items-center bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-300"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          Filtrar por Tecnología <ChevronDownIcon className="h-5 w-5 ml-2" />
        </button>

        {/* Lista desplegable */}
        {isDropdownOpen && (
          <div className="absolute top-12 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-md z-10 p-4">
            {/* Buscador de tecnologías */}
            <input
              type="text"
              placeholder="Buscar tecnología..."
              className="w-full p-2 border rounded-md mb-3 dark:bg-gray-700 dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Lista de tecnologías */}
            <div className="max-h-60 overflow-y-auto">
              {filteredTechs.length > 0 ? (
                filteredTechs.map((tech) => (
                  <div
                    key={tech}
                    className={`flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 
                    ${selectedFilters.includes(tech)
                        ? "bg-blue-500 text-white"
                        : "text-gray-900 dark:text-gray-100"
                      }`}
                    onClick={() => toggleFilter(tech)}
                  >
                    {tech}
                    {selectedFilters.includes(tech) && <XMarkIcon className="h-4 w-4" />}
                  </div>
                ))
              ) : (
                <p className="px-4 py-2 text-gray-500">No hay coincidencias</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Grid de proyectos con botones restaurados */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mt-8"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.2 }}
      >

        {filteredProjects.map((project) => (
          <motion.div
            key={project.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-300 transition-all duration-300 hover:shadow-2xl"
            variants={fadeInUp}
            {...scaleHover}
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{project.title}</h2>
            <p className="text-gray-700 dark:text-gray-300">{project.description}</p>
            <div className="mt-4 flex gap-3">
              <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                <CodeBracketIcon className="h-5 w-5" /> Ver Código
              </a>
              <a href={project.live_demo} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                <PlayIcon className="h-5 w-5" /> Ver Demo
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
