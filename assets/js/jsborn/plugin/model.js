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

JSB.extendPlugin(JSB.cls("jsborn.plugin.model", {

	depends:["jsborn.core.model"],

	getPrototype:function(){

		var dd = this;

		return {

			addModel    : dd._add_model,
			
			delModel    : dd._del_model,
			
			getModel    : dd._get_model,

			getModelData: dd._get_model_data,
			
			setModel    : dd._set_model

		};

	},

	initialize: function() {

		var dd = this;

		dd.PLUGIN_MODEL = {
			model:[]
		}
		
		dd.addListener('destroy',function(){

			for (var i = 0; i < dd.PLUGIN_MODEL.model.length; i++) {

				var _ns = dd.PLUGIN_MODEL.model[i];

				_ns.destroy();

			};

		});

	},

	_get_model_data:function(str_key){

		var dd = this;

		return dd.PLUGIN_MODEL.model;

	},

	_get_model:function(str_key){

		var dd = this;

		for (var i = 0; i < dd.PLUGIN_MODEL.model.length; i++) {

			var _ns_model_node = dd.PLUGIN_MODEL.model[i];
			
			if(_ns_model_node.getOption().key==str_key){
				return _ns_model_node;
			}

		};

		return false;

	},

	_set_model:function(str_key,obj_data){

		var dd = this;

		var _obj_model = dd.getModel(str_key);

		if(!_obj_model){
			return false;
		}

		_obj_model.change(obj_data);
		

	},

	_add_model:function(str_key,obj_data){

		var dd = this;

		var _ns_model_node = JSB.create("jsborn.plugin.model.node",{
			key:str_key,
			data:jQuery.extend(true,{},obj_data)
		});
		
		dd.PLUGIN_MODEL.model.push(_ns_model_node);

		return _ns_model_node;

	},

	_del_model:function(str_key){

		var dd = this;

		for (var i = 0; i < dd.PLUGIN_MODEL.model.length; i++) {

			var _ns_model_node = dd.PLUGIN_MODEL.model[i];
			
			if(_ns_model_node.getOption().key==str_key){

				dd.PLUGIN_MODEL.model.splice(i,1);

				return _ns_model_node;
			}

		};

		return false;

	}

}));

JSB.cls("jsborn.plugin.model.node",{

	getData:function(){

		var dd = this;

		return jQuery.extend(true,{},dd._obj_data.data);

	},

	setData:function(obj_data){

		var dd = this;

		dd._obj_data.data = obj_data;

		return jQuery.extend(true,{},dd._obj_data.data);

	},

	setOption:function(obj_data){

		var dd = this;

		dd._obj_data = obj_data;

		return dd._obj_data;

	},

	getOption:function(){

		var dd = this;

		return dd._obj_data;

	},

	change:function(obj_data){

		var dd = this;
		
		var _obj_diff = JSB.core.model.getObjtDiff(dd.getData(), obj_data,"all");

		if(!jQuery.isEmptyObject(_obj_diff.add)){
			dd.dispatchEvent("model-add",_obj_diff.add);
		}

		if(!jQuery.isEmptyObject(_obj_diff.del)){
			dd.dispatchEvent("model-del",_obj_diff.del);
		}

		if(!jQuery.isEmptyObject(_obj_diff.modify)){
			dd.dispatchEvent("model-modify",_obj_diff.modify);
		}
			
		dd.setData(obj_data);

	},

	initialize: function(options) {

		var dd = this;

		dd.setOption(options);

	}

});