export class Score {
    // whether to display as percentage
    isPercentage: boolean;
    // 0 to 1
    percentage: number;
    achieved: number;
    outOf: number;

    constructor(isPercentage: boolean, percentage: number, achieved: number, outOf: number) {
        this.isPercentage = isPercentage;
        this.percentage = percentage;
        this.achieved = achieved;
        this.outOf = outOf;
    }

    calc(): number {
       if (this.isPercentage)  {
           return this.percentage;
       } else {
           return this.achieved/this.outOf;
       }
    }

    toString(): string {
        if (this.isPercentage)  {
            return (this.percentage*100).toString();
        } else {
            return this.achieved + "/" + this.outOf;
        }
    }
}
