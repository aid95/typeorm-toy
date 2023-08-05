import {ValueTransformer} from "typeorm";

export class BigIntTransformer implements ValueTransformer {
    to(entityValue: number) {
        return `${entityValue}`;
    }

    from(databaseValue: string): number | null {
        return parseInt(databaseValue, 10) || null;
    }
}
