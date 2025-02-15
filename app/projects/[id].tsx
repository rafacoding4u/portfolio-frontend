"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// 🆕 Interfaz para los proyectos
interface Project {
  id: number;
  title: string;
  description: string;
  tech_stack: string;
  github_link?: string;
  live_demo?: string;
  image_url?: string;
  tags?: string;
  created_at?: string;
  updated_at?: string;
  client_name?: string;
  project_type?: string;
  duration?: string;
}

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<Project | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchProject() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/projects/${params.id}`
        );
        setProject(response.data);
      } catch (error) {
        console.error("Error al obtener el proyecto:", error);
        router.push("/projects"); // Redirige a la lista si el proyecto no existe
      }
    }

    fetchProject();
  }, [params.id, router]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-300 text-xl">
          Cargando proyecto...
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen py-10 px-6 md:px-12 max-w-3xl mx-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
    >
      {/* Imagen del Proyecto */}
      {project.image_url && (
        <Image
          src={project.image_url}
          alt={project.title}
          width={600}
          height={300}
          className="w-full h-auto rounded-lg shadow-lg mb-6"
        />
      )}

      {/* Título */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        {project.title}
      </h1>

      {/* Descripción */}
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        {project.description}
      </p>

      {/* Información adicional */}
      <div className="text-sm text-gray-500 mb-4">
        <p>📅 Creado: {project.created_at ? new Date(project.created_at).toLocaleDateString() : "No especificado"}</p>
        <p>🕒 Duración: {project.duration || "No especificado"}</p>
        <p>🛠️ Tecnologías: {project.tech_stack}</p>
      </div>

      {/* Etiquetas */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags &&
          JSON.parse(project.tags).map((tag: string, index: number) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
      </div>

      {/* Enlaces */}
      <div className="mt-4 flex gap-3">
        {project.github_link && (
          <a
            href={project.github_link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:shadow-lg flex items-center gap-2"
          >
            🔗 Ver Código
          </a>
        )}

        {project.live_demo && (
          <a
            href={project.live_demo}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:shadow-lg flex items-center gap-2"
          >
            🌐 Ver Demo
          </a>
        )}
      </div>

      {/* Botón Volver */}
      <div className="mt-6">
        <Link href="/projects">
          <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition">
            ⬅ Volver a Proyectos
          </button>
        </Link>
      </div>
    </motion.div>
  );
}
