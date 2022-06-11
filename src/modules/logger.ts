export default class Logger {
    constructor() {  }

    get currentDateTime(): string {
        let date = new Date();
        let dd = String(date.getDate()).padStart(2, '0');
        let mm = String(date.getMonth() + 1).padStart(2, '0');
        let yyyy = date.getFullYear();

        let hh = String(date.getHours()).padStart(2, '0');
        let MM = String(date.getMinutes()).padStart(2, '0');
        let ss = String(date.getSeconds()).padStart(2, '0');
        return `${dd}/${mm}/${yyyy} ${hh}:${MM}:${ss}`;
    }

    log(type: string, message: string, error?: Error, short?: boolean): void {
        let prefix = this.currentDateTime + ` (${type}) `
        console.log(`${prefix}${message.replace('\\n', '\\n' + ' '.repeat(prefix.length))}`);
        if (error) {
            if (short) return console.log(' '.repeat(prefix.length) + 'Message: ' + error.message);
            console.log(' '.repeat(prefix.length) + error.stack);
        }
    }
}