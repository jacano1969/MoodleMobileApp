Ext.define("MoodleMobApp.view.ModuleList", {
	extend: 'Ext.DataView',
	xtype: 'modulelist',

	config: {
		id: 'module_list',
	   	title: 'List of modules', 
		grouped: true,
		emptyText: 'No posts available in this discussion.',
		useComponents: true,
		defaultType: 'module',
	},
});
