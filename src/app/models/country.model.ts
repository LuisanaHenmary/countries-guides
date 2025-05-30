export interface Country {
    name: {
        common: string;
        official: string;
        nativeName?: {
            [key: string]: {
                official: string;
                common: string;
            };
        };
    };
    ccn3: string;
    flags: {
        png: string;
        svg: string;
        alt?: string;
    };
    region: string;
    subregion?: string;
    capital?: string[];
    population: number;
    area?: number;
    borders?: string[];
    languages?: {
        [key: string]: string;
    };
    currencies?: {
        [code: string]: {
            name: string;
            symbol: string;
        };
    };
    timezones?: string[];

}
