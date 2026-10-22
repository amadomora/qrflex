/**
 * Base de datos maestra de atractivos turísticos de Santander
 * Modelo Geo-Turístico Multilingüe (ES, EN, FR)
 * Curaduría y verificación por: turismo-santander
 * Modelado por: db-geo
 */

export const initialSites = [
  // ===========================================================================
  // 1. CAÑÓN DEL CHICAMOCHA
  // ===========================================================================
  {
    id: "site_chicamocha_001",
    slug: "canon-del-chicamocha",
    category: "canyon",
    categoryName: {
      es: "Cañón y Formación Geológica",
      en: "Canyon & Geological Formation",
      fr: "Canyon & Formation Géologique"
    },
    location: {
      department: "Santander (con inicio en Boyacá)",
      municipalities: [
        "Aratoca",
        "Cepitá",
        "Los Santos",
        "Piedecuesta",
        "Jordán Sube",
        "Villanueva",
        "Barichara",
        "Zapatoca"
      ],
      coordinates: {
        lat: 6.7833,
        lng: -73.1833,
        readable: "6° 47' N, 73° 11' O"
      },
      elevationMeters: "2.000 m profundidad"
    },
    dimensions: {
      length: "227 km",
      depth: "~2.000 m (más profundo que el Cañón del Colorado)",
      area: "Más de 108.000 hectáreas"
    },
    climate: {
      type: "Cálido, árido y seco",
      temperatureRange: "11°C (noches) hasta 30°C - 32°C (día)"
    },
    metrics: {
      totalScans: 1248,
      scansByLanguage: { es: 840, en: 295, fr: 113 },
      lastScannedAt: "2026-10-21T16:20:00Z"
    },
    images: {
      hero: "/images/chicamocha_infographic.jpg",
      badge: "⛰️ Top 10 Colombia"
    },
    translations: {
      es: {
        title: "Cañón del Chicamocha",
        subtitle: "Naturaleza • Historia • Aventura",
        tagline: "Un destino que te conecta con la grandeza de Colombia",
        history: "Se formó hace aprox. 46 millones de años (durante el Terciario) por movimientos tectónicos y erosión fluvial. Antiguamente fue una gran cuenca lacustre marina, lo que explica la abundante presencia de fósiles y cuevas. Fue territorio sagrado de las comunidades indígenas Guanes, Laches, Yariguíes y Muiscas. En la colonia, su red de caminos empedrados sirvió para el comercio y la comunicación. En 2009 fue preseleccionado como una de las 7 maravillas naturales del mundo.",
        biodiversity: {
          fauna: [
            "Monos aulladores",
            "Tigrillos",
            "Osos hormigueros",
            "Armadillos",
            "Zarigüeyas",
            "Iguanas",
            "Cucarachero nicéforo (ave endémica)",
            "Perdices y águilas blancas"
          ],
          flora: [
            "Palma Zamia encephalartoides (fósil viviente)",
            "Cacao indio",
            "Castañete",
            "Árbol barrigón (Ceiba barrigona)"
          ]
        },
        attractions: [
          {
            id: "att_panachi",
            name: "Parque Nacional del Chicamocha (PANACHI)",
            description: "Miradores de 360 grados, teleférico de 6.3 km que cruza la garganta del cañón, monumento a la santandereanidad y deportes extremos."
          },
          {
            id: "att_santos",
            name: "La Mesa de Los Santos",
            description: "Meseta de clima fresco y templado, centro de ecoturismo, vuelos en parapente, miradores gastronómicos y café orgánico."
          },
          {
            id: "att_camino_jordan",
            name: "Camino Real de Jordán a Los Santos",
            description: "Ruta histórica indígena y camino de piedra de Geo von Lengerke; senderismo de montaña descendiendo al fondo del cañón."
          },
          {
            id: "att_pueblos",
            name: "Pueblos Coloniales Cercanos",
            description: "Barichara (el pueblo más lindo de Colombia), Guane con su museo paleontológico, y Villanueva."
          }
        ],
        howToGetThere: {
          fromBucaramanga: "54 km de distancia (aprox. 50 min a 1 hora en automóvil o bus vía Piedecuesta / San Gil).",
          fromBogota: "340 km por carretera (5-6 horas en automóvil particular o 8-9 horas en autobús intermunicipal).",
          airTransfer: "Vuelo al Aeropuerto Palonegro (BGA en Lebrija) + transfer terrestre (menos de 4 horas en total)."
        }
      },
      en: {
        title: "Chicamocha Canyon",
        subtitle: "Nature • History • Adventure",
        tagline: "A destination connecting you with Colombia's grandeur",
        history: "Formed approximately 46 million years ago during the Tertiary period through tectonic plate shifts and deep river erosion. Historically an ancient marine lake basin, explaining its abundant fossil beds and cavern networks. Ancestral home to the Guane, Lache, Yariguí, and Muisca indigenous civilizations. During the Spanish colonial era, stone-paved royal trails facilitated commerce. In 2009, it was a top finalist for the New 7 Wonders of Nature.",
        biodiversity: {
          fauna: [
            "Howler monkeys",
            "Ocelots / small spotted cats",
            "Giant anteaters",
            "Armadillos",
            "Opossums",
            "Iguanas",
            "Niceforo's wren (endemic bird)",
            "Partridges and white-tailed eagles"
          ],
          flora: [
            "Zamia encephalartoides palm (living fossil)",
            "Wild indian cacao",
            "Castañete shrub",
            "Barrigón bottle tree (Ceiba barrigona)"
          ]
        },
        attractions: [
          {
            id: "att_panachi",
            name: "Chicamocha National Park (PANACHI)",
            description: "360-degree canyon lookouts, a 6.3 km aerial tramway spanning across the canyon, the Santandereanidad Monument, and extreme sports."
          },
          {
            id: "att_santos",
            name: "La Mesa de Los Santos",
            description: "High mountain plateau with mild weather, premier paragliding, scenic farm restaurants, and high-altitude specialty organic coffee."
          },
          {
            id: "att_camino_jordan",
            name: "Royal Trail (Camino Real) Jordán to Los Santos",
            description: "Centuries-old stone pathway engineered over pre-Columbian paths, offering extreme canyon descent and world-class trekking."
          },
          {
            id: "att_pueblos",
            name: "Historic Colonial Towns",
            description: "Barichara (heralded as Colombia's prettiest town), ancient Guane with its paleontology museum, and Villanueva."
          }
        ],
        howToGetThere: {
          fromBucaramanga: "54 km (approx. 50 min to 1 hour by car or coach bus via Piedecuesta / San Gil).",
          fromBogota: "340 km by paved highway (5-6 hours by private car or 8-9 hours by regional bus).",
          airTransfer: "Flights to Palonegro International Airport (BGA in Lebrija) + ground transfer (under 4 hours total)."
        }
      },
      fr: {
        title: "Canyon du Chicamocha",
        subtitle: "Nature • Histoire • Aventure",
        tagline: "Une destination qui vous connecte à la grandeur de la Colombie",
        history: "Formé il y a environ 46 millions d'années (au cours de l'ère tertiaire) par des mouvements tectoniques et une forte érosion fluviale. Ancien bassin lacustre marin, ce qui explique la présence remarquable de fossiles et de grottes. Terre ancestrale des peuples indigènes Guanes, Laches, Yariguíes et Muiscas. Pré-sélectionné en 2009 parmi les merveilles naturelles du monde.",
        biodiversity: {
          fauna: [
            "Singes hurleurs",
            "Ocelots / petits félins",
            "Tamanoirs",
            "Tatous",
            "Opossums",
            "Iguanes",
            "Troglodyte de Nicéforo (oiseau endémique)",
            "Perdrix et aigles blancs"
          ],
          flora: [
            "Palmier Zamia encephalartoides (fossile vivant)",
            "Cacao sauvage",
            "Castañete",
            "Arbre Ventru (Ceiba barrigona)"
          ]
        },
        attractions: [
          {
            id: "att_panachi",
            name: "Parc National du Chicamocha (PANACHI)",
            description: "Belvédères panoramiques à 360°, téléphérique de 6,3 km franchissant la gorge du canyon, monument historique et sports extrêmes."
          },
          {
            id: "att_santos",
            name: "La Mesa de Los Santos",
            description: "Plateau d'altitude au climat doux, centre d'écotourisme, parapente, miradors et cafés d'exception de Santander."
          },
          {
            id: "att_camino_jordan",
            name: "Chemin Royal de Jordán à Los Santos",
            description: "Sentier pavé historique d'origine indigène et coloniale, offrant un défi de randonnée spectaculaire au cœur du canyon."
          },
          {
            id: "att_pueblos",
            name: "Villages Coloniaux Voisins",
            description: "Barichara (considéré comme le plus beau village de Colombie), Guane et son musée paléontologique, et Villanueva."
          }
        ],
        howToGetThere: {
          fromBucaramanga: "54 km (environ 50 min à 1 h en voiture ou bus via Piedecuesta / San Gil).",
          fromBogota: "340 km par route (5 à 6 heures en voiture ou 8 à 9 heures en autocar).",
          airTransfer: "Vol vers l'Aéroport International Palonegro (BGA à Lebrija) + transfert terrestre (moins de 4 heures au total)."
        }
      }
    }
  },

  // ===========================================================================
  // 2. BARICHARA COLONIAL (PUEBLO PATRIMONIO)
  // ===========================================================================
  {
    id: "site_barichara_002",
    slug: "barichara-colonial",
    category: "heritage_town",
    categoryName: {
      es: "Pueblo Patrimonio & Monumento Nacional",
      en: "Heritage Town & National Monument",
      fr: "Village Patrimoine & Monument National"
    },
    location: {
      department: "Santander (Provincia de Guanentá)",
      municipalities: ["Barichara", "Guane"],
      coordinates: {
        lat: 6.6344,
        lng: -73.2239,
        readable: "6° 38' N, 73° 13' O"
      },
      elevationMeters: "1.336 m s.n.m."
    },
    dimensions: {
      length: "Centro histórico de 120 manzanas",
      depth: "Miradores con caída de 500 m al río Suárez",
      area: "Monumento Nacional desde 1978"
    },
    climate: {
      type: "Templado, seco y muy soleado",
      temperatureRange: "18°C (noches) hasta 26°C - 28°C (mediodía)"
    },
    metrics: {
      totalScans: 980,
      scansByLanguage: { es: 540, en: 310, fr: 130 },
      lastScannedAt: "2026-10-21T16:45:00Z"
    },
    images: {
      hero: "/images/barichara_hero.jpg",
      badge: "🏛️ Pueblo más Lindo de Colombia"
    },
    translations: {
      es: {
        title: "Barichara Colonial",
        subtitle: "Piedra • Historia • Tranquilidad",
        tagline: "El pueblo más lindo de Colombia, donde el tiempo se esculpe en piedra amarilla",
        history: "Fundado en 1705 tras la milagrosa aparición de la Virgen de la Roca tallada en una losa de piedra. Declarado Monumento Nacional en 1978, Barichara es la obra cumbre de la arquitectura en tierra pisada (tapia pisada y bahareque) y techos de teja de barro español. Sus calles empedradas de tono ocre y sus talleres de cantería tradicional mantienen viva la herencia de los maestros picapedreros de Guanentá.",
        biodiversity: {
          fauna: [
            "Toches y turpiales amarillos",
            "Carpinteros habados",
            "Colibríes ermitaños",
            "Iguanas de piedra",
            "Mariposas cometa"
          ],
          flora: [
            "Guayacanes amarillos y rosados",
            "Fique (Agave ancestral para papel y tejidos)",
            "Ceibas milenarias",
            "Orquídeas y cáctus de roca"
          ]
        },
        attractions: [
          {
            id: "att_catedral_barichara",
            name: "Catedral de la Inmaculada Concepción",
            description: "Imponente templo de 1838 esculpido totalmente en piedra arenisca amarilla, sostenido por diez columnas monolíticas talladas a mano."
          },
          {
            id: "att_camino_guane",
            name: "Camino Real a Guane (Geo von Lengerke)",
            description: "Sendero histórico empedrado de 5.5 km que desciende suavemente entre cactus y fósiles marinos hasta la aldea ancestral de Guane."
          },
          {
            id: "att_salto_mico",
            name: "Mirador del Salto del Mico",
            description: "Voladizo de roca natural con una de las vistas panorámicas más sobrecogedoras hacia el cañón del río Suárez y la cordillera de los Yariguíes."
          },
          {
            id: "att_taller_fique",
            name: "Taller Escuela de Fique y Artesanías de Tierra",
            description: "Espacios de bioconstrucción y papel artesanal donde se transforman las hojas del fique en lienzos ecológicos únicos."
          }
        ],
        howToGetThere: {
          fromBucaramanga: "118 km (aprox. 2.5 a 3 horas en automóvil vía Floridablanca, Piedecuesta y San Gil).",
          fromBogota: "320 km (aprox. 6 horas por la vía Tunja - Barbosa - San Gil, tomando el desvío de 22 km a Barichara).",
          airTransfer: "Vuelo a Bucaramanga (Aeropuerto BGA) o fletado a San Gil + transporte terrestre panorámico."
        }
      },
      en: {
        title: "Colonial Barichara",
        subtitle: "Stone • History • Serenity",
        tagline: "Colombia's prettiest town, where time is carved into golden sandstone",
        history: "Founded in 1705 after the miraculous apparition of the Virgin Mary carved in stone. Declared a National Heritage Monument in 1978, Barichara stands as Latin America's finest jewel of rammed-earth architecture (tapia pisada), cobblestone streets, and red tile roofs. Its ancient stone-carving guild continues to preserve ancestral masonry methods passed down through generations.",
        biodiversity: {
          fauna: [
            "Yellow orioles (Toches)",
            "Red-crowned woodpeckers",
            "Hermit hummingbirds",
            "Rock iguanas",
            "Swallowtail butterflies"
          ],
          flora: [
            "Golden Trumpet trees (Guayacán)",
            "Fique agave (ancestral fiber plant)",
            "Ancient Ceiba trees",
            "Wild desert orchids and succulents"
          ]
        },
        attractions: [
          {
            id: "att_catedral_barichara",
            name: "Cathedral of the Immaculate Conception",
            description: "A monumental 19th-century temple carved entirely from warm ochre stone, resting on ten massive hand-hewn monolithic columns."
          },
          {
            id: "att_camino_guane",
            name: "Royal Trail to Guane (Camino Real)",
            description: "A 5.5 km ancient stone-paved downhill trail winding through canyon cliffs, native cacti, and fossil valleys to the sleepy indigenous hamlet of Guane."
          },
          {
            id: "att_salto_mico",
            name: "Salto del Mico Viewpoint",
            description: "A breathtaking natural stone ledge protruding over the dramatic Suárez River canyon and the western Andean mountain ranges."
          },
          {
            id: "att_taller_fique",
            name: "Fique Paper Workshop & Earth Arts",
            description: "Living artisan workshops transforming native agave fibers into fine archival paper and natural mineral pigments."
          }
        ],
        howToGetThere: {
          fromBucaramanga: "118 km (approx. 2.5 to 3 hours by car via Piedecuesta and San Gil).",
          fromBogota: "320 km (approx. 6 hours by paved highway through Tunja, Barbosa, and San Gil).",
          airTransfer: "Flights to Bucaramanga Palonegro Airport (BGA) + scenic highland ground transfer."
        }
      },
      fr: {
        title: "Barichara Colonial",
        subtitle: "Pierre • Histoire • Sérénité",
        tagline: "Le plus beau village de Colombie, où le temps est sculpté dans la pierre ocre",
        history: "Fondé en 1705 après l'apparition miraculeuse de la Vierge gravée dans la pierre. Déclaré Monument National en 1978, Barichara est le chef-d'œuvre de l'architecture coloniale en pisé (tapia pisada) et toits de tuiles d'argile. Ses rues pavées couleur terre et ses ateliers de tailleurs de pierre perpétuent un savoir-faire artisanal unique en Colombie.",
        biodiversity: {
          fauna: [
            "Orioles jaunes (Toches)",
            "Pics à couronne rouge",
            "Colibris ermites",
            "Iguanes des rochers",
            "Papillons comètes"
          ],
          flora: [
            "Guayacans dorés en fleurs",
            "Agave fique (plante textile ancestrale)",
            "Ceibas centenaires",
            "Orchidées sauvages et cactus"
          ]
        },
        attractions: [
          {
            id: "att_catedral_barichara",
            name: "Cathédrale de l'Immaculée Conception",
            description: "Majestueux sanctuaire en pierre de taille ocre soutenu par dix impressionnantes colonnes monolithiques sculptées à la main."
          },
          {
            id: "att_camino_guane",
            name: "Chemin Royal vers Guane",
            description: "Sentier pavé historique de 5,5 km serpentant au milieu des cactus et des fossiles jusqu'au paisible village indigène de Guane."
          },
          {
            id: "att_salto_mico",
            name: "Belvédère du Salto del Mico",
            description: "Corniche rocheuse spectaculaire suspendue au-dessus du gouffre du fleuve Suárez et des crêtes andines."
          },
          {
            id: "att_taller_fique",
            name: "Atelier de Papier de Fique et Arts de la Terre",
            description: "Manufacture artisanale où les fibres d'agave sont métamorphosées en papier naturel écologique."
          }
        ],
        howToGetThere: {
          fromBucaramanga: "118 km (environ 2h30 à 3h en voiture via San Gil).",
          fromBogota: "320 km (environ 6h par la route nationale via Tunja et San Gil).",
          airTransfer: "Vol vers l'Aéroport International Palonegro (BGA) + transfert terrestre pittoresque."
        }
      }
    }
  },

  // ===========================================================================
  // 3. PANACHI (PARQUE NACIONAL DEL CHICAMOCHA)
  // ===========================================================================
  {
    id: "site_panachi_003",
    slug: "panachi-parque-nacional",
    category: "national_park",
    categoryName: {
      es: "Parque Nacional & Aventura Extrema",
      en: "National Theme Park & Extreme Adventure",
      fr: "Parc National & Aventure Extrême"
    },
    location: {
      department: "Santander (Aratoca / Mesa de Los Santos)",
      municipalities: ["Aratoca", "Los Santos"],
      coordinates: {
        lat: 6.7877,
        lng: -73.0039,
        readable: "6° 47' N, 73° 00' O"
      },
      elevationMeters: "1.450 m s.n.m. (Estación Panachi) / 1.650 m (Estación Santos)"
    },
    dimensions: {
      length: "Teleférico de 6.3 km cruzando el cañón",
      depth: "Garganta de 1.000 m sobre el río Chicamocha",
      area: "Más de 264 hectáreas de atracciones"
    },
    climate: {
      type: "Cálido y ventoso de día, brisas frescas al atardecer",
      temperatureRange: "22°C hasta 30°C (día)"
    },
    metrics: {
      totalScans: 1650,
      scansByLanguage: { es: 1100, en: 390, fr: 160 },
      lastScannedAt: "2026-10-21T17:10:00Z"
    },
    images: {
      hero: "/images/panachi_hero.jpg",
      badge: "🚠 Teleférico 6.3 km"
    },
    translations: {
      es: {
        title: "PANACHI - Parque Nacional del Chicamocha",
        subtitle: "Aventura • Cultura • Santandereanidad",
        tagline: "El corazón turístico de Santander suspendido sobre la inmensidad del cañón",
        history: "Inaugurado en diciembre de 2006, PANACHI es el ícono turístico y de entretenimiento más célebre del oriente colombiano. Construido sobre las escarpadas laderas del cañón, rinde tributo a la rebeldía de los Comuneros de 1781 y la bravura de la raza santandereana. Su teleférico de dos cables es una hazaña de ingeniería mundial que cruza de un lado al otro del abismo.",
        biodiversity: {
          fauna: [
            "Cabras de cañón (adaptadas al terreno vertical)",
            "Águilas cuaresmeras",
            "Iguanas de peña",
            "Cucarachero de Nicéforo",
            "Lagartos collarejos"
          ],
          flora: [
            "Cactus columnares gigantes",
            "Árbol barrigón del Chicamocha",
            "Matorrales espinosos xerofíticos",
            "Agaves silvestres y tunas"
          ]
        },
        attractions: [
          {
            id: "att_teleferico",
            name: "Teleférico del Chicamocha",
            description: "Travesía aérea de 6.3 km en 22 minutos que desciende hasta el fondo del cañón sobre el río Chicamocha y asciende hasta la Mesa de Los Santos."
          },
          {
            id: "att_monumento_santander",
            name: "Monumento a la Santandereanidad",
            description: "Impresionante escultura de 35 figuras de bronce de escala real sobre una colosal hoja de tabaco que emerge de la montaña, honrando la Revolución de los Comuneros."
          },
          {
            id: "att_parapente_panachi",
            name: "Parapente y Deportes Extremos",
            description: "Pistas de despegue con corrientes térmicas perfectas para planear a 1.500 m de altura, tirolesas de 450 m y columpio del cañón."
          },
          {
            id: "att_parque_acuatico",
            name: "Parque Acuático Chicamocha",
            description: "Complejo de piscinas panorámicas, río lento y toboganes gigantes con vistas directas a los farallones del cañón."
          }
        ],
        howToGetThere: {
          fromBucaramanga: "54 km sobre la Ruta 45A (aprox. 50 min a 1 hora en bus o vehículo particular vía Piedecuesta).",
          fromBogota: "340 km vía San Gil (a 40 km al norte de San Gil, unos 45 min en bus).",
          airTransfer: "Vuelo a Bucaramanga (BGA) y transporte terrestre directo desde el terminal o agencia turística."
        }
      },
      en: {
        title: "PANACHI - Chicamocha National Park",
        subtitle: "Adventure • Culture • Heritage",
        tagline: "Santander's iconic adventure park suspended over the vastness of the canyon",
        history: "Inaugurated in December 2006, PANACHI stands as the premier cultural and adventure theme park of eastern Colombia. Perched dramatically along the canyon's edge, it honors the fierce independence and communard revolution of 1781. Its 6.3 km aerial tramway is an internationally celebrated engineering feat spanning across the deep river gorge.",
        biodiversity: {
          fauna: [
            "Wild canyon goats (expert cliff climbers)",
            "Broad-winged hawks",
            "Rock iguanas",
            "Niceforo's wren",
            "Collared canyon lizards"
          ],
          flora: [
            "Giant columnar cardón cacti",
            "Chicamocha bottle trees (Ceiba barrigona)",
            "Xerophytic thorn bushes",
            "Wild desert agaves and prickly pears"
          ]
        },
        attractions: [
          {
            id: "att_teleferico",
            name: "Chicamocha Aerial Tramway (Teleférico)",
            description: "A 6.3 km scenic cable ride taking 22 minutes, descending to the canyon bottom across the Chicamocha River and climbing up to La Mesa de Los Santos plateau."
          },
          {
            id: "att_monumento_santander",
            name: "Monument to Santanderean Pride",
            description: "A monumental sculpture featuring 35 life-sized bronze figures mounted on an enormous tobacco leaf bursting out of the mountain cliff."
          },
          {
            id: "att_parapente_panachi",
            name: "Tandem Paragliding & Extreme Sports",
            description: "World-class thermals for paragliding 1,500 m above the river, 450-meter canyon zip-lines, and the high-thrill canyon swing."
          },
          {
            id: "att_parque_acuatico",
            name: "Chicamocha Water Park",
            description: "Spectacular infinity swimming pools, lazy river, and slides surrounded by 360-degree views of vertical desert cliffs."
          }
        ],
        howToGetThere: {
          fromBucaramanga: "54 km along Highway 45A (approx. 50 min to 1 hour by car or direct coach bus).",
          fromBogota: "340 km via San Gil (located 40 km north of San Gil, approx. 45 min drive).",
          airTransfer: "Flights to Palonegro International Airport (BGA) + direct scenic mountain transit."
        }
      },
      fr: {
        title: "PANACHI - Parc National du Chicamocha",
        subtitle: "Aventure • Culture • Fierté",
        tagline: "Le cœur touristique de Santander suspendu au-dessus de l'immensité du canyon",
        history: "Inauguré en décembre 2006, PANACHI est l'attraction touristique la plus célèbre de l'est colombien. Construit à flanc de falaise, il rend hommage à la révolte des Comuneros de 1781. Son téléphérique de 6,3 km est une prouesse d'ingénierie qui franchit le gouffre d'un versant à l'autre.",
        biodiversity: {
          fauna: [
            "Chèvres sauvages du canyon",
            "Aigles et faucons migrateurs",
            "Iguanes des roches",
            "Troglodytes de Nicéforo",
            "Lézards à collier"
          ],
          flora: [
            "Cactus candélabres géants",
            "Arbres ventrus du Chicamocha",
            "Broussailles épineuses xérophiles",
            "Agaves sauvages et figuiers de Barbarie"
          ]
        },
        attractions: [
          {
            id: "att_teleferico",
            name: "Téléphérique du Chicamocha",
            description: "Traversée aérienne spectaculaire de 6,3 km en 22 minutes plongeant au fond du gouffre avant de remonter vers le plateau de La Mesa de Los Santos."
          },
          {
            id: "att_monumento_santander",
            name: "Monument à la Culture de Santander",
            description: "Sculpture monumentale de 35 statues de bronze grandeur nature émergeant d'une feuille géante de tabac au bord du précipice."
          },
          {
            id: "att_parapente_panachi",
            name: "Parapente et Sensations Fortes",
            description: "Ascendances thermiques exceptionnelles pour planer à 1.500 m d'altitude, tyroliennes géantes et balançoire au-dessus du vide."
          },
          {
            id: "att_parque_acuatico",
            name: "Parc Aquatique du Chicamocha",
            description: "Piscines panoramiques avec rivière lente et toboggans spectaculaires face aux falaises vertigineuses du canyon."
          }
        ],
        howToGetThere: {
          fromBucaramanga: "54 km sur la route nationale (environ 50 min à 1 h en autocar).",
          fromBogota: "340 km via San Gil (situé à 40 km au nord de San Gil, environ 45 min).",
          airTransfer: "Vol vers l'Aéroport International Palonegro (BGA) + navette touristique panoramique."
        }
      }
    }
  }
];
