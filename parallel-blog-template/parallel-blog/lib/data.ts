import { Article, HardwareSpec } from "@/types";

export const PROJECT_META = {
  title: "Computación Paralela & Sistemas Distribuidos",
  shortTitle: "CompPar Lab",
  institution: "Universidad del Istmo",
  faculty: "Ingeniería en Computación",
  semester: "Primavera 2025",
  mentor: {
    name: "Dr. J. Jesùs Arellano Pimentel",
    role: "Profesor Titular & Mentor de Investigación",
  },
  members: [
    { name: "Jeycson Hernández", role: "Investigador Principal" },
    { name: "Jeovani Pacheco Rueda", role: "Investigador SNII III" },
    { name: "Mariana Palacios Trinidad", role: "Investigador" },
    { name: "Jairo Iván Hipolito Morales", role: "Investigador" },
  ],
  abstract:
    "Este proyecto documenta una serie de experimentos controlados sobre el comportamiento de aplicaciones de cómputo intensivo bajo distintos paradigmas de paralelismo: SIMD, OpenMP, hilos POSIX y CPython. Evaluamos SpeedUp, eficiencia y overhead en entornos de hardware heterogéneo, con el objetivo de establecer métricas reproducibles y recomendaciones prácticas para el diseño de software de alto rendimiento.",
  githubUrl: "https://github.com/Jeycson/el-blog-del-paralelismo.git",
};

export const HARDWARE_SPECS: HardwareSpec[] = [
  {
    id: "env-a",
    name: "Entorno A — Laptop 1 (Windows)",
    role: "laptop",
    cpu: "Intel Core i5-1135G7",
    cores: 4,
    threads: 8,
    cacheL1: "80 KB × 4 núcleos",
    cacheL2: "1.25 MB × 4 núcleos",
    cacheL3: "8.0 MB compartida",
    ram: "20 GB DDR4-3200",
    os: "Windows 11 Home Single Language, Edición 25H2, Versión 26200.8457, Nativo de 64 bits",
    notes: "Hyperthreading habilitado durante todas las pruebas. Ejecución nativa.",
  },
  {
    id: "env-b",
    name: "Entorno B — Laptop 1 (Fedora)",
    role: "laptop",
    cpu: "Intel Core i5-1135G7",
    cores: 4,
    threads: 8,
    cacheL1: "80 KB × 4 núcleos",
    cacheL2: "1.25 MB × 4 núcleos",
    cacheL3: "8.0 MB compartida",
    ram: "20 GB DDR4-3200",
    os: "Fedora Workstation 34, GNOME Version 40, Kernel Version Linux 5.11.12-300, Nativo",
    notes: "Hyperthreading habilitado durante todas las pruebas. Ejecución nativa.",
  },
  {
    id: "env-c",
    name: "Entorno C — Laptop 2 (Windows)",
    role: "laptop",
    cpu: "CPU AMD Ryzen 5 7520U with Radeon Graphics (2.80 GHz)",
    cores: 4,
    threads: 8,
    cacheL1: "256kb",
    cacheL2: "2.0Mb",
    cacheL3: "4.0Mb",
    ram: "8 GB DDR4-3200",
    os: "Windows 11 Home Single Language, Edición 25H2, Versión 26200.8039, Serie PF4DXH1X",
    notes: "SO instalado de forma nativa",
  },
  {
    id: "env-d",
    name: "Entorno D — Laptop 2 (Ubuntu)",
    role: "laptop",
    cpu: "AMD Ryzen 5 7520U",
    cores: 4,
    threads: 8,
    cacheL1: "32 KB (datos) × 4 núcleos", 
    cacheL2: "512 KB × 4 núcleos",
    cacheL3: "4.0 MB compartida",
    ram: "16 GB LPDDR5",
    os: "Ubuntu 24.04.4 LTS, GNOME Version 46, Kernel Version Linux 6.17.0-20-generic, Nativo",
    notes: "SMT habilitado. Firmware Version L1CN30WW. Ejecución nativa.",
  },
];

export const ARTICLES: Article[] = [
  {
    slug: "caso-a-variacion-carga",
    title: "Caso A: Variación de Carga de Trabajo",
    subtitle:
      "¿Cómo se van a comportar los tiempos de ejecución si se mantiene el código, pero se varía el tamaño de la imagen a procesar, en cada configuración? Y ¿existe una variación y si existe cómo se podría explicar tal variación observada? ",
    category: "Análisis de Rendimiento",
    tags: ["OpenMP", "SIMD", "Python"],
    authors: [
      {
        name: "Jeycson Gabriel López Hernández",
        role: "Estudiante de Ing. en Computación",
        institution: "UNISTMO",
      }
    ],
    date: "2026-06-06",
    readingTime: 12,
    abstract:
      "Exploramos cómo el tamaño del dataset afecta el rendimiento de implementaciones paralelas en OpenMP, SIMD y Python. Encontramos que entre mayor es el tamaño de la imagen, mayor es el tiempo de procesamiento que le tomara a cada configuración.",
    hardware: ["env-b"],
  },
  {
    slug: "caso-b-overhead-hilos",
    title: "Caso B: Overhead de Creación de Hilos",
    subtitle: "Cuantificación del costo de pthread_create vs. thread pools en cargas variables",
    category: "Sistemas de Hilos",
    tags: ["POSIX Threads", "Thread Pool", "Latencia", "Overhead", "Linux", "OpenMP", "SIMD", "Python"],
    authors: [
      {
        name: "Jeovani Pacheco Rueda",
        role: "Investigador SNII III",
        institution: "Unistmo",
      },
    ],
    date: "2026-06-07",
    readingTime: 9,
    abstract: "Medimos con nanosegundos de precisión el costo de creación, sincronización y destrucción de hilos POSIX frente a un pool pre-inicializado. Los resultados muestran diferencias de hasta 3× en cargas de trabajo de corta duración.",
    hardware: ["env-a"],
  },
  {
    slug: "caso-c-gil-python",
    title: "Caso C: GIL de Python y Cómputo Numérico",
    subtitle:
      "Por qué threading de CPython no escala y cuándo multiprocessing es la respuesta",
    category: "Lenguajes de Alto Nivel",
    tags: ["Python", "GIL", "multiprocessing", "NumPy", "Profiling"],
    authors: [
      {
        name: "Valeria Torres Cruz",
        role: "Investigadora",
        institution: "BUAP",
      },
      {
        name: "Marco A. Pérez Leal",
        role: "Investigador",
        institution: "BUAP",
      },
    ],
    date: "2025-04-10",
    readingTime: 14,
    abstract:
      "Un análisis riguroso del Global Interpreter Lock de CPython. Demostramos bajo qué condiciones el threading introduce regresiones de rendimiento y establecemos un árbol de decisión para elegir entre threading, multiprocessing y NumPy vectorizado.",
    hardware: ["env-a", "env-b", "env-c"],
  },
  {
    slug: "caso-d-cache-misses",
    title: "Caso D: Fallos de Caché y Localidad de Datos",
    subtitle:
      "Análisis de acceso a memoria con perf y Valgrind/Cachegrind en algoritmos de álgebra lineal",
    category: "Arquitectura de Memoria",
    tags: ["Cache", "perf", "Cachegrind", "BLAS", "Localidad"],
    authors: [
      {
        name: "Jeycson Hernández",
        role: "Investigador Principal",
        institution: "BUAP",
      },
    ],
    date: "2025-04-22",
    readingTime: 16,
    abstract:
      "Utilizamos perf stat y Cachegrind para perfilar la tasa de L1/L2/L3 cache misses en implementaciones naive vs. optimizadas de multiplicación de matrices. El tiling por bloques reduce las faltas de L3 hasta un 87%.",
    hardware: ["env-a", "env-c"],
  },
];
