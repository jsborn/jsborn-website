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

JSB.extendPlugin(JSB.cls("jsborn.plugin.template", {

	imports:["jquery.plugins.jsrender"],

	getPrototype:function(){

		var dd = this;

		return {

			setTplPath : dd._set_tpl_path,
			
			loadTpl    : dd._load_template

		};

	},


	initialize: function(options) {

		var dd = this;


		dd.PLUGIN_TEMPLATE = {

			path:''

		}
		
		

		// dd.addListener('destroy',function(){

		// 	for (var i = 0; i < dd.PLUGIN_MODEL.model.length; i++) {

		// 		var _ns = dd.PLUGIN_MODEL.model[i];

		// 		_ns.destroy();

		// 	};

		// });

	},

	_set_tpl_path:function(str_path){

		this.PLUGIN_TEMPLATE.path = str_path; 

	},

	_load_template:function(ary_source){

		var _ary_def = [];

		var _int_id = "req:"+(new Date()).getTime();

		var dd = this;

		dd.dispatchEvent('loadTplStart',[_int_id,ary_source]);
		
		for (var i = 0; i < ary_source.length; i++) {
			
			_ary_def.push(jQuery.ajax({

				url      : this.PLUGIN_TEMPLATE.path + ary_source[i],
				
				timeout:3000,

				success:function(data){

					jQuery('head').append(data);
					
				},

				complete:function(jqXHR,textStatus){

					dd.dispatchEvent('loadTplProgress',_int_id,ary_source[i],textStatus);

				}

			}));

		};

		jQuery.when.apply(jQuery, _ary_def)

		.done(function(){
			// if(jQuery.isFunction(func_s)){
				// func_s.apply(scope,arguments);
			// }
			dd.dispatchEvent('loadTplEnd',_int_id,"done");
		})
		.fail(function(){
			// if(jQuery.isFunction(func_e)){
				// func_e.apply(scope,arguments);
			// }
			dd.dispatchEvent('loadTplEnd',_int_id,"fail");
		});


	}

}));
