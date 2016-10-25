﻿/*
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
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// initialize groupHeaderFormat
wijmo.culture.FlexGrid = {
    groupHeaderFormat: '{name}: <b>{value} </b>({count:n0} items)'
};

var wijmo;
(function (wijmo) {
    /**
    * Defines the @see:FlexGrid control and associated classes.
    *
    * The example below creates a @see:FlexGrid control and binds it to a
    * 'data' array. The grid has three columns, specified by explicitly
    * populating the grid's @see:columns array.
    *
    * @fiddle:6GB66
    */
    (function (grid) {
        'use strict';

        /**
        * Specifies constants that specify the visibility of row and column headers.
        */
        (function (HeadersVisibility) {
            /** No header cells are displayed. */
            HeadersVisibility[HeadersVisibility["None"] = 0] = "None";

            /** Only column header cells are displayed. */
            HeadersVisibility[HeadersVisibility["Column"] = 1] = "Column";

            /** Only row header cells are displayed. */
            HeadersVisibility[HeadersVisibility["Row"] = 2] = "Row";

            /** Both column and row header cells are displayed. */
            HeadersVisibility[HeadersVisibility["All"] = 3] = "All";
        })(grid.HeadersVisibility || (grid.HeadersVisibility = {}));
        var HeadersVisibility = grid.HeadersVisibility;

        /**
        * The @see:FlexGrid control provides a powerful and flexible way to
        * display and edit data in a tabular format.
        *
        * The @see:FlexGrid control is a full-featured grid, providing all the
        * features you are used to including several selection modes, sorting,
        * column reordering, grouping, filtering, editing, custom cells,
        * XAML-style star-sizing columns, row and column virtualization, etc.
        */
        var FlexGrid = (function (_super) {
            __extends(FlexGrid, _super);
            /**
            * Initializes a new instance of a @see:FlexGrid control.
            *
            * @param element The DOM element that will host the control, or a selector for the host element (e.g. '#theCtrl').
            * @param options JavaScript object containing initialization data for the control.
            */
            function FlexGrid(element, options) {
                var _this = this;
                _super.call(this, element, null, true);
                this._szClient = new wijmo.Size(0, 0);
                /*private*/ this._ptScrl = new wijmo.Point(0, 0);
                /*private*/ this._rtl = false;
                // property storage
                this._autoGenCols = true;
                this._autoClipboard = true;
                this._readOnly = false;
                this._indent = 14;
                this._autoSizeMode = grid.AutoSizeMode.Both;
                this._hdrVis = 3 /* All */;
                this._alSorting = true;
                this._alAddNew = false;
                this._alDelete = false;
                this._alResizing = 1 /* Columns */;
                this._alDragging = 1 /* Columns */;
                this._alMerging = 0 /* None */;
                this._ssHdr = 0 /* None */;
                this._shSort = true;
                this._shGroups = true;
                this._shAlt = true;
                this._deferResizing = false;
                //#endregion
                //--------------------------------------------------------------------------
                //#region ** events
                /**
                * Occurs after the grid has been bound to a new items source.
                */
                this.itemsSourceChanged = new wijmo.Event();
                /**
                * Occurs after the control has scrolled.
                */
                this.scrollPositionChanged = new wijmo.Event();
                /**
                * Occurs before selection changes.
                */
                this.selectionChanging = new wijmo.Event();
                /**
                * Occurs after selection changes.
                */
                this.selectionChanged = new wijmo.Event();
                /**
                * Occurs before the grid rows are bound to items in the data source.
                */
                this.loadingRows = new wijmo.Event();
                /**
                * Occurs after the grid rows have been bound to items in the data source.
                */
                this.loadedRows = new wijmo.Event();
                /**
                * Occurs as columns are resized.
                */
                this.resizingColumn = new wijmo.Event();
                /**
                * Occurs when the user finishes resizing a column.
                */
                this.resizedColumn = new wijmo.Event();
                /**
                * Occurs before the user auto-sizes a column by double-clicking the
                * right edge of a column header cell.
                */
                this.autoSizingColumn = new wijmo.Event();
                /**
                * Occurs after the user auto-sizes a column by double-clicking the
                * right edge of a column header cell.
                */
                this.autoSizedColumn = new wijmo.Event();
                /**
                * Occurs when the user starts dragging a column.
                */
                this.draggingColumn = new wijmo.Event();
                /**
                * Occurs when the user finishes dragging a column.
                */
                this.draggedColumn = new wijmo.Event();
                /**
                * Occurs as rows are resized.
                */
                this.resizingRow = new wijmo.Event();
                /**
                * Occurs when the user finishes resizing rows.
                */
                this.resizedRow = new wijmo.Event();
                /**
                * Occurs before the user auto-sizes a row by double-clicking the
                * bottom edge of a row header cell.
                */
                this.autoSizingRow = new wijmo.Event();
                /**
                * Occurs after the user auto-sizes a row by double-clicking the
                * bottom edge of a row header cell.
                */
                this.autoSizedRow = new wijmo.Event();
                /**
                * Occurs when the user starts dragging a row.
                */
                this.draggingRow = new wijmo.Event();
                /**
                * Occurs when the user finishes dragging a row.
                */
                this.draggedRow = new wijmo.Event();
                /**
                * Occurs when a group is about to be expanded or collapsed.
                */
                this.groupCollapsedChanging = new wijmo.Event();
                /**
                * Occurs after a group has been expanded or collapsed.
                */
                this.groupCollapsedChanged = new wijmo.Event();
                /**
                * Occurs before the user applies a sort by clicking on a column header.
                */
                this.sortingColumn = new wijmo.Event();
                /**
                * Occurs after the user applies a sort by clicking on a column header.
                */
                this.sortedColumn = new wijmo.Event();
                /**
                * Occurs before a cell enters edit mode.
                */
                this.beginningEdit = new wijmo.Event();
                /**
                * Occurs when an editor cell is created and before it becomes active.
                */
                this.prepareCellForEdit = new wijmo.Event();
                /**
                * Occurs when a cell edit is ending.
                */
                this.cellEditEnding = new wijmo.Event();
                /**
                * Occurs when a cell edit has been committed or canceled.
                */
                this.cellEditEnded = new wijmo.Event();
                /**
                * Occurs when a row edit is ending, before the changes are committed or canceled.
                */
                this.rowEditEnding = new wijmo.Event();
                /**
                * Occurs when a row edit has been committed or canceled.
                */
                this.rowEditEnded = new wijmo.Event();
                /**
                * Occurs when the user creates a new item by editing the new row template
                * (see the @see:allowAddNew property).
                *
                * The event handler may customize the content of the new item or cancel
                * the new item creation.
                */
                this.rowAdded = new wijmo.Event();
                /**
                * Occurs when the user is deleting a selected row by pressing the Delete
                * key (see the @see:allowDelete property).
                *
                * The event handler may cancel the row deletion.
                */
                this.deletingRow = new wijmo.Event();
                /**
                * Occurs when the user is copying the selection content to the
                * clipboard by pressing one of the clipboard shortcut keys
                * (see the @see:autoClipboard property).
                *
                * The event handler may cancel the copy operation.
                */
                this.copying = new wijmo.Event();
                /**
                * Occurs after the user has copied the selection content to the
                * clipboard by pressing one of the clipboard shortcut keys
                * (see the @see:autoClipboard property).
                */
                this.copied = new wijmo.Event();
                /**
                * Occurs when the user is pasting content from the clipboard
                * by pressing one of the clipboard shortcut keys
                * (see the @see:autoClipboard property).
                *
                * The event handler may cancel the copy operation.
                */
                this.pasting = new wijmo.Event();
                /**
                * Occurs after the user has pasted content from the
                * clipboard by pressing one of the clipboard shortcut keys
                * (see the @see:autoClipboard property).
                */
                this.pasted = new wijmo.Event();
                /**
                * Occurs when the user is pasting content from the clipboard
                * into a cell (see the @see:autoClipboard property).
                *
                * The event handler may cancel the copy operation.
                */
                this.pastingCell = new wijmo.Event();
                /**
                * Occurs after the user has pasted content from the
                * clipboard into a cell (see the @see:autoClipboard property).
                */
                this.pastedCell = new wijmo.Event();
                /**
                * Occurs when an element representing a cell has been created.
                *
                * This event can be used to format cells for display. It is similar
                * in purpose to the @see:itemFormatter property, but has the advantage
                * of allowing multiple independent handlers.
                *
                * For example, this code removes the 'wj-wrap' class from cells in
                * group rows:
                *
                * <pre>flex.formatItem.addHandler(function (s, e) {
                *   if (flex.rows[e.row] instanceof wijmo.grid.GroupRow) {
                *     wijmo.removeClass(e.cell, 'wj-wrap');
                *   }
                * });</pre>
                */
                this.formatItem = new wijmo.Event();
                /**
                * Occurs when the grid finishes creating/updating the elements that
                * make up the current view.
                *
                * The grid updates the view in response to several actions, including:
                *
                * <ul>
                * <li>refreshing the grid or its data source,</li>
                * <li>adding, removing, or changing rows or columns,</li>
                * <li>resizing or scrolling the grid,</li>
                * <li>changing the selection.</li>
                * </ul>
                */
                this.updatedView = new wijmo.Event();
                // sort converter used to sort mapped columns by display value
                this._mappedColumns = null;
                var e = this.hostElement, csh = getComputedStyle(e), csb = getComputedStyle(document.body), defRowHei = parseInt(csh.fontSize && wijmo.contains(document.body, e) ? csh.fontSize : csb.fontSize) * 2;

                // make 100% sure we have a default row height!
                if (defRowHei <= 0 || isNaN(defRowHei)) {
                    defRowHei = 28;
                }

                // and make sure we have no border radius if the browser is IE
                // (because in IE, rounded borders **kill** scrolling perf!!!!)
                // NOTE: detect with userAgent because Edge Browser doesn't have documentMode,
                //       but still slows down with rounded borders...
                //if ('documentMode' in document) {
                if (navigator.userAgent.match(/MSIE |Trident\/|Edge\//)) {
                    e.style.borderRadius = '0px';
                }

                this.deferUpdate(function () {
                    // create row and column collections
                    // (need these to create the child GridPanels!)
                    _this._rows = new grid.RowCollection(_this, defRowHei);
                    _this._cols = new grid.ColumnCollection(_this, defRowHei * 4);
                    _this._hdrRows = new grid.RowCollection(_this, defRowHei);
                    _this._hdrCols = new grid.ColumnCollection(_this, Math.round(defRowHei * 1.25));

                    // add row and column headers
                    _this._hdrRows.push(new grid.Row());
                    _this._hdrCols.push(new grid.Column());
                    _this._hdrCols[0].align = 'center';

                    // create child elements (GridPanels)
                    _this._createChildren();

                    // initialize control
                    _this._cf = new grid.CellFactory();
                    _this._keyHdl = new grid._KeyboardHandler(_this);
                    _this._mouseHdl = new grid._MouseHandler(_this);
                    _this._edtHdl = new grid._EditHandler(_this);
                    _this._selHdl = new grid._SelectionHandler(_this);
                    _this._addHdl = new grid._AddNewHandler(_this);
                    _this._mrgMgr = new grid.MergeManager(_this);
                    _this._bndSortConverter = _this._sortConverter.bind(_this);

                    // apply options after grid has been initialized
                    _this.initialize(options);
                });

                // update content when user scrolls the control
                this.addEventListener(this._root, 'scroll', function (e) {
                    if (_this._raf) {
                        cancelAnimationFrame(_this._raf);
                    }
                    _this._raf = requestAnimationFrame(function () {
                        // finish editing when scrolling
                        // (or edits will be lost when the grid refreshes)
                        _this.finishEditing();

                        // update grid's scrollPosition to match element's
                        if (_this._updateScrollPosition()) {
                            _this._updateContent(true);
                        }

                        // done
                        _this._raf = null;
                    });
                });

                // implement sticky headers that remain visible when the user scrolls the control
                this.addEventListener(window, 'scroll', function (e) {
                    _this._updateStickyHeaders();
                });
            }
            // reset rcBounds when window is resized
            // (even if the control size didn't change, because it may have moved: TFS 112961)
            FlexGrid.prototype._handleResize = function () {
                _super.prototype._handleResize.call(this);
                this._rcBounds = null;
            };

            Object.defineProperty(FlexGrid.prototype, "headersVisibility", {
                //--------------------------------------------------------------------------
                //#region ** object model
                /**
                * Gets or sets a value that determines whether the row and column headers
                * are visible.
                */
                get: function () {
                    return this._hdrVis;
                },
                set: function (value) {
                    if (value != this._hdrVis) {
                        this._hdrVis = wijmo.asEnum(value, HeadersVisibility);
                        this.invalidate();
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(FlexGrid.prototype, "stickyHeaders", {
                /**
                * Gets or sets a value that determines whether column headers should remain
                * when the user scrolls the window.
                */
                get: function () {
                    return this._stickyHdr;
                },
                set: function (value) {
                    if (value != this._stickyHdr) {
                        wijmo.removeClass(this._eTL, FlexGrid._WJS_STICKY);
                        wijmo.removeClass(this._eCHdr, FlexGrid._WJS_STICKY);
                        this._stickyHdr = wijmo.asBoolean(value);
                        this.invalidate();
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(FlexGrid.prototype, "autoGenerateColumns", {
                /**
                * Gets or sets a value that determines whether the grid should generate columns
                * automatically based on the @see:itemsSource.
                */
                get: function () {
                    return this._autoGenCols;
                },
                set: function (value) {
                    this._autoGenCols = wijmo.asBoolean(value);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(FlexGrid.prototype, "autoClipboard", {
                /**
                * Gets or sets a value that determines whether the grid should handle
                * clipboard shortcuts.
                *
                * The clipboard shortcuts are as follows:
                *
                * <dl class="dl-horizontal">
                *   <dt>ctrl+C, ctrl+Ins</dt>    <dd>Copy grid selection to clipboard.</dd>
                *   <dt>ctrl+V, shift+Ins</dt>   <dd>Paste clipboard text to grid selection.</dd>
                * </dl>
                *
                * Only visible rows and columns are included in clipboard operations.
                *
                * Read-only cells are not affected by paste operations.
                */
                get: function () {
                    return this._autoClipboard;
                },
                set: function (value) {
                    this._autoClipboard = wijmo.asBoolean(value);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(FlexGrid.prototype, "columnLayout", {
                /**
                * Gets or sets a JSON string that defines the current column layout.
                *
                * The column layout string represents an array with the columns and their
                * properties. It can be used to persist column layouts defined by users so
                * they are preserved across sessions, and can also be used to implement undo/redo
                * functionality in applications that allow users to modify the column layout.
                *
                * The column layout string does not include <b>dataMap</b> properties, because
                * data maps are not serializable.
                */
                get: function () {
                    var props = FlexGrid._getSerializableProperties(grid.Column), defs = new grid.Column(), proxyCols = [];

                    for (var i = 0; i < this.columns.length; i++) {
                        var col = this.columns[i], proxyCol = {};
                        for (var j = 0; j < props.length; j++) {
                            var prop = props[j], value = col[prop];
                            if (value != defs[prop] && wijmo.isPrimitive(value) && prop != 'size') {
                                proxyCol[prop] = value;
                            }
                        }
                        proxyCols.push(proxyCol);
                    }

                    // return JSON string with proxy columns
                    return JSON.stringify({ columns: proxyCols });
                },
                set: function (value) {
                    var colOptions = JSON.parse(wijmo.asString(value));
                    if (!colOptions || colOptions.columns == null) {
                        throw 'Invalid columnLayout data.';
                    }
                    this.columns.clear();
                    this.initialize(colOptions);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(FlexGrid.prototype, "isReadOnly", {
                /**
                * Gets or sets a value that determines whether the user can edit
                * grid cells by typing into them.
                */
                get: function () {
                    return this._readOnly;
                },
                set: function (value) {
                    if (value != this._readOnly) {
                        this._readOnly = wijmo.asBoolean(value);
                        this.finishEditing();
                        this.invalidate(true); // TFS 79965
                        this._addHdl.updateNewRowTemplate(); // TFS 97544
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(FlexGrid.prototype, "imeEnabled", {
                /**
                * Gets or sets a value that determines whether the grid should support
                * Input Method Editors (IME) while not in edit mode.
                *
                * This property is relevant only for sites/applications in Japanese,
                * Chinese, Korean, and other languages that require IME support.
                */
                get: function () {
                    return this._imeHdl != null;
                },
                set: function (value) {
                    if (value != this.imeEnabled) {
                        if (this._imeHdl) {
                            this._imeHdl.dispose();
                            this._imeHdl = null;
                        }
                        if (value) {
                            this._imeHdl = new grid._ImeHandler(this);
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(FlexGrid.prototype, "allowResizing", {
                /**
                * Gets or sets a value that determines whether users may resize
                * rows and/or columns with the mouse.
                *
                * If resizing is enabled, users can resize columns by dragging
                * the right edge of column header cells, or rows by dragging the
                * bottom edge of row header cells.
                *
                * Users may also double-click the edge of the header cells to
                * automatically resize rows and columns to fit their content.
                * The auto-size behavior can be customized using the @see:autoSizeMode
                * property.
                */
                get: function () {
                    return this._alResizing;
                },
                set: function (value) {
                    this._alResizing = wijmo.asEnum(value, grid.AllowResizing);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(FlexGrid.prototype, "deferResizing", {
                /**
                * Gets or sets a value that determines whether row and column resizing
                * should be deferred until the user releases the mouse button.
                *
                * By default, @see:deferResizing is set to false, causing rows and columns
                * to be resized as the user drags the mouse. Setting this property to true
                * causes the grid to show a resizing marker and to resize the row or column
                * only when the user releases the mouse button.
                */
                get: function () {
                    return this._deferResizing;
                },
                set: function (value) {
                    this._deferResizing = wijmo.asBoolean(value);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(FlexGrid.prototype, "autoSizeMode", {
                /**
                * Gets or sets which cells should be taken into account when auto-sizing a
                * row or column.
                *
                * This property controls what happens when users double-click the edge of
                * a column header.
                *
                * By default, the grid will automatically set the column width based on the
                * content of the header and data cells in the column. This property allows
                * you to change that to include only the headers or only the data.
                */
                get: function () {
                    return this._autoSizeMode;
                },
                set: function (value) {
                    this._autoSizeMode = wijmo.asEnum(value, grid.AutoSizeMode);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(FlexGrid.prototype, "allowSorting", {
                /**
                * Gets or sets a value that determines whether users are allowed to sort columns
                * by clicking the column header cells.
                */
                get: function () {
                    return this._alSorting;
                },
                set: function (value) {
                    this._alSorting = wijmo.asBoolean(value);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(FlexGrid.prototype, "allowAddNew", {
                /**
                * Gets or sets a value that indicates whether the grid should provide a new row
                * template so users can add items to the source collection.
                *
                * The new row template will not be displayed if the @see:isReadOnly property
                * is set to true.
                */
                get: function () {
                    return this._alAddNew;
                },
                set: function (value) {
                    if (value != this._alAddNew) {
                        this._alAddNew = wijmo.asBoolean(value);
                        this._addHdl.updateNewRowTemplate();
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(FlexGrid.prototype, "allowDelete", {
                /**
                * Gets or sets a value that indicates whether the grid should delete
                * selected rows when the user presses the Delete key.
                *
                * Selected rows will not be deleted if the @see:isReadOnly property
                * is set to true.
                */
                get: function () {
                    return this._alDelete;
                },
                set: function (value) {
                    if (value != this._alDelete) {
                        this._alDelete = wijmo.asBoolean(value);
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(FlexGrid.prototype, "allowMerging", {
                /**
                * Gets or sets which parts of the grid provide cell merging.
                */
                get: function () {
                    return this._alMerging;
                },
                set: function (value) {
                    if (value != this._alMerging) {
                        this._alMerging = wijmo.asEnum(value, grid.AllowMerging);
                        this.invalidate();
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(FlexGrid.prototype, "showSelectedHeaders", {
                /**
                * Gets or sets a value that indicates whether the grid should
                * add class names to indicate selected header cells.
                */
                get: function () {
                    return this._ssHdr;
                },
                set: function (value) {
                    if (value != this._ssHdr) {
                        this._ssHdr = wijmo.asEnum(value, HeadersVisibility);
                        this.invalidate();
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(FlexGrid.prototype, "showMarquee", {
                /**
                * Gets or sets a value that indicates whether the grid should
                * display a marquee element around the current selection.
                */
                get: function () {
                    return !this._eMarquee.style.display;
                },
                set: function (value) {
                    if (value != this.showMarquee) {
                        var s = this._eMarquee.style;
                        s.visibility = 'collapse'; // show only after positioning
                        s.display = wijmo.asBoolean(value) ? '' : 'none';
                        this.invalidate();
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(FlexGrid.prototype, "showSort", {
                /**
                * Gets or sets a value that determines whether the grid should display
                * sort indicators in the column headers.
                *
                * Sorting is controlled by the @see:sortDescriptions property of the
                * @see:ICollectionView object used as a the grid's @see:itemsSource.
                */
                get: function () {
                    return this._shSort;
                },
                set: function (value) {
                    if (value != this._shSort) {
                        this._shSort = wijmo.asBoolean(value);
                        this.invalidate();
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(FlexGrid.prototype, "showGroups", {
                /**
                * Gets or sets a value that determines whether the grid should insert group
                * rows to delimit data groups.
                *
                * Data groups are created by modifying the @see:groupDescriptions property of the
                * @see:ICollectionView object used as a the grid's @see:itemsSource.
                */
                get: function () {
                    return this._shGroups;
                },
                set: function (value) {
                    if (value != this._shGroups) {
                        this._shGroups = wijmo.asBoolean(value);
                        this._bindGrid(false);
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(FlexGrid.prototype, "showAlternatingRows", {
                /**
                * Gets or sets a value that determines whether the grid should add the 'wj-alt'
                * class to cells in alternating rows.
                *
                * Setting this property to false disables alternate row styles without any
                * changes to the CSS.
                */
                get: function () {
                    return this._shAlt;
                },
                set: function (value) {
                    if (value != this._shAlt) {
                        this._shAlt = wijmo.asBoolean(value);
                        this.invalidate();
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(FlexGrid.prototype, "groupHeaderFormat", {
                /**
                * Gets or sets the format string used to create the group header content.
                *
                * The string may contain any text, plus the following replacement strings:
                * <ul>
                *   <li><b>{name}</b>: The name of the property being grouped on.</li>
                *   <li><b>{value}</b>: The value of the property being grouped on.</li>
                *   <li><b>{level}</b>: The group level.</li>
                *   <li><b>{count}</b>: The total number of items in this group.</li>
                * </ul>
                *
                * If a column is bound to the grouping property, the column header is used
                * to replace the {name} parameter, and the column's format and data maps are
                * used to calculate the {value} parameter. If no column is available, the
                * group information is used instead.
                *
                * You may add invisible columns bound to the group properties in order to
                * customize the formatting of the group header cells.
                *
                * The default value for this property is
                * '{name}: &lt;b&gt;{value}&lt;/b&gt;({count:n0} items)',
                * which creates group headers similar to
                * 'Country: <b>UK</b> (12 items)' or 'Country: <b>Japan</b> (8 items)'.
                */
                get: function () {
                    return this._gHdrFmt;
                },
                set: function (value) {
                    if (value != this._gHdrFmt) {
                        this._gHdrFmt = wijmo.asString(value);
                        this._bindGrid(false);
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(FlexGrid.prototype, "allowDragging", {
                /**
                * Gets or sets a value that determines whether users are allowed to drag
                * rows and/or columns with the mouse.
                */
                get: function () {
                    return this._alDragging;
                },
                set: function (value) {
                    if (value != this._alDragging) {
                        this._alDragging = wijmo.asEnum(value, grid.AllowDragging);
                        this.invalidate(); // to re-create row/col headers
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(FlexGrid.prototype, "itemsSource", {
                /**
                * Gets or sets the array or @see:ICollectionView that contains items shown on the grid.
                */
                get: function () {
                    return this._items;
                },
                set: function (value) {
                    if (value != this._items) {
                        // unbind current collection view
                        if (this._cv) {
                            var cv = wijmo.tryCast(this._cv, wijmo.collections.CollectionView);
                            if (cv && cv.sortConverter == this._bndSortConverter) {
                                cv.sortConverter = null;
                            }
                            this._cv.currentChanged.removeHandler(this._cvCurrentChanged, this);
                            this._cv.collectionChanged.removeHandler(this._cvCollectionChanged, this);
                            this._cv = null;
                        }

                        // save new data source and collection view
                        this._items = value;
                        this._cv = this._getCollectionView(value);
                        this._lastCount = 0;

                        // bind new collection view
                        if (this._cv) {
                            this._cv.currentChanged.addHandler(this._cvCurrentChanged, this);
                            this._cv.collectionChanged.addHandler(this._cvCollectionChanged, this);
                            var cv = wijmo.tryCast(this._cv, wijmo.collections.CollectionView);
                            if (cv && !cv.sortConverter) {
                                cv.sortConverter = this._bndSortConverter;
                            }
                        }

                        // bind grid
                        this._bindGrid(true);

                        // raise itemsSourceChanged
                        this.onItemsSourceChanged();
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(FlexGrid.prototype, "collectionView", {
                /**
                * Gets the @see:ICollectionView that contains the grid data.
                */
                get: function () {
                    return this._cv;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(FlexGrid.prototype, "childItemsPath", {
                /**
                * Gets or sets the name of the property (or properties) used to generate
                * child rows in hierarchical grids.
                *
                * Set this property to a string to specify the name of the property that
                * contains an item's child items (e.g. <code>'items'</code>).
                *
                * If items at different levels child items with different names, then
                * set this property to an array containing the names of the properties
                * that contain child items et each level
                * (e.g. <code>[ 'accounts', 'checks', 'earnings' ]</code>).
                *
                * @fiddle:t0ncmjwp
                */
                get: function () {
                    return this._childItemsPath;
                },
                set: function (value) {
                    if (value != this._childItemsPath) {
                        wijmo.assert(value == null || wijmo.isArray(value) || wijmo.isString(value), 'childItemsPath should be an array or a string.');
                        this._childItemsPath = value;
                        this._bindGrid(true);
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(FlexGrid.prototype, "cells", {
                /**
                * Gets the @see:GridPanel that contains the data cells.
                */
                get: function () {
                    return this._gpCells;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(FlexGrid.prototype, "columnHeaders", {
                /**
                * Gets the @see:GridPanel that contains the column header cells.
                */
                get: function () {
                    return this._gpCHdr;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(FlexGrid.prototype, "rowHeaders", {
                /**
                * Gets the @see:GridPanel that contains the row header cells.
                */
                get: function () {
                    return this._gpRHdr;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(FlexGrid.prototype, "topLeftCells", {
                /**
                * Gets the @see:GridPanel that contains the top left cells.
                */
                get: function () {
                    return this._gpTL;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(FlexGrid.prototype, "rows", {
                /**
                * Gets the grid's row collection.
                */
                get: function () {
                    return this._rows;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(FlexGrid.prototype, "columns", {
                /**
                * Gets the grid's column collection.
                */
                get: function () {
                    return this._cols;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(FlexGrid.prototype, "frozenRows", {
                /**
                * Gets or sets the number of frozen rows.
                *
                * Frozen rows do not scroll, but the cells they contain
                * may be selected and edited.
                */
                get: function () {
                    return this.rows.frozen;
                },
                set: function (value) {
                    this.rows.frozen = value;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(FlexGrid.prototype, "frozenColumns", {
                /**
                * Gets or sets the number of frozen columns.
                *
                * Frozen columns do not scroll, but the cells they contain
                * may be selected and edited.
                */
                get: function () {
                    return this.columns.frozen;
                },
                set: function (value) {
                    this.columns.frozen = value;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(FlexGrid.prototype, "sortRowIndex", {
                /**
                * Gets or sets the index of row in the column header panel that
                * shows and changes the current sort.
                *
                * This property is set to null by default, causing the last row
                * in the @see:columnHeaders panel to act as the sort row.
                */
                get: function () {
                    return this._sortRowIndex;
                },
                set: function (value) {
                    if (value != this._sortRowIndex) {
                        this._sortRowIndex = wijmo.asNumber(value, true);
                        this.invalidate();
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(FlexGrid.prototype, "scrollPosition", {
                /**
                * Gets or sets a @see:Point that represents the value of the grid's scrollbars.
                */
                get: function () {
                    return this._ptScrl.clone();
                },
                set: function (pt) {
                    var root = this._root, left = -pt.x;

                    // IE/Chrome/FF handle scrollLeft differently under RTL:
                    // Chrome reverses direction, FF uses negative values, IE does the right thing (nothing)
                    if (this._rtl) {
                        switch (FlexGrid._getRtlMode()) {
                            case 'rev':
                                left = (root.scrollWidth - root.clientWidth) + pt.x;
                                break;
                            case 'neg':
                                left = pt.x;
                                break;
                            default:
                                left = -pt.x;
                                break;
                        }
                    }

                    //if (root.scrollLeft != left) {
                    root.scrollLeft = left;

                    //}
                    //if (root.scrollTop != -pt.y) {
                    root.scrollTop = -pt.y;
                    //}
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(FlexGrid.prototype, "clientSize", {
                /**
                * Gets the client size of the control (control size minus headers and scrollbars).
                */
                get: function () {
                    return this._szClient;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(FlexGrid.prototype, "controlRect", {
                /**
                * Gets the bounding rectangle of the control in page coordinates.
                */
                get: function () {
                    if (!this._rcBounds) {
                        this._rcBounds = wijmo.getElementRect(this._root);
                    }
                    return this._rcBounds;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(FlexGrid.prototype, "scrollSize", {
                /**
                * Gets the size of the grid content in pixels.
                */
                get: function () {
                    return new wijmo.Size(this._gpCells.width, this._heightBrowser);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(FlexGrid.prototype, "viewRange", {
                /**
                * Gets the range of cells currently in view.
                */
                get: function () {
                    return this._gpCells.viewRange;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(FlexGrid.prototype, "cellFactory", {
                /**
                * Gets or sets the @see:CellFactory that creates and updates cells for this grid.
                */
                get: function () {
                    return this._cf;
                },
                set: function (value) {
                    if (value != this._cf) {
                        this._cf = wijmo.asType(value, grid.CellFactory, false);
                        this.invalidate();
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(FlexGrid.prototype, "itemFormatter", {
                /**
                * Gets or sets a formatter function used to customize cells on this grid.
                *
                * The formatter function can add any content to any cell. It provides
                * complete flexibility over the appearance and behavior of grid cells.
                *
                * If specified, the function should take four parameters: the @see:GridPanel
                * that contains the cell, the row and column indices of the cell, and the
                * HTML element that represents the cell. The function will typically change
                * the <b>innerHTML</b> property of the cell element.
                *
                * For example:
                * <pre>
                * flex.itemFormatter = function(panel, r, c, cell) {
                *   if (panel.cellType == CellType.Cell) {
                *     // draw sparklines in the cell
                *     var col = panel.columns[c];
                *     if (col.name == 'sparklines') {
                *       cell.innerHTML = getSparklike(panel, r, c);
                *     }
                *   }
                * }
                * </pre>
                *
                * Note that the FlexGrid recycles cells, so if your @see:itemFormatter
                * modifies the cell's style attributes, you must make sure that it resets
                * these attributes for cells that should not have them. For example:
                *
                * <pre>
                * flex.itemFormatter = function(panel, r, c, cell) {
                *   // reset attributes we are about to customize
                *   var s = cell.style;
                *   s.color = '';
                *   s.backgroundColor = '';
                *   // customize color and backgroundColor attributes for this cell
                *   ...
                * }
                * </pre>
                *
                * If you have a scenario where multiple clients may want to customize the
                * grid rendering (for example when creating directives or re-usable libraries),
                * consider using the @see:formatItem event instead. The event allows multiple
                * clients to attach their own handlers.
                */
                get: function () {
                    return this._itemFormatter;
                },
                set: function (value) {
                    if (value != this._itemFormatter) {
                        this._itemFormatter = wijmo.asFunction(value);
                        this.invalidate();
                    }
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Gets the value stored in a cell in the scrollable area of the grid.
            *
            * @param r Index of the row that contains the cell.
            * @param c Index of the column that contains the cell.
            * @param formatted Whether to format the value for display.
            */
            FlexGrid.prototype.getCellData = function (r, c, formatted) {
                return this.cells.getCellData(r, c, formatted);
            };

            /**
            * Gets a the bounds of a cell element in viewport coordinates.
            *
            * This method returns the bounds of cells in the @see:cells
            * panel (scrollable data cells). To get the bounds of cells
            * in other panels, use the @see:getCellBoundingRect method
            * in the appropriate @see:GridPanel object.
            *
            * The returned value is a @see:Rect object which contains the
            * position and dimensions of the cell in viewport coordinates.
            * The viewport coordinates are the same used by the
            * <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element.getBoundingClientRect">getBoundingClientRect</a>
            * method.
            *
            * @param r Index of the row that contains the cell.
            * @param c Index of the column that contains the cell.
            * @param raw Whether to return the rectangle in raw panel coordinates as opposed to viewport coordinates.
            */
            FlexGrid.prototype.getCellBoundingRect = function (r, c, raw) {
                return this.cells.getCellBoundingRect(r, c, raw);
            };

            /**
            * Sets the value of a cell in the scrollable area of the grid.
            *
            * @param r Index of the row that contains the cell.
            * @param c Index, name, or binding of the column that contains the cell.
            * @param value Value to store in the cell.
            * @param coerce Whether to change the value automatically to match the column's data type.
            * @param invalidate Whether to invalidate the grid to show the change.
            * @return True if the value was stored successfully, false otherwise.
            */
            FlexGrid.prototype.setCellData = function (r, c, value, coerce, invalidate) {
                if (typeof coerce === "undefined") { coerce = true; }
                if (typeof invalidate === "undefined") { invalidate = true; }
                return this.cells.setCellData(r, c, value, coerce, invalidate);
            };

            /**
            * Gets a @see:HitTestInfo object with information about a given point.
            *
            * For example:
            *
            * <pre>// hit test a point when the user clicks on the grid
            * flex.hostElement.addEventListener('click', function (e) {
            *   var ht = flex.hitTest(e.pageX, e.pageY);
            *   console.log('you clicked a cell of type "' +
            *     wijmo.grid.CellType[ht.cellType] + '".');
            * });</pre>
            *
            * @param pt @see:Point to investigate, in page coordinates, or a MouseEvent object, or x coordinate of the point.
            * @param y Y coordinate of the point in page coordinates (if the first parameter is a number).
            * @return A @see:HitTestInfo object with information about the point.
            */
            FlexGrid.prototype.hitTest = function (pt, y) {
                if (wijmo.isNumber(pt) && wijmo.isNumber(y)) {
                    pt = new wijmo.Point(pt, y);
                }
                return new grid.HitTestInfo(this, pt);
            };

            /**
            * Gets the content of a @see:CellRange as a string suitable for
            * copying to the clipboard.
            *
            * Hidden rows and columns are not included in the clip string.
            *
            * @param rng @see:CellRange to copy. If omitted, the current selection is used.
            */
            FlexGrid.prototype.getClipString = function (rng) {
                var clipString = '', firstRow = true, firstCell = true;

                // scan rows
                rng = rng ? wijmo.asType(rng, grid.CellRange) : this.selection;
                for (var r = rng.topRow; r <= rng.bottomRow; r++) {
                    // skip invisible, add separator
                    if (!this.rows[r].isVisible)
                        continue;
                    if (!firstRow)
                        clipString += '\n';
                    firstRow = false;

                    for (var c = rng.leftCol, firstCell = true; c <= rng.rightCol; c++) {
                        // skip invisible, add separator
                        if (!this.columns[c].isVisible)
                            continue;
                        if (!firstCell)
                            clipString += '\t';
                        firstCell = false;

                        // append cell
                        var cell = this.cells.getCellData(r, c, true).toString();
                        cell = cell.replace(/\t/g, ' ');
                        clipString += cell;
                    }
                }

                // done
                return clipString;
            };

            /**
            * Parses a string into rows and columns and applies the content to a given range.
            *
            * Hidden rows and columns are skipped.
            *
            * @param text Tab and newline delimited text to parse into the grid.
            * @param rng @see:CellRange to copy. If omitted, the current selection is used.
            */
            FlexGrid.prototype.setClipString = function (text, rng) {
                // get target range
                var autoRange = rng == null;
                rng = rng ? wijmo.asType(rng, grid.CellRange) : this.selection;

                // normalize text
                text = wijmo.asString(text).replace(/\r\n/g, '\n').replace(/\r/g, '\n');
                if (text && text[text.length - 1] == '\n') {
                    text = text.substring(0, text.length - 1);
                }
                if (autoRange && !rng.isSingleCell) {
                    text = this._expandClipString(text, rng);
                }

                // keep track of paste range to select later
                var rngPaste = new grid.CellRange(rng.topRow, rng.leftCol);

                // copy lines to rows
                this.beginUpdate();
                var row = rng.topRow, lines = text.split('\n'), e;
                for (var i = 0; i < lines.length && row < this.rows.length; i++, row++) {
                    // skip invisible row, keep clip line
                    if (!this.rows[row].isVisible) {
                        i--;
                        continue;
                    }

                    // copy cells to columns
                    var cells = lines[i].split('\t'), col = rng.leftCol;
                    for (var j = 0; j < cells.length && col < this.columns.length; j++, col++) {
                        // skip invisible column, keep clip cell
                        if (!this.columns[col].isVisible) {
                            j--;
                            continue;
                        }

                        // assign cell
                        if (!this.columns[col].isReadOnly && !this.rows[row].isReadOnly) {
                            // raise events so user can cancel the paste
                            e = new grid.CellRangeEventArgs(this.cells, new grid.CellRange(row, col), cells[j]);
                            if (this.onPastingCell(e)) {
                                if (this.cells.setCellData(row, col, e.data)) {
                                    this.onPastedCell(e);
                                }
                            }

                            // update paste range
                            rngPaste.row2 = Math.max(rngPaste.row2, row);
                            rngPaste.col2 = Math.max(rngPaste.col2, col);
                        }
                    }
                }
                this.endUpdate();

                // done, refresh view to update sorting/filtering
                if (this.collectionView) {
                    this.collectionView.refresh();
                }

                // select pasted range
                this.select(rngPaste);
            };

            // expand clip string to get Excel-like behavior
            FlexGrid.prototype._expandClipString = function (text, rng) {
                // sanity
                if (!text)
                    return text;

                // get clip string dimensions and cells
                var lines = text.split('\n'), srcRows = lines.length, srcCols = 0, rows = [];
                for (var r = 0; r < srcRows; r++) {
                    var cells = lines[r].split('\t');
                    rows.push(cells);
                    if (r > 1 && cells.length != srcCols)
                        return text;
                    srcCols = cells.length;
                }

                // expand if destination size is a multiple of source size (like Excel)
                var dstRows = rng.rowSpan, dstCols = rng.columnSpan;
                if (dstRows > 1 || dstCols > 1) {
                    if (dstRows == 1)
                        dstRows = srcRows;
                    if (dstCols == 1)
                        dstCols = srcCols;
                    if (dstCols % srcCols == 0 && dstRows % srcRows == 0) {
                        text = '';
                        for (var r = 0; r < dstRows; r++) {
                            for (var c = 0; c < dstCols; c++) {
                                if (r > 0 && c == 0)
                                    text += '\n';
                                if (c > 0)
                                    text += '\t';
                                text += rows[r % srcRows][c % srcCols];
                            }
                        }
                    }
                }

                // done
                return text;
            };

            /**
            * Overridden to set the focus to the grid without scrolling the whole grid into view.
            */
            FlexGrid.prototype.focus = function () {
                if (!this.containsFocus()) {
                    // if the grid is visible, use inner element _efocus
                    var rc = this.hostElement.getBoundingClientRect();
                    if (rc.bottom > 0 && rc.right > 0 && rc.top < innerHeight && rc.left < innerWidth) {
                        wijmo.setCss(this._eFocus, {
                            top: Math.max(0, -rc.top),
                            left: Math.max(0, -rc.left)
                        });
                        this._eFocus.focus();
                        wijmo.setCss(this._eFocus, {
                            top: -10,
                            left: -10
                        });
                        return;
                    }

                    // the grid is off the screen, try focusing on the selected cell
                    var cell = this.cells.hostElement.querySelector('.wj-cell.wj-state-selected');
                    if (cell) {
                        cell.focus();
                        return;
                    }

                    // no current cell, focus on the grid's host element as usual
                    _super.prototype.focus.call(this);
                }
            };

            /**
            * Checks whether this control contains the focused element.
            */
            FlexGrid.prototype.containsFocus = function () {
                var lbx = this._edtHdl._lbx;
                return _super.prototype.containsFocus.call(this) || (lbx && lbx.containsFocus());
            };

            /**
            * Disposes of the control by removing its association with the host element.
            */
            FlexGrid.prototype.dispose = function () {
                // cancel any pending edits, close drop-down list
                this.finishEditing(true);

                // remove itemsSource so it doesn't have references to our
                // change event handlers that would prevent the grid from being
                // garbage-collected.
                this.itemsSource = null;

                // remove any pending animation frame requests
                if (this._raf) {
                    cancelAnimationFrame(this._raf);
                }

                // allow base class
                _super.prototype.dispose.call(this);
            };

            /**
            * Refreshes the grid display.
            *
            * @param fullUpdate Whether to update the grid layout and content, or just the content.
            */
            FlexGrid.prototype.refresh = function (fullUpdate) {
                if (typeof fullUpdate === "undefined") { fullUpdate = true; }
                // always call base class to handle being/endUpdate logic
                _super.prototype.refresh.call(this, fullUpdate);

                // close any open drop-downs
                this.finishEditing();

                // on full updates, get missing column types based on bindings and
                // update scroll position in case the control just became visible
                // and IE wrongly reset the element's scroll position to the origin
                // http://wijmo.c1.grapecity.com/topic/flexgrid-refresh-issue-when-hidden/
                if (fullUpdate) {
                    this._updateColumnTypes();
                    this.scrollPosition = this._ptScrl; // update element to match grid
                    //this._updateScrollPosition(); // update grid to match element
                }

                // go refresh the cells
                this.refreshCells(fullUpdate);
            };

            /**
            * Refreshes the grid display.
            *
            * @param fullUpdate Whether to update the grid layout and content, or just the content.
            * @param recycle Whether to recycle existing elements.
            * @param state Whether to keep existing elements and update their state.
            */
            FlexGrid.prototype.refreshCells = function (fullUpdate, recycle, state) {
                if (!this.isUpdating) {
                    if (fullUpdate) {
                        this._updateLayout();
                    } else {
                        this._updateContent(recycle, state);
                    }
                }
            };

            /**
            * Resizes a column to fit its content.
            *
            * @param c Index of the column to resize.
            * @param header Whether the column index refers to a regular or a header row.
            * @param extra Extra spacing, in pixels.
            */
            FlexGrid.prototype.autoSizeColumn = function (c, header, extra) {
                if (typeof header === "undefined") { header = false; }
                if (typeof extra === "undefined") { extra = 4; }
                this.autoSizeColumns(c, c, header, extra);
            };

            /**
            * Resizes a range of columns to fit their content.
            *
            * The grid will always measure all rows in the current view range, plus up to 2,000 rows
            * not currently in view. If the grid contains a large amount of data (say 50,000 rows),
            * then not all rows will be measured since that could potentially take a long time.
            *
            * @param firstColumn Index of the first column to resize (defaults to the first column).
            * @param lastColumn Index of the last column to resize (defaults to the last column).
            * @param header Whether the column indices refer to regular or header columns.
            * @param extra Extra spacing, in pixels.
            */
            FlexGrid.prototype.autoSizeColumns = function (firstColumn, lastColumn, header, extra) {
                var _this = this;
                if (typeof header === "undefined") { header = false; }
                if (typeof extra === "undefined") { extra = 4; }
                var max = 0, pHdr = header ? this.topLeftCells : this.columnHeaders, pCells = header ? this.rowHeaders : this.cells, rowRange = this.viewRange, text, lastText;
                firstColumn = firstColumn == null ? 0 : wijmo.asInt(firstColumn);
                lastColumn = lastColumn == null ? pCells.columns.length - 1 : wijmo.asInt(lastColumn);
                wijmo.asBoolean(header);
                wijmo.asNumber(extra);

                // choose row range to measure
                // (viewrange by default, everything if we have only a few items)
                rowRange.row = Math.max(0, rowRange.row - 1000);
                rowRange.row2 = Math.min(rowRange.row2 + 1000, this.rows.length - 1);

                this.deferUpdate(function () {
                    // create element to measure content
                    var eMeasure = document.createElement('div');
                    eMeasure.setAttribute(FlexGrid._WJS_MEASURE, 'true');
                    eMeasure.style.visibility = 'hidden';
                    _this.hostElement.appendChild(eMeasure);

                    for (var c = firstColumn; c <= lastColumn && c > -1 && c < pCells.columns.length; c++) {
                        max = 0;

                        // headers
                        if (_this.autoSizeMode & 1 /* Headers */) {
                            for (var r = 0; r < pHdr.rows.length; r++) {
                                if (pHdr.rows[r].isVisible) {
                                    var w = _this._getDesiredWidth(pHdr, r, c, eMeasure);
                                    max = Math.max(max, w);
                                }
                            }
                        }

                        // cells
                        if (_this.autoSizeMode & 2 /* Cells */) {
                            lastText = null;
                            for (var r = rowRange.row; r <= rowRange.row2 && r > -1 && r < pCells.rows.length; r++) {
                                if (pCells.rows[r].isVisible) {
                                    if (!header && c == pCells.columns.firstVisibleIndex && pCells.rows.maxGroupLevel > -1) {
                                        // ignore last text for outline cells
                                        var w = _this._getDesiredWidth(pCells, r, c, eMeasure);
                                        max = Math.max(max, w);
                                    } else {
                                        // regular cells
                                        text = pCells.getCellData(r, c, true);
                                        if (text != lastText) {
                                            lastText = text;
                                            var w = _this._getDesiredWidth(pCells, r, c, eMeasure);
                                            max = Math.max(max, w);
                                        }
                                    }
                                }
                            }
                        }

                        // set size
                        pCells.columns[c].width = max + extra + 2;
                    }

                    // done with measuring element
                    _this.hostElement.removeChild(eMeasure);
                });
            };

            /**
            * Resizes a row to fit its content.
            *
            * @param r Index of the row to resize.
            * @param header Whether the row index refers to a regular or a header row.
            * @param extra Extra spacing, in pixels.
            */
            FlexGrid.prototype.autoSizeRow = function (r, header, extra) {
                if (typeof header === "undefined") { header = false; }
                if (typeof extra === "undefined") { extra = 0; }
                this.autoSizeRows(r, r, header, extra);
            };

            /**
            * Resizes a range of rows to fit their content.
            *
            * @param firstRow Index of the first row to resize.
            * @param lastRow Index of the last row to resize.
            * @param header Whether the row indices refer to regular or header rows.
            * @param extra Extra spacing, in pixels.
            */
            FlexGrid.prototype.autoSizeRows = function (firstRow, lastRow, header, extra) {
                var _this = this;
                if (typeof header === "undefined") { header = false; }
                if (typeof extra === "undefined") { extra = 0; }
                var max = 0, pHdr = header ? this.topLeftCells : this.rowHeaders, pCells = header ? this.columnHeaders : this.cells;
                header = wijmo.asBoolean(header);
                extra = wijmo.asNumber(extra);
                firstRow = firstRow == null ? 0 : wijmo.asInt(firstRow);
                lastRow = lastRow == null ? pCells.rows.length - 1 : wijmo.asInt(lastRow);

                this.deferUpdate(function () {
                    // create element to measure content
                    var eMeasure = document.createElement('div');
                    eMeasure.setAttribute(FlexGrid._WJS_MEASURE, 'true');
                    eMeasure.style.visibility = 'hidden';
                    _this.hostElement.appendChild(eMeasure);

                    for (var r = firstRow; r <= lastRow && r > -1 && r < pCells.rows.length; r++) {
                        max = 0;

                        // headers
                        if (_this.autoSizeMode & 1 /* Headers */) {
                            for (var c = 0; c < pHdr.columns.length; c++) {
                                if (pHdr.columns[c].renderSize > 0) {
                                    var h = _this._getDesiredHeight(pHdr, r, c, eMeasure);
                                    max = Math.max(max, h);
                                }
                            }
                        }

                        // cells
                        if (_this.autoSizeMode & 2 /* Cells */) {
                            for (var c = 0; c < pCells.columns.length; c++) {
                                if (pCells.columns[c].renderSize > 0) {
                                    var h = _this._getDesiredHeight(pCells, r, c, eMeasure);
                                    max = Math.max(max, h);
                                }
                            }
                        }

                        // update size
                        pCells.rows[r].height = max + extra;
                    }

                    // done with measuring element
                    _this.hostElement.removeChild(eMeasure);
                });
            };

            Object.defineProperty(FlexGrid.prototype, "treeIndent", {
                /**
                * Gets or sets the indent used to offset row groups of different levels.
                */
                get: function () {
                    return this._indent;
                },
                set: function (value) {
                    if (value != this._indent) {
                        this._indent = wijmo.asNumber(value, false, true);
                        this.columns.onCollectionChanged();
                    }
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Collapses all the group rows to a given level.
            *
            * @param level Maximum group level to show.
            */
            FlexGrid.prototype.collapseGroupsToLevel = function (level) {
                // finish editing first (this may change the collection)
                if (this.finishEditing()) {
                    // set collapsed state for all rows in the grid
                    var rows = this.rows;
                    rows.deferUpdate(function () {
                        for (var r = 0; r < rows.length; r++) {
                            var gr = wijmo.tryCast(rows[r], grid.GroupRow);
                            if (gr) {
                                gr.isCollapsed = gr.level >= level;
                            }
                        }
                    });
                }
            };

            Object.defineProperty(FlexGrid.prototype, "selectionMode", {
                /**
                * Gets or sets the current selection mode.
                */
                get: function () {
                    return this._selHdl.selectionMode;
                },
                set: function (value) {
                    if (value != this.selectionMode) {
                        this._selHdl.selectionMode = wijmo.asEnum(value, grid.SelectionMode);
                        this.invalidate();
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(FlexGrid.prototype, "selection", {
                /**
                * Gets or sets the current selection.
                */
                get: function () {
                    return this._selHdl.selection.clone();
                },
                set: function (value) {
                    this._selHdl.selection = value;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Selects a cell range and optionally scrolls it into view.
            *
            * @param rng Range to select.
            * @param show Whether to scroll the new selection into view.
            */
            FlexGrid.prototype.select = function (rng, show) {
                if (typeof show === "undefined") { show = true; }
                this._selHdl.select(rng, show);
            };

            /**
            * Gets a @see:SelectedState value that indicates the selected state of a cell.
            *
            * @param r Row index of the cell to inspect.
            * @param c Column index of the cell to inspect.
            */
            FlexGrid.prototype.getSelectedState = function (r, c) {
                return this.cells.getSelectedState(r, c, null);
            };

            Object.defineProperty(FlexGrid.prototype, "selectedRows", {
                /**
                * Gets or sets an array containing the rows that are currently selected.
                *
                * Note: this property can be read in all selection modes, but it can be
                * set only when @see:selectionMode is set to <b>SelectionMode.ListBox</b>.
                */
                get: function () {
                    var rows = [];
                    if (this.selectionMode == 5 /* ListBox */) {
                        for (var i = 0; i < this.rows.length; i++) {
                            if (this.rows[i].isSelected) {
                                rows.push(this.rows[i]);
                            }
                        }
                    } else if (this.rows.length) {
                        var sel = this.selection;
                        for (var i = sel.topRow; i > -1 && i <= sel.bottomRow; i++) {
                            rows.push(this.rows[i]);
                        }
                    }
                    return rows;
                },
                set: function (value) {
                    var _this = this;
                    wijmo.assert(this.selectionMode == 5 /* ListBox */, 'This property can be set only in ListBox mode.');
                    value = wijmo.asArray(value);
                    this.deferUpdate(function () {
                        for (var i = 0, first = true; i < _this.rows.length; i++) {
                            var row = _this.rows[i], sel = value && value.indexOf(row) > -1;
                            if (sel && first) {
                                first = false;
                                _this.select(i, _this.selection.col);
                            }
                            row.isSelected = sel;
                        }
                    });
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(FlexGrid.prototype, "selectedItems", {
                /**
                * Gets or sets an array containing the data items that are currently selected.
                *
                * Note: this property can be read in all selection modes, but it can be
                * set only when @see:selectionMode is set to <b>SelectionMode.ListBox</b>.
                */
                get: function () {
                    var items = this.selectedRows;
                    for (var i = 0; i < items.length; i++) {
                        items[i] = items[i].dataItem;
                    }
                    return items;
                },
                set: function (value) {
                    var _this = this;
                    wijmo.assert(this.selectionMode == 5 /* ListBox */, 'This property can be set only in ListBox mode.');
                    value = wijmo.asArray(value);
                    this.deferUpdate(function () {
                        for (var i = 0, first = true; i < _this.rows.length; i++) {
                            var row = _this.rows[i], sel = value && value.indexOf(row.dataItem) > -1;
                            if (sel && first) {
                                first = false;
                                _this.select(i, _this.selection.col);
                            }
                            row.isSelected = sel;
                        }
                    });
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Scrolls the grid to bring a specific cell into view.
            *
            * @param r Index of the row to scroll into view.
            * @param c Index of the column to scroll into view.
            * @return True if the grid scrolled.
            */
            FlexGrid.prototype.scrollIntoView = function (r, c) {
                // make sure our dimensions are set and up-to-date
                if (this._maxOffsetY == null) {
                    this._updateLayout();
                }

                // and go to work
                var sp = this.scrollPosition, wid = this._szClient.width, hei = this._szClient.height, ptFrz = this.cells._getFrozenPos();

                // scroll to show row
                r = wijmo.asInt(r);
                if (r > -1 && r < this._rows.length && r >= this._rows.frozen) {
                    var row = this._rows[r], pct = this.cells.height > hei ? Math.round(row.pos / (this.cells.height - hei) * 100) / 100 : 0, offsetY = Math.round(this._maxOffsetY * pct), rpos = row.pos - offsetY;
                    if (row.pos + row.renderSize > -sp.y + hei) {
                        sp.y = Math.max(-rpos, hei - (row.pos + row.renderSize));
                    }
                    if (rpos - ptFrz.y < -sp.y) {
                        sp.y = -(rpos - ptFrz.y);
                    }
                }

                // scroll to show column
                c = wijmo.asInt(c);
                if (c > -1 && c < this._cols.length && c >= this._cols.frozen) {
                    var col = this._cols[c];
                    if (col.pos + col.renderSize > -sp.x + wid) {
                        sp.x = Math.max(-col.pos, wid - (col.pos + col.renderSize));
                    }
                    if (col.pos - ptFrz.x < -sp.x) {
                        sp.x = -(col.pos - ptFrz.x);
                    }
                }

                // update scroll position
                if (!sp.equals(this.scrollPosition)) {
                    this.scrollPosition = sp;
                    return true;
                }

                // no change
                return false;
            };

            /**
            * Checks whether a given CellRange is valid for this grid's row and column collections.
            *
            * @param rng Range to check.
            */
            FlexGrid.prototype.isRangeValid = function (rng) {
                return rng.isValid && rng.bottomRow < this.rows.length && rng.rightCol < this.columns.length;
            };

            /**
            * Starts editing a given cell.
            *
            * Editing in the @see:FlexGrid is similar to editing in Excel:
            * Pressing F2 or double-clicking a cell puts the grid in <b>full-edit</b> mode.
            * In this mode, the cell editor remains active until the user presses Enter, Tab,
            * or Escape, or until he moves the selection with the mouse. In full-edit mode,
            * pressing the cursor keys does not cause the grid to exit edit mode.
            *
            * Typing text directly into a cell puts the grid in <b>quick-edit mode</b>.
            * In this mode, the cell editor remains active until the user presses Enter,
            * Tab, or Escape, or any arrow keys.
            *
            * Full-edit mode is normally used to make changes to existing values.
            * Quick-edit mode is normally used for entering new data quickly.
            *
            * While editing, the user can toggle between full and quick modes by
            * pressing the F2 key.
            *
            * @param fullEdit Whether to stay in edit mode when the user presses the cursor keys. Defaults to false.
            * @param r Index of the row to be edited. Defaults to the currently selected row.
            * @param c Index of the column to be edited. Defaults to the currently selected column.
            * @param focus Whether to give the editor the focus when editing starts. Defaults to true.
            * @return True if the edit operation started successfully.
            */
            FlexGrid.prototype.startEditing = function (fullEdit, r, c, focus) {
                if (typeof fullEdit === "undefined") { fullEdit = true; }
                return this._edtHdl.startEditing(fullEdit, r, c, focus);
            };

            /**
            * Commits any pending edits and exits edit mode.
            *
            * @param cancel Whether pending edits should be canceled or committed.
            * @return True if the edit operation finished successfully.
            */
            FlexGrid.prototype.finishEditing = function (cancel) {
                if (typeof cancel === "undefined") { cancel = false; }
                return this._edtHdl.finishEditing(cancel);
            };

            Object.defineProperty(FlexGrid.prototype, "activeEditor", {
                /**
                * Gets the <b>HTMLInputElement</b> that represents the cell editor currently active.
                */
                get: function () {
                    return this._edtHdl.activeEditor;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(FlexGrid.prototype, "editRange", {
                /**
                * Gets a @see:CellRange that identifies the cell currently being edited.
                */
                get: function () {
                    return this._edtHdl.editRange;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(FlexGrid.prototype, "mergeManager", {
                /**
                * Gets or sets the @see:MergeManager object responsible for determining how cells
                * should be merged.
                */
                get: function () {
                    return this._mrgMgr;
                },
                set: function (value) {
                    if (value != this._mrgMgr) {
                        this._mrgMgr = wijmo.asType(value, grid.MergeManager, true);
                        this.invalidate();
                    }
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Gets a @see:CellRange that specifies the merged extent of a cell
            * in a @see:GridPanel.
            *
            * @param p The @see:GridPanel that contains the range.
            * @param r Index of the row that contains the cell.
            * @param c Index of the column that contains the cell.
            * @param clip Whether to clip the merged range to the grid's current view range.
            * @return A @see:CellRange that specifies the merged range, or null if the cell is not merged.
            */
            FlexGrid.prototype.getMergedRange = function (p, r, c, clip) {
                if (typeof clip === "undefined") { clip = true; }
                return this._mrgMgr ? this._mrgMgr.getMergedRange(p, r, c, clip) : null;
            };

            /**
            * Raises the @see:itemsSourceChanged event.
            */
            FlexGrid.prototype.onItemsSourceChanged = function (e) {
                this.itemsSourceChanged.raise(this, e);
            };

            /**
            * Raises the @see:scrollPositionChanged event.
            */
            FlexGrid.prototype.onScrollPositionChanged = function (e) {
                this.scrollPositionChanged.raise(this, e);
            };

            /**
            * Raises the @see:selectionChanging event.
            *
            * @param e @see:CellRangeEventArgs that contains the event data.
            * @return True if the event was not canceled.
            */
            FlexGrid.prototype.onSelectionChanging = function (e) {
                this.selectionChanging.raise(this, e);
                return !e.cancel;
            };

            /**
            * Raises the @see:selectionChanged event.
            *
            * @param e @see:CellRangeEventArgs that contains the event data.
            * @return True if the event was not canceled.
            */
            FlexGrid.prototype.onSelectionChanged = function (e) {
                this.selectionChanged.raise(this, e);
                return !e.cancel;
            };

            /**
            * Raises the @see:loadingRows event.
            */
            FlexGrid.prototype.onLoadingRows = function (e) {
                this.loadingRows.raise(this, e);
                return !e.cancel;
            };

            /**
            * Raises the @see:loadedRows event.
            */
            FlexGrid.prototype.onLoadedRows = function (e) {
                this.loadedRows.raise(this, e);
            };

            /**
            * Raises the @see:resizingColumn event.
            *
            * @param e @see:CellRangeEventArgs that contains the event data.
            * @return True if the event was not canceled.
            */
            FlexGrid.prototype.onResizingColumn = function (e) {
                this.resizingColumn.raise(this, e);
                return !e.cancel;
            };

            /**
            * Raises the @see:resizedColumn event.
            *
            * @param e @see:CellRangeEventArgs that contains the event data.
            */
            FlexGrid.prototype.onResizedColumn = function (e) {
                this.resizedColumn.raise(this, e);
            };

            /**
            * Raises the @see:autoSizingColumn event.
            *
            * @param e @see:CellRangeEventArgs that contains the event data.
            */
            FlexGrid.prototype.onAutoSizingColumn = function (e) {
                this.autoSizingColumn.raise(this, e);
                return !e.cancel;
            };

            /**
            * Raises the @see:autoSizedColumn event.
            *
            * @param e @see:CellRangeEventArgs that contains the event data.
            */
            FlexGrid.prototype.onAutoSizedColumn = function (e) {
                this.autoSizedColumn.raise(this, e);
            };

            /**
            * Raises the @see:draggingColumn event.
            *
            * @param e @see:CellRangeEventArgs that contains the event data.
            * @return True if the event was not canceled.
            */
            FlexGrid.prototype.onDraggingColumn = function (e) {
                this.draggingColumn.raise(this, e);
                return !e.cancel;
            };

            /**
            * Raises the @see:draggedColumn event.
            *
            * @param e @see:CellRangeEventArgs that contains the event data.
            */
            FlexGrid.prototype.onDraggedColumn = function (e) {
                this.draggedColumn.raise(this, e);
            };

            /**
            * Raises the @see:resizingRow event.
            *
            * @param e @see:CellRangeEventArgs that contains the event data.
            * @return True if the event was not canceled.
            */
            FlexGrid.prototype.onResizingRow = function (e) {
                this.resizingRow.raise(this, e);
                return !e.cancel;
            };

            /**
            * Raises the @see:resizedRow event.
            *
            * @param e @see:CellRangeEventArgs that contains the event data.
            */
            FlexGrid.prototype.onResizedRow = function (e) {
                this.resizedRow.raise(this, e);
            };

            /**
            * Raises the @see:autoSizingRow event.
            *
            * @param e @see:CellRangeEventArgs that contains the event data.
            */
            FlexGrid.prototype.onAutoSizingRow = function (e) {
                this.autoSizingRow.raise(this, e);
                return !e.cancel;
            };

            /**
            * Raises the @see:autoSizedRow event.
            *
            * @param e @see:CellRangeEventArgs that contains the event data.
            */
            FlexGrid.prototype.onAutoSizedRow = function (e) {
                this.autoSizedRow.raise(this, e);
            };

            /**
            * Raises the @see:draggingRow event.
            *
            * @param e @see:CellRangeEventArgs that contains the event data.
            * @return True if the event was not canceled.
            */
            FlexGrid.prototype.onDraggingRow = function (e) {
                this.draggingRow.raise(this, e);
                return !e.cancel;
            };

            /**
            * Raises the @see:draggedRow event.
            *
            * @param e @see:CellRangeEventArgs that contains the event data.
            */
            FlexGrid.prototype.onDraggedRow = function (e) {
                this.draggedRow.raise(this, e);
            };

            /**
            * Raises the @see:groupCollapsedChanging event.
            *
            * @param e @see:CellRangeEventArgs that contains the event data.
            * @return True if the event was not canceled.
            */
            FlexGrid.prototype.onGroupCollapsedChanging = function (e) {
                this.groupCollapsedChanging.raise(this, e);
                return !e.cancel;
            };

            /**
            * Raises the @see:groupCollapsedChanged event.
            *
            * @param e @see:CellRangeEventArgs that contains the event data.
            */
            FlexGrid.prototype.onGroupCollapsedChanged = function (e) {
                this.groupCollapsedChanged.raise(this, e);
            };

            /**
            * Raises the @see:sortingColumn event.
            *
            * @param e @see:CellRangeEventArgs that contains the event data.
            * @return True if the event was not canceled.
            */
            FlexGrid.prototype.onSortingColumn = function (e) {
                this.sortingColumn.raise(this, e);
                return !e.cancel;
            };

            /**
            * Raises the @see:sortedColumn event.
            *
            * @param e @see:CellRangeEventArgs that contains the event data.
            */
            FlexGrid.prototype.onSortedColumn = function (e) {
                this.sortedColumn.raise(this, e);
            };

            /**
            * Raises the @see:beginningEdit event.
            *
            * @param e @see:CellRangeEventArgs that contains the event data.
            * @return True if the event was not canceled.
            */
            FlexGrid.prototype.onBeginningEdit = function (e) {
                this.beginningEdit.raise(this, e);
                return !e.cancel;
            };

            /**
            * Raises the @see:prepareCellForEdit event.
            *
            * @param e @see:CellRangeEventArgs that contains the event data.
            */
            FlexGrid.prototype.onPrepareCellForEdit = function (e) {
                this.prepareCellForEdit.raise(this, e);
            };

            /**
            * Raises the @see:cellEditEnding event.
            *
            * You can use this event to perform validation and prevent invalid edits.
            * For example, the code below prevents users from entering values that
            * do not contain the letter 'a'. The code demonstrates how you can obtain
            * the old and new values before the edits are applied.
            *
            * <pre>function cellEditEnding (sender, e) {
            *   // get old and new values
            *   var flex = sender,
            *   oldVal = flex.getCellData(e.row, e.col),
            *   newVal = flex.activeEditor.value;
            *   // cancel edits if newVal doesn't contain 'a'
            *   e.cancel = newVal.indexOf('a') &lt; 0;
            * }</pre>
            *
            * @param e @see:CellRangeEventArgs that contains the event data.
            * @return True if the event was not canceled.
            */
            FlexGrid.prototype.onCellEditEnding = function (e) {
                this.cellEditEnding.raise(this, e);
                return !e.cancel;
            };

            /**
            * Raises the @see:cellEditEnded event.
            *
            * @param e @see:CellRangeEventArgs that contains the event data.
            */
            FlexGrid.prototype.onCellEditEnded = function (e) {
                this.cellEditEnded.raise(this, e);
            };

            /**
            * Raises the @see:rowEditEnding event.
            *
            * @param e @see:CellRangeEventArgs that contains the event data.
            */
            FlexGrid.prototype.onRowEditEnding = function (e) {
                this.rowEditEnding.raise(this, e);
            };

            /**
            * Raises the @see:rowEditEnded event.
            *
            * @param e @see:CellRangeEventArgs that contains the event data.
            */
            FlexGrid.prototype.onRowEditEnded = function (e) {
                this.rowEditEnded.raise(this, e);
            };

            /**
            * Raises the @see:rowAdded event.
            *
            * @param e @see:CellRangeEventArgs that contains the event data.
            */
            FlexGrid.prototype.onRowAdded = function (e) {
                this.rowAdded.raise(this, e);
            };

            /**
            * Raises the @see:deletingRow event.
            *
            * @param e @see:CellRangeEventArgs that contains the event data.
            */
            FlexGrid.prototype.onDeletingRow = function (e) {
                this.deletingRow.raise(this, e);
            };

            /**
            * Raises the @see:copying event.
            *
            * @param e @see:CellRangeEventArgs that contains the event data.
            * @return True if the event was not canceled.
            */
            FlexGrid.prototype.onCopying = function (e) {
                this.copying.raise(this, e);
                return !e.cancel;
            };

            /**
            * Raises the @see:copied event.
            *
            * @param e @see:CellRangeEventArgs that contains the event data.
            */
            FlexGrid.prototype.onCopied = function (e) {
                this.copied.raise(this, e);
            };

            /**
            * Raises the @see:pasting event.
            *
            * @param e @see:CellRangeEventArgs that contains the event data.
            * @return True if the event was not canceled.
            */
            FlexGrid.prototype.onPasting = function (e) {
                this.pasting.raise(this, e);
                return !e.cancel;
            };

            /**
            * Raises the @see:pasted event.
            *
            * @param e @see:CellRangeEventArgs that contains the event data.
            */
            FlexGrid.prototype.onPasted = function (e) {
                this.pasted.raise(this, e);
            };

            /**
            * Raises the @see:pastingCell event.
            *
            * @param e @see:CellRangeEventArgs that contains the event data.
            * @return True if the event was not canceled.
            */
            FlexGrid.prototype.onPastingCell = function (e) {
                this.pastingCell.raise(this, e);
                return !e.cancel;
            };

            /**
            * Raises the @see:pastedCell event.
            *
            * @param e @see:CellRangeEventArgs that contains the event data.
            */
            FlexGrid.prototype.onPastedCell = function (e) {
                this.pastedCell.raise(this, e);
            };

            /**
            * Raises the @see:formatItem event.
            *
            * @param e @see:FormatItemEventArgs that contains the event data.
            */
            FlexGrid.prototype.onFormatItem = function (e) {
                this.formatItem.raise(this, e);
            };

            /**
            * Raises the @see:updatedView event.
            */
            FlexGrid.prototype.onUpdatedView = function (e) {
                this.updatedView.raise(this, e);
            };

            //#endregion
            //--------------------------------------------------------------------------
            //#region ** implementation
            // gets the collection view associated with an itemsSource object
            FlexGrid.prototype._getCollectionView = function (value) {
                return wijmo.asCollectionView(value);
            };

            // measures the desired width of a cell
            FlexGrid.prototype._getDesiredWidth = function (p, r, c, e) {
                var rng = this.getMergedRange(p, r, c);
                this.cellFactory.updateCell(p, r, c, e, rng);
                e.style.width = '';
                var w = e.offsetWidth;
                return rng && rng.columnSpan > 1 ? w / rng.columnSpan : w;
            };

            // measures the desired height of a cell
            FlexGrid.prototype._getDesiredHeight = function (p, r, c, e) {
                var rng = this.getMergedRange(p, r, c);
                this.cellFactory.updateCell(p, r, c, e, rng);
                e.style.height = '';
                var h = e.offsetHeight;
                return rng && rng.rowSpan > 1 ? h / rng.rowSpan : h;
            };

            // gets the index of the sort row, with special handling for nulls
            FlexGrid.prototype._getSortRowIndex = function () {
                return this._sortRowIndex != null ? this._sortRowIndex : this.columnHeaders.rows.length - 1;
            };

            FlexGrid.prototype._sortConverter = function (sd, item, value, init) {
                var col;

                // initialize mapped column dictionary
                if (init) {
                    this._mappedColumns = null;
                    if (this.collectionView) {
                        var sds = this.collectionView.sortDescriptions;
                        for (var i = 0; i < sds.length; i++) {
                            col = this.columns.getColumn(sds[i].property);
                            if (col && col.dataMap) {
                                if (!this._mappedColumns) {
                                    this._mappedColumns = {};
                                }
                                this._mappedColumns[col.binding] = col.dataMap;
                            }
                        }
                    }

                    // prioritize the column that was clicked
                    // (in case multiple columns map the same property)
                    if (this._mouseHdl._htDown && this._mouseHdl._htDown.col > -1) {
                        col = this.columns[this._mouseHdl._htDown.col];
                        if (this._mappedColumns && col.dataMap) {
                            this._mappedColumns[col.binding] = col.dataMap;
                        }
                    }
                }

                // convert value if we have a map
                if (this._mappedColumns) {
                    var map = this._mappedColumns[sd.property];
                    if (map) {
                        value = map.getDisplayValue(value);
                    }
                }

                // return the value to use for sorting
                return value;
            };

            // binds the grid to the current data source.
            FlexGrid.prototype._bindGrid = function (full) {
                var _this = this;
                this.deferUpdate(function () {
                    // do a full binding if we didn't have any data when we did it the first time
                    if (_this._lastCount == 0 && _this._cv && _this._cv.items && _this._cv.items.length) {
                        full = true;
                    }

                    // save selected items
                    var selItems = [];
                    if (_this.selectionMode == 5 /* ListBox */) {
                        for (var i = 0; i < _this.rows.length; i++) {
                            var row = _this.rows[i];
                            if (row.isSelected && row.dataItem) {
                                selItems.push(row.dataItem);
                            }
                        }
                    }

                    // update columns
                    if (full) {
                        _this.columns.deferUpdate(function () {
                            _this._bindColumns();
                        });
                    }

                    // update rows
                    _this.rows.deferUpdate(function () {
                        _this._bindRows();
                    });

                    // restore/initialize listbox selection
                    var cnt = 0;
                    if (selItems.length) {
                        for (var i = 0; i < _this.rows.length && cnt < selItems.length; i++) {
                            if (selItems.indexOf(_this.rows[i].dataItem) > -1) {
                                _this.rows[i].isSelected = true;
                                cnt++;
                            }
                        }
                    }

                    // failed to restore listbox selection by object, update by index
                    if (_this.selectionMode == 5 /* ListBox */ && cnt == 0) {
                        var sel = _this.selection;
                        for (var i = sel.topRow; i <= sel.bottomRow && i > -1 && i < _this.rows.length; i++) {
                            _this.rows[i].isSelected = true;
                        }
                    }

                    // save item count for next time
                    if (!_this._lastCount && _this._cv && _this._cv.items) {
                        _this._lastCount = _this._cv.items.length;
                    }
                });

                // update selection
                if (this.collectionView) {
                    this._cvCurrentChanged(this.collectionView, wijmo.EventArgs.empty);
                }
            };

            // updates grid rows to sync with data source
            FlexGrid.prototype._cvCollectionChanged = function (sender, e) {
                if (this.autoGenerateColumns && this.columns.length == 0) {
                    // bind rows and columns
                    this._bindGrid(true);
                } else {
                    // hierarchical binding: re-create all rows
                    if (this.childItemsPath) {
                        this._bindGrid(false);
                        return;
                    }

                    // synchronize grid with updated CollectionView
                    var index;
                    switch (e.action) {
                        case 2 /* Change */:
                            this.invalidate();
                            return;

                        case 0 /* Add */:
                            if (e.index == this.collectionView.items.length - 1) {
                                index = this.rows.length;
                                if (this.rows[index - 1] instanceof grid._NewRowTemplate) {
                                    index--;
                                }
                                this.rows.insert(index, new grid.Row(e.item));
                                return;
                            }
                            wijmo.assert(false, 'added item should be the last one.');
                            break;

                        case 1 /* Remove */:
                            var index = this._findRow(e.item);
                            if (index > -1) {
                                this.rows.removeAt(index);
                                this._cvCurrentChanged(sender, e);
                                return;
                            }
                            wijmo.assert(false, 'removed item not found in grid.');
                            break;
                    }

                    // reset (sort, new source, etc): re-create all rows
                    this._bindGrid(false);
                }
            };

            // update selection to sync with data source
            FlexGrid.prototype._cvCurrentChanged = function (sender, e) {
                if (this.collectionView) {
                    // get grid's current item
                    var sel = this.selection, item = sel.row > -1 && sel.row < this.rows.length ? this.rows[sel.row].dataItem : null;

                    // groups are not regular data items (TFS 142470)
                    if (item instanceof wijmo.collections.CollectionViewGroup) {
                        item = null;
                    }

                    // if it doesn't match the view's, move the selection to match
                    if (item != this.collectionView.currentItem) {
                        sel.row = sel.row2 = this._getRowIndex(this.collectionView.currentPosition);
                        this.select(sel, false);
                        if (this.selectionMode != 0 /* None */) {
                            this.scrollIntoView(sel.row, -1);
                        }
                    }
                }
            };

            // convert CollectionView index to row index
            FlexGrid.prototype._getRowIndex = function (index) {
                if (this.collectionView) {
                    // look up item, then scan rows to find it
                    if (index > -1) {
                        var item = this.collectionView.items[index];
                        for (; index < this.rows.length; index++) {
                            if (this.rows[index].dataItem === item) {
                                return index;
                            }
                        }
                        return -1;
                    } else {
                        // empty grid except for new row template? select that
                        if (this.rows.length == 1 && this.rows[0] instanceof grid._NewRowTemplate) {
                            return 0;
                        }

                        // no item to look up, so return current unbound row (group header)
                        // or -1 (no selection)
                        var index = this.selection.row, row = index > -1 ? this.rows[index] : null;
                        return row && (row instanceof grid.GroupRow || row.dataItem == null) ? index : -1;
                    }
                }

                // not bound
                return this.selection.row;
            };

            // convert row index to CollectionView index
            FlexGrid.prototype._getCvIndex = function (index) {
                if (index > -1 && this.collectionView) {
                    var item = this.rows[index].dataItem;
                    index = Math.min(index, this.collectionView.items.length);
                    for (; index > -1; index--) {
                        if (this.collectionView.items[index] === item) {
                            return index;
                        }
                    }
                }
                return -1;
            };

            // gets the index of the row that represents a given data item
            FlexGrid.prototype._findRow = function (data) {
                for (var i = 0; i < this.rows.length; i++) {
                    if (this.rows[i].dataItem == data) {
                        return i;
                    }
                }
                return -1;
            };

            // creates the child HTMLElements within this grid.
            FlexGrid.prototype._createChildren = function () {
                // instantiate and apply template
                var tpl = this.getTemplate();
                this.applyTemplate('wj-control wj-flexgrid wj-content', tpl, {
                    _root: 'root',
                    _eSz: 'sz',
                    _eCt: 'cells',
                    _eTL: 'tl',
                    _eCHdr: 'ch',
                    _eRHdr: 'rh',
                    _eTLCt: 'tlcells',
                    _eCHdrCt: 'chcells',
                    _eRHdrCt: 'rhcells',
                    _eMarquee: 'marquee',
                    _eFocus: 'focus'
                });

                // create grid panels
                this._gpCells = new grid.GridPanel(this, 1 /* Cell */, this._rows, this._cols, this._eCt);
                this._gpCHdr = new grid.GridPanel(this, 2 /* ColumnHeader */, this._hdrRows, this._cols, this._eCHdrCt);
                this._gpRHdr = new grid.GridPanel(this, 3 /* RowHeader */, this._rows, this._hdrCols, this._eRHdrCt);
                this._gpTL = new grid.GridPanel(this, 4 /* TopLeft */, this._hdrRows, this._hdrCols, this._eTLCt);
            };

            // re-arranges the child HTMLElements within this grid.
            FlexGrid.prototype._updateLayout = function () {
                // compute content height, max height supported by browser,
                // and max offset so things match up when you scroll all the way down.
                var heightReal = this._rows.getTotalSize(), tlw = (this._hdrVis & 2 /* Row */) ? this._hdrCols.getTotalSize() : 0, tlh = (this._hdrVis & 1 /* Column */) ? this._hdrRows.getTotalSize() : 0;

                // make sure scrollbars are functional even if we have no rows (TFS 110441)
                if (heightReal < 1) {
                    heightReal = 1;
                }

                // keep track of relevant variables
                this._rtl = this.hostElement ? (getComputedStyle(this.hostElement).direction == 'rtl') : false;
                this._heightBrowser = Math.min(heightReal, FlexGrid._getMaxSupportedCssHeight());
                this._maxOffsetY = Math.max(0, heightReal - this._heightBrowser);

                // set sizes that do *not* depend on scrollbars being visible
                if (this._rtl) {
                    wijmo.setCss(this._eTL, { right: 0, top: 0, width: tlw, height: tlh });
                    wijmo.setCss(this._eCHdr, { top: 0, right: tlw, height: tlh });
                    wijmo.setCss(this._eRHdr, { right: 0, top: tlh, width: tlw });
                    wijmo.setCss(this._eCt, { right: tlw, top: tlh, width: this._gpCells.width, height: this._heightBrowser });
                } else {
                    wijmo.setCss(this._eTL, { left: 0, top: 0, width: tlw, height: tlh });
                    wijmo.setCss(this._eCHdr, { top: 0, left: tlw, height: tlh });
                    wijmo.setCss(this._eRHdr, { left: 0, top: tlh, width: tlw });
                    wijmo.setCss(this._eCt, { left: tlw, top: tlh, width: this._gpCells.width, height: this._heightBrowser });
                }

                // adjust for sticky headers
                this._updateStickyHeaders();

                // update autosizer element
                var sbW = this._root.offsetWidth - this._root.clientWidth, sbH = this._root.offsetHeight - this._root.clientHeight;
                wijmo.setCss(this._eSz, {
                    width: tlw + sbW + this._gpCells.width,
                    height: tlh + sbH + this._heightBrowser
                });

                // update star sizes and re-adjust content width to handle round-offs
                var clientWidth = null;
                if (this.columns._updateStarSizes(this._root.clientWidth - tlw)) {
                    clientWidth = this._root.clientWidth;
                    this._eCt.style.width = this._gpCells.width + 'px';
                }

                // store control size
                this._szClient = new wijmo.Size(this._root.clientWidth - tlw, this._root.clientHeight - tlh);
                this._rcBounds = null;

                // refresh content
                this._updateContent(false);

                // update autosizer after refreshing content
                sbW = this._root.offsetWidth - this._root.clientWidth;
                sbH = this._root.offsetHeight - this._root.clientHeight;
                wijmo.setCss(this._eSz, {
                    width: tlw + sbW + this._gpCells.width,
                    height: tlh + sbH + this._heightBrowser
                });

                // update client size after refreshing content
                this._szClient = new wijmo.Size(this._root.clientWidth - tlw, this._root.clientHeight - tlh);

                // adjust star sizes for vertical scrollbars
                if (clientWidth && clientWidth != this._root.clientWidth) {
                    if (this.columns._updateStarSizes(this._root.clientWidth - tlw)) {
                        this._eCt.style.width = this._gpCells.width + 'px';
                        this._updateContent(false);
                    }
                }

                // set sizes that *do* depend on scrollbars being visible
                this._eCHdr.style.width = this._szClient.width + 'px';
                this._eRHdr.style.height = this._szClient.height + 'px';
                // REVIEW: add onLayoutUpdated()?
            };

            // update the top of the header elements to remain visible
            // when the user scrolls the window
            FlexGrid.prototype._updateStickyHeaders = function () {
                if (this._stickyHdr) {
                    var offset = this._root ? Math.min(0, this._root.getBoundingClientRect().top) : 0, stuck = offset != 0;
                    this._eTL.style.top = this._eCHdr.style.top = -offset + 'px';
                    wijmo.toggleClass(this._eTL, FlexGrid._WJS_STICKY, stuck);
                    wijmo.toggleClass(this._eCHdr, FlexGrid._WJS_STICKY, stuck);
                }
            };

            // updates the scrollPosition property based on the element's scroll position
            // note that IE/Chrome/FF handle scrollLeft differently under RTL:
            // - Chrome reverses direction,
            // - FF uses negative values,
            // - IE does the right thing (nothing)
            FlexGrid.prototype._updateScrollPosition = function () {
                var root = this._root, top = root.scrollTop, left = root.scrollLeft;
                if (this._rtl && FlexGrid._getRtlMode() == 'rev') {
                    left = (root.scrollWidth - root.clientWidth) - left;
                }
                var pt = new wijmo.Point(-Math.abs(left), -top);

                // no change? no work
                if (this._ptScrl.equals(pt)) {
                    return false;
                }

                // raise scrollPositionChanged
                this._ptScrl = pt;
                this.onScrollPositionChanged();
                return true;
            };

            // updates the cell elements within this grid.
            FlexGrid.prototype._updateContent = function (recycle, state) {
                var _this = this;
                var focus = this.containsFocus(), hdrFocus = wijmo.contains(this.columnHeaders.hostElement, document.activeElement), pct = 1;

                // calculate offset to work around IE limitations
                if (this._heightBrowser > this._szClient.height) {
                    pct = Math.round((-this._ptScrl.y) / (this._heightBrowser - this._szClient.height) * 100) / 100;
                }
                this._offsetY = Math.round(this._maxOffsetY * pct);

                // update cells and visible headers
                this._gpCells._updateContent(recycle, state, this._offsetY);
                if (this._hdrVis & 1 /* Column */) {
                    if (!state || (this._ssHdr & 1 /* Column */)) {
                        this._gpCHdr._updateContent(recycle, state, 0);
                    }
                }
                if (this._hdrVis & 2 /* Row */) {
                    if (!state || (this._ssHdr & 2 /* Row */)) {
                        this._gpRHdr._updateContent(recycle, state, this._offsetY);
                    }
                }
                if (this._hdrVis && !state) {
                    this._gpTL._updateContent(recycle, state, 0);
                }

                // update marquee position
                if (this.showMarquee) {
                    var sel = this._selHdl._sel, marquee = this._eMarquee;
                    if (!sel.isValid || !this.rows.length || !this.columns.length) {
                        wijmo.setCss(marquee, {
                            left: 0,
                            top: 0,
                            width: 0,
                            height: 0,
                            visibility: 'collapse'
                        });
                    } else {
                        var rcm = this._getMarqueeRect(sel), mc = marquee.firstChild, dx = marquee.offsetWidth - mc.offsetWidth, dy = marquee.offsetHeight - mc.offsetHeight;
                        wijmo.setCss(marquee, {
                            left: rcm.left + this.cells.hostElement.offsetLeft - dx / 2,
                            top: rcm.top + this.cells.hostElement.offsetTop - dy / 2,
                            width: rcm.width + dx,
                            height: rcm.height + dy,
                            visibility: rcm.width > 0 && rcm.height > 0 ? '' : 'collapse'
                        });
                    }
                }

                // restore focus
                if (focus && !state) {
                    setTimeout(function () {
                        _this.focus();
                    }, 10);
                }

                // make sure hit-testing works
                this._rcBounds = null;

                // done updating the view
                this.onUpdatedView();
            };

            // get marquee rect (accounting for merging and freezing)
            FlexGrid.prototype._getMarqueeRect = function (rng) {
                // get selection corner cells (accounting for merging)
                var m1 = this.getMergedRange(this.cells, rng.topRow, rng.leftCol) || new grid.CellRange(rng.topRow, rng.leftCol), m2 = this.getMergedRange(this.cells, rng.bottomRow, rng.rightCol) || new grid.CellRange(rng.bottomRow, rng.rightCol);

                // get cell client rectangles
                var rc1 = this.cells.getCellBoundingRect(m1.topRow, m1.leftCol, true), rc2 = this.cells.getCellBoundingRect(m2.bottomRow, m2.rightCol, true);

                // adjust for frozen rows
                if (this.rows.frozen) {
                    var fzr = Math.min(this.rows.length, this.rows.frozen), rcf = this.cells.getCellBoundingRect(fzr - 1, 0, true);
                    if (rng.topRow >= fzr && rc1.top < rcf.bottom) {
                        rc1.top = rcf.bottom;
                    }
                    if (rng.bottomRow >= fzr && rc2.bottom < rcf.bottom) {
                        rc2.height = rcf.bottom - rc2.top;
                    }
                }

                // adjust for frozen columns
                if (this.columns.frozen) {
                    var fzc = Math.min(this.columns.length, this.columns.frozen), rcf = this.cells.getCellBoundingRect(0, fzc - 1, true);
                    if (rng.leftCol >= fzc && rc1.left < rcf.right) {
                        rc1.left = rcf.right;
                    }
                    if (rng.rightCol >= fzc && rc2.right < rcf.right) {
                        rc2.width = rcf.right - rc2.left;
                    }
                }

                // return marquee rect
                return new wijmo.Rect(rc1.left, rc1.top, rc2.right - rc1.left, rc2.bottom - rc1.top);
            };

            // bind columns
            /*protected*/ FlexGrid.prototype._bindColumns = function () {
                for (var i = 0; i < this.columns.length; i++) {
                    var col = this.columns[i];
                    if (col._getFlag(32 /* AutoGenerated */)) {
                        this.columns.removeAt(i);
                        i--;
                    }
                }

                // get first item to infer data types
                var item = null, cv = this.collectionView;
                if (cv && cv.sourceCollection && cv.sourceCollection.length) {
                    item = cv.sourceCollection[0];
                }

                // auto-generate new columns
                // (skipping unwanted types: array and object)
                if (item && this.autoGenerateColumns) {
                    for (var key in item) {
                        if (wijmo.isPrimitive(item[key])) {
                            col = new grid.Column();
                            col._setFlag(32 /* AutoGenerated */, true);
                            col.binding = col.name = key;
                            col.header = wijmo.toHeaderCase(key);
                            col.dataType = wijmo.getType(item[key]);
                            var pdesc = Object.getOwnPropertyDescriptor(item, key);
                            if (pdesc && !pdesc.writable) {
                                col._setFlag(512 /* ReadOnly */, true);
                            }
                            if (col.dataType == 2 /* Number */) {
                                col.width = 80;
                            }
                            this.columns.push(col);
                        }
                    }
                }

                // update missing column types
                this._updateColumnTypes();
                // REVIEW: add onColumnsCreated()?
            };

            // update missing column types to match data
            /*protected*/ FlexGrid.prototype._updateColumnTypes = function () {
                var cv = this.collectionView;
                if (wijmo.hasItems(cv)) {
                    var item = cv.items[0], cols = this.columns;
                    for (var i = 0; i < cols.length; i++) {
                        var col = cols[i];
                        if (col.dataType == null && col._binding) {
                            col.dataType = wijmo.getType(col._binding.getValue(item));
                        }
                    }
                }
            };

            // get the binding column
            // (in the MultiRow grid, each physical column may contain several binding columns)
            /*protected*/ FlexGrid.prototype._getBindingColumn = function (p, r, c) {
                return c;
            };

            // bind rows
            /*protected*/ FlexGrid.prototype._bindRows = function () {
                // raise loading rows event
                var e = new wijmo.CancelEventArgs();
                this.onLoadingRows(e);
                if (e.cancel) {
                    return;
                }

                // clear rows
                this.rows.clear();

                // re-populate
                if (this.collectionView && this.collectionView.items) {
                    var list = this.collectionView.items;
                    var groups = this.collectionView.groups;

                    // bind to hierarchical sources (childItemsPath)
                    if (this.childItemsPath) {
                        for (var i = 0; i < list.length; i++) {
                            this._addTreeNode(list[i], 0);
                        }
                        // bind to grouped sources
                    } else if (groups != null && groups.length > 0 && this.showGroups) {
                        for (var i = 0; i < groups.length; i++) {
                            this._addGroup(groups[i]);
                        }
                        // bind to regular sources
                    } else {
                        for (var i = 0; i < list.length; i++) {
                            this.rows.push(new grid.Row(list[i]));
                        }
                    }
                }

                // done binding rows
                this.onLoadedRows(e);
            };
            FlexGrid.prototype._addGroup = function (g) {
                // add group row
                var gr = new grid.GroupRow();
                gr.level = g.level;
                gr.dataItem = g;
                this.rows.push(gr);

                // add child rows
                if (g.isBottomLevel) {
                    for (var i = 0; i < g.items.length; i++) {
                        var r = new grid.Row(g.items[i]);
                        this.rows.push(r);
                    }
                } else {
                    for (var i = 0; i < g.groups.length; i++) {
                        this._addGroup(g.groups[i]);
                    }
                }
            };
            FlexGrid.prototype._addTreeNode = function (item, level) {
                var gr = new grid.GroupRow(), path = this.childItemsPath, prop = wijmo.isArray(path) ? path[level] : path, children = item[prop];

                // add main node
                gr.dataItem = item;
                gr.level = level;
                this.rows.push(gr);

                // add child nodes
                if (children) {
                    for (var i = 0; i < children.length; i++) {
                        this._addTreeNode(children[i], level + 1);
                    }
                }
            };

            // gets a list of the properties defined by a class and its ancestors
            // that have getters, setters, and whose names don't start with '_'.
            FlexGrid._getSerializableProperties = function (obj) {
                var arr = [];

                for (obj = obj.prototype; obj; obj = Object.getPrototypeOf(obj)) {
                    var names = Object.getOwnPropertyNames(obj);
                    for (var i = 0; i < names.length; i++) {
                        var name = names[i], pd = Object.getOwnPropertyDescriptor(obj, name);
                        if (pd && pd.set && pd.get && name[0] != '_') {
                            arr.push(name);
                        }
                    }
                }

                // done
                return arr;
            };

            // method used in JSON-style initialization
            FlexGrid.prototype._copy = function (key, value) {
                if (key == 'columns') {
                    this.columns.clear();
                    var arr = wijmo.asArray(value);
                    for (var i = 0; i < arr.length; i++) {
                        var c = new grid.Column();
                        wijmo.copy(c, arr[i]);
                        this.columns.push(c);
                    }
                    return true;
                }
                return false;
            };

            FlexGrid._getMaxSupportedCssHeight = function () {
                if (!FlexGrid._maxCssHeight) {
                    var maxHeight = 1e6, testUpTo = 60e6, div = document.createElement('div');
                    div.style.visibility = 'hidden';
                    document.body.appendChild(div);
                    for (var test = maxHeight; test <= testUpTo; test += 500000) {
                        div.style.height = test + 'px';
                        if (div.offsetHeight != test) {
                            break;
                        }
                        maxHeight = test;
                    }
                    document.body.removeChild(div);
                    FlexGrid._maxCssHeight = maxHeight;
                }
                return FlexGrid._maxCssHeight;
            };

            FlexGrid._getRtlMode = function () {
                if (!FlexGrid._rtlMode) {
                    var el = wijmo.createElement('<div dir="rtl" style="visibility:hidden;width:100px;height:100px;overflow:auto">' + '<div style="width:2000px;height:2000px"></div>' + '</div>');

                    document.body.appendChild(el);
                    var sl = el.scrollLeft;
                    el.scrollLeft = -1000;
                    var sln = el.scrollLeft;
                    document.body.removeChild(el);

                    FlexGrid._rtlMode = sln < 0 ? 'neg' : sl > 0 ? 'rev' : 'std';
                    //console.log('rtlMode: ' + FlexGrid._rtlMode);
                }
                return FlexGrid._rtlMode;
            };
            FlexGrid._WJS_STICKY = 'wj-state-sticky';
            FlexGrid._WJS_MEASURE = 'wj-state-measuring';

            FlexGrid.controlTemplate = '<div style="position:relative;width:100%;height:100%;max-height:inherit;overflow:hidden">' + '<div wj-part="focus" tabIndex="0" style="position:absolute;left:-10px;top:-10px"></div>' + '<div wj-part="root" style="position:absolute;width:100%;height:100%;max-height:inherit;overflow:auto;-webkit-overflow-scrolling:touch">' + '<div wj-part="cells" class="wj-cells" style="position:relative"></div>' + '<div wj-part="marquee" class="wj-marquee" style="display:none;pointer-events:none">' + '<div style="width:100%;height:100%"></div>' + '</div>' + '</div>' + '<div wj-part="rh" style="position:absolute;overflow:hidden;outline:none">' + '<div wj-part="rhcells" class="wj-rowheaders" style="position:relative"></div>' + '</div>' + '<div wj-part="ch" style="position:absolute;overflow:hidden;outline:none">' + '<div wj-part="chcells" class="wj-colheaders" style="position:relative"></div>' + '</div>' + '<div wj-part="tl" style="position:absolute;overflow:hidden;outline:none">' + '<div wj-part="tlcells" class="wj-topleft" style="position:relative"></div>' + '</div>' + '<div wj-part="sz" style="position:relative;visibility:hidden;"></div>' + '</div>';
            return FlexGrid;
        })(wijmo.Control);
        grid.FlexGrid = FlexGrid;
    })(wijmo.grid || (wijmo.grid = {}));
    var grid = wijmo.grid;
})(wijmo || (wijmo = {}));
//# sourceMappingURL=FlexGrid.js.map

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var wijmo;
(function (wijmo) {
    (function (grid) {
        'use strict';

        /**
        * Provides arguments for @see:CellRange events.
        */
        var CellRangeEventArgs = (function (_super) {
            __extends(CellRangeEventArgs, _super);
            /**
            * Initializes a new instance of a @see:CellRangeEventArgs.
            *
            * @param p @see:GridPanel that contains the range.
            * @param rng Range of cells affected by the event.
            * @param data Data related to the event.
            */
            function CellRangeEventArgs(p, rng, data) {
                _super.call(this);
                this._p = wijmo.asType(p, grid.GridPanel);
                this._rng = wijmo.asType(rng, grid.CellRange);
                this._data = data;
            }
            Object.defineProperty(CellRangeEventArgs.prototype, "panel", {
                /**
                * Gets the @see:GridPanel affected by this event.
                */
                get: function () {
                    return this._p;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(CellRangeEventArgs.prototype, "range", {
                /**
                * Gets the @see:CellRange affected by this event.
                */
                get: function () {
                    return this._rng.clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(CellRangeEventArgs.prototype, "row", {
                /**
                * Gets the row affected by this event.
                */
                get: function () {
                    return this._rng.row;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(CellRangeEventArgs.prototype, "col", {
                /**
                * Gets the column affected by this event.
                */
                get: function () {
                    return this._rng.col;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(CellRangeEventArgs.prototype, "data", {
                /**
                * Gets or sets the data associated with the event.
                */
                get: function () {
                    return this._data;
                },
                set: function (value) {
                    this._data = value;
                },
                enumerable: true,
                configurable: true
            });
            return CellRangeEventArgs;
        })(wijmo.CancelEventArgs);
        grid.CellRangeEventArgs = CellRangeEventArgs;

        /**
        * Provides arguments for the @see:formatItem event.
        */
        var FormatItemEventArgs = (function (_super) {
            __extends(FormatItemEventArgs, _super);
            /**
            * Initializes a new instance of a @see:FormatItemEventArgs.
            *
            * @param p @see:GridPanel that contains the range.
            * @param rng Range of cells affected by the event.
            * @param cell Element that represents the grid cell to be formatted.
            */
            function FormatItemEventArgs(p, rng, cell) {
                _super.call(this, p, rng);
                this._cell = wijmo.asType(cell, HTMLElement);
            }
            Object.defineProperty(FormatItemEventArgs.prototype, "cell", {
                /**
                * Gets a reference to the element that represents the grid cell to be formatted.
                */
                get: function () {
                    return this._cell;
                },
                enumerable: true,
                configurable: true
            });
            return FormatItemEventArgs;
        })(CellRangeEventArgs);
        grid.FormatItemEventArgs = FormatItemEventArgs;
    })(wijmo.grid || (wijmo.grid = {}));
    var grid = wijmo.grid;
})(wijmo || (wijmo = {}));
//# sourceMappingURL=EventArgs.js.map

var wijmo;
(function (wijmo) {
    (function (_grid) {
        'use strict';

        /**
        * Identifies the type of cell in a @see:GridPanel.
        */
        (function (CellType) {
            /** Unknown or invalid cell type. */
            CellType[CellType["None"] = 0] = "None";

            /** Regular data cell. */
            CellType[CellType["Cell"] = 1] = "Cell";

            /** Column header cell. */
            CellType[CellType["ColumnHeader"] = 2] = "ColumnHeader";

            /** Row header cell. */
            CellType[CellType["RowHeader"] = 3] = "RowHeader";

            /** Top-left cell. */
            CellType[CellType["TopLeft"] = 4] = "TopLeft";
        })(_grid.CellType || (_grid.CellType = {}));
        var CellType = _grid.CellType;

        /**
        * Represents a logical part of the grid, such as the column headers, row headers,
        * and scrollable data part.
        */
        var GridPanel = (function () {
            /**
            * Initializes a new instance of a @see:GridPanel.
            *
            * @param grid The @see:FlexGrid object that owns the panel.
            * @param cellType The type of cell in the panel.
            * @param rows The rows displayed in the panel.
            * @param cols The columns displayed in the panel.
            * @param element The HTMLElement that hosts the cells in the control.
            */
            function GridPanel(grid, cellType, rows, cols, element) {
                this._offsetY = 0;
                this._g = wijmo.asType(grid, _grid.FlexGrid);
                this._ct = wijmo.asInt(cellType);
                this._rows = wijmo.asType(rows, _grid.RowCollection);
                this._cols = wijmo.asType(cols, _grid.ColumnCollection);
                this._e = wijmo.asType(element, HTMLElement);
                this._rng = new _grid.CellRange();

                // dispatch blur event for focused cells before recycling the panel
                if (!GridPanel._evtBlur) {
                    GridPanel._evtBlur = document.createEvent('HTMLEvents');
                    GridPanel._evtBlur.initEvent('blur', true, false);
                }
            }
            Object.defineProperty(GridPanel.prototype, "grid", {
                /**
                * Gets the grid that owns the panel.
                */
                get: function () {
                    return this._g;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(GridPanel.prototype, "cellType", {
                /**
                * Gets the type of cell contained in the panel.
                */
                get: function () {
                    return this._ct;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(GridPanel.prototype, "viewRange", {
                /**
                * Gets a @see:CellRange that indicates the range of cells currently visible on the panel.
                */
                get: function () {
                    return this._getViewRange(false);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(GridPanel.prototype, "width", {
                /**
                * Gets the total width of the content in the panel.
                */
                get: function () {
                    return this._cols.getTotalSize();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(GridPanel.prototype, "height", {
                /**
                * Gets the total height of the content in this panel.
                */
                get: function () {
                    return this._rows.getTotalSize();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(GridPanel.prototype, "rows", {
                /**
                * Gets the panel's row collection.
                */
                get: function () {
                    return this._rows;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(GridPanel.prototype, "columns", {
                /**
                * Gets the panel's column collection.
                */
                get: function () {
                    return this._cols;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Gets the value stored in a cell in the panel.
            *
            * @param r The row index of the cell.
            * @param c The index, name, or binding of the column that contains the cell.
            * @param formatted Whether to format the value for display.
            */
            GridPanel.prototype.getCellData = function (r, c, formatted) {
                var row = this._rows[wijmo.asNumber(r, false, true)], col, value = null;

                // get column index by name or binding
                if (wijmo.isString(c)) {
                    c = this._cols.indexOf(c);
                    if (c < 0) {
                        throw 'Invalid column name or binding.';
                    }
                }

                // get column
                col = this._cols[wijmo.asNumber(c, false, true)];

                // get binding column (MultiRow grid may have multiple display columns for each physical column)
                var bcol = this._g ? this._g._getBindingColumn(this, r, col) : col;

                // get bound value from data item using binding
                if (bcol.binding && row.dataItem && !(row.dataItem instanceof wijmo.collections.CollectionViewGroup)) {
                    value = bcol._binding.getValue(row.dataItem);
                } else if (row._ubv) {
                    value = row._ubv[col._hash];
                }

                // special values for row and column headers, aggregates
                if (value == null) {
                    switch (this._ct) {
                        case 2 /* ColumnHeader */:
                            if (r == this._rows.length - 1 || bcol != col) {
                                value = bcol.header;
                            }
                            break;
                        case 1 /* Cell */:
                            if (col.aggregate != 0 /* None */ && row instanceof _grid.GroupRow) {
                                var group = wijmo.tryCast(row.dataItem, wijmo.collections.CollectionViewGroup);
                                if (group) {
                                    value = group.getAggregate(bcol.aggregate, bcol.binding, this._g.collectionView);
                                }
                            }
                            break;
                    }
                }

                // format value if requested, never return null
                if (formatted) {
                    if (this.cellType == 1 /* Cell */ && bcol.dataMap) {
                        value = bcol.dataMap.getDisplayValue(value);
                    }
                    value = value != null ? wijmo.Globalize.format(value, bcol.format) : '';
                }

                // done
                return value;
            };

            /**
            * Sets the content of a cell in the panel.
            *
            * @param r The index of the row that contains the cell.
            * @param c The index, name, or binding of the column that contains the cell.
            * @param value The value to store in the cell.
            * @param coerce Whether to change the value automatically to match the column's data type.
            * @param invalidate Whether to invalidate the grid to show the change.
            * @return Returns true if the value is stored successfully, false otherwise (failed cast).
            */
            GridPanel.prototype.setCellData = function (r, c, value, coerce, invalidate) {
                if (typeof coerce === "undefined") { coerce = true; }
                if (typeof invalidate === "undefined") { invalidate = true; }
                var row = this._rows[wijmo.asNumber(r, false, true)], col;

                // get column index by name or binding
                if (wijmo.isString(c)) {
                    c = this._cols.indexOf(c);
                    if (c < 0) {
                        throw 'Invalid column name or binding.';
                    }
                }

                // get column
                col = this._cols[wijmo.asNumber(c, false, true)];

                // get binding column (MultiRow grid may have multiple display columns for each physical column)
                var bcol = this._g ? this._g._getBindingColumn(this, r, col) : col;

                // handle dataMap, coercion, type-checking
                if (this._ct == 1 /* Cell */) {
                    // honor dataMap
                    if (bcol.dataMap && value != null) {
                        if (bcol.required || (value != '' && value != null)) {
                            var map = bcol.dataMap, key = map.getKeyValue(value);
                            if (key == null) {
                                if (!map.isEditable || map.displayMemberPath != map.selectedValuePath) {
                                    return false;
                                }
                            } else {
                                value = key; // got the key, use it instead of the value
                            }
                        }
                    }

                    // get target type
                    var targetType = 0 /* Object */;
                    if (bcol.dataType) {
                        targetType = bcol.dataType;
                    } else {
                        var current = this.getCellData(r, c, false);
                        targetType = wijmo.getType(current);
                    }

                    // honor 'required' property
                    if (wijmo.isBoolean(bcol.required)) {
                        if (!bcol.required && (value === '' || value === null)) {
                            value = null; // setting to null
                            coerce = false;
                        } else if (bcol.required && (value === '' || value === null)) {
                            return false;
                        }
                    }

                    // coerce type if required
                    if (coerce) {
                        value = wijmo.changeType(value, targetType, bcol.format);
                        if (targetType != 0 /* Object */ && wijmo.getType(value) != targetType) {
                            return false;
                        }
                    }
                }

                // store value
                if (row.dataItem && bcol.binding) {
                    var binding = bcol._binding, item = row.dataItem, oldValue = binding.getValue(item);
                    if (value !== oldValue && !wijmo.DateTime.equals(value, oldValue)) {
                        // set the value
                        binding.setValue(item, value);

                        // track changes in CollectionView if this is not the current edit item (e.g. when pasting)
                        var view = this._g.collectionView;
                        if (view instanceof wijmo.collections.CollectionView && view.trackChanges && item != view.currentEditItem) {
                            view._trackItemChanged(item);
                        }
                    }
                } else {
                    if (!row._ubv)
                        row._ubv = {};
                    row._ubv[col._hash] = value;
                }

                // invalidate
                if (invalidate && this._g) {
                    this._g.invalidate();
                }

                // done
                return true;
            };

            /**
            * Gets a cell's bounds in viewport coordinates.
            *
            * The returned value is a @see:Rect object which contains the position and dimensions
            * of the cell in viewport coordinates.
            * The viewport coordinates are the same as those used by the
            * <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element.getBoundingClientRect"
            * target="_blank">getBoundingClientRect</a> method.
            *
            * @param r The index of the row that contains the cell.
            * @param c The index of the column that contains the cell.
            * @param raw Whether to return the rectangle in raw panel coordinates as opposed to viewport coordinates.
            */
            GridPanel.prototype.getCellBoundingRect = function (r, c, raw) {
                // get rect in panel coordinates
                var row = this.rows[r], col = this.columns[c], rc = new wijmo.Rect(col.pos, row.pos, col.renderSize, row.renderSize);

                // ajust for rtl
                if (this._g._rtl) {
                    rc.left = this.hostElement.offsetWidth - rc.right;
                }

                // adjust for panel position
                if (!raw) {
                    var rcp = this.hostElement.getBoundingClientRect();
                    rc.left += rcp.left;
                    rc.top += rcp.top - this._offsetY;
                }

                // account for frozen rows/columns (TFS 105593)
                if (r < this.rows.frozen) {
                    rc.top -= this._g.scrollPosition.y;
                }
                if (c < this.columns.frozen) {
                    rc.left -= this._g.scrollPosition.x;
                }

                // done
                return rc;
            };

            /**
            * Gets a @see:SelectedState value that indicates the selected state of a cell.
            *
            * @param r Row index of the cell to inspect.
            * @param c Column index of the cell to inspect.
            * @param rng @see:CellRange that contains the cell to inspect.
            */
            GridPanel.prototype.getSelectedState = function (r, c, rng) {
                var g = this._g, mode = g.selectionMode, sel = g._selHdl._sel;
                if (mode != 0 /* None */) {
                    switch (this._ct) {
                        case 1 /* Cell */:
                            // handle merged ranges
                            if (!rng) {
                                rng = g.getMergedRange(this, r, c);
                            }
                            if (rng) {
                                if (rng.contains(sel.row, sel.col)) {
                                    return g.showMarquee ? 0 /* None */ : 2 /* Cursor */;
                                } else if (rng.intersects(sel)) {
                                    return 1 /* Selected */;
                                }
                            }

                            // cursor (if not showing marquee)
                            if (sel.row == r && sel.col == c) {
                                return g.showMarquee ? 0 /* None */ : 2 /* Cursor */;
                            }

                            // special case: row/col selected property
                            if (g.rows[r].isSelected || g.columns[c].isSelected) {
                                return 1 /* Selected */;
                            }

                            // adjust for selection mode
                            sel = g._selHdl._adjustSelection(sel);

                            // ListBox mode (already checked for selected rows/cols)
                            if (mode == 5 /* ListBox */) {
                                return 0 /* None */;
                            }

                            // regular ranges
                            return sel.containsRow(r) && sel.containsColumn(c) ? 1 /* Selected */ : 0 /* None */;

                        case 2 /* ColumnHeader */:
                            if (g.showSelectedHeaders & 1 /* Column */) {
                                if (g.columns[c].isSelected || sel.containsColumn(c) || sel.intersectsColumn(rng)) {
                                    if (rng)
                                        r = rng.bottomRow;
                                    if (r == this.rows.length - 1) {
                                        return 1 /* Selected */;
                                    }
                                }
                            }
                            break;

                        case 3 /* RowHeader */:
                            if (g.showSelectedHeaders & 2 /* Row */) {
                                if (g.rows[r].isSelected || sel.containsRow(r) || sel.intersectsRow(rng)) {
                                    if (rng)
                                        c = rng.rightCol;
                                    if (c == this.columns.length - 1) {
                                        return 1 /* Selected */;
                                    }
                                }
                            }
                            break;
                    }
                }

                // not selected
                return 0 /* None */;
            };

            Object.defineProperty(GridPanel.prototype, "hostElement", {
                /**
                * Gets the host element for the panel.
                */
                get: function () {
                    return this._e;
                },
                enumerable: true,
                configurable: true
            });

            // ** implementation
            /* -- do not document, this is internal --
            * Gets the Y offset for cells in the panel.
            */
            GridPanel.prototype._getOffsetY = function () {
                return this._offsetY;
            };

            /* -- do not document, this is internal --
            * Updates the cell elements in the panel.
            * @param recycle Whether to recycle existing elements or start from scratch.
            * @param state Whether to keep existing elements and update their state.
            * @param offsetY Scroll position to use when updating the panel.
            */
            GridPanel.prototype._updateContent = function (recycle, state, offsetY) {
                var r, c, ctr, cell, g = this._g, rows = this._rows, cols = this._cols;

                // scroll headers into position
                if (this._ct == 2 /* ColumnHeader */ || this._ct == 3 /* RowHeader */) {
                    var sp = g._ptScrl, s = this._e.style;
                    if (this.cellType == 2 /* ColumnHeader */) {
                        if (g._rtl) {
                            s.right = sp.x + 'px';
                        } else {
                            s.left = sp.x + 'px';
                        }
                    } else if (this.cellType == 3 /* RowHeader */) {
                        s.top = sp.y + 'px';
                    }
                }

                // update offset (and don't recycle if it changed!)
                if (this._offsetY != offsetY) {
                    recycle = false;
                    this._offsetY = offsetY;
                }

                // calculate new view range (optionally buffered)
                var vrng = this._getViewRange(false), rng = (recycle && g.isTouching) ? this._getViewRange(true) : vrng;

                // done if recycling, not updating state, and old range contains new (unbuffered)
                // this happens a lot while scrolling by small amounts (< 1 cell)
                if (recycle && !state && !rows.frozen && !cols.frozen && this._rng.contains(vrng)) {
                    return;
                }

                // if not recycling or if the range changed, ignore 'cells' refresh list
                if (!recycle || !rng.equals(this._rng)) {
                    state = false;
                }

                // clear content if not recycling
                if (!recycle) {
                    var eFocus = wijmo.contains(this._e, document.activeElement) ? document.activeElement : null, cf = this._g.cellFactory;

                    for (var i = 0; i < this._e.childElementCount; i++) {
                        cf.disposeCell(this._e.children[i]);
                    }

                    // clear content
                    wijmo.setText(this._e, null);

                    // update focus state in case the editor was disposed
                    if (eFocus) {
                        eFocus.dispatchEvent(GridPanel._evtBlur);
                    }
                }

                // reorder cells to optimize scrolling
                if (recycle && this._ct == 1 /* Cell */ && !rows.frozen && !cols.frozen) {
                    this._reorderCells(rng, this._rng);
                }

                // save new range
                this._rng = rng;

                // go create/update the cells
                // (render frozen cells last so we don't need z-index!)
                ctr = 0;
                for (r = rng.topRow; r <= rng.bottomRow && r > -1; r++) {
                    ctr = this._renderRow(r, rng, false, state, ctr);
                }
                for (r = rng.topRow; r <= rng.bottomRow && r > -1; r++) {
                    ctr = this._renderRow(r, rng, true, state, ctr);
                }
                for (r = 0; r < rows.frozen && r < rows.length; r++) {
                    ctr = this._renderRow(r, rng, false, state, ctr);
                }
                for (r = 0; r < rows.frozen && r < rows.length; r++) {
                    ctr = this._renderRow(r, rng, true, state, ctr);
                }

                // show the cells we are using, hide the others
                var cnt = this._e.childElementCount;
                for (var i = ctr; i < cnt; i++) {
                    cell = this._e.children[i];
                    cell.style.display = 'none';
                }
            };

            // reorder cells within the panel to optimize scrolling performance
            GridPanel.prototype._reorderCells = function (newRange, oldRange) {
                // calculate range delta, watch out for bad ranges
                var limit = Math.max(1, newRange.rowSpan - 1), dr = newRange.row > -1 && oldRange.row > -1 && newRange.intersects(oldRange) ? newRange.row - oldRange.row : 0;

                // scrolling down
                // remove cells from the top of the list and append to bottom
                if (dr > 0 && dr <= limit) {
                    var row = this._g.rows[newRange.row], newTop = row.pos, end = 0;
                    for (; end < this._e.childElementCount; end++) {
                        var cell = this._e.children[end];
                        var top = parseInt(cell.style.top);
                        if (top >= newTop)
                            break;
                    }
                    var range = document.createRange();
                    range.setStart(this._e, 0);
                    range.setEnd(this._e, end);
                    this._e.appendChild(range.extractContents());
                }

                // scrolling up
                // remove cells from the bottom of the list and insert at the top
                if (dr < 0 && dr >= -limit) {
                    var row = this._g.rows[newRange.row2], newBot = row.pos + row.renderSize, start = this._e.childElementCount - 1;
                    for (; start >= 0; start--) {
                        var cell = this._e.children[start];
                        var top = parseInt(cell.style.top);
                        if (top < newBot)
                            break;
                    }
                    range = document.createRange();
                    range.setStart(this._e, start + 1);
                    range.setEnd(this._e, this._e.childElementCount);
                    this._e.insertBefore(range.extractContents(), this._e.firstChild);
                }
            };

            // renders a row
            GridPanel.prototype._renderRow = function (r, vrng, frozen, state, ctr) {
                // skip hidden rows
                if (this.rows[r].renderSize <= 0) {
                    return ctr;
                }

                // render each cell in the row
                if (frozen) {
                    for (var c = 0; c < this.columns.frozen && c < this.columns.length; c++) {
                        ctr = this._renderCell(r, c, vrng, state, ctr);
                    }
                } else {
                    for (var c = vrng.leftCol; c <= vrng.rightCol && c > -1; c++) {
                        ctr = this._renderCell(r, c, vrng, state, ctr);
                    }
                }

                // return updated counter
                return ctr;
            };

            // renders a cell
            GridPanel.prototype._renderCell = function (r, c, vrng, state, ctr) {
                // skip over cells that have been merged over
                var g = this._g, mrng = g.getMergedRange(this, r, c);
                if (mrng) {
                    for (var over = Math.max(vrng.row, mrng.row); over < r; over++) {
                        if (this.rows[over].isVisible)
                            return ctr;
                    }
                    for (var over = Math.max(vrng.col, mrng.col); over < c; over++) {
                        if (this.columns[over].isVisible)
                            return ctr;
                    }
                }

                // skip hidden and non-merged columns
                if (this.columns[c].renderSize <= 0) {
                    if (!mrng || mrng.getRenderSize(this).width <= 0) {
                        return ctr;
                    }
                }

                // try recycling a cell
                var cell = this._e.childNodes[ctr++];

                // update selected state
                if (cell && state) {
                    var selState = this.getSelectedState(r, c, mrng);
                    wijmo.toggleClass(cell, 'wj-state-selected', selState == 2 /* Cursor */);
                    wijmo.toggleClass(cell, 'wj-state-multi-selected', selState == 1 /* Selected */);
                    return ctr;
                }

                // create or recyle cell
                // NOTE: make cells focusable so we can give the focus to them rather
                // than to the grid, which causes browsers to try and scroll the whole
                // grid into view.
                if (!cell) {
                    cell = document.createElement('div');
                    cell.tabIndex = 0;
                    this._e.appendChild(cell);
                }

                // set/update cell content/style
                g.cellFactory.updateCell(this, r, c, cell, mrng);

                // return updated counter
                return ctr;
            };

            // gets the range of cells currently visible,
            // optionally adding a buffer for inertial scrolling
            GridPanel.prototype._getViewRange = function (buffer) {
                var g = this._g, sp = g._ptScrl, rows = this._rows, cols = this._cols, rng = new _grid.CellRange(0, 0, rows.length - 1, cols.length - 1);

                // calculate range
                if (this._ct == 1 /* Cell */ || this._ct == 3 /* RowHeader */) {
                    var y = -sp.y + this._offsetY, h = g.clientSize.height + 1, fz = Math.min(rows.frozen, rows.length - 1);

                    // account for frozen rows
                    if (fz > 0) {
                        var fzs = rows[fz - 1].pos;
                        y += fzs;
                        h -= fzs;
                    }

                    // set row range
                    rng.row = Math.min(rows.length - 1, Math.max(rows.frozen, rows.getItemAt(y)));
                    rng.row2 = rows.getItemAt(y + h);
                }
                if (this._ct == 1 /* Cell */ || this._ct == 2 /* ColumnHeader */) {
                    var x = -sp.x, w = g.clientSize.width + 1, fz = Math.min(cols.frozen, cols.length - 1);

                    // account for frozen columns
                    if (fz > 0) {
                        var fzs = cols[fz - 1].pos;
                        x += fzs;
                        w -= fzs;
                    }

                    // set column range
                    rng.col = Math.min(cols.length - 1, Math.max(cols.frozen, cols.getItemAt(x)));
                    rng.col2 = cols.getItemAt(x + w);
                }

                // add buffer
                if (buffer && this._ct == 1 /* Cell */ && !rows.frozen && !cols.frozen) {
                    var sz = 6;
                    if (rng.row < this._rng.row) {
                        rng.row = Math.max(rng.row - sz, 0);
                    }
                    if (rng.row2 > this._rng.row2) {
                        rng.row2 = Math.min(rng.row2 + sz, rows.length - 1);
                    }
                    if (rng.col < this._rng.col) {
                        rng.col = Math.max(rng.col - sz, 0);
                    }
                    if (rng.col2 > this._rng.col2) {
                        rng.col2 = Math.min(rng.col2 + sz, cols.length - 1);
                    }
                }

                // handle case where all rows/cols are frozen
                if (rows.length <= rows.frozen) {
                    rng.row = rng.row2 = -1;
                }
                if (cols.length <= cols.frozen) {
                    rng.col = rng.col2 = -1;
                }

                // return viewrange
                return rng;
            };

            // gets the point where the frozen area ends
            GridPanel.prototype._getFrozenPos = function () {
                var fzr = this._rows.frozen, fzc = this._cols.frozen, fzrow = fzr > 0 ? this._rows[fzr - 1] : null, fzcol = fzc > 0 ? this._cols[fzc - 1] : null, fzy = fzrow ? fzrow.pos + fzrow.renderSize : 0, fzx = fzcol ? fzcol.pos + fzcol.renderSize : 0;
                return new wijmo.Point(fzx, fzy);
            };
            return GridPanel;
        })();
        _grid.GridPanel = GridPanel;
    })(wijmo.grid || (wijmo.grid = {}));
    var grid = wijmo.grid;
})(wijmo || (wijmo = {}));
//# sourceMappingURL=GridPanel.js.map

var wijmo;
(function (wijmo) {
    (function (grid) {
        'use strict';

        /**
        * Creates HTML elements that represent cells within a @see:FlexGrid control.
        */
        var CellFactory = (function () {
            function CellFactory() {
            }
            /**
            * Creates or updates a cell in the grid.
            *
            * @param p The @see:GridPanel that contains the cell.
            * @param r The index of the row that contains the cell.
            * @param c The index of the column that contains the cell.
            * @param cell The element that represents the cell.
            * @param rng The @see:CellRange object that contains the cell's
            * merged range, or null if the cell is not merged.
            * @param updateContent Whether to update the cell's content as
            * well as its position and style.
            */
            CellFactory.prototype.updateCell = function (p, r, c, cell, rng, updateContent) {
                var g = p.grid, ct = p.cellType, rows = p.rows, cols = p.columns, row = rows[r], col = cols[c], r2 = r, c2 = c, gr = wijmo.tryCast(row, grid.GroupRow), nr = wijmo.tryCast(row, grid._NewRowTemplate), cellWidth = col.renderWidth, cellHeight = row.renderHeight, cl = 'wj-cell', css = { display: '' }, canSkip = (updateContent != false);

                // clear cells that have child elements before re-using them
                // this is a workaround for a bug in IE that affects templates
                // strangely, setting the cell's innerHTML to '' doesn't help...
                if (updateContent != false && cell.firstElementChild && (cell.childNodes.length != 1 || cell.firstElementChild.type != 'checkbox')) {
                    wijmo.setText(cell, null);
                    canSkip = false;
                }

                // adjust for merged ranges
                if (rng && !rng.isSingleCell) {
                    r = rng.row;
                    c = rng.col;
                    r2 = rng.row2;
                    c2 = rng.col2;
                    row = rows[r];
                    col = cols[c];
                    gr = wijmo.tryCast(row, grid.GroupRow);
                    var sz = rng.getRenderSize(p);
                    cellHeight = sz.height;
                    cellWidth = sz.width;
                }

                // get column to use for binding (usually the same as col, but not on MultiRowGrid)
                var bcol = g._getBindingColumn(p, r, col);

                // get cell position accounting for frozen rows/columns
                var cpos = col.pos, rpos = row.pos;
                if (r < rows.frozen) {
                    rpos -= g._ptScrl.y;
                }
                if (c < cols.frozen) {
                    cpos -= g._ptScrl.x;
                }

                // size and position
                if (g._rtl) {
                    css.right = cpos + 'px';
                } else {
                    css.left = cpos + 'px';
                }
                css.top = (rpos - p._getOffsetY()) + 'px';
                css.width = cellWidth + 'px';
                css.height = cellHeight + 'px';

                // selector classes that only apply to regular cells
                if (ct == 1 /* Cell */) {
                    if (gr) {
                        cl += ' wj-group';
                    }
                    if (r % 2 != 0 && g.showAlternatingRows) {
                        cl += ' wj-alt';
                    }
                    if (r < rows.frozen || c < cols.frozen) {
                        cl += ' wj-frozen';
                    }
                    if (nr) {
                        cl += ' wj-new';
                    }
                    if (row.cssClass) {
                        cl += ' ' + row.cssClass;
                    }
                    if (col.cssClass) {
                        cl += ' ' + col.cssClass;
                    }
                } else {
                    cl += ' wj-header';
                }

                // selected state
                var selState = p.getSelectedState(r, c, rng);
                if (selState != 0 /* None */ && ct == 1 /* Cell */ && col.dataType != 3 /* Boolean */ && g.editRange && g.editRange.contains(r, c)) {
                    selState = 0 /* None */;
                }
                switch (selState) {
                    case 2 /* Cursor */:
                        cl += ' wj-state-selected';
                        break;
                    case 1 /* Selected */:
                        cl += ' wj-state-multi-selected';
                        break;
                }

                // frozen area boundary
                if (r2 == rows.frozen - 1) {
                    cl += ' wj-frozen-row';
                }
                if (c2 == cols.frozen - 1) {
                    cl += ' wj-frozen-col';
                }

                // word-wrapping
                if (col.wordWrap || row.wordWrap) {
                    cl += ' wj-wrap';
                }

                // optimization: skip cell update if possible
                if (canSkip && cl == cell.className) {
                    var s = cell.style;
                    if (s.top == css.top && s.width == css.width && s.height == css.height) {
                        if ((g._rtl && s.right == css.right) || (!g._rtl && s.left == css.left)) {
                            if (s.display) {
                                cell.style.display = '';
                                //s.display == ''; // this doesn't work... weird
                            }
                            return;
                        }
                    }
                }

                // alignment
                css.textAlign = bcol.getAlignment();

                // TODO: vertical alignment?
                // padding
                if (ct == 1 /* Cell */) {
                    css.paddingLeft = css.paddingRight = '';
                    if (g.rows.maxGroupLevel > -1 && c == g.columns.firstVisibleIndex) {
                        cell.style.paddingLeft = cell.style.paddingRight = '';
                        var level = gr ? Math.max(0, gr.level) : (g.rows.maxGroupLevel + 1), padding = parseInt(getComputedStyle(cell).paddingLeft), indent = g.treeIndent * level + padding;
                        if (indent) {
                            if (g._rtl) {
                                css.paddingRight = indent;
                            } else {
                                css.paddingLeft = indent;
                            }
                        }
                    }
                }

                // cell content
                if (updateContent != false) {
                    var data = p.getCellData(r, c, false), content = p.getCellData(r, c, true);
                    if (ct == 1 /* Cell */ && c == g.columns.firstVisibleIndex && gr && gr.hasChildren && !this._isEditingCell(g, r, c)) {
                        // collapse/expand outline
                        if (!content) {
                            content = gr.getGroupHeader();
                        }
                        cell.innerHTML = this._getTreeIcon(gr) + ' ' + content;
                        css.textAlign = '';
                    } else if (ct == 2 /* ColumnHeader */ && bcol.currentSort && g.showSort && (r2 == g._getSortRowIndex() || bcol != col)) {
                        // add sort class names to allow easier customization
                        cl += ' wj-sort-' + (bcol.currentSort == '+' ? 'asc' : 'desc');

                        // column header with sort sign
                        cell.innerHTML = wijmo.escapeHtml(content) + '&nbsp;' + this._getSortIcon(bcol);
                    } else if (ct == 3 /* RowHeader */ && c == g.rowHeaders.columns.length - 1 && !content) {
                        // edit/new item template indicators
                        var ecv = g.collectionView, editItem = ecv ? ecv.currentEditItem : null;
                        if (editItem && row.dataItem == editItem) {
                            content = '\u270E'; // pencil icon indicates item being edited
                        } else if (wijmo.tryCast(row, grid._NewRowTemplate)) {
                            content = '*'; // asterisk indicates new row template
                        }
                        wijmo.setText(cell, content);
                    } else if (ct == 1 /* Cell */ && bcol.dataType == 3 /* Boolean */ && (!gr || wijmo.isBoolean(data))) {
                        // re-use/create checkbox
                        // (re-using allows selecting and checking/unchecking with a single click)
                        var chk = cell.firstChild;
                        if (!(chk instanceof HTMLInputElement) || chk.type != 'checkbox') {
                            cell.innerHTML = '<input type="checkbox"/>';
                            chk = cell.firstChild;
                        }

                        // initialize/update checkbox value
                        chk.checked = data == true ? true : false;
                        chk.indeterminate = data == null;

                        // disable checkbox if it is not editable (so user can't click it)
                        chk.disabled = !g._edtHdl._allowEditing(r, c);
                        if (chk.disabled) {
                            chk.style.cursor = 'default';
                        }

                        // assign editor to grid
                        if (g.editRange && g.editRange.contains(r, c)) {
                            g._edtHdl._edt = chk;
                        }
                    } else if (ct == 1 /* Cell */ && this._isEditingCell(g, r, c)) {
                        // select input type (important for mobile devices)
                        var inpType = bcol.inputType;
                        if (!bcol.inputType) {
                            inpType = bcol.dataType == 2 /* Number */ && !bcol.dataMap ? 'tel' : 'text';
                        }

                        // get editor value (use full precision when editing floating point values)
                        // this is a little tricky: TFS 123276, 134218, 135336
                        if (!bcol.dataMap && !bcol.mask) {
                            var val = p.getCellData(r, c, false);
                            if (wijmo.isNumber(val)) {
                                var fmt = bcol.format;
                                if (fmt && val != Math.round(val)) {
                                    fmt = bcol.format.replace(/([a-z])(\d*)(.*)/ig, '$0112$3');
                                }
                                content = wijmo.Globalize.formatNumber(val, fmt, true);
                            }
                        }

                        // create/initialize editor
                        cell.innerHTML = '<input type="' + inpType + '" class="wj-grid-editor wj-form-control">';
                        var edt = cell.children[0];
                        edt.value = content;
                        edt.style.textAlign = bcol.getAlignment(); // right-align numbers when editing
                        css.padding = '0px'; // no padding on cell div (the editor has it)

                        // apply mask, if any
                        if (bcol.mask) {
                            var mp = new wijmo._MaskProvider(edt, bcol.mask);
                        }

                        // assign editor to grid
                        g._edtHdl._edt = edt;
                    } else {
                        // regular content
                        if (ct == 1 /* Cell */ && (row.isContentHtml || bcol.isContentHtml)) {
                            cell.innerHTML = content;
                        } else {
                            wijmo.setText(cell, content);
                        }
                    }

                    // add drop-down element to the cell if the column:
                    // a) has a dataMap,
                    // b) has showDropDown set to not false (null or true)
                    // c) is editable
                    if (ct == 1 /* Cell */ && wijmo.input && bcol.dataMap && bcol.showDropDown !== false && g._edtHdl._allowEditing(r, c)) {
                        // create icon once
                        if (!CellFactory._ddIcon) {
                            var ddstyle = 'position:absolute;top:0px;padding:3px 6px;opacity:.25;right:0px';
                            CellFactory._ddIcon = wijmo.createElement('<div style="' + ddstyle + '" ' + CellFactory._WJA_DROPDOWN + '><span class="wj-glyph-down"></span></div>');
                        }

                        // clone icon and add clone to cell
                        var dd = CellFactory._ddIcon.cloneNode(true);
                        if (g._rtl) {
                            dd.style.left = '0px';
                            dd.style.right = '';
                        }
                        cell.appendChild(dd);
                    }
                }

                switch (ct) {
                    case 3 /* RowHeader */:
                        cell.removeAttribute('draggable');
                        if (!gr && !nr && (g.allowDragging & 2 /* Rows */) != 0) {
                            cell.setAttribute('draggable', 'true');
                        }
                        break;
                    case 2 /* ColumnHeader */:
                        cell.removeAttribute('draggable');
                        if ((g.allowDragging & 1 /* Columns */) != 0) {
                            cell.setAttribute('draggable', 'true');
                        }
                        break;
                }

                // apply class specifier to cell
                if (cell.className != cl) {
                    cell.className = cl;
                }

                // apply style to cell
                wijmo.setCss(cell, css);

                // customize the cell
                if (g.itemFormatter) {
                    g.itemFormatter(p, r, c, cell);
                }
                if (g.formatItem.hasHandlers) {
                    var rng = CellFactory._fmtRng;
                    if (!rng) {
                        rng = CellFactory._fmtRng = new grid.CellRange(r, c, r2, c2);
                    } else {
                        rng.setRange(r, c, r2, c2);
                    }
                    var e = new grid.FormatItemEventArgs(p, rng, cell);
                    g.onFormatItem(e);
                }
            };

            /**
            * Disposes of a cell element and releases all resources associated with it.
            *
            * @param cell The element that represents the cell.
            */
            CellFactory.prototype.disposeCell = function (cell) {
                // no action needed for standard cells...
            };

            // ** implementation
            // determines whether the grid is currently editing a cell
            CellFactory.prototype._isEditingCell = function (g, r, c) {
                return g.editRange && g.editRange.contains(r, c);
            };

            // get an element to create a collapse/expand icon
            // NOTE: the _WJA_COLLAPSE is used by the mouse handler to identify
            // the collapse/expand button/element.
            CellFactory.prototype._getTreeIcon = function (gr) {
                // get class
                var cls = 'wj-glyph-' + (gr.grid._rtl ? (gr.isCollapsed ? 'left' : 'down-left') : (gr.isCollapsed ? 'right' : 'down-right'));

                // return span
                return '<span ' + CellFactory._WJA_COLLAPSE + ' class="' + cls + '"></span>';
            };

            // get an element to create a sort up/down icon
            CellFactory.prototype._getSortIcon = function (col) {
                return '<span class="wj-glyph-' + (col.currentSort == '+' ? 'up' : 'down') + '"></span>';
            };
            CellFactory._WJA_COLLAPSE = 'wj-collapse';
            CellFactory._WJA_DROPDOWN = 'wj-dropdown';
            return CellFactory;
        })();
        grid.CellFactory = CellFactory;
    })(wijmo.grid || (wijmo.grid = {}));
    var grid = wijmo.grid;
})(wijmo || (wijmo = {}));
//# sourceMappingURL=CellFactory.js.map

var wijmo;
(function (wijmo) {
    (function (grid) {
        'use strict';

        /**
        * Represents a rectangular group of cells defined by two row indices and
        * two column indices.
        */
        var CellRange = (function () {
            /**
            * Initializes a new instance of a @see:CellRange.
            *
            * @param r The index of the first row in the range (defaults to -1).
            * @param c The index of the first column in the range (defaults to -1).
            * @param r2 The index of the last row in the range (defaults to @see:r).
            * @param c2 The index of the first column in the range (defaults to @see:r).
            */
            function CellRange(r, c, r2, c2) {
                if (typeof r === "undefined") { r = -1; }
                if (typeof c === "undefined") { c = -1; }
                if (typeof r2 === "undefined") { r2 = r; }
                if (typeof c2 === "undefined") { c2 = c; }
                this.setRange(r, c, r2, c2);
            }
            /**
            * Initializes an existing @see:CellRange.
            *
            * @param r The index of the first row in the range (defaults to -1).
            * @param c The index of the first column in the range (defaults to -1).
            * @param r2 The index of the last row in the range (defaults to @see:r).
            * @param c2 The index of the first column in the range (defaults to @see:r).
            */
            CellRange.prototype.setRange = function (r, c, r2, c2) {
                if (typeof r === "undefined") { r = -1; }
                if (typeof c === "undefined") { c = -1; }
                if (typeof r2 === "undefined") { r2 = r; }
                if (typeof c2 === "undefined") { c2 = c; }
                this._row = wijmo.asInt(r);
                this._col = wijmo.asInt(c);
                this._row2 = wijmo.asInt(r2);
                this._col2 = wijmo.asInt(c2);
            };

            Object.defineProperty(CellRange.prototype, "row", {
                /**
                * Gets or sets the index of the first row in the range.
                */
                get: function () {
                    return this._row;
                },
                set: function (value) {
                    this._row = wijmo.asInt(value);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(CellRange.prototype, "col", {
                /**
                * Gets or sets the index of the first column in the range.
                */
                get: function () {
                    return this._col;
                },
                set: function (value) {
                    this._col = wijmo.asInt(value);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(CellRange.prototype, "row2", {
                /**
                * Gets or sets the index of the second row in the range.
                */
                get: function () {
                    return this._row2;
                },
                set: function (value) {
                    this._row2 = wijmo.asInt(value);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(CellRange.prototype, "col2", {
                /**
                * Gets or sets the index of the second column in the range.
                */
                get: function () {
                    return this._col2;
                },
                set: function (value) {
                    this._col2 = wijmo.asInt(value);
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Creates a copy of the range.
            */
            CellRange.prototype.clone = function () {
                return new CellRange(this._row, this._col, this._row2, this._col2);
            };

            Object.defineProperty(CellRange.prototype, "rowSpan", {
                /**
                * Gets the number of rows in the range.
                */
                get: function () {
                    return Math.abs(this._row2 - this._row) + 1;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(CellRange.prototype, "columnSpan", {
                /**
                * Gets the number of columns in the range.
                */
                get: function () {
                    return Math.abs(this._col2 - this._col) + 1;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(CellRange.prototype, "topRow", {
                /**
                * Gets the index of the top row in the range.
                */
                get: function () {
                    return Math.min(this._row, this._row2);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(CellRange.prototype, "bottomRow", {
                /**
                * Gets the index of the bottom row in the range.
                */
                get: function () {
                    return Math.max(this._row, this._row2);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(CellRange.prototype, "leftCol", {
                /**
                * Gets the index of the leftmost column in the range.
                */
                get: function () {
                    return Math.min(this._col, this._col2);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(CellRange.prototype, "rightCol", {
                /**
                * Gets the index of the rightmost column in the range.
                */
                get: function () {
                    return Math.max(this._col, this._col2);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(CellRange.prototype, "isValid", {
                /**
                * Checks whether the range contains valid row and column indices
                * (row and column values are zero or greater).
                */
                get: function () {
                    return this._row > -1 && this._col > -1 && this._row2 > -1 && this._col2 > -1;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(CellRange.prototype, "isSingleCell", {
                /**
                * Checks whether this range corresponds to a single cell (beginning and ending rows have
                * the same index, and beginning and ending columns have the same index).
                */
                get: function () {
                    return this._row == this._row2 && this._col == this._col2;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Checks whether the range contains another range or a specific cell.
            *
            * @param r The CellRange object or row index to find.
            * @param c The column index (required if the r parameter is not a CellRange object).
            */
            CellRange.prototype.contains = function (r, c) {
                // check other cell range
                var rng = wijmo.tryCast(r, CellRange);
                if (rng) {
                    return rng.topRow >= this.topRow && rng.bottomRow <= this.bottomRow && rng.leftCol >= this.leftCol && rng.rightCol <= this.rightCol;
                }

                // check specific cell
                if (wijmo.isInt(r) && wijmo.isInt(c)) {
                    return r >= this.topRow && r <= this.bottomRow && c >= this.leftCol && c <= this.rightCol;
                }

                throw 'contains expects a CellRange or row/column indices.';
            };

            /**
            * Checks whether the range contains a given row.
            *
            * @param r The index of the row to find.
            */
            CellRange.prototype.containsRow = function (r) {
                return wijmo.asInt(r) >= this.topRow && r <= this.bottomRow;
            };

            /**
            * Checks whether the range contains a given column.
            *
            * @param c The index of the column to find.
            */
            CellRange.prototype.containsColumn = function (c) {
                return wijmo.asInt(c) >= this.leftCol && c <= this.rightCol;
            };

            /**
            * Checks whether the range intersects another range.
            *
            * @param rng The CellRange object to check.
            */
            CellRange.prototype.intersects = function (rng) {
                return this.intersectsRow(rng) && this.intersectsColumn(rng);
            };

            /**
            * Checks whether the range intersects the rows in another range.
            *
            * @param rng The CellRange object to check.
            */
            CellRange.prototype.intersectsRow = function (rng) {
                return rng && !(this.bottomRow < rng.topRow || this.topRow > rng.bottomRow);
            };

            /**
            * Checks whether the range intersects the columns in another range.
            *
            * @param rng The CellRange object to check.
            */
            CellRange.prototype.intersectsColumn = function (rng) {
                return rng && !(this.rightCol < rng.leftCol || this.leftCol > rng.rightCol);
            };

            /**
            * Gets the rendered size of this range.
            *
            * @param p The @see:GridPanel object that contains the range.
            * @return A @see:Size object that represents the sum of row heights and column widths in the range.
            */
            CellRange.prototype.getRenderSize = function (p) {
                var sz = new wijmo.Size(0, 0);
                if (this.isValid) {
                    for (var r = this.topRow; r <= this.bottomRow; r++) {
                        sz.height += p.rows[r].renderSize;
                    }
                    for (var c = this.leftCol; c <= this.rightCol; c++) {
                        sz.width += p.columns[c].renderSize;
                    }
                }
                return sz;
            };

            /**
            * Checks whether the range equals another range.
            *
            * @param rng The CellRange object to compare to this range.
            */
            CellRange.prototype.equals = function (rng) {
                return (rng instanceof CellRange) && this._row == rng._row && this._col == rng._col && this._row2 == rng._row2 && this._col2 == rng._col2;
            };
            return CellRange;
        })();
        grid.CellRange = CellRange;
    })(wijmo.grid || (wijmo.grid = {}));
    var grid = wijmo.grid;
})(wijmo || (wijmo = {}));
//# sourceMappingURL=CellRange.js.map

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var wijmo;
(function (wijmo) {
    (function (_grid) {
        'use strict';

        /**
        * Flags that specify the state of a grid row or column.
        */
        (function (RowColFlags) {
            /** The row or column is visible. */
            RowColFlags[RowColFlags["Visible"] = 1] = "Visible";

            /** The row or column can be resized. */
            RowColFlags[RowColFlags["AllowResizing"] = 2] = "AllowResizing";

            /** The row or column can be dragged to a new position with the mouse. */
            RowColFlags[RowColFlags["AllowDragging"] = 4] = "AllowDragging";

            /** The row or column can contain merged cells. */
            RowColFlags[RowColFlags["AllowMerging"] = 8] = "AllowMerging";

            /** The column can be sorted by clicking its header with the mouse. */
            RowColFlags[RowColFlags["AllowSorting"] = 16] = "AllowSorting";

            /** The column was generated automatically. */
            RowColFlags[RowColFlags["AutoGenerated"] = 32] = "AutoGenerated";

            /** The group row is collapsed. */
            RowColFlags[RowColFlags["Collapsed"] = 64] = "Collapsed";

            /** The row has a parent group that is collapsed. */
            RowColFlags[RowColFlags["ParentCollapsed"] = 128] = "ParentCollapsed";

            /** The row or column is selected. */
            RowColFlags[RowColFlags["Selected"] = 256] = "Selected";

            /** The row or column is read-only (cannot be edited). */
            RowColFlags[RowColFlags["ReadOnly"] = 512] = "ReadOnly";

            /** Cells in this row or column contain HTML text. */
            RowColFlags[RowColFlags["HtmlContent"] = 1024] = "HtmlContent";

            /** Cells in this row or column may contain wrapped text. */
            RowColFlags[RowColFlags["WordWrap"] = 2048] = "WordWrap";

            /** Default settings for new rows. */
            RowColFlags[RowColFlags["RowDefault"] = RowColFlags.Visible | RowColFlags.AllowResizing] = "RowDefault";

            /** Default settings for new columns. */
            RowColFlags[RowColFlags["ColumnDefault"] = RowColFlags.Visible | RowColFlags.AllowDragging | RowColFlags.AllowResizing | RowColFlags.AllowSorting] = "ColumnDefault";
        })(_grid.RowColFlags || (_grid.RowColFlags = {}));
        var RowColFlags = _grid.RowColFlags;

        /**
        * An abstract class that serves as a base for the @see:Row and @see:Column classes.
        */
        var RowCol = (function () {
            function RowCol() {
                this._list = null;
                this._pos = 0;
                this._idx = -1;
            }
            Object.defineProperty(RowCol.prototype, "visible", {
                /**
                * Gets or sets a value that indicates whether the row or column is visible.
                */
                get: function () {
                    return this._getFlag(1 /* Visible */);
                },
                set: function (value) {
                    this._setFlag(1 /* Visible */, value);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(RowCol.prototype, "isVisible", {
                /**
                * Gets a value that indicates whether the row or column is visible and not collapsed.
                *
                * This property is read-only. To change the visibility of a
                * row or column, use the @see:visible property instead.
                */
                get: function () {
                    // if visible is false, we're not visible
                    if (!this._getFlag(1 /* Visible */)) {
                        return false;
                    }

                    // if the parent node is collapsed and this is not a new row, we're not visible
                    if (this._getFlag(128 /* ParentCollapsed */) && !(this instanceof _grid._NewRowTemplate)) {
                        return false;
                    }

                    // looks like we're visible
                    return true;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(RowCol.prototype, "pos", {
                /**
                * Gets the position of the row or column.
                */
                get: function () {
                    if (this._list)
                        this._list._update();
                    return this._pos;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(RowCol.prototype, "index", {
                /**
                * Gets the index of the row or column in the parent collection.
                */
                get: function () {
                    if (this._list)
                        this._list._update();
                    return this._idx;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(RowCol.prototype, "size", {
                /**
                * Gets or sets the size of the row or column.
                * Setting this property to null or negative values causes the element to use the
                * parent collection's default size.
                */
                get: function () {
                    return this._sz;
                },
                set: function (value) {
                    if (value != this._sz) {
                        this._sz = wijmo.asNumber(value, true);
                        this.onPropertyChanged();
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(RowCol.prototype, "renderSize", {
                /**
                * Gets the render size of the row or column.
                * This property accounts for visibility, default size, and min and max sizes.
                */
                get: function () {
                    if (!this.isVisible) {
                        return 0;
                    }
                    var sz = this._sz, list = this._list;

                    // default size
                    if ((sz == null || sz < 0) && list != null) {
                        return Math.round((list).defaultSize);
                    }

                    // min/max
                    if (list != null) {
                        if (list.minSize != null && sz < list.minSize) {
                            sz = list.minSize;
                        }
                        if (list.maxSize != null && sz > list.maxSize) {
                            sz = list.maxSize;
                        }
                    }
                    if (this._szMin != null && sz < this._szMin) {
                        sz = this._szMin;
                    }
                    if (this._szMax != null && sz > this._szMax) {
                        sz = this._szMax;
                    }

                    // done
                    return Math.round(sz);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(RowCol.prototype, "allowResizing", {
                /**
                * Gets or sets a value that indicates whether the user can resize the row or column with the mouse.
                */
                get: function () {
                    return this._getFlag(2 /* AllowResizing */);
                },
                set: function (value) {
                    this._setFlag(2 /* AllowResizing */, value);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(RowCol.prototype, "allowDragging", {
                /**
                * Gets or sets a value that indicates whether the user can move the row or column to a new position with the mouse.
                */
                get: function () {
                    return this._getFlag(4 /* AllowDragging */);
                },
                set: function (value) {
                    this._setFlag(4 /* AllowDragging */, value);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(RowCol.prototype, "allowMerging", {
                /**
                * Gets or sets a value that indicates whether cells in the row or column can be merged.
                */
                get: function () {
                    return this._getFlag(8 /* AllowMerging */);
                },
                set: function (value) {
                    this._setFlag(8 /* AllowMerging */, value);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(RowCol.prototype, "isSelected", {
                /**
                * Gets or sets a value that indicates whether the row or column is selected.
                */
                get: function () {
                    return this._getFlag(256 /* Selected */);
                },
                set: function (value) {
                    this._setFlag(256 /* Selected */, value);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(RowCol.prototype, "isReadOnly", {
                /**
                * Gets or sets a value that indicates whether cells in the row or column can be edited.
                */
                get: function () {
                    return this._getFlag(512 /* ReadOnly */);
                },
                set: function (value) {
                    this._setFlag(512 /* ReadOnly */, value);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(RowCol.prototype, "isContentHtml", {
                /**
                * Gets or sets a value that indicates whether cells in this row or column
                * contain HTML content rather than plain text.
                */
                get: function () {
                    return this._getFlag(1024 /* HtmlContent */);
                },
                set: function (value) {
                    if (this.isContentHtml != value) {
                        this._setFlag(1024 /* HtmlContent */, value);
                        if (this.grid) {
                            this.grid.invalidate();
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(RowCol.prototype, "wordWrap", {
                /**
                * Gets or sets a value that indicates whether cells in the row or column wrap their content.
                */
                get: function () {
                    return this._getFlag(2048 /* WordWrap */);
                },
                set: function (value) {
                    this._setFlag(2048 /* WordWrap */, value);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(RowCol.prototype, "cssClass", {
                /**
                * Gets or sets a CSS class name to use when rendering
                * non-header cells in the row or column.
                */
                get: function () {
                    return this._cssClass;
                },
                set: function (value) {
                    if (value != this._cssClass) {
                        this._cssClass = wijmo.asString(value);
                        if (this.grid) {
                            this.grid.invalidate(false);
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(RowCol.prototype, "grid", {
                /**
                * Gets the @see:FlexGrid that owns the row or column.
                */
                get: function () {
                    return this._list ? this._list._g : null;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(RowCol.prototype, "collectionView", {
                /**
                * Gets the @see:ICollectionView bound to this row or column.
                */
                get: function () {
                    return this.grid ? this.grid.collectionView : null;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Marks the owner list as dirty and refreshes the owner grid.
            */
            RowCol.prototype.onPropertyChanged = function () {
                if (this._list) {
                    this._list._dirty = true;
                    this.grid.invalidate();
                }
            };

            // Gets the value of a flag.
            RowCol.prototype._getFlag = function (flag) {
                return (this._f & flag) != 0;
            };

            // Sets the value of a flag, with optional notification.
            RowCol.prototype._setFlag = function (flag, value, quiet) {
                if (value != this._getFlag(flag)) {
                    this._f = value ? (this._f | flag) : (this._f & ~flag);
                    if (!quiet) {
                        this.onPropertyChanged();
                    }
                    return true;
                }
                return false;
            };
            return RowCol;
        })();
        _grid.RowCol = RowCol;

        /**
        * Represents a column on the grid.
        */
        var Column = (function (_super) {
            __extends(Column, _super);
            /**
            * Initializes a new instance of a @see:Column.
            *
            * @param options Initialization options for the column.
            */
            function Column(options) {
                _super.call(this);
                this._f = RowColFlags.ColumnDefault;
                this._hash = Column._ctr.toString(36); // unique column key (used for unbound rows)
                Column._ctr++;
                if (options) {
                    wijmo.copy(this, options);
                }
            }
            Object.defineProperty(Column.prototype, "name", {
                /**
                * Gets or sets the name of the column.
                *
                * The column name can be used to retrieve the column using the @see:getColumn method.
                */
                get: function () {
                    return this._name;
                },
                set: function (value) {
                    this._name = value;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Column.prototype, "dataType", {
                /**
                * Gets or sets the type of value stored in the column.
                *
                * Values are coerced into the proper type when editing the grid.
                */
                get: function () {
                    return this._type;
                },
                set: function (value) {
                    if (this._type != value) {
                        this._type = wijmo.asEnum(value, wijmo.DataType);
                        if (this.grid) {
                            this.grid.invalidate();
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Column.prototype, "required", {
                /**
                * Gets or sets a value that determines whether values in the column
                * are required.
                *
                * By default, this property is set to null, which means values
                * are required, but string columns may contain empty strings.
                *
                * When set to true, values are required and empty strings are
                * not allowed.
                *
                * When set to false, null values and empty strings are allowed.
                */
                get: function () {
                    return this._required;
                },
                set: function (value) {
                    this._required = wijmo.asBoolean(value, true);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Column.prototype, "showDropDown", {
                /**
                * Gets or sets a value that indicates whether the grid adds drop-down buttons to the
                * cells in this column.
                *
                * The drop-down buttons are shown only if the column has a @see:dataMap
                * set and is editable. Clicking on the drop-down buttons causes the grid
                * to show a list where users can select the value for the cell.
                *
                * Cell drop-downs require the wijmo.input module to be loaded.
                */
                get: function () {
                    return this._showDropDown;
                },
                set: function (value) {
                    if (value != this._showDropDown) {
                        this._showDropDown = wijmo.asBoolean(value, true);
                        if (this.grid) {
                            this.grid.invalidate();
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Column.prototype, "dropDownCssClass", {
                /**
                * Gets or sets a CSS class name to add to drop-downs in this column.
                *
                * The drop-down buttons are shown only if the column has a @see:dataMap
                * set and is editable. Clicking on the drop-down buttons causes the grid
                * to show a list where users can select the value for the cell.
                *
                * Cell drop-downs require the wijmo.input module to be loaded.
                */
                get: function () {
                    return this._ddCssClass;
                },
                set: function (value) {
                    this._ddCssClass = wijmo.asString(value);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Column.prototype, "inputType", {
                /**
                * Gets or sets the "type" attribute of the HTML input element used to edit values
                * in this column.
                *
                * By default, this property is set to "tel" for numeric columns, and to "text" for
                * all other non-boolean column types. The "tel" input type causes mobile devices
                * to show a numeric keyboard that includes a negative sign and a decimal separator.
                *
                * Use this property to change the default setting if the default does not work well
                * for the current culture, device, or application. In these cases, try setting the
                * property to "number" or simply "text."
                */
                get: function () {
                    return this._inpType;
                },
                set: function (value) {
                    this._inpType = wijmo.asString(value, true);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Column.prototype, "mask", {
                /**
                * Gets or sets a mask to use while editing values in this column.
                *
                * The mask format is the same used by the @see:wijmo.input.InputMask
                * control.
                *
                * If specified, the mask must be compatible with the value of
                * the @see:format property. For example, the mask '99/99/9999' can
                * be used for entering dates formatted as 'MM/dd/yyyy'.
                */
                get: function () {
                    return this._mask;
                },
                set: function (value) {
                    this._mask = wijmo.asString(value, true);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Column.prototype, "binding", {
                /**
                * Gets or sets the name of the property the column is bound to.
                */
                get: function () {
                    return this._binding ? this._binding.path : null;
                },
                set: function (value) {
                    if (value != this.binding) {
                        var path = wijmo.asString(value);
                        this._binding = path ? new wijmo.Binding(path) : null;
                        if (!this._type && this.grid && this._binding) {
                            var cv = this.grid.collectionView;
                            if (cv && cv.sourceCollection && cv.sourceCollection.length) {
                                var item = cv.sourceCollection[0];
                                this._type = wijmo.getType(this._binding.getValue(item));
                            }
                        }
                        this.onPropertyChanged();
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Column.prototype, "sortMemberPath", {
                /**
                * Gets or sets the name of the property to use when sorting this column.
                *
                * Use this property in cases where you want the sorting to be performed
                * based on values other than the ones specified by the @see:binding property.
                *
                * Setting this property is null causes the grid to use the value of the
                * @see:binding property to sort the column.
                */
                get: function () {
                    return this._bindingSort ? this._bindingSort.path : null;
                },
                set: function (value) {
                    if (value != this.sortMemberPath) {
                        var path = wijmo.asString(value);
                        this._bindingSort = path ? new wijmo.Binding(path) : null;
                        this.onPropertyChanged();
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Column.prototype, "width", {
                /**
                * Gets or sets the width of the column.
                *
                * Column widths may be positive numbers (sets the column width in pixels),
                * null or negative numbers (uses the collection's default column width), or
                * strings in the format '{number}*' (star sizing).
                *
                * The star-sizing option performs a XAML-style dynamic sizing where column
                * widths are proportional to the number before the star. For example, if
                * a grid has three columns with widths "100", "*", and "3*", the first column
                * will be 100 pixels wide, the second will take up 1/4th of the remaining
                * space, and the last will take up the remaining 3/4ths of the remaining space.
                *
                * Star-sizing allows you to define columns that automatically stretch to fill
                * the width available. For example, set the width of the last column to "*"
                * and it will automatically extend to fill the entire grid width so there's
                * no empty space. You may also want to set the column's @see:minWidth property
                * to prevent the column from getting too narrow.
                */
                get: function () {
                    if (this._szStar != null) {
                        return this._szStar;
                    } else {
                        return this.size;
                    }
                },
                set: function (value) {
                    if (Column._parseStarSize(value) != null) {
                        this._szStar = value;
                        this.onPropertyChanged();
                    } else {
                        this._szStar = null;
                        this.size = wijmo.asNumber(value, true);
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Column.prototype, "minWidth", {
                /**
                * Gets or sets the minimum width of the column.
                */
                get: function () {
                    return this._szMin;
                },
                set: function (value) {
                    if (value != this._szMin) {
                        this._szMin = wijmo.asNumber(value, true, true);
                        this.onPropertyChanged();
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Column.prototype, "maxWidth", {
                /**
                * Gets or sets the maximum width of the column.
                */
                get: function () {
                    return this._szMax;
                },
                set: function (value) {
                    if (value != this._szMax) {
                        this._szMax = wijmo.asNumber(value, true, true);
                        this.onPropertyChanged();
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Column.prototype, "renderWidth", {
                /**
                * Gets the render width of the column.
                *
                * The value returned takes into account the column's visibility, default size, and min and max sizes.
                */
                get: function () {
                    return this.renderSize;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Column.prototype, "align", {
                /**
                * Gets or sets the horizontal alignment of items in the column.
                *
                * The default value for this property is null, which causes the grid to select
                * the alignment automatically based on the column's @see:dataType (numbers are
                * right-aligned, Boolean values are centered, and other types are left-aligned).
                *
                * If you want to override the default alignment, set this property
                * to 'left,' 'right,' or 'center,'
                */
                get: function () {
                    return this._align;
                },
                set: function (value) {
                    if (this._align != value) {
                        this._align = value;
                        this.onPropertyChanged();
                    }
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Gets the actual column alignment.
            *
            * Returns the value of the @see:align property if it is not null, or
            * selects the alignment based on the column's @see:dataType.
            */
            Column.prototype.getAlignment = function () {
                var value = this._align;
                if (value == null) {
                    value = '';
                    if (!this._map) {
                        switch (this._type) {
                            case 3 /* Boolean */:
                                value = 'center';
                                break;
                            case 2 /* Number */:
                                value = 'right';
                                break;
                        }
                    }
                }
                return value;
            };

            Object.defineProperty(Column.prototype, "header", {
                /**
                * Gets or sets the text displayed in the column header.
                */
                get: function () {
                    return this._hdr ? this._hdr : this.binding;
                },
                set: function (value) {
                    if (this._hdr != value) {
                        this._hdr = value;
                        this.onPropertyChanged();
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Column.prototype, "dataMap", {
                /**
                * Gets or sets the @see:DataMap used to convert raw values into display
                * values for the column.
                *
                * Columns with an associated @see:dataMap show drop-down buttons that
                * can be used for quick editing. If you do not want to show the drop-down
                * buttons, set the column's @see:showDropDown property to false.
                *
                * Cell drop-downs require the wijmo.input module to be loaded.
                */
                get: function () {
                    return this._map;
                },
                set: function (value) {
                    if (this._map != value) {
                        // disconnect old map
                        if (this._map) {
                            this._map.mapChanged.removeHandler(this.onPropertyChanged, this);
                        }

                        // convert arrays into DataMaps
                        if (wijmo.isArray(value)) {
                            value = new _grid.DataMap(value, null, null);
                        }

                        // set new map
                        this._map = wijmo.asType(value, _grid.DataMap, true);

                        // connect new map
                        if (this._map) {
                            this._map.mapChanged.addHandler(this.onPropertyChanged, this);
                        }
                        this.onPropertyChanged();
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Column.prototype, "format", {
                /**
                * Gets or sets the format string used to convert raw values into display
                * values for the column (see @see:wijmo.Globalize).
                */
                get: function () {
                    return this._fmt;
                },
                set: function (value) {
                    if (this._fmt != value) {
                        this._fmt = value;
                        this.onPropertyChanged();
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Column.prototype, "allowSorting", {
                /**
                * Gets or sets a value that indicates whether the user can sort the column by clicking its header.
                */
                get: function () {
                    return this._getFlag(16 /* AllowSorting */);
                },
                set: function (value) {
                    this._setFlag(16 /* AllowSorting */, value);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Column.prototype, "currentSort", {
                /**
                * Gets a string that describes the current sorting applied to the column.
                * Possible values are '+' for ascending order, '-' for descending order, or
                * null for unsorted columns.
                */
                get: function () {
                    if (this.grid && this.grid.collectionView && this.grid.collectionView.canSort) {
                        var sds = this.grid.collectionView.sortDescriptions;
                        for (var i = 0; i < sds.length; i++) {
                            if (sds[i].property == this._getBindingSort()) {
                                return sds[i].ascending ? '+' : '-';
                            }
                        }
                    }
                    return null;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Column.prototype, "aggregate", {
                /**
                * Gets or sets the @see:Aggregate to display in the group header rows
                * for the column.
                */
                get: function () {
                    return this._agg != null ? this._agg : 0 /* None */;
                },
                set: function (value) {
                    if (value != this._agg) {
                        this._agg = wijmo.asEnum(value, wijmo.Aggregate);
                        this.onPropertyChanged();
                    }
                },
                enumerable: true,
                configurable: true
            });

            // gets the binding used for sorting (sortMemberPath if specified, binding ow)
            /*protected*/ Column.prototype._getBindingSort = function () {
                return this.sortMemberPath ? this.sortMemberPath : this.binding ? this.binding : null;
            };

            // parses a string in the format '<number>*' and returns the number (or null if the parsing fails).
            Column._parseStarSize = function (value) {
                if (wijmo.isString(value) && value.length > 0 && value[value.length - 1] == '*') {
                    var sz = value.length == 1 ? 1 : value.substr(0, value.length - 1) * 1;
                    if (sz > 0 && !isNaN(sz)) {
                        return sz;
                    }
                }
                return null;
            };
            Column._ctr = 0;
            return Column;
        })(RowCol);
        _grid.Column = Column;

        /**
        * Represents a row in the grid.
        */
        var Row = (function (_super) {
            __extends(Row, _super);
            /**
            * Initializes a new instance of a @see:Row.
            *
            * @param dataItem The data item that this row is bound to.
            */
            function Row(dataItem) {
                _super.call(this);
                this._f = RowColFlags.ColumnDefault;
                this._data = dataItem;
            }
            Object.defineProperty(Row.prototype, "dataItem", {
                /**
                * Gets or sets the item in the data collection that the item is bound to.
                */
                get: function () {
                    return this._data;
                },
                set: function (value) {
                    this._data = value;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Row.prototype, "height", {
                /**
                * Gets or sets the height of the row.
                * Setting this property to null or negative values causes the element to use the
                * parent collection's default size.
                */
                get: function () {
                    return this.size;
                },
                set: function (value) {
                    this.size = value;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Row.prototype, "renderHeight", {
                /**
                * Gets the render height of the row.
                *
                * The value returned takes into account the row's visibility, default size, and min and max sizes.
                */
                get: function () {
                    return this.renderSize;
                },
                enumerable: true,
                configurable: true
            });
            return Row;
        })(RowCol);
        _grid.Row = Row;

        /**
        * Represents a row that serves as a header for a group of rows.
        */
        var GroupRow = (function (_super) {
            __extends(GroupRow, _super);
            /**
            * Initializes a new instance of a @see:GroupRow.
            */
            function GroupRow() {
                _super.call(this);
                this._level = -1;
                this.isReadOnly = true; // group rows are read-only by default
            }
            Object.defineProperty(GroupRow.prototype, "level", {
                /**
                * Gets or sets the hierarchical level of the group associated with the GroupRow.
                */
                get: function () {
                    return this._level;
                },
                set: function (value) {
                    wijmo.asInt(value);
                    if (value != this._level) {
                        this._level = value;
                        this.onPropertyChanged();
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(GroupRow.prototype, "hasChildren", {
                /**
                * Gets a value that indicates whether the group row has child rows.
                */
                get: function () {
                    if (this.grid != null && this._list != null) {
                        // get the next row
                        this._list._update();
                        var rNext = this.index < this._list.length - 1 ? this._list[this.index + 1] : null;

                        // check if it's a group row or a new row template
                        var gr = wijmo.tryCast(rNext, GroupRow), nr = wijmo.tryCast(rNext, _grid._NewRowTemplate);

                        // return true if there is a next row and it's a data row or a deeper group row
                        return rNext && nr == null && (gr == null || gr.level > this.level);
                    }
                    return true;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(GroupRow.prototype, "isCollapsed", {
                /**
                * Gets or sets a value that indicates whether the GroupRow is collapsed
                * (child rows are hidden) or expanded (child rows are visible).
                */
                get: function () {
                    return this._getFlag(64 /* Collapsed */);
                },
                set: function (value) {
                    wijmo.asBoolean(value);
                    if (value != this.isCollapsed && this._list != null) {
                        this._setCollapsed(value);
                    }
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Gets the header text for this @see:GroupRow.
            */
            GroupRow.prototype.getGroupHeader = function () {
                var grid = this.grid, fmt = grid.groupHeaderFormat ? grid.groupHeaderFormat : wijmo.culture.FlexGrid.groupHeaderFormat, group = wijmo.tryCast(this.dataItem, wijmo.collections.CollectionViewGroup);
                if (group && fmt) {
                    // get group info
                    var propName = group.groupDescription['propertyName'], value = group.name, col = grid.columns.getColumn(propName);

                    // customize with column info if possible
                    var isHtml = this.isContentHtml;
                    if (col) {
                        isHtml = isHtml || col.isContentHtml;
                        if (col.header) {
                            propName = col.header;
                        }
                        if (col.dataMap) {
                            value = col.dataMap.getDisplayValue(value);
                        } else if (col.format) {
                            value = wijmo.Globalize.format(value, col.format);
                        }
                    }

                    // build header text
                    return wijmo.format(fmt, {
                        name: wijmo.escapeHtml(propName),
                        value: isHtml ? value : wijmo.escapeHtml(value),
                        level: group.level,
                        count: group.items.length
                    });
                }
                return '';
            };

            // sets the collapsed/expanded state of a group row
            GroupRow.prototype._setCollapsed = function (collapsed) {
                var _this = this;
                var g = this.grid, rows = g.rows, rng = this.getCellRange(), e = new _grid.CellRangeEventArgs(g.cells, new _grid.CellRange(this.index, -1)), gr;

                // fire GroupCollapsedChanging
                g.onGroupCollapsedChanging(e);

                // if user canceled, or edits failed, bail out
                if (e.cancel) {
                    return;
                }

                // apply new value
                g.deferUpdate(function () {
                    // collapse/expand this group
                    _this._setFlag(64 /* Collapsed */, collapsed);
                    for (var r = rng.topRow + 1; r <= rng.bottomRow && r > -1 && r < rows.length; r++) {
                        // apply state to this row
                        rows[r]._setFlag(128 /* ParentCollapsed */, collapsed);

                        // if this is a group, skip range to preserve the original state
                        gr = wijmo.tryCast(rows[r], GroupRow);
                        if (gr != null && gr.isCollapsed) {
                            r = gr.getCellRange().bottomRow;
                        }
                    }
                });

                // fire GroupCollapsedChanged
                g.onGroupCollapsedChanged(e);
            };

            /**
            * Gets a CellRange object that contains all of the rows in the group represented
            * by the GroupRow and all of the columns in the grid.
            */
            GroupRow.prototype.getCellRange = function () {
                var rows = this._list, top = this.index, bottom = rows.length - 1;
                for (var r = top + 1; r <= bottom; r++) {
                    var gr = wijmo.tryCast(rows[r], GroupRow);
                    if (gr != null && gr.level <= this.level) {
                        bottom = r - 1;
                        break;
                    }
                }
                return new _grid.CellRange(top, 0, bottom, this.grid.columns.length - 1);
            };
            return GroupRow;
        })(Row);
        _grid.GroupRow = GroupRow;

        /**
        * Abstract class that serves as a base for row and column collections.
        */
        var RowColCollection = (function (_super) {
            __extends(RowColCollection, _super);
            /**
            * Initializes a new instance of a @see:_RowColCollection.
            *
            * @param grid The @see:FlexGrid that owns the collection.
            * @param defaultSize The default size of the elements in the collection.
            */
            function RowColCollection(grid, defaultSize) {
                _super.call(this);
                this._frozen = 0;
                this._szDef = 28;
                this._szTot = 0;
                this._dirty = false;
                this._g = wijmo.asType(grid, _grid.FlexGrid);
                this._szDef = wijmo.asNumber(defaultSize, false, true);
            }
            Object.defineProperty(RowColCollection.prototype, "defaultSize", {
                /**
                * Gets or sets the default size of elements in the collection.
                */
                get: function () {
                    return this._szDef;
                },
                set: function (value) {
                    if (this._szDef != value) {
                        this._szDef = wijmo.asNumber(value, false, true);
                        this._dirty = true;
                        this._g.invalidate();
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(RowColCollection.prototype, "frozen", {
                /**
                * Gets or sets the number of frozen rows or columns in the collection.
                *
                * Frozen rows and columns do not scroll, and instead remain at the top or left of
                * the grid, next to the fixed cells. Unlike fixed cells, however, frozen
                * cells may be selected and edited like regular cells.
                */
                get: function () {
                    return this._frozen;
                },
                set: function (value) {
                    if (value != this._frozen) {
                        this._frozen = wijmo.asNumber(value, false, true);
                        this._dirty = true;
                        this._g.invalidate();
                    }
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Checks whether a row or column is frozen.
            *
            * @param index The index of the row or column to check.
            */
            RowColCollection.prototype.isFrozen = function (index) {
                return index < this.frozen;
            };

            Object.defineProperty(RowColCollection.prototype, "minSize", {
                /**
                * Gets or sets the minimum size of elements in the collection.
                */
                get: function () {
                    return this._szMin;
                },
                set: function (value) {
                    if (value != this._szMin) {
                        this._szMin = wijmo.asNumber(value, true, true);
                        this._dirty = true;
                        this._g.invalidate();
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(RowColCollection.prototype, "maxSize", {
                /**
                * Gets or sets the maximum size of elements in the collection.
                */
                get: function () {
                    return this._szMax;
                },
                set: function (value) {
                    if (value != this._szMax) {
                        this._szMax = wijmo.asNumber(value, true, true);
                        this._dirty = true;
                        this._g.invalidate();
                    }
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Gets the total size of the elements in the collection.
            */
            RowColCollection.prototype.getTotalSize = function () {
                this._update();
                return this._szTot;
            };

            /**
            * Gets the index of the element at a given physical position.
            * @param position Position of the item in the collection, in pixels.
            */
            RowColCollection.prototype.getItemAt = function (position) {
                // update if necessary
                this._update();

                // shortcut for common case
                if (position <= 0 && this.length > 0) {
                    return 0;
                }

                // binary search
                // REVIEW: is this worth it? might be better to use a simpler method?
                var min = 0, max = this.length - 1, cur, item;
                while (min <= max) {
                    cur = (min + max) >>> 1;
                    item = this[cur];
                    if (item._pos > position) {
                        max = cur - 1;
                    } else if (item._pos + item.renderSize < position) {
                        min = cur + 1;
                    } else {
                        return cur;
                    }
                }

                // not found, return max
                return max;
            };

            /**
            * Finds the next visible cell for a selection change.
            * @param index Starting index for the search.
            * @param move Type of move (size and direction).
            * @param pageSize Size of a page (in case the move is a page up/down).
            */
            RowColCollection.prototype.getNextCell = function (index, move, pageSize) {
                var i, item;
                switch (move) {
                    case 1 /* Next */:
                        for (i = index + 1; i < this.length; i++) {
                            if (this[i].renderSize > 0)
                                return i;
                        }
                        break;
                    case 2 /* Prev */:
                        for (i = index - 1; i >= 0; i--) {
                            if (this[i].renderSize > 0)
                                return i;
                        }
                        break;
                    case 6 /* End */:
                        for (i = this.length - 1; i >= 0; i--) {
                            if (this[i].renderSize > 0)
                                return i;
                        }
                        break;
                    case 5 /* Home */:
                        for (i = 0; i < this.length; i++) {
                            if (this[i].renderSize > 0)
                                return i;
                        }
                        break;
                    case 3 /* NextPage */:
                        item = this.getItemAt(this[index].pos + pageSize);
                        return item < 0 ? this.getNextCell(index, 6 /* End */, pageSize) : item;
                    case 4 /* PrevPage */:
                        item = this.getItemAt(this[index].pos - pageSize);
                        return item < 0 ? this.getNextCell(index, 5 /* Home */, pageSize) : item;
                }
                return index;
            };

            /**
            * Checks whether an element can be moved from one position to another.
            *
            * @param src The index of the element to move.
            * @param dst The position to which to move the element, or specify -1 to append the element.
            * @return Returns true if the move is valid, false otherwise.
            */
            RowColCollection.prototype.canMoveElement = function (src, dst) {
                // no move?
                if (dst == src) {
                    return false;
                }

                // invalid move?
                if (src < 0 || src >= this.length || dst >= this.length) {
                    return false;
                }

                // illegal move?
                if (dst < 0)
                    dst = this.length - 1;
                var start = Math.min(src, dst), end = Math.max(src, dst);
                for (var i = start; i <= end; i++) {
                    if (!this[i].allowDragging) {
                        return false;
                    }
                }

                // can't move anything past the new row template (TFS 109012)
                if (this[dst] instanceof _grid._NewRowTemplate) {
                    return false;
                }

                // all seems OK
                return true;
            };

            /**
            * Moves an element from one position to another.
            * @param src Index of the element to move.
            * @param dst Position where the element should be moved to (-1 to append).
            */
            RowColCollection.prototype.moveElement = function (src, dst) {
                if (this.canMoveElement(src, dst)) {
                    var e = this[src];
                    this.removeAt(src);
                    if (dst < 0)
                        dst = this.length;
                    this.insert(dst, e);
                }
            };

            /**
            * Keeps track of dirty state and invalidate grid on changes.
            */
            RowColCollection.prototype.onCollectionChanged = function (e) {
                if (typeof e === "undefined") { e = wijmo.collections.NotifyCollectionChangedEventArgs.reset; }
                this._dirty = true;
                this._g.invalidate();
                _super.prototype.onCollectionChanged.call(this, e);
            };

            /**
            * Appends an item to the array.
            *
            * @param item Item to add to the array.
            * @return The new length of the array.
            */
            RowColCollection.prototype.push = function (item) {
                item._list = this;
                return _super.prototype.push.call(this, item);
            };

            /**
            * Removes or adds items to the array.
            *
            * @param index Position where items are added or removed.
            * @param count Number of items to remove from the array.
            * @param item Item to add to the array.
            * @return An array containing the removed elements.
            */
            RowColCollection.prototype.splice = function (index, count, item) {
                if (item) {
                    item._list = this;
                }
                return _super.prototype.splice.call(this, index, count, item);
            };

            /**
            * Suspends notifications until the next call to @see:endUpdate.
            */
            RowColCollection.prototype.beginUpdate = function () {
                // make sure we're up-to-date before suspending the updates
                this._update();

                // OK, now it's OK to suspend things
                _super.prototype.beginUpdate.call(this);
            };

            // updates the index, size and position of the elements in the array.
            RowColCollection.prototype._update = function () {
                // update only if we're dirty *and* if the collection is not in an update block.
                // this is important for performance, especially when expanding/collapsing nodes.
                if (this._dirty && !this.isUpdating) {
                    this._dirty = false;
                    var pos = 0, rc;
                    for (var i = 0; i < this.length; i++) {
                        rc = this[i];
                        rc._idx = i;
                        rc._list = this;
                        rc._pos = pos;
                        pos += rc.renderSize;
                    }
                    this._szTot = pos;
                    return true;
                }
                return false;
            };
            return RowColCollection;
        })(wijmo.collections.ObservableArray);
        _grid.RowColCollection = RowColCollection;

        /**
        * Represents a collection of @see:Column objects in a @see:FlexGrid control.
        */
        var ColumnCollection = (function (_super) {
            __extends(ColumnCollection, _super);
            function ColumnCollection() {
                _super.apply(this, arguments);
                this._firstVisible = -1;
            }
            /**
            * Gets a column by name or by binding.
            *
            * The method searches the column by name. If a column with the given name
            * is not found, it searches by binding. The searches are case-sensitive.
            *
            * @param name The name or binding to find.
            * @return The column with the specified name or binding, or null if not found.
            */
            ColumnCollection.prototype.getColumn = function (name) {
                var index = this.indexOf(name);
                return index > -1 ? this[index] : null;
            };

            /**
            * Gets the index of a column by name or binding.
            *
            * The method searches the column by name. If a column with the given name
            * is not found, it searches by binding. The searches are case-sensitive.
            *
            * @param name The name or binding to find.
            * @return The index of column with the specified name or binding, or -1 if not found.
            */
            ColumnCollection.prototype.indexOf = function (name) {
                // direct lookup
                if (name instanceof Column) {
                    return _super.prototype.indexOf.call(this, name);
                }

                for (var i = 0; i < this.length; i++) {
                    if (this[i].name == name) {
                        return i;
                    }
                }

                for (var i = 0; i < this.length; i++) {
                    if (this[i].binding == name) {
                        return i;
                    }
                }
                return -1;
            };

            Object.defineProperty(ColumnCollection.prototype, "firstVisibleIndex", {
                /**
                * Gets the index of the first visible column (where the outline tree is displayed).
                */
                get: function () {
                    this._update();
                    return this._firstVisible;
                },
                enumerable: true,
                configurable: true
            });

            // override to keep track of first visible column (and later to handle star sizes)
            ColumnCollection.prototype._update = function () {
                if (_super.prototype._update.call(this)) {
                    this._firstVisible = -1;
                    for (var i = 0; i < this.length; i++) {
                        if ((this[i]).visible) {
                            this._firstVisible = i;
                            break;
                        }
                    }
                    return true;
                }
                return false;
            };

            // update the width of the columns with star sizes
            ColumnCollection.prototype._updateStarSizes = function (szAvailable) {
                var starCount = 0, col, lastStarCol, lastWidth;

                for (var i = 0; i < this.length; i++) {
                    col = this[i];
                    if (col.isVisible) {
                        if (col._szStar) {
                            starCount += Column._parseStarSize(col._szStar);
                            lastStarCol = col;
                        } else {
                            szAvailable -= col.renderWidth;
                        }
                    }
                }

                // update width of star columns
                if (lastStarCol != null) {
                    lastWidth = szAvailable;
                    for (var i = 0; i < this.length; i++) {
                        col = this[i];
                        if (col.isVisible) {
                            if (col._szStar) {
                                if (col == lastStarCol) {
                                    col._sz = lastWidth; // to avoid round-off errors...
                                } else {
                                    col._sz = Math.max(0, Math.round(Column._parseStarSize(col._szStar) / starCount * szAvailable));
                                    lastWidth -= col.renderWidth;
                                }
                            }
                        }
                    }
                    this._dirty = true;
                    this._update();
                    return true;
                }

                // no star sizes...
                return false;
            };
            return ColumnCollection;
        })(RowColCollection);
        _grid.ColumnCollection = ColumnCollection;

        /**
        * Represents a collection of @see:Row objects in a @see:FlexGrid control.
        */
        var RowCollection = (function (_super) {
            __extends(RowCollection, _super);
            function RowCollection() {
                _super.apply(this, arguments);
                this._maxLevel = -1;
            }
            Object.defineProperty(RowCollection.prototype, "maxGroupLevel", {
                /**
                * Gets the maximum group level in the grid.
                *
                * @return The maximum group level or -1 if the grid has no group rows.
                */
                get: function () {
                    this._update();
                    return this._maxLevel;
                },
                enumerable: true,
                configurable: true
            });

            // override to keep track of the maximum group level
            RowCollection.prototype._update = function () {
                if (_super.prototype._update.call(this)) {
                    this._maxLevel = -1;
                    for (var i = 0; i < this.length; i++) {
                        var gr = wijmo.tryCast(this[i], GroupRow);
                        if (gr && gr.level > this._maxLevel) {
                            this._maxLevel = gr.level;
                        }
                    }
                    return true;
                }
                return false;
            };
            return RowCollection;
        })(RowColCollection);
        _grid.RowCollection = RowCollection;
    })(wijmo.grid || (wijmo.grid = {}));
    var grid = wijmo.grid;
})(wijmo || (wijmo = {}));
//# sourceMappingURL=RowCol.js.map

var wijmo;
(function (wijmo) {
    (function (_grid) {
        'use strict';

        /**
        * Contains information about the part of a @see:FlexGrid control that exists at
        * a specified page coordinate.
        */
        var HitTestInfo = (function () {
            /**
            * Initializes a new instance of a @see:HitTestInfo object.
            *
            * @param grid The @see:FlexGrid control or @see:GridPanel to investigate.
            * @param pt The @see:Point object in page coordinates to investigate.
            */
            function HitTestInfo(grid, pt) {
                this._row = -1;
                this._col = -1;
                this._edge = 0;
                // check parameters
                if (grid instanceof _grid.FlexGrid) {
                    this._g = grid;
                } else if (grid instanceof _grid.GridPanel) {
                    this._p = grid;
                    grid = this._g = this._p.grid;
                } else {
                    throw 'First parameter should be a FlexGrid or GridPanel.';
                }
                pt = wijmo.mouseToPage(pt);
                this._pt = pt.clone();

                // get the variables we need
                var rc = grid.controlRect, sp = grid.scrollPosition, sz = grid.clientSize, tlp = grid.topLeftCells, etl = grid._eTL, hdrVis = grid.headersVisibility, hdrWid = (hdrVis & 2 /* Row */) ? tlp.columns.getTotalSize() : 0, hdrHei = (hdrVis & 1 /* Column */) ? tlp.rows.getTotalSize() : 0, hdrHeiSticky = (hdrVis & 1 /* Column */) ? hdrHei + etl.offsetTop : 0;

                // convert page to control coordinates
                pt.x -= rc.left;
                pt.y -= rc.top;

                // account for right to left
                if (this._g._rtl) {
                    pt.x = rc.width - pt.x;
                }

                // find out which panel was clicked
                if (!this._p && pt.x >= 0 && pt.y >= 0 && sz && pt.x <= sz.width + hdrWid && pt.y <= sz.height + hdrHeiSticky) {
                    if (pt.x <= hdrWid && pt.y <= hdrHeiSticky) {
                        this._p = grid.topLeftCells;
                    } else if (pt.x <= hdrWid) {
                        this._p = grid.rowHeaders;
                    } else if (pt.y <= hdrHeiSticky) {
                        this._p = grid.columnHeaders;
                    } else {
                        this._p = grid.cells;
                    }
                }

                // if we have a panel, get the coordinates
                if (this._p != null) {
                    // account for frozen rows/cols
                    var rows = this._p.rows, cols = this._p.columns, ct = this._p.cellType, totHei = (ct == 2 /* ColumnHeader */ || ct == 4 /* TopLeft */) ? hdrHei : rows.getTotalSize(), totWid = (ct == 3 /* RowHeader */ || ct == 4 /* TopLeft */) ? hdrWid : cols.getTotalSize(), ptFrz = this._p._getFrozenPos();
                    if (ct == 1 /* Cell */ || ct == 3 /* RowHeader */) {
                        pt.y -= hdrHei; // discount header height without 'stickiness'
                        if (pt.y > ptFrz.y) {
                            pt.y -= sp.y;
                            pt.y += this._p._getOffsetY(); // account for IE's css limitations...
                        }
                    }
                    if (ct == 1 /* Cell */ || ct == 2 /* ColumnHeader */) {
                        pt.x -= hdrWid;
                        if (pt.x > ptFrz.x) {
                            pt.x -= sp.x;
                        }
                    }

                    // get row and column
                    this._row = pt.y > totHei ? -1 : rows.getItemAt(pt.y);
                    this._col = pt.x > totWid ? -1 : cols.getItemAt(pt.x);
                    if (this._row < 0 || this._col < 0) {
                        this._p = null;
                        return;
                    }

                    // get edges
                    this._edge = 0;
                    var szEdge = HitTestInfo._EDGESIZE;
                    if (this._col > -1) {
                        var col = cols[this._col];
                        if (pt.x - col.pos <= szEdge)
                            this._edge |= 1; // left
                        if (col.pos + col.renderSize - pt.x <= szEdge)
                            this._edge |= 4; // right
                    }
                    if (this._row > -1) {
                        var row = rows[this._row];
                        if (pt.y - row.pos <= szEdge)
                            this._edge |= 2; // top
                        if (row.pos + row.renderSize - pt.y <= szEdge)
                            this._edge |= 8; // bottom
                    }
                }
            }
            Object.defineProperty(HitTestInfo.prototype, "point", {
                /**
                * Gets the point in control coordinates that the HitTestInfo refers to.
                */
                get: function () {
                    return this._pt;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(HitTestInfo.prototype, "cellType", {
                /**
                * Gets the cell type at the specified position.
                */
                get: function () {
                    return this._p ? this._p.cellType : 0 /* None */;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(HitTestInfo.prototype, "panel", {
                /**
                * Gets the grid panel at the specified position.
                */
                get: function () {
                    return this._p;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(HitTestInfo.prototype, "row", {
                /**
                * Gets the row index of the cell at the specified position.
                */
                get: function () {
                    return this._row;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(HitTestInfo.prototype, "col", {
                /**
                * Gets the column index of the cell at the specified position.
                */
                get: function () {
                    return this._col;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(HitTestInfo.prototype, "range", {
                /**
                * Gets the cell range at the specified position.
                */
                get: function () {
                    return new _grid.CellRange(this._row, this._col);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(HitTestInfo.prototype, "edgeLeft", {
                /**
                * Gets a value that indicates whether the mouse is near the left edge of the cell.
                */
                get: function () {
                    return (this._edge & 1) != 0;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(HitTestInfo.prototype, "edgeTop", {
                /**
                * Gets a value that indicates whether the mouse is near the top edge of the cell.
                */
                get: function () {
                    return (this._edge & 2) != 0;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(HitTestInfo.prototype, "edgeRight", {
                /**
                * Gets a value that indicates whether the mouse is near the right edge of the cell.
                */
                get: function () {
                    return (this._edge & 4) != 0;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(HitTestInfo.prototype, "edgeBottom", {
                /**
                * Gets a value that indicates whether the mouse is near the bottom edge of the cell.
                */
                get: function () {
                    return (this._edge & 8) != 0;
                },
                enumerable: true,
                configurable: true
            });
            HitTestInfo._EDGESIZE = 5;
            return HitTestInfo;
        })();
        _grid.HitTestInfo = HitTestInfo;
    })(wijmo.grid || (wijmo.grid = {}));
    var grid = wijmo.grid;
})(wijmo || (wijmo = {}));
//# sourceMappingURL=HitTestInfo.js.map

var wijmo;
(function (wijmo) {
    (function (_grid) {
        'use strict';

        /**
        * Specifies constants that define which areas of the grid support cell merging.
        */
        (function (AllowMerging) {
            /** No merging. */ AllowMerging[AllowMerging["None"] = 0] = "None";

            /** Merge scrollable cells. */ AllowMerging[AllowMerging["Cells"] = 1] = "Cells";

            /** Merge column headers. */
            AllowMerging[AllowMerging["ColumnHeaders"] = 2] = "ColumnHeaders";

            /** Merge row headers. */
            AllowMerging[AllowMerging["RowHeaders"] = 4] = "RowHeaders";

            /** Merge column and row headers. */
            AllowMerging[AllowMerging["AllHeaders"] = AllowMerging.ColumnHeaders | AllowMerging.RowHeaders] = "AllHeaders";

            /** Merge all areas. */
            AllowMerging[AllowMerging["All"] = AllowMerging.Cells | AllowMerging.AllHeaders] = "All";
        })(_grid.AllowMerging || (_grid.AllowMerging = {}));
        var AllowMerging = _grid.AllowMerging;

        /**
        * Defines the @see:FlexGrid's cell merging behavior.
        *
        * An instance of this class is automatically created and assigned to
        * the grid's @see:mergeManager property to implement the grid's default
        * merging behavior.
        *
        * If you want to customize the default merging behavior, create a class
        * that derives from @see:MergeManager and override the @see:getMergedRange method.
        */
        var MergeManager = (function () {
            /**
            * Initializes a new instance of a @see:MergeManager object.
            *
            * @param grid The @see:FlexGrid object that owns this @see:MergeManager.
            */
            function MergeManager(grid) {
                this._g = grid;
            }
            /**
            * Gets a @see:CellRange that specifies the merged extent of a cell
            * in a @see:GridPanel.
            *
            * @param p The @see:GridPanel that contains the range.
            * @param r The index of the row that contains the cell.
            * @param c The index of the column that contains the cell.
            * @param clip Whether to clip the merged range to the grid's current view range.
            * @return A @see:CellRange that specifies the merged range, or null if the cell is not merged.
            */
            MergeManager.prototype.getMergedRange = function (p, r, c, clip) {
                if (typeof clip === "undefined") { clip = true; }
                var rng, vr, ct = p.cellType, cols = p.columns, rows = p.rows, row = rows[r], col = cols[c];

                // no merging in new row template (TFS 82235)
                if (row instanceof _grid._NewRowTemplate) {
                    return null;
                }

                // merge cells in group rows
                if (row instanceof _grid.GroupRow && row.dataItem instanceof wijmo.collections.CollectionViewGroup) {
                    rng = new _grid.CellRange(r, c);

                    // expand left and right preserving aggregates
                    if (col.aggregate == 0 /* None */) {
                        while (rng.col > 0 && cols[rng.col - 1].aggregate == 0 /* None */ && rng.col != cols.frozen) {
                            rng.col--;
                        }
                        while (rng.col2 < cols.length - 1 && cols[rng.col2 + 1].aggregate == 0 /* None */ && rng.col2 + 1 != cols.frozen) {
                            rng.col2++;
                        }
                    }

                    while (rng.col < c && !cols[rng.col].visible) {
                        rng.col++;
                    }

                    // return merged range
                    return rng.isSingleCell ? null : rng;
                }

                // honor grid's allowMerging setting
                var done = false;
                switch (this._g.allowMerging) {
                    case 0 /* None */:
                        done = true;
                        break;
                    case 1 /* Cells */:
                        done = ct != 1 /* Cell */;
                        break;
                    case 2 /* ColumnHeaders */:
                        done = ct != 2 /* ColumnHeader */ && ct != 4 /* TopLeft */;
                        break;
                    case 4 /* RowHeaders */:
                        done = ct != 3 /* RowHeader */ && ct != 4 /* TopLeft */;
                        break;
                    case AllowMerging.AllHeaders:
                        done = ct == 1 /* Cell */;
                        break;
                }
                if (done) {
                    return null;
                }

                // merge up and down columns
                if (cols[c].allowMerging) {
                    rng = new _grid.CellRange(r, c);

                    // clip to current viewport
                    var rMin = 0, rMax = rows.length - 1;
                    if (r >= rows.frozen) {
                        if (clip && (ct == 1 /* Cell */ || ct == 3 /* RowHeader */)) {
                            vr = p._getViewRange(true);
                            rMin = vr.topRow;
                            rMax = vr.bottomRow;
                        }
                    } else {
                        rMax = rows.frozen - 1;
                    }

                    for (var tr = r - 1; tr >= rMin && this._mergeCell(p, tr, c, r, c); tr--) {
                        rng.row = tr;
                    }
                    for (var br = r + 1; br <= rMax && this._mergeCell(p, r, c, br, c); br++) {
                        rng.row2 = br;
                    }

                    while (rng.row < r && !rows[rng.row].visible) {
                        rng.row++;
                    }

                    // done
                    if (!rng.isSingleCell) {
                        return rng;
                    }
                }

                // merge left and right along rows
                if (rows[r].allowMerging) {
                    rng = new _grid.CellRange(r, c);

                    // get merging limits
                    var cMin = 0, cMax = cols.length - 1;
                    if (c >= cols.frozen) {
                        if (clip && (ct == 1 /* Cell */ || ct == 2 /* ColumnHeader */)) {
                            vr = p._getViewRange(true);
                            cMin = vr.leftCol;
                            cMax = vr.rightCol;
                        }
                    } else {
                        cMax = cols.frozen - 1;
                    }

                    for (var cl = c - 1; cl >= cMin && this._mergeCell(p, r, cl, r, c); cl--) {
                        rng.col = cl;
                    }
                    for (var cr = c + 1; cr <= cMax && this._mergeCell(p, r, c, r, cr); cr++) {
                        rng.col2 = cr;
                    }

                    while (rng.col < c && !cols[rng.col].visible) {
                        rng.col++;
                    }

                    // done
                    if (!rng.isSingleCell) {
                        return rng;
                    }
                }

                // no merging...
                return null;
            };

            // check whether two cells should be merged
            MergeManager.prototype._mergeCell = function (p, r1, c1, r2, c2) {
                // group rows and new row templates are handled separately
                var row1 = p.rows[r1], row2 = p.rows[r2];
                if (row1 instanceof _grid.GroupRow || row1 instanceof _grid._NewRowTemplate || row2 instanceof _grid.GroupRow || row2 instanceof _grid._NewRowTemplate) {
                    return false;
                }

                // no merging across freezing boundaries
                if (r1 != r2 && p.rows.isFrozen(r1) != p.rows.isFrozen(r2)) {
                    return false;
                }
                if (c1 != c2 && p.columns.isFrozen(c1) != p.columns.isFrozen(c2)) {
                    return false;
                }

                // no vertical merging if the range is already merged horizontally
                if (r1 != r2) {
                    if (c1 > 0) {
                        if ((row1.allowMerging && this._mergeCell(p, r1, c1 - 1, r1, c1)) || (row2.allowMerging && this._mergeCell(p, r2, c1 - 1, r2, c1))) {
                            return false;
                        }
                    }
                    if (c2 < p.columns.length - 1) {
                        if ((row1.allowMerging && this._mergeCell(p, r1, c2, r1, c2 + 1)) || (row2.allowMerging && this._mergeCell(p, r2, c2, r2, c2 + 1))) {
                            return false;
                        }
                    }
                }

                // no merging if the data is different
                if (p.getCellData(r1, c1, true) != p.getCellData(r2, c2, true)) {
                    return false;
                }

                // OK to merge
                return true;
            };
            return MergeManager;
        })();
        _grid.MergeManager = MergeManager;
    })(wijmo.grid || (wijmo.grid = {}));
    var grid = wijmo.grid;
})(wijmo || (wijmo = {}));
//# sourceMappingURL=MergeManager.js.map

var wijmo;
(function (wijmo) {
    (function (grid) {
        'use strict';

        /**
        * Represents a data map for use with the column's @see:dataMap property.
        *
        * Data maps provide the grid with automatic look up capabilities. For example,
        * you may want to display a customer name instead of his ID, or a color name
        * instead of its RGB value.
        *
        * The code below binds a grid to a collection of products,
        * then assigns a @see:DataMap to the grid's 'CategoryID' column so that the grid
        * displays the category names rather than the raw IDs.
        *
        * <pre>
        * // bind grid to products
        * var flex = new wijmo.grid.FlexGrid();
        * flex.itemsSource = products;
        * // map CategoryID column to show category name instead of ID
        * var col = flex.columns.getColumn('CategoryID');
        * col.dataMap = new wijmo.grid.DataMap(categories, 'CategoryID', 'CategoryName');
        * </pre>
        */
        var DataMap = (function () {
            /**
            * Initializes a new instance of a @see:DataMap.
            *
            * @param itemsSource An array or @see:ICollectionView that contains the items to map.
            * @param selectedValuePath The name of the property that contains the keys (data values).
            * @param displayMemberPath The name of the property to use as the visual representation of the items.
            */
            function DataMap(itemsSource, selectedValuePath, displayMemberPath) {
                /**
                * Occurs when the map data changes.
                */
                this.mapChanged = new wijmo.Event();
                // turn arrays into real maps
                if (wijmo.isArray(itemsSource) && !selectedValuePath && !displayMemberPath) {
                    var arr = [];
                    for (var i = 0; i < itemsSource.length; i++) {
                        arr.push({ value: itemsSource[i] });
                    }
                    itemsSource = arr;
                    selectedValuePath = 'value';
                    displayMemberPath = 'value';
                }

                // initialize map
                this._cv = wijmo.asCollectionView(itemsSource);
                this._keyPath = wijmo.asString(selectedValuePath, false);
                this._displayPath = wijmo.asString(displayMemberPath, false);

                // notify listeners when the map changes
                this._cv.collectionChanged.addHandler(this.onMapChanged, this);
            }
            Object.defineProperty(DataMap.prototype, "collectionView", {
                /**
                * Gets the @see:ICollectionView object that contains the map data.
                */
                get: function () {
                    return this._cv;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(DataMap.prototype, "selectedValuePath", {
                /**
                * Gets the name of the property to use as a key for the item (data value).
                */
                get: function () {
                    return this._keyPath;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(DataMap.prototype, "displayMemberPath", {
                /**
                * Gets the name of the property to use as the visual representation of the item.
                */
                get: function () {
                    return this._displayPath;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Gets the key that corresponds to a given display value.
            *
            * @param displayValue The display value of the item to retrieve.
            */
            DataMap.prototype.getKeyValue = function (displayValue) {
                var index = this._indexOf(displayValue, this._displayPath, false);
                return index > -1 ? this._cv.sourceCollection[index][this._keyPath] : null;
            };

            /**
            * Gets the display value that corresponds to a given key.
            *
            * @param key The key of the item to retrieve.
            */
            DataMap.prototype.getDisplayValue = function (key) {
                var index = this._indexOf(key, this._keyPath, true);
                return index > -1 ? this._cv.sourceCollection[index][this._displayPath] : key;
            };

            /**
            * Gets an array with all of the display values on the map.
            */
            DataMap.prototype.getDisplayValues = function () {
                var values = [];
                if (this._cv && this._displayPath) {
                    var items = this._cv.sourceCollection;
                    for (var i = 0; i < items.length; i++) {
                        values.push(items[i][this._displayPath]);
                    }
                }
                return values;
            };

            /**
            * Gets an array with all of the keys on the map.
            */
            DataMap.prototype.getKeyValues = function () {
                var values = [];
                if (this._cv && this._keyPath) {
                    var items = this._cv.sourceCollection;
                    for (var i = 0; i < items.length; i++) {
                        values.push(items[i][this._keyPath]);
                    }
                }
                return values;
            };

            Object.defineProperty(DataMap.prototype, "isEditable", {
                /**
                * Gets or sets a value that indicates whether users should be allowed to enter
                * values that are not present on the @see:DataMap.
                *
                * In order for a @see:DataMap to be editable, the @see:selectedValuePath and
                * @see:displayMemberPath must be set to the same value.
                */
                get: function () {
                    return this._editable;
                },
                set: function (value) {
                    this._editable = wijmo.asBoolean(value);
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Raises the @see:mapChanged event.
            */
            DataMap.prototype.onMapChanged = function () {
                this.mapChanged.raise(this);
            };

            // implementation
            DataMap.prototype._indexOf = function (value, path, caseSensitive) {
                if (this._cv && path) {
                    var sval = value != null ? value.toString() : '', lcval = caseSensitive ? sval : sval.toLowerCase();

                    // look for items
                    var items = this._cv.sourceCollection;
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i][path];

                        // straight comparison
                        if (item == value) {
                            return i;
                        }

                        // case-insensitive comparison
                        if (!caseSensitive && item.length == lcval.length && item.toLowerCase() == lcval) {
                            return i;
                        }

                        // string-based comparison (like JS objects) 140577
                        if (item != null && item.toString() == sval) {
                            return i;
                        }
                    }
                }
                return -1;
            };
            return DataMap;
        })();
        grid.DataMap = DataMap;
    })(wijmo.grid || (wijmo.grid = {}));
    var grid = wijmo.grid;
})(wijmo || (wijmo = {}));
//# sourceMappingURL=DataMap.js.map

var wijmo;
(function (wijmo) {
    (function (_grid) {
        'use strict';

        /**
        * Specifies constants that define the selection behavior.
        */
        (function (SelectionMode) {
            /** The user cannot select cells with the mouse or keyboard. */
            SelectionMode[SelectionMode["None"] = 0] = "None";

            /** The user can select only a single cell at a time. */
            SelectionMode[SelectionMode["Cell"] = 1] = "Cell";

            /** The user can select contiguous blocks of cells. */
            SelectionMode[SelectionMode["CellRange"] = 2] = "CellRange";

            /** The user can select a single row at a time. */
            SelectionMode[SelectionMode["Row"] = 3] = "Row";

            /** The user can select contiguous rows. */
            SelectionMode[SelectionMode["RowRange"] = 4] = "RowRange";

            /** The user can select non-contiguous rows. */
            SelectionMode[SelectionMode["ListBox"] = 5] = "ListBox";
        })(_grid.SelectionMode || (_grid.SelectionMode = {}));
        var SelectionMode = _grid.SelectionMode;

        /**
        * Specifies the selected state of a cell.
        */
        (function (SelectedState) {
            /** The cell is not selected. */
            SelectedState[SelectedState["None"] = 0] = "None";

            /** The cell is selected but is not the active cell. */
            SelectedState[SelectedState["Selected"] = 1] = "Selected";

            /** The cell is selected and is the active cell. */
            SelectedState[SelectedState["Cursor"] = 2] = "Cursor";
        })(_grid.SelectedState || (_grid.SelectedState = {}));
        var SelectedState = _grid.SelectedState;

        /**
        * Specifies a type of movement for the selection.
        */
        (function (SelMove) {
            /** Do not change the selection. */
            SelMove[SelMove["None"] = 0] = "None";

            /** Select the next visible cell. */
            SelMove[SelMove["Next"] = 1] = "Next";

            /** Select the previous visible cell. */
            SelMove[SelMove["Prev"] = 2] = "Prev";

            /** Select the first visible cell in the next page. */
            SelMove[SelMove["NextPage"] = 3] = "NextPage";

            /** Select the first visible cell in the previous page. */
            SelMove[SelMove["PrevPage"] = 4] = "PrevPage";

            /** Select the first visible cell. */
            SelMove[SelMove["Home"] = 5] = "Home";

            /** Select the last visible cell. */
            SelMove[SelMove["End"] = 6] = "End";

            /** Select the next visible cell skipping rows if necessary. */
            SelMove[SelMove["NextCell"] = 7] = "NextCell";

            /** Select the previous visible cell skipping rows if necessary. */
            SelMove[SelMove["PrevCell"] = 8] = "PrevCell";
        })(_grid.SelMove || (_grid.SelMove = {}));
        var SelMove = _grid.SelMove;

        /**
        * Handles the grid's selection.
        */
        var _SelectionHandler = (function () {
            /**
            * Initializes a new instance of a @see:_SelectionHandler.
            *
            * @param grid @see:FlexGrid that owns this @see:_SelectionHandler.
            */
            function _SelectionHandler(grid) {
                this._sel = new _grid.CellRange(0, 0);
                this._mode = 2 /* CellRange */;
                this._g = grid;
            }
            Object.defineProperty(_SelectionHandler.prototype, "selectionMode", {
                /**
                * Gets or sets the current selection mode.
                */
                get: function () {
                    return this._mode;
                },
                set: function (value) {
                    if (value != this._mode) {
                        // update listbox selection when switching modes
                        if (value == 5 /* ListBox */ || this._mode == 5 /* ListBox */) {
                            var rows = this._g.rows;
                            for (var i = 0; i < rows.length; i++) {
                                rows[i]._setFlag(256 /* Selected */, (value == 5 /* ListBox */) ? this._sel.containsRow(i) : false, false);
                            }
                        }

                        switch (value) {
                            case 0 /* None */:
                                this._sel.setRange(-1, -1);
                                break;
                            case 1 /* Cell */:
                                this._sel.row2 = this._sel.row;
                                this._sel.col2 = this._sel.col;
                                break;
                            case 3 /* Row */:
                                this._sel.row2 = this._sel.row;
                                break;
                        }

                        // apply new mode
                        this._mode = value;
                        this._g.invalidate();
                    }
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(_SelectionHandler.prototype, "selection", {
                /**
                * Gets or sets the current selection.
                */
                get: function () {
                    return this._sel;
                },
                set: function (value) {
                    this.select(value);
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Selects a cell range and optionally scrolls it into view.
            *
            * @param rng Range to select.
            * @param show Whether to scroll the new selection into view.
            */
            _SelectionHandler.prototype.select = function (rng, show) {
                if (typeof show === "undefined") { show = true; }
                // allow passing in row and column indices
                if (wijmo.isNumber(rng) && wijmo.isNumber(show)) {
                    rng = new _grid.CellRange(rng, show);
                    show = true;
                }
                rng = wijmo.asType(rng, _grid.CellRange);

                // get old and new selections
                var g = this._g, oldSel = this._sel, newSel = rng, lbMode = false;

                switch (g.selectionMode) {
                    case 1 /* Cell */:
                        rng.row2 = rng.row;
                        rng.col2 = rng.col;
                        break;

                    case 3 /* Row */:
                        rng.row2 = rng.row;
                        break;

                    case 5 /* ListBox */:
                        lbMode = true;
                        break;
                }

                // check if the selection really is changing
                // (special handling for ListBox mode when re-selecting items)
                var noChange = newSel.equals(oldSel);
                if (lbMode && newSel.row > -1 && !g.rows[newSel.row].isSelected) {
                    noChange = false;
                }

                // no change? done
                if (noChange) {
                    if (show) {
                        g.scrollIntoView(newSel.row, newSel.col);
                    }
                    return;
                }

                // raise selectionChanging event
                var e = new _grid.CellRangeEventArgs(g.cells, newSel);
                if (!g.onSelectionChanging(e)) {
                    return;
                }

                // ListBox mode: update Selected flag and refresh to show changes
                // (afer firing the selectionChanging cancelable event)
                if (lbMode) {
                    for (var i = 0; i < g.rows.length; i++) {
                        g.rows[i]._setFlag(256 /* Selected */, newSel.containsRow(i), false);
                    }
                    g.refreshCells(false, true, true);
                }

                // validate selection after the change
                newSel.row = Math.min(newSel.row, g.rows.length - 1);
                newSel.row2 = Math.min(newSel.row2, g.rows.length - 1);

                // update selection
                this._sel = newSel;

                // show the new selection
                g.refreshCells(false, true, true);
                if (show) {
                    g.scrollIntoView(newSel.row, newSel.col);
                }

                // update collectionView cursor
                if (g.collectionView) {
                    var index = g._getCvIndex(newSel.row);
                    g.collectionView.moveCurrentToPosition(index);
                }

                // raise selectionChanged event
                g.onSelectionChanged(e);
            };

            /**
            * Moves the selection by a specified amount in the vertical and horizontal directions.
            * @param rowMove How to move the row selection.
            * @param colMove How to move the column selection.
            * @param extend Whether to extend the current selection or start a new one.
            */
            _SelectionHandler.prototype.moveSelection = function (rowMove, colMove, extend) {
                var row, col, g = this._g, rows = g.rows, cols = g.columns, rng = this._getReferenceCell(rowMove, colMove, extend), pageSize = Math.max(0, g.clientSize.height - g.columnHeaders.height);

                // handle next cell with wrapping
                if (colMove == 7 /* NextCell */) {
                    col = cols.getNextCell(rng.col, 1 /* Next */, pageSize);
                    row = rng.row;
                    if (col == rng.col) {
                        row = rows.getNextCell(row, 1 /* Next */, pageSize);
                        if (row > rng.row) {
                            col = cols.getNextCell(0, 1 /* Next */, pageSize);
                            col = cols.getNextCell(col, 2 /* Prev */, pageSize);
                        }
                    }
                    g.select(row, col);
                } else if (colMove == 8 /* PrevCell */) {
                    col = cols.getNextCell(rng.col, 2 /* Prev */, pageSize);
                    row = rng.row;
                    if (col == rng.col) {
                        row = rows.getNextCell(row, 2 /* Prev */, pageSize);
                        if (row < rng.row) {
                            col = cols.getNextCell(cols.length - 1, 2 /* Prev */, pageSize);
                            col = cols.getNextCell(col, 1 /* Next */, pageSize);
                        }
                    }
                    g.select(row, col);
                } else {
                    // get target row, column
                    row = rows.getNextCell(rng.row, rowMove, pageSize);
                    col = cols.getNextCell(rng.col, colMove, pageSize);

                    // extend or select
                    if (extend) {
                        var sel = g._selHdl._sel;
                        g.select(new _grid.CellRange(row, col, sel.row2, sel.col2));
                    } else {
                        g.select(row, col);
                    }
                }
            };

            // get reference cell for selection change, taking merging into account
            _SelectionHandler.prototype._getReferenceCell = function (rowMove, colMove, extend) {
                var g = this._g, sel = g._selHdl._sel, rng = g.getMergedRange(g.cells, sel.row, sel.col);

                // not merging? use selection as a reference
                if (!rng || rng.isSingleCell) {
                    return sel;
                }

                // clone range and set reference cell within the range
                rng = rng.clone();
                switch (rowMove) {
                    case 1 /* Next */:
                    case 7 /* NextCell */:
                        rng.row = rng.bottomRow;
                        break;
                    case 0 /* None */:
                        rng.row = sel.row;
                        break;
                }
                switch (colMove) {
                    case 1 /* Next */:
                    case 7 /* NextCell */:
                        rng.col = rng.rightCol;
                        break;
                    case 0 /* None */:
                        rng.col = sel.col;
                        break;
                }

                // done
                return rng;
            };

            // adjusts a selection to reflect the current selection mode
            /*private*/ _SelectionHandler.prototype._adjustSelection = function (rng) {
                switch (this._mode) {
                    case 1 /* Cell */:
                        return new _grid.CellRange(rng.row, rng.col, rng.row, rng.col);
                    case 3 /* Row */:
                        return new _grid.CellRange(rng.row, 0, rng.row, this._g.columns.length - 1);
                    case 4 /* RowRange */:
                    case 5 /* ListBox */:
                        return new _grid.CellRange(rng.row, 0, rng.row2, this._g.columns.length - 1);
                }
                return rng;
            };
            return _SelectionHandler;
        })();
        _grid._SelectionHandler = _SelectionHandler;
    })(wijmo.grid || (wijmo.grid = {}));
    var grid = wijmo.grid;
})(wijmo || (wijmo = {}));
//# sourceMappingURL=_SelectionHandler.js.map

var wijmo;
(function (wijmo) {
    (function (_grid) {
        'use strict';

        /**
        * Handles the grid's keyboard commands.
        */
        var _KeyboardHandler = (function () {
            /**
            * Initializes a new instance of a @see:_KeyboardHandler.
            *
            * @param grid @see:FlexGrid that owns this @see:_KeyboardHandler.
            */
            function _KeyboardHandler(grid) {
                this._g = grid;
                grid.addEventListener(grid.hostElement, 'keypress', this._keypress.bind(this));
                grid.addEventListener(grid.hostElement, 'keydown', this._keydown.bind(this));
            }
            // handles the key down event (selection)
            _KeyboardHandler.prototype._keydown = function (e) {
                var g = this._g, sel = g.selection, ctrl = e.ctrlKey || e.metaKey, shift = e.shiftKey, handled = true;

                if (g.isRangeValid(sel) && !e.defaultPrevented) {
                    // allow input elements that don't belong to us to handle keys (TFS 131138)
                    if (!g.activeEditor && e.target instanceof HTMLInputElement && !e.target.getAttribute('wj-part')) {
                        return;
                    }

                    // pre-process keys while editor is active
                    if (g.activeEditor && g._edtHdl._keydown(e)) {
                        return;
                    }

                    // get the variables we need
                    var gr = wijmo.tryCast(g.rows[sel.row], _grid.GroupRow), ecv = wijmo.tryCast(g.collectionView, 'IEditableCollectionView'), keyCode = e.keyCode;

                    // handle clipboard
                    if (g.autoClipboard) {
                        // copy: ctrl+c or ctrl+Insert
                        if (ctrl && (keyCode == 67 || keyCode == 45)) {
                            var args = new _grid.CellRangeEventArgs(g.cells, sel);
                            if (g.onCopying(args)) {
                                var text = g.getClipString();
                                wijmo.Clipboard.copy(text);
                                g.onCopied(args);
                            }
                            e.stopPropagation();
                            return;
                        }

                        // paste: ctrl+v or shift+Insert
                        if ((ctrl && keyCode == 86) || (shift && keyCode == 45)) {
                            if (!g.isReadOnly) {
                                var args = new _grid.CellRangeEventArgs(g.cells, sel);
                                if (g.onPasting(args)) {
                                    wijmo.Clipboard.paste(function (text) {
                                        g.setClipString(text);
                                        g.onPasted(args);
                                    });
                                }
                            }
                            e.stopPropagation();
                            return;
                        }
                    }

                    // reverse left/right keys when rendering in right-to-left
                    if (g._rtl) {
                        switch (keyCode) {
                            case 37 /* Left */:
                                keyCode = 39 /* Right */;
                                break;
                            case 39 /* Right */:
                                keyCode = 37 /* Left */;
                                break;
                        }
                    }

                    switch (keyCode) {
                        case 65:
                            if (ctrl) {
                                g.select(new _grid.CellRange(0, 0, g.rows.length - 1, g.columns.length - 1));
                            } else {
                                handled = false;
                            }
                            break;
                        case 37 /* Left */:
                            if (sel.isValid && sel.col == 0 && gr != null && !gr.isCollapsed && gr.hasChildren) {
                                gr.isCollapsed = true;
                            } else {
                                this._moveSel(0 /* None */, ctrl ? 5 /* Home */ : 2 /* Prev */, shift);
                            }
                            break;
                        case 39 /* Right */:
                            if (sel.isValid && sel.col == 0 && gr != null && gr.isCollapsed) {
                                gr.isCollapsed = false;
                            } else {
                                this._moveSel(0 /* None */, ctrl ? 6 /* End */ : 1 /* Next */, shift);
                            }
                            break;
                        case 38 /* Up */:
                            if (e.altKey && g._edtHdl._toggleListBox(this._g.selection)) {
                                break;
                            }
                            this._moveSel(ctrl ? 5 /* Home */ : 2 /* Prev */, 0 /* None */, shift);
                            break;
                        case 40 /* Down */:
                            if (e.altKey && g._edtHdl._toggleListBox(this._g.selection)) {
                                break;
                            }
                            this._moveSel(ctrl ? 6 /* End */ : 1 /* Next */, 0 /* None */, shift);
                            break;
                        case 33 /* PageUp */:
                            this._moveSel(4 /* PrevPage */, 0 /* None */, shift);
                            break;
                        case 34 /* PageDown */:
                            this._moveSel(3 /* NextPage */, 0 /* None */, shift);
                            break;
                        case 36 /* Home */:
                            this._moveSel(ctrl ? 5 /* Home */ : 0 /* None */, 5 /* Home */, shift);
                            break;
                        case 35 /* End */:
                            this._moveSel(ctrl ? 6 /* End */ : 0 /* None */, 6 /* End */, shift);
                            break;
                        case 9 /* Tab */:
                            this._moveSel(0 /* None */, shift ? 8 /* PrevCell */ : 7 /* NextCell */, false);
                            break;
                        case 13 /* Enter */:
                            this._moveSel(shift ? 2 /* Prev */ : 1 /* Next */, 0 /* None */, false);
                            if (!shift && ecv && ecv.currentEditItem != null) {
                                g._edtHdl._commitRowEdits(); // in case we're at the last row (TFS 105989)
                            }
                            break;
                        case 27 /* Escape */:
                            if (ecv) {
                                if (ecv.currentEditItem != null) {
                                    ecv.cancelEdit();
                                }
                                if (ecv.currentAddItem != null) {
                                    ecv.cancelNew();
                                }
                            }
                            g._mouseHdl.resetMouseState();
                            break;
                        case 46 /* Delete */:
                            handled = this._deleteSel();
                            break;
                        case 113 /* F2 */:
                            handled = g.startEditing(true);
                            break;
                        case 115 /* F4 */:
                            handled = g._edtHdl._toggleListBox(this._g.selection);
                            break;
                        case 32 /* Space */:
                            handled = g.startEditing(true);
                            if (handled) {
                                setTimeout(function () {
                                    var edt = g.activeEditor;
                                    if (edt) {
                                        if (edt.type == 'checkbox') {
                                            edt.checked = !edt.checked;
                                            g.finishEditing();
                                        } else {
                                            wijmo.setSelectionRange(edt, edt.value.length);
                                        }
                                    }
                                });
                            }
                            break;
                        default:
                            handled = false;
                            break;
                    }
                    if (handled) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }
            };

            // handles the key press event (start editing or try auto-complete)
            _KeyboardHandler.prototype._keypress = function (e) {
                // forward key to editor (auto-complete) or handle ourselves
                var g = this._g;
                if (g.activeEditor) {
                    g._edtHdl._keypress(e);
                } else if (e.charCode > 32 /* Space */) {
                    if (g.startEditing(false) && g.activeEditor) {
                        setTimeout(function () {
                            var edt = g.activeEditor;
                            if (edt && edt.type != 'checkbox') {
                                edt.value = String.fromCharCode(e.charCode); // FireFox needs this...
                                wijmo.setSelectionRange(edt, 1);
                                edt.dispatchEvent(g._edtHdl._evtInput); // to apply mask (TFS 131232)
                                g._edtHdl._keypress(e); // to start auto-complete
                            }
                        });
                    }
                }
                e.stopPropagation();
            };

            // move the selection
            _KeyboardHandler.prototype._moveSel = function (rowMove, colMove, extend) {
                if (this._g.selectionMode != 0 /* None */) {
                    this._g._selHdl.moveSelection(rowMove, colMove, extend);
                }
            };

            // delete the selected rows
            _KeyboardHandler.prototype._deleteSel = function () {
                var g = this._g, ecv = wijmo.tryCast(g.collectionView, 'IEditableCollectionView'), sel = g.selection, rows = g.rows, selRows = [];

                // if g.allowDelete and ecv.canRemove, and not editing/adding, (TFS 87718)
                // and the grid allows deleting items, then delete selected rows
                if (g.allowDelete && !g.isReadOnly && (ecv == null || (ecv.canRemove && !ecv.isAddingNew && !ecv.isEditingItem))) {
                    switch (g.selectionMode) {
                        case 2 /* CellRange */:
                            if (sel.leftCol == 0 && sel.rightCol == g.columns.length - 1) {
                                for (var i = sel.topRow; i > -1 && i <= sel.bottomRow; i++) {
                                    selRows.push(rows[i]);
                                }
                            }
                            break;
                        case 5 /* ListBox */:
                            for (var i = 0; i < rows.length; i++) {
                                if (rows[i].isSelected) {
                                    selRows.push(rows[i]);
                                }
                            }
                            break;
                        case 3 /* Row */:
                            if (sel.topRow > -1) {
                                selRows.push(rows[sel.topRow]);
                            }
                            break;
                        case 4 /* RowRange */:
                            for (var i = sel.topRow; i > -1 && i <= sel.bottomRow; i++) {
                                selRows.push(rows[i]);
                            }
                            break;
                    }
                }

                // finish with row deletion
                if (selRows.length > 0) {
                    // begin updates
                    if (ecv)
                        ecv.beginUpdate();
                    g.beginUpdate();

                    // delete selected rows
                    var rng = new _grid.CellRange(), e = new _grid.CellRangeEventArgs(g.cells, rng);
                    for (var i = selRows.length - 1; i >= 0; i--) {
                        var r = selRows[i];
                        rng.row = rng.row2 = r.index;
                        g.onDeletingRow(e);
                        if (!e.cancel) {
                            if (ecv && r.dataItem) {
                                ecv.remove(r.dataItem);
                            } else {
                                g.rows.removeAt(r.index);
                            }
                        }
                    }

                    // finish updates
                    g.endUpdate();
                    if (ecv)
                        ecv.endUpdate();

                    // make sure one row is selected in ListBox mode (TFS 82683)
                    if (g.selectionMode == 5 /* ListBox */) {
                        var index = g.selection.row;
                        if (index > -1 && index < g.rows.length) {
                            g.rows[index].isSelected = true;
                        }
                    }

                    // handle childItemsPath (TFS 87577)
                    if (g.childItemsPath && g.collectionView) {
                        g.collectionView.refresh();
                    }

                    // all done
                    return true;
                }

                // delete cell content (if there is any) (TFS 94178)
                if (!g.isReadOnly && selRows.length == 0 && sel.isSingleCell) {
                    var bcol = g._getBindingColumn(g.cells, sel.row, g.columns[sel.col]);
                    if (bcol.required == false || (bcol.required == null && bcol.dataType == 1 /* String */)) {
                        if (g.getCellData(sel.row, sel.col, true)) {
                            if (g.startEditing(false, sel.row, sel.col)) {
                                g.setCellData(sel.row, sel.col, '', true); // TFS 118470
                                g.finishEditing(true);
                                g.invalidate();
                                return true;
                            }
                        }
                    }
                }

                // no deletion
                return false;
            };
            return _KeyboardHandler;
        })();
        _grid._KeyboardHandler = _KeyboardHandler;
    })(wijmo.grid || (wijmo.grid = {}));
    var grid = wijmo.grid;
})(wijmo || (wijmo = {}));
//# sourceMappingURL=_KeyboardHandler.js.map

var wijmo;
(function (wijmo) {
    (function (_grid) {
        'use strict';

        /**
        * Specifies constants that define the row/column sizing behavior.
        */
        (function (AllowResizing) {
            /** The user may not resize rows or columns. */
            AllowResizing[AllowResizing["None"] = 0] = "None";

            /** The user may resize columns. */
            AllowResizing[AllowResizing["Columns"] = 1] = "Columns";

            /** The user may resize rows. */
            AllowResizing[AllowResizing["Rows"] = 2] = "Rows";

            /** The user may resize rows and columns. */
            AllowResizing[AllowResizing["Both"] = AllowResizing.Rows | AllowResizing.Columns] = "Both";
        })(_grid.AllowResizing || (_grid.AllowResizing = {}));
        var AllowResizing = _grid.AllowResizing;

        /**
        * Specifies constants that define the row/column auto-sizing behavior.
        */
        (function (AutoSizeMode) {
            /** Autosizing is disabled. */
            AutoSizeMode[AutoSizeMode["None"] = 0] = "None";

            /** Autosizing accounts for header cells. */
            AutoSizeMode[AutoSizeMode["Headers"] = 1] = "Headers";

            /** Autosizing accounts for data cells. */
            AutoSizeMode[AutoSizeMode["Cells"] = 2] = "Cells";

            /** Autosizing accounts for header and data cells. */
            AutoSizeMode[AutoSizeMode["Both"] = AutoSizeMode.Headers | AutoSizeMode.Cells] = "Both";
        })(_grid.AutoSizeMode || (_grid.AutoSizeMode = {}));
        var AutoSizeMode = _grid.AutoSizeMode;

        /**
        * Specifies constants that define the row/column dragging behavior.
        */
        (function (AllowDragging) {
            /** The user may not drag rows or columns. */
            AllowDragging[AllowDragging["None"] = 0] = "None";

            /** The user may drag columns. */
            AllowDragging[AllowDragging["Columns"] = 1] = "Columns";

            /** The user may drag rows. */
            AllowDragging[AllowDragging["Rows"] = 2] = "Rows";

            /** The user may drag rows and columns. */
            AllowDragging[AllowDragging["Both"] = AllowDragging.Rows | AllowDragging.Columns] = "Both";
        })(_grid.AllowDragging || (_grid.AllowDragging = {}));
        var AllowDragging = _grid.AllowDragging;

        /**
        * Handles the grid's mouse commands.
        */
        var _MouseHandler = (function () {
            /**
            * Initializes a new instance of a @see:_MouseHandler.
            *
            * @param grid @see:FlexGrid that owns this @see:_MouseHandler.
            */
            function _MouseHandler(grid) {
                var _this = this;
                var host = grid.hostElement;
                this._g = grid;

                // mouse events:
                // when the user presses the mouse on the control, hook up handlers to
                // mouse move/up on the *document*, and unhook on mouse up.
                // this simulates a mouse capture (nice idea from ngGrid).
                // note: use 'document' and not 'window'; that doesn't work on Android.
                grid.addEventListener(host, 'mousedown', function (e) {
                    if (e.button == 0) {
                        document.addEventListener('mousemove', mouseMove);
                        document.addEventListener('mouseup', mouseUp);
                        _this._mouseDown(e);
                    }
                });
                var mouseMove = function (e) {
                    _this._mouseMove(e);
                };
                var mouseUp = function (e) {
                    document.removeEventListener('mousemove', mouseMove);
                    document.removeEventListener('mouseup', mouseUp);
                    _this._mouseUp(e);
                };

                // offer to resize on mousemove (pressing the button not required)
                grid.addEventListener(host, 'mousemove', this._hover.bind(this));

                // double-click to auto-size rows/columns and to enter edit mode
                grid.addEventListener(host, 'dblclick', this._dblClick.bind(this));

                // prevent user from selecting grid content (as text)
                grid.addEventListener(host, 'selectstart', function (e) {
                    if (e.target.tagName != 'INPUT') {
                        e.preventDefault();
                    }
                });

                // prevent wheel from propagating to parent elements
                grid.addEventListener(host, 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll', function (e) {
                    var root = grid.cells.hostElement.parentElement;
                    if (root.scrollHeight > root.offsetHeight) {
                        if ((e.wheelDelta > 0 && root.scrollTop == 0) || (e.wheelDelta < 0 && root.scrollTop + root.offsetHeight >= root.scrollHeight)) {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    }
                });

                // row and column dragging
                grid.addEventListener(host, 'dragstart', this._dragStart.bind(this));
                grid.addEventListener(host, 'dragover', this._dragOver.bind(this));
                grid.addEventListener(host, 'dragleave', this._dragOver.bind(this));
                grid.addEventListener(host, 'drop', this._drop.bind(this));
                grid.addEventListener(host, 'dragend', this._dragEnd.bind(this));

                // create target indicator element
                this._dvMarker = wijmo.createElement('<div class="wj-marker">&nbsp;</div>');
            }
            /**
            * Resets the mouse state.
            */
            _MouseHandler.prototype.resetMouseState = function () {
                // because dragEnd fires too late in FireFox...
                if (this._dragSource) {
                    this._dragSource.style.opacity = 1;
                }
                this._showDragMarker(null);

                // reset cursor state (if the grid hasn't been disposed)
                var host = this._g.hostElement;
                if (host) {
                    host.style.cursor = 'default';
                }

                this._htDown = null;
                this._lbSelRows = null;
                this._szRowCol = null;
                this._szArgs = null;
                this._dragSource = null;
            };

            // handles the mouse down event
            _MouseHandler.prototype._mouseDown = function (e) {
                var g = this._g, ht;

                // ignore events that have been handled
                if (e.defaultPrevented) {
                    return;
                }

                // make sure control bounds are refreshed before hit-testing
                // (in case a container has scrolled)
                g._rcBounds = null;
                ht = g.hitTest(e);

                // ignore clicks on unknown areas
                if (ht.cellType == 0 /* None */) {
                    g.finishEditing();
                    return;
                }

                // if the user clicked an active editor, let the editor handle things
                if (g.editRange && g.editRange.contains(ht.range)) {
                    return;
                }

                // ignore clicks on focused SELECT elements (TFS 135271)
                if (e.target instanceof HTMLSelectElement && document.activeElement == e.target) {
                    return;
                }

                // check where the mouse is
                this._htDown = ht;
                this._eMouse = e;

                // unless the target has the focus, give it to the grid (TFS 81949, 102177, 120430)
                if (e.target != document.activeElement && !g.containsFocus()) {
                    g.focus();
                }

                // handle resizing
                if (this._szRowCol != null) {
                    this._handleResizing(e);
                    return;
                }

                switch (ht.cellType) {
                    case 1 /* Cell */:
                        if (e.ctrlKey && g.selectionMode == 5 /* ListBox */) {
                            this._startListBoxSelection(ht.row);
                        }
                        this._mouseSelect(e, e.shiftKey);
                        break;
                    case 3 /* RowHeader */:
                        if ((this._g.allowDragging & 2 /* Rows */) == 0) {
                            if (e.ctrlKey && g.selectionMode == 5 /* ListBox */) {
                                this._startListBoxSelection(ht.row);
                            }
                            this._mouseSelect(e, e.shiftKey);
                        }
                        break;
                }

                // handle collapse/expand (after selecting the cell)
                if (ht.cellType == 1 /* Cell */ && ht.col == g.columns.firstVisibleIndex) {
                    var gr = wijmo.tryCast(g.rows[ht.row], _grid.GroupRow);
                    if (gr) {
                        var icon = document.elementFromPoint(e.clientX, e.clientY);
                        if (wijmo.closest(icon, '[' + _grid.CellFactory._WJA_COLLAPSE + ']')) {
                            if (e.ctrlKey) {
                                // ctrl+click: collapse/expand entire outline to this level
                                g.collapseGroupsToLevel(gr.isCollapsed ? gr.level + 1 : gr.level);
                            } else {
                                // simple click: toggle this group
                                gr.isCollapsed = !gr.isCollapsed;
                            }

                            // done with the mouse
                            this.resetMouseState();
                            e.preventDefault();
                            return;
                        }
                    }
                }
            };

            // handles the mouse move event
            _MouseHandler.prototype._mouseMove = function (e) {
                if (this._htDown != null) {
                    this._eMouse = e;
                    if (this._szRowCol) {
                        this._handleResizing(e);
                    } else {
                        switch (this._htDown.cellType) {
                            case 1 /* Cell */:
                                this._mouseSelect(e, true);
                                break;
                            case 3 /* RowHeader */:
                                if ((this._g.allowDragging & 2 /* Rows */) == 0) {
                                    this._mouseSelect(e, true);
                                }
                                break;
                        }
                    }
                }
            };

            // handles the mouse up event
            _MouseHandler.prototype._mouseUp = function (e) {
                // select all cells, finish resizing, sorting
                var htd = this._htDown;
                if (htd && htd.cellType == 4 /* TopLeft */ && !this._szArgs && !e.defaultPrevented) {
                    var g = this._g, ht = g.hitTest(e);
                    if (ht.panel == htd.panel && ht.row == htd.row && ht.col == htd.col) {
                        var rng = g.getMergedRange(htd.panel, htd.row, htd.col) || ht.range;
                        if (rng.row == 0 && rng.col == 0) {
                            g.select(new _grid.CellRange(0, 0, g.rows.length - 1, g.columns.length - 1));
                        }
                    }
                } else if (this._szArgs) {
                    this._finishResizing(e);
                } else {
                    this._handleSort(e);
                }

                // done with the mouse
                this.resetMouseState();
            };

            // handles double-clicks
            _MouseHandler.prototype._dblClick = function (e) {
                var g = this._g, ht = g.hitTest(e), sel = g.selection, rng = ht.range, args;

                // ignore if already handled
                if (e.defaultPrevented) {
                    return;
                }

                // auto-size columns
                if (ht.edgeRight && (g.allowResizing & 1 /* Columns */)) {
                    if (ht.cellType == 2 /* ColumnHeader */) {
                        if (e.ctrlKey && sel.containsColumn(ht.col)) {
                            rng = sel;
                        }
                        for (var c = rng.leftCol; c <= rng.rightCol; c++) {
                            if (g.columns[c].allowResizing) {
                                args = new _grid.CellRangeEventArgs(g.cells, new _grid.CellRange(-1, c));
                                if (g.onAutoSizingColumn(args) && g.onResizingColumn(args)) {
                                    g.autoSizeColumn(c);
                                    g.onResizedColumn(args);
                                    g.onAutoSizedColumn(args);
                                }
                            }
                        }
                    } else if (ht.cellType == 4 /* TopLeft */) {
                        if (g.topLeftCells.columns[ht.col].allowResizing) {
                            args = new _grid.CellRangeEventArgs(g.topLeftCells, new _grid.CellRange(-1, ht.col));
                            if (g.onAutoSizingColumn(args) && g.onResizingColumn(args)) {
                                g.autoSizeColumn(ht.col, true);
                                g.onAutoSizedColumn(args);
                                g.onResizedColumn(args);
                            }
                        }
                    }
                    return;
                }

                // auto-size rows
                if (ht.edgeBottom && (g.allowResizing & 2 /* Rows */)) {
                    if (ht.cellType == 3 /* RowHeader */) {
                        if (e.ctrlKey && sel.containsRow(ht.row)) {
                            rng = sel;
                        }
                        for (var r = rng.topRow; r <= rng.bottomRow; r++) {
                            if (g.rows[r].allowResizing) {
                                args = new _grid.CellRangeEventArgs(g.cells, new _grid.CellRange(r, -1));
                                if (g.onAutoSizingRow(args) && g.onResizingRow(args)) {
                                    g.autoSizeRow(r);
                                    g.onResizedRow(args);
                                    g.onAutoSizedRow(args);
                                }
                            }
                        }
                    } else if (ht.cellType == 4 /* TopLeft */) {
                        if (g.topLeftCells.rows[ht.row].allowResizing) {
                            args = new _grid.CellRangeEventArgs(g.topLeftCells, new _grid.CellRange(ht.row, -1));
                            if (g.onAutoSizingRow(args) && g.onResizingRow(args)) {
                                g.autoSizeRow(ht.row, true);
                                g.onResizedRow(args);
                                g.onAutoSizedRow(args);
                            }
                        }
                    }
                }
            };

            // offer to resize rows/columns
            _MouseHandler.prototype._hover = function (e) {
                // make sure we're hovering
                if (this._htDown == null) {
                    var g = this._g, ht = g.hitTest(e), p = ht.panel, cursor = 'default';

                    // find which row/column is being resized
                    this._szRowCol = null;
                    if (ht.cellType == 2 /* ColumnHeader */ || ht.cellType == 4 /* TopLeft */) {
                        if (g.allowResizing & 1 /* Columns */) {
                            if (ht.edgeRight && p.columns[ht.col].allowResizing) {
                                this._szRowCol = p.columns[ht.col];
                            }
                        }
                    }
                    if (ht.cellType == 3 /* RowHeader */ || ht.cellType == 4 /* TopLeft */) {
                        if (g.allowResizing & 2 /* Rows */) {
                            if (ht.edgeBottom && p.rows[ht.row].allowResizing) {
                                this._szRowCol = p.rows[ht.row];
                            }
                        }
                    }

                    // keep track of element to resize and original size
                    if (this._szRowCol instanceof _grid.Column) {
                        cursor = 'col-resize';
                    } else if (this._szRowCol instanceof _grid.Row) {
                        cursor = 'row-resize';
                    }
                    this._szStart = this._szRowCol ? this._szRowCol.renderSize : 0;

                    // update the cursor to provide user feedback
                    g.hostElement.style.cursor = cursor;
                }
            };

            // handles mouse moves while the button is pressed on the cell area
            _MouseHandler.prototype._mouseSelect = function (e, extend) {
                var _this = this;
                if (this._htDown && this._htDown.panel && this._g.selectionMode != 0 /* None */) {
                    // handle the selection
                    var ht = new _grid.HitTestInfo(this._htDown.panel, e);
                    this._handleSelection(ht, extend);

                    // keep calling this if the user keeps the mouse outside the control without moving it
                    // but don't do this in IE, it can keep scrolling forever... TFS 110374
                    if (!('documentMode' in document)) {
                        ht = new _grid.HitTestInfo(this._g, e);
                        if (ht.cellType != 1 /* Cell */ && ht.cellType != 3 /* RowHeader */) {
                            setTimeout(function () {
                                _this._mouseSelect(_this._eMouse, extend);
                            }, 200);
                        }
                    }
                }
            };

            // handle row and column resizing
            _MouseHandler.prototype._handleResizing = function (e) {
                // prevent browser from selecting cell content
                e.preventDefault();

                // resizing column
                if (this._szRowCol instanceof _grid.Column) {
                    var sz = Math.max(1, this._szStart + (e.pageX - this._htDown.point.x) * (this._g._rtl ? -1 : 1));
                    if (this._szRowCol.renderSize != sz) {
                        if (this._szArgs == null) {
                            this._szArgs = new _grid.CellRangeEventArgs(this._htDown.panel, new _grid.CellRange(-1, this._szRowCol.index));
                        }
                        this._g.onResizingColumn(this._szArgs);
                        if (this._g.deferResizing) {
                            this._showResizeMarker(sz);
                        } else {
                            this._szRowCol.width = Math.round(sz);
                        }
                    }
                }

                // resizing row
                if (this._szRowCol instanceof _grid.Row) {
                    var sz = Math.max(1, this._szStart + (e.pageY - this._htDown.point.y));
                    if (this._szRowCol.renderSize != sz) {
                        if (this._szArgs == null) {
                            this._szArgs = new _grid.CellRangeEventArgs(this._htDown.panel, new _grid.CellRange(this._szRowCol.index, -1));
                        }
                        this._g.onResizingRow(this._szArgs);
                        if (this._g.deferResizing) {
                            this._showResizeMarker(sz);
                        } else {
                            this._szRowCol.height = Math.round(sz);
                        }
                    }
                }
            };

            // drag-drop handling (dragging rows/columns)
            _MouseHandler.prototype._dragStart = function (e) {
                var g = this._g, ht = this._htDown;

                // make sure this is event is ours
                if (!ht) {
                    return;
                }

                // get drag source element (if we're not resizing)
                this._dragSource = null;
                if (!this._szRowCol) {
                    var args = new _grid.CellRangeEventArgs(g.cells, ht.range);
                    if (ht.cellType == 2 /* ColumnHeader */ && (g.allowDragging & 1 /* Columns */) && ht.col > -1 && g.columns[ht.col].allowDragging) {
                        if (g.onDraggingColumn(args)) {
                            this._dragSource = e.target;
                        }
                    } else if (ht.cellType == 3 /* RowHeader */ && (g.allowDragging & 2 /* Rows */) && ht.row > -1 && g.rows[ht.row].allowDragging) {
                        var row = g.rows[ht.row];
                        if (!(row instanceof _grid.GroupRow) && !(row instanceof _grid._NewRowTemplate)) {
                            if (g.onDraggingRow(args)) {
                                this._dragSource = e.target;
                            }
                        }
                    }
                }

                // if we have a valid source, set opacity; ow prevent dragging
                if (this._dragSource && e.dataTransfer) {
                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData('text', ''); // required in FireFox (note: text/html will throw in IE!)
                    this._dragSource.style.opacity = .5;
                    e.stopPropagation(); // prevent parent grids from cancelling the event (TFS 120810)
                } else {
                    e.preventDefault();
                }
            };
            _MouseHandler.prototype._dragEnd = function (e) {
                this.resetMouseState();
            };
            _MouseHandler.prototype._dragOver = function (e) {
                var g = this._g, ht = g.hitTest(e), valid = false;

                // check whether the move is valid
                if (this._htDown && ht.cellType == this._htDown.cellType) {
                    if (ht.cellType == 2 /* ColumnHeader */) {
                        valid = g.columns.canMoveElement(this._htDown.col, ht.col);
                    } else if (ht.cellType == 3 /* RowHeader */) {
                        valid = g.rows.canMoveElement(this._htDown.row, ht.row);
                    }
                }

                // if valid, prevent default to allow drop
                if (valid) {
                    e.dataTransfer.dropEffect = 'move';
                    e.preventDefault();
                    this._showDragMarker(ht);
                } else {
                    this._showDragMarker(null);
                }
            };
            _MouseHandler.prototype._drop = function (e) {
                var g = this._g, ht = g.hitTest(e), args = new _grid.CellRangeEventArgs(g.cells, ht.range);

                // move the row/col to a new position
                if (this._htDown && ht.cellType == this._htDown.cellType) {
                    var sel = g.selection;
                    if (ht.cellType == 2 /* ColumnHeader */) {
                        g.columns.moveElement(this._htDown.col, ht.col);
                        g.select(sel.row, ht.col);
                        g.onDraggedColumn(args);
                    } else if (ht.cellType == 3 /* RowHeader */) {
                        g.rows.moveElement(this._htDown.row, ht.row);
                        g.select(ht.row, sel.col);
                        g.onDraggedRow(args);
                    }
                }
                this.resetMouseState();
            };

            // updates the marker to show the new size of the row/col being resized
            _MouseHandler.prototype._showResizeMarker = function (sz) {
                var g = this._g;

                // add marker element to panel
                var t = this._dvMarker;
                if (!t.parentElement) {
                    g.cells.hostElement.appendChild(t);
                }

                // update marker position
                var css;
                if (this._szRowCol instanceof _grid.Column) {
                    css = {
                        display: '',
                        left: this._szRowCol.pos + sz,
                        top: 0,
                        right: '',
                        bottom: 0,
                        width: 2,
                        height: '',
                        zIndex: 1000
                    };
                    if (g._rtl) {
                        css.left = t.parentElement.clientWidth - css.left - css.width;
                    }
                    if (this._htDown.panel.cellType == 4 /* TopLeft */) {
                        css.left -= g.topLeftCells.hostElement.offsetWidth;
                    }
                } else {
                    css = {
                        left: 0,
                        top: this._szRowCol.pos + sz,
                        right: 0,
                        bottom: '',
                        width: '',
                        height: 2,
                        zIndex: 1000
                    };
                    if (this._htDown.panel.cellType == 4 /* TopLeft */) {
                        css.top -= g.topLeftCells.hostElement.offsetHeight;
                    }
                }

                // apply new position
                wijmo.setCss(t, css);
            };

            // updates the marker to show the position where the row/col will be inserted
            _MouseHandler.prototype._showDragMarker = function (ht) {
                var g = this._g;

                // remove target indicator if no HitTestInfo
                var t = this._dvMarker;
                if (!ht) {
                    if (t.parentElement) {
                        t.parentElement.removeChild(t);
                    }
                    this._rngTarget = null;
                    return;
                }

                // avoid work/flicker
                if (ht.range.equals(this._rngTarget)) {
                    return;
                }
                this._rngTarget = ht.range;

                // add marker element to panel
                if (!t.parentElement) {
                    ht.panel.hostElement.appendChild(t);
                }

                // update marker position
                var css = {
                    display: '',
                    left: 0,
                    top: 0,
                    width: 6,
                    height: 6
                };
                switch (ht.cellType) {
                    case 2 /* ColumnHeader */:
                        css.height = ht.panel.height;
                        var col = g.columns[ht.col];
                        css.left = col.pos - css.width / 2;
                        if (ht.col > this._htDown.col) {
                            css.left += col.renderWidth;
                        }
                        if (g._rtl) {
                            css.left = t.parentElement.clientWidth - css.left - css.width;
                        }
                        break;
                    case 3 /* RowHeader */:
                        css.width = ht.panel.width;
                        var row = g.rows[ht.row];
                        css.top = row.pos - css.height / 2;
                        if (ht.row > this._htDown.row) {
                            css.top += row.renderHeight;
                        }
                        break;
                }

                // update marker
                wijmo.setCss(t, css);
            };

            // raises the ResizedRow/Column events and
            // applies the new size to the selection if the control key is pressed
            _MouseHandler.prototype._finishResizing = function (e) {
                var g = this._g, sel = g.selection, ctrl = this._eMouse.ctrlKey, args = this._szArgs, rc, sz;

                // finish row sizing
                if (args && args.row > -1) {
                    // apply new size, fire event
                    rc = args.row;
                    sz = Math.max(1, this._szStart + (e.pageY - this._htDown.point.y));
                    args.panel.rows[rc].height = Math.round(sz);
                    g.onResizedRow(args);

                    // apply new size to selection if the control key is pressed
                    if (ctrl && this._htDown.cellType == 3 /* RowHeader */ && sel.containsRow(rc)) {
                        for (var r = sel.topRow; r <= sel.bottomRow; r++) {
                            if (g.rows[r].allowResizing && r != rc) {
                                args = new _grid.CellRangeEventArgs(g.cells, new _grid.CellRange(r, -1));
                                g.onResizingRow(args);
                                if (!args.cancel) {
                                    g.rows[r].size = g.rows[rc].size;
                                    g.onResizedRow(args);
                                }
                            }
                        }
                    }
                }

                // finish column sizing
                if (args && args.col > -1) {
                    // apply new size, fire event
                    rc = args.col;
                    sz = Math.max(1, this._szStart + (e.pageX - this._htDown.point.x) * (this._g._rtl ? -1 : 1));
                    args.panel.columns[rc].width = Math.round(sz);
                    g.onResizedColumn(args);

                    // apply new size to selection if the control key is pressed
                    if (ctrl && this._htDown.cellType == 2 /* ColumnHeader */ && sel.containsColumn(rc)) {
                        for (var c = sel.leftCol; c <= sel.rightCol; c++) {
                            if (g.columns[c].allowResizing && c != rc) {
                                args = new _grid.CellRangeEventArgs(g.cells, new _grid.CellRange(-1, c));
                                g.onResizingColumn(args);
                                if (!args.cancel) {
                                    g.columns[c].size = g.columns[rc].size;
                                    g.onResizedColumn(args);
                                }
                            }
                        }
                    }
                }
            };

            // start listbox selection by keeping track of which rows were selected
            // when the action started
            _MouseHandler.prototype._startListBoxSelection = function (row) {
                var rows = this._g.rows;
                this._lbSelState = !rows[row].isSelected;
                this._lbSelRows = {};
                for (var r = 0; r < rows.length; r++) {
                    if (rows[r].isSelected) {
                        this._lbSelRows[r] = true;
                    }
                }
            };

            // handle mouse selection
            _MouseHandler.prototype._handleSelection = function (ht, extend) {
                var g = this._g, rows = g.rows, sel = g.selection, rng = new _grid.CellRange(ht.row, ht.col);

                // check that the selection is valid
                if (ht.row > -1 && ht.col > -1) {
                    if (this._lbSelRows != null) {
                        // special handling for listbox mode
                        rng = new _grid.CellRange(ht.row, ht.col, this._htDown.row, this._htDown.col);
                        for (var r = 0; r < rows.length; r++) {
                            var selected = rng.containsRow(r) ? this._lbSelState : this._lbSelRows[r] != null;
                            if (selected != rows[r].isSelected) {
                                var e = new _grid.CellRangeEventArgs(g.cells, new _grid.CellRange(r, sel.col, r, sel.col2));
                                if (g.onSelectionChanging(e)) {
                                    rows[r].isSelected = selected;
                                    g.onSelectionChanged(e);
                                }
                            }
                        }
                        g.scrollIntoView(ht.row, ht.col);
                    } else {
                        // row headers, select the whole row
                        if (ht.cellType == 3 /* RowHeader */) {
                            rng.col = 0;
                            rng.col2 = g.columns.length - 1;
                        }

                        // extend range if that was asked
                        if (extend) {
                            rng.row2 = sel.row2;
                            rng.col2 = sel.col2;
                        }

                        // select
                        g.select(rng);
                    }
                }
            };

            // handle mouse sort
            _MouseHandler.prototype._handleSort = function (e) {
                var g = this._g, cv = g.collectionView, ht = g.hitTest(e);

                if (this._htDown && ht.cellType == this._htDown.cellType && ht.col == this._htDown.col && ht.cellType == 2 /* ColumnHeader */ && !ht.edgeRight && ht.col > -1 && cv && cv.canSort && g.allowSorting) {
                    // get row that was clicked accounting for merging
                    var rng = g.getMergedRange(ht.panel, ht.row, ht.col), row = rng ? rng.row2 : ht.row;

                    // get column and binding column
                    var col = g.columns[ht.col], bcol = g._getBindingColumn(ht.panel, ht.row, col);

                    // if the click was on the sort row, sort
                    if (row == g._getSortRowIndex() || col != bcol) {
                        var currSort = bcol.currentSort, asc = currSort != '+';
                        if (bcol.allowSorting && bcol.binding) {
                            // can't remove sort from unsorted column
                            if (!currSort && e.ctrlKey)
                                return;

                            // raise sorting column
                            var args = new _grid.CellRangeEventArgs(g.columnHeaders, new _grid.CellRange(-1, ht.col));
                            if (g.onSortingColumn(args)) {
                                // update sort
                                var sds = cv.sortDescriptions;
                                if (e.ctrlKey) {
                                    sds.clear();
                                } else {
                                    sds.splice(0, sds.length, new wijmo.collections.SortDescription(bcol._getBindingSort(), asc));
                                }

                                // raise sorted column
                                g.onSortedColumn(args);
                            }
                        }
                    }
                }
            };
            return _MouseHandler;
        })();
        _grid._MouseHandler = _MouseHandler;
    })(wijmo.grid || (wijmo.grid = {}));
    var grid = wijmo.grid;
})(wijmo || (wijmo = {}));
//# sourceMappingURL=_MouseHandler.js.map

var wijmo;
(function (wijmo) {
    (function (_grid) {
        'use strict';

        /**
        * Handles the grid's editing.
        */
        var _EditHandler = (function () {
            /**
            * Initializes a new instance of an @see:_EditHandler.
            *
            * @param grid @see:FlexGrid that owns this @see:_EditHandler.
            */
            function _EditHandler(grid) {
                var _this = this;
                this._fullEdit = false;
                this._list = null;
                this._g = grid;

                // raise input event when selecting from ListBox
                this._evtInput = document.createEvent('HTMLEvents');
                this._evtInput.initEvent('input', true, false);

                // finish editing when selection changes (commit row edits if row changed)
                grid.selectionChanging.addHandler(function (s, e) {
                    _this.finishEditing();
                    var oldrow = grid._selHdl._sel.row;
                    if (oldrow != e.row) {
                        var len = grid.rows.length, olditem = oldrow > -1 && oldrow < len ? grid.rows[oldrow].dataItem : null, newitem = e.row > -1 && e.row < len ? grid.rows[e.row].dataItem : null;
                        if (olditem != newitem) {
                            _this._commitRowEdits();
                        }
                    }
                });

                // commit row edits when losing focus
                // use blur+capture to emulate focusout (not supported in FireFox)
                grid.addEventListener(grid.hostElement, 'blur', this._blur.bind(this), true);

                // commit edits when clicking non-cells (e.g. sort, drag, resize),
                // start editing when clicking on checkboxes
                grid.addEventListener(grid.hostElement, 'mousedown', function (e) {
                    var sel = grid.selection, ht = grid.hitTest(e);

                    _this._htDown = null;
                    _this._cancelClick = false;
                    if (ht.cellType != 1 /* Cell */ && ht.cellType != 0 /* None */) {
                        // mouse down on non-cell area: commit any pending edits
                        // **REVIEW: this is a fix for TFS 98332
                        if (!_this._lbx || !wijmo.contains(_this._lbx.hostElement, e.target)) {
                            _this._commitRowEdits();
                        }
                    } else if (ht.cellType != 0 /* None */) {
                        // start editing when clicking on checkboxes that are not the active editor
                        var edt = wijmo.tryCast(e.target, HTMLInputElement);
                        if (edt && edt.type == 'checkbox' && wijmo.hasClass(edt.parentElement, 'wj-cell')) {
                            if (edt != _this.activeEditor) {
                                // start editing the item that was clicked
                                _this.startEditing(false, ht.row, ht.col);

                                // toggle check after editing started
                                setTimeout(function () {
                                    edt = _this.activeEditor;
                                    if (edt && edt.type == 'checkbox') {
                                        edt.checked = !edt.checked;
                                        edt.focus(); // TFS 135943
                                        _this.finishEditing();
                                    } else {
                                        _this._cancelClick = true;
                                    }
                                });
                            } else {
                                _this.finishEditing();
                            }
                        }

                        // handle drop-down items (even on editors)
                        var icon = document.elementFromPoint(e.clientX, e.clientY);
                        if (wijmo.closest(icon, '[' + _grid.CellFactory._WJA_DROPDOWN + ']')) {
                            _this._toggleListBox(ht.range);
                            _this._htDown = null;
                            e.preventDefault();
                            return;
                        }

                        // if the click was on the cursor cell, save the hit test info
                        // to start editing when we get the click event later
                        if (edt == null && ht.row == sel.row && ht.col == sel.col) {
                            _this._htDown = ht;
                        }
                    }
                }, true);

                // start editing when the user clicks the selected cell
                grid.addEventListener(grid.hostElement, 'click', function (e) {
                    // prevent clicking on checkboxes when startEditing failed
                    if (_this._cancelClick) {
                        e.preventDefault();
                        e.stopPropagation();
                        return;
                    }

                    // start editing when clicking a cell without an active editor
                    if (_this._htDown && !_this.activeEditor) {
                        var ht = grid.hitTest(e);
                        if (ht.range.equals(_this._htDown.range)) {
                            _this.startEditing(true, ht.row, ht.col);
                        }
                    }
                }, true);
            }
            /**
            * Starts editing a given cell.
            *
            * @param fullEdit Whether to stay in edit mode when the user presses the cursor keys. Defaults to false.
            * @param r Index of the row to be edited. Defaults to the currently selected row.
            * @param c Index of the column to be edited. Defaults to the currently selected column.
            * @param focus Whether to give the editor the focus. Defaults to true.
            * @return True if the edit operation started successfully.
            */
            _EditHandler.prototype.startEditing = function (fullEdit, r, c, focus) {
                if (typeof fullEdit === "undefined") { fullEdit = true; }
                // default row/col to current selection
                var g = this._g;
                r = wijmo.asNumber(r, true, true);
                c = wijmo.asNumber(c, true, true);
                if (r == null) {
                    r = g.selection.row;
                }
                if (c == null) {
                    c = g.selection.col;
                }

                // default focus to true
                if (focus == null) {
                    focus = true;
                }

                // check that the cell is editable
                if (!this._allowEditing(r, c)) {
                    return false;
                }

                // get edit range
                var rng = g.getMergedRange(g.cells, r, c);
                if (!rng) {
                    rng = new _grid.CellRange(r, c);
                }

                // get item to be edited
                var item = g.rows[r].dataItem;

                // make sure cell is selected
                g.select(rng, true);

                // check that we still have the same item after moving the selection (TFS 110143)
                if (!g.rows[r] || item != g.rows[r].dataItem) {
                    return false;
                }

                // no work if we are already editing this cell
                if (rng.equals(this._rng)) {
                    return true;
                }

                // start editing cell
                var e = new _grid.CellRangeEventArgs(g.cells, rng);
                if (!g.onBeginningEdit(e)) {
                    return false;
                }

                // start editing item
                var ecv = wijmo.tryCast(g.collectionView, 'IEditableCollectionView');
                if (ecv) {
                    item = g.rows[r].dataItem;
                    ecv.editItem(item);
                }

                // save editing parameters
                this._fullEdit = fullEdit;
                this._rng = rng;
                this._list = null;
                var map = g.columns[c].dataMap;
                if (map) {
                    this._list = map.getDisplayValues();
                }

                // refresh to create and activate editor
                g.refresh(false);
                var edt = this._edt;
                if (edt) {
                    if (edt.type == 'checkbox') {
                        this._fullEdit = false; // no full edit on checkboxes...
                    } else if (focus) {
                        wijmo.setSelectionRange(edt, 0, edt.value.length);
                    }
                    g.onPrepareCellForEdit(e);

                    // give the editor the focus in case it doesn't have it
                    // NOTE: this happens on Android, it's strange...
                    edt = this._edt;
                    if (edt && focus) {
                        edt.focus();
                    }
                }

                // done
                return true;
            };

            /**
            * Commits any pending edits and exits edit mode.
            *
            * @param cancel Whether pending edits should be canceled or committed.
            * @return True if the edit operation finished successfully.
            */
            _EditHandler.prototype.finishEditing = function (cancel) {
                if (typeof cancel === "undefined") { cancel = false; }
                // make sure we're editing
                var edt = this._edt;
                if (!edt) {
                    this._removeListBox();
                    return true;
                }

                // get parameters
                var g = this._g, rng = this._rng, e = new _grid.CellRangeEventArgs(g.cells, rng), focus = this._g.containsFocus();

                // edit ending
                e.cancel = cancel;
                g.onCellEditEnding(e);

                // apply edits
                if (!e.cancel) {
                    var value = edt.type == 'checkbox' ? edt.checked : edt.value;
                    for (var r = rng.topRow; r <= rng.bottomRow && r < g.rows.length; r++) {
                        for (var c = rng.leftCol; c <= rng.rightCol && c < g.columns.length; c++) {
                            g.cells.setCellData(r, c, value, true);
                        }
                    }
                }

                // dispose of editor
                this._edt = null;
                this._rng = null;
                this._list = null;
                this._removeListBox();

                // refresh to replace the editor with regular content,
                // unless the editor was a checkbox which doesn't change in edit mode
                // REVIEW: this could break templating, and the savings are small
                //if (edt.type != 'checkbox') {
                g.refresh(false);

                //}
                // restore focus // TFS 107464
                if (focus && !g.containsFocus()) {
                    // This was a bad fix: it causes another bug: TFS 136155
                    //setTimeout(() => { // to avoid IME crash in IE: TFS 136155
                    g.focus();
                    //});
                }

                // edit ended
                g.onCellEditEnded(e);

                // done
                return true;
            };

            Object.defineProperty(_EditHandler.prototype, "activeEditor", {
                /**
                * Gets the <b>HTMLInputElement</b> that represents the cell editor currently active.
                */
                get: function () {
                    return this._edt;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(_EditHandler.prototype, "editRange", {
                /**
                * Gets a @see:CellRange that identifies the cell currently being edited.
                */
                get: function () {
                    return this._rng;
                },
                enumerable: true,
                configurable: true
            });

            // ** implementation
            // checks whether a cell can be edited
            _EditHandler.prototype._allowEditing = function (r, c) {
                var g = this._g;
                if (g.isReadOnly || g.selectionMode == 0 /* None */)
                    return false;
                if (r < 0 || r >= g.rows.length || g.rows[r].isReadOnly || !g.rows[r].isVisible)
                    return false;
                if (c < 0 || c >= g.columns.length || g.columns[c].isReadOnly || !g.columns[c].isVisible)
                    return false;
                if (g._getBindingColumn(g.cells, r, g.columns[c]).isReadOnly)
                    return false;
                return true;
            };

            // finish editing the current item
            _EditHandler.prototype._commitRowEdits = function () {
                this.finishEditing();
                var grid = this._g, ecv = wijmo.tryCast(grid.collectionView, 'IEditableCollectionView');
                if (ecv && ecv.currentEditItem) {
                    var e = new _grid.CellRangeEventArgs(grid.cells, grid.selection);
                    grid.onRowEditEnding(e);
                    ecv.commitEdit();
                    grid.onRowEditEnded(e);
                }
            };

            // commit row edits when grid loses focus
            _EditHandler.prototype._blur = function () {
                var _this = this;
                setTimeout(function () {
                    if (!_this._g.containsFocus()) {
                        var ae = document.activeElement;
                        if (!ae || getComputedStyle(ae).position != 'fixed') {
                            _this._commitRowEdits();
                        }
                    }
                }, 200); // TFS 100250, 112599, 115816 (timeOut back to 200)
            };

            // handles keyDown events while editing
            // returns true if the key was handled, false if the grid should handle it
            _EditHandler.prototype._keydown = function (e) {
                switch (e.keyCode) {
                    case 113 /* F2 */:
                        this._fullEdit = !this._fullEdit;
                        e.preventDefault();
                        return true;

                    case 115 /* F4 */:
                        this._toggleListBox(this._g.selection);
                        e.preventDefault();
                        return true;

                    case 32 /* Space */:
                        var edt = this._edt;
                        if (edt && edt.type == 'checkbox') {
                            edt.checked = !edt.checked;
                            this.finishEditing();
                            e.preventDefault();
                        }
                        return true;

                    case 13 /* Enter */:
                    case 9 /* Tab */:
                        this.finishEditing();
                        return false;
                    case 27 /* Escape */:
                        this.finishEditing(true);
                        return true;

                    case 38 /* Up */:
                    case 40 /* Down */:
                    case 37 /* Left */:
                    case 39 /* Right */:
                    case 33 /* PageUp */:
                    case 34 /* PageDown */:
                    case 36 /* Home */:
                    case 35 /* End */:
                        // if the ListBox is active, let it handle the key
                        if (this._lbx) {
                            return this._keydownListBox(e);
                        }

                        // open ListBox on alt up/down
                        if (e.altKey) {
                            switch (e.keyCode) {
                                case 38 /* Up */:
                                case 40 /* Down */:
                                    this._toggleListBox(this._g.selection);
                                    e.preventDefault();
                                    return true;
                            }
                        }

                        // finish editing if not in full-edit mode
                        if (!this._fullEdit) {
                            this.finishEditing();
                            return false;
                        }
                }

                // return true to let editor handle the key (not the grid)
                return true;
            };

            // handles keydown events when listbox is visible
            _EditHandler.prototype._keydownListBox = function (e) {
                var handled = true;
                if (this._lbx) {
                    switch (e.keyCode) {
                        case 38 /* Up */:
                            if (e.altKey) {
                                this._toggleListBox(this._g.selection);
                            } else if (this._lbx.selectedIndex > 0) {
                                this._lbx.selectedIndex--;
                            }
                            break;
                        case 40 /* Down */:
                            if (e.altKey) {
                                this._toggleListBox(this._g.selection);
                            } else {
                                this._lbx.selectedIndex++;
                            }
                            break;
                        case 36 /* Home */:
                        case 33 /* PageUp */:
                            this._lbx.selectedIndex = 0;
                            break;
                        case 35 /* End */:
                        case 34 /* PageDown */:
                            this._lbx.selectedIndex = this._lbx.collectionView.items.length - 1;
                            break;
                        default:
                            handled = false;
                            break;
                    }
                }

                // if handled, we're done
                if (handled) {
                    e.preventDefault();
                    return true;
                }

                // return false to let the grid handle the key
                return false;
            };

            // handles keyPress events while editing
            _EditHandler.prototype._keypress = function (e) {
                // auto-complete based on dataMap
                var edt = this._edt;
                if (edt && edt.type != 'checkbox' && e.target == edt && this._list && this._list.length > 0 && e.charCode >= 32) {
                    // get text up to selection start
                    var start = edt.selectionStart, text = edt.value.substr(0, start);

                    // add the new char if the source element is the editor
                    // (but not if the source element is the grid!)
                    if (e.target == edt) {
                        start++;
                        text += String.fromCharCode(e.charCode);
                    }

                    // convert to lower-case for matching
                    text = text.toLowerCase();

                    for (var i = 0; i < this._list.length; i++) {
                        if (this._list[i].toLowerCase().indexOf(text) == 0) {
                            // found the match, update text and selection
                            edt.value = this._list[i];
                            wijmo.setSelectionRange(edt, start, this._list[i].length);
                            edt.dispatchEvent(this._evtInput);

                            // eat the key and be done
                            e.preventDefault();
                            break;
                        }
                    }
                }
            };

            // shows the drop-down element for a cell (if it is not already visible)
            _EditHandler.prototype._toggleListBox = function (rng) {
                var g = this._g;

                // close select element if any; if this is the same cell, we're done
                if (this._lbx) {
                    this._removeListBox();
                    if (g.selection.contains(rng)) {
                        if (g.activeEditor) {
                            g.activeEditor.focus();
                        } else if (!g.containsFocus()) {
                            g.focus();
                        }
                        return true;
                    }
                }

                // if this was a touch, give focus to ListBox to hide soft keyboard
                var lbxFocus = g.isTouching;

                // check that we have a drop-down
                var bcol = g._getBindingColumn(g.cells, rng.row, g.columns[rng.col]);
                if (!wijmo.input || !bcol.dataMap || bcol.showDropDown === false) {
                    return false;
                }

                // start editing so we can position the select element
                if (!wijmo.input || !this.startEditing(true, rng.row, rng.col, !lbxFocus)) {
                    return false;
                }

                // create and initialize the ListBox
                this._lbx = this._createListBox();
                this._lbx.showSelection();
                if (lbxFocus) {
                    this._lbx.focus();
                }
                return true;
            };

            // create the ListBox and add it to the document
            _EditHandler.prototype._createListBox = function () {
                var _this = this;
                var g = this._g, rng = this._rng, row = g.rows[rng.row], col = g._getBindingColumn(g.cells, rng.row, g.columns[rng.col]), div = document.createElement('div'), lbx = new wijmo.input.ListBox(div);

                // configure listbox
                wijmo.addClass(div, 'wj-dropdown-panel');
                lbx.maxHeight = row.renderHeight * 4;
                lbx.itemsSource = col.dataMap.getDisplayValues();
                lbx.selectedValue = g.activeEditor ? g.activeEditor.value : g.getCellData(rng.row, rng.col, true);
                wijmo.addClass(div, col.dropDownCssClass);

                // close listbox on clicks
                lbx.addEventListener(lbx.hostElement, 'click', function () {
                    _this._removeListBox();
                    _this.finishEditing();
                });

                // close listbox when losing focus
                lbx.lostFocus.addHandler(function () {
                    _this._removeListBox();
                });

                // update editor when the selected index changes
                lbx.selectedIndexChanged.addHandler(function () {
                    var edt = g.activeEditor;
                    if (edt) {
                        edt.value = _this._lbx.selectedValue;
                        edt.dispatchEvent(_this._evtInput);
                        wijmo.setSelectionRange(edt, 0, edt.value.length);
                    }
                });

                // show the popup
                wijmo.showPopup(div, g.getCellBoundingRect(rng.row, rng.col));

                // done
                return lbx;
            };

            // remove the ListBox element from the DOM and disconnect its event handlers
            _EditHandler.prototype._removeListBox = function () {
                if (this._lbx) {
                    wijmo.hidePopup(this._lbx.hostElement, true);
                    this._lbx.dispose();
                    this._lbx = null;
                }
            };
            return _EditHandler;
        })();
        _grid._EditHandler = _EditHandler;
    })(wijmo.grid || (wijmo.grid = {}));
    var grid = wijmo.grid;
})(wijmo || (wijmo = {}));
//# sourceMappingURL=_EditHandler.js.map

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var wijmo;
(function (wijmo) {
    (function (_grid) {
        'use strict';

        /**
        * Manages the new row template used to add rows to the grid.
        */
        var _AddNewHandler = (function () {
            /**
            * Initializes a new instance of an @see:_AddNewHandler.
            *
            * @param grid @see:FlexGrid that owns this @see:_AddNewHandler.
            */
            function _AddNewHandler(grid) {
                this._nrt = new _NewRowTemplate();
                this._g = grid;

                // add handlers to manage the new row template
                grid.beginningEdit.addHandler(this._beginningEdit, this);
                grid.rowEditEnded.addHandler(this._rowEditEnded, this);
                grid.loadedRows.addHandler(this.updateNewRowTemplate, this);
            }
            /**
            * Update the new row template to ensure it's visible only if the grid is bound
            * to a data source that supports adding new items, and that it is in the
            * right position.
            */
            _AddNewHandler.prototype.updateNewRowTemplate = function () {
                // get variables
                var ecv = wijmo.tryCast(this._g.collectionView, 'IEditableCollectionView'), g = this._g, rows = g.rows;

                // see if we need a new row template
                var needTemplate = ecv && ecv.canAddNew && g.allowAddNew && !g.isReadOnly;

                // get current template index
                var index = rows.indexOf(this._nrt);

                // update template position
                if (!needTemplate && index > -1) {
                    rows.removeAt(index);
                } else if (needTemplate) {
                    if (index < 0) {
                        rows.push(this._nrt);
                    } else if (index != rows.length - 1) {
                        rows.removeAt(index);
                        rows.push(this._nrt);
                    }

                    // make sure the new row template is not collapsed
                    if (this._nrt) {
                        this._nrt._setFlag(128 /* ParentCollapsed */, false);
                    }
                }
            };

            // ** implementation
            // beginning edit, add new item if necessary
            _AddNewHandler.prototype._beginningEdit = function (sender, e) {
                if (!e.cancel) {
                    var row = this._g.rows[e.row];
                    if (wijmo.tryCast(row, _NewRowTemplate)) {
                        var ecv = wijmo.tryCast(this._g.collectionView, 'IEditableCollectionView');
                        if (ecv && ecv.canAddNew) {
                            // start adding new row
                            var newItem = ecv.isAddingNew ? ecv.currentAddItem : ecv.addNew();
                            ecv.moveCurrentTo(newItem);
                            this.updateNewRowTemplate();

                            // update now to ensure the editor will get a fresh layout (TFS 96705)
                            this._g.refresh(true);

                            // fire row added event (user can customize the new row or cancel)
                            this._g.onRowAdded(e);
                            if (e.cancel) {
                                ecv.cancelNew();
                            }
                        }
                    }
                }
            };

            // row has been edited, commit if this is the new row
            _AddNewHandler.prototype._rowEditEnded = function (sender, e) {
                var ecv = wijmo.tryCast(this._g.collectionView, 'IEditableCollectionView');
                if (ecv && ecv.isAddingNew) {
                    ecv.commitNew();
                }
            };
            return _AddNewHandler;
        })();
        _grid._AddNewHandler = _AddNewHandler;

        /**
        * Represents a row template used to add items to the source collection.
        */
        var _NewRowTemplate = (function (_super) {
            __extends(_NewRowTemplate, _super);
            function _NewRowTemplate() {
                _super.apply(this, arguments);
            }
            return _NewRowTemplate;
        })(_grid.Row);
        _grid._NewRowTemplate = _NewRowTemplate;
    })(wijmo.grid || (wijmo.grid = {}));
    var grid = wijmo.grid;
})(wijmo || (wijmo = {}));
//# sourceMappingURL=_AddNewHandler.js.map

var wijmo;
(function (wijmo) {
    (function (_grid) {
        'use strict';

        /**
        * Implements a hidden input element so users can choose IME modes when
        * the FlexGrid has focus, and start composing before the grid enters
        * edit mode.
        */
        var _ImeHandler = (function () {
            //--------------------------------------------------------------------------
            //#region ** ctor
            /**
            * Initializes a new instance of a @see:_ImeProvider and attaches it to a @see:FlexGrid.
            *
            * @param grid @see:FlexGrid that this @see:_ImeProvider will be attached to.
            */
            function _ImeHandler(grid) {
                // create hidden input focus element
                this._tbx = wijmo.createElement('<input class="wj-grid-editor wj-form-control" wj-part="ime-target"/>');
                this._cssHidden = {
                    opacity: '0',
                    pointerEvents: 'none',
                    position: 'absolute',
                    left: -10,
                    top: -10,
                    width: 0
                };
                wijmo.setCss(this._tbx, this._cssHidden);

                // add IME input to the grid, update the focus
                this._g = grid;
                this._g.cells.hostElement.parentElement.appendChild(this._tbx);
                this._updateImeFocus();

                // show IME input when composition starts
                grid.addEventListener(this._tbx, 'compositionstart', this._compositionstart.bind(this));

                // hide IME input after editing
                grid.cellEditEnded.addHandler(this._cellEditEnded, this);

                // handle focus
                grid.addEventListener(grid.hostElement, 'blur', this._updateImeFocus.bind(this), true);
                grid.addEventListener(grid.hostElement, 'focus', this._updateImeFocus.bind(this), true);
                grid.selectionChanged.addHandler(this._updateImeFocus, this);
            }
            //#endregion
            //--------------------------------------------------------------------------
            //#region ** object model
            /**
            * Disposes of this @see:_ImeProvider.
            */
            _ImeHandler.prototype.dispose = function () {
                var grid = this._g;

                // remove event listeners
                grid.removeEventListener(this._tbx, 'compositionstart');
                grid.cellEditEnded.removeHandler(this._cellEditEnded);
                grid.removeEventListener(grid.hostElement, 'blur');
                grid.removeEventListener(grid.hostElement, 'focus');
                grid.selectionChanged.removeHandler(this._updateImeFocus);

                // remove IME input from grid
                if (this._tbx.parentElement) {
                    this._tbx.parentElement.removeChild(this._tbx);
                }
            };

            //#endregion
            //--------------------------------------------------------------------------
            //#region ** implementation
            // hide IME input after editing
            _ImeHandler.prototype._cellEditEnded = function () {
                wijmo.setCss(this._tbx, this._cssHidden);
                this._tbx.value = '';
            };

            // show IME input as current editor when composition starts
            _ImeHandler.prototype._compositionstart = function () {
                var grid = this._g;
                if (grid.activeEditor == null) {
                    var sel = grid._selHdl.selection;
                    if (grid.startEditing(false, sel.row, sel.col, false)) {
                        var rc = grid.getCellBoundingRect(sel.row, sel.col), sp = grid.scrollPosition, host = grid.cells.hostElement;
                        wijmo.setCss(this._tbx, {
                            opacity: '',
                            pointerEvents: '',
                            left: grid.columns[sel.col].pos + sp.x + host.offsetLeft,
                            top: grid.rows[sel.row].pos + sp.y + host.offsetTop,
                            width: rc.width - 1,
                            height: rc.height - 1
                        });
                        grid._edtHdl._edt = this._tbx;
                    }
                }
            };

            // transfer focus from grid to IME input
            _ImeHandler.prototype._updateImeFocus = function () {
                var grid = this._g;
                if (grid.containsFocus() && !grid.activeEditor && !grid.isTouching) {
                    var tbx = this._tbx;
                    if (this._enableIme()) {
                        tbx.disabled = false;
                        tbx.select();
                    } else if (!tbx.disabled) {
                        tbx.disabled = true;
                        var focused = document.activeElement;
                        if (focused instanceof HTMLElement) {
                            focused.blur();
                        }
                        grid.focus();
                    }
                }
            };

            // checks whether IME should be enabled for the current selection
            _ImeHandler.prototype._enableIme = function () {
                var grid = this._g, sel = grid.selection;

                // can't edit? can't use IME
                if (sel.row < 0 || sel.col < 0 || !grid._edtHdl._allowEditing(sel.row, sel.col)) {
                    return false;
                }

                // disable IME for boolean cells (with checkboxes)
                if (grid.columns[sel.col].dataType == 3 /* Boolean */) {
                    return false;
                }

                // seems OK to use IME
                return true;
            };
            return _ImeHandler;
        })();
        _grid._ImeHandler = _ImeHandler;
    })(wijmo.grid || (wijmo.grid = {}));
    var grid = wijmo.grid;
})(wijmo || (wijmo = {}));
//# sourceMappingURL=_ImeHandler.js.map

