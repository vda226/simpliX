tabList = function(tab) {
	desura.utils.setCacheValue('LastActiveTab', tab, 10);
	tabCache = tab;
	gameList();
};

tabMatch = function(tab, iteminfo) {
	if(tab == "game") {
		return true;
	} else if (tab == "fav") {
		return true;
	} else if (tab == "dev") {
		return (iteminfo.getStatus() & desura.items.status.DEVELOPER);
	} else if (tab == "tool") {
		return false;
	}

	return true;
};

searchMatch = function(search, text) {
	search.toLowerCase();
	text.toLowerCase();
	matches = false;

	if(search.length > 0) {
		var words = search.split(" ");
		for(word in words) {
			if(words[word].length > 1 || words.length == 1) {
				matches = matches || text.search(search) != -1;
			}
		}

		return matches;
	} else {
		return true;
	}
}

searchList = function(search) {
	searchCache = search;
	gameList();
};

sortList = function(list) {
	desura.utils.setCacheValue('LastSortField', sortFieldCache, 20);
	desura.utils.setCacheValue('LastSortDir', sortDirCache, 4);

	if(list.length > 0 || sortFieldCache != "") {
		temp = new Array();

		for(item in list) {
			try {
				temp[item] = {key: item, value: eval("list[item]."+sortFieldCache+"()")};
				
				if (typeof(temp[item].value) == 'string')
					temp[item].value = temp[item].value.toLowerCase();
				
			} catch(e) {}
		}

		if(temp.length > 0) {
			temp.sort(function(a, b) {
				if (a.value > b.value)		return 1;
				if (a.value < b.value)		return -1;
				if (a.value === b.value)	return 0;
			});

			if(sortDirCache == "desc") {
				temp.reverse();
			}

			temp2 = new Array();

			for(item in temp) {
				temp2[item] = list[temp[item].key];
			}

			list = temp2;
		}
	}

	return list;
};

scrollList = function(item, extra, offset) {
	scroll = (item.offset().top+item.height()) - $(window).height();

	if(scroll > $(window).scrollTop()) {
		$(window).scrollTop(scroll+extra);
	} else if(item.offset().top < ($(window).scrollTop()+offset)) {
		$(window).scrollTop(item.offset().top-(extra+offset));		
	}
};

gameListUpload = function() {
	if(tabCache == "dev") {
		gameListAuto();
	}
};

gameListAuto = function() {
	var d = new Date();

	// lets not over-refresh
	if((d.valueOf()-dateCache) < 250) {
		clearTimeout(listTimeout);
		listTimeout = setTimeout("gameListAuto", 250);
		return;
	} else {
		dateCache = d.valueOf();
	}

	gameList();
};