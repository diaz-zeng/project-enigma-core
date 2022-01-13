import { wordMaps } from '../defaultSettings.json';
export default class WordMapper {
    private wordMap;
    private error;
    constructor(map: typeof wordMaps);
    setWordMaps(map: typeof wordMaps): void;
    getValue(input: string): string;
}
