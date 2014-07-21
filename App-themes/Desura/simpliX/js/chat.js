getGroupList = function()
{
	buddies = desura.chat.getChatBuddies();
	groups = {};

	showOffline = desura.settings.getValue("gc_chat_showoffline");
	showOffline = (showOffline != null && (showOffline == "true" || showOffline == "1"));	
	
	addToGroup = function(name, bud, ignoreOffline){
	
		if (!groups[name])
			groups[name] = new Array();
		
		if (ignoreOffline || showOffline == false || bud.getStatus() != 0)
			groups[name].push(bud);	
	};

	for (b in buddies){
	
		bud = buddies[b];
		
		if (bud == null || bud.isValid() == false)
			continue;
		
		if (bud.hasPendingRequest()){
			addToGroup('Request', bud, true);
		}
		else{
			budGroups = bud.getGroups();
			
			if (budGroups.length == 0){
				addToGroup('Friends', bud);			
			}
			else {	
				for (bg in budGroups){
				
					budGroup = budGroups[bg];
					
					if (budGroup == null)
						continue;
					
					addToGroup(budGroup, bud);	
				}
			}
		}
	}

	return groups;
};

getBuddie = function(fid){
	bud = desura.chat.buddie.getBuddie(fid);
	
	if (bud != null && bud.isValid())
		return bud;
		
	return null;
};

validateAvatar = function(url){

	if (desura.utils.isValidIcon(url))
		return url;

	return "../images/html/icons/default_avatar.png";
};

sortByName = function(list){

	if(list.length > 0) {
		temp = new Array();

		for(item in list) {
			try {
				temp[item] = {key: item, value: list[item].getName().toLowerCase()};
			} catch(e) {}
		}

		if(temp.length > 0) {
			temp.sort(function(a, b) {
				if (a.value > b.value)		return 1;
				if (a.value < b.value)		return -1;
				if (a.value === b.value)	return 0;
			});

			temp2 = new Array();

			for(item in temp) {
				temp2[item] = list[temp[item].key];
			}

			list = temp2;
		}
	}

	return list;
};

removeArrayElement = function(array, from, to) {
	var rest = array.slice((to || from) + 1 || array.length);
	array.length = from < 0 ? array.length + from : from;
	return array.push.apply(array, rest);
};	

getStatusString = function(status){
	if (status == desura.chat.level.OFFLINE)
		return "Offline";
	if (status == desura.chat.level.ONLINE)
		return "Online";
	if (status == desura.chat.level.AWAY)
		return "Away";
	if (status == desura.chat.level.BUSY)
		return "Busy";
	if (status == desura.chat.level.BBL)
		return "Be back later";
		
	return "Unknown";
};

getClientImage = function(client){
	if (client == "desura")
		return "http://media.desura.com/images/global/desura.png";
	else if (client == "facebook")
		return "http://media.desura.com/images/global/facebook.png";
	
	return "http://media.desura.com/images/global/indiedb.png";
};


getUrlVars = function()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	
    for(var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push({key: hash[0], value: hash[1]});
    }
	
    return vars;
}

lookUpSearchName = function(name){
	if (name == "email")
		return "Email";
	else if (name == "name")
		return "Name";
	else if (name == "username")
		return "Username";
	
	return name;
};

onChatBuddieContextMenu = function(event, buddie, showChatTab){

	if (buddie == null || buddie.isValid() == false)
		return;

	var menu = new desura.contextmenu();

	menu.appendItem(desura.utils.getLocalString("#CHAT_MENU_CHATWITH"), function() {
		showChatTab(buddie.getId());
	});
		
	menu.appendSeparator();
	
	if (buddie.isBlocked()) {
		menu.appendItem(desura.utils.getLocalString("#CHAT_MENU_UNBLOCK"), function() {
			buddie.unblock();
		});	
	}
	else {
		menu.appendItem(desura.utils.getLocalString("#CHAT_MENU_BLOCK"), function() {
			buddie.block();
		});		
	}
	
	if (buddie.hasPendingRequest()) {
		if (buddie.getSubscription() == desura.chat.subscription.FROM) {
			menu.appendItem(desura.utils.getLocalString("#CHAT_MENU_ACCEPT"), function() {
				buddie.acceptRequest();
			});
			
			menu.appendItem(desura.utils.getLocalString("#CHAT_MENU_REJECT"), function() {
				buddie.rejectRequest();
			});				
		}
		else {
			menu.appendItem(desura.utils.getLocalString("#CHAT_MENU_RESEND"), function() {
				buddie.sendRequest();
			});		
		}
	}

	groups = buddie.getGroups();
	
	if (groups.indexOf("Friends") != -1 || groups.length == 0) {
		menu.appendSeparator();
		menu.appendItem(desura.utils.getLocalString("#CHAT_MENU_REMOVE"), function() {
			buddie.remove();
		});	
	}
	
	menu.show(event);
};