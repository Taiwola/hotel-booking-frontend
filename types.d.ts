export type HotelType = {
    _id: string,
    userId: string,
    name: string,
    country: string,
    description: string,
    type: string,
    city: string,
    adultCount: number,
    childCount: number,
    facilities: string[],
    pricePerNight: number,
    starRating: number,
    imageUrls: string[],
    lastUpdated: Date
};