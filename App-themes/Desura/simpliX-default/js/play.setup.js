var jQ = $;

var listTimeout;
var searchCache = "";
var sortFieldCache = desura.utils.getCacheValue('LastSortField', 'getName');
var sortDirCache = desura.utils.getCacheValue('LastSortDir', 'asc');
var tabCache = desura.utils.getCacheValue('LastActiveTab', 'game');
var expandCache = JSON.parse(desura.utils.getCacheValue('LastActiveExpand', '{}'));
var playCache = JSON.parse(desura.utils.getCacheValue('LastActivePlay', '{}'));
var overlayPlay = false;
var overlayProperties = false;
var dateCache = 0;
var keepon = true;

expandCache = null !== expandCache && typeof(expandCache) == "object" ? expandCache : new Object;
playCache = null !== playCache && typeof(playCache) == "object" ? playCache : new Object;