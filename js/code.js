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
	
	//Mostrar los últimos juegos
	selectByDate();
}, false);

function fillPlatformList(){
	var platformMenu = document.getElementById("nav-platform-menu");
	
	for(i=0;i<platforms.NAMECOMPLETE.length; i++){
		
		var newPlatformItem = document.createElement("a");
		newPlatformItem.innerHTML = platforms.NAMECOMPLETE[i];
		newPlatformItem.className = "platform-item";
		
		newPlatformItem.platform = platforms.NAME[i].replace(/\s+/g, '').toLowerCase();
		newPlatformItem.addEventListener('click', function(evt) {
			selectByPlatform(evt);
		}, false);
		
		platformMenu.appendChild(newPlatformItem);
	}	
}

function selectByDev(evt){
	var resultArray = new Array();
	var cont = 0;
	
	for(i=0;i<GAMES.length;i++){
		if(GAMES[i].developer === this.developer){
			resultArray[cont] = GAMES[i];
			cont++;
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
				resultArray[cont] = GAMES[i];
				cont++;
			}
		}
	}
	
	skipGameInfo();
	fillGameList(resultArray);
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
			resultArray[cont] = GAMES[i];
			cont++;
		}
	}
	
	fillGameList(resultArray);
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
			//console.log(GAMES[i].buyDate + " - " + currentDate);
			resultArray[cont] = GAMES[i];
			cont++;
		}
	}
	
	fillGameList(resultArray);
}


function fillGameList(arrayTemp){
	var content = document.getElementById("content");
	content.innerHTML = "";
	
	arrayTemp = arrayTemp.sort((a, b) => (a.gameName > b.gameName) ? 1 : -1);
	
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
		
		content.appendChild(newGameContainer);		
	}
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
	
	var gameRegion = document.getElementById("game-region");
	var gameDisk = document.getElementById("game-owned");
	var gameBox = document.getElementById("game-gamebox");
	var gameManual = document.getElementById("game-manual");
	var gameSaveFile = document.getElementById("game-save");
	
	gameDisk.className = "skip";
	gameBox.className = "skip";
	gameManual.className = "skip";
	gameSaveFile.className = "skip";
	
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
	var front = document.getElementById("front");
	var back = document.getElementById("back");
	var right = document.getElementById("right");
	var left = document.getElementById("left");
	
	right.style.width = GAMES[gameId].boxSize[2] + "px";
	right.style.height = GAMES[gameId].boxSize[1] + "px";
	right.style.transform = "translateZ(" + (GAMES[gameId].boxSize[0])/2 + "px) translateX(" + (GAMES[gameId].boxSize[0])/2 + "px)";
	
	if(GAMES[gameId].edition[3]){
		right.style.backgroundImage = "url(./img/box-images/" + GAMES[gameId].platformId + "-standart-right.png)"; 
	}else{
		right.style.backgroundImage = "url(./img/box-images/" + GAMES[gameId].gameId + "-" + GAMES[gameId].platformId + "-" + GAMES[gameId].edition[0] + "-right.png)"; 
	}
	
	left.style.width = GAMES[gameId].boxSize[2] + "px";
	left.style.height = GAMES[gameId].boxSize[1] + "px";
	left.style.transform = "translateZ(" + ((GAMES[gameId].boxSize[0])/2)*(-1) + "px) translateX(" + (GAMES[gameId].boxSize[0])/2 + "px)";
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
