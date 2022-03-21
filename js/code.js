const url = "http://januszeal.eshost.com.ar/savemenu";

window.addEventListener('load', function() {
	//CREATE CONSOLE MENU
	var header = document.getElementById("header");
	
	var consoleListDiv = document.createElement("div");
	consoleListDiv.className = "consoleList links";
	
	for(i=0;i<PLATFORMS.NAME.length;i++){
		var colorDiv = document.createElement("div");
		colorDiv.className = "console " + PLATFORMS.COLOR[Math.floor(Math.random() * PLATFORMS.COLOR.length)];
		colorDiv.innerHTML = PLATFORMS.NAME[i];
		
		colorDiv.platform = PLATFORMS.NAME[i].replace(/\s+/g, '').toLowerCase();
		colorDiv.addEventListener('click', showGamesByPlatform, false);
		
		consoleListDiv.appendChild(colorDiv);
	}
	
	header.appendChild(consoleListDiv);
	
	
	
}, false);

function showGamesByPlatform(evt){
	var gameRow = document.getElementById("gameRow");
	gameRow.innerHTML = "";
	
	var currentArray = selectPlatform(this.platform);
	
	currentArray = currentArray.sort((a, b) => (a.gameName > b.gameName) ? 1 : -1);
	
	for(i=0;i<currentArray.length;i++){
		genGame(currentArray[i].gameId, currentArray[i].crown, currentArray[i].platformId, currentArray[i].commentHTML, currentArray[i].gameName);
	}
}

function selectPlatform(platform){
	var resultArray = new Array();
	var cont = 0;
	for(i=0;i<GAMES.length;i++){
		if(GAMES[i].platformId === platform){
			resultArray[cont] = GAMES[i];
			cont++;
		}
	}
	
	return resultArray;
}

function genGame(gameId, crown, platformId, commentHTML, gameName){
	var row = document.getElementById("gameRow");
	
	var divCol = document.createElement("div");
	divCol.className = "col";
	
	var coverDiv = document.createElement("div");
	coverDiv.className = "coverDiv";
	
    var a = document.createElement('a');
	a.href = url + "/saves/" + platformId + "/save_" + gameId + ".rar";  
    
	var crownDiv = document.createElement("div");
	var crownImg = document.createElement("img");
	crownImg.className = "crown";
	crownImg.setAttribute("src", "./img/crown_" + crown + ".png");
	
	var coverImgDiv = document.createElement("div");
	var coverImg = document.createElement("img");
	coverImg.className = "cover";
	coverImg.setAttribute("src", "./img/" + platformId + "/cover_" + gameId + ".jpg");
	
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
	coverImgDiv.appendChild(coverImg);
	titleDiv.appendChild(spanTitle);
    a.appendChild(crownDiv);
    a.appendChild(coverImgDiv);
	if(commentHTML){a.appendChild(commentDiv);}
	a.appendChild(titleDiv);
	a.appendChild(titleDiv);
    coverDiv.appendChild(a);	
	divCol.appendChild(coverDiv);
	row.appendChild(divCol);
}