export type PricingPlanType = {
    statusCode: number;
    error: string | null;
    message: string | null;
    id: string;
    createdAt: string;
    updatedAt: string;
    version: number;
    planNameFr: string;
    planNameEn: string;
    descriptionEn: string;
    descriptionFr: string;
    minSMS: number;
    maxSMS: number;
    nbDaysToExpired: number;
    smsUnitPrice: number;
    active: boolean;
    planCode: string;
    illustrationImgUrl: string;
    archived: boolean;
};

export type PricingPlanResponseType = PricingPlanType[];