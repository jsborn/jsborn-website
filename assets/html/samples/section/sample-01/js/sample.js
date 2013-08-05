JSB.cls("js.sample", {
	
	imports:[
		"jsborn.core.channel"
	],
	//validate create panel
	validate:function(){

		var me = this;

		me._cls_create_pannel.validate();

	},

	initialize: function(options) {

		var me = this;

		me._cls_event_pannel = JSB.create("js.sample.event-pannel");

		me._cls_create_pannel = JSB.create("js.sample.create-pannel");

		JSB.addListener("create",function(e,cls_jsb){

			JSB.core.channel.send('event-pannel',cls_jsb.className+" create!");

		});

		JSB.addListener("destroy",function(e,cls_jsb){

			JSB.core.channel.send('event-pannel',cls_jsb.className+" destroy!");

		});

	}

});

JSB.cls("js.sample.event-pannel", {

	plugins:[
		"jsborn.plugin.controller"
	],

	initialize: function(options) {

		var me = this;

		me.setRoot("#event-pannel");

		JSB.core.channel.join('event-pannel', this, function (e, data) {

			me.select("message").append('<div><p>'+data+'</p></div>');

		});

	}

});

JSB.cls("js.sample.create-pannel", {

	plugins:[
		"jsborn.plugin.controller"
	],

	validate:function(){

		var me = this;

		me.registerEvent();

		me.registerData();

	},

	setData:function(model){
		
		var me = this;
		
		me._data_model = model;

		return me._data_model;

	},

	getData:function(){
		
		var me = this;
		
		return me._data_model.getData();
		
	},

	initialize: function(options) {

		var me = this;

		me.setRoot("#create-pannel");

		me.setData(
			me.addModel("nodedata",{
				node_id:0,
				node_count:0,
			})
		);

	},

	_create_click:function(e){

		var me = e.data.scope;
		
		var _str_val = me.select().find("input[name='name']").val();

		var _cls_model = me.getData();

		if(jQuery.isEmptyObject(_str_val)){

			me.select().popover({
				placement:'top',
				content:"請輸入名字"
			})

			return false;

		}

		jQuery("input[name='name']").val('');

		var _cls_node = JSB.create("js.sample.node",{
			id:_cls_model.node_id,
			name:_str_val
		});

		_cls_node.addListener("node-validate",function(e,scope,data){

			me.select().find('#container').append(data);

		});

		_cls_node.addListener("destroy",function(e,scope,data){

			var _cls_model = me.getData();
			_cls_model.node_count--;
			me.setModel("nodedata",_cls_model);

		});

		_cls_node.validate();

		_cls_model.node_id++;
		_cls_model.node_count++;

		me.setModel("nodedata",_cls_model);

	}

});

JSB.cls("js.sample.node", {

	plugins:[
		"jsborn.plugin.controller"
	],

	validate:function(){

		var me = this;

		var _str_tmp =  '<div id="jsb-node-'+me.getData().id+'" class="jsb-node clearfix">';
		_str_tmp     += '<span>'+me.getData().name+'</span>';
		_str_tmp     += '<button id="delete" class="btn btn-danger" style="float: right;margin-left: 5px;">delete</button>';
		_str_tmp     += '<button id="info" class="btn btn-info" style="float: right;">info</button>';
		_str_tmp     += '</div>';

		me.dispatchEvent("node-validate",_str_tmp);

		me.setRoot("#jsb-node-"+me.getData().id);

		me.select().find('#delete').on("click",{scope:me},me._delete_click);

		me.select().find('#info').on("click",{scope:me},me._info_click);

	},

	setData:function(data){

		var me = this;	

		me._obj_data = data;

		return me._obj_data;
	},

	getData:function(){

		var me = this;

		return me._obj_data;

	},

	initialize: function(options) {

		var me = this;

		options.time = (new Date()).toString();

		me.setData(options);

		JSB.core.channel.send('event-pannel',this.className+":name = "+me.getData().name);

	},

	_delete_click:function(e){

		var scope = e.data.scope;

		scope.select().remove();

		scope.destroy();

		JSB.core.channel.send('event-pannel',this.className+":name = "+scope.getData().name+" destroy!");


	},

	_info_click:function(e){

		var scope = e.data.scope;

		var _str_info = "id:"+scope.getData().id;

		_str_info += "\nname:"+scope.getData().name;

		_str_info += "\ntime:"+scope.getData().time;

		JSB.core.channel.send('event-pannel',scope.className+":id = "+scope.getData().id+":get Info");

		alert(_str_info);

	}

});
