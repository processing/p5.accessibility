var shadowDOMElement; // eslint-disable-line
function GridInterceptor() {
    let self = this;
    /* global baseInterceptor */
    baseInterceptor.call(self);
    this.noRows = 10,
        this.noCols = 10,
        this.coordLoc = {}
}

GridInterceptor.prototype = Object.create(baseInterceptor.prototype);

GridInterceptor.prototype.clearVariables = function(object) {
    object.objectTypeCount = {};
    object.objectArray = [];
    object.objectCount = 0;
    this.isCleared = true;
    return object;
}

GridInterceptor.prototype.createShadowDOMElement = function(document) {
    let contentTable = document.getElementById(`tableOutput-content-table`);
    for (let i = 0; i < this.noRows; i++) {
        let row = document.createElement(`tr`);

        for (let j = 0; j < this.noCols; j++) {
            let col = document.createElement(`td`);
            col.className = `gridOutput-cell-content`;
            col.innerHTML = `test`;
            row.appendChild(col);
        }
        contentTable.appendChild(row);
    }
    shadowDOMElement = document.getElementById(`tableOutput-content`);
}
GridInterceptor.prototype.populateObject = function(x, arguments, object, table, isDraw) {
    /* global objectCount */
    objectCount = object.objectCount;
    /* global objectArray */
    objectArray = object.objectArray;
    /* global objectTypeCount */
    objectTypeCount = object.objectTypeCount;
    if (!isDraw) {
        // check for special function in setup -> createCanvas
        if (!x.name.localeCompare(`createCanvas`)) {
            this.canvasDetails.width = arguments[0];
            this.canvasDetails.height = arguments[1];
        }
    }
    /* global Registry */
    let entityClass = Registry.entityFor(x.name);

    if (entityClass && !entityClass.isParameter) {
        objectArray[objectCount] = new entityClass(this, x, arguments, this.canvasDetails.width, this.canvasDetails.height);

        if (objectTypeCount[x.name]) {
            objectTypeCount[x.name]++;
        } else {
            objectTypeCount[x.name] = 1;
        }
        objectCount++;
    } else if (entityClass && entityClass.isParameter) {
        new entityClass(this, x, arguments, this.canvasDetails.width, this.canvasDetails.height);
    }
    return ({
        objectCount: objectCount,
        objectArray: objectArray,
        objectTypeCount: objectTypeCount
    });
}

GridInterceptor.prototype.populateTable = function(objectArray, documentPassed) {
    if (this.totalCount < 100) {
        let that = this;
        objectArray = [].slice.call(objectArray);
        objectArray.forEach(function(object, i) {
            let cellLoc = object.coordLoc.locY * that.noRows + object.coordLoc.locX;
            // add link in table
            let cellLink = documentPassed.createElement(`a`);
            cellLink.innerHTML += object.type;
            let objectId = `#object` + i;
            cellLink.setAttribute(`href`, objectId);
            if (object.coordLoc.locY < that.noCols && object.coordLoc.locX < that.noRows && object.coordLoc.locY > 0 && object.coordLoc.locX > 0) {
                documentPassed.getElementsByClassName(`gridOutput-cell-content`)[cellLoc].appendChild(cellLink);
            }

        });
    }
}

/* helper function to populate object Details */
GridInterceptor.prototype.populateObjectDetails = function(object1, object2, elementSummary, elementDetail) {
    this.prevTotalCount = this.totalCount;
    this.totalCount = object1.objectCount + object2.objectCount;
    elementSummary.innerHTML = ``;
    elementDetail.innerHTML = ``;
    elementSummary.innerHTML += this.bgColor + ` canvas is ` + this.canvasDetails.width + ` by ` +
        this.canvasDetails.height + ` of area ` + this.canvasDetails.width * this.canvasDetails.height;
    if (this.totalCount > 1) {
        elementSummary.innerHTML += ` Contains ` + this.totalCount + ` objects - `;
    } else {
        elementSummary.innerHTML += ` Contains ` + this.totalCount + ` object - `;
    }

    if (object2.objectCount > 0 || object1.objectCount > 0) {
        /* global totObjectTypeCount */
        /* global mergeObjRecursive */
        totObjectTypeCount = mergeObjRecursive(object1.objectTypeCount, object2.objectTypeCount);
        let keys = Object.keys(totObjectTypeCount);
        keys.forEach(function(key) {
            elementSummary.innerHTML += totObjectTypeCount[key] + ` ` + key + ` `;
        });

        let objectList = document.createElement(`ul`);

        if (this.totalCount < 100) {
            object1.objectArray.forEach(function(objArrayItem, i) {
                let objectListItem = document.createElement(`li`);
                objectListItem.id = `object` + i;
                objectList.appendChild(objectListItem);
                let objKeys = Object.keys(objArrayItem.getAttributes());
                objKeys.forEach(function(objKeyItem) {
                    if (objKeyItem.localeCompare(`coordLoc`)) {
                        if (objKeyItem.localeCompare(`type`)) {
                            objectListItem.innerHTML += objKeyItem + ` = ` + objArrayItem[objKeyItem] + ` `;
                        } else {
                            objectListItem.innerHTML += objArrayItem[objKeyItem] + ` `;
                        }
                    }
                });
            });
            object2.objectArray.forEach(function(objArrayItem, i) {
                let objectListItem = document.createElement(`li`);
                objectListItem.id = `object` + (object1.objectArray.length + i);
                objectList.appendChild(objectListItem);
                let objKeys = Object.keys(objArrayItem.getAttributes());
                objKeys.forEach(function(objKeyItem) {
                    if (objKeyItem.localeCompare(`coordLoc`)) {
                        if (objKeyItem.localeCompare(`type`)) {
                            objectListItem.innerHTML += objKeyItem + ` = ` + objArrayItem[objKeyItem] + ` `;
                        } else {
                            objectListItem.innerHTML += objArrayItem[objKeyItem] + ` `;
                        }
                    }
                });
            });
            elementDetail.appendChild(objectList);
        }
    }
}


const gridInterceptor = new GridInterceptor();