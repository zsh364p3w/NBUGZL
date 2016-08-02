﻿define(function(require, exports, module) {
	var utils = require('utils');
	var bs = {
		api: {
			pageModel: 'modules/xybmgl.do',
			resultProfile: './mock/resultProfile.json'
		},
		getDemoMainModel: function() {
			var def = $.Deferred();
			utils.doAjax(bs.api.resultProfile, null, 'get').done(function(data) {
				data.length = data.list.length;
				def.resolve(data);
			}).fail(function(res) {
				def.reject(res);
			});
			return def.promise();
		},
		save: function(formData){
			//TODO 将formData提交到后台动作上
			return BH_UTILS.doAjax('../modules/xybmgl/XX0301_SAVE.do', formData);
		},
		del: function(params){
			//TODO 添加删除动作
			return BH_UTILS.doAjax('../modules/xybmgl/XX0301_DELETE.do', {
				XX0301_DELETE:JSON.stringify(params)
			});
		},
		exportData: function(obj){
			var params = {
					root: contextPath,
					app : "nbugzl",
					module : "modules",
					page : 'xybmgl',
					action : 'XX0301_QUERY'
			};
			//选择字段导出
			$('#emapdatatable').emapdatatable('selectColumnsExport', params);	
		}
	};

	return bs;
});