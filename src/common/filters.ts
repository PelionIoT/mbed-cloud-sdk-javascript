export function extractFilter(_filter: any, _name: string, _operator: string): string {
    // needs a rewrite for new filters
    return "";
    // if (filter && filter[name]) {
    //     const value = filter[name];
    //     if (value.constructor !== {}.constructor) { return value; }

    //     switch (operator) {
    //         case "$ne": {
    //             if ((value as ComparisonObject<any>).$ne) { return (value as ComparisonObject<any>).$ne; }
    //             break;
    //         }
    //         case "$gte": {
    //             if ((value as ComparisonObject<any>).$gte) { return (value as ComparisonObject<any>).$gte; }
    //             break;
    //         }
    //         case "$lte": {
    //             if ((value as ComparisonObject<any>).$lte) { return (value as ComparisonObject<any>).$lte; }
    //             break;
    //         }
    //         case "$in": {
    //             if ((value as ComparisonObject<any>).$in) { return (value as ComparisonObject<any>).$in; }
    //             break;
    //         }
    //         case "$nin": {
    //             if ((value as ComparisonObject<any>).$nin) { return (value as ComparisonObject<any>).$nin; }
    //             break;
    //         }
    //         default: {
    //             if ((value as ComparisonObject<any>).$eq) { return (value as ComparisonObject<any>).$eq; }
    //             break;
    //         }
    //     }
    // }
}
