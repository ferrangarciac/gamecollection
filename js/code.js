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

function fillStats(evt){
	var content = document.getElementById("content");
	content.innerHTML = "";
	
	var subcontent = document.createElement('div');
	subcontent.className = "subcontent";
	
	//TITULO SECCION - JUEGOS X CONSOLA
	var titleContainer = document.createElement("div");
	titleContainer.className = "title-container";
	content.appendChild(titleContainer);
	
	var title = document.createElement("h1");
	title.className = "title-section";
	title.innerHTML = "Juegos por plataforma";
	titleContainer.appendChild(title);
	
	
	
	//LISTA CONSOLAS
	for(i=0;i<platforms.NAME.length;i++){
		
		var newPlatformContainer = document.createElement("div");
		newPlatformContainer.className = "stats-platform-cont container-game-cont";
		
		//newPlatformContainer.id = platforms.NAME[i].id;

		newPlatformContainer.platform = platforms.NAME[i].replace(/\s+/g, '').toLowerCase();
		newPlatformContainer.addEventListener('click', function(evt) {
			selectByPlatform(evt);
		}, false);
		
		var newPlatformName = document.createElement("span");
		newPlatformName.className = "stats-platforms-text container-game-name";
		newPlatformName.innerHTML = platforms.NAMECOMPLETE[i];
		
		var newPlatformIcon = document.createElement("img");
		newPlatformIcon.className = "stats-platform-icon container-game-cover";
		newPlatformIcon.setAttribute("src", "./img/platforms/" + newPlatformContainer.platform + ".png");
		
		var newPlatformCount = document.createElement("span");
		newPlatformCount.className = "stats-platforms-text container-game-name";
		newPlatformCount.innerHTML = "Juegos Totales: " + countGames(GAMES, newPlatformContainer.platform);
		
		newPlatformContainer.appendChild(newPlatformName);
		newPlatformContainer.appendChild(newPlatformIcon);
		newPlatformContainer.appendChild(newPlatformCount);
		
		subcontent.appendChild(newPlatformContainer);		
	}
	
	//JUEGOS TOTALES
	var newPlatformContainer = document.createElement("div");
	newPlatformContainer.className = "stats-platform-cont container-game-cont";
	
	var newPlatformName = document.createElement("span");
	newPlatformName.className = "stats-platforms-text container-game-name";
	newPlatformName.innerHTML = "JUEGOS TOTALES";
	
	var newPlatformIcon = document.createElement("img");
	newPlatformIcon.className = "stats-platform-icon container-game-cover";
	newPlatformIcon.setAttribute("src", "./img/platforms/total.png");
	
	var newPlatformCount = document.createElement("span");
	newPlatformCount.className = "stats-platforms-text container-game-name";
	newPlatformCount.innerHTML = countGamesTotal();
	
	newPlatformContainer.appendChild(newPlatformName);
	newPlatformContainer.appendChild(newPlatformIcon);
	newPlatformContainer.appendChild(newPlatformCount);
	
	subcontent.appendChild(newPlatformContainer);	
	
	content.appendChild(subcontent);
	
	//STATS
	var titleContainer = document.createElement("div");
	titleContainer.className = "title-container";
	content.appendChild(titleContainer);
	
	var title = document.createElement("h1");
	title.className = "title-section";
	title.innerHTML = "Estadísticas Generales";
	titleContainer.appendChild(title);
	
	//PIE CHART (PLATFOMRS)
	var subcontent2 = document.createElement('div');
	subcontent2.className = "subcontent";
	
	var pieChart = document.createElement("div");
	pieChart.className = "pie";
	
	var arrayTemp = getYearArray(2024);
	
	var percentGames = new Array();
	
	var count = 0;
	
	for(i=0;i<platforms.NAME.length;i++){
		console.log(countGames(arrayTemp, platforms.NAME[i]));
		var currentPlatform = platforms.NAME[i].replace(/\s+/g, '').toLowerCase()
		
		if(countGames(arrayTemp, currentPlatform) > 0){
			percentGames[count] = new Array(platforms.NAME[i], countGames(arrayTemp, currentPlatform),0);
			count++;
		}
	}
	
	const maxShown = 10;
	
	percentGames.sort((a, b) => b[1] - a[1]);
	
	var total = percentGames.reduce((sum, platform) => sum + platform[1], 0);
	
	for(i=0;i<percentGames.length;i++){
				
		if(i>=maxShown && percentGames.length > maxShown){
			var startIndex = maxShown;
			var slicedPlatforms = percentGames.slice(startIndex);
			
			console.log(slicedPlatforms);
			
			var totalRest = slicedPlatforms.reduce((sum, platform) => sum + platform[1], 0);
			percentGames[i][2] = totalRest / total * 100;
			percentGames[i][1] = totalRest;
			percentGames[i][0] = "Otros";
			percentGames.splice(maxShown+1);
			break;
		}
		
		percentGames[i][2] = percentGames[i][1] / total * 100;
	}
	
	console.log(percentGames);
	
	var colors = new Array("Crimson","Teal","SlateBlue","GoldenRod","MediumSeaGreen","Tomato","DodgerBlue","Orchid","IndianRed","DarkSlateGray");
	
	var colorString = 'conic-gradient(';
	
	colorString = colorString + colors[0] + " 0% " + percentGames[0][2] + "%,";
	
	var sliceCount = percentGames[0][2];
	
	for(i=1;i<percentGames.length;i++){
		colorString = colorString + colors[i] + " " + sliceCount + "% ";
		sliceCount = sliceCount + percentGames[i][2];
		colorString = colorString + sliceCount + "%, ";
	}
	
	colorString = colorString.slice(0, -2);
	colorString = colorString + ")";
	
	console.log(colorString);
	
	
	pieChart.style.backgroundImage = colorString;
	
	
	//console.log(percentGames);
	//console.log(countGames(arrayTemp, "nes"));
	
	
	subcontent2.appendChild(pieChart);
	
	content.appendChild(subcontent2);
	
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



function countGamesTotal(){
	var counter = 0;
	
	for(let i=0;i<GAMES.length;i++){
		if(GAMES[i].gameType == 1){
			counter++;
		}		
	}	
	return counter;
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
	gameSaveInfo.innerHTML = GAMES[this.id].commentHTML;
	
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

/*function caca(){
	var pene;
	for(i=0;i<GAMES.length;i++){
		//console.log("{'id': " + i + ", 'gameId': '" + GAMES[i].gameId + "','crown': '" + GAMES[i].crown + "','platformId': '" + GAMES[i].platformId + "','code': '" + GAMES[i].code + "','year': '" + GAMES[i].year + "','developer': '" + GAMES[i].developer + "','genre': '" + GAMES[i].genre + "','region': '" + GAMES[i].region + "','box': " + GAMES[i].box + ",'manual': " + GAMES[i].manual + ",'gameType': " + GAMES[i].gameType + ",'save': " + GAMES[i].save + ",'commentHTML': '" + GAMES[i].commentHTML + "','gameName': '" + GAMES[i].gameName + "','tags': ['" + GAMES[i].tags[0] + "'],   }");
		pene = pene + "{'id': " + i + ", 'gameId': '" + GAMES[i].gameId + "','crown': '" + GAMES[i].crown + "','platformId': '" + GAMES[i].platformId + "','code': '','year': '','developer': '','genre': '','region': '" + GAMES[i].region + "', 'edition': 'standart', 'box': " + GAMES[i].box + ",'manual': " + GAMES[i].manual + ",'gameType': " + GAMES[i].gameType + ",'save': " + GAMES[i].save + ",'commentHTML': '" + GAMES[i].commentHTML + "','gameName': '" + GAMES[i].gameName + "', 'buyDate': '', 'startGame': '', 'endGame': '', 'price': 0, 'tags': ["
		//'],   },";
		for(x=0;x<GAMES[i].tags.length;x++){
			pene = pene + "'" + GAMES[i].tags[x] + "'"
		}
	pene = pene + "] },";
	}
	
	console.log(pene);
}*/
