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
    lastUpdated: Date,
    booking: BookingType[]
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

export type UserType = {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
}


export type PaymentResponse = {
    paymentIntentId: string,
    clientId: string,
    totalCost: number
}

export type BookingType = {
    _id: string,
    userId: string,
    firstName: string,
    lastName: string,
    email: string,
    childCount: number,
    adultCount: number,
    totalCost: number,
    checkIn: Date,
    checkOut: Date
}


export type roomBooking = {
    
}