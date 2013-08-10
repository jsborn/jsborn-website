/**
 * Copyright jsborn.org [tureki11@gmail.com]
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

JSB.extendCore("assets",JSB.cls("jsborn.core.assets", {

	imports:["jquery.plugins.jsrender"],

	getConfig:function(){

		return this._obj_template;

	},

	loadCSS:function(str_name,ary_source){

		var me = this;

		var _ary_def = [];

		if(me._check_load(str_name,'css')){
			JSB.echo("warn","already have name : "+ str_name);
			return jQuery.Deferred().reject();
		}

		for (var i = 0; i < ary_source.length; i++) {
			
			_ary_def.push(jQuery.ajax({
				type: "GET",
				url     :  this.getConfig().path +ary_source[i],
				cache	: true,
				timeout : 3000,

				success:function(data){

					var _el_style = document.createElement("style");

					_el_style.setAttribute("type", "text/css");

					if (_el_style.styleSheet) {

					    _el_style.styleSheet.cssText = data;

					} else {            

						_el_style.innerHTML = data;

					}

					jQuery("head").append(_el_style);
					
					me.ary_csss.push({
						name:str_name,
						element:jQuery(_el_style)
					});

				}

			}));

		};

		return jQuery.when.apply(jQuery, _ary_def);

	},

	loadTPL:function(str_name,ary_source){

		var me = this;

		var _ary_def = [];

		if(me._check_load(str_name,'tpl')){
			JSB.echo("warn","already have name : "+ str_name);
			return jQuery.Deferred().reject();
		}

		for (var i = 0; i < ary_source.length; i++) {
			
			_ary_def.push(jQuery.ajax({
				type    : "GET",
				url     : this.getConfig().path + ary_source[i],
				cache   : this.getConfig().cache,
				timeout : this.getConfig().timeout,
				success:function(data){

					var _ary_el = $(data);

					_ary_el.each(function(i,v){

						var _str_id = $(v).attr("id");
						
						if(_str_id){

							var _data = $('script#'+_str_id);

							if(_data.length>0){

								JSB.echo("warn","find same template id : "+ _str_id);

							}
	
						}
						
					});

					_ary_el.appendTo('head');

					me.ary_tpls.push({
						name:str_name,
						element:jQuery(_ary_el)
					});

				}

			}));

		};

		return jQuery.when.apply(jQuery, _ary_def);
		
	},

	removeCSS:function(str_name){

		var me = this;

		return me._remove_source(str_name,"css");

	},

	removeTPL:function(str_name){

		var me = this;

		return me._remove_source(str_name,"tpl");

	},

	setConfig:function(obj){

		this._obj_template = jQuery.extend(true,{},this._obj_template,obj);

		return this._obj_template;

	},

	initialize: function(options) {

		this._obj_template = {
			path:'',
			cache:false,
			timeout:3000
		};

		this.ary_tpls = [];

		this.ary_csss = [];
		
	},

	_remove_source:function(str_name,type){

		var me = this;

		var _type = me["ary_"+type+"s"];

		for (var i = 0; i < _type.length; i++) {
			
			var _obj = _type[i];

			if(_obj.name==str_name){

				_obj.element.remove();

				_type.splice(i,1);

				return true;

			}

		};

		return false;

	},

	_check_load:function(str_name,type){

		var me = this;

		var _type = me["ary_"+type+"s"];

		for (var i = 0; i < _type.length; i++) {
			
			var _obj = _type[i];

			if(_obj.name==str_name){

				return true;

			}

		};

		return false;

	}

}));
