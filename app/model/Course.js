Ext.define('MoodleMobApp.model.Course', {
	extend: 'Ext.data.Model',
	
	config: {
		fields: [
			{name: 'id', type: 'int'},
			{name: 'name', type: 'string'},
			{name: 'timemodified', type: 'string'},
			{name: 'token', type: 'string'},
			{name: 'modules', type: 'int', defaultValue: 0},
			{name: 'newmodules', type: 'int', defaultValue: 0},
			{name: 'modulestatus', type: 'string', defaultValue: 'counting modules...'},
		]
	}
});
