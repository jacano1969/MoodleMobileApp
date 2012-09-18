Ext.define('MoodleMobApp.model.Module', {
	extend: 'Ext.data.Model',
	
	config: {
		fields: [
			{name: 'id', type: 'int'},
			{name: 'courseid', type: 'int'},
			{name: 'instanceid', type: 'int'},
			{name: 'name', type: 'string'},
			{name: 'intro', type: 'string'},
			{name: 'modname', type: 'string'},
			{name: 'type', type: 'string'},
			{name: 'timemodified', type: 'int'},
			{name: 'isnew', type: 'boolean'},
			{name: 'isupdated', type: 'boolean'},
		]
	}
});