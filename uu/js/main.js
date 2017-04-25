(function () {
	
	var datepicker = window.datepicker;
	var monthDate;
	var $wrapper;
	
	datepicker.buildUi = function (year, month) {
		monthDate = datepicker.getMonthData(year, month);
	 	var html = '<div class="ui-datepicker-header">' +
				'<a href="#" class="ui-datepicker-btn ui-datepicker-prev-btn">&lt;</a>' +
				'<a href="#" class="ui-datepicker-btn ui-datepicker-next-btn">&gt;</a>' +
				'<span class="ui-datepicker-current-month">'+ monthDate.year + '-' + monthDate.month + '</span>' +
			'</div>' +
			'<div class="ui-datepicker-body">' +
				'<table>' +
					'<thead>' +
						'<tr>' +
							'<th>一</th>' +
							'<th>二</th>' +
							'<th>三</th>' +
							'<th>四</th>' +
							'<th>五</th>' +
							'<th>六</th>' +
							'<th>七</th>' +
						'</tr>' +
					'</thead>' +
					'<tbody>' ;
					
					for (var i = 0; i < monthDate.days.length; i++) {
						var date = monthDate.days[i];
						
						if (i % 7 === 0) {
							html += '<tr>';
						}
						
						/**
						  * td里加什么属性好
						  * 或者还有什么办法
						  * 可以实现分清当前点击的对象
						  * 是上个月还是下个月还是本月
						  */
						
						/**
						 * date.date添加到自定义属性
						 * date.date为负是上个月
						 * date.date大于这个月的天数是下个月
						 **/
						
						html += '<td data-date = "'+date.date +'">' + date.showDate + '</td>';
						
						if (i % 7 === 6) {
							html += '</tr>';
						}
					}

					html +=	'</tbody>' +
							'</table>' +
						'</div>';
					
			
			return html;
	
	};
	
	datepicker.render = function(direction, label) {
			
			var year, month;
			if (monthDate) {
				month = monthDate.month;
				year = monthDate.year;
			}
			
			if (direction === 'prev') {
				month --;
			}
			if (direction === 'next') {
				month ++;
			}

			var html = datepicker.buildUi(year, month);
			
			$wrapper = document.querySelector('.ui-datepicker-wrapper');
			if(!$wrapper) {
				$wrapper = document.createElement('div');
				$wrapper.className = 'ui-datepicker-wrapper';
				document.body.appendChild($wrapper);
			};
			
			$wrapper.innerHTML = html;
		};
		
	
	datepicker.init = function(input) {
		datepicker.render();				
		
		var $input = document.querySelector('.datepicker');
		var isOpen = false;
		
		//输入框点击事件
		$input.addEventListener('click', function () {
			if (isOpen) {
				$wrapper.style.display = '';
				isOpen = false;
			} else {
				$wrapper.style.display = 'block';
				var left = $input.offsetLeft,
				 	top = $input.offsetTop + 5,
					height = $input.offsetHeight;
				$wrapper.style.left = left + 'px';
				$wrapper.style.top = top + height + 'px';
				isOpen = true;
			}
		},false);
		

		//月份切换
		$wrapper.addEventListener('click', function(e) {
			var $target = e.target;
			
			if (!$target.classList.contains('ui-datepicker-btn')) {
				return;
			} 
			
			if ($target.classList.contains('ui-datepicker-prev-btn')) {
				datepicker.render('prev');
			}
			
			if ($target.classList.contains('ui-datepicker-next-btn')) {
				datepicker.render('next');
			}
		}, false);
		
		
		//日期点击事件
		$wrapper.addEventListener('click', function (e) {
			var $target = e.target;
			
			if ($target.tagName.toLowerCase() !== 'td') {
				return;
			} else{
				var date = new Date(monthDate.year, monthDate.month - 1, $target.dataset.date);
				
			}
			// $target.getAttribute('data-date')
				
			if ($target.dataset.date <= 0) {
				datepicker.render('prev');
			}
			
			if($target.dataset.date > monthDate.lastDate) {
				
				datepicker.render('next');
			}
			
			
			$target.style.background = '#999';
			$input.value = fotmat(date);
			
		}, false);

		
		function fotmat(date) {
			
			var ret = '';
			
			function padding(num) {
				
				if (num <= 9) {
					num = '0' + num;				
				}
				return num;
			}
			
			ret += date.getFullYear() + '-';
			ret += padding(date.getMonth() + 1) + '-';
			ret += padding(date.getDate());
			return ret;
		}
	
	};

})();
