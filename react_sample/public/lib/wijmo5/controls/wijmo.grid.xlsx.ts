/*
    *
    * Wijmo Library 5.20153.117
    * http://wijmo.c1.grapecity.com/
    *
    * Copyright(c) GrapeCity, Inc.  All rights reserved.
    *
    * Licensed under the Wijmo Commercial License.
    * 
    * http://wijmo.c1.grapecity.com/license/
    *
    */
/**
 * Extension that defines the @see:FlexGridXlsxConverter class that provides client-side Excel xlsx file import/export capabilities
 * for the @see:FlexGrid control.
 */
module wijmo.grid.xlsx {
    'use strict';

	/**
     * This class provides static <b>import</b> and <b>export</b> methods for exporting and importing of the @see:FlexGrid control 
     * from/to Excel xlsx files.
	 */
    export class FlexGridXlsxConverter {

		/*
		 * Exports the @see:FlexGrid controls to xlsx file content, creating a separate sheet for each control.
         *
         * Additional sheet settings can be specified for each exporting @see:FlexGrid control by assigning the object
         * that conforms to the @see:IExtendedSheetInfo interface to the control's dynamic <b>wj_sheetInfo</b> property.
		 *
         * 
         * For example:
         * <pre>// This sample exports FlexGrid content to an xlsx 
         * // file on a local disk in response to the Export hyperlink 
         * // click.
         * &nbsp;
         * // HTML
         * &lt;a download="FlexGrid.xlsx" 
         *     href="" 
         *     id="export" 
         *     onclick="exportXlsx()"&gt;
         *     Export
         * &lt;/a&gt;
         * &nbsp;
         * // JavaScript
         * function exportXlsx() {
         *     // Export to xlsx format.
         *     var fileContent = 
         *         wijmo.grid.xlsx.FlexGridXlsxConverter.export(flexGrid,
         *             { includeColumnHeader: true });
         *     // Save the xlsx content to a file.
         *     var link = document.getElementById("export");
         *     if (navigator.msSaveBlob) {
         *         // Save the xlsx file using Blob and msSaveBlob in IE10+.
         *         var blob = new Blob([fileContent.base64Array]);
         *         navigator.msSaveBlob(blob, link.getAttribute("download"));
         *     } else {
         *         link.href = fileContent.href();
         *     }
         * }</pre>
		 * @param grid The @see:FlexGrid control, or the array of @see:FlexGrid controls that should be exported to xlsx file.
         * In case of array each <b>FlexGrid</b> in the array is exported as a separate sheet of the resulting xlsx file.
		 * @param exportOption The export options.
         * @return An object containing xlsx file content in different formats that can be saved on a local disk, passed to server
         * and so on.
		 */
        public static export(grid: any, exportOption?: IFlexGridXlsxExportOptions): wijmo.xlsx.IXlsxFileContent {
			console.error('** The "FlexGridXlsxConverter.export" method is deprecated. Please use the "FlexGridXlsxConverter.save" method instead.');
            var workbook = this.toWorkbookOM(grid, exportOption);
            return wijmo.xlsx.XlsxConverter.export(workbook);
        }
		/*
		 * Imports the xlsx file content to one or more @see:FlexGrid controls.
         *
         * Each @see:FlexGrid instance referenced in the <b>grid</b> and <b>moreSheets</b> parameters will
         * receive a @see:IExtendedSheetInfo interface instance in the control's dynamic <b>wj_sheetInfo</b> property,
         * which contains some additional sheet properties.
         * 
         * For example:
         * <pre>// This sample opens an xlsx file chosen via Open File
         * // dialog and fills FlexGrid with the content of the first
         * // sheet.
         * &nbsp;
         * // HTML
         * &lt;input type="file" 
         *     id="importFile" 
         *     accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
         * /&gt;
         * &lt;div id="flexHost"&gt;&lt;/&gt;
         * &nbsp;
         * // JavaScript
         * var flexGrid = new wijmo.grid.FlexGrid("#flexHost"),
         *     importFile = document.getElementById('importFile');
         * &nbsp;
         * importFile.addEventListener('change', function () {
         *     loadWorkbook();
         * });
         * &nbsp;
         * function loadWorkbook() {
         *     var reader = new FileReader(),
         *         fileData;
         *     reader.onload = function (e) {
         *        wijmo.grid.xlsx.FlexGridXlsxConverter.import(reader.result,
         *             flexGrid, { includeColumnHeader: true });
         *     };
         *     var file = importFile.files[0];
         *     if (file) {
         *         reader.readAsArrayBuffer(file);
         *     }
         * }</pre>
		 * @param fileContent The content of the importing xlsx file represented as an encoded base64 string or 
         * as an <b>ArrayBuffer</b> object.
		 * @param grid The @see:FlexGrid control that will be filled with data from the first sheet of the xlsx file.
		 * @param importOption The import options.
		 * @param moreSheets If specified, the method will fill the array with @see:FlexGrid controls containing data 
         * from each additional sheet in the xlsx file.
		 */
        public static import(fileContent: any, grid: FlexGrid, importOption?: IFlexGridXlsxImportOptions, moreSheets?: FlexGrid[]) {
			console.error('** The "FlexGridXlsxConverter.import" method is deprecated. Please use the "FlexGridXlsxConverter.load" method instead.');
            var workbook = wijmo.xlsx.XlsxConverter.import(fileContent);
            this.fromWorkbookOM(workbook, grid, importOption, moreSheets);
        }
		/*
		 * Exports the @see:FlexGrid control to Workbook Object Model.
         *
         * Additional sheet settings can be specified for each exporting @see:FlexGrid control by assigning the object
         * that conforms to the @see:IExtendedSheetInfo interface to the control's dynamic <b>wj_sheetInfo</b> property.
		 *
		 * @param flex The @see:FlexGrid control, or the array of @see:FlexGrid controls that should be exported.
         * In case of array each <b>FlexGrid</b> in the array is exported as a separate sheet of the resulting 
         * Workbook Object Model instance.
		 * @param exportOption The export options.
         * @return The @see:IWorkbook instance representing export results.
		 */
        public static toWorkbookOM(flex: any, exportOption?: IFlexGridXlsxExportOptions): wijmo.xlsx.IWorkbook {
			console.error('** The "FlexGridXlsxConverter.toWorkbookOM" method is deprecated. Please use the "FlexGridXlsxConverter.save" method instead.');
            var file = <wijmo.xlsx.IWorkbook>{
                sheets: [],
                creator: '',
                created: new Date(),
                lastModifiedBy: '',
                modified: new Date(),
                activeWorksheet: 0
            },
                index: number,
                grid: FlexGrid;

            if (exportOption && exportOption.activeWorksheet != null && exportOption.activeWorksheet > 0) {
                file.activeWorksheet = exportOption.activeWorksheet;
            }
            if (isArray(flex)) {
                for (index = 0; index < flex.length; index++) {
                    grid = flex[index];
                    // export the FlexGrid to xlsx.
                    this._exportFlexGrid(grid, file, exportOption);
                }
            } else {
                this._exportFlexGrid(flex, file, exportOption);
            }
            return file
        }

		/*
		 * Imports the Workbook Object Model instance to one or more @see:FlexGrid controls.
         *
         * Each @see:FlexGrid instance referenced in the <b>flex</b> and <b>moreSheets</b> parameters will
         * receive a @see:IExtendedSheetInfo interface instance in the control's dynamic <b>wj_sheetInfo</b> property,
         * which contains some additional sheet properties.
		 *
		 * @param workbook The Workbook Object Model instance to import data from.
		 * @param flex The @see:FlexGrid control that will be filled with data from the first sheet of the 
         * Workbook Object Model instance.
		 * @param importOption The import options.
		 * @param moreSheets If specified, the method will fill the array with @see:FlexGrid controls containing data 
         * from each additional sheet defined in the Workbook Object Model instance.
		 */
        public static fromWorkbookOM(workbook: wijmo.xlsx.IWorkbook, flex: FlexGrid, importOption?: IFlexGridXlsxImportOptions, moreSheets?: FlexGrid[]) {
			console.error('** The "FlexGridXlsxConverter.fromWorkbookOM" method is deprecated. Please use the "FlexGridXlsxConverter.load" method class instead.');
            var includeColumnHeader = importOption ? importOption.includeColumnHeader : true,
                currentIncludeRowHeader = importOption ? importOption.includeColumnHeader : true,
                sheetCount = 1,
                sheetIndex = 0,
                c = 0,
                r = 0,
                i: number,
                j: number,
				columnSettings: wijmo.xlsx.IWorkbookColumn[],
                columns: IColumn[],
                columnSetting: IColumn,
                column: Column,
                columnHeader: string,
                sheetHeaders: wijmo.xlsx.IWorkbookRow,
                sheetHeader: wijmo.xlsx.IWorkbookCell,
                headerForamt: string,
                row: wijmo.xlsx.IWorkbookRow,
                currentSheet: wijmo.xlsx.IWorkSheet,
				rowCount: number,
                columnCount: number,
                isGroupHeader: boolean,
                item: wijmo.xlsx.IWorkbookCell,
                nextRowIdx: number,
                nextRow: wijmo.xlsx.IWorkbookRow,
                summaryBelow: boolean,
                commonRow: Row,
                groupRow: GroupRow,
                frozenColumns: number,
                frozenRows: number,
                formula: string,
                flexHostElement: HTMLElement,
                cellIndex: number,
                cellStyle: wijmo.xlsx.IWorkbookStyle,
                styledCells: any,
                mergedRanges: any,
                fonts: string[],
                valType: wijmo.DataType,
                textAlign: string,
                groupCollapsed: boolean = false,
                groupCollapsedSettings: any = {};

            flex.itemsSource = null;
            flex.columns.clear();
            flex.rows.clear();
            flex.frozenColumns = 0;
            flex.frozenRows = 0;

            if (workbook.sheets.length === 0) {
                return;
            }

            if (moreSheets) {
                sheetCount = workbook.sheets.length;
            }

            for (; sheetIndex < sheetCount; sheetIndex++) {
                styledCells = {};
                mergedRanges = {};
                r = 0;
                columns = [];
                fonts = [];
                currentSheet = workbook.sheets[sheetIndex];

                if (includeColumnHeader) {
                    r = 1;
                    if (currentSheet.rows.length <= 1) {
                        currentIncludeRowHeader = false;
                        r = 0;
                    }
                    sheetHeaders = currentSheet.rows[0];
                }
                columnCount = this._getColumnCount(currentSheet.rows);
				rowCount = this._getRowCount(currentSheet.rows, columnCount);
                summaryBelow = currentSheet.summaryBelow;

                if (sheetIndex > 0) {
                    flexHostElement = document.createElement('div');
                    flex = new FlexGrid(flexHostElement);
                }

				columnSettings = currentSheet.columns || currentSheet.cols;
                for (c = 0; c < columnCount; c++) {
                    flex.columns.push(new Column());
					if (!!columnSettings[c]) {
						if (!isNaN(+columnSettings[c].width)) {
							flex.columns[c].width = +columnSettings[c].width;
                        }

						if (!columnSettings[c].visible && columnSettings[c].visible != undefined) {
							flex.columns[c].visible = !!columnSettings[c].visible;
                        }
                    }
                }

				for (; r < rowCount; r++) {
                    isGroupHeader = false;
                    row = currentSheet.rows[r];

                    if (row) {
                        nextRowIdx = r + 1;
                        while (nextRowIdx < currentSheet.rows.length) {
                            nextRow = currentSheet.rows[nextRowIdx];
                            if (nextRow) {
                                if ((isNaN(row.groupLevel) && !isNaN(nextRow.groupLevel))
                                    || (!isNaN(row.groupLevel) && row.groupLevel < nextRow.groupLevel)) {
                                    isGroupHeader = true;
                                }
                                break;
                            } else {
                                nextRowIdx++;
                            }
                        }
                    }

                    if (isGroupHeader && !summaryBelow) {
                        if (groupRow) {
                            groupRow.isCollapsed = groupCollapsed;
                        }
                        groupRow = new GroupRow();
                        groupCollapsed = row.collapsed == null ? false : row.collapsed;
                        groupRow.level = isNaN(row.groupLevel) ? 0 : row.groupLevel;
                        groupCollapsedSettings[groupRow.level] = groupCollapsed;
                        if (this._checkParentCollapsed(groupCollapsedSettings, groupRow.level)) {
                            groupRow._setFlag(RowColFlags.ParentCollapsed, true);
                        }
                        flex.rows.push(groupRow);
                    } else {
                        commonRow = new Row();
                        if (row && this._checkParentCollapsed(groupCollapsedSettings, row.groupLevel)) {
                            commonRow._setFlag(RowColFlags.ParentCollapsed, true);
                        }
                        flex.rows.push(commonRow);
                    }

                    if (row && !!row.height && !isNaN(row.height)) {
                        flex.rows[currentIncludeRowHeader ? r - 1 : r].height = row.height;
                    }

                    for (c = 0; c < columnCount; c++) {
                        if (!row) {
                            flex.setCellData(currentIncludeRowHeader ? r - 1 : r, c, '');
                            this._setColumn(columns, c, undefined);
                        } else {
                            item = row.cells[c];
                            formula = item ? item.formula : undefined;
                            if (formula && formula[0] !== '=') {
                                formula = '=' + formula;
                            }
                            formula = formula ? this._parseToFlexSheetFormula(formula) : undefined;
                            flex.setCellData(currentIncludeRowHeader ? r - 1 : r, c, formula && moreSheets ? formula : this._getItemValue(item));
                            if (!isGroupHeader && item && item.value != null && item.value !== '') { // check value not empty to avoid wrong format parsing, for sheet can have many empty rows.
                                this._setColumn(columns, c, item);
                            }

                            // Set styles for the cell in current processing sheet.
                            cellIndex = r * columnCount + c;
                            cellStyle = item ? item.style : undefined;
                            if (cellStyle) {
                                valType = this._getItemType(item);
                                if (cellStyle.hAlign) {
									textAlign = wijmo.xlsx.Workbook._parseHAlignToString(asEnum(cellStyle.hAlign, wijmo.xlsx.HAlign));
                                } else {
                                    switch (valType) {
                                        case wijmo.DataType.Number:
                                            textAlign = 'right';
                                            break;
                                        case wijmo.DataType.Boolean:
                                            textAlign = 'center';
                                            break;
                                        default:
                                            textAlign = 'left';
                                            break;
                                    }
                                }

                                styledCells[cellIndex] = {
                                    fontWeight: cellStyle.font && cellStyle.font.bold ? 'bold' : 'none',
                                    fontStyle: cellStyle.font && cellStyle.font.italic ? 'italic' : 'none',
                                    textDecoration: cellStyle.font && cellStyle.font.underline ? 'underline' : 'none',
                                    textAlign: textAlign,
                                    fontFamily: cellStyle.font && cellStyle.font.family ? cellStyle.font.family : '',
                                    fontSize: cellStyle.font && cellStyle.font.size ? cellStyle.font.size + 'px' : '',
                                    color: cellStyle.font && cellStyle.font.color ? cellStyle.font.color : '',
                                    backgroundColor: cellStyle.fill && cellStyle.fill.color ? cellStyle.fill.color : '',
									format: wijmo.xlsx.Workbook._parseExcelFormat(item)
                                }
                                if (cellStyle.font && fonts.indexOf(cellStyle.font.family) === -1) {
                                    fonts.push(cellStyle.font.family);
                                }
                            }

                            // Get merged cell ranges.
                            if (item && isNumber(item.rowSpan) && isNumber(item.colSpan)) {
                                for (i = r; i < r + item.rowSpan; i++) {
                                    for (j = c; j < c + item.colSpan; j++) {
                                        cellIndex = i * columnCount + j;
                                        mergedRanges[cellIndex] = new CellRange(r, c, r + item.rowSpan - 1, c + item.colSpan - 1);
                                    }
                                }
                            }
                        }
                    }

                    if (row && !this._checkParentCollapsed(groupCollapsedSettings, row.groupLevel) && !row.visible && row.visible != undefined) {
                        flex.rows[currentIncludeRowHeader ? r - 1 : r].visible = row.visible;
                    }
                }

				// Set isCollapsed property for the last group row (TFS #139848 case 1)
				if (groupRow) {
					groupRow.isCollapsed = groupCollapsed;
				}

                if (currentSheet.frozenPane) {
                    frozenColumns = currentSheet.frozenPane.columns;
                    if (isNumber(frozenColumns) && !isNaN(frozenColumns)) {
                        flex.frozenColumns = frozenColumns;
                    }

                    frozenRows = currentSheet.frozenPane.rows;
                    if (isNumber(frozenRows) && !isNaN(frozenRows)) {
                        flex.frozenRows = currentIncludeRowHeader && frozenRows > 0 ? frozenRows - 1 : frozenRows;
                    }
                }

                // set columns for column header.
                for (c = 0; c < flex.columnHeaders.columns.length; c++) {
                    columnSetting = columns[c];
                    column = flex.columns[c];
                    // Setting the required property of the column to false for the imported sheet.
                    // TFS #126125
                    column.required = false;
                    if (currentIncludeRowHeader) {
                        sheetHeader = sheetHeaders ? sheetHeaders.cells[c] : undefined;
                        if (sheetHeader && sheetHeader.value) {
							headerForamt = wijmo.xlsx.Workbook._parseExcelFormat(sheetHeader);
                            columnHeader = wijmo.Globalize.format(sheetHeader.value, headerForamt);
                        } else {
                            columnHeader = this._numAlpha(c);
                        }
                    } else {
                        columnHeader = this._numAlpha(c);
                    }
                    column.header = columnHeader;
                    if (columnSetting) {
                        if (columnSetting.dataType === DataType.Boolean) {
                            column.dataType = columnSetting.dataType;
                        }
                        column.format = columnSetting.format;
                        column.align = columnSetting.hAlign;
                    }
                }

                // Set sheet related info for importing.
                // This property contains the name, style of cells, merge cells and used fonts of current sheet.
                if (moreSheets) {
                    flex['wj_sheetInfo'] = {
                        name: currentSheet.name,
                        visible: currentSheet.visible !== false,
                        styledCells: styledCells,
                        mergedRanges: mergedRanges,
                        fonts: fonts
                    };
                }

                if (moreSheets && sheetIndex > 0) {
                    moreSheets.push(flex);
                }
            }
		}

		/**
		 * Save the @see:FlexGrid instance to @see:Workbook instance.
		 *
		 * For example:
         * <pre>// This sample exports FlexGrid content to an xlsx 
         * // click.
         * &nbsp;
         * // HTML
         * &lt;button 
         *     onclick="saveXlsx('FlexGrid.xlsx')"&gt;
         *     Save
         * &lt;/button&gt;
         * &nbsp;
         * // JavaScript
         * function saveXlsx(fileName) {
         *     // Save the flexGrid to xlsx file.
         *     wijmo.grid.xlsx.FlexGridXlsxConverter.save(flexGrid,
         *             { includeColumnHeaders: true }, fileName);
         * }</pre>
		 *
		 * @param grid FlexGrid that will be saved.
		 * @param options Options to use when saving the grid (including whether to save row and column headers, sheet name, etc)
		 * @param fileName Name of the file that will be generated.
		 * @return A @see:Workbook object that can be used to customize the workbook before saving it (with the Workbook.save method).
		 */
		static save(grid: FlexGrid, options?: IFlexGridXlsxOptions, fileName?): wijmo.xlsx.Workbook {
			var workbook = new wijmo.xlsx.Workbook(),
				workSheet = new wijmo.xlsx.WorkSheet(),
				workbookFrozenPane = new wijmo.xlsx.WorkbookFrozenPane(),
				includeColumnHeaders = options && options.includeColumnHeaders != null ? options.includeColumnHeaders : true,
				includeRowHeaders = options && options.includeRowHeaders != null ? options.includeRowHeaders : false,
				includeCellStyles = options && options.includeCellStyles != null ? options.includeCellStyles : true,
				activeWorksheet = options ? options.activeWorksheet : null,
				workbookRowOM: wijmo.xlsx.IWorkbookRow,
				workbookRow: wijmo.xlsx.WorkbookRow,
				column: Column,
				workbookColumnOM: wijmo.xlsx.IWorkbookColumn,
				workbookColumn: wijmo.xlsx.WorkbookColumn,
				ri: number,
				ci: number,
				sheetInfo: IExtendedSheetInfo,
				fakeCell: HTMLDivElement,
				row: Row,
				groupRow: GroupRow,
				isGroupRow: boolean,
				groupLevel: number = 0,
				columnHeaderRowCnt: number = 0,
				rowHeaderColumnCnt: number = 0;

			// Set sheet name for the exporting sheet.
			sheetInfo = <IExtendedSheetInfo>grid['wj_sheetInfo'];
			workSheet.name = options ? options.sheetName : '';
			workSheet.visible = options ? (options.sheetVisible !== false) : true;

			if (!sheetInfo && includeCellStyles) {
				fakeCell = document.createElement('div');
				fakeCell.style.visibility = 'hidden';
				grid.hostElement.appendChild(fakeCell);
			}

			// Add the column settings of the row header.
			if (includeRowHeaders) {
				for (ci = 0; ci < grid.rowHeaders.columns.length; ci++) {
					column = grid.rowHeaders.columns[ci];
					workbookColumnOM = this._getColumnSetting(column, grid.columnHeaders.columns.defaultSize);
					workbookColumn = new wijmo.xlsx.WorkbookColumn();
					workbookColumn._deserialize(workbookColumnOM);
					workSheet._addWorkbookColumn(workbookColumn, ci);
				}
				rowHeaderColumnCnt = ci;
			}

			// add the headers in the worksheet.
			if (includeColumnHeaders && grid.columnHeaders.rows.length > 0) {
				for (ri = 0; ri < grid.columnHeaders.rows.length; ri++) {
					if (ri === 0) {
						for (ci = 0; ci < grid.columnHeaders.columns.length; ci++) {
							column = grid.columnHeaders.columns[ci];
							workbookColumnOM = this._getColumnSetting(column, grid.columnHeaders.columns.defaultSize);
							workbookColumn = new wijmo.xlsx.WorkbookColumn();
							workbookColumn._deserialize(workbookColumnOM);
							workSheet._addWorkbookColumn(workbookColumn, rowHeaderColumnCnt + ci);
						}
					}

					rowHeaderColumnCnt = 0;
					workbookRowOM = {};
					workbookRow = new wijmo.xlsx.WorkbookRow();
					if (includeRowHeaders) {
						rowHeaderColumnCnt = this._parseFlexGridRowToSheetRow(grid.topLeftCells, workbookRowOM, ri, 0, workSheet.columns, includeCellStyles, fakeCell, false, 0);
					}
					this._parseFlexGridRowToSheetRow(grid.columnHeaders, workbookRowOM, ri, rowHeaderColumnCnt, workSheet.columns, includeCellStyles, fakeCell, false, 0);

					// Only the row contains cells need be added into the Workbook Object Model.
					if (workbookRowOM.cells.length > 0) {
						workbookRow._deserialize(workbookRowOM);
						workSheet._addWorkbookRow(workbookRow, ri);
					}
				}
				columnHeaderRowCnt = ri;
			} else {
				for (ci = 0; ci < grid.columnHeaders.columns.length; ci++) {
					column = grid.columnHeaders.columns[ci];
					workbookColumnOM = this._getColumnSetting(column, grid.columnHeaders.columns.defaultSize);
					workbookColumn = new wijmo.xlsx.WorkbookColumn();
					workbookColumn._deserialize(workbookColumnOM);
					workSheet._addWorkbookColumn(workbookColumn, rowHeaderColumnCnt + ci);
				}
			}

			// add the content in the worksheet.
			for (ri = 0; ri < grid.cells.rows.length; ri++) {
				rowHeaderColumnCnt = 0;
				workbookRowOM = {};
				workbookRow = new wijmo.xlsx.WorkbookRow();

				row = grid.rows[ri];
				isGroupRow = row instanceof GroupRow;

				if (isGroupRow) {
					groupRow = tryCast(row, GroupRow);
					groupLevel = groupRow.level + 1;
				}

				if (includeRowHeaders) {
					rowHeaderColumnCnt = this._parseFlexGridRowToSheetRow(grid.rowHeaders, workbookRowOM, ri, 0, workSheet.columns, includeCellStyles, fakeCell, isGroupRow, groupLevel);
            }
				this._parseFlexGridRowToSheetRow(grid.cells, workbookRowOM, ri, rowHeaderColumnCnt, workSheet.columns, includeCellStyles, fakeCell, isGroupRow, groupLevel);

				// Only the row contains cells need be added into the Workbook Object Model.
				if (workbookRowOM.cells.length > 0) {
					workbookRow._deserialize(workbookRowOM);
					workSheet._addWorkbookRow(workbookRow, columnHeaderRowCnt + ri);
				}
			}

			workbookFrozenPane.rows = includeColumnHeaders ? (grid.frozenRows + grid.columnHeaders.rows.length) : grid.frozenRows;
			workbookFrozenPane.columns = includeRowHeaders ? (grid.frozenColumns + grid.rowHeaders.columns.length) : grid.frozenColumns;
			workSheet.frozenPane = workbookFrozenPane;

			workbook._addWorkSheet(workSheet);

			if (!sheetInfo && includeCellStyles) {
				// done with style element
				grid.hostElement.removeChild(fakeCell);
			}

			workbook.activeWorksheet = activeWorksheet;

			if (fileName) {
				workbook.save(fileName);
			}

			return workbook;
		}

		/**
		 * Loads an @see:Workbook instance or a Blob object containing xlsx file content to @see:FlexGrid instance.
		 *
		 * For example:
         * <pre>// This sample opens an xlsx file chosen via Open File
         * // dialog and fills FlexGrid with the content of the first
         * // sheet.
         * &nbsp;
         * // HTML
         * &lt;input type="file" 
         *     id="importFile" 
         *     accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
         * /&gt;
         * &lt;div id="flexHost"&gt;&lt;/&gt;
         * &nbsp;
         * // JavaScript
         * var flexGrid = new wijmo.grid.FlexGrid("#flexHost"),
         *     importFile = document.getElementById('importFile');
         * &nbsp;
         * importFile.addEventListener('change', function () {
         *     loadWorkbook();
         * });
         * &nbsp;
         * function loadWorkbook() {
         *     var reader,
         *         file = importFile.files[0];
         *     if (file) {
		 *         reader = new FileReader();
		 *         reader.onload = function (e) {
         *             wijmo.grid.xlsx.FlexGridXlsxConverter.load(flexGrid, reader.result,
         *                 { includeColumnHeaders: true });
         *         };
         *         reader.readAsArrayBuffer(file);
         *     }
         * }</pre>
		 * 
		 * @param grid FlexGrid that will load the workBook object.
		 * @param workbook An Workbook instance or a Blob instance or a base 64 stirng or an ArrayBuffer containing xlsx file content.
		 * @param options Options to use when load the workBook object to @see:FlexGrid instance (including whether to save row and column headers, sheet name, etc)
		 */
		static load(grid: FlexGrid, workbook: any, options?: IFlexGridXlsxOptions) {
			var workbookInstance: wijmo.xlsx.Workbook,
				reader: FileReader,
				self = this;

			if (workbook instanceof Blob) {
				reader = new FileReader();
				reader.onload = () => {
					var fileContent = wijmo.xlsx.Workbook._base64EncArr(new Uint8Array(reader.result));
					workbookInstance = new wijmo.xlsx.Workbook();
					workbookInstance.load(fileContent);
					self._loadToFlexGrid(grid, workbookInstance, options);
				}
				reader.readAsArrayBuffer(workbook);
			} else if (workbook instanceof wijmo.xlsx.Workbook) {
				self._loadToFlexGrid(grid, workbook, options);
			} else {
				if (workbook instanceof ArrayBuffer) {
					workbook = wijmo.xlsx.Workbook._base64EncArr(new Uint8Array(workbook));
				} else if (!isString(workbook)) {
					throw 'Invalid workbook.';
				}
				workbookInstance = new wijmo.xlsx.Workbook();
				workbookInstance.load(workbook);
				self._loadToFlexGrid(grid, workbookInstance, options);
			}
		}

        // export the flexgrid to excel file
        private static _exportFlexGrid(flex: FlexGrid, file: wijmo.xlsx.IWorkbook, exportOption: IFlexGridXlsxExportOptions) {
            var worksheetData: wijmo.xlsx.IWorkbookRow[] = [],
                columnSettings: wijmo.xlsx.IWorkbookColumn[] = [],
                workSheet: wijmo.xlsx.IWorkSheet = {
					columns: [],
                    rows: [],
                    summaryBelow: false
                },
                includeColumnHeaders = exportOption ? (exportOption.includeColumnHeaders != null ? exportOption.includeColumnHeaders : (exportOption.includeColumnHeader != null ? exportOption.includeColumnHeader : true)) : true,
                includeRowHeaders = exportOption ? (exportOption.includeRowHeaders != null ? exportOption.includeRowHeaders : false) : false,
				includeCellStyles = exportOption ? (exportOption.includeCellStyles != null ? exportOption.includeCellStyles : (exportOption.needGetCellStyle != null ? exportOption.needGetCellStyle : true)) : true,
                workbookRow: wijmo.xlsx.IWorkbookRow,
                column: Column,
                columnSetting: wijmo.xlsx.IWorkbookColumn,
                ri: number,
                ci: number,
                sheetInfo: IExtendedSheetInfo,
                fakeCell: HTMLDivElement,
                row: Row,
                groupRow: GroupRow,
                isGroupRow: boolean,
                groupLevel: number = 0,
                columnHeaderRowCnt: number = 0,
                rowHeaderColumnCnt: number = 0;

            // Set sheet name for the exporting sheet.
            sheetInfo = <IExtendedSheetInfo>flex['wj_sheetInfo'];
            workSheet.name = sheetInfo ? sheetInfo.name : '';
            workSheet.visible = sheetInfo ? (sheetInfo.visible !== false) : true;

			if (!sheetInfo && includeCellStyles) {
                fakeCell = document.createElement('div');
                fakeCell.style.visibility = 'hidden';
                flex.hostElement.appendChild(fakeCell);
            }

            // Add the column settings of the row header.
            if (includeRowHeaders) {
                for (ci = 0; ci < flex.rowHeaders.columns.length; ci++) {
                    column = flex.rowHeaders.columns[ci];
                    columnSetting = this._getColumnSetting(column, flex.columnHeaders.columns.defaultSize);
                    columnSettings[ci] = columnSetting;
                }
                rowHeaderColumnCnt = ci;
            }

            // add the headers in the worksheet.
            if (includeColumnHeaders && flex.columnHeaders.rows.length > 0) {
                for (ri = 0; ri < flex.columnHeaders.rows.length; ri++) {
                    if (ri === 0) {
                        for (ci = 0; ci < flex.columnHeaders.columns.length; ci++) {
                            column = flex.columnHeaders.columns[ci];
                            columnSetting = this._getColumnSetting(column, flex.columnHeaders.columns.defaultSize);
                            columnSettings[rowHeaderColumnCnt + ci] = columnSetting;
                        }
                    }

                    rowHeaderColumnCnt = 0;
                    workbookRow = {};
                    if (includeRowHeaders) {
						rowHeaderColumnCnt = this._parseFlexGridRowToSheetRow(flex.topLeftCells, workbookRow, ri, 0, columnSettings, includeCellStyles, fakeCell, false, 0);
                    }
					this._parseFlexGridRowToSheetRow(flex.columnHeaders, workbookRow, ri, rowHeaderColumnCnt, columnSettings, includeCellStyles, fakeCell, false, 0);

                    // Only the row contains cells need be added into the Workbook Object Model.
                    if (workbookRow.cells.length > 0) {
                        worksheetData[ri] = workbookRow;
                    }
                }
                columnHeaderRowCnt = ri;
            } else {
                for (ci = 0; ci < flex.columnHeaders.columns.length; ci++) {
                    column = flex.columnHeaders.columns[ci];

                    columnSetting = this._getColumnSetting(column, flex.columnHeaders.columns.defaultSize);
                    columnSettings[rowHeaderColumnCnt + ci] = columnSetting;
                }
            }
            workSheet.columns = columnSettings;

            // add the content in the worksheet.
            for (ri = 0; ri < flex.cells.rows.length; ri++) {
                rowHeaderColumnCnt = 0;
                workbookRow = {};

                row = flex.rows[ri];
                isGroupRow = row instanceof GroupRow;

                if (isGroupRow) {
                    groupRow = tryCast(row, GroupRow);
                    groupLevel = groupRow.level + 1;
                }

                if (includeRowHeaders) {
					rowHeaderColumnCnt = this._parseFlexGridRowToSheetRow(flex.rowHeaders, workbookRow, ri, 0, columnSettings, includeCellStyles, fakeCell, isGroupRow, groupLevel);
                }
				this._parseFlexGridRowToSheetRow(flex.cells, workbookRow, ri, rowHeaderColumnCnt, columnSettings, includeCellStyles, fakeCell, isGroupRow, groupLevel);

                // Only the row contains cells need be added into the Workbook Object Model.
                if (workbookRow.cells.length > 0) {
                    worksheetData[columnHeaderRowCnt + ri] = workbookRow;
                }
            }

            workSheet.rows = worksheetData;
            workSheet.frozenPane = {
                rows: includeColumnHeaders ? (flex.frozenRows + flex.columnHeaders.rows.length) : flex.frozenRows,
                columns: includeRowHeaders ? (flex.frozenColumns + flex.rowHeaders.columns.length) : flex.frozenColumns
            };

            file.sheets.push(workSheet);

			if (!sheetInfo && includeCellStyles) {
                // done with style element
                flex.hostElement.removeChild(fakeCell);
            }
		}

		// Load the workbook instance to flexgrid
		private static _loadToFlexGrid(grid: FlexGrid, workbook: wijmo.xlsx.Workbook, options: IFlexGridXlsxOptions) {
			var includeColumnHeaders = options && options.includeColumnHeaders != null ? options.includeColumnHeaders : true,
				currentIncludeRowHeaders = options && options.includeColumnHeaders != null ? options.includeColumnHeaders : true,
				sheetIndex = options && options.sheetIndex != null && !isNaN(options.sheetIndex) ? options.sheetIndex : 0,
				sheetName = options ? options.sheetName : null,
				sheetVisible = options ? options.sheetVisible : true,
				isFlexSheet = options && ((options.sheetIndex != null && !isNaN(options.sheetIndex)) || options.sheetName != null || options.sheetVisible != null),
				c = 0,
				r = 0,
				i: number,
				j: number,
				columnSettings: wijmo.xlsx.WorkbookColumn[],
				columns: IColumn[],
				columnSetting: IColumn,
				column: Column,
				columnHeader: string,
				sheetHeaders: wijmo.xlsx.WorkbookRow,
				sheetHeader: wijmo.xlsx.WorkbookCell,
				headerForamt: string,
				row: wijmo.xlsx.WorkbookRow,
				currentSheet: wijmo.xlsx.WorkSheet,
				rowCount: number,
				columnCount: number,
				isGroupHeader: boolean,
				item: wijmo.xlsx.WorkbookCell,
				nextRowIdx: number,
				nextRow: wijmo.xlsx.WorkbookRow,
				summaryBelow: boolean,
				commonRow: Row,
				groupRow: GroupRow,
				frozenColumns: number,
				frozenRows: number,
				formula: string,
				flexHostElement: HTMLElement,
				cellIndex: number,
				cellStyle: wijmo.xlsx.WorkbookStyle,
				styledCells: any,
				mergedRanges: any,
				fonts: string[],
				valType: wijmo.DataType,
				textAlign: string,
				groupCollapsed: boolean = false,
				groupCollapsedSettings: any = {};

			grid.itemsSource = null;
			grid.columns.clear();
			grid.rows.clear();
			grid.frozenColumns = 0;
			grid.frozenRows = 0;

			styledCells = {};
			mergedRanges = {};
			r = 0;
			columns = [];
			fonts = [];

			if (sheetIndex < 0 || sheetIndex >= workbook.sheets.length) {
				throw 'The sheet index option is out of the sheet range of current workbook.';
			}

			currentSheet = workbook.sheets[sheetIndex];

			if (currentSheet.rows == null) {
				return;
			}

			if (includeColumnHeaders) {
				r = 1;
				if (currentSheet.rows.length <= 1) {
					currentIncludeRowHeaders = false;
					r = 0;
				}
				sheetHeaders = currentSheet.rows[0];
			}
			columnCount = this._getColumnCount(currentSheet.rows);
			rowCount = this._getRowCount(currentSheet.rows, columnCount);
			summaryBelow = currentSheet.summaryBelow;

			columnSettings = currentSheet.columns || currentSheet.cols;
			for (c = 0; c < columnCount; c++) {
				grid.columns.push(new Column());
				if (!!columnSettings[c]) {
					if (!isNaN(+columnSettings[c].width)) {
						grid.columns[c].width = +columnSettings[c].width;
					}

					if (!columnSettings[c].visible && columnSettings[c].visible != undefined) {
						grid.columns[c].visible = !!columnSettings[c].visible;
					}
				}
			}

			for (; r < rowCount; r++) {
				isGroupHeader = false;
				row = currentSheet.rows[r];

				if (row) {
					nextRowIdx = r + 1;
					while (nextRowIdx < currentSheet.rows.length) {
						nextRow = currentSheet.rows[nextRowIdx];
						if (nextRow) {
							if ((isNaN(row.groupLevel) && !isNaN(nextRow.groupLevel))
								|| (!isNaN(row.groupLevel) && row.groupLevel < nextRow.groupLevel)) {
								isGroupHeader = true;
							}
							break;
						} else {
							nextRowIdx++;
						}
					}
				}

				if (isGroupHeader && !summaryBelow) {
					if (groupRow) {
						groupRow.isCollapsed = groupCollapsed;
					}
					groupRow = new GroupRow();
					groupCollapsed = row.collapsed == null ? false : row.collapsed;
					groupRow.level = isNaN(row.groupLevel) ? 0 : row.groupLevel;
					groupCollapsedSettings[groupRow.level] = groupCollapsed;
					if (this._checkParentCollapsed(groupCollapsedSettings, groupRow.level)) {
						groupRow._setFlag(RowColFlags.ParentCollapsed, true);
					}
					grid.rows.push(groupRow);
				} else {
					commonRow = new Row();
					if (row && this._checkParentCollapsed(groupCollapsedSettings, row.groupLevel)) {
						commonRow._setFlag(RowColFlags.ParentCollapsed, true);
					}
					grid.rows.push(commonRow);
				}

				if (row && !!row.height && !isNaN(row.height)) {
					grid.rows[currentIncludeRowHeaders ? r - 1 : r].height = row.height;
				}

				for (c = 0; c < columnCount; c++) {
					if (!row) {
						grid.setCellData(currentIncludeRowHeaders ? r - 1 : r, c, '');
						this._setColumn(columns, c, undefined);
					} else {
						item = row.cells[c];
						formula = item ? item.formula : undefined;
						if (formula && formula[0] !== '=') {
							formula = '=' + formula;
						}
						formula = formula ? this._parseToFlexSheetFormula(formula) : undefined;
						grid.setCellData(currentIncludeRowHeaders ? r - 1 : r, c, formula && isFlexSheet ? formula : this._getItemValue(item));
						if (!isGroupHeader) {
							this._setColumn(columns, c, item);
						}

						// Set styles for the cell in current processing sheet.
						cellIndex = r * columnCount + c;
						cellStyle = item ? item.style : undefined;
						if (cellStyle) {
							valType = this._getItemType(item);
							if (cellStyle.hAlign) {
								textAlign = wijmo.xlsx.Workbook._parseHAlignToString(asEnum(cellStyle.hAlign, wijmo.xlsx.HAlign));
							} else {
								switch (valType) {
									case wijmo.DataType.Number:
										textAlign = 'right';
										break;
									case wijmo.DataType.Boolean:
										textAlign = 'center';
										break;
									default:
										textAlign = 'left';
										break;
								}
							}

							styledCells[cellIndex] = {
								fontWeight: cellStyle.font && cellStyle.font.bold ? 'bold' : 'none',
								fontStyle: cellStyle.font && cellStyle.font.italic ? 'italic' : 'none',
								textDecoration: cellStyle.font && cellStyle.font.underline ? 'underline' : 'none',
								textAlign: textAlign,
								fontFamily: cellStyle.font && cellStyle.font.family ? cellStyle.font.family : '',
								fontSize: cellStyle.font && cellStyle.font.size ? cellStyle.font.size + 'px' : '',
								color: cellStyle.font && cellStyle.font.color ? cellStyle.font.color : '',
								backgroundColor: cellStyle.fill && cellStyle.fill.color ? cellStyle.fill.color : '',
								format: wijmo.xlsx.Workbook._parseExcelFormat(item)
							}
                            if (cellStyle.font && fonts.indexOf(cellStyle.font.family) === -1) {
								fonts.push(cellStyle.font.family);
							}
						}

						// Get merged cell ranges.
						if (item && isNumber(item.rowSpan) && isNumber(item.colSpan)) {
							for (i = r; i < r + item.rowSpan; i++) {
								for (j = c; j < c + item.colSpan; j++) {
									cellIndex = i * columnCount + j;
									mergedRanges[cellIndex] = new CellRange(r, c, r + item.rowSpan - 1, c + item.colSpan - 1);
								}
							}
						}
					}
				}

				if (row && !this._checkParentCollapsed(groupCollapsedSettings, row.groupLevel) && !row.visible && row.visible != undefined) {
					grid.rows[currentIncludeRowHeaders ? r - 1 : r].visible = row.visible;
				}
			}

			// Set isCollapsed property for the last group row (TFS #139848 case 1)
			if (groupRow) {
				groupRow.isCollapsed = groupCollapsed;
			}

			if (currentSheet.frozenPane) {
				frozenColumns = currentSheet.frozenPane.columns;
				if (isNumber(frozenColumns) && !isNaN(frozenColumns)) {
					grid.frozenColumns = frozenColumns;
				}

				frozenRows = currentSheet.frozenPane.rows;
				if (isNumber(frozenRows) && !isNaN(frozenRows)) {
					grid.frozenRows = currentIncludeRowHeaders && frozenRows > 0 ? frozenRows - 1 : frozenRows;
				}
			}

			// set columns for column header.
			for (c = 0; c < grid.columnHeaders.columns.length; c++) {
				columnSetting = columns[c];
				column = grid.columns[c];
				// Setting the required property of the column to false for the imported sheet.
				// TFS #126125
				column.required = false;
				if (currentIncludeRowHeaders) {
					sheetHeader = sheetHeaders ? sheetHeaders.cells[c] : undefined;
					if (sheetHeader && sheetHeader.value) {
						headerForamt = wijmo.xlsx.Workbook._parseExcelFormat(sheetHeader);
						columnHeader = wijmo.Globalize.format(sheetHeader.value, headerForamt);
					} else {
						columnHeader = this._numAlpha(c);
        }
				} else {
					columnHeader = this._numAlpha(c);
				}
				column.header = columnHeader;
				if (columnSetting) {
					if (columnSetting.dataType === DataType.Boolean) {
						column.dataType = columnSetting.dataType;
					}
					column.format = columnSetting.format;
					column.align = columnSetting.hAlign;
				}
			}

			// Set sheet related info for importing.
			// This property contains the name, style of cells, merge cells and used fonts of current sheet.
			grid['wj_sheetInfo'] = {
				name: sheetName || currentSheet.name,
				visible: sheetVisible === true ? true : currentSheet.visible !== false,
				styledCells: styledCells,
				mergedRanges: mergedRanges,
				fonts: fonts
			};
		}

        // Parse the row data of flex grid to a sheet row
		private static _parseFlexGridRowToSheetRow(panel: GridPanel, workbookRow: wijmo.xlsx.IWorkbookRow, rowIndex: number, startColIndex: number, columnSettings: wijmo.xlsx.IWorkbookColumn[], includeCellStyles: boolean, fakeCell: HTMLDivElement, isGroupRow: boolean, groupLevel: number): number {
            var flex: FlexGrid,
                row: Row,
                columnSetting: wijmo.xlsx.IWorkbookColumn,
                ci: number,
                format: string,
                val: any,
                unformattedVal: any,
                groupHeader: any,
                isFormula: boolean,
				formula: string,
                cellIndex: number,
                cellStyle: any,
                mergedCells: CellRange,
                rowSpan: number,
                colSpan: number,
                sheetInfo: IExtendedSheetInfo,
                valIsDate: boolean,
                isCommonRow: boolean = false;

            flex = panel.grid;
            sheetInfo = <IExtendedSheetInfo>flex['wj_sheetInfo'];

            row = panel.rows[rowIndex];

            if (!workbookRow.cells) {
                workbookRow.cells = [];
            }
            workbookRow.visible = row.isVisible;
            workbookRow.height = row.renderHeight || panel.rows.defaultSize;
            workbookRow.groupLevel = isGroupRow ? (groupLevel - 1) : groupLevel;
            if (isGroupRow) {
                workbookRow.collapsed = (<GroupRow>row).isCollapsed;
            }

            if (row.constructor === wijmo.grid.Row
                || row.constructor === wijmo.grid._NewRowTemplate
                || (wijmo.grid.detail && row.constructor === wijmo.grid.detail.DetailRow)) {
                isCommonRow = true;
            }

            for (ci = 0; ci < panel.columns.length; ci++) {
                colSpan = 1;
                rowSpan = 1;
                mergedCells = null;
                if (sheetInfo && panel === flex.cells) {
                    cellIndex = rowIndex * panel.columns.length + ci;
                    // Get merge range for cell.
                    if (sheetInfo.mergedRanges) {
                        mergedCells = sheetInfo.mergedRanges[cellIndex];
                    }
                    // Get style for cell.
                    if (sheetInfo.styledCells) {
                        cellStyle = sheetInfo.styledCells[cellIndex];
                    }
				} else if (includeCellStyles) {
                    cellStyle = this._getCellStyle(panel, fakeCell, rowIndex, ci) || {};
                }

                if (!mergedCells) {
                    mergedCells = flex.getMergedRange(panel, rowIndex, ci, false);
                }

                if (mergedCells) {
                    if (rowIndex === mergedCells.topRow && ci === mergedCells.leftCol) {
                        rowSpan = mergedCells.bottomRow - mergedCells.topRow + 1;
                        colSpan = mergedCells.rightCol - mergedCells.leftCol + 1;
                    } else {
                        continue;
                    }
                }

                columnSetting = columnSettings[ci];
                if (isCommonRow || isGroupRow) {
                    val = panel.getCellData(rowIndex, ci, true);
                    unformattedVal = panel.getCellData(rowIndex, ci, false);
                    isFormula = false;
                    if (val && isString(val) && val.length > 1 && val[0] === '=') {
                        isFormula = true;
                    }
					valIsDate = isDate(unformattedVal);
					format = cellStyle && cellStyle.format ? wijmo.xlsx.Workbook._parseCellFormat(cellStyle.format, valIsDate) : columnSetting.style.format;
                    if (!format) {
                        if (valIsDate) {
                            format = 'm/d/yyyy';
                        } else if (isNumber(unformattedVal) && !panel.columns[ci].dataMap) {
                            format = isInt(unformattedVal) ? '#,##0' : '#,##0.00';
						} else if (isFormula) {
							formula = (<string>val).toLowerCase();
							if (formula === '=now()') {
								format = 'm/d/yyyy h:mm';
								valIsDate = true;
							} else if (formula === '=today()' || formula.substring(0, formula.indexOf('(')) === '=date') {
								format = 'm/d/yyyy';
								valIsDate = true;
							} else if (formula.substring(0, formula.indexOf('(')) === '=time') {
								format = 'h:mm AM/PM';
								valIsDate = true;
							}
                        } else {
                            format = 'General';
                        }
                    }
                } else {
                    val = flex.columnHeaders.getCellData(0, ci, true);
                    format = 'General';
                }

                if (panel === flex.cells && isGroupRow && row['hasChildren'] && ci === flex.columns.firstVisibleIndex) {
                    // Process the group header of the flex grid.
                    if (val) {
                        groupHeader = val;
                    } else {
                        groupHeader = row.dataItem && row.dataItem.groupDescription ? row.dataItem.groupDescription.propertyName + ': ' + row.dataItem.name + ' (' + row.dataItem.items.length + ' items)' : '';
                    }

                    // If the formatted value, unformatted value and style of the cell is null, we should ignore this empty cell in the Workbook Object Model.
                    if (groupHeader == null && !cellStyle) {
                        continue;
                    }

                    valIsDate = isDate(groupHeader);
                    workbookRow.cells[startColIndex + ci] = {
                        value: groupHeader,
                        isDate: valIsDate,
                        formula: isFormula ? this._parseToExcelFormula(val, valIsDate) : null,
                        colSpan: colSpan,
                        rowSpan: rowSpan,
                        style: this._extend(this._parseCellStyle(cellStyle), {
                            format: format,
                            font: {
                                bold: true
                            },
                            hAlign: wijmo.xlsx.HAlign.Left,
                            indent: groupLevel - 1
                        })
                    };
                } else {
                    // Add the cell content
                    workbookRow.cells[startColIndex + ci] = {
                        value: isFormula ? undefined : format === 'General' ? val : unformattedVal,
                        isDate: valIsDate,
                        formula: isFormula ? this._parseToExcelFormula(val, valIsDate) : null,
                        colSpan: colSpan,
                        rowSpan: rowSpan,
                        style: this._extend(this._parseCellStyle(cellStyle), {
                            format: format,
							hAlign: cellStyle && cellStyle.textAlign ? wijmo.xlsx.Workbook._parseStringToHAlign(cellStyle.textAlign) : (isDate(unformattedVal) && columnSetting.style.hAlign == null ? wijmo.xlsx.HAlign.Left : asEnum(columnSetting.style.hAlign, wijmo.xlsx.HAlign, true)),
                            vAlign: rowSpan > 1 ? (panel === flex.cells ? wijmo.xlsx.VAlign.Top : wijmo.xlsx.VAlign.Center) : null
                        })
                    };
                }
            }
            return startColIndex + ci;
        }

        // Parse css style to Excel style.
        // To jcc: you may merge your changes here.
        private static _parseCellStyle(cellStyle: any): wijmo.xlsx.IWorkbookStyle {
            var fontSize = cellStyle && cellStyle.fontSize ? +cellStyle.fontSize.substring(0, cellStyle.fontSize.indexOf('px')) : 14;

            // We should parse the font size from pixel to point for exporting.
            if (isNaN(fontSize)) {
                fontSize = 14;
            }

            return {
                font: {
                    bold: cellStyle && cellStyle.fontWeight && (cellStyle.fontWeight === 'bold' || (!isNaN(+cellStyle.fontWeight) && +cellStyle.fontWeight >= 700)),
                    italic: cellStyle && cellStyle.fontStyle && cellStyle.fontStyle === 'italic',
                    underline: cellStyle && cellStyle.textDecoration && cellStyle.textDecoration === 'underline',
                    family: cellStyle ? this._parseToExcelFontFamily(cellStyle.fontFamily) : 'Arial',
                    size: fontSize,
                    color: cellStyle && cellStyle.color ? cellStyle.color : undefined,
                },
                fill: {
                    color: cellStyle && cellStyle.backgroundColor ? cellStyle.backgroundColor : undefined
                },
				hAlign: cellStyle && cellStyle.textAlign ? wijmo.xlsx.Workbook._parseStringToHAlign(cellStyle.textAlign) : undefined
            };
        }

        // Parse the css font family to excel font family.
        private static _parseToExcelFontFamily(fontFamily: string): string {
            var fonts: string[];

            if (fontFamily) {
                fonts = fontFamily.split(',');

                if (fonts && fonts.length > 0) {
                    fontFamily = fonts[0].replace(/\"|\'/g, '');
                }
            } else {
                fontFamily = 'Arial';
            }
            return fontFamily;
        }

        // Parse the formula to excel formula.
        private static _parseToExcelFormula(formula: string, isDate: boolean): string {
            var func = formula.substring(1, formula.indexOf('(')).toLowerCase(),
                format: string;

            switch (func) {
                case 'ceiling':
                case 'floor':
                    formula = formula.substring(0, formula.lastIndexOf(')')) + ', 1)';
                    break;
                case 'text':
                    format = formula.substring(formula.lastIndexOf(','), formula.lastIndexOf('\"'));
					format = wijmo.xlsx.Workbook._parseCellFormat(format.substring(format.lastIndexOf('\"') + 1), isDate);
                    formula = formula.substring(0, formula.lastIndexOf(',') + 1) + '\"' + format + '\")';
                    break;
            }
            return formula;
        }

        // Parse the excel formula to flexsheet formula.
        private static _parseToFlexSheetFormula(excelFormula: string): string {
            var match = excelFormula.substring(1).match(/\W+(\w+)\(/),
                func: string,
                funcName: string,
                funcIndex: number,
                value: any,
                format: string;

            if (match && match.length === 2) {
                funcName = match[1];
            } else {
                funcName = excelFormula.substring(1, excelFormula.indexOf('('));
            }
            funcIndex = excelFormula.indexOf(funcName);

            switch (funcName.toLowerCase()) {
                case 'ceiling':
                case 'floor':
                    excelFormula = excelFormula.substring(0, excelFormula.lastIndexOf(',')) + ')';
                    break;
                case 'text':
                    func = excelFormula.substring(funcIndex);
                    format = func.substring(func.indexOf('\"'), func.lastIndexOf('\"'));
                    // Fix TFS issue 122648
                    format = format.substring(format.lastIndexOf('\"') + 1);
                    if (format.indexOf('0') > -1) {
                        // For processing number format
                        value = 0;
                    } else {
                        // For processing string format 
                        value = '';
                    }
					format = wijmo.xlsx.Workbook._parseExcelFormat({
                        value: value,
                        style: {
                            format: format
                        }
                    });
                    format = format.replace(/m+/g, (str: string) => {
                        return str.toUpperCase();
                    }).replace(/Y+/g, (str: string) => {
                        return str.toLowerCase();
                    }).replace(/M+:?|:?M+/gi, (str: string) => {
                        if (str.indexOf(':') > -1) {
                            return str.toLowerCase();
                        } else {
                            return str;
                        }
                    });
                    excelFormula = excelFormula.substring(0, funcIndex) + func.substring(0, func.indexOf('\"') + 1) + format + '\")';
                    break;
            }

            return excelFormula;
        }

        // Gets the column setting, include width, visible, format and alignment
        private static _getColumnSetting(column: Column, defaultWidth: number): wijmo.xlsx.IWorkbookColumn {
            var width = column.renderWidth;

            width = width || defaultWidth;

            return {
                autoWidth: true,
                width: width,
                visible: column.visible,
                style: {
					format: column.format ? wijmo.xlsx.Workbook._parseCellFormat(column.format, column.dataType === DataType.Date) : '',
					hAlign: wijmo.xlsx.Workbook._parseStringToHAlign(this._toExcelHAlign(column.getAlignment()))
                }
            };
        }

        // Parse the CSS alignment to excel hAlign.
        private static _toExcelHAlign(value: string): string {
            value = value ? value.trim().toLowerCase() : value;
            if (!value)
                return value;

            if (value.indexOf('center') > -1) {
                return 'center';
            }

            if (value.indexOf('right') > -1 || value.indexOf('end') > -1) {
                return 'right';
            }

            if (value.indexOf('justify') > -1) {
                return 'justify';
            }

            return 'left';
        }

        // gets column count for specific row
        private static _getColumnCount(sheetData: any[]): number {
            var columnCount = 0,
				currentColCnt = 0,
                data: any[];

            for (var i = 0; i < sheetData.length; i++) {
				data = sheetData[i] && sheetData[i].cells ? sheetData[i].cells : [];
				if (data && data.length > 0) {
					currentColCnt = data.length;
					if (isInt(data[currentColCnt - 1].colSpan) && data[currentColCnt - 1].colSpan > 1) {
						currentColCnt = currentColCnt + data[currentColCnt - 1].colSpan - 1 
					}
					if (currentColCnt > columnCount) {
						columnCount = currentColCnt;
					}
                }
            }

            return columnCount;
        }

		// gets row count for specified sheet
		private static _getRowCount(sheetData: any[], columnCnt: number): number {
			var rowCount = sheetData.length,
				rowIndex = rowCount - 1,
				colIndex = 0,
				lastRow: any,
				data: any[],
				cell: any;

			for (; colIndex < columnCnt; colIndex++) {
				rowLoop:
				for (; rowIndex >= 0; rowIndex--) {
					lastRow = sheetData[rowIndex];
					data = lastRow && lastRow.cells ? lastRow.cells : [];
					cell = data[colIndex];
					if (cell && ((cell.value != null && cell.value !== '') || (isInt(cell.rowSpan) && cell.rowSpan > 1))) {
						if (isInt(cell.rowSpan) && cell.rowSpan > 1 && (rowIndex + cell.rowSpan > rowCount)) {
							rowCount = rowIndex + cell.rowSpan;
						} 
						break rowLoop;
					}
				}
			}

			return rowCount;
		}

        // convert the column index to alphabet
        private static _numAlpha(i: number): string {
            var t = Math.floor(i / 26) - 1; return (t > -1 ? this._numAlpha(t) : '') + String.fromCharCode(65 + i % 26);
        }

        // Get DataType for value of the specific excel item
        private static _getItemType(item: any): DataType {
            if (item === undefined || item === null
                || item.value === undefined || item.value === null
                || isNaN(item.value)) {
                return undefined;
            }

            return getType(item.value);
        }

        // Set column definition for the Flex Grid
        private static _setColumn(columns: IColumn[], columnIndex: number, item: any) {
            var dataType,
                format,
                hAlign,
                columnSetting = columns[columnIndex];

            if (!columnSetting) {
                columns[columnIndex] = {
                    dataType: this._getItemType(item),
					format: wijmo.xlsx.Workbook._parseExcelFormat(item),
                    hAlign: ''
                };
            } else {
                dataType = this._getItemType(item);
                if (columnSetting.dataType !== dataType &&
                    columnSetting.dataType === wijmo.DataType.Boolean && dataType !== wijmo.DataType.Boolean) {
                    columnSetting.dataType = dataType;
                }

				if (item && item.value != null && item.value !== '') {
					format = wijmo.xlsx.Workbook._parseExcelFormat(item);
					if (format && columnSetting.format !== format && format !== 'General') {
						columnSetting.format = format;
					}
				}

                if (item && item.style && item.style.hAlign) {
					hAlign = wijmo.xlsx.Workbook._parseHAlignToString(asEnum(item.style.hAlign, wijmo.xlsx.HAlign));
                }
                if (!hAlign && dataType === wijmo.DataType.Number) {
                    hAlign = 'right';
                }
                columnSetting.hAlign = hAlign;
            }
        }

        // Get value from the excel cell item
        private static _getItemValue(item: any): any {
            if (item === undefined || item === null
                || item.value === undefined || item.value === null) {
                return undefined;
            }

            var val = item.value;

            if (isNumber(val) && isNaN(val)) {
                return '';
            } else if (val instanceof Date && isNaN(val.getTime())) {
                return '';
            } else {
                return val;
            }
        }

        // Get style of cell.
        private static _getCellStyle(panel: GridPanel, fakeCell: HTMLDivElement, r: number, c: number): any {
            // create element to get styles
            var theStyle: CSSStyleDeclaration;

            try {
                this._resetCellStyle(fakeCell);
                // get styles for any panel, row, column
                panel.grid.cellFactory.updateCell(panel, r, c, fakeCell);
            } catch (ex) {
                return undefined;
            }

            theStyle = window.getComputedStyle(fakeCell);
            return theStyle;
        }

        // reset the style of the cell
        private static _resetCellStyle(cell: HTMLElement) {
            var hasOwnProperty = Object.prototype.hasOwnProperty;
            for (var stylePro in cell.style) {
                if (hasOwnProperty.call(cell.style, stylePro) && typeof cell.style[stylePro] === 'string' && isNaN(+stylePro)) {
                    cell.style[stylePro] = '';
                }
            }
        }

        // extends the source hash to destination hash
        private static _extend(dst: any, src: any) {
            for (var key in src) {
                var value = src[key];
                if (isObject(value) && dst[key]) {
                    copy(dst[key], value); // copy sub-objects
                } else {
                    dst[key] = value; // assign values
                }
            }
            return dst;
        }

        // check the parent group collapsed setting.
        private static _checkParentCollapsed(groupCollapsedSettings: any, groupLevel: number): boolean {
            var parentCollapsed = false;
            Object.keys(groupCollapsedSettings).forEach((key) => {
                if (groupCollapsedSettings[key] === true && parentCollapsed === false && !isNaN(groupLevel) && +key < groupLevel) {
                    parentCollapsed = true;
                }
            });
            return parentCollapsed;
        }
    }
	/*
	 * Column Definition for Flex Grid
	 */
    interface IColumn {
		/**
		 * Data Type
		 */
        dataType: wijmo.DataType;
		/** 
		 * Format
		 */
        format: string;
		/**
		 * Horizontal alignment
		 */
        hAlign: string;
    }
	/**
     * Defines additional worksheet properties that can be accesses via the dynamic <b>wj_sheetInfo</b> property
     * of the @see:FlexGrid instance.
	 */
    export interface IExtendedSheetInfo {
		/**
		 * The sheet name.
		 */
        name: string;
		/**
		 * Sheet visibility.
		 */
        visible: boolean;
		/**
		 * Styled cells in the sheet
		 */
        styledCells: any;
		/**
		 * Merged ranges in the sheet
		 */
        mergedRanges: any;
		/**
		 * Contains an array of font names used in the sheet.
		 */
        fonts: string[];
    }
	/*
	 * FlexGrid Xlsx export options
	 */
    export interface IFlexGridXlsxExportOptions {
		/*
		 * Indicates whether to include column headers as a first row in the generated xlsx file.
		 */
        includeColumnHeader?: boolean;
		/**
		 * Indicates whether to include column headers as first rows in the generated xlsx file.
		 */
        includeColumnHeaders?: boolean;
		/**
		 * Indicates whether to include row headers as first columns in the generated xlsx file.
		 */
        includeRowHeaders?: boolean;
		/*
		 * Indicates whether cells styling should be kept in the generated xlsx file.
		 */
        needGetCellStyle?: boolean;
		/**
		 * Indicates whether cells styling should be included in the generated xlsx file.
		 */
        includeCellStyles?: boolean;
		/**
		 * Index of the active sheet in the xlsx file.
		 */
        activeWorksheet?: number;
    }
	/*
	 * FlexGrid Xlsx import options
	 */
    export interface IFlexGridXlsxImportOptions {
		/**
		 * Indicates whether to treat the first xlsx file row as containing column header names.
		 */
        includeColumnHeader: boolean;
    }
	/**
	 * FlexGrid Xlsx conversion options
	 */
	export interface IFlexGridXlsxOptions {
		/**
		 * The index of the sheet in the workbook.
		 */
		sheetIndex?: number;
		/**
		 * The name of the sheet.
		 */
		sheetName?: string;
		/**
		 * The visible of the sheet.
		 */
		sheetVisible?: boolean;
		/**
		 * Indicates whether to include column headers as first rows in the generated xlsx file.
		 */
		includeColumnHeaders?: boolean; //import-export
		/**
		 * Indicates whether to include column headers as first rows in the generated xlsx file.
		 */
		includeRowHeaders?: boolean; //import-export
		/**
		 * Indicates whether cells styling should be included in the generated xlsx file.
		 */
		includeCellStyles?: boolean; //export only
		/**
		 * Index or name of the active sheet in the xlsx file.
		 */
		activeWorksheet?: any; // [[ changed type to 'any'; could be an index or a name ]]; export only
	}
}
