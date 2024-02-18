type Props = {
    selectedPrice?: number,
    onPriceChange: (value?: number) => void
}



const PriceFilter = ({selectedPrice, onPriceChange}: Props) => {
    return (
        <div>
            <h4 className="text-sm font-semibold mb-2">
                Max Price  
            </h4>
            <select className="p-2 rounded-md w-full" value={selectedPrice} onChange={(e) => onPriceChange(e.target.value ? parseInt(e.target.value) : undefined)}>
                <option value="">Select max price</option>
                {[1000, 2000, 5000, 6000, 10000, 15000].map((price) => (
                    <option value={price}>{price}</option>
                ))}
            </select>
        </div>
    )
}

export default PriceFilter