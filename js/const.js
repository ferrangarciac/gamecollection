//minifier HTML: https://www.willpeavy.com/tools/minifier/
//Covers de steam: https://steamcdn-a.akamaihd.net/steam/apps/xxxxxx/library_600x900_2x.jpg

const PLATFORMS = {
	COLOR: ["red", "blue", "yellow", "pink", "white", "green", "orange"],
	NAME: ["SNES", "GB", "GBA", "NDS", "3DS", "NGC", "Wii", "Wii U", "Switch", "PSOne", "PS2", "PS3", "PS4", "PSP", "XBOX360", "PC"]
}

const GAMES = [{
		gameId: "pkmespada",
		crown: "gold",
		platformId: "switch",
		commentHTML: "<ul><li>Juego Base:<ul><li>Pokédex de Galar completa.<li>Todas las formas alternativas.<li>Todas las recompensas de la Torre Batalla conseguidas.<li>Todos los objetos del juego base conseguidos.<li>Todos los Pokémon especiales (Promoted) del Área Salvaje conseguidos.<li>Todas las tarjetas de jugador del juego base conseguidas.<li>Toda la ropa del juego base conseguida.</ul><li>V.1.0<ul><li>Todo lo anterior.<li>Slowpoke de Galar cazado.</ul></ul>",
		gameName: "pokémon edición espada"
	},
	{
		gameId: "hmprojectmirai",
		crown: "silver",
		platformId: "3ds",
		commentHTML: "",
		gameName: "Hatsune Miku: Project Mirai DX"
	},
	{
		gameId: "ff4_pc",
		crown: "silver",
		platformId: "pc",
		commentHTML: "<ul><li>Partida 1: 99% primera vuelta.<li>Partida 2: Inicio de la segunda vuelta.<ul><li>Todos los logros de steam conseguibles en la primera vuelta.</ul></ul>",
		gameName: "Final Fantasy IV (Steam)"
	},
	{
		gameId: "ie3",
		crown: "silver",
		platformId: "3ds",
		commentHTML: "",
		gameName: "Inazuma Eleven 3: Fuego Explosivo"
	},
	{
		gameId: "iego",
		crown: "silver",
		platformId: "3ds",
		commentHTML: "<ul><li>Versión PAL<li>Juego completado.</ul>",
		gameName: "Inazuma Eleven GO: Luz"
	},
	{
		gameId: "iego2",
		crown: "silver",
		platformId: "3ds",
		commentHTML: "<ul><li>Versión PAL<li>Juego completado.<li>Partida al ~80%.</ul>",
		gameName: "Inazuma Eleven GO Chrono Stones: Llamarada"
	},
	{
		gameId: "pw5",
		crown: "gold",
		platformId: "3ds",
		commentHTML: "<ul><li>Versión PAL (eShop)<li>Todos los capítulos desbloqueados y completados (excepto DLC).</ul>",
		gameName: "Phoenix Wright: Ace Attorney - Dual Destinies"
	},
	{
		gameId: "laytonpw",
		crown: "gold",
		platformId: "3ds",
		commentHTML: "",
		gameName: "Professor Layton vs. Phoenix Wright: Ace Attorney"
	},
	{
		gameId: "dragonballfusions",
		crown: "silver",
		platformId: "3ds",
		commentHTML: "",
		gameName: "Dragon Ball Fusions"
	},
	{
		gameId: "projectxzone2",
		crown: "silver",
		platformId: "3ds",
		commentHTML: "",
		gameName: "Project X Zone 2"
	},
	{
		gameId: "remercenaries",
		crown: "silver",
		platformId: "3ds",
		commentHTML: "",
		gameName: "Residen Evil Mercenaries 3D"
	},
	{
		gameId: "rerevelations",
		crown: "silver",
		platformId: "3ds",
		commentHTML: "",
		gameName: "Residen Evil Revelations"
	},
	{
		gameId: "tffcc",
		crown: "silver",
		platformId: "3ds",
		commentHTML: "",
		gameName: "Theatrhythm Final Fantasy: Curtain Call"
	},
	{
		gameId: "mgsvr",
		crown: "gold",
		platformId: "psone",
		commentHTML: "<ul><li>Modo Mei Ling Photo Shoot desbloqueado.<li>Modo Mystery Mode desbloqueado.<li>Modo NG Selection Mode desbloqueado.<li>Modo Ninja Mode desbloqueado.<li>Modo Picture of Metal Gear RAY desbloqueado.<li>Modo Puzzle Mode desbloqueado.<li>Modo Secret Pictures desbloqueado.</ul>",
		gameName: "Metal Gear Solid Special Missions"
	},
	{
		gameId: "spf2turbo",
		crown: "gold",
		platformId: "psone",
		commentHTML: "<ul><li>Versión USA.<li>Todos los desafios completados.<li>Modo Hard desbloqueado.<li>Todos los extras desbloqueados.<li>Canción de Sakura desbloqueada.</ul>",
		gameName: "Super Puzzle Fighter II Turbo"
	},
	{
		gameId: "tekken3",
		crown: "gold",
		platformId: "psone",
		commentHTML: "<ul><li>Todos los personajes desbloqueados.<li>Theatre Mode desbloqueado.<li>Tekken Ball Mode desbloqueado.<li>Trajes especiales de Anna, Jack, Jin y Xiaoyu desbloqueados.</ul>",
		gameName: "Tekken 3"
	},
	{
		gameId: "ffdissidia",
		crown: "silver",
		platformId: "psp",
		commentHTML: "<ul><li>Tiempo: 133:48.<li>Todos los personajes desbloqueados.<li>Todas las odiseas desbloquadas.<li>10 odiseas al 100%.<li>Todos los objetos del catálogo comprados.<li>Armas finales de Zidane, Artemisa y Butz.</ul>",
		gameName: "Dissidia: Final Fantasy"
	},
	{
		gameId: "ffdissidia012",
		crown: "silver",
		platformId: "psp",
		commentHTML: "<ul><li>Tiempo: 17:51:54<li>Modo Historia completado.<li>Yuna, Tifa, Butz, Terra, Zidane, Golbez, Artemisa, Shantoto y Prishe a nivel 100<li>Armas finales de Yuna, Tifa, Terra, Zidane, Artemisa y Squall.<li>Catálogo PP al 75%</ul>",
		gameName: "Dissidia 012 [duodecim]: Final Fantasy"
	},
	{
		gameId: "shinbudokai",
		crown: "gold",
		platformId: "psp",
		commentHTML: "",
		gameName: "Dragon Ball Z: Shin Budokai"
	},
	{
		gameId: "shinbudokai2",
		crown: "gold",
		platformId: "psp",
		commentHTML: "<ul><li>Versión USA.</ul>",
		gameName: "Dragon Ball Z: Shin Budokai 2"
	},
	{
		gameId: "miku",
		crown: "silver",
		platformId: "psp",
		commentHTML: "<ul><li>Todas las canciones desbloqueadas.<li>Modo Hard de todas las canciones desbloqueadas.<li>Todos los módulos (skins) desbloqueados.<li>Galería de imágenes al 94%.<li>Objetos de la habitacíon al ~95%.</ul>",
		gameName: "Hatsune Miku: Project Diva"
	},
	{
		gameId: "miku2",
		crown: "gold",
		platformId: "psp",
		commentHTML: "",
		gameName: "Hatsune Miku: Project Diva 2nd"
	},
	{
		gameId: "mikuextend",
		crown: "gold",
		platformId: "psp",
		commentHTML: "",
		gameName: "Hatsune Miku: Project Diva Extend"
	},
	{
		gameId: "khbbs",
		crown: "copper",
		platformId: "psp",
		commentHTML: "<ul><li>Tiempo: 15:31.<li>Partida completada con Aqua.</ul>",
		gameName: "Kingdom Hearts: Birth by Sleep"
	},
	{
		gameId: "mgspw",
		crown: "silver",
		platformId: "psp",
		commentHTML: "<ul><li>Todas las misiones completadas.<li>Todas las missiones exteriores realizadas.<li>Objetos y planos al ~90%</ul>",
		gameName: "Metal Gear Solid: Peace Walker"
	},
	{
		gameId: "ssomega",
		crown: "silver",
		platformId: "psp",
		commentHTML: "<ul><li> Modo historia completado.</ul>",
		gameName: "Saint Seiya Omega: Ultimate Cosmo"
	},
	{
		gameId: "taikodx",
		crown: "silver",
		platformId: "psp",
		commentHTML: "<ul><li>Modo Oni desbloqueado.<li>Varios records (incluido DLCs).</ul>",
		gameName: "Taiko no Tatsujin Portable DX"
	},
	{
		gameId: "acr",
		crown: "gold",
		platformId: "wii",
		commentHTML: "",
		gameName: "Another Code R: A Journey into Lost Memories"
	},
	{
		gameId: "traumawii",
		crown: "silver",
		platformId: "wii",
		commentHTML: "<ul><li>Tiempo: 12:48:36.<li>Modo Normal completado.<li>Misiones X desbloqueadas y completadas.</ul>",
		gameName: "Trauma Center: Second Opinion"
	},
	{
		gameId: "alanwake",
		crown: "silver",
		platformId: "xbox360",
		commentHTML: "",
		gameName: "Alan Wake"
	},
	{
		gameId: "batman1",
		crown: "silver",
		platformId: "xbox360",
		commentHTML: "",
		gameName: "Batman: Arkham Asylum"
	},
	{
		gameId: "bluedragon",
		crown: "copper",
		platformId: "xbox360",
		commentHTML: "<ul><li>Partida NO completada.<li>Partida guradada en cada disco.</ul>",
		gameName: "Blue Dragon"
	},
	{
		gameId: "dmc4",
		crown: "gold",
		platformId: "xbox360",
		commentHTML: "<ul><li>Todas las pantallas en rango S en todas las dificultades (menos fácil)<li>Palacio Sangriento completado.<li>Todas las misiones secretas completadas.</ul>",
		gameName: "Devil May Cry 4"
	},
	{
		gameId: "dmchd",
		crown: "copper",
		platformId: "xbox360",
		commentHTML: "<ul><li>Devil May Cry 1 completado.</ul>",
		gameName: "Devil May Cry HD Collection"
	},
	{
		gameId: "dmc360",
		crown: "gold",
		platformId: "xbox360",
		commentHTML: "",
		gameName: "DmC: Devil May Cry"
	},
	{
		gameId: "dbzbudokaihd",
		crown: "gold",
		platformId: "xbox360",
		commentHTML: "<ul><li>Dragon Ball Budokai 1 a 1000G y al 100%.<li>Dragon Ball Budokai 3 a 1000G.<li>Todas las cápsulas del Budokai 3 menos las especiales de las voces.</ul>",
		gameName: "Dragon Ball Z Budokai HD Collection"
	},
	{
		gameId: "dbzburstlimit",
		crown: "gold",
		platformId: "xbox360",
		commentHTML: "",
		gameName: "Dragon Ball Z: Burst Limit"
	},
	{
		gameId: "eternalsonata",
		crown: "gold",
		platformId: "xbox360",
		commentHTML: "<ul><li>Detalles de la partida (ranura 1):<ul><li>Partida salvada para comenzar la segunda vuelta (encore mode) con todo conseguido en la primera.</ul><li>Detalles de la partida (ranura 2):<ul><li>Oro: 99999999.<li>Todos los personajes a nivel 99.<li>Todos los objetos, armas y partituras.<li>Aniquilador (enemigo final del Unísono Misterioso) por derrotar.</ul><li>Detalles de la partida (ranura 3):<ul><li>Oro: 99999999.<li>Todos los personajes a nivel 99.<li>Todos los objetos, armas y partituras.<li>Aniquilador (enemigo final del Unísono Misterioso) derrotado.</ul></ul>",
		gameName: "Eternal Sonata"
	},
	{
		gameId: "galaga",
		crown: "gold",
		platformId: "xbox360",
		commentHTML: "",
		gameName: "Galaga"
	},
	{
		gameId: "magnacarta2",
		crown: "gold",
		platformId: "xbox360",
		commentHTML: "<ul><li>Partida al 100%.<li>Sólo se puede utilizar si se tienen instaladas las DLCs.</ul>",
		gameName: "Magna Carta 2"
	},
	{
		gameId: "mgsrising",
		crown: "silver",
		platformId: "xbox360",
		commentHTML: "",
		gameName: "Metal Gear Rising: Revengeance"
	},
	{
		gameId: "mgspw360",
		crown: "gold",
		platformId: "xbox360",
		commentHTML: "",
		gameName: "Metal Gear Solid: Peace Walker HD"
	},
	{
		gameId: "mgsgz",
		crown: "silver",
		platformId: "xbox360",
		commentHTML: "",
		gameName: "Metal Gear Solid V: Ground Zeroes"
	},
	{
		gameId: "nplus",
		crown: "copper",
		platformId: "xbox360",
		commentHTML: "",
		gameName: "N+"
	},
	{
		gameId: "naruto2",
		crown: "gold",
		platformId: "xbox360",
		commentHTML: "",
		gameName: "Naruto Shippuden: Ultimate Ninja Storm 2"
	},
	{
		gameId: "pacmancdx",
		crown: "gold",
		platformId: "xbox360",
		commentHTML: "",
		gameName: "Pac-Man Championship Edition DX"
	},
	{
		gameId: "re5",
		crown: "gold",
		platformId: "xbox360",
		commentHTML: "",
		gameName: "Resident Evil 5"
	},
	{
		gameId: "recv",
		crown: "silver",
		platformId: "xbox360",
		commentHTML: "",
		gameName: "Resident Evil Code: Veronica X HD"
	},
	{
		gameId: "rerevelations360",
		crown: "silver",
		platformId: "xbox360",
		commentHTML: "<ul><li>Modo historia completado.<li>Todas las fases del modo Raid desbloqueadas.</ul>",
		gameName: "Resident Evil: Revelations"
	},
	{
		gameId: "rof",
		crown: "copper",
		platformId: "xbox360",
		commentHTML: "<ul><li>Juego NO completado.</ul>",
		gameName: "Resonance of Fate"
	},
	{
		gameId: "sonicracing1",
		crown: "copper",
		platformId: "xbox360",
		commentHTML: "<ul><li>Varios personajes y pistas desbloqueados.</ul>",
		gameName: "Sonic & Sega All-Stars Racing"
	},
	{
		gameId: "sonic1",
		crown: "gold",
		platformId: "xbox360",
		commentHTML: "<ul><li>Incluye save states con todas las esmeraldas del caos.</ul>",
		gameName: "Sonic the Hedgehog"
	},
	{
		gameId: "sonic2",
		crown: "gold",
		platformId: "xbox360",
		commentHTML: "<ul><li>Incluye save states con todas las esmeraldas del caos.</ul>",
		gameName: "Sonic the Hedgehog 2"
	},
	{
		gameId: "sc5-2",
		crown: "silver",
		platformId: "xbox360",
		commentHTML: "<ul><li>Completado en la dificultad normal.<li>Algunos trajes y objetos desbloqueados.</ul>",
		gameName: "Space Channel 5 Part 2"
	},
	{
		gameId: "starocean4",
		crown: "silver",
		platformId: "xbox360",
		commentHTML: "<ul><li>Partida completada.<li>Objetos de receta al 99%<li>Reina Etheria derrotada varias veces (pero no todas).</ul>",
		gameName: "Star Ocean: The Last Hope"
	},
	{
		gameId: "sf4",
		crown: "silver",
		platformId: "xbox360",
		commentHTML: "",
		gameName: "Street Fighter IV"
	},
	{
		gameId: "ssf4ae",
		crown: "silver",
		platformId: "xbox360",
		commentHTML: "",
		gameName: "Super Street Fighter IV: Arcade Edition"
	},
	{
		gameId: "svcsor",
		crown: "gold",
		platformId: "xbox360",
		commentHTML: "<ul><li>Los tres juegos completados.<li>Incluye replay y save states (para modo 2 players) en los tres juegos.</ul>",
		gameName: "SVC: Street of Rage"
	},
	{
		gameId: "tov",
		crown: "silver",
		platformId: "xbox360",
		commentHTML: "<ul><li>Partida completada.<li>También hay una partida salvada antes del combate final.</ul>",
		gameName: "Tales of Vesperia"
	},
	{
		gameId: "tekken6",
		crown: "gold",
		platformId: "xbox360",
		commentHTML: "<ul><li>Efectos beta desbloqueados (mediante edición de la partida, ya que no se pueden conseguir de forma legal).</ul>",
		gameName: "Tekken 6"
	},
	{
		gameId: "tenchuz",
		crown: "silver",
		platformId: "xbox360",
		commentHTML: "",
		gameName: "Tenchu Z"
	},
	{
		gameId: "kof13",
		crown: "silver",
		platformId: "xbox360",
		commentHTML: "",
		gameName: "The King of Fighters XIII"
	},
	{
		gameId: "exelica",
		crown: "silver",
		platformId: "xbox360",
		commentHTML: "",
		gameName: "Triggerheart Exelica"
	},
	{
		gameId: "phoenix1",
		crown: "gold",
		platformId: "nds",
		commentHTML: "",
		gameName: "Ace Attorney 1: Phoenix Wright"
	},
	{
		gameId: "phoenix2",
		crown: "gold",
		platformId: "nds",
		commentHTML: "",
		gameName: "Ace Attorney 2: Justice For All"
	},
	{
		gameId: "phoenix3",
		crown: "gold",
		platformId: "nds",
		commentHTML: "",
		gameName: "Ace Attorney 3: Trials and Tribulations"
	},
	{
		gameId: "phoenix4",
		crown: "gold",
		platformId: "nds",
		commentHTML: "",
		gameName: "Ace Attorney 4: Apollo Justice"
	},
	{
		gameId: "ac",
		crown: "gold",
		platformId: "nds",
		commentHTML: "",
		gameName: "Another Code: The Two Memories"
	},
	{
		gameId: "ghosttrick",
		crown: "gold",
		platformId: "nds",
		commentHTML: "",
		gameName: "Ghost Trick: Detective Fantasma"
	},
	{
		gameId: "traumands",
		crown: "gold",
		platformId: "nds",
		commentHTML: "",
		gameName: "Trauma Center: Under the Knive"
	},
	{
		gameId: "ouendan",
		crown: "gold",
		platformId: "nds",
		commentHTML: "",
		gameName: "Osu! Tatakae! Ouendan!"
	},
	{
		gameId: "ouendan2",
		crown: "gold",
		platformId: "nds",
		commentHTML: "",
		gameName: "Moero! Nekketsu Rhythm Damashii Osu! Tatakae! Ouendan 2"
	},
	{
		gameId: "eba",
		crown: "silver",
		platformId: "nds",
		commentHTML: "",
		gameName: "Elite Beat Agents"
	},
	{
		gameId: "jss",
		crown: "silver",
		platformId: "nds",
		commentHTML: "",
		gameName: "Jump Superstars"
	},
	{
		gameId: "jus",
		crown: "silver",
		platformId: "nds",
		commentHTML: "",
		gameName: "Jump Ultimate Stars"
	},
	{
		gameId: "mariokartds",
		crown: "silver",
		platformId: "nds",
		commentHTML: "",
		gameName: "Mario Kart DS"
	},
	{
		gameId: "projectrub",
		crown: "gold",
		platformId: "nds",
		commentHTML: "",
		gameName: "Project Rub"
	},
	{
		gameId: "yoshids",
		crown: "gold",
		platformId: "nds",
		commentHTML: "",
		gameName: "Yoshi Touch & Go"
	},
	{
		gameId: "pkmplatino",
		crown: "gold",
		platformId: "nds",
		commentHTML: "<ul><li>Pokédex completa.<li>Todos los Pokémon cazados.<li>Todas las formas de Unown cazadas.<li>Frente Batalla superado.<li>Todos los concursos superados.<li>Ficha de entrenador a 5 estrellas.</ul>",
		gameName: "Pokémon Edición Platino"
	},
	{
		gameId: "re2",
		crown: "gold",
		platformId: "ngc",
		commentHTML: "",
		gameName: "Resident Evil 2"
	},
	{
		gameId: "re3",
		crown: "gold",
		platformId: "ngc",
		commentHTML: "",
		gameName: "Resident Evil 3"
	},
	{
		gameId: "ffv_pc",
		crown: "gold",
		platformId: "pc",
		commentHTML: "<ul><li>Partida 1: Al final del primer mundo.<li>Partida 2: Al final del segundo mundo.<li>Partida 3: Al final del juego.<li>Partida 4: Tras completar el juego.<ul><li>Juego al 100%<li>Todos los logros de steam desbloqueados.</ul></ul>",
		gameName: "Final Fantasy V (Steam)"
	},
	{
		gameId: "ff7_pc",
		crown: "gold",
		platformId: "pc",
		commentHTML: "<ul><li>Todos los objetos conseguibles a 99 unidades (menos guia y los de Gold Saucer).<li>Niveles 99 con estados a 255.<li>Todas las materias a maestro (excepto submarina).<ul><li>Juego al 100%<li>Todos los logros de steam desbloqueados.</ul></ul>",
		gameName: "Final Fantasy VII (Steam)"
	},
	{
		gameId: "ff10_pc",
		crown: "gold",
		platformId: "pc",
		commentHTML: "<ul><li>Hay una partida guardada en cada punto del juego de 'continuación de historia'. Además las 2 partidas más recientes son:<li>Antes de derrotar a los Eones Oscuros (con todos los parámetros al máximo y todo conseguido).<li>Destino de Verdugo final desbloqueado.</ul></ul>",
		gameName: "Final Fantasy X (Steam)"
	},
	{
		gameId: "steinsgate_pc",
		crown: "gold",
		platformId: "pc",
		commentHTML: "<ul><li>Para poder ejecutar las partidas hay que tener la misma versión de la traducción utilizada (incluida en el .rar) sobre la versión japonesa de PC.<li>También incluye el AppLocale. Necesario para ver los textos en español.<ul><li>Saves Ordenados:<li>No. 01 - Capítulo 1<li>No. 02 - Capítulo 2<li>No. 03 - Capítulo 3<li>No. 04 - Capítulo 4<li>No. 05 - Capítulo 5<li>No. 06 - Capítulo 6<li>No. 07 - Capítulo 6 - Final de Suzuha<li>No. 08 - Capítulo 7<li>No. 09 - Capítulo 7 - Final de Faris<li>No. 10 - Capítulo 8<li>No. 11 - Capítulo 8 - Final de Luka<li>No. 12 - Capítulo 9<li>No. 13 - Capítulo 10 - Final de Mayuri<li>No. 14 - Capítulo 10 - Final de Kurisu<li>No. 15 - Capítulo 11 - True Ending</ul></ul>",
		gameName: "Steins;Gate"
	},
	{
		gameId: "steinsgate0",
		crown: "silver",
		platformId: "pc",
		commentHTML: "<ul><li>Para poder ejecutar las partidas hay que tener la misma versión de la traducción utilizada (incluida en el .rar) sobre la versión japonesa de PC.<ul><li>Saves Ordenados:<li>No. 01 - Capítulo 1<li>No. 02 - Capítulo 2<li>No. 03 - Capítulo 3<li>No. 04 - Capítulo 4<li>No. 05 - Capítulo 5</ul></ul>",
		gameName: "Steins;Gate 0"
	},
	{
		gameId: "tekken7_pc",
		crown: "silver",
		platformId: "pc",
		commentHTML: "",
		gameName: "Tekken 7"
	},
	{
		gameId: "danganronpa",
		crown: "silver",
		platformId: "pc",
		commentHTML: "",
		gameName: "Danganronpa: Trigger Happy Havoc"
	},
	{
		gameId: "danganronpa2",
		crown: "silver",
		platformId: "pc",
		commentHTML: "",
		gameName: "Danganronpa 2: Goodbye Despair"
	},
	{
		gameId: "dmc5",
		crown: "silver",
		platformId: "pc",
		commentHTML: "",
		gameName: "Devil May Cry V"
	},
	{
		gameId: "neptunia1",
		crown: "gold",
		platformId: "pc",
		commentHTML: "",
		gameName: "Hyperdimension Neptunia Re;Birth1"
	},
	{
		gameId: "neptunia2",
		crown: "silver",
		platformId: "pc",
		commentHTML: "",
		gameName: "Hyperdimension Neptunia Re;Birth2: Sisters Generation"
	},
	{
		gameId: "onimusha1_pc",
		crown: "gold",
		platformId: "pc",
		commentHTML: "<ul><li>Trajes alternativos desbloqueados.<li>Modo Espíritus Oni desbloqueado.<li>Modo Ultimate desbloqueado.<li>Ranuras<ol type='1'><li>Modo Normal: Antes de entrar en la zona final. Sin usar objetos de cura, a falta del genbu 1 para todos los documentos, todas las joyas y sin subir niveles de arma, al entrar en las mejoras sube la última mejora del brazalete.<li>Modo Normal: Como el anterior pero con las armas al máximo nivel y todas las fluoritas.<li>Modo Ultimate: Antes de entrar en la zona final. Preparado para completar partida con rango S.</ol></ul>",
		gameName: "Onimusha Warlords"
	},
	{
		gameId: "fft0",
		crown: "silver",
		platformId: "pc",
		commentHTML: "",
		gameName: "Final Fantasy Type 0 Remastered"
	},
	{
		gameId: "cvs2",
		crown: "gold",
		platformId: "ps2",
		commentHTML: "",
		gameName: "Capcom VS. SNK 2"
	},
	{
		gameId: "dmc3",
		crown: "silver",
		platformId: "ps2",
		commentHTML: "<ul><li>Partida completada en dificultad normal.</ul>",
		gameName: "Devil May Cry 3"
	},
	{
		gameId: "hack1",
		crown: "silver",
		platformId: "ps2",
		commentHTML: "",
		gameName: ".hack//INFECTION"
	},
	{
		gameId: "hack2",
		crown: "silver",
		platformId: "ps2",
		commentHTML: "<ul><li>Partida completada.<li>Heredada de .hack//INFECTION.</ul>",
		gameName: ".hack//MUTATION"
	},
	{
		gameId: "itadaki",
		crown: "silver",
		platformId: "ps2",
		commentHTML: "<ul><li>Varios personajes desbloqueados.<li>Todos los escenarios desbloqueados.<li>Modo esferas desbloqueado.</ul>",
		gameName: "DQ & FF in Itadaki Street Special"
	},
	{
		gameId: "dbzb1",
		crown: "gold",
		platformId: "ps2",
		commentHTML: "",
		gameName: "Dragon Ball Z Budokai"
	},
	{
		gameId: "dbzb2",
		crown: "silver",
		platformId: "ps2",
		commentHTML: "",
		gameName: "Dragon Ball Z Budokai 2"
	},
	{
		gameId: "dbzb3",
		crown: "gold",
		platformId: "ps2",
		commentHTML: "",
		gameName: "Dragon Ball Z Budokai 3"
	},
	{
		gameId: "dbzb3ce",
		crown: "gold",
		platformId: "ps2",
		commentHTML: "<ul><li>Todas las cápsulas conseguidas menos las de voces.<li>Desbloqueados los nuevos skins de la versión CE.</ul>",
		gameName: "Dragon Ball Z Budokai 3 CE"
	},
	{
		gameId: "dbziw",
		crown: "gold",
		platformId: "ps2",
		commentHTML: "",
		gameName: "Dragon Ball Z Budokai - Infinite World"
	},
	{
		gameId: "dbzt1",
		crown: "gold",
		platformId: "ps2",
		commentHTML: "",
		gameName: "Dragon Ball Z Budokai Tenkaichi"
	},
	{
		gameId: "dbzt2",
		crown: "gold",
		platformId: "ps2",
		commentHTML: "",
		gameName: "Dragon Ball Z Budokai Tenkaichi 2"
	},
	{
		gameId: "dbzt3",
		crown: "gold",
		platformId: "ps2",
		commentHTML: "",
		gameName: "Dragon Ball Z Budokai Tenkaichi 3"
	},
	{
		gameId: "track",
		crown: "gold",
		platformId: "ps2",
		commentHTML: "<ul><li>Todas las pruebas desbloqueadas.<li>Modo experto de la prueba de baile desbloqueado.<li>Todos los extras desbloqueados.<li>'Record Mundial' en todas las pruebas.</ul>",
		gameName: "ESPN International Track & Field"
	},
	{
		gameId: "ff10",
		crown: "gold",
		platformId: "ps2",
		commentHTML: "<ul><li>Tiempo: 158:08<li>Tablero de esferas avanzado.<li>Todas las Armas de los siete astros.<li>Accesorios para todos los personajes con 'Expansión de VIT', 'AutoPrisa', 'AutoCoraza', 'Cinta'.<li>Armas personalizadas para todos los personajes con 'Expansión de daño', 'PM=1', 'Turbo Triple', 'Evade y Ataca'.<li>Armas para todos los personajes con 'PH x 3', 'Turbo por PH', 'Turbo Triple'.<li>Parámetros a 255 con todos los personajes.<li>Eones Oscuros derrotados.<li>10 monstruos de cada cazados.<li>Verdugo final por derrotar.</ul>",
		gameName: "Final Fantasy X"
	},
	{
		gameId: "kh1",
		crown: "silver",
		platformId: "ps2",
		commentHTML: "<ul><li>Nivel 54<li>Tiempo: 35:20<li>Partida salvada en 'Almacen'.<li>Juego listo para completar.</ul>",
		gameName: "Kingdom Hearts"
	},
	{
		gameId: "kh2",
		crown: "silver",
		platformId: "ps2",
		commentHTML: "<ul><li>Nivel 45<li>Tiempo: 38:31<li>Partida guardada en 'Altar del no ser' (justo antes del jefe final).</ul>",
		gameName: "Kingdom Hearts II"
	},
	{
		gameId: "klonoa2",
		crown: "silver",
		platformId: "ps2",
		commentHTML: "",
		gameName: "Klonoa 2: Lunatea's Veil"
	},
	{
		gameId: "naruto1",
		crown: "gold",
		platformId: "ps2",
		commentHTML: "",
		gameName: "Naruto Narutimate Hero"
	},
	{
		gameId: "narutonh2",
		crown: "silver",
		platformId: "ps2",
		commentHTML: "<ul><li>Partida al ~99%.</ul>",
		gameName: "Naruto Narutimate Hero 2"
	},
	{
		gameId: "onimusha1",
		crown: "silver",
		platformId: "ps2",
		commentHTML: "",
		gameName: "Onimusha: Warlords"
	},
	{
		gameId: "onimusha2",
		crown: "silver",
		platformId: "ps2",
		commentHTML: "<ul><li>Partida completada.<li>Funciones especiales desbloqueadas.<li>Tiempo: 9:00<li>Partida guardada antes del jefe final.</ul>",
		gameName: "Onimusha 2: Samurai's Destiny"
	},
	{
		gameId: "pz1",
		crown: "silver",
		platformId: "ps2",
		commentHTML: "<ul><li> Partida guardada en el último capítulo lista para completar el juego.</ul>",
		gameName: "Project Zero"
	},
	{
		gameId: "pz3",
		crown: "silver",
		platformId: "ps2",
		commentHTML: "<ul><li>Juego completado.<li>Partidas guardadas en varios momentos del juego, incluida una antes del jefe final.</ul>",
		gameName: "Project Zero 3: The Tormented"
	},
	{
		gameId: "sc5",
		crown: "silver",
		platformId: "ps2",
		commentHTML: "<ul><li>Juego completado.<li>Partida al 89%</ul>",
		gameName: "Space Channel 5"
	},
	{
		gameId: "sc5p2",
		crown: "silver",
		platformId: "ps2",
		commentHTML: "<ul><li>Completado en la dificultad normal.<li>Algunos trajes y objetos desbloqueados.</ul>",
		gameName: "Space Channel 5 Part 2"
	},
	{
		gameId: "sfex3",
		crown: "gold",
		platformId: "ps2",
		commentHTML: "",
		gameName: "Street Fighter EX3"
	},
	{
		gameId: "tekken4",
		crown: "gold",
		platformId: "ps2",
		commentHTML: "",
		gameName: "Tekken 4"
	},
	{
		gameId: "tekken5",
		crown: "gold",
		platformId: "ps2",
		commentHTML: "",
		gameName: "Tekken 5"
	},
	{
		gameId: "tenchufs",
		crown: "silver",
		platformId: "ps2",
		commentHTML: "<ul><li>Juego completado en dificultad normal.<li>Varias misiones completadas en rango Asesino/Gran Maestro en varias dificultades y disposiciones.<li>Todos los trajes desbloqueados para Ayame y Rin.<li>Todas las técnicas desbloqueadas para Ayame y Rin.<li>Todos los objetos conseguidos.</ul>",
		gameName: "Tenchu - Fatal Shadows"
	},
	{
		gameId: "mikudt1",
		crown: "gold",
		platformId: "ps3",
		commentHTML: "",
		gameName: "Hatsune Miku: Project Diva - Dreamy Theater"
	},
	{
		gameId: "mikudt2",
		crown: "gold",
		platformId: "ps3",
		commentHTML: "",
		gameName: "Hatsune Miku: Project Diva - Dreamy Theater 2nd"
	},
	{
		gameId: "mikudtextend",
		crown: "gold",
		platformId: "ps3",
		commentHTML: "",
		gameName: "Hatsune Miku: Project Diva - Dreamy Theater Extend"
	},
	{
		gameId: "mikuf1jap",
		crown: "gold",
		platformId: "ps3",
		commentHTML: "<ul><li> Versión JAP.</ul>",
		gameName: "Hatsune Miku: Project Diva F"
	},
	{
		gameId: "mikuf1usa",
		crown: "silver",
		platformId: "ps3",
		commentHTML: "<ul><li>Versión USA.<li>Todos desbloqueado menos lo referente a la DIVA Room.</ul>",
		gameName: "Hatsune Miku: Project Diva F"
	},
	{
		gameId: "mikuf2jap",
		crown: "silver",
		platformId: "ps3",
		commentHTML: "<ul><li>Versión JAP.<li>Todo desbloqueado menos lo referente a la DIVA Room.</ul>",
		gameName: "Hatsune Miku: Project Diva F 2nd"
	},
	{
		gameId: "ico",
		crown: "copper",
		platformId: "ps3",
		commentHTML: "<ul><li> ICO completado.</ul>",
		gameName: "ICO & Shadow of the Colossus HD"
	},
	{
		gameId: "ninokuni",
		crown: "silver",
		platformId: "ps3",
		commentHTML: "",
		gameName: "Ni no Kuni: Wrath of the White Witch"
	},
	{
		gameId: "ssbos",
		crown: "silver",
		platformId: "ps3",
		commentHTML: "",
		gameName: "Saint Seiya: Sanctuary Battle"
	},
	{
		gameId: "ssbravesoldiers",
		crown: "silver",
		platformId: "ps3",
		commentHTML: "<ul><li>Modo historia completado.<li>Todos los personajes desbloqueados.</ul>",
		gameName: "Saint Seiya: Brave Soldiers"
	},
	{
		gameId: "tox",
		crown: "silver",
		platformId: "ps3",
		commentHTML: "<ul><li>Partida completada.<li>Partida guardada antes del jefe final.</ul>",
		gameName: "Tales of Xillia"
	},
	{
		gameId: "mikufuturetone",
		crown: "silver",
		platformId: "ps4",
		commentHTML: "",
		gameName: "Hatsune Miku: Project Diva - Future Tone"
	},
	{
		gameId: "mikux",
		crown: "silver",
		platformId: "ps4",
		commentHTML: "",
		gameName: "Hatsune Miku: Project Diva X"
	},
	{
		gameId: "pkmamarillo",
		crown: "gold",
		platformId: "gb",
		commentHTML: "<ul><li>Juego completado.<li>Pokédex completa.<li>Pokémon fósiles, pokémon de otras ediciones y Mew han sido cazados mediante el bug de Mew.<li>Magmar cazado mediante el bug del Magmar starter.<li>Venusaur, Nidoking y Gengar a nivel 100 cazados con el bug que permite alcanzar el nivel 100 en un encuentro.<li>MissingNo. capturado.<li>Ditto variocolor (aunque no se vea), cazado mediante el bug del Gyaradoss variocolor del Pokemon O/P/C.<li>Se han realizado varios clones, pero no hay nada hackeado mediante programas externos.</ul>",
		gameName: "Pokémon Edición Amarilla"
	},
	{
		gameId: "pkmplata",
		crown: "gold",
		platformId: "gb",
		commentHTML: "<ul><li>Juego completado.<li>Pokédex completa.<li>Celebi cazado mediante bug de Sneasel.<li>Celebi dipositado en la caja 'Trades' procedente del evento Celebi Tour.<li>Todos los variocolores legales (Ditto variocolor importado de Pokémon Amarillo utilizando el bug del Gyaradoss variocolor).</ul>",
		gameName: "Pokémon Edición Plata"
	},
	{
		gameId: "ff6_advance",
		crown: "gold",
		platformId: "gba",
		commentHTML: "<ul><li>Tiempo: 86:04 h.<li>Todos los personajes a nivel 100.<li>Todos los personajes con todas las habilidades aprendidas (incluidas magias, cóleras de Gau y Bagajes de Strago).<li>Bestiario al 100%.<li>Dragón Keiser derrotado.<li>Templo de las almas superado (Corona de maestro conseguida).</ul>",
		gameName: "Final Fantasy VI Advance"
	},
	{
		gameId: "pokemon_vh",
		crown: "silver",
		platformId: "gba",
		commentHTML: "<ul><li>Tiempo: 65:26 h.<li>Liga Pokémon Completada.<li>Pokédex completa.<li>Todos los Pokémon ordenados en las cajas.<li>Unowns de la A a la Z.<ul><li>Se utilizó GameShark para activar los eventos que permiten cazar a MEW, DEOXYS, etc. ya que no se pudieron obtener en nuestros lares, pero los Pokémon son cazados legales.<li>Se clonaron varios ítems en la versión Esmeralda, como objetos de evolución, Master Balls, etc. Esto no implica a los Pokémon. No hay ningún clon en las cajas, todos vienen del propio juego, son huevos, intercambiados de otros juegos o salvados de antiguas partidas.<li>CELEBI hackeado. Insertado de una partida americana, del evento JAA 10 ANIV ya que no hay ningún modo legal (ni semi-legal) para conseguirlo. Debería ser legal.</ul></ul>",
		gameName: "Pokémon Edición Verde Hoja"
	},
	{
		gameId: "re2remake",
		crown: "silver",
		platformId: "pc",
		commentHTML: "<ul><li>Completados los escenarios A y B de ambos personajes.<li>Completados los Modos Hunk y Tofu.</ul>",
		gameName: "Resident Evil 2 Remake"
	},
	{
		gameId: "re3remake",
		crown: "silver",
		platformId: "pc",
		commentHTML: "",
		gameName: "Resident Evil 3 Remake"
	},
	{
		gameId: "inazumastrikers",
		crown: "silver",
		platformId: "wii",
		commentHTML: "",
		gameName: "Inazuma Eleven Strikers"
	},
	{
		gameId: "batenkaitos",
		crown: "silver",
		platformId: "ngc",
		commentHTML: "<ul><li>Juego completado.<li>Una de las partidas salvadas es en el punto final del juego.</ul>",
		gameName: "Baten Kaitos: Eternal Wings and the Lost Ocean"
	},
	{
		gameId: "chronocross",
		crown: "silver",
		platformId: "psone",
		commentHTML: "<ul><li>Juego completado.</ul>",
		gameName: "Chrono Cross"
	},
	{
		gameId: "ff6psx",
		crown: "silver",
		platformId: "psone",
		commentHTML: "",
		gameName: "Final Fantasy VI"
	},
	{
		gameId: "ff4psx",
		crown: "silver",
		platformId: "psone",
		commentHTML: "<ul><li>Juego completado.</ul>",
		gameName: "Final Fantasy Anthology: European Edition(FFIV)"
	},
	{
		gameId: "lod",
		crown: "silver",
		platformId: "psone",
		commentHTML: "<ul><li>Juego completado.</ul>",
		gameName: "The Legend of Dragoon"
	},
	{
		gameId: "tekken1",
		crown: "gold",
		platformId: "psone",
		commentHTML: "<ul><li>Todo desbloqueado, incluido Devil Kazuya.</ul>",
		gameName: "Tekken"
	},
	{
		gameId: "pkmazul",
		crown: "gold",
		platformId: "gb",
		commentHTML: "<ul><li>Juego completado.<li>Pokédex completa.<li>Pokémon fósiles, pokémon de otras ediciones y Mew han sido cazados mediante el bug de Mew.<li>Mew de evento (Caja 12), conseguido a través de la partida de distribución oficial.<li>La partida no ha pasado en ningún momento por editores de partidas.</ul>",
		gameName: "Pokémon Edición Azul"
	},
	{
		gameId: "dqI-II",
		crown: "silver",
		platformId: "snes",
		commentHTML: "<ul><li>Partida salvada DQI: Nivel máximo, arma y armadura de Roto conseguidas.<li><li>Partida salvada DQII: Cueva Rotho recorrida (con las últimas armaduras y espadas de la zona).<li>state0: (DQI) Al rescatar la princesa.<li>state1: (DQI) Frente al Rey Dragón (Jefe final).<li>state2: (DQI) Tras derrotar al jefe final.<li>state2: (DQII) Tras derrotar al jefe final.</ul>",
		gameName: "Dragon Quest I & II"
	},
	{
		gameId: "ffipr",
		crown: "gold",
		platformId: "pc",
		commentHTML: "<ul>   <li>Partida salvada antes del cambio de trabajos.<li>Partida salvada antes del jefe final.<li>Partida salvada tras completar el juego.<li>Bestiario al 100%.<li>Todos los personajes al nivel 99.</ul>",
		gameName: "Final Fantasy Pixel Remaster"
	}]
