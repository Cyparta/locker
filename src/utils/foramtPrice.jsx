export const formatPrice = (price) => {
    if (price === undefined || price === null) {
        return 0
    } else {
        return price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
} 