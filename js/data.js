(function(){
	var datepicker = {};
	// 方法：获取一个月的参数
	datepicker.getMonthDate = function(year, month) {
		// 定义一个数组用来反回结果
		var ret = [];	//当前日期
		// 如果没有传年或月使用当前日期
		if(!year || !month) {
			var today = new Date();
			year = today.getFullYear();
			month = today.getMonth() + 1;
		}
		
		//第一天
		var firstDay = new Date(year, month-1, 1);
		//第一天是周几
		var firstDayWeekDay = firstDay.getDay();
		//如果是周日
		if(firstDayWeekDay === 0) firstDayWeekDay = 7;
		
		year = firstDay.getFullYear();
		month = firstDay.getMonth() + 1;
		
		//上个月的最后一天 	    这个月的第0天是上个月的最后一天
		var lastDayOfLastMonth = new Date(year, month - 1, 0);	
		var lastDateOfLastMonth = lastDayOfLastMonth.getDate();
		
		//在日历的第一行需要显示多少上个月的日期
		var preMonthDayCount = firstDayWeekDay - 1;		
		
		//当月的最后一天	上个月的第一天是这个月的最后一天
		var lastDay = new Date(year, month, 0);
		var lastDate = lastDay.getDate();
		
		//获取当月的每一天
		for(var i=0; i<7*6; i++) {
			var date = i + 1 - preMonthDayCount;
			var showDate = date;
			var thisMonth = month;
			//上一月
			if(date <= 0) {
				thisMonth = month - 1;
				showDate = lastDateOfLastMonth + date;
			} else if (date > lastDate) {
				//下一月
				thisMonth = month + 1;
				showDate = showDate - lastDate;
			}
			
//			if (thisMonth === 0) {
//				thisMonth = 12;
//			} else if (thisMonth === 13) {
//				thisMonth = 1;
//			}
				
			if (thisMonth === 0) thisMonth = 12;
			if (thisMonth === 13) thisMonth = 1;
			
			ret.push({
				month: thisMonth,
				date: date,
				showDate: showDate
			});
			
		}
		return {
			year: year,
			month: month,
			days: ret
		};
	}
	window.datepicker =datepicker;
	
})();
