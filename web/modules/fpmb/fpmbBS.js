﻿define(function(require, exports, module) {
	var utils = require('utils');
	var bs = {
		api: {
			pageModel: 'modules/fpmb.do',
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
			return BH_UTILS.doAjax('../modules/fpmb/xzfpblbc.do', formData);
		},
		edit: function(formData){
			//TODO 将formData提交到后台动作上
			return BH_UTILS.doAjax('../modules/fpmb/bjfpbl.do', formData);
		},
		del: function(formData){
			//TODO 添加删除动作
			return BH_UTILS.doAjax('../modules/fpmb/fpmbsc.do', formData);
		},
		exportData: function(obj){
			var params = {
					root: contextPath,
					app : "nbugzl",
					module : "modules",
					page : 'fpmb',
					action : 'fpmb'
			};
			//选择字段导出
			$('#emapdatatable').emapdatatable('selectColumnsExport', params);	
		},
		//分配模板界面,输入比例为分数时运算方法
        popupGetScore : function(score){
        	if (score ==''){//是否为空
        		score ='0';
        	}
        	var result = 0;
        	if(score.indexOf('/') > 0){//包含分号
        		var scoreList = score.split('/');
        		result = scoreList[0] / scoreList[1];
        	}else{
        		result = score;
        	}
        	return result;
        },
        //分配模板界面,输入比例是否合理
        popupDialogDanger : function(str,od) {
        	var p = {};
        	//是否包含中文和英文
        	if (escape(str).indexOf("%u") <0 && str.search(/[a-zA-Z]+/)==-1){
        		if(this.popupGetScore(str) >1 || this.popupGetScore(str) <0){//是否大于1
            		p = {
                			title:'操作提示',
                            content:od+'比例不能大于1且不能小于0',
                            buttons:[{text:'确认',className:'bh-btn-warning',callback:function(){}}]}; 
                	BH_UTILS.bhDialogDanger(
                			p
                	);
                	return false;
            	}else{
            		return true;
            	}
            }else {
            	p = {
            			title:'操作提示',
                        content:'比例不能含有汉字和字母',
                        buttons:[{text:'确认',className:'bh-btn-warning',callback:function(){}}]}; 
        		BH_UTILS.bhDialogDanger(
            			p
            	);
        		return false;
        	}
        },
        //分配模板修改界面,输入比例是否超出已有的模块比例之和
        popupSumDialogDanger : function(str,od,nd) {
        	var p = {};
        	if( this.popupGetScore(str)*1+nd*1 >1 || this.popupGetScore(str) <0){//输入比例与已有模板比例之和是否大于1
        		p = {
            			title:'操作提示',
                        content:od+'比例只能小于等于'+(1-nd).toFixed(3),
                        buttons:[{text:'确认',className:'bh-btn-warning',callback:function(){}}]}; 
            	BH_UTILS.bhDialogDanger(
            			p
            	);
            	return false;
        	}else{
        		return true;
        	}
        },
        //分配模板新建界面,输入比例是否超出已有的模块比例之和
        popupSaveDialogDanger : function(str,od,nd,num) {
        	var p = {};
        	if( this.popupGetScore(str)*num+nd*1 >1 || this.popupGetScore(str) <0){//输入比例与已有模板比例之和是否大于1
        		p = {
            			title:'操作提示',
                        content:od+'比例只能小于等于'+((1-nd)/num).toFixed(3),
                        buttons:[{text:'确认',className:'bh-btn-warning',callback:function(){}}]}; 
            	BH_UTILS.bhDialogDanger(
            			p
            	);
            	return false;
        	}else{
        		return true;
        	}
        }
	};

	return bs;
});