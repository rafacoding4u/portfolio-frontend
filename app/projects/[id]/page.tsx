"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { NextSeo } from "next-seo";

// 🔥 Carga diferida de ReactPlayer y Swiper
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
const Swiper = dynamic(() => import("swiper/react").then((mod) => mod.Swiper), { ssr: false });
const SwiperSlide = dynamic(() => import("swiper/react").then((mod) => mod.SwiperSlide), { ssr: false });

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css"; // Importa los estilos

// 🆕 Interfaz para los proyectos con imágenes
interface Project {
  id: number;
  title: string;
  description: string;
  tech_stack: string;
  github_link?: string;
  live_demo?: string;
  video_url?: string; // ✅ Agregado para incluir la URL del video
  image_url?: string;
  tags?: string[];
  featured: boolean;
  created_at?: string;
  updated_at?: string;
  client_name?: string;
  project_type?: string;
  duration?: string;
  images?: { id: number; image_url: string }[];
}

export default function ProjectDetail() {
  const [project, setProject] = useState<Project | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const router = useRouter();
  const params = useParams();

  // 🔥 Detectar modo oscuro del sistema
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(prefersDark);
  }, []);

  useEffect(() => {
    if (!params.id) {
      console.error("⚠️ Error: params.id es undefined");
      return;
    }

    async function fetchProject() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/projects/${params.id}`
        );
        setProject(response.data);
      } catch (error) {
        console.error("❌ Error al obtener el proyecto:", error);
        router.push("/projects");
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
  // ✅ Función para convertir URL de YouTube a formato embebido
  const formatYouTubeUrl = (url: string): string | null => {
    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.hostname.includes("youtube.com")) {
        return `https://www.youtube.com/embed/${parsedUrl.searchParams.get("v")}`;
      } else if (parsedUrl.hostname.includes("youtu.be")) {
        return `https://www.youtube.com/embed/${parsedUrl.pathname.substring(1)}`;
      }
    } catch (error) {
      console.error("❌ Error al formatear la URL de YouTube:", error);
    }
    return null; // Si no es un enlace válido de YouTube, devolvemos null
  };

  return (
    <motion.div
      className={`min-h-screen py-10 px-6 md:px-12 max-w-3xl mx-auto transition-all duration-500 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
    >
      {/* ✅ Botón para alternar Modo Oscuro */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-5 right-5 px-4 py-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 transition"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

      {/* ✅ SEO Dinámico */}
      <NextSeo
        title={project.title}
        description={project.description}
        openGraph={{
          title: project.title,
          description: project.description,
          images: project.images?.length
            ? project.images.map((img) => ({ url: img.image_url, width: 800, height: 600 }))
            : [{ url: project.image_url || "", width: 800, height: 600 }],
          url: `https://tuportafolio.com/projects/${project.id}`,
          type: "website",
        }}
      />

      {/* ✅ Imagen Principal con Lazy Loading */}
      {project.image_url && (
        <Image
          src={project.image_url || "/default-placeholder.jpg"}
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

      {/* ✅ Etiquetas del proyecto */}
      {Array.isArray(project.tags) && project.tags.length > 0 ? (
        <div className="flex flex-wrap gap-2 mt-2">
          {project.tags.map((tag, index) => (
            <span key={index} className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm">
              {tag}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No hay etiquetas disponibles.</p>
      )}


      {/* ✅ Carrusel de imágenes con Lazy Loading */}
      {(() => {
        console.log("📸 Imágenes cargadas en el frontend:", project.images); // ✅ Mover fuera del JSX
        return project.images && project.images.length > 0 ? (
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
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center">No hay imágenes disponibles para este proyecto.</p>
        );
      })()}

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
                <Zoom>
                  <Image
                    src={img.image_url}
                    alt={`Imagen del proyecto ${project.title}`}
                    width={800}
                    height={400}
                    className="w-full h-auto rounded-lg shadow-md"
                    loading="lazy"
                  />
                </Zoom>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* ✅ Video de demostración con botón de carga diferida */}
      {project.video_url && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">🎥 Video de Demostración</h3>
          {!showVideo ? (
            <button
              onClick={() => setShowVideo(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              ▶️ Ver Video
            </button>
          ) : project.video_url.includes("youtube.com") || project.video_url.includes("youtu.be") ? (
            <div className="relative w-full aspect-video">
              <iframe
                src={formatYouTubeUrl(project.video_url) || ""}
                title="Video de demostración"
                allowFullScreen
                className="w-full h-full rounded-lg shadow-lg"
              ></iframe>
            </div>
          ) : (
            <ReactPlayer url={project.video_url} controls width="100%" />
          )}
        </div>
      )}




      {/* ✅ Enlaces */}
      <div className="mt-4 flex gap-3">
        {project.github_link && (
          <a href={project.github_link} target="_blank" rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:shadow-lg flex items-center gap-2">
            🔗 Ver Código
          </a>
        )}

        {project.live_demo && (
          <a href={project.live_demo} target="_blank" rel="noopener noreferrer"
            className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:shadow-lg flex items-center gap-2">
            🌐 Ver Demo
          </a>
        )}
      </div>

      {/* 📢 Botones de Compartir en Redes Sociales */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">📤 Compartir</h3>
        <div className="flex gap-3">
          <a href={`https://twitter.com/intent/tweet?url=https://tuportafolio.com/projects/${project.id}&text=${project.title}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
            🐦 Twitter
          </a>
          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=https://tuportafolio.com/projects/${project.id}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800">
            🔗 LinkedIn
          </a>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=https://tuportafolio.com/projects/${project.id}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-blue-800 text-white rounded-lg shadow-md hover:bg-blue-900">
            📘 Facebook
          </a>
        </div>
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
