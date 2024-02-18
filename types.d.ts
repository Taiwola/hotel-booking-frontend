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


export type SearchParams = {
    destination?: string,
    checkIn?: string,
    checkOut?: string,
    adultCount?: string,
    childCount?: string,
    page?: string,
    facilities?: string[],
    types?: string[],
    stars?: string[],
    maxPrice?: string,
    sortOptions?: string
}

export type HotelSearchResponse = {
   response: {
    data: HotelType[],
    pagination: {
        total: number,
        page: number,
        pages: number
    }
   }
}