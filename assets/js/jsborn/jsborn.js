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
(function(window) {

	var _a_ver = jQuery.fn.jquery.split('.');

	var _s_e_o = "on";

	var _s_e_f = "off";

	if(_a_ver[1]<7){
		_s_e_o = "bind";
		_s_e_f = "unbind";
	}

	var JSB = {

		version:'0.5a',

		event:{
			on  : _s_e_o,
			off : _s_e_f
		},

		data:{

			cores    : {},
			
			clss     : {},
			
			plugins  : {},
			
			imports : []

		},

		config:{

			console:true,
			
			createImport :false,
			
			extendPlugins :[],

			importSetup:{
				ext:[".js"],
				library:'',
				source:'',
				parserURL:function(url){

					var _str_url  = '';

					if (url.match(/^(http|https):\/\//g)) {

						var _str_domain = url 

						_str_domain = _str_domain.match(/^(https|http):\/\/(.*?)\//g)[0].replace(/(https|http|:|\/)/g,'');

						if(_str_domain!=window.location.hostname){

							JSB.echo("error","imports need sample domain",url);

						}

						_str_url = url;


					} else {

						var _str_basename = url.replace(/\\/g, '/').replace(/.*\//, '');

						for (var i = 0; i < JSB.config.importSetup.ext.length; i++) {

							var _str_ext = JSB.config.importSetup.ext[i];

							if (_str_basename.substr(_str_basename.length,-_str_ext.length) != _str_ext) {
								
								_str_url  = url.replace(/\./g, '/');
								
								if(url.match(/^jsborn\./g) == -1){
									_str_url  = JSB.config.importSetup.library + _str_url + _str_ext;
								}else{
									_str_url  = JSB.config.importSetup.source + _str_url + _str_ext;
								}
								
								break;

							}else {
								_str_url = url;

							}

						};

					}

					return _str_url;

				}
			}

		},

		addListener:function(str_event,func_cb,ns_scope){

			jQuery(JSB)[JSB.event.on]('jsb.'+str_event,{scope:ns_scope},func_cb);

		},

		create: function(class_name, options) {

			if(JSB.config.createImport){
				this._check_class(class_name);
			}

			var _ns_cls = JSB.getClass(class_name);

			if(!_ns_cls){
				JSB.echo("error","NO CLASS:"+class_name);
				return false;
			}

			if(_ns_cls.config.abstr){
				JSB.echo("error","CLASS:ABSTR can't create",class_name);
				return false;
			}

			if(!_ns_cls.config.nodes){
				_ns_cls.config.nodes = [];
			}

			if(_ns_cls.config.single&&_ns_cls.config.nodes.length>0){
				JSB.echo("error","CLASS:SINGLE",class_name);
				return false;
			}

			var _ns = new _ns_cls["cls"](options);

			_ns_cls.config.nodes.push(_ns);

			jQuery(JSB).triggerHandler('jsb.create',_ns);

			return _ns

		},

		echo:function(str_type){

			if(console&&JSB.config.console){
				
				if(console[str_type]){

					var _ary_cb = [];
					
					for (var i = 1; i < arguments.length; i++) {
						_ary_cb.push(arguments[i]);
					};

					console[str_type](_ary_cb);

				}else{

					JSB.echo("log","console no "+str_type+" method.");

				}

			}

		},

		extendCore:function(str_ns,ns_class){

			if(!JSB.core){
				JSB.core = {};
			}

			var _ns_class_proto = ns_class["cls"].prototype;
			
			var _str_name       = ns_class.config.name;
			
			if(JSB.getCore(_str_name)){

				JSB.echo("log","Core: "+ _str_name +" already register.");

				return JSB.getCore(_str_name);

			}

			ns_class["config"] = jQuery.extend(ns_class["config"],{
				single:true,
				abstr:false,
				plugin:false,
				core:true
			});

			JSB.core[str_ns] = JSB.create(_str_name);

			JSB.data.cores[_str_name] = JSB.core[str_ns];

			return JSB.core[str_ns];

		},

		extendPlugin:function(ns_class){

			var _ns_class_proto = ns_class["cls"].prototype;
			
			var _ary_depends    = _ns_class_proto.depends;
			
			var _str_name       = ns_class.config.name;

			var me = this;
			//檢查是否已經被註冊
			if(JSB.getPlugin(_str_name)){

				JSB.echo("log","Plugin: "+ns_class+" already register.");
				
				return JSB.getPlugin(_str_name);
			
			}
			//檢查插件的依賴類
			if(jQuery.isArray(_ary_depends)){

				for (var i = 0; i < _ary_depends.length; i++) {
					
					if(!me._check_class(_ary_depends[i])){
						JSB.echo("error","PLUGINS:"+_str_name+" depends CLASS:"+_ary_depends[i]+" not found");
					}

				};
			}

			ns_class["config"] = jQuery.extend(ns_class["config"],{
				single:true,
				abstr:false,
				plugin:true,
				core:false
			});

			JSB.data.plugins[_str_name] = JSB.create(_str_name);

			return JSB.data.plugins[_str_name];

		},

		getCore:function(_str_name){

			var me = this;

			if (me.data.cores[_str_name]) {
				return me.data.cores[_str_name];
			} else {
				return false;
			}

		},

		getClass: function(_str_name) {

			var me = this;

			if (me.data.clss[_str_name]) {
				return me.data.clss[_str_name];
			} else {
				return false;
			}

		},

		getClassData: function() {

			var me = this;

			return me.data.clss;

		},

		getPlugin: function(_str_name) {

			var me = this;

			if (me.data.plugins[_str_name]) {
				return me.data.plugins[_str_name];
			} else {
				return false;
			}

		},

		getImportData: function() {

			return this.data.imports;

		},

		importClass: function(_str_import) {

			var _str_url  = '';
			
			var _bool_status = true;

			if (JSB._check_import(_str_import)) {
				return true;
			}

			_str_url = JSB.config.importSetup.parserURL(_str_import);

			jQuery.ajax({

				url      : _str_url,
				
				dataType : "script",
				
				async    : false,
				
				error    : function(jqXHR, textStatus, errorThrown) {

					_bool_status = false;

					JSB.echo("error","Require:" + _str_url + " Message:" + errorThrown);

				},
				success  : function() {
					
					JSB.data.imports.push({
						name: _str_url,
						status: _bool_status
					});

				}

			});

			return _bool_status;

		},

		removeListener:function(str_event){

			jQuery(JSB).off('jsb.'+str_event);

		},

		setConfig:function(obj){

			var me = this;

			jQuery.extend(true,me.config, obj)

			return me.config;

		},

		_check_import: function(_str_import) {

			for (var i = 0; i < JSB.data.imports.length; i++) {

				if (JSB.data.imports[i]["name"] == _str_import) {

					JSB.echo("log","same", JSB.data.imports[i], _str_import);

					return true;

				}

			};

			return false;

		},

		_check_class: function(_str_cls) {

			var me = this;

			if (!me.getClass(_str_cls)) {

				return me.importClass(_str_cls);

			}

			return true;

		},

		_init: function() {

			var me = this;



			me._init_oop();

		},

		_init_oop: function() {

			var me = this;

			JSB.cls = function(name, obj) {

				if (me.getClass(name)) {

					JSB.echo("error","CLASS:'" + name + "' define again");

					return true;

				}

				var _jsb_cls = function(options) {

					var _str_extend = this.extend;

					if (_str_extend) {

						JSB._check_class(_str_extend);

						jQuery.extend(
							_jsb_cls.prototype, 
							JSB.cls.prototype, 
							JSB.getClass(_str_extend)["cls"].prototype, 
							obj
						);

					}

					var _ns_class = me.getClass(name);

					obj.plugins = obj.plugins?obj.plugins:[];

					this.plugins = this.plugins?this.plugins:[];

					this.plugins = jQuery.merge(this.plugins, obj.plugins);

					if(!_ns_class.config.plugin&&!_ns_class.config.core){

						this.plugins = jQuery.merge(this.plugins,JSB.config.extendPlugins);
						var _ary_result = [];
						jQuery.each(this.plugins, function(i, e) {
							if (jQuery.inArray(e, _ary_result) == -1){
								_ary_result.push(e);
							}
						});
						this.plugins = _ary_result;

					}

					this._name = name;

					this._count = 0;

					this._destroy = false;

					this._ary_extend = [];

					this._ary_plugin = [];
					//插件初始化
					this._plugin_init(_jsb_cls);
					//繼承
					this._extend(this);
					//載入依賴包
					this._import();

					this.initialize(options);
					//super
					this.SUPER();

					delete this._count;

					return true;

				};

				jQuery.extend(_jsb_cls.prototype, JSB.cls.prototype, obj);

				if(obj.single!==true){
					obj.single = false;
				}

				if(obj.abstr!==true){
					obj.abstr = false;
				}

				me.data.clss[name] = {
					config:{
						name:name,
						single:obj.single,
						abstr:obj.abstr,
						plugin:false,
						core:false
					},
					cls:_jsb_cls
				};
				// // 继承Class类基本属性

				return me.data.clss[name];

			};

			JSB.cls.prototype = {

				extend: '',

				_ary_extend: [],

				_ary_plugin: [],

				_plugin_init:function(jsb_cls){

					var _ary_plugin = this.plugins;

					var _ns_plugin;

					if(_ary_plugin){

						for (var i = 0; i < _ary_plugin.length; i++) {
							
							JSB._check_class(_ary_plugin[i]);

							_ns_plugin = JSB.getClass(_ary_plugin[i])["cls"].prototype;

							this._ary_plugin.push(_ary_plugin[i]);

							this._plugin(_ns_plugin);

						};

						for (var i = 0; i < this._ary_plugin.length; i++) {
							
							_ns_plugin = JSB.getClass(this._ary_plugin[i])["cls"].prototype;
							
							jQuery.extend(
								jsb_cls.prototype, 
								JSB.getPlugin(this._ary_plugin[i]).getPrototype()
							);

							_ns_plugin.initialize.call(this);

						};

					}

				},

				_plugin: function(scope) {

					var _ary_depends = scope.depends;

					if (_ary_depends) {

						for (var i = 0; i < _ary_depends.length; i++) {
							
							var _str_cls = _ary_depends[i];

							var _ns_cls = JSB.getClass(_str_cls);
							
							if(!_ns_cls.config.plugin){
								continue;
							}

							this._ary_plugin.push(_str_cls);

							if (_ns_cls.cls.prototype.depends) {

								this._plugin(_ns_cls.cls.prototype);

							}

						};

					}

				},

				_extend: function(scope) {

					var _str_extend = scope.extend;

					if (_str_extend) {

						this._ary_extend.push(scope.extend);

						var _ns_cls = JSB.getClass(_str_extend)["cls"];

						if (_ns_cls.prototype.extend) {

							this._extend(_ns_cls.prototype);

						}

					}

				},

				_import: function() {

					if (this.imports) {

						for (var i = 0; i < this.imports.length; i++) {

							var _str_import = this.imports[i];

							JSB._check_class(_str_import);

						}

					}

				},

				SUPER: function() {

					if (this._ary_extend.length > 0 && this._count < this._ary_extend.length) {

						var _str_extend = this._ary_extend[this._count];

						if (_str_extend) {

							var _proto_class = JSB.getClass(_str_extend)["cls"].prototype;

							this._count++;

							_proto_class._import();

							_proto_class.initialize.apply(this);

							if (_proto_class.extend) {

								this.SUPER();

							}

						}

					}

				},

				destroy: function() {

					if(this._destroy){
						JSB.echo("error",this,"already destroy");
						return true;
					}

					var _ns_cls = JSB.getClass(this._name);

					for (var i = 0; i < _ns_cls.config.nodes.length; i++) {
						if(_ns_cls.config.nodes[i]==this){
							_ns_cls.config.nodes.splice(i,1);
						}
					};

					jQuery(this).triggerHandler('cls.destroy',this);

					jQuery(JSB).triggerHandler('jsb.destroy',this);

					this._destroy = true;

					return this;

				},

				addListener:function(str_event,func_cb,ns_scope){

					jQuery(this)[JSB.event.on]('cls.'+str_event,{scope:ns_scope},func_cb);

				},

				dispatchEvent:function(str_event,obj_data){

					jQuery(this).triggerHandler('cls.'+str_event,this,obj_data);

				},

				removeListener:function(str_event){

					jQuery(this)[JSB.event.off]('cls.'+str_event);

				},				

				initialize: function() {}

			}

		}

	}

	JSB._init();

	window.JSB = JSB;

})(window);