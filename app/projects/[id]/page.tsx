"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ReactPlayer from "react-player";
import { Swiper, SwiperSlide } from "swiper/react"; // Importar Swiper
import "swiper/css"; // Importar estilos básicos de Swiper
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

// 🆕 Interfaz para los proyectos con imágenes
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
  images?: { id: number; image_url: string }[]; // Relación con imágenes
}

export default function ProjectDetail() {
  const [project, setProject] = useState<Project | null>(null);
  const router = useRouter();
  const params = useParams(); // Next.js maneja params con useParams()

  useEffect(() => {
    console.log("🛠️ params.id recibido en frontend:", params.id);
  }, [params.id]);

  useEffect(() => {
    async function fetchProject() {
      if (!params.id) return;

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/projects/${params.id}`
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
      {/* Imagen Principal con Lazy Loading */}
      {project.image_url && (
        <Image
          src={project.image_url}
          alt={project.title}
          width={600}
          height={300}
          className="w-full h-auto rounded-lg shadow-lg mb-6"
          loading="lazy"
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

      {/* 🔥 Carrusel de imágenes adicionales con Swiper.js */}
      {project.images && project.images.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">📸 Imágenes del Proyecto</h3>
          <Swiper
            navigation
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
            className="rounded-lg shadow-lg"
          >
            {project.images.map((img) => (
              <SwiperSlide key={img.id}>
                <Image
                  src={img.image_url}
                  alt={`Imagen del proyecto ${project.title}`}
                  width={800}
                  height={400}
                  className="w-full h-auto rounded-lg shadow-md"
                  loading="lazy"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* 🔥 Video de demostración (opcional) */}
      {project.live_demo && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">🎥 Video de Demostración</h3>
          <ReactPlayer url={project.live_demo} controls width="100%" />
        </div>
      )}

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
