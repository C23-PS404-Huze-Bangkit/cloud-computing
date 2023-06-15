const mapDBToModel = ({
    id,
    fk_product,
    total_price,
    quanitity,
    date,
    status,
    owner
}) => ({
    id,
    fkProduct: fk_product,
    totalPrice: total_price,
    quanitity,
    date,
    status,
    owner
});

module.exports = { mapDBToModel };