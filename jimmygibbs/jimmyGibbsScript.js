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

function getNextJimmyDate(){
	var now = new Date()
	var year = now.getFullYear()
	var day = getDayOfYear()
	
	if(jimmyCanSpawn()){
		day++
	}
	
	return new Date(new Date(year, 0).setDate(day + (15 - ((year * 365 - 733616 + day) % 15)) + 1))
}

var updateInterval = 15 * 1000

var updateCount = 0

function Update(){
	setTimeout(Update, updateInterval)
	
	var nextDate = getNextJimmyDate()
	document.getElementById("next-spawn-time").textContent = jimmyCanSpawn() ? "" : "The next time Jimmy can spawn is: " + nextDate.toLocaleString("default", {month: 'long'}) + ' ' + nextDate.getDate() + ' ' + nextDate.getFullYear()
	document.getElementById("can-spawn").textContent = jimmyCanSpawn() ? "Jimmy can currently spawn" : "Jimmy cannot currently spawn"
	//document.getElementById("update-count").textContent = updateCount
	
	updateCount++
	//window.alert("okay")
}

Update()