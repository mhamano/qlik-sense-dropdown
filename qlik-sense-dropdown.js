define( ["qlik", "jquery", "text!./style.css"], function ( qlik, $, cssContent ) {
	'use strict';
	$( "<style>" ).html( cssContent ).appendTo( "head" );
	return {
		initialProperties: {
			qListObjectDef: {
				qShowAlternatives: true,
				qFrequencyMode: "V",
				qInitialDataFetch: [{
					qWidth: 2,
					qHeight: 50
				}]
			}
		},
		definition: {
			type: "items",
			component: "accordion",
			items: {
				dimension: {
					type: "items",
					label: "Dimensions",
					ref: "qListObjectDef",
					min: 1,
					max: 1,
					items: {
						label: {
							type: "string",
							ref: "qListObjectDef.qDef.qFieldLabels.0",
							label: "Label",
							show: true
						},
						libraryId: {
							type: "string",
							component: "library-item",
							libraryItemType: "dimension",
							ref: "qListObjectDef.qLibraryId",
							label: "Dimension",
							show: function ( data ) {
								return data.qListObjectDef && data.qListObjectDef.qLibraryId;
							}
						},
						field: {
							type: "string",
							expression: "always",
							expressionType: "dimension",
							ref: "qListObjectDef.qDef.qFieldDefs.0",
							label: "Field",
							show: function ( data ) {
								return data.qListObjectDef && !data.qListObjectDef.qLibraryId;
							}
						},
						customSortOrder: {
			        type: "boolean",
			        ref: "customSortOrder",
			        component: "switch",
			        label: "Sort order",
			        defaultValue: false,
			        options: [{
			          value: true,
			          label: "Show",
			        }, {
			          value: false,
			          label: "Hide",
			        }],
			        show: true,
			      },
			      qSortByLoadOrder: {
			        type: "numeric",
			        component: "dropdown",
			        label: "Sort by Load Order",
			        ref: "qListObjectDef.qDef.qSortCriterias.0.qSortByLoadOrder",
			        options: [{
			          value: 1,
			          label: "Ascending"
			        }, {
			          value: 0,
			          label: "No"
			        }, {
			          value: -1,
			          label: "Descending"
			        }],
			        defaultValue: 0,
			        show: function(data) {
			          return data.customSortOrder;
			        },
			      },
			      qSortByState: {
			        type: "numeric",
			        component: "dropdown",
			        label: "Sort by State",
			        ref: "qListObjectDef.qDef.qSortCriterias.0.qSortByState",
			        options: [{
			          value: 1,
			          label: "Ascending"
			        }, {
			          value: 0,
			          label: "No"
			        }, {
			          value: -1,
			          label: "Descending"
			        }],
			        defaultValue: 0,
			        show: function(data) {
			          return data.customSortOrder;
			        },
			      },
			      qSortByFrequency: {
			        type: "numeric",
			        component: "dropdown",
			        label: "Sort by Frequence",
			        ref: "qListObjectDef.qDef.qSortCriterias.0.qSortByFrequency",
			        options: [{
			          value: -1,
			          label: "Ascending"
			        }, {
			          value: 0,
			          label: "No"
			        }, {
			          value: 1,
			          label: "Descending"
			        }],
			        defaultValue: 0,
			        show: function(data) {
			          return data.customSortOrde;
			        },
			      },
			      qSortByNumeric: {
			        type: "numeric",
			        component: "dropdown",
			        label: "Sort by Numeric",
			        ref: "qListObjectDef.qDef.qSortCriterias.0.qSortByNumeric",
			        options: [{
			          value: 1,
			          label: "Ascending"
			        }, {
			          value: 0,
			          label: "No"
			        }, {
			          value: -1,
			          label: "Descending"
			        }],
			        defaultValue: 0,
			        show: function(data) {
			          return data.customSortOrder;
			        },
			      },
			      qSortByAscii: {
			        type: "numeric",
			        component: "dropdown",
			        label: "Sort by Alphabetical",
			        ref: "qListObjectDef.qDef.qSortCriterias.0.qSortByAscii",
			        options: [{
			          value: 1,
			          label: "Ascending"
			        }, {
			          value: 0,
			          label: "No"
			        }, {
			          value: -1,
			          label: "Descending"
			        }],
			        defaultValue: 0,
			        show: function(data) {
			          return data.customSortOrder;
			        },
			      }
					}
				},
				settings: {
					uses: "settings"
				}
			}
		},
		support : {
			snapshot: true,
			export: true,
			exportData : false
		},
		paint: function ( $element,layout ) {

			var self = this, html = "<select id='drowdown-" + layout.qInfo.qId + "'>";
			layout.qListObject.qDataPages[0].qMatrix.forEach( function ( row ) {
				html += '<option ' + ((row[0].qState == 'S')? 'selected="selected"':'') + '" value="' + row[0].qElemNumber + '">' + row[0].qText;
				html += '</option>';
			} );
			html += "</select>";
			$element.html( html );

			$( "#drowdown-" + layout.qInfo.qId ).on('change', function(){
				var selected_value = parseInt($( "#drowdown-" + layout.qInfo.qId ).val(), 10);
				console.log("selected: " + selected_value);
				console.log(layout.qListObject.qDimensionInfo.qFallbackTitle)
				self.backendApi.selectValues(0, [selected_value],false)
			});

			return qlik.Promise.resolve();
		}
	};
} );
