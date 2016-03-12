import {Component} from 'angular2/core';

const TABLE_STORAGE_KEY = '93488934-3433434-343943349438-XX';

interface Row {
    team1: string;
    team2: string;
    task: string;
}

@Component({
    selector: 'my-app',
    templateUrl: 'app.html'
})
export class AppComponent {
    public rows:Row[] = [];
    
    constructor() {
        try {
            this.rows = this.load();
        } catch (e) {
            console.warn(`Could not load because ${e}`);
        }
    }
    
    public addRow() {
        this.rows.push({team1: '', team2: '', task: ''});
    }
    
    public removeRow(row:Row) {
        var indexOfRow = this.rows.indexOf(row);
        if (indexOfRow !== -1) {
            this.rows.splice(indexOfRow, 1);
        }
    }
    
    private static isValidRow(row:Row) {
        return typeof row.team1 === 'string'
            && typeof row.team2 === 'string'
            && typeof row.task === 'string';
    }
    
    public load() {
        var result = JSON.parse(localStorage.getItem(TABLE_STORAGE_KEY));
        if (!Array.isArray(result)) {
            throw 'The result format is not right';
        }
        if (result.every(AppComponent.isValidRow)) {
            return result;
        } else {
            throw 'The result was not an array';
        }
    }
    
    public save() {
        localStorage.setItem(TABLE_STORAGE_KEY, JSON.stringify(this.rows));
    }
}