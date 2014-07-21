cvar_gen = [ 
	{name: 'gc_linux_launch_globalbin', 		type: 'TEXTBOX', 		displayName: '#SET_CV_GLOBALBIN', 		help: '#SET_CV_GLOBALBIN_TOOLTIP'},
	{name: 'gc_linux_launch_globalargs', 		type: 'TEXTBOX', 		displayName: '#SET_CV_GLOBALARGS', 		help: '#SET_CV_GLOBALARGS_TOOLTIP'},

	{name: 'gc_language', 						type: 'CB_LANGUAGE', 	displayName: '#SET_CV_LANG', 			help: '#SET_CV_LANG_TOOLTIP'},
	{name: 'gc_savelogin', 						type: 'CHECKBOX', 		displayName: '#SET_CV_AUTOLOGIN', 		help: '#SET_CV_AUTOLOGIN_TOOLTIP'},
	{name: 'gc_uploaddumps', 					type: 'CHECKBOX', 		displayName: '#SET_CV_CRASH', 			help: '#SET_CV_CRASH_TOOLTIP'},
	{name: 'gc_cleanmcf', 						type: 'CHECKBOX', 		displayName: '#SET_CV_MCFCLEAN', 		help: '#SET_CV_MCFCLEAN_TOOLTIP'},
	{name: 'gc_saveusername', 					type: 'CHECKBOX', 		displayName: '#SET_CV_USER', 			help: '#SET_CV_USER_TOOLTIP'},
	{name: 'gc_showerror', 						type: 'CHECKBOX', 		displayName: '#SET_CV_CONSOLE', 		help: '#SET_CV_CONSOLE_TOOLTIP'},
//	{name: 'gc_linux_disable_windows_warning',	type: 'CHECKBOX',		displayName: '#SET_CV_LIN_DIS_WIN_WRN',	help: '#SET_CV_LIN_DIS_WIN_WRN_TOOLTIP'},
	{name: 'gc_allow_wm_positioning',			type: 'CHECKBOX',		displayName: '#SET_CV_ALLOW_WM_POS',	help: '#SET_CV_ALLOW_WM_POS_TOOLTIP'},
	{name: 'gc_disable_forceupdate_shortcut', 	type: 'CHECKBOX', 		displayName: '#SET_CV_DISABLE_FORCESHORTCUT', help: '#SET_CV_DISABLE_FORCESHORTCUT_TOOLTIP'}
];

cvar_performance = [ 
	{name: 'gc_corecount', 		type: 'CB_CORECOUNT', 	displayName: '#SET_CV_WORKER', 			help: '#SET_CV_WORKER_TOOLTIP'},
	{name: 'gc_destroymain', 	type: 'CHECKBOX', 		displayName: '#SET_CV_DESTMAIN', 		help: '#SET_CV_DESTMAIN_TOOLTIP'},
	{name: 'gc_noloadtab', 		type: 'CHECKBOX', 		displayName: '#SET_CV_NOTAB', 			help: '#SET_CV_NOTAB_TOOLTIP'}
];

settings_tabs = [
	{hashTag: 'beta', 		displayName: '#SET_LAB_BETA', 		template: '#settings_beta', 	items: {}},
	{hashTag: 'games', 		displayName: '#SET_LAB_GAMES', 		template: '#settings_games', 	items: {}},
	{hashTag: 'general', 	displayName: '#SET_LAB_GENERAL', 	template: '#settings', 			items: cvar_gen},
	{hashTag: 'performance', displayName: '#SET_LAB_PERFORMANCE', template: '#settings', 		items: cvar_performance},
	{hashTag: 'theme', 		displayName: '#SET_LAB_THEME', 		template: '#settings_theme', 	items: {}}
];
