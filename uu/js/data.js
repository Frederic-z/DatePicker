(function() {
	var datepicker = {};
	//获取一个月的数据
	datepicker.getMonthData = function(year, month) {

		var ret = [];
		/**
		 * 没有传入数据获取当前日期
		 **/
		if(!year && !month) {
			var today = new Date();
			year = today.getFullYear();
			month = today.getMonth() + 1;
		}

		//第一天
		var firstDay = new Date(year, month - 1, 1);
		//第一天是周几
		firstDayWeekDay = firstDay.getDay();
		//如果第一天是周日 0改为7
		if(firstDayWeekDay === 0) {
			firstDayWeekDay = 7;
		}
		year = firstDay.getFullYear();
		month = firstDay.getMonth() + 1;

		//这个月的第0天是上个月的最后一天
		var lastDayOfLastMonth = new Date(year, month - 1, 0);
		var lastDateOfLastMonth = lastDayOfLastMonth.getDate();

		/**
		 *	在日历的第一行需要显示多少上个月的日期
		 *  如果这个月的第一天是周日，就需要显示六天
		 * （这个月的第一天是星期几在减1）
		 */
		var preMonthDayCount = firstDayWeekDay - 1;

		/*
		 *	获取这个月的最后一天
		 *  下个月的第0天是这个月的最后一天
		 */
		var lastDay = new Date(year, month, 0);
		var lastDate = lastDay.getDate();

		//获取当月的每一天
		for(var i = 0; i < 7 * 6; i++) {
			/**
			 * date为负是上个月
			 * date大于这个月最后一天是下个月的
			 */
			var date = i + 1 - preMonthDayCount;
			var showDate = date;
			var thisMonth = month;
			
			if (date <= 0) {
				thisMonth = month - 1;
				showDate = lastDateOfLastMonth + date;
			} else if (date > lastDate) {
				thisMonth = month + 1;
				showDate = date - lastDate;
			}
			
			if (thisMonth === 0) thisMonth = 12;
			if (thisMonth === 13) thisMonth = 0;
			
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

	window.datepicker = datepicker;

})();