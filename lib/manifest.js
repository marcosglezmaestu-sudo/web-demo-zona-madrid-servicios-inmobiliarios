(function () {
  "use strict";

  window.__BRAND__ = {
    name: "Zona Madrid Servicios Inmobiliarios",
    shortName: "Zona Madrid Servicios Inmobiliarios",
    tagline: "Tu próxima llave, con la confianza que mereces",
    year: 2026,
    demoNotice: "Contenido de ejemplo — sustituir por datos reales del cliente",

    contact: {
      phone: "+34 910 417 466",
      phoneHref: "tel:+34910417466",
      whatsapp: "+34 610 205 384",
      whatsappHref: "https://wa.me/34610205384",
      email: "contacto@zona-madrid-servicios-inmobiliarios.demo",
      address: "C/ Palencia, 3, 28020 Madrid",
      schedule: [
        { dias: "Lunes a viernes", horas: "9:30 – 20:00" },
        { dias: "Sábados", horas: "10:00 – 14:00" },
        { dias: "Domingos", horas: "Cerrado" }
      ],
      mapEmbed: "https://www.google.com/maps?q=Calle+de+Velazquez+45+Madrid&output=embed"
    },

    nav: [
      { label: "Inicio", href: "index.html" },
      { label: "Viviendas", href: "viviendas.html" },
      { label: "Calculadora de hipoteca", href: "calculadora.html" },
      { label: "Contacto", href: "contacto.html" }
    ],

    // ------------------------------------------------------------------
    // PROPIEDADES DE EJEMPLO (12) — datos DEMO realistas, sustituir por el
    // catálogo real del cliente. Cada precio/foto está marcado como demo.
    // ------------------------------------------------------------------
    properties: [
      {
        id: "salamanca-velazquez-01",
        demo: true,
        titulo: "Piso reformado junto a Velázquez",
        tipo: "piso",
        tipoLabel: "Piso",
        operacion: "venta",
        zona: "Salamanca",
        direccion: "Calle Velázquez, Madrid",
        precio: 590000,
        habitaciones: 3,
        banos: 2,
        metros: 120,
        planta: "4ª con ascensor",
        eficiencia: "B",
        anoConstruccion: 1965,
        anoReforma: 2023,
        destacada: true,
        descripcion: "Piso íntegramente reformado en 2023 en una de las calles más cotizadas del barrio de Salamanca. Cocina abierta al salón, suelos de roble y aire acondicionado por conductos en todas las estancias.",
        detalles: ["Reforma integral 2023", "Aire acondicionado por conductos", "Armarios empotrados", "Portero físico", "Exterior, muy luminoso"],
        cover: "assets/img/prop-salamanca-velazquez-01.webp",
        gallery: [
          "assets/img/prop-salamanca-velazquez-01.webp",
          "assets/img/prop-salamanca-velazquez-01-salon.webp",
          "assets/img/prop-salamanca-velazquez-01-cocina.webp",
          "assets/img/prop-salamanca-velazquez-01-dorm.webp"
        ]
      },
      {
        id: "chamberi-atico-02",
        demo: true,
        titulo: "Ático con terraza en Chamberí",
        tipo: "atico",
        tipoLabel: "Ático",
        operacion: "venta",
        zona: "Chamberí",
        direccion: "Calle de Fuencarral, Madrid",
        precio: 675000,
        habitaciones: 2,
        banos: 2,
        metros: 95,
        metrosExtra: 30,
        planta: "6ª (ático)",
        eficiencia: "C",
        anoConstruccion: 1978,
        anoReforma: 2021,
        destacada: true,
        descripcion: "Ático con terraza privada de 30 m² orientada sur, vistas abiertas y sin edificios enfrente. Cocina americana con isla y suelo radiante en el baño principal.",
        detalles: ["Terraza privada 30 m²", "Suelo radiante en baño principal", "Cocina con isla", "Trastero incluido", "Sur, muy soleado"],
        cover: "assets/img/prop-chamberi-atico-02.webp",
        gallery: [
          "assets/img/prop-chamberi-atico-02.webp",
          "assets/img/prop-chamberi-atico-02-terraza.webp",
          "assets/img/prop-chamberi-atico-02-salon.webp",
          "assets/img/prop-chamberi-atico-02-cocina.webp"
        ]
      },
      {
        id: "boadilla-chalet-03",
        demo: true,
        titulo: "Chalet independiente con jardín",
        tipo: "chalet",
        tipoLabel: "Chalet",
        operacion: "venta",
        zona: "Boadilla del Monte",
        direccion: "Urbanización El Cortijo",
        precio: 980000,
        habitaciones: 5,
        banos: 4,
        metros: 320,
        parcela: 600,
        planta: "2 alturas + sótano",
        eficiencia: "A",
        anoConstruccion: 2019,
        destacada: true,
        descripcion: "Chalet independiente de obra reciente con piscina privada, jardín de 400 m² y garaje para tres coches. Domótica integral y placas solares con excedente compensado.",
        detalles: ["Piscina privada", "Placas solares", "Garaje para 3 coches", "Domótica integral", "Zona residencial vigilada"],
        cover: "assets/img/prop-boadilla-chalet-03.webp",
        gallery: [
          "assets/img/prop-boadilla-chalet-03.webp",
          "assets/img/prop-boadilla-chalet-03-piscina.webp",
          "assets/img/prop-boadilla-chalet-03-salon.webp",
          "assets/img/prop-boadilla-chalet-03-cocina.webp"
        ]
      },
      {
        id: "arganzuela-obranueva-04",
        demo: true,
        titulo: "Obra nueva con zonas comunes",
        tipo: "obra-nueva",
        tipoLabel: "Obra nueva",
        operacion: "venta",
        zona: "Arganzuela",
        direccion: "Paseo de la Chopera, Madrid",
        precio: 410000,
        habitaciones: 2,
        banos: 2,
        metros: 78,
        planta: "3ª con ascensor",
        eficiencia: "A",
        anoConstruccion: 2026,
        destacada: true,
        descripcion: "Promoción de obra nueva a estrenar con piscina comunitaria, coworking y gimnasio en el edificio. Entrega prevista para el segundo trimestre de 2026, plazas de garaje opcionales.",
        detalles: ["A estrenar, entrega 2026", "Piscina y gimnasio comunitarios", "Garaje opcional", "Preinstalación de aerotermia", "Certificado energético A"],
        cover: "assets/img/prop-arganzuela-obranueva-04.webp",
        gallery: [
          "assets/img/prop-arganzuela-obranueva-04.webp",
          "assets/img/prop-arganzuela-obranueva-04-salon.webp",
          "assets/img/prop-arganzuela-obranueva-04-cocina.webp",
          "assets/img/prop-arganzuela-obranueva-04-piscina.webp"
        ]
      },
      {
        id: "chamartin-piso-05",
        demo: true,
        titulo: "Piso familiar muy luminoso",
        tipo: "piso",
        tipoLabel: "Piso",
        operacion: "venta",
        zona: "Chamartín",
        direccion: "Calle de Padre Damián, Madrid",
        precio: 720000,
        habitaciones: 4,
        banos: 3,
        metros: 145,
        planta: "2ª con ascensor",
        eficiencia: "D",
        anoConstruccion: 1988,
        destacada: false,
        descripcion: "Amplio piso familiar en zona tranquila y muy bien comunicada, a cinco minutos del Bernabéu. Doble orientación, dos plazas de garaje incluidas en el precio.",
        detalles: ["Dos plazas de garaje incluidas", "Doble orientación", "Cerca de colegios internacionales", "Comunidad con zona ajardinada"],
        cover: "assets/img/prop-chamartin-piso-05.webp",
        gallery: [
          "assets/img/prop-chamartin-piso-05.webp",
          "assets/img/prop-chamartin-piso-05-salon.webp",
          "assets/img/prop-chamartin-piso-05-dorm.webp",
          "assets/img/prop-chamartin-piso-05-cocina.webp"
        ]
      },
      {
        id: "retiro-duplex-06",
        demo: true,
        titulo: "Dúplex abuhardillado en Retiro",
        tipo: "atico",
        tipoLabel: "Ático",
        operacion: "venta",
        zona: "Retiro",
        direccion: "Calle de Ibiza, Madrid",
        precio: 650000,
        habitaciones: 3,
        banos: 2,
        metros: 110,
        planta: "Ático (2 plantas)",
        eficiencia: "C",
        anoConstruccion: 1962,
        anoReforma: 2020,
        destacada: false,
        descripcion: "Dúplex abuhardillado a dos minutos del parque de El Retiro, techos altos con vigas vistas en la planta superior y balcón en el salón. Reformado con materiales de primera calidad.",
        detalles: ["A 2 min del parque de El Retiro", "Vigas vistas", "Balcón en el salón", "Reforma de calidad 2020"],
        cover: "assets/img/prop-retiro-duplex-06.webp",
        gallery: [
          "assets/img/prop-retiro-duplex-06.webp",
          "assets/img/prop-retiro-duplex-06-salon.webp",
          "assets/img/prop-retiro-duplex-06-dorm.webp",
          "assets/img/prop-retiro-duplex-06-cocina.webp"
        ]
      },
      {
        id: "pozuelo-chalet-07",
        demo: true,
        titulo: "Chalet pareado con piscina",
        tipo: "chalet",
        tipoLabel: "Chalet",
        operacion: "venta",
        zona: "Pozuelo de Alarcón",
        direccion: "Urbanización Somosaguas",
        precio: 795000,
        habitaciones: 4,
        banos: 3,
        metros: 260,
        parcela: 400,
        planta: "3 alturas",
        eficiencia: "B",
        anoConstruccion: 2015,
        destacada: true,
        descripcion: "Chalet pareado en urbanización privada con seguridad 24h, piscina comunitaria y pista de pádel. Cocina office, bodega climatizada y jardín privado orientado sureste.",
        detalles: ["Urbanización con seguridad 24h", "Piscina y pádel comunitarios", "Bodega climatizada", "Jardín privado orientación sureste"],
        cover: "assets/img/prop-pozuelo-chalet-07.webp",
        gallery: [
          "assets/img/prop-pozuelo-chalet-07.webp",
          "assets/img/prop-pozuelo-chalet-07-jardin.webp",
          "assets/img/prop-pozuelo-chalet-07-salon.webp",
          "assets/img/prop-pozuelo-chalet-07-cocina.webp"
        ]
      },
      {
        id: "lasrozas-obranueva-08",
        demo: true,
        titulo: "Obra nueva con terraza y trastero",
        tipo: "obra-nueva",
        tipoLabel: "Obra nueva",
        operacion: "venta",
        zona: "Las Rozas",
        direccion: "Avenida de Europa, Las Rozas de Madrid",
        precio: 465000,
        habitaciones: 3,
        banos: 2,
        metros: 105,
        metrosExtra: 12,
        planta: "1ª con ascensor",
        eficiencia: "A",
        anoConstruccion: 2025,
        destacada: false,
        descripcion: "Vivienda a estrenar en promoción cerrada con jardines privados, terraza de 12 m² y trastero incluido en el precio. Cerca del centro comercial y del colegio internacional.",
        detalles: ["Trastero incluido", "Terraza de 12 m²", "Jardines privados de la promoción", "Cerca de colegios internacionales"],
        cover: "assets/img/prop-lasrozas-obranueva-08.webp",
        gallery: [
          "assets/img/prop-lasrozas-obranueva-08.webp",
          "assets/img/prop-lasrozas-obranueva-08-salon.webp",
          "assets/img/prop-lasrozas-obranueva-08-terraza.webp",
          "assets/img/prop-lasrozas-obranueva-08-cocina.webp"
        ]
      },
      {
        id: "tetuan-piso-09",
        demo: true,
        titulo: "Piso a reformar, ideal primera vivienda",
        tipo: "piso",
        tipoLabel: "Piso",
        operacion: "venta",
        zona: "Tetuán",
        direccion: "Calle de Bravo Murillo, Madrid",
        precio: 195000,
        habitaciones: 2,
        banos: 1,
        metros: 65,
        planta: "3ª sin ascensor",
        eficiencia: "E",
        anoConstruccion: 1958,
        destacada: true,
        descripcion: "Piso a reformar con muy buena distribución y gran potencial, perfecto como primera vivienda. Zona en plena revalorización, a 5 minutos a pie del metro Tetuán.",
        detalles: ["A reformar, buen potencial", "A 5 min del metro Tetuán", "Zona en revalorización", "Buena distribución original"],
        cover: "assets/img/prop-tetuan-piso-09.webp",
        gallery: [
          "assets/img/prop-tetuan-piso-09.webp",
          "assets/img/prop-tetuan-piso-09-salon.webp",
          "assets/img/prop-tetuan-piso-09-dorm.webp",
          "assets/img/prop-tetuan-piso-09-cocina.webp"
        ]
      },
      {
        id: "chueca-atico-10",
        demo: true,
        titulo: "Ático de lujo con terraza panorámica",
        tipo: "atico",
        tipoLabel: "Ático",
        operacion: "venta",
        zona: "Justicia (Chueca)",
        direccion: "Calle de Hortaleza, Madrid",
        precio: 1150000,
        habitaciones: 3,
        banos: 3,
        metros: 140,
        metrosExtra: 40,
        planta: "7ª (ático)",
        eficiencia: "B",
        anoConstruccion: 2010,
        destacada: true,
        descripcion: "Ático de diseño con terraza panorámica de 40 m², jacuzzi exterior y vistas a la Gran Vía. Acabados de altísima calidad, portero 24h y plaza de garaje incluida.",
        detalles: ["Terraza panorámica con jacuzzi", "Vistas a Gran Vía", "Portero 24h", "Plaza de garaje incluida", "Acabados de alta gama"],
        cover: "assets/img/prop-chueca-atico-10.webp",
        gallery: [
          "assets/img/prop-chueca-atico-10.webp",
          "assets/img/prop-chueca-atico-10-terraza.webp",
          "assets/img/prop-chueca-atico-10-salon.webp",
          "assets/img/prop-chueca-atico-10-bano.webp"
        ]
      },
      {
        id: "aravaca-piso-11",
        demo: true,
        titulo: "Piso familiar con zonas comunes",
        tipo: "piso",
        tipoLabel: "Piso",
        operacion: "venta",
        zona: "Moncloa-Aravaca",
        direccion: "Avenida de Valladolid, Madrid",
        precio: 540000,
        habitaciones: 4,
        banos: 2,
        metros: 130,
        planta: "5ª con ascensor",
        eficiencia: "C",
        anoConstruccion: 2005,
        destacada: false,
        descripcion: "Piso muy soleado en urbanización con piscina, pista de pádel y zona infantil. A 10 minutos de la Casa de Campo y muy bien comunicado con la A-6.",
        detalles: ["Urbanización con piscina y pádel", "Zona infantil", "Cerca de la Casa de Campo", "Plaza de garaje incluida"],
        cover: "assets/img/prop-aravaca-piso-11.webp",
        gallery: [
          "assets/img/prop-aravaca-piso-11.webp",
          "assets/img/prop-aravaca-piso-11-salon.webp",
          "assets/img/prop-aravaca-piso-11-cocina.webp",
          "assets/img/prop-aravaca-piso-11-piscina.webp"
        ]
      },
      {
        id: "majadahonda-chalet-12",
        demo: true,
        titulo: "Chalet de diseño con piscina climatizada",
        tipo: "chalet",
        tipoLabel: "Chalet",
        operacion: "venta",
        zona: "Majadahonda",
        direccion: "Urbanización El Bosque",
        precio: 1450000,
        habitaciones: 5,
        banos: 5,
        metros: 380,
        parcela: 700,
        planta: "2 alturas + sótano",
        eficiencia: "A",
        anoConstruccion: 2022,
        destacada: false,
        descripcion: "Chalet de diseño arquitectónico con piscina climatizada, cine en casa, gimnasio propio y bodega. Parcela de 700 m² con jardín maduro y sistema de riego automático.",
        detalles: ["Piscina climatizada", "Cine en casa y gimnasio propio", "Bodega climatizada", "Parcela de 700 m²", "Certificado energético A"],
        cover: "assets/img/prop-majadahonda-chalet-12.webp",
        gallery: [
          "assets/img/prop-majadahonda-chalet-12.webp",
          "assets/img/prop-majadahonda-chalet-12-piscina.webp",
          "assets/img/prop-majadahonda-chalet-12-salon.webp",
          "assets/img/prop-majadahonda-chalet-12-cocina.webp"
        ]
      }
    ],

    // ------------------------------------------------------------------
    // POR QUÉ ELEGIRNOS
    // ------------------------------------------------------------------
    valores: [
      {
        titulo: "Acompañamiento de principio a fin",
        texto: "Desde la primera visita hasta la firma en notaría, un mismo agente lleva tu caso. Nada de pasar de mano en mano."
      },
      {
        titulo: "Tasación y valoración honestas",
        texto: "Valoramos tu vivienda con datos reales del mercado, no con la cifra que más te gusta oír."
      },
      {
        titulo: "Gestión completa del papeleo",
        texto: "Notaría, registro, impuestos, cédula de habitabilidad: nos ocupamos de la burocracia para que tú solo firmes."
      },
      {
        titulo: "Selección exigente de propiedades",
        texto: "Cada vivienda del catálogo pasa un filtro de estado, documentación y precio de mercado antes de publicarse."
      }
    ],

    // ------------------------------------------------------------------
    // CÓMO TRABAJAMOS — pasos
    // ------------------------------------------------------------------
    proceso: [
      {
        numero: "01",
        titulo: "Cuéntanos qué buscas",
        texto: "Zona, presupuesto, habitaciones, plazos. Una llamada de 15 minutos y ya tenemos tu criterio de búsqueda."
      },
      {
        numero: "02",
        titulo: "Seleccionamos y visitamos",
        texto: "Te enviamos solo las viviendas que de verdad encajan y coordinamos las visitas a tu ritmo, sin prisas."
      },
      {
        numero: "03",
        titulo: "Negociamos por ti",
        texto: "Analizamos el precio de mercado real y negociamos las condiciones para que pagues lo justo."
      },
      {
        numero: "04",
        titulo: "Gestionamos arras y notaría",
        texto: "Redactamos el contrato de arras, coordinamos la tasación bancaria y preparamos la firma en notaría."
      },
      {
        numero: "05",
        titulo: "Te entregamos las llaves",
        texto: "Revisamos que todo esté en orden — suministros, comunidad, IBI — y te acompañamos el día de la entrega."
      }
    ],

    // ------------------------------------------------------------------
    // TESTIMONIOS DE EJEMPLO — marcados como demo, sustituir por reales
    // ------------------------------------------------------------------
    testimonios: [
      {
        demo: true,
        nombre: "Laura M.",
        contexto: "Compró un piso en Chamberí",
        texto: "Buscábamos nuestra primera vivienda y nos daba vértigo todo el proceso. Nos explicaron cada paso sin prisas y negociaron 18.000€ menos del precio inicial.",
        estrellas: 5
      },
      {
        demo: true,
        nombre: "Javier y Marta",
        contexto: "Vendieron su piso en Arganzuela",
        texto: "La tasación fue muy realista, nada de números inflados para captar el piso. Vendimos en cinco semanas al precio que nos dijeron desde el primer día.",
        estrellas: 5
      },
      {
        demo: true,
        nombre: "Ana Belén R.",
        contexto: "Compró un chalet en Pozuelo",
        texto: "Veníamos de otra agencia que solo nos enviaba enlaces por WhatsApp. Aquí tuvimos un agente dedicado que entendió exactamente lo que necesitábamos para la familia.",
        estrellas: 5
      },
      {
        demo: true,
        nombre: "Carlos F.",
        contexto: "Compró un ático en Chueca",
        texto: "La gestión del papeleo fue impecable. Con mi trabajo no tenía tiempo para notaría ni gestorías y ellos lo llevaron absolutamente todo.",
        estrellas: 4
      }
    ],

    // ------------------------------------------------------------------
    // PREGUNTAS FRECUENTES
    // ------------------------------------------------------------------
    faqs: [
      {
        pregunta: "¿Cuánto cuesta que me ayudéis a comprar una vivienda?",
        respuesta: "Para compradores, nuestros honorarios los asume la propiedad vendedora en la mayoría de los casos: tú no pagas comisión por comprar a través de nosotros. Te lo confirmamos siempre por escrito antes de empezar."
      },
      {
        pregunta: "¿Cuánto tardáis en vender una vivienda?",
        respuesta: "De media, entre 6 y 10 semanas desde que se publica hasta la firma de arras, siempre que el precio de salida sea realista. En la valoración gratuita te damos una estimación concreta para tu caso."
      },
      {
        pregunta: "¿Qué gastos tiene comprar una vivienda además del precio?",
        respuesta: "Aproximadamente entre un 10% y un 12% adicional: impuestos (ITP en segunda mano, IVA + AJD en obra nueva), notaría, registro de la propiedad y gestoría. En la calculadora de hipoteca lo desglosamos con tu caso concreto."
      },
      {
        pregunta: "¿Qué son las arras y para qué sirven?",
        respuesta: "Es un contrato privado previo a la escritura en el que el comprador entrega una señal (normalmente un 10% del precio) para reservar la vivienda. Si el comprador se echa atrás pierde la señal; si es el vendedor, debe devolver el doble."
      },
      {
        pregunta: "¿Necesito tasación si ya tengo el precio de compraventa acordado?",
        respuesta: "Sí. El banco exige una tasación independiente para conceder la hipoteca, y financia sobre el menor de dos valores: el precio de compra o el de tasación. Te ayudamos a coordinarla con una entidad homologada."
      },
      {
        pregunta: "¿Me podéis decir cuánto vale mi piso sin compromiso?",
        respuesta: "Sí, la valoración es gratuita y sin ningún compromiso de venta. Un agente visita la vivienda, analiza comparables reales de la zona y te da un rango de precio de mercado en 48 horas."
      },
      {
        pregunta: "¿Trabajáis solo con segunda mano o también con obra nueva?",
        respuesta: "Con ambas. Tenemos acuerdos con varias promotoras de la zona, así que también podemos acompañarte en la compra de vivienda de obra nueva sobre plano o a estrenar."
      }
    ],

    // ------------------------------------------------------------------
    // CALCULADORA DE HIPOTECA — parámetros orientativos
    // ------------------------------------------------------------------
    hipoteca: {
      interesAnualDefecto: 3.1,
      anosDefecto: 30,
      entradaMinimaPct: 20,
      ratioEndeudamientoMax: 35,
      gastosCompraSegundaManoPct: 10,
      gastosCompraObraNuevaPct: 12,
      disclaimer: "Esta calculadora ofrece una estimación orientativa y no sustituye al estudio y la oferta vinculante de una entidad financiera. Las condiciones reales dependen de tu perfil, ingresos, historial crediticio y de la política de cada banco."
    }
  };
})();
