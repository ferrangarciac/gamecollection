const url = "https://ferrangarciac.github.io/savemenu";
var GAMES = new Array();


window.addEventListener('load', function() {
	//CREATE CONSOLE MENU
	var header = document.getElementById("header");
	
	var consoleListDiv = document.createElement("div");
	consoleListDiv.className = "consoleList links";
	consoleListDiv.id = "cl";
	
	//ARROW LEFT
	var colorDiv = document.createElement("div");
	colorDiv.className = "console " + PLATFORMS.COLOR[Math.floor(Math.random() * PLATFORMS.COLOR.length)] + " colorBlack";
	
	var platformIcon = document.createElement("img");
	platformIcon.setAttribute("src", "./img/icons/platforms/arrowLeft.png");
	platformIcon.className = "platformIcon";
	
	var platformName = document.createElement("span");
	platformName.innerHTML = ".";
	platformName.className = "platformName";
	
	colorDiv.addEventListener('click', function(){var cl = document.getElementById("cl"); cl.className = "consoleList links moveLeft";}, false);
	
	colorDiv.appendChild(platformIcon);
	colorDiv.appendChild(platformName);
	consoleListDiv.appendChild(colorDiv);
	
	for(i=0;i<PLATFORMS.NAME.length;i++){
		var colorDiv = document.createElement("div");
		colorDiv.className = "console " + PLATFORMS.COLOR[Math.floor(Math.random() * PLATFORMS.COLOR.length)];
		
		var platformIcon = document.createElement("img");
		platformIcon.setAttribute("src", "./img/icons/platforms/" + PLATFORMS.NAME[i].replace(/\s+/g, '').toLowerCase() + ".png");
		platformIcon.className = "platformIcon";
		
		var platformName = document.createElement("span");
		platformName.innerHTML = PLATFORMS.NAMECOMPLETE[i];
		platformName.className = "platformName";
		
		colorDiv.platform = PLATFORMS.NAME[i].replace(/\s+/g, '').toLowerCase();
		colorDiv.addEventListener('click', showGamesByPlatform, false);
		
		colorDiv.appendChild(platformIcon);
		colorDiv.appendChild(platformName);
		
		consoleListDiv.appendChild(colorDiv);
	}
	
	//ARROW RIGHT
	var colorDiv = document.createElement("div");
	colorDiv.className = "console " + PLATFORMS.COLOR[Math.floor(Math.random() * PLATFORMS.COLOR.length)] + " colorBlack";
	
	var platformIcon = document.createElement("img");
	platformIcon.setAttribute("src", "./img/icons/platforms/arrowRight.png");
	platformIcon.className = "platformIcon";
	
	var platformName = document.createElement("span");
	platformName.innerHTML = ".";
	platformName.className = "platformName";
	
	colorDiv.addEventListener('click', function(){var cl = document.getElementById("cl"); cl.className = "consoleList links";}, false);
	
	colorDiv.appendChild(platformIcon);
	colorDiv.appendChild(platformName);
	consoleListDiv.appendChild(colorDiv);

	header.appendChild(consoleListDiv);
	
	getJsonInfo("./js/db.json");
	
	
	
}, false);

// function moveIcons(evt){
	// if(this.action ==)
// }

async function getJsonInfo(path) {
    var response = await fetch(path);
    var json = await response.json();
	GAMES = json;
	//ESTADISTICAS
	countGames();
	showTags();
	showLastGames();
} 

function showTags(){
	//TAGS
	var tags = document.getElementById("tags");
	
	var tagsArray = lookForTags();
	
	//TITLE
	var newTagDiv = document.createElement("div");
	newTagDiv.className = "std-title";
		
	var newTagText = document.createElement("span");
	newTagText.innerHTML = "COLECCIONES";
	
	newTagDiv.appendChild(newTagText);
	tags.appendChild(newTagDiv);
	
	
	//PRINT TAGS
	for(i=0;i<tagsArray.length;i++){
		var newTagDiv = document.createElement("div");
		newTagDiv.className = "std-row"; 
		
		var newTagText = document.createElement("span");
		newTagText.innerHTML = tagsArray[i];
		
		newTagText.tag = tagsArray[i];
		newTagText.addEventListener('click', showGamesByTag, false);
		
		newTagDiv.appendChild(newTagText);
		tags.appendChild(newTagDiv);
	}
}

function countGames(evt){
	
	
	
	//ESTADISTICAS
	var stadistics = document.getElementById("std-list");
	
	stadistics.innerHTML = "";
	
	var onlyPhisical = document.getElementById("onlyPhisical");
	onlyPhisical.addEventListener('click', countGames, false);
	
	var count = 0;
	var all = 0;
	
	for(i=0;i<PLATFORMS.NAME.length;i++){
		
		var currentPlatformDiv = document.createElement("div");
		currentPlatformDiv.className = "std-row"; 
		
		if(onlyPhisical.checked){
			for(x=0;x<GAMES.length;x++){
				if(GAMES[x].gameType == 1 && GAMES[x].platformId === PLATFORMS.NAME[i].replace(/\s+/g, '').toLowerCase()){
					count++;
				}
			}
		}
		else{
			for(x=0;x<GAMES.length;x++){
				if(GAMES[x].gameType != 0 && GAMES[x].platformId === PLATFORMS.NAME[i].replace(/\s+/g, '').toLowerCase()){
					count++;
				}
			}		
		}
		
		var newRowName = document.createElement("div");
		newRowName.className = "std-row-name";
		var currentPlatform = document.createElement("span");
		
		var newRowNumber = document.createElement("div");
		newRowNumber.className = "std-row-number";
		var currentPlatformNumber = document.createElement("span");
		
		currentPlatform.innerHTML = PLATFORMS.NAMECOMPLETE[i] + ":";
		currentPlatformNumber.innerHTML = count;
		
		all += count;
		count = 0;
		
		newRowName.appendChild(currentPlatform);
		newRowNumber.appendChild(currentPlatformNumber);
		currentPlatformDiv.appendChild(newRowName);		
		currentPlatformDiv.appendChild(newRowNumber);
		stadistics.appendChild(currentPlatformDiv);		
	}
	
	//TOTAL GAMES COUNT
	var currentPlatformDiv = document.createElement("div");
	currentPlatformDiv.className = "std-total"; 
	
	var newRowName = document.createElement("div");
	newRowName.className = "std-row-name";
	var currentPlatform = document.createElement("span");
	
	var newRowNumber = document.createElement("div");
	newRowNumber.className = "std-row-number";
	var currentPlatformNumber = document.createElement("span");
	
	currentPlatform.innerHTML = "Total:";
	currentPlatformNumber.innerHTML = all;
	
	newRowName.appendChild(currentPlatform);
	newRowNumber.appendChild(currentPlatformNumber);
	currentPlatformDiv.appendChild(newRowName);		
	currentPlatformDiv.appendChild(newRowNumber);
	stadistics.appendChild(currentPlatformDiv);	
}

function lookForTags(){
	var tempArray = new Array();
	
	var count = 0;
	
	for (i=0;i<GAMES.length;i++){
		for(x=0;x<GAMES[i].tags.length;x++){
			tempArray[count] = GAMES[i].tags[x];
			count++;
		}
	}
	
	var result = tempArray.filter(onlyUnique);
	
	return result;
}

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}


function showGamesByPlatform(evt){
	var gameRow = document.getElementById("gameRow");
	gameRow.innerHTML = "";
	
	var currentArray = selectPlatform(this.platform);
	
	currentArray = currentArray.sort((a, b) => (a.gameName > b.gameName) ? 1 : -1);
	
	for(i=0;i<currentArray.length;i++){
		genGame(currentArray[i].gameId, currentArray[i].crown, currentArray[i].platformId, currentArray[i].commentHTML, currentArray[i].gameName, currentArray[i].region, currentArray[i].box, currentArray[i].manual, currentArray[i].gameType, currentArray[i].save);
	}
}

function showLastGames(){
	var gameRow = document.getElementById("gameRow");
	gameRow.innerHTML = "";
	
	var currentDate = new Date;
	currentDate.setDate(currentDate.getMonth() - 1); 
	
	var cont = 0;
	var currentArray = new Array();
	
	
	for(i=0;i<GAMES.length;i++){
		if(GAMES[i].buyDate > currentDate.toLocaleDateString()){
			console.log(GAMES[i].buyDate + " - " + currentDate.toLocaleDateString());
			currentArray[cont] = GAMES[i];
			cont++;
		}
	}
		
	for(i=0;i<currentArray.length;i++){
		genGame(currentArray[i].gameId, currentArray[i].crown, currentArray[i].platformId, currentArray[i].commentHTML, currentArray[i].gameName, currentArray[i].region, currentArray[i].box, currentArray[i].manual, currentArray[i].gameType, currentArray[i].save);
	}
}

function showGamesByTag(evt){
	var gameRow = document.getElementById("gameRow");
	gameRow.innerHTML = "";
	
	var cont = 0;
	var currentArray = new Array();	
	
	for(i=0;i<GAMES.length;i++){
		for(x=0;x<GAMES[i].tags.length;x++){
			
			if(onlyPhisical.checked){
				if(GAMES[i].gameType == 1){
					if(GAMES[i].tags[x] === this.tag){
						currentArray[cont] = GAMES[i];
						cont++;
					}
				}
			}else{
				if(GAMES[i].tags[x] === this.tag){
					currentArray[cont] = GAMES[i];
					cont++;
				}
			}
		}
	}
	
	
	currentArray = currentArray.sort((a, b) => (a.gameName > b.gameName) ? 1 : -1);
	
	for(i=0;i<currentArray.length;i++){
		genGame(currentArray[i].gameId, currentArray[i].crown, currentArray[i].platformId, currentArray[i].commentHTML, currentArray[i].gameName, currentArray[i].region, currentArray[i].box, currentArray[i].manual, currentArray[i].gameType, currentArray[i].save);
	}
}

function selectPlatform(platform){
	var resultArray = new Array();
	var cont = 0;
	
	//COMPROVAR CHECKS
	var onlyOwned = document.getElementById("onlyOwnedChk");
	var onlySaves = document.getElementById("onlySavesChk");	
	
	var options = 0;
	
	if(onlyOwned.checked){options = 1;}
	if(onlySaves.checked){options = 2;}
	if(onlySaves.checked && onlyOwned.checked){options = 3;}
	
	switch (options){
		case 0:
			for(i=0;i<GAMES.length;i++){
				if(GAMES[i].platformId === platform){
					resultArray[cont] = GAMES[i];
					cont++;
				}
			}
		break;
		case 1:
			for(i=0;i<GAMES.length;i++){
				if(onlyOwned.checked && GAMES[i].gameType != 0){
					if(GAMES[i].platformId === platform){
						resultArray[cont] = GAMES[i];
						cont++;
					}
				}
			}
		break;
		case 2:
			for(i=0;i<GAMES.length;i++){
				if(onlySaves.checked && GAMES[i].save){
					if(GAMES[i].platformId === platform){
						resultArray[cont] = GAMES[i];
						cont++;
					}
				}
			}
		break;
		case 3:
			for(i=0;i<GAMES.length;i++){
				if(onlyOwned.checked && GAMES[i].gameType != 0 && onlySaves.checked && GAMES[i].save){
					if(GAMES[i].platformId === platform){
						resultArray[cont] = GAMES[i];
						cont++;
					}
				}
			}
		break;
	}
	
	return resultArray;
}

function genGame(gameId, crown, platformId, commentHTML, gameName, region, box, manual, gameType, save){
	var row = document.getElementById("gameRow");
	
	var divCol = document.createElement("div");
	divCol.className = "col";
	
	var coverDiv = document.createElement("div");
	coverDiv.className = "coverDiv";
	
    var a = document.createElement('a');
	if(save){
		a.href = url + "/saves/" + platformId + "/save_" + gameId + ".rar";  
	}
    
	var crownDiv = document.createElement("div");
	var crownImg = document.createElement("img");
	crownImg.className = "crown";
	crownImg.setAttribute("src", "./img/crown_" + crown + ".png");
	
	//Ocultar corona si no hay partida
	// if(crown == "none"){
		// crownImg.className = "hiddenFill";
	// }
	
	var coverImgDiv = document.createElement("div");
	var coverImg = document.createElement("img");
	coverImg.className = "cover";
	coverImg.setAttribute("src", "./img/" + platformId + "/cover_" + gameId + ".jpg");
	
	var coverParamsDiv = document.createElement("div");
	coverParamsDiv.className = "coverParamsDiv";
	
	var paramsDiv = document.createElement("div");
	paramsDiv.className = "paramsDiv";
	
	var regionIcon = document.createElement("img");
	var boxIcon = document.createElement("img");
	var manualIcon = document.createElement("img");
	var saveIcon = document.createElement("img");
	var gameIcom = document.createElement("img");
	var digitalIcon = document.createElement("img");
	
	regionIcon.className = "gameParams";
	regionIcon.setAttribute("src", "./img/icons/icon_" + region + ".png");
	
	
	boxIcon.className = "hidden";
	
	if(box){
		boxIcon.className = "gameParams";
	}
	
	boxIcon.setAttribute("src", "./img/icons/icon_box.png");
	
	manualIcon.className = "hidden";	
	if(manual){
		manualIcon.className = "gameParams";
	}
	manualIcon.setAttribute("src", "./img/icons/icon_manual.png");
	
	saveIcon.className = "hidden";	
	if(save){
		saveIcon.className = "gameParams";
	}
	saveIcon.setAttribute("src", "./img/icons/icon_download.png");
	
	gameIcom.className = "hidden";
	if(gameType == 1){
		gameIcom.className = "gameParams";
	}
	gameIcom.setAttribute("src", "./img/icons/icon_game.png");
	
	digitalIcon.className = "hidden";
	if(gameType == 2){
		digitalIcon.className = "gameParams";
	}
	digitalIcon.setAttribute("src", "./img/icons/icon_gameDigital.png");
	
	if(commentHTML){
		var commentDiv = document.createElement("div");
		commentDiv.className = "comment";
	
		var spanComment = document.createElement("span");
		spanComment.innerHTML = commentHTML;
		commentDiv.appendChild(spanComment);
	}
	
	var titleDiv = document.createElement("div");
	titleDiv.className = "title";
	
	var spanTitle = document.createElement("span");
	spanTitle.innerHTML = gameName;   	
	
	
	crownDiv.appendChild(crownImg);
	coverParamsDiv.appendChild(coverImgDiv);
	coverParamsDiv.appendChild(paramsDiv);
	
	paramsDiv.appendChild(regionIcon);
	paramsDiv.appendChild(gameIcom);
	paramsDiv.appendChild(digitalIcon);
	paramsDiv.appendChild(boxIcon);
	paramsDiv.appendChild(manualIcon);
	paramsDiv.appendChild(saveIcon);
	
	coverImgDiv.appendChild(coverImg);
	titleDiv.appendChild(spanTitle);
    a.appendChild(crownDiv);
    a.appendChild(coverParamsDiv);
	if(commentHTML){a.appendChild(commentDiv);}
	a.appendChild(titleDiv);
	a.appendChild(titleDiv);
    coverDiv.appendChild(a);	
	divCol.appendChild(coverDiv);
	row.appendChild(divCol);
}

function openOptions(evt){
	
	onlyPhisical.addEventListener('click', countGames, false);
}
