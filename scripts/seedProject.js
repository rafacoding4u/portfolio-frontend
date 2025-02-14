// ✅ Seed para proyecto 'Las Cuentas Claras'
// Inserta automáticamente el proyecto actualizado en tu portafolio.

import axios from 'axios';

// Proyecto actualizado con nuevas propiedades
const projectData = {
  title: 'Las Cuentas Claras',
  description: 'Aplicación web financiera para gestionar ingresos y gastos personales, familiares y grupales.',
  tech_stack: 'PHP, MySQL, Bootstrap, Chart.js, AJAX',
  github_link: 'https://github.com/tuusuario/las-cuentas-claras',
  live_demo: 'https://www.lacuentaclara.com',
  image_url: 'https://www.lacuentaclara.com/logo.png',
  tags: ['Finanzas', 'WebApp', 'PHP'],
  featured: true,
};

// Enviar a la API (Ajusta la URL si es necesario)
async function insertarProyecto() {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/projects', projectData);
    console.log('✅ Proyecto agregado correctamente:', response.data);
  } catch (error) {
    console.error('❌ Error al agregar el proyecto:', error.response?.data || error.message);
  }
}

insertarProyecto();

