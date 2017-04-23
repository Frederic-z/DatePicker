(function() {
	
	var datepicker = window.datepicker;
	//	为datepicker添加一个buildUi方法
	var monthData;
	var $warpper;
	datepicker.buildUi = function(year, month) {
		//	获取本月数据
		monthData = datepicker.getMonthDate(year, month);
		var html = '<div class="ui-datepicker-header">' +
				'<a href="#" class="ui-datepicker-btn ui-datepicker-prev-btn">&lt;</a>' +
				'<a href="#" class="ui-datepicker-btn ui-datepicker-next-btn">&gt;</a>' +
				'<span class="ui-datepicker-curr-month">' + monthData.year + '-' +  monthData.month +'</span>' +
			'</div>' +
			'<div class="ui-datepicker-body">' +
				'<table>' +
					'<thead> ' +
						'<tr>' +
							'<th>一</th>' +
							'<th>二</th>' +
							'<th>三</th>' +
							'<th>四</th>' +
							'<th>五</th>' +
							'<th>六</th>' +
							'<th>日</th>' +
						'</tr>' +
					'</thead>' +
					'<tbody>';
					
				for(var i=0; i<monthData.days.length; i++) {
					var date = monthData.days[i];
					//为每周第一天加上tr标签	i%7为0是第一天
					if (i%7 ===0) {
						html += '<tr>';
					}
					
					html += '<td data-date = "' + date.date + '">' + date.showDate + '</td>';
					
					//为每周最后一天加tr结束标签		i%7为6是最后一天
					if (i%7 === 6) {
						html += '</tr>';
						alert(i);
					}
				}
		
				html +=	'</tbody>' +
				'</table>' +
			'</div>'

			
			return html;
	};
	
	datepicker.render = function (direction) {
		
		var year, month;
		if (monthData){
			var year =monthData.year;
			var month = monthData.month;
		}
		if (direction === 'prev') {
			month--;
		}
		
		if (direction === 'next') {
			month++;
		}
		
		var html = datepicker.buildUi(year, month);
		
//		document.body.innerHTML = html;
//		<div class="ui-datepicker-wrapper">
		var $wrapper = document.querySelector('.ui-datepicker-wrapper');
		if (!$warpper){
			$warpper = document.createElement('div');
			document.body.appendChild($warpper);
			$warpper.className = 'ui-datepicker-wrapper';
		}
		$warpper.innerHTML = html;
	};
	
	datepicker.init = function (input) {
		datepicker.render();
		
		var $input = document.querySelector(input);
		var isOpen = false;
		
		//为input添加事件
		$input.addEventListener('click', function() {
			
			//如果isOpen把日历的class拿掉 
			if (isOpen) {
				$warpper.classList.remove('ui-datepicker-wrapper-show');
				isOpen = false;
			} else {
				$warpper.classList.add('ui-datepicker-wrapper-show');
				var left = $input.offsetLeft;
				var top = $input.offsetTop;
				var height = $input.offsetHeight;
				$warpper.style.top = top + height + 2 + 'px';
				$warpper.style.left = left + 'px';
				isOpen = true;
			}
		}, false);
		
		$warpper.addEventListener('click', function(e) {
			var $target = e.target;
	
			if (!$target.classList.contains('ui-datepicker-btn')){
				return;
			}
			//上一月
			if ($target.classList.contains('ui-datepicker-prev-btn')) {
				datepicker.render('prev');
			} else if ($target.classList.contains('ui-datepicker-next-btn')) {
				datepicker.render('next');
			}
			
		},false);
		
		$warpper.addEventListener('click', function(e) {
			var $target = e.target;
			if($target.tagName.toLowerCase() !== 'td') return;
			
			var date = new Date(monthData.year, monthData.month - 1, $target.dataset.date);
			
			$input.value = format(date);
			
		})
		
	};

	function format(date) {
		ret = '';
		
		var padding = function (num) {
			if(num <= 9) {
				return num;
			}
		}
		
		ret += date.getFullYear() + '-'; 
		
		ret += padding(date.getMonth() + 1) + '-';
		
		ret += padding(date.getDate());
		
		$warpper.classList.remove('ui-datepicker-wrapper-show');

		
		return ret;
	}
})();
