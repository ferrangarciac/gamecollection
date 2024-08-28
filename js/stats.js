function statsGamesPerPlatform(div){
	//var content = document.getElementById("content");
	
	//GET INFO
	var platformGameQty = new Array();
	
	for(i=0;i<platforms.NAME.length;i++){
		platformGameQty[i] = countGames(GAMES, platforms.NAME[i].replace(/\s+/g, '').toLowerCase());
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

function statsGamesPerGenre(div){
	//var content = document.getElementById("content");
	
	//GET INFO
	
	var genreTemp = new Array();
	var count=0;
	
	for(i=0;i<GAMES.length;i++){
		if(GAMES[i].genre !== ""){
			genreTemp[count] = GAMES[i].genre;
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

function listYears(){
	var dateTemp = new Array();
	var count=0;
	
	for(i=0;i<GAMES.length;i++){
		if(GAMES[i].buyDate !== ""){
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
		if(array[i].gameType == 1){
			if(array[i].platformId == platformTarget){
				counter++;
			}
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