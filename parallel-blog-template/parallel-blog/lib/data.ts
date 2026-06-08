import { Article, HardwareSpec, HypothesisQuestion } from "@/types";

export const PROJECT_META = {
  title: "Computación Paralela & Sistemas Distribuidos",
  shortTitle: "Universidad del Istmo - Campus Tehuantepec",
  institution: "Universidad del Istmo",
  faculty: "Ingeniería en Computación",
  semester: "Ciclo 2025-2026 B",
  mentor: {
    name: "Dr. J. Jesús Arellano Pimentel",
    role: "Doctor en Educación con Tecnologías del Aprendizaje y el Conocimiento - Profesor Titular",
    photo : "/mentor.jpg", 
  },
  members: [
    { name: "Jeycson Gabriel López Hernández", role: "Estudiante Ing. Computación", photo: "/jeycson.jpg"},
    { name: "Jeovani Pacheco Rueda", role: "Estudiante Ing. Computación", photo: "/jeovani.jpg" },
    { name: "Mariana Palacios Trinidad", role: "Estudiante Ing. Computación", photo: "/mariana.jpg" },
    { name: "Jairo Iván Hipolito Morales", role: "Estudiante Ing. Computación", photo: "/jairo.jpg" },
  ],
  abstract:
    "Este proyecto documenta una serie de experimentos controlados sobre el comportamiento de aplicaciones de cómputo intensivo bajo distintos paradigmas de paralelismo: SIMD, OpenMP, hilos POSIX y CPython. Evaluamos SpeedUp, eficiencia y overhead en entornos de hardware heterogéneo, con el objetivo de establecer métricas reproducibles y recomendaciones prácticas para el diseño de software de alto rendimiento.",
  githubUrl: "https://github.com/Jeycson/Analisis_Evaluacion_PPI",
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
    os: "Fedora Workstation 42, GNOME Version 48, Kernel Version Linux 6.14.6-300.fc42.x86_64, Nativo",
    notes: "Hyperthreading habilitado durante todas las pruebas. Ejecución nativa.",
  },
  {
    id: "env-c",
    name: "Entorno C — Laptop 2 (Windows)",
    role: "laptop",
    cpu: "AMD Ryzen 5 7520U with Radeon Graphics (2.80 GHz)",
    cores: 4,
    threads: 8,
    cacheL1: "256kb",
    cacheL2: "2.0Mb",
    cacheL3: "4.0Mb",
    ram: "8 GB DDR4-3200",
    os: "Windows 11 Home Single Language, Edición 25H2, Versión 26200.8039, Serie PF4DXH1X",
    notes: "Ejecución nativa",
  },
  {
    id: "env-d",
    name: "Entorno D — Laptop 2 (Ubuntu)",
    role: "laptop",
    cpu: "AMD Ryzen 5 7520U with Radeon Graphics (2.80 GHz)",
    cores: 4,
    threads: 8,
    cacheL1: "256kb",
    cacheL2: "2.0Mb",
    cacheL3: "4.0Mb",
    ram: "8 GB DDR4-3200",
    os: "Ubuntu 24.04.4 LTS, GNOME Version 46, Kernel Version Linux 6.17.0-20-generic",
    notes: "Firmware Version L1CN30WW. Ejecución nativa.",
  },
  {
    id: "env-e",
    name: "Entorno E — Laptop 3 (Windows)",
    role: "laptop",
    cpu: "13th Gen Intel(R) Core(TM) i3-1305U (1.60 GHz)",
    cores: 5,
    threads: 6,
    cacheL1: "464kb",
    cacheL2: "3.2Mb",
    cacheL3: "10.0Mb",
    ram: "8 GB LPDDR5",
    os: "Windows 11 Home Single Language, Edición 25H2, Versión 26200.8524, Serie PF4MAYP8",
    notes: "Ejecución nativa.",
  },
  {
    id: "env-f",
    name: "Entorno F — Laptop 3 (Fedora)",
    role: "workstation",
    cpu: "13th Gen Intel(R) Core(TM) i3-1305U x5",
    cores: 5,
    threads: 1,
    cacheL1: "160kb",
    cacheL2: "10.0Mb",
    cacheL3: "50.0Mb",
    ram: "4.8 GBi",
    os: "Fedora Linux 44 (Workstation Edition), GNOME Version 50, Kernel Version Linux 6.17.0-20-generic",
    notes: "Ejecución virtualizada.",
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
        role: "Estudiante de Ing. Computación",
        institution: "Unistmo",
      }
    ],
    date: "2026-06-6",
    readingTime: 12,
    abstract:
      "Exploramos cómo el tamaño del dataset afecta el rendimiento de implementaciones paralelas en OpenMP, SIMD y Python. Encontramos que entre mayor es el tamaño de la imagen, mayor es el tiempo de procesamiento que le tomara a cada configuración.",
    hardware: ["env-c"],
  },
  {
    slug: "caso-b-overhead-hilos",
    title: "Caso B: Variación de número de hilos con el mismo tamaño de imagen",
    subtitle: "Análisis de escalamiento fuerte, overhead de sincronización y el impacto del GIL bajo una carga de trabajo constante.",
    category: "Sistemas de Hilos",
    tags: ["POSIX Threads", "Thread Pool", "Latencia", "Overhead", "Linux", "OpenMP", "SIMD", "Python"],
    authors: [
      {
        name: "Jeovani Pacheco Rueda",
        role: "Estudiante de Ing. Computación",
        institution: "Unistmo",
      },
    ],
    date: "2026-06-07",
    readingTime: 9,
    abstract: "Medimos con nanosegundos de precisión el costo de creación, sincronización y destrucción de hilos POSIX.",
    hardware: ["env-a"],
  },
  {
    slug: "caso-c-comparacion-linux-virtualbox-windows11",
    title: "Caso C: Comparación de Tiempos de Ejecución: Linux en VirtualBox vs. Windows 11",
    subtitle:
      "¿Si Linux está ejecutándose en Virtual Box, que a su vez está instalada en Windows 11, cómo se espera que se comporte en los tiempos de ejecución de un sistema respecto a otro para una misma configuración de hilos y tamaño de imagen?",
    category: "Comparación de Sistemas Operativos",
    tags: ["OpenMP", "Python", "VirtualBox", "Windows 11", "Linux"],
    authors: [
      {
        name: "Mariana Palacios Trinidad",
        role: "Estudiante de Ing. Computación",
        institution: "Unistmo",
      },
    ],
    date: "2026-06-07",
    readingTime: 14,
    abstract:
    "Análisis comparativo del rendimiento entre Windows 11 nativo y Linux Fedora 43 ejecutado en VirtualBox. Utilizando OpenMP con dos hilos y una imagen de 2480×1860 píxeles, demostramos que la capa de virtualización introduce un overhead que incrementa los tiempos de ejecución y la variabilidad del sistema invitado, confirmando que el acceso directo al hardware proporciona un mejor desempeño.",
    hardware: ["env-e", "env-f",],
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
        name: "Jairo ",
        role: "Estudiante de Ing. Computación",
        institution: "Unistmo",
      },
    ],
    date: "2025-04-22",
    readingTime: 16,
    abstract:
      "Utilizamos perf stat y Cachegrind para perfilar la tasa de L1/L2/L3 cache misses en implementaciones naive vs. optimizadas de multiplicación de matrices. El tiling por bloques reduce las faltas de L3 hasta un 87%.",
    hardware: ["env-a", "env-c"],
  },
  {
    slug: "caso-e-speedup-so-variacion-carga",
    title: "Caso E: Variación de tamaño de la imagen con el mismo número de hilos en Windows y Linux",
    subtitle: "Evaluación del SpeedUp relativo entre Windows 11 y Linux al variar el tamaño de la imagen con un mismo esquema de paralelismo.",
    category: "Comparación de Sistemas Operativos",
    tags: ["Windows 11", "Ubuntu Linux", "SpeedUp", "OpenMP", "SIMD", "Python"],
    authors: [
      {
        name: "Jeycson Gabriel López Hernández",
        role: "Estudiante Ing. Computación",
        institution: "Unistmo",
      },
    ],
    date: "2026-06-07",
    readingTime: 30,
    abstract: "Este caso de estudio presenta un análisis comparativo del rendimiento y la escalabilidad de un algoritmo de procesamiento de brillo de imágenes en los sistemas operativos Windows 11 y Linux (Ubuntu). Se evalúan cuatro enfoques de ejecución sobre un procesador de 4 núcleos utilizando imágenes de diferentes resoluciones (mediana, grande y muy grande): una implementación secuencial, una optimizada con SIMD (instrucciones XMM), una paralelizada con OpenMP y una solución multihilo en Python. Los resultados demuestran que el Speedup tiende a incrementarse de manera proporcional al tamaño de la imagen debido a la amortización del overhead de gestión de hilos y al aprovechamiento del paralelismo a nivel de memoria (MLP). Asimismo, se evidencia un comportamiento diferenciado entre los sistemas operativos: mientras que Linux estabiliza su aceleración desde resoluciones medianas gracias a un kernel con llamadas de sistema optimizadas y un planificador eficiente, Windows exhibe un crecimiento de Speedup más drástico y tardío, penalizado inicialmente por una mayor sobrecarga en la creación de hilos y la asignación dinámica de memoria.",
    hardware: ["env-c", "env-d"], 
  },
  {
    slug: "caso-f-speedup-sistemas-operativos",
    title: "Caso F: Variación de número de hilos con el mismo tamaño de imagen en Windows y Linux",
    subtitle: "Evaluación del impacto del planificador de SO en factores de aceleración (SpeedUp)",
    category: "Análisis de Rendimiento",
    tags: ["Windows 11", "Fedora Linux", "SpeedUp", "Overhead", "GIL", "OpenMP", "SIMD"],
    authors: [
      {
        name: "Jeovani Pacheco Rueda",
        role: "Estudiante Ing. Computación",
        institution: "Unistmo",
      },
    ],
    date: "2026-06-07",
    readingTime: 12,
    abstract: "Este reporte evalúa el impacto crítico del planificador de procesos en Windows 11 frente a Linux al incrementar la densidad de hilos (de 2 a 16) bajo una carga de trabajo constante. Los resultados demuestran de forma empírica que mantener un tamaño de imagen fijo e intensivo induce pérdidas severas de eficiencia por overhead de sincronización a partir de los 4 hilos. Asimismo, se evidencia un falso espejismo de escalabilidad en entornos interpretados, donde Python bajo Linux registra un SpeedUp relativo de 1.66 debido a la profunda ineficiencia de su estado base , mientras que las implementaciones nativas en C (OpenMP y SIMD) mantienen el rendimiento absoluto óptimo por debajo del milisegundo.",
    hardware: ["env-a", "env-b"], 
  },
];

export const HYPOTHESIS_META = {
  title: "Hipótesis previas al experimento",
  description:
    "Antes de ejecutar las pruebas, cada integrante del equipo formuló su predicción para las seis preguntas de investigación. Las respuestas se registran sin modificaciones para poder contrastarlas con los resultados reales.",
  course: "Sistemas de Cómputo Paralelo y Distribuido",
  institution: "Universidad del Istmo — UNISTMO Tehuantepec",
  group: "Grupo 804 · Tercer Parcial · 30 de mayo de 2026",
  docente: "Dr. Jesús Arellano Pimentel",
};
 
export const HYPOTHESES: HypothesisQuestion[] = [
  {
    id: "q1",
    number: 1,
    question:
      "¿Cómo se van a comportar los tiempos de ejecución si se mantiene el código pero se varía el tamaño de la imagen a procesar en cada configuración? ¿Existe variación y cómo se explica?",
    entries: [
      {
        author: "Jeovani Pacheco",
        initials: "JP",
        response:
          "Lógicamente el tamaño afectará el rendimiento de cada hilo, ya que se trabaja con más datos. En cada configuración de hilos el rendimiento va a mejorar; es mejor tener 4 que solo 2 hilos. Pero puede que el incremento de tiempo ya no sea tan notorio para 16 hilos en comparación con 8, lo que significa que muchos hilos solo puede afectar a la CPU sin mejorar el tiempo.",
      },
      {
        author: "Jeycson López",
        initials: "JL",
        response:
          "El tiempo de ejecución va a estar ligado directamente con el tamaño de la imagen hasta cierto punto, donde aunque hagamos más o más pequeña la imagen se va a mantener un tiempo fijo. No creo que existan variaciones ya que es bastante determinista lo que va a pasar; es como tener que hacer un hoyo: si hay más trabajadores, se puede hacer más rápido para un tamaño fijo.",
      },
      {
        author: "Mariana Palacios",
        initials: "MP",
        response:
          "Tendría sentido que el tiempo de ejecución incremente debido al tamaño de la imagen por la cantidad de píxeles a procesar en cada incremento que se le haga a la misma.",
      },
      {
        author: "Jairo Hipólito",
        initials: "JH",
        response:
          "Con mayor tamaño de imagen el tiempo va a aumentar porque hay más que procesar. Sin embargo, el tiempo no subirá de forma exacta o limpia.",
      },
    ],
  },
  {
    id: "q2",
    number: 2,
    question:
      "¿Cómo se van a comportar los tiempos de ejecución al incrementar el número de hilos con un mismo tamaño de imagen a procesar?",
    entries: [
      {
        author: "Jeovani Pacheco",
        initials: "JP",
        response:
          "Los tiempos con los hilos mejorarán de manera progresiva, pero considero que en algún punto ese tiempo no será notorio en tanto a mejoría, y solo estaríamos forzando más a la CPU.",
      },
      {
        author: "Jeycson López",
        initials: "JL",
        response:
          "Los tiempos de ejecución se van a mantener más o menos similares sin importar cuántos hilos se levanten, ya que siempre se debe esperar hasta que el último hilo acabe de trabajar para contabilizar el tiempo total.",
      },
      {
        author: "Mariana Palacios",
        initials: "MP",
        response:
          "Los tiempos de ejecución desde cierto punto pueden ser mejores (más bajos), porque si se divide el trabajo se completaría con más facilidad. Pero el tiempo también puede estar ligado a la cantidad de núcleos: si solo tienes uno, mientras más ejecutes más división y más lento sería.",
      },
      {
        author: "Jairo Hipólito",
        initials: "JH",
        response:
          "Al principio meter más hilos es de ayuda porque se divide el trabajo. Pero con más hilos el tiempo ya no va a mejorar y puede que hasta empeore, porque la computadora va a gastar más tiempo organizando y mandando los pedacitos de imagen a cada hilo que lo que los hilos tardan en hacer el trabajo real.",
      },
    ],
  },
  {
    id: "q3",
    number: 3,
    question:
      "Si Linux está ejecutándose en VirtualBox sobre Windows 11, ¿cómo se espera que se comporte respecto al sistema nativo para una misma configuración de hilos y tamaño de imagen?",
    entries: [
      {
        author: "Jeovani Pacheco",
        initials: "JP",
        response:
          "No afectará el rendimiento de Windows, ya que en una máquina virtual se limita el número de núcleos que puede ocupar. Si configuro VB con 4 núcleos de mis 8 disponibles, ese será el límite: sigue funcionando normal, solo que el rendimiento no será completo.",
      },
      {
        author: "Jeycson López",
        initials: "JL",
        response:
          "Los tiempos van a ser peores en la máquina virtual, porque existe una capa de abstracción por la que la VM se comunica con el sistema. No es lo mismo que ejecutarlo completamente nativo y optimizado para el kernel de Linux.",
      },
      {
        author: "Mariana Palacios",
        initials: "MP",
        response:
          "Los tiempos de Windows 11 van a ser mejores. Las máquinas virtuales de por sí son más lentas ejecutando tareas comunes en comparación con lo que está instalado directamente en la máquina.",
      },
      {
        author: "Jairo Hipólito",
        initials: "JH",
        response:
          "Windows 11 va a ser más rápido que Linux en máquina virtual. Al estar instalado directamente, Windows puede usar todo el procesador sin pedirle permiso a nadie. En cambio, Linux en VirtualBox tiene que dar muchas vueltas para hacer una sola tarea.",
      },
    ],
  },
  {
    id: "q4",
    number: 4,
    question:
      "Si Windows está ejecutándose en VirtualBox sobre Linux, ¿cómo se espera que se comporte respecto al sistema nativo para una misma configuración de hilos y tamaño de imagen?",
    entries: [
      {
        author: "Jeovani Pacheco",
        initials: "JP",
        response:
          "Funcionará de manera similar a tener VB en Windows, pero aquí depende de quién corra mejor VirtualBox. Yo pensaría que Linux lo ejecuta de mejor manera.",
      },
      {
        author: "Jeycson López",
        initials: "JL",
        response:
          "Ejecutar Windows en VirtualBox sobre Linux es algo criminal. Los tiempos de ejecución van a ser incluso peores que si se tratara de una máquina virtual de Linux sobre Windows.",
      },
      {
        author: "Mariana Palacios",
        initials: "MP",
        response:
          "Los tiempos de Windows en este caso serán peores, por lo mismo que mencioné antes: las máquinas virtuales son más lentas. Además, Windows tiende a tener peores tiempos de ejecución y utiliza más recursos.",
      },
      {
        author: "Jairo Hipólito",
        initials: "JH",
        response:
          "El ganador sería el nativo, o sea Linux. Pasaría lo mismo que la pregunta anterior: una máquina virtual tiende a ser lenta. Además, Windows es un sistema que consume más recursos de por sí.",
      },
    ],
  },
  {
    id: "q5",
    number: 5,
    question:
      "¿Qué va a ocurrir con el SpeedUp a medida que se incremente el tamaño de las imágenes en cada sistema operativo, pero con el mismo número de hilos por prueba?",
    entries: [
      {
        author: "Jeovani Pacheco",
        initials: "JP",
        response:
          "De forma secuencial el tiempo va a aumentar, y pienso que el valor de SpeedUp va disminuyendo. Aunque usemos hilos, el trabajo mejora pero no siempre tiene un límite claro por el mismo número de hilos limitados.",
      },
      {
        author: "Jeycson López",
        initials: "JL",
        response:
          "A medida que se incremente el número de hilos en Linux e incrementen las imágenes, habrá mejores SpeedUp que en Windows. A medida que aumentamos los hilos se aligera la carga, aunque en Linux tal vez veamos SpeedUp mayores de 20× frente a 10× en Windows.",
      },
      {
        author: "Mariana Palacios",
        initials: "MP",
        response:
          "El SpeedUp puede aumentar en la forma secuencial, y quizás en la paralela también, pero en comparación con la secuencial se mantendrá un poco más abajo en ambos sistemas operativos.",
      },
      {
        author: "Jairo Hipólito",
        initials: "JH",
        response:
          "El SpeedUp va a ser mejor y más alto con las imágenes más grandes. Cuando la imagen es pequeña, la computadora tarda casi lo mismo en crear los hilos que en procesarla. Con imágenes grandes, la ventaja de repartir la tarea se notará muchísimo más.",
      },
    ],
  },
  {
    id: "q6",
    number: 6,
    question: 
      "¿Qué va a ocurrir con el Speedup a medida que se incremente el número de hilos y se mantenga el tamaño de la imagen en cada sistema operativo?",
    entries: [
      {
        author: "Jeovani Pacheco",
        initials: "JP",
        response: 
          "Pues con el Speedup va ir mejorando de manera progresiva, pero igual manera, muchos hilos puede que el incremento de tiempo ya no mejore casi nada.",
      },
      {
        author: "Jeycson López",
        initials: "JL",
        response: "Opino que se va a mantener, o tal vez no haya un aumento considerable, obtendremos speedup de 3x o 2x en ambos sistemas operativos.",
      },
      {
        author: "Mariana Palacios",
        initials: "MP",
        response:
          "En principio, va a ser mejor que los que tienen mejores hilos, pero,en algún punto irá disminuyendo esa mejora, a veces más hilos significa menor rendimiento."
      },
      {
        author: "Jairo Hipólito",
        initials: "JH",
        response:
          "Puede que con mayor cantidad de hilos, el trabajo sea tan poquito que la PC va a gastar más tiempo repartiendo los pedacitos de imagen a cada uno.",
      },
    ],
  },
  {
    id: "q7",
    number: 7,
    question:
      "¿Qué código reportará mejor SpeedUp: el generado por IA en Python o la versión en C/C++? Explicar por qué.",
    entries: [
      {
        author: "Jeovani Pacheco",
        initials: "JP",
        response:
          "Lógicamente el de C/C++ ya que es un lenguaje donde se puede administrar la memoria de forma local. En Python no tenemos esa libertad y por lo mismo te olvidas del lado de la optimización.",
      },
      {
        author: "Jeycson López",
        initials: "JL",
        response:
          "La versión de C/C++ va a ser mejor. Al ser un lenguaje compilado se ensambla de manera más orgánica con el hardware, y al trabajar con hilos obtiene mayores SpeedUp.",
      },
      {
        author: "Mariana Palacios",
        initials: "MP",
        response:
          "Se puede tener un mejor tiempo en C/C++ porque es un lenguaje compilado con más acceso a recursos del sistema. Aunque si Python se optimiza bastante, capaz puede llegar a ser mejor.",
      },
      {
        author: "Jairo Hipólito",
        initials: "JH",
        response:
          "El código en C/C++ tendrá un mejor SpeedUp por ser un lenguaje que trabaja más directo con la computadora.",
      },
    ],
  },
];
 

