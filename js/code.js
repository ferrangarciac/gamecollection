var GAMES = new Array();

async function getJsonInfo(path) {		//Lector de JSON
    var response = await fetch(path);
    var json = await response.json();
	GAMES = json;
	
	//ESTADISTICAS
	/*countGames();
	showTags();
	showLastGames();*/
	
	//Mostrar los últimos juegos
	selectByDate();
} 

window.addEventListener('load', function() {
	getJsonInfo("./js/db.json");
	
	//Rellena el menú de consolas
	fillPlatformList();
	
	//Crea el Listener de Estadísticas
	var stats = document.getElementById("nav-stats");
	stats.addEventListener('click', fillStats, false);
	
	//Crea el Listener de SaveFiles
	var saves = document.getElementById("nav-savefiles");
	saves.addEventListener('click', savefiles, false);

}, false);

function fillPlatformList(){
	var platformMenu = document.getElementById("nav-platform-menu");
	
	for(i=0;i<platforms.NAMECOMPLETE.length; i++){
		
		var newPlatformItem = document.createElement("a");
		newPlatformItem.innerHTML = platforms.NAMECOMPLETE[i];
		newPlatformItem.className = "platform-item";
		
		newPlatformItem.platform = platforms.NAME[i].replace(/\s+/g, '').toLowerCase();
		newPlatformItem.platformName = platforms.NAMECOMPLETE[i];
		newPlatformItem.addEventListener('click', function(evt) {
			selectByPlatform(evt);
		}, false);
		
		platformMenu.appendChild(newPlatformItem);
	}	
}

function savefiles(evt){
	var content = document.getElementById("content");
	content.innerHTML = "";
	
	var container = document.createElement('div');
	container.className = 'savefiles-container';
	content.appendChild(container);
	
	//LISTADO	
	
	var gamesFiltered = GAMES.filter(game => game.save == true);
	
	var arrayTemp = new Array();
	
	for(i=0;i<platforms.NAME.length;i++){
	
		arrayTemp = gamesFiltered.filter(game => game.platformId == platforms.NAME[i].replace(/\s+/g, '').toLowerCase());
		
		if(arrayTemp.length > 0){
			
			//PLATFORM
			var titleContainer = document.createElement("div");
			titleContainer.className = "savefiles-title-container";
			container.appendChild(titleContainer);
			
			var title = document.createElement("h2");
			title.className = "savefiles-title-section";
			title.innerHTML = platforms.NAMECOMPLETE[i];
			titleContainer.appendChild(title);
			
			//HEADER
			var listHeader = document.createElement('div');
			listHeader.className = 'savefiles-list-header';
			container.appendChild(listHeader);
			
			var colNameHeader = document.createElement('div');
			colNameHeader.className = 'savefiles-list-col-header savefiles-col-name';
			listHeader.appendChild(colNameHeader);
			
			var textNameHeader = document.createElement('span');
			textNameHeader.className = 'savefile-list-header-text';
			textNameHeader.innerHTML = 'JUEGO';
			colNameHeader.appendChild(textNameHeader);
			
			var colRegionHeader = document.createElement('div');
			colRegionHeader.className = 'savefiles-list-col-header savefiles-col-region';
			listHeader.appendChild(colRegionHeader);
			
			var textRegionHeader = document.createElement('span');
			textRegionHeader.className = 'savefile-list-header-text';
			textRegionHeader.innerHTML = 'REGIÓN';
			colRegionHeader.appendChild(textRegionHeader);
			
			var colProgressHeader = document.createElement('div');
			colProgressHeader.className = 'savefiles-list-col-header savefiles-col-region';
			listHeader.appendChild(colProgressHeader);
			
			var textProgessHeader = document.createElement('span');
			textProgessHeader.className = 'savefile-list-header-text';
			textProgessHeader.innerHTML = 'PROGRESO';
			colProgressHeader.appendChild(textProgessHeader);
			
			var colDlHeader = document.createElement('div');
			colDlHeader.className = 'savefiles-list-col-header savefiles-col-dl';
			listHeader.appendChild(colDlHeader);
			
			var textDlHeader = document.createElement('span');
			textDlHeader.className = 'savefile-list-header-text';
			textDlHeader.innerHTML = 'DL';
			colDlHeader.appendChild(textDlHeader);

			for(x=0;x<arrayTemp.length;x++){
			
				var listItem = document.createElement('div');
				listItem.className = 'savefiles-list-item';
				container.appendChild(listItem);
				
				var colNameItem = document.createElement('div');
				colNameItem.className = 'savefiles-list-col-item savefiles-col-name';
				listItem.appendChild(colNameItem);
				
				var textNameItem = document.createElement('span');
				textNameItem.className = 'savefile-list-item-text';
				textNameItem.innerHTML = arrayTemp[x].gameName;
				colNameItem.appendChild(textNameItem);
				
				var colRegionItem = document.createElement('div');
				colRegionItem.className = 'savefiles-list-col-item savefiles-col-region';
				listItem.appendChild(colRegionItem);
				
				var imgRegionItem = document.createElement('img');
				imgRegionItem.className = 'savefile-list-item-region';
				imgRegionItem.setAttribute("src", "./img/icons/icon_" + arrayTemp[x].region + ".png");
				colRegionItem.appendChild(imgRegionItem);
				
				var colProgressItem = document.createElement('div');
				colProgressItem.className = 'savefiles-list-col-item savefiles-col-progress';
				listItem.appendChild(colProgressItem);
				
				var iconProgressItem = document.createElement('img');
				iconProgressItem.className = 'savefile-list-item-progress';
				
				switch(arrayTemp[x].crown){
					case "cooper":
						iconProgressItem.setAttribute("src", "./assets/stars1.png");
						iconProgressItem.title = "Juego sin completar";
						break;
					case "silver":
						iconProgressItem.setAttribute("src", "./assets/stars2.png");
						iconProgressItem.title = "Juego completado";
						break;
					case "gold":
						iconProgressItem.setAttribute("src", "./assets/stars3.png");
						iconProgressItem.title = "Juego al 100%";
						break;
				}
				
				colProgressItem.appendChild(iconProgressItem); // Inserta el enlace en el contenedor
				
				var colDlItem = document.createElement('div');
				colDlItem.className = 'savefiles-list-col-item savefiles-col-dl';
				listItem.appendChild(colDlItem);
				
				var linkDlItem = document.createElement('a');
				linkDlItem.href = arrayTemp[x].saveLink; // Especifica aquí la URL destino
				linkDlItem.className = 'savefile-list-header-link'; // Clase CSS para el enlace

				var svgDlItem = document.createElement('img');
				svgDlItem.className = 'savefile-list-header-icon'; // Clase CSS para estilos
				svgDlItem.src = './assets/download.svg'; // Ruta al archivo SVG
				svgDlItem.alt = 'Download'; // Texto alternativo para accesibilidad

				linkDlItem.appendChild(svgDlItem); // Inserta el SVG dentro del enlace
				colDlItem.appendChild(linkDlItem); // Inserta el enlace en el contenedor
				
			}
		}				
		
	}
	
	
	
	
	
}

function selectByPlatformRetArray(platform,arrayOrigin){
	var gamesFiltered = GAMES.filter(game => game.platformId == platform);
	
	return gamesFiltered;
}

function selectByDev(evt){
	var resultArray = new Array();
	var cont = 0;
	
	for(i=0;i<GAMES.length;i++){
		if(GAMES[i].developer === this.developer){
			if(GAMES[i].gameType != 0){
				resultArray[cont] = GAMES[i];
				cont++;
			}
		}
	}	
	skipGameInfo();
	fillGameList(resultArray, this.developer);
}

function selectByGenre(evt){
	var resultArray = new Array();
	var cont = 0;
	
	for(i=0;i<GAMES.length;i++){
		if(GAMES[i].genre === this.genre){
			if(GAMES[i].gameType != 0){
				resultArray[cont] = GAMES[i];
				cont++;
			}
		}
	}	
	skipGameInfo();
	fillGameList(resultArray);
}

function selectByTag(evt){
	var resultArray = new Array();
	var cont = 0;
	
	for(i=0;i<GAMES.length;i++){
		for(x=0;x<GAMES[i].tags.length;x++){
			if(GAMES[i].tags[x] === this.tag){
				if(GAMES[i].gameType != 0){
					resultArray[cont] = GAMES[i];
					cont++;
				}
			}
		}
	}
	
	skipGameInfo();
	fillGameList(resultArray, this.tag);
}

function selectByPlatform(evt){
	var resultArray = new Array();
	var cont = 0;
	
	var menuChk = document.getElementById("menu");
	var platformChk = document.getElementById("platform-list");
	
	menuChk.checked = false;
	platformChk.checked = false;
	
	var platform = evt.target.platform;
	
	for(var i = 0; i < GAMES.length; i++){
		if(GAMES[i].platformId === platform){
			if(GAMES[i].gameType != 0){
				resultArray[cont] = GAMES[i];
				cont++;
			}
			
		}
	}
	
	fillGameList(resultArray, evt.target.platformName);
}

function selectByDate(dateIn){
	var currentDate = new Date;
	//Restamos un mes
	currentDate.setDate(currentDate.getDay() - 30);
	console.log(currentDate.valueOf());
	
	var cont = 0;
	var resultArray = new Array();
	
	for(i=0;i<GAMES.length;i++){
		if(Date.parse(GAMES[i].buyDate) > currentDate.valueOf()){
			if(GAMES[i].gameType != 0){
				resultArray[cont] = GAMES[i];
				cont++;
			}
		}
	}
	
	fillGameList(resultArray, "Último mes");
}

function selectWSaves(evt){
	var resultArray = new Array();
	var cont = 0;
	
	for(i=0;i<GAMES.length;i++){
		if(GAMES[i].save){
				resultArray[cont] = GAMES[i];
				cont++;
		}
	}

	fillGameList(resultArray, this.tag);
}


function fillGameList(arrayTemp, titleSection){
	var content = document.getElementById("content");
	content.innerHTML = "";
	
	var subcontent = document.createElement('div');
	subcontent.className = "subcontent";
	
	arrayTemp = arrayTemp.sort((a, b) => (a.gameName > b.gameName) ? 1 : -1);
	
	//TITULO SECCION - NOMBRE CONSOLA
	var titleContainer = document.createElement("div");
	titleContainer.className = "title-container";
	content.appendChild(titleContainer);
	
	var title = document.createElement("h1");
	title.className = "title-section";
	title.innerHTML = titleSection;
	titleContainer.appendChild(title);
	
	
	
	for(i=0;i<arrayTemp.length;i++){
		var newGameContainer = document.createElement("div");
		newGameContainer.className = "container-game-cont";
		
		newGameContainer.id = arrayTemp[i].id;

		newGameContainer.addEventListener('click', fillGameDetails, false);
		
		var newGameCover = document.createElement("img");
		newGameCover.className = "container-game-cover";
		newGameCover.setAttribute("src", "./img/basiccover/" + arrayTemp[i].platformId + "/cover_" + arrayTemp[i].gameId + ".jpg");
		
		var newGameName = document.createElement("span");
		newGameName.className = "container-game-name";
		newGameName.innerHTML = arrayTemp[i].gameName;
		
		newGameContainer.appendChild(newGameCover);
		newGameContainer.appendChild(newGameName);
		
		subcontent.appendChild(newGameContainer);
	}
	
	content.appendChild(subcontent);
}

function fillGameDetails(evt){
	var gameDetailsBox = document.getElementById("game");
	gameDetailsBox.className = "game-info-cont";
	
	var backGameBox = document.getElementById("back-game-box");
	backGameBox.className = "skip-game-box";
	
	backGameBox.addEventListener('click', skipGameInfo , false);
	
	var gameName = document.getElementById("game-name");
	var gameCode = document.getElementById("game-code");
	var gamePlatform = document.getElementById("game-platform");
	var gameYear = document.getElementById("game-year");
	var gameDeveloper = document.getElementById("game-developer");
	var gameGenre = document.getElementById("game-genre");
		
	gameName.innerHTML = GAMES[this.id].gameName;
	gameCode.innerHTML = GAMES[this.id].code;
	gamePlatform.innerHTML = platforms.NAMECOMPLETE[getPlatformId(GAMES[this.id].platformId)];
	gameYear.innerHTML = GAMES[this.id].year;
	gameDeveloper.innerHTML = GAMES[this.id].developer;
	
	gameDeveloper.developer = GAMES[this.id].developer;
	gameDeveloper.addEventListener('click', selectByDev, false);
	
	gameGenre.innerHTML = GAMES[this.id].genre;
	
	gameGenre.genre = GAMES[this.id].genre;
	gameGenre.addEventListener('click', selectByGenre, false);
	
	var gameRegion = document.getElementById("game-region");
	var gameDisk = document.getElementById("game-owned");
	var gameBox = document.getElementById("game-gamebox");
	var gameManual = document.getElementById("game-manual");
	var gameSaveFile = document.getElementById("game-save");
	var gameSaveInfo = document.getElementById("game-save-info");
	
	gameDisk.className = "skip";
	gameBox.className = "skip";
	gameManual.className = "skip";
	gameSaveFile.className = "skip";
	//gameSaveInfo.innerHTML = GAMES[this.id].commentHTML;
	
	gameRegion.setAttribute("src", "./img/icons/icon_" + GAMES[this.id].region + ".png");
	
	if(GAMES[this.id].gameType == 1){
		gameDisk.className = "game-icon";
	}
	
	if(GAMES[this.id].box){
		gameBox.className = "game-icon";
	}
	
	if(GAMES[this.id].manual){
		gameManual.className = "game-icon";
	}
	
	if(GAMES[this.id].save){
		gameSaveFile.className = "game-icon";
	}
	
	var tags = document.getElementById("game-tags");
	
	tags.innerHTML = "";
	
	for(i=0;i<GAMES[this.id].tags.length;i++){
		var newTag = document.createElement("span");
		newTag.innerHTML = GAMES[this.id].tags[i];
		//newTag.className = "info-tags";
		//newTag.setAttribute("background", "#f00");
		//"rgba(" + (Math.floor(Math.random() * 255) + "," + (Math.floor(Math.random() * 255) + "," + (Math.floor(Math.random() * 255) + ",1)";
		
		newTag.tag = GAMES[this.id].tags[i];
		newTag.addEventListener('click', selectByTag, false);
		
		tags.appendChild(newTag);
	}

	generateBox(this.id);
	
}

function skipGameInfo(){
	var gameDetailsBox = document.getElementById("game");
	gameDetailsBox.className = "skip";
	
	var backGameBox = document.getElementById("back-game-box");
	backGameBox.className = "skip";
}

function generateBox(gameId){
	var gameBox = document.getElementById("game-box");
	var coverBack = document.getElementById("game-box-back-image");
	var box = document.getElementById("box");
		
	var front = document.getElementById("front");
	var back = document.getElementById("back");
	var right = document.getElementById("right");
	var left = document.getElementById("left");
	
	
	box.style.width = GAMES[gameId].boxSize[0] + "px";
	box.style.height = GAMES[gameId].boxSize[1] + "px";
	coverBack.innerHTML="";
	coverBack.setAttribute("src", "./img/basiccover/" + GAMES[gameId].platformId + "/cover_" + GAMES[gameId].gameId + ".jpg");
		
	right.style.width = GAMES[gameId].boxSize[2] + "px";
	right.style.height = GAMES[gameId].boxSize[1] + "px";
	right.style.transform = "translateZ(" + (GAMES[gameId].boxSize[0])/2 + "px) translateX(" + (GAMES[gameId].boxSize[0])/2 + "px)";
	
	if(GAMES[gameId].boxSize[3]){
		console.log(true);
		right.style.backgroundImage = "url(./img/box-images/" + GAMES[gameId].platformId + "-standart-right.png)"; 
	}else{
		console.log(false);
		right.style.backgroundImage = "url(./img/box-images/" + GAMES[gameId].gameId + "-" + GAMES[gameId].platformId + "-" + GAMES[gameId].edition[0] + "-right.png)"; 
	}
	
	left.style.width = GAMES[gameId].boxSize[2] + "px";
	left.style.height = GAMES[gameId].boxSize[1] + "px";
	left.style.transform = "translateZ(" + ((GAMES[gameId].boxSize[0])/2)*(-1) + "px) translateX(" + (GAMES[gameId].boxSize[0])/2 + "px) rotateX(180deg) rotateZ(180deg)";
	left.style.backgroundImage = "url(./img/box-images/" + GAMES[gameId].gameId + "-" + GAMES[gameId].platformId + "-" + GAMES[gameId].edition[0] + "-left.png)"; 
	
	
	front.style.width = GAMES[gameId].boxSize[0] + "px";
	front.style.height = GAMES[gameId].boxSize[1] + "px";
	front.style.backgroundImage = "url(./img/box-images/" + GAMES[gameId].gameId + "-" + GAMES[gameId].platformId + "-" + GAMES[gameId].edition[0] + "-front.png)"; 
	
	back.style.width = GAMES[gameId].boxSize[0] + "px";
	back.style.height = GAMES[gameId].boxSize[1] + "px";
	back.style.transform = "translateX(" + GAMES[gameId].boxSize[2] + "px) rotateY(90deg)";
	back.style.backgroundImage = "url(./img/box-images/" + GAMES[gameId].gameId + "-" + GAMES[gameId].platformId + "-" + GAMES[gameId].edition[0] + "-back.png)"; 
	
}

function getPlatformId(platformNameSmall){
	for(i=0;i<platforms.NAME.length;i++){
		
		if(platforms.NAME[i].replace(/\s+/g, '').toLowerCase() === platformNameSmall){
			return i;	
		}
	}
}

