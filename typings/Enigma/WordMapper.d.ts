import { WordMap } from '../Settings';
export default class WordMapper {
    private wordMap;
    private error;
    constructor(map?: WordMap[]);
    setWordMaps(map?: WordMap[]): void;
    getValue(input: string): string;
}
