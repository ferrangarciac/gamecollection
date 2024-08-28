var digital = true;
var repro = true;
var demo = true;

function fillStats(evt){
	var content = document.getElementById("content");
	content.innerHTML = "";
	
	var statSectionCountGames = document.createElement('div');
	statSectionCountGames.className = "stats-section";
	statSectionCountGames.id = 'statSectionCountGames';
	
	//CHKBOX CRIBA
	var chkDivDigital = document.createElement('div');
	chkDivDigital.className = 'stats-checkbox-container';
	content.appendChild(chkDivDigital);
	
	var chkDigital = document.createElement('input');
	chkDigital.type = 'checkbox';
    chkDigital.id = 'chkDigital';
    chkDigital.className = 'stats-checkbox';
	chkDigital.checked = !digital;
	chkDigital.addEventListener('change', function() {
			digital = !digital;
			fillStats();
	}, false);
	chkDivDigital.appendChild(chkDigital);
	
	var labelDigital = document.createElement('label');
	labelDigital.htmlFor = 'chkDigital';
	labelDigital.textContent = "Omitir juegos digitales";
	chkDivDigital.appendChild(labelDigital);
	
	var chkDivRepro = document.createElement('div');
	chkDivRepro.className = 'stats-checkbox-container';
	content.appendChild(chkDivRepro);
	
	var chkRepro = document.createElement('input');
	chkRepro.type = 'checkbox';
    chkRepro.id = 'chkRepro';
    chkRepro.className = 'stats-checkbox';
	chkRepro.checked = !repro;
	chkRepro.addEventListener('change', function() {
			repro = !repro;
			fillStats();
	}, false);
	chkDivRepro.appendChild(chkRepro);
	
	var labelRepro = document.createElement('label');
	labelRepro.htmlFor = 'chkRepro';
	labelRepro.textContent = "Omitir reproducciones";
	chkDivRepro.appendChild(labelRepro);
	
	var chkDivDemo = document.createElement('div');
	chkDivDemo.className = 'stats-checkbox-container';
	content.appendChild(chkDivDemo);
	
	var chkDemo = document.createElement('input');
	chkDemo.type = 'checkbox';
    chkDemo.id = 'chkDemo';
    chkDemo.className = 'stats-checkbox';
	chkDemo.checked = !demo;
	chkDemo.addEventListener('change', function() {
			demo = !demo;
			fillStats();
	}, false);
	chkDivDemo.appendChild(chkDemo);
	
	var labelDemo = document.createElement('label');
	labelDemo.htmlFor = 'chkDemo';
	labelDemo.textContent = "Omitir demostraciones";
	chkDivDemo.appendChild(labelDemo);
	
	
	//TITULO SECCION - JUEGOS X CONSOLA
	var titleContainer = document.createElement("div");
	titleContainer.className = "title-container";
	statSectionCountGames.appendChild(titleContainer);
	
	var title = document.createElement("h1");
	title.className = "title-section";
	title.innerHTML = "Datos Globales";
	titleContainer.appendChild(title);
	
	var subSectionGlobal = document.createElement('div');
	subSectionGlobal.className = 'stats-sub-section';
	statSectionCountGames.appendChild(subSectionGlobal);
	
	var gamesFiltered = getCustomGameArray();
	
	statsGamesPerPlatform(subSectionGlobal,gamesFiltered);
	
	statsGamesPerGenre(subSectionGlobal,gamesFiltered);
	
	//DATOS ANUALES
	var titleContainerAnual = document.createElement("div");
	titleContainerAnual.className = "title-container";
	statSectionCountGames.appendChild(titleContainerAnual);
	
	var titleAnual = document.createElement("h1");
	titleAnual.className = "title-section";
	titleAnual.innerHTML = "Datos Anuales";
	titleContainerAnual.appendChild(titleAnual);
	
	var subSectionAnual = document.createElement('div');
	subSectionAnual.className = 'stats-sub-section';
	statSectionCountGames.appendChild(subSectionAnual);
	
	//SELECT CON LOS AÑOS
	var labelYear = document.createElement('label');
	labelYear.setAttribute('for', 'selectYear');  // Asociar el label con el select
	labelYear.textContent = 'Elige un año para visualizar sus datos:';  // Texto del label
	
	var selectYear = document.createElement('select');
	selectYear.className = 'stats-select-year';
	selectYear.id = 'selectYear';
	
	var allYears = listYears(gamesFiltered);
	
	for (let i = 0; i < allYears.length; i++) {
		let option = document.createElement('option');
		option.value = allYears[i];
		option.textContent = allYears[i];
		
		// Capturamos el valor actual de la iteración en la función del event listener
		option.addEventListener('click', function() {
			anualGotGames(option.value,subSectionAnual,gamesFiltered); // Ahora el valor es el correcto
			anualGenreGames(option.value,subSectionAnual,gamesFiltered);
		}, false);

		selectYear.appendChild(option);
	}
	
	statSectionCountGames.appendChild(labelYear);
	statSectionCountGames.appendChild(selectYear);
	
	anualGotGames(new Date().getFullYear(),subSectionAnual);
	
	anualGenreGames(new Date().getFullYear(),subSectionAnual);
	
	
	
	content.appendChild(statSectionCountGames);
	
}

function getCustomGameArray(){
	var arrayTemp = GAMES;
	
	if(!digital){
		arrayTemp = GAMES.filter(game => game.gameType !== 2);
	}
	
	if(!repro){
		arrayTemp = arrayTemp.filter(arrayTemp => arrayTemp.gameType !== 3);
	}
	
	if(!demo){
		arrayTemp = arrayTemp.filter(arrayTemp => arrayTemp.gameType !== 4);
	}
	
	return arrayTemp;
	
}

function statsGamesPerPlatform(div,targetArray){
	//var content = document.getElementById("content");
	
	//GET INFO
	var platformGameQty = new Array();
	
	for(i=0;i<platforms.NAME.length;i++){
		platformGameQty[i] = countGames(targetArray, platforms.NAME[i].replace(/\s+/g, '').toLowerCase());
	}
	
	//PRINT CHART
	var divChart = document.createElement('div');
	divChart.className = 'stats-div-chart';
	
	var ctx = document.createElement('canvas');
	ctx.id = "stats-bar-allGames";
	
	
	ctx.width = 400;
	ctx.height = 600;

		new Chart(ctx, {
		type: 'bar',
		data: {
		  labels: platforms.NAMECOMPLETE,
		  datasets: [{
			label: 'Todos los Juegos',
			data: platformGameQty,
			borderWidth: 1
		  }]
		},
		options: {
			indexAxis: 'y',
			
			
		  scales: {
			y: {
			  beginAtZero: true
			}
		  },
		  plugins: {
			  title: {
				display: true,
				text: 'JUEGOS POR SISTEMA',
			  },
			  legend: {
				  display: false, // Esto oculta la leyenda completa
				position: 'right',
			  },
			}
		}
	});
	 
	divChart.appendChild(ctx);
	div.appendChild(divChart);
	
}

function statsGamesPerGenre(div,targetArray){
	//var content = document.getElementById("content");
	
	//GET INFO
	
	var genreTemp = new Array();
	var count=0;
	
	for(i=0;i<targetArray.length;i++){
		if(targetArray[i].genre !== ""){
			genreTemp[count] = targetArray[i].genre;
			count++;
		}
	}
	
	// Crear un objeto para contar las ocurrencias
	var contadorGeneros = genreTemp.reduce((contador, genero) => {
		// Si el género ya existe en el objeto, incrementar su valor
		contador[genero] = (contador[genero] || 0) + 1;
		return contador;
	}, {});

	// Convertir el objeto en un array de géneros únicos y sus conteos
	var genreResult = Object.entries(contadorGeneros).map(([genero, cantidad]) => ({
		genero,
		cantidad
	}));
	
	var genreName = new Array();
	var genreCount = new Array();
	
	for(i=0;i<genreResult.length;i++){
		genreName[i] = genreResult[i].genero;
		genreCount[i] = genreResult[i].cantidad;
	}
	
	
	//PRINT CHART
	var divChart = document.createElement('div');
	divChart.className = 'stats-div-chart';
	
	var ctx = document.createElement('canvas');
	ctx.id = "stats-bar-allGames";
	
	
	ctx.width = 400;
	ctx.height = 600;

		new Chart(ctx, {
		type: 'bar',
		data: {
		  labels: genreName,
		  datasets: [{
			label: 'Todos los Juegos',
			data: genreCount,
			borderWidth: 1
		  }]
		},
		options: {
			indexAxis: 'y',
			
			
		  scales: {
			y: {
			  beginAtZero: true
			}
		  },
		  plugins: {
			  title: {
				display: true,
				text: 'JUEGOS POR GÉNERO',
			  },
			  legend: {
				  display: false, // Esto oculta la leyenda completa
				position: 'right',
			  },
			}
		}
	});
	 
	divChart.appendChild(ctx);
	div.appendChild(divChart);
	
}

function anualGotGames(targetYear,div){
	//var content = document.getElementById("content");
	
	//var statsPerYearDiv = document.getElementById('statsPerYear');
	div.innerHTML = "";
	
	//GET INFO
	var arrayTemp = getYearArray(targetYear);
	
	
	var percentGames = new Array();
	
	var count = 0;
	
	for(i=0;i<platforms.NAME.length;i++){
		
		var currentPlatform = platforms.NAME[i].replace(/\s+/g, '').toLowerCase()
		
		if(countGames(arrayTemp, currentPlatform) > 0){
			percentGames[count] = new Array(platforms.NAME[i], countGames(arrayTemp, currentPlatform),0);
			count++;
		}
	}
	
	//GET PLATFORMS
	var plat = new Array();
	
	for(i=0;i<percentGames.length;i++){
		plat[i] = percentGames[i][0];
	}
	
	//GET COUNT
	var gameCount = new Array();
	
	for(i=0;i<percentGames.length;i++){
		gameCount[i] = percentGames[i][1];
	}
	
	//PRINT CHART
	var divChart = document.createElement('div');
	divChart.className = 'stats-div-chart';
	
	var ctx = document.createElement('canvas');
	ctx.id = "stats-doughnut";
	
	
	ctx.width = 400;
	ctx.height = 400;

		new Chart(ctx, {
		type: 'doughnut',
		data: {
		  labels: plat,
		  datasets: [{
			label: 'Juegos adquiridos',
			data: gameCount,
			borderWidth: 1
		  }]
		},
		options: {
		  scales: {
			y: {
			  beginAtZero: true
			}
		  },
		  plugins: {
			  title: {
				display: true,
				text: 'Adquisiciones en ' + targetYear,
			  }
			}
		}
	});
	 
	divChart.appendChild(ctx);
	div.appendChild(divChart);
}

function anualGenreGames(targetYear,div){
		
	//GET INFO
	var arrayTemp = getYearArray(targetYear);
	
	//GET INFO
	
	var genreTemp = new Array();
	var count=0;
	
	for(i=0;i<arrayTemp.length;i++){
		if(arrayTemp[i].genre !== ""){
			genreTemp[count] = arrayTemp[i].genre;
			count++;
		}
	}
	
	// Crear un objeto para contar las ocurrencias
	var contadorGeneros = genreTemp.reduce((contador, genero) => {
		// Si el género ya existe en el objeto, incrementar su valor
		contador[genero] = (contador[genero] || 0) + 1;
		return contador;
	}, {});

	// Convertir el objeto en un array de géneros únicos y sus conteos
	var genreResult = Object.entries(contadorGeneros).map(([genero, cantidad]) => ({
		genero,
		cantidad
	}));
	
	var genreName = new Array();
	var genreCount = new Array();
	
	for(i=0;i<genreResult.length;i++){
		genreName[i] = genreResult[i].genero;
		genreCount[i] = genreResult[i].cantidad;
	}
	
	//PRINT CHART
	var divChart = document.createElement('div');
	divChart.className = 'stats-div-chart';
	
	var ctx = document.createElement('canvas');
	ctx.id = "stats-doughnut";
	
	
	ctx.width = 400;
	ctx.height = 400;

		new Chart(ctx, {
		type: 'doughnut',
		data: {
		  labels: genreName,
		  datasets: [{
			label: 'Juegos adquiridos',
			data: genreCount,
			borderWidth: 1
		  }]
		},
		options: {
		  scales: {
			y: {
			  beginAtZero: true
			}
		  },
		  plugins: {
			  title: {
				display: true,
				text: 'GÉNEROS DE JUEGOS ADQUIRIDOS EN ' + targetYear,
			  }
			}
		}
	});
	 
	divChart.appendChild(ctx);
	div.appendChild(divChart);
}

function getYearArray(yearTarget){
	var arrayTemp = new Array();
	var count = 0;
	var dateTemp;
	
	for(i=0;i<GAMES.length;i++){
		dateTemp = new Date(GAMES[i].buyDate);
		
		if(dateTemp.getFullYear().toString() == yearTarget.toString()){
			
			arrayTemp[count] = GAMES[i];
			count++;
		}
	}
	
	return arrayTemp;
}

function listYears(targetArray){
	var dateTemp = new Array();
	var count=0;
	
	for(i=0;i<targetArray.length;i++){
		if(targetArray[i].buyDate !== ""){
			dateTemp[count] = GAMES[i].buyDate;
			count++;
		}
	}
	
	// Crear un Set para almacenar los años únicos
	var anosUnicos = new Set();

	// Iterar sobre el array de fechas
	dateTemp.forEach(fecha => {
	  // Extraer el año usando split
	  var ano = fecha.split("/")[2];
	  // Añadir el año al Set
	  anosUnicos.add(parseInt(ano));
	});

	// Convertir el Set a un array (opcional)
	var arrayAnosUnicos = Array.from(anosUnicos);
	
	arrayAnosUnicos.sort((a, b) => a - b);
	
	return arrayAnosUnicos;
		
}

function countGames(array, platformTarget){
	var counter = 0;
	
	for(let i=0;i<array.length;i++){
		if(array[i].platformId == platformTarget){
				counter++;
		}		
	}	
	return counter;
}

function countGamesTotal(){
	var counter = 0;
	
	for(let i=0;i<GAMES.length;i++){
		if(GAMES[i].gameType == 1){
			counter++;
		}		
	}	
	return counter;
}