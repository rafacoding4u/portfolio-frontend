"use client";
import { useEffect, useState } from "react";
import axios from "axios";

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

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/projects")
      .then(response => setProjects(response.data))
      .catch(error => console.error("Error al obtener los proyectos:", error));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Mis Proyectos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="p-4 border rounded-lg shadow-lg bg-white">
            <h2 className="text-xl font-semibold">{project.title}</h2>
            <p className="text-gray-600">{project.description}</p>
            <p className="text-sm"><strong>Tecnologías:</strong> {project.tech_stack}</p>
            <div className="mt-2">
              {project.github_link && (
                <a href={project.github_link} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                  Ver Código
                </a>
              )}
              {project.live_demo && (
                <a href={project.live_demo} className="text-green-500 hover:underline ml-4" target="_blank" rel="noopener noreferrer">
                  Ver Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
