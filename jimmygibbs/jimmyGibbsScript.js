function getDayOfYear(){
	var now = new Date()
	var start = new Date(now.getFullYear(), 0, 0)
	var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000)
	var oneDay = 1000 * 60 * 60 * 24
	var day = Math.floor(diff / oneDay) - 1
	
	return day
}

function jimmyCanSpawn(){
	var now = new Date()
	var year = now.getFullYear()
	var day = getDayOfYear()
	
	return (year > 2009 || day > 330) && (year * 365 - 733616 + day) % 15 == 0
}

function getLastJimmyDate(){
	var now = new Date()
	var year = now.getFullYear()
	var day = getDayOfYear()
	
	if(jimmyCanSpawn()){
		day--
	}
	
	var date = new Date(year, 0)
	date.setDate(day - ((year * 365 - 733616 + day) % 15) + 1)
	
	return date
}

function getNextJimmyDate(){
	var now = new Date()
	var year = now.getFullYear()
	var day = getDayOfYear()
	
	if(jimmyCanSpawn()){
		day++
	}
	
	var date = new Date(year, 0)
	date.setDate(day + (15 - ((year * 365 - 733616 + day) % 15)) + 1)
	
	return date
}

var updateInterval = 60 * 1000

var updateCount = 0

function Update(){
	setTimeout(Update, updateInterval)
	
	var nextDate = getNextJimmyDate()
	var lastDate = getLastJimmyDate()
	//document.getElementById("next-spawn-time-text").textContent = ""
	document.getElementById("next-spawn-time").textContent = nextDate.toLocaleString("default", {month: 'long'}) + ' ' + nextDate.getDate() + ' ' + nextDate.getFullYear()
	document.getElementById("last-spawn-time").textContent = lastDate.toLocaleString("default", {month: 'long'}) + ' ' + lastDate.getDate() + ' ' + lastDate.getFullYear()
	document.getElementById("can-spawn").textContent = jimmyCanSpawn() ? "Jimmy Gibbs Jr. can currently spawn" : "Jimmy Gibbs Jr. cannot currently spawn"
	//document.getElementById("update-count").textContent = updateCount
	
	updateCount++
	//window.alert("okay")
}

Update()