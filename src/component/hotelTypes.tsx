import { hotelTypes } from "../config/hotel-options-config";

type Props = {
    selectedHotelTypes: string[],
    onTypesChange: (e: React.ChangeEvent<HTMLInputElement>) => void
};


const HotelTypeFilter = ({selectedHotelTypes, onTypesChange}: Props) => {
    return (
        <div className="border-b border-slate-300 pb-5">
            <h4 className="text-md font-semibold mb-2">Hotel Type</h4>
            {hotelTypes.map((type) => (
                <label htmlFor="" className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" value={type} checked={selectedHotelTypes.includes(type)} 
                    onChange={onTypesChange}
                    />

                    <span>{type}</span>
                </label>
            ))}
        </div>
    )
}

export default HotelTypeFilter;

